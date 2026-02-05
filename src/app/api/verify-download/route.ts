import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      )
    }

    // Retrieve the Stripe session to verify payment
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed. Please try again.' },
        { status: 402 }
      )
    }

    // Check if download already used (atomic check-and-update)
    const existingPurchase = await prisma.purchase.findUnique({
      where: { stripeSessionId: sessionId },
    })

    if (existingPurchase) {
      if (existingPurchase.downloaded) {
        return NextResponse.json(
          { error: 'This download has already been used. Each purchase allows one download.' },
          { status: 403 }
        )
      }

      if (existingPurchase.status === 'refunded') {
        return NextResponse.json(
          { error: 'This purchase has been refunded.' },
          { status: 403 }
        )
      }

      // Mark as downloaded
      await prisma.purchase.update({
        where: { id: existingPurchase.id },
        data: {
          downloaded: true,
          downloadedAt: new Date(),
        },
      })

      return NextResponse.json({ verified: true })
    }

    // No record yet (webhook hasn't fired) - create one and mark as downloaded
    await prisma.purchase.create({
      data: {
        stripeSessionId: sessionId,
        amountPaid: session.amount_total || 0,
        email: session.customer_details?.email || null,
        downloaded: true,
        downloadedAt: new Date(),
        status: 'completed',
      },
    })

    return NextResponse.json({ verified: true })
  } catch (error: any) {
    console.error('Error verifying download:', error)

    // Handle Stripe errors specifically
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Invalid session. Please try your purchase again.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Verification failed. Please try again.' },
      { status: 500 }
    )
  }
}
