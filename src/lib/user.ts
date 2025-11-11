import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from './db'

/**
 * Get or create user in database
 * This ensures users are synced from Clerk to our database on-demand
 * No webhook required!
 */
export async function getOrCreateUser() {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }

  // Try to find existing user
  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  // If user doesn't exist, create them now
  if (!user) {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return null
    }

    // Create user in our database
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.firstName && clerkUser.lastName
          ? `${clerkUser.firstName} ${clerkUser.lastName}`
          : clerkUser.firstName || null,
      },
    })

    console.log('✅ Created new user in database:', user.email)
  }

  return user
}

