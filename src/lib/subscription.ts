import { getOrCreateUser } from './user'

export async function getUserSubscription() {
  // This will automatically create the user if they don't exist
  const user = await getOrCreateUser()
  
  if (!user) return null
  
  const isActive = 
    user.subscriptionStatus === 'active' ||
    user.subscriptionStatus === 'trialing'
  
  return {
    isActive,
    status: user.subscriptionStatus,
    endsAt: user.subscriptionEndsAt,
  }
}

