import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import WallpaperCreator from '@/components/WallpaperCreator'
import { getUserSubscription } from '@/lib/subscription'

export default async function CreatePage({
  searchParams,
}: {
  searchParams: { template?: string; design?: string }
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const subscription = await getUserSubscription()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <WallpaperCreator
        templateId={searchParams.template}
        designId={searchParams.design}
        isSubscribed={subscription?.isActive || false}
      />
    </main>
  )
}

