import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { rateLimiters, checkRateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  try {
    // Rate limit by IP address
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rateLimit = await checkRateLimit(rateLimiters.checkout, ip)
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
          },
        }
      )
    }

    const priceId = process.env.STRIPE_PRICE_DOWNLOAD
    if (!priceId) {
      return new NextResponse(
        JSON.stringify({ error: 'Stripe price not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Create anonymous checkout session for single download
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/download?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/create`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    const message =
      error?.type === 'StripeInvalidRequestError'
        ? `Stripe error: ${error.message}`
        : 'Internal server error'
    return new NextResponse(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
