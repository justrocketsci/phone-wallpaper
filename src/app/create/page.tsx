import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import WallpaperCreator from '@/components/WallpaperCreator'
import { getUserSubscription } from '@/lib/subscription'

export default async function CreatePage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const subscription = await getUserSubscription()

  // Redirect to subscribe page if no active subscription
  if (!subscription?.isActive) {
    redirect('/subscribe')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <WallpaperCreator />
    </main>
  )
}

