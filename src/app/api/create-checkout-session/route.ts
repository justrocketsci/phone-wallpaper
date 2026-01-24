import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getOrCreateUser } from '@/lib/user'
import { prisma } from '@/lib/db'
import { rateLimiters, checkRateLimit } from '@/lib/rate-limit'

// Credit pack definitions
const CREDIT_PACKS = {
  '5': {
    priceId: process.env.STRIPE_PRICE_5_CREDITS!,
    credits: 5,
  },
  '15': {
    priceId: process.env.STRIPE_PRICE_15_CREDITS!,
    credits: 15,
  },
} as const

type CreditPackSize = keyof typeof CREDIT_PACKS

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

    // Get credit pack from request body
    const body = await req.json().catch(() => ({}))
    const creditPack = body.creditPack as CreditPackSize

    if (!creditPack || !CREDIT_PACKS[creditPack]) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid credit pack. Choose 5 or 15.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const pack = CREDIT_PACKS[creditPack]

    // Get or create user in database
    const user = await getOrCreateUser()

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

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

    // Create checkout session for one-time payment
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment', // One-time payment, not subscription
      payment_method_types: ['card'],
      line_items: [
        {
          price: pack.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/purchase/cancel`,
      metadata: {
        clerkId: userId,
        credits: String(pack.credits),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
