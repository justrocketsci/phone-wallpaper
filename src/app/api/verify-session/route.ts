import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'No session ID provided' },
        { status: 400 }
      )
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      )
    }

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { success: false, error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Get credits from metadata
    const credits = parseInt(session.metadata?.credits || '0', 10)

    // Find user and check if credits were added
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if this purchase was recorded (webhook might have processed it)
    const purchase = await prisma.creditPurchase.findUnique({
      where: { stripeSessionId: sessionId },
    })

    // If webhook hasn't processed it yet, add credits now (fallback)
    if (!purchase && credits > 0) {
      await prisma.$transaction([
        prisma.user.update({
          where: { id: user.id },
          data: {
            downloadCredits: { increment: credits },
            totalCreditsPurchased: { increment: credits },
            stripeCustomerId: session.customer as string,
          },
        }),
        prisma.creditPurchase.create({
          data: {
            userId: user.id,
            stripeSessionId: sessionId,
            credits,
            amountPaid: session.amount_total || 0,
            status: 'completed',
          },
        }),
      ])
    }

    // Fetch updated user
    const updatedUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    return NextResponse.json({
      success: true,
      credits: updatedUser?.downloadCredits || 0,
      purchasedCredits: credits,
    })
  } catch (error: any) {
    console.error('Error verifying session:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
