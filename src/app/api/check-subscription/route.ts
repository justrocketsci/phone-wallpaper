import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUserSubscription } from '@/lib/subscription'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ 
        authenticated: false,
        subscription: null 
      })
    }

    const subscription = await getUserSubscription()

    return NextResponse.json({
      authenticated: true,
      userId,
      subscription,
    })
  } catch (error) {
    console.error('Error checking subscription:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


