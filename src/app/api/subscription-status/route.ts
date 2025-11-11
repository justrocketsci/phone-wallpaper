import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUserSubscription } from '@/lib/subscription'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ isActive: false }, { status: 200 })
    }

    const subscription = await getUserSubscription()

    if (!subscription) {
      return NextResponse.json({ isActive: false }, { status: 200 })
    }

    return NextResponse.json({
      isActive: subscription.isActive,
      status: subscription.status,
      endsAt: subscription.endsAt,
    })
  } catch (error) {
    console.error('Error checking subscription status:', error)
    return NextResponse.json({ isActive: false }, { status: 200 })
  }
}

