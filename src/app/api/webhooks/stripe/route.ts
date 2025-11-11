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

  const session = event.data.object as Stripe.Checkout.Session
  const subscription = event.data.object as Stripe.Subscription

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        if (!session.customer || !session.subscription) {
          return new NextResponse('Missing customer or subscription', { status: 400 })
        }

        const clerkId = session.metadata?.clerkId

        if (!clerkId) {
          return new NextResponse('Missing clerkId in metadata', { status: 400 })
        }

        // Update user with subscription info
        await prisma.user.update({
          where: { clerkId },
          data: {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            subscriptionStatus: 'active',
          },
        })

        break
      }

      case 'customer.subscription.updated': {
        if (!subscription.customer) {
          return new NextResponse('Missing customer', { status: 400 })
        }

        // Find user by Stripe customer ID
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: subscription.customer as string },
        })

        if (!user) {
          return new NextResponse('User not found', { status: 404 })
        }

        // Update subscription status
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionStatus: subscription.status,
            subscriptionEndsAt: subscription.cancel_at
              ? new Date(subscription.cancel_at * 1000)
              : subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000)
              : null,
          },
        })

        break
      }

      case 'customer.subscription.deleted': {
        if (!subscription.customer) {
          return new NextResponse('Missing customer', { status: 400 })
        }

        // Find user by Stripe customer ID
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: subscription.customer as string },
        })

        if (!user) {
          return new NextResponse('User not found', { status: 404 })
        }

        // Update subscription status to canceled
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionStatus: 'canceled',
            subscriptionEndsAt: new Date(subscription.ended_at! * 1000),
          },
        })

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

