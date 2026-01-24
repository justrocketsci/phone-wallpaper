import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getUserCredits } from '@/lib/credits'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ credits: 0, hasCredits: false }, { status: 200 })
    }

    const creditsInfo = await getUserCredits()

    if (!creditsInfo) {
      return NextResponse.json({ credits: 0, hasCredits: false }, { status: 200 })
    }

    return NextResponse.json({
      credits: creditsInfo.credits,
      hasCredits: creditsInfo.hasCredits,
    })
  } catch (error) {
    console.error('Error checking credits:', error)
    return NextResponse.json({ credits: 0, hasCredits: false }, { status: 200 })
  }
}
