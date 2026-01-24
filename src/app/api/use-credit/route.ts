import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { rateLimiters, checkRateLimit } from '@/lib/rate-limit'

export async function POST() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limiting
    const rateLimit = await checkRateLimit(rateLimiters.designs, userId)
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has credits
    if (user.downloadCredits < 1) {
      return NextResponse.json(
        { error: 'Insufficient credits', credits: 0 },
        { status: 402 }
      )
    }

    // Atomic decrement to prevent race conditions
    // Use a transaction to ensure credit is deducted and usage is recorded together
    const result = await prisma.$transaction(async (tx) => {
      // Double-check credits within transaction
      const currentUser = await tx.user.findUnique({
        where: { id: user.id },
      })

      if (!currentUser || currentUser.downloadCredits < 1) {
        throw new Error('Insufficient credits')
      }

      // Decrement credit
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          downloadCredits: { decrement: 1 },
        },
      })

      // Record usage
      await tx.creditUsage.create({
        data: {
          userId: user.id,
          creditsUsed: 1,
          action: 'export_png',
        },
      })

      return updatedUser
    })

    return NextResponse.json({
      success: true,
      remainingCredits: result.downloadCredits,
    })
  } catch (error: any) {
    console.error('Error using credit:', error)

    if (error.message === 'Insufficient credits') {
      return NextResponse.json(
        { error: 'Insufficient credits', credits: 0 },
        { status: 402 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to use credit' },
      { status: 500 }
    )
  }
}
