import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getUserSubscription } from '@/lib/subscription'
import { CreateDesignSchema, validateRequest } from '@/lib/schemas'
import { rateLimiters, checkRateLimit } from '@/lib/rate-limit'

/**
 * GET /api/designs
 * List all designs for the authenticated user
 */
export async function GET() {
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
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(rateLimit.limit || 0),
            'X-RateLimit-Remaining': String(rateLimit.remaining || 0),
            'X-RateLimit-Reset': String(rateLimit.reset || 0),
          }
        }
      )
    }

    // Find or create user by Clerk ID
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    // If user doesn't exist, create them (fallback for development)
    if (!user) {
      try {
        user = await prisma.user.create({
          data: {
            clerkId: userId,
            email: `user-${userId}@temporary.com`, // Temporary email, will be updated by webhook
          },
        })
      } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }
    }

    // Fetch all designs for this user, sorted by most recently updated
    const designs = await prisma.design.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        settings: true,
        thumbnail: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ designs })
  } catch (error) {
    console.error('Error fetching designs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch designs' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/designs
 * Create a new design
 */
export async function POST(request: Request) {
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
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(rateLimit.limit || 0),
            'X-RateLimit-Remaining': String(rateLimit.remaining || 0),
            'X-RateLimit-Reset': String(rateLimit.reset || 0),
          }
        }
      )
    }

    // Find or create user by Clerk ID
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    // If user doesn't exist, create them (fallback for development)
    if (!user) {
      try {
        user = await prisma.user.create({
          data: {
            clerkId: userId,
            email: `user-${userId}@temporary.com`, // Temporary email, will be updated by webhook
          },
        })
      } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }
    }

    // Validate request body
    const validation = await validateRequest(request, CreateDesignSchema)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }
    
    const { name, settings, thumbnail } = validation.data

    // Check subscription status
    const subscription = await getUserSubscription()
    if (!subscription || !subscription.isActive) {
      return NextResponse.json(
        { error: 'Active subscription required to save designs' },
        { status: 403 }
      )
    }

    // Check design limit (10 designs max for subscribers)
    const designCount = await prisma.design.count({
      where: { userId: user.id },
    })

    if (designCount >= 10) {
      return NextResponse.json(
        { error: 'Design limit reached. You can save up to 10 designs. Delete a design to save a new one.' },
        { status: 403 }
      )
    }

    // Create new design
    const design = await prisma.design.create({
      data: {
        userId: user.id,
        name,
        settings,
        thumbnail: thumbnail || null,
      },
    })

    return NextResponse.json({ design }, { status: 201 })
  } catch (error) {
    console.error('Error creating design:', error)
    return NextResponse.json(
      { error: 'Failed to create design' },
      { status: 500 }
    )
  }
}

