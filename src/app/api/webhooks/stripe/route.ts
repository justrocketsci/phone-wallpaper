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

        // Only process one-time payments
        if (session.mode !== 'payment') {
          console.log('Skipping non-payment checkout session')
          break
        }

        // Idempotency: check if purchase already recorded
        const existing = await prisma.purchase.findUnique({
          where: { stripeSessionId: session.id },
        })

        if (existing) {
          console.log('Purchase already recorded for session:', session.id)
          break
        }

        // Create purchase record
        await prisma.purchase.create({
          data: {
            stripeSessionId: session.id,
            amountPaid: session.amount_total || 0,
            email: session.customer_details?.email || null,
            status: 'completed',
          },
        })

        console.log(`Purchase recorded for session ${session.id}`)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge

        if (!charge.payment_intent) {
          break
        }

        // Find the checkout session associated with this charge
        const paymentIntent = await stripe.paymentIntents.retrieve(
          charge.payment_intent as string
        )

        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1,
        })

        if (sessions.data.length === 0) {
          break
        }

        const session = sessions.data[0]
        const purchase = await prisma.purchase.findUnique({
          where: { stripeSessionId: session.id },
        })

        if (!purchase || purchase.status === 'refunded') {
          break
        }

        // Mark purchase as refunded
        await prisma.purchase.update({
          where: { id: purchase.id },
          data: { status: 'refunded' },
        })

        console.log(`Purchase refunded for session ${session.id}`)
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
