import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getOrCreateUser } from '@/lib/user'
import { prisma } from '@/lib/db'
import { rateLimiters, checkRateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Rate limiting (stricter for payment endpoints)
    const rateLimit = await checkRateLimit(rateLimiters.checkout, userId)
    if (!rateLimit.success) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': String(rateLimit.limit || 0),
            'X-RateLimit-Remaining': String(rateLimit.remaining || 0),
            'X-RateLimit-Reset': String(rateLimit.reset || 0),
          }
        }
      )
    }

    // Get or create user in database (no webhook needed!)
    const user = await getOrCreateUser()

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    const priceId = process.env.STRIPE_PRICE_ID!

    // Create or get Stripe customer
    let customerId = user.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          clerkId: userId,
        },
      })
      customerId = customer.id

      // Update user with Stripe customer ID
      await prisma.user.update({
        where: { clerkId: userId },
        data: { stripeCustomerId: customerId },
      })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/subscribe/cancel`,
      metadata: {
        clerkId: userId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

