import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Only process one-time payments (not subscriptions)
        if (session.mode !== 'payment') {
          console.log('Skipping non-payment checkout session')
          break
        }

        if (!session.customer) {
          return new NextResponse('Missing customer', { status: 400 })
        }

        const clerkId = session.metadata?.clerkId
        const creditsStr = session.metadata?.credits

        if (!clerkId || !creditsStr) {
          return new NextResponse('Missing clerkId or credits in metadata', { status: 400 })
        }

        const credits = parseInt(creditsStr, 10)

        if (isNaN(credits) || credits <= 0) {
          return new NextResponse('Invalid credits value', { status: 400 })
        }

        // Find user by clerkId
        const user = await prisma.user.findUnique({
          where: { clerkId },
        })

        if (!user) {
          return new NextResponse('User not found', { status: 404 })
        }

        // Check if this session was already processed (idempotency)
        const existingPurchase = await prisma.creditPurchase.findUnique({
          where: { stripeSessionId: session.id },
        })

        if (existingPurchase) {
          console.log('Credit purchase already processed for session:', session.id)
          break
        }

        // Add credits to user and create purchase record in a transaction
        await prisma.$transaction([
          // Increment user's credits
          prisma.user.update({
            where: { id: user.id },
            data: {
              downloadCredits: { increment: credits },
              totalCreditsPurchased: { increment: credits },
              stripeCustomerId: session.customer as string,
            },
          }),
          // Create purchase record
          prisma.creditPurchase.create({
            data: {
              userId: user.id,
              stripeSessionId: session.id,
              credits,
              amountPaid: session.amount_total || 0,
              status: 'completed',
            },
          }),
        ])

        console.log(`Added ${credits} credits to user ${user.email}`)
        break
      }

      // Handle refunds - deduct credits if payment is refunded
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge

        // Find the checkout session associated with this charge
        if (!charge.payment_intent) {
          break
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(
          charge.payment_intent as string
        )

        // Find purchase by looking up sessions with this payment intent
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1,
        })

        if (sessions.data.length === 0) {
          break
        }

        const session = sessions.data[0]
        const purchase = await prisma.creditPurchase.findUnique({
          where: { stripeSessionId: session.id },
          include: { user: true },
        })

        if (!purchase || purchase.status === 'refunded') {
          break
        }

        // Deduct credits and mark purchase as refunded
        await prisma.$transaction([
          prisma.user.update({
            where: { id: purchase.userId },
            data: {
              downloadCredits: {
                decrement: Math.min(purchase.credits, purchase.user.downloadCredits),
              },
            },
          }),
          prisma.creditPurchase.update({
            where: { id: purchase.id },
            data: { status: 'refunded' },
          }),
        ])

        console.log(`Refunded ${purchase.credits} credits from user ${purchase.user.email}`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new NextResponse('Webhook handler failed', { status: 500 })
  }
}
