import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    console.log('🔐 Verify Session API called')
    
    const { userId } = await auth()
    console.log('User ID from auth:', userId)

    if (!userId) {
      console.error('❌ No user ID - unauthorized')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')
    console.log('Session ID from params:', sessionId)

    if (!sessionId) {
      console.error('❌ No session ID provided')
      return NextResponse.json({ success: false, error: 'No session ID provided' }, { status: 400 })
    }

    console.log('📡 Retrieving session from Stripe...')
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    console.log('Stripe session retrieved:', {
      id: session.id,
      payment_status: session.payment_status,
      customer: session.customer,
      subscription: session.subscription,
    })

    if (!session) {
      console.error('❌ Session not found in Stripe')
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      console.error('❌ Payment not completed. Status:', session.payment_status)
      return NextResponse.json({ success: false, error: 'Payment not completed' }, { status: 400 })
    }

    console.log('✅ Payment confirmed')

    // Get the subscription
    const subscriptionId = session.subscription as string
    console.log('📡 Retrieving subscription from Stripe...')
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    console.log('Subscription retrieved:', {
      id: subscription.id,
      status: subscription.status,
      current_period_end: subscription.current_period_end,
    })

    // Update user in database
    console.log('🔍 Finding user in database...')
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      console.error('❌ User not found in database')
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    console.log('✅ User found:', user.email)

    // Update user with subscription details
    console.log('💾 Updating user subscription in database...')
    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: subscriptionId,
        subscriptionStatus: subscription.status,
        subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
      },
    })

    console.log('✅ User updated successfully:', {
      email: updatedUser.email,
      subscriptionStatus: updatedUser.subscriptionStatus,
      stripeSubscriptionId: updatedUser.stripeSubscriptionId,
    })

    return NextResponse.json({ 
      success: true,
      subscription: {
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end,
      }
    })
  } catch (error: any) {
    console.error('💥 Error verifying session:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    }, { status: 500 })
  }
}

