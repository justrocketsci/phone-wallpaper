import { getOrCreateUser } from './user'

export interface UserCredits {
  credits: number
  hasCredits: boolean
}

/**
 * Get the current user's credit balance
 */
export async function getUserCredits(): Promise<UserCredits | null> {
  const user = await getOrCreateUser()

  if (!user) return null

  return {
    credits: user.downloadCredits,
    hasCredits: user.downloadCredits > 0,
  }
}
