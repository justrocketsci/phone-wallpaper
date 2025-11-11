import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

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

    const body = await request.json()
    const { name, settings, thumbnail } = body

    if (!name || !settings) {
      return NextResponse.json(
        { error: 'Name and settings are required' },
        { status: 400 }
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

