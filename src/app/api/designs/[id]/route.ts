import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { UpdateDesignSchema, validateRequest } from '@/lib/schemas'
import { rateLimiters, checkRateLimit } from '@/lib/rate-limit'

/**
 * GET /api/designs/[id]
 * Fetch a specific design
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Await params before accessing properties (Next.js 15+)
    const { id } = await params

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
            email: `user-${userId}@temporary.com`,
          },
        })
      } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }
    }

    const design = await prisma.design.findFirst({
      where: {
        id,
        userId: user.id, // Ensure user owns this design
      },
    })

    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 })
    }

    return NextResponse.json({ design })
  } catch (error) {
    console.error('Error fetching design:', error)
    return NextResponse.json(
      { error: 'Failed to fetch design' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/designs/[id]
 * Update a design
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Await params before accessing properties (Next.js 15+)
    const { id } = await params

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
            email: `user-${userId}@temporary.com`,
          },
        })
      } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }
    }

    // Check that design exists and belongs to user
    const existingDesign = await prisma.design.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!existingDesign) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 })
    }

    // Validate request body
    const validation = await validateRequest(request, UpdateDesignSchema)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }
    
    const { name, settings, thumbnail } = validation.data

    // Update design with provided fields
    const design = await prisma.design.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(settings !== undefined && { settings }),
        ...(thumbnail !== undefined && { thumbnail }),
      },
    })

    return NextResponse.json({ design })
  } catch (error) {
    console.error('Error updating design:', error)
    return NextResponse.json(
      { error: 'Failed to update design' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/designs/[id]
 * Delete a design
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Await params before accessing properties (Next.js 15+)
    const { id } = await params

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
            email: `user-${userId}@temporary.com`,
          },
        })
      } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }
    }

    // Check that design exists and belongs to user
    const existingDesign = await prisma.design.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!existingDesign) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 })
    }

    // Delete the design
    await prisma.design.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting design:', error)
    return NextResponse.json(
      { error: 'Failed to delete design' },
      { status: 500 }
    )
  }
}

