'use client'

import { useEffect, useState } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { DashboardHeader } from '@/components/Dashboard/DashboardHeader'
import { DesignGrid } from '@/components/Dashboard/DesignGrid'
import { Design, getDesigns, deleteDesign } from '@/lib/design'
import { useSubscription } from '@/hooks/useSubscription'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const { isActive: isSubscribed } = useSubscription()
  const router = useRouter()
  const [designs, setDesigns] = useState<Design[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [isLoaded, user, router])

  // Fetch user's designs
  useEffect(() => {
    if (!user) return

    const fetchDesigns = async () => {
      try {
        setLoading(true)
        const userDesigns = await getDesigns()
        setDesigns(userDesigns)
      } catch (err) {
        console.error('Failed to fetch designs:', err)
        setError('Failed to load your designs')
      } finally {
        setLoading(false)
      }
    }

    fetchDesigns()
  }, [user])

  const handleDeleteDesign = async (id: string) => {
    try {
      await deleteDesign(id)
      setDesigns((prev) => prev.filter((d) => d.id !== id))
    } catch (err) {
      console.error('Failed to delete design:', err)
      alert('Failed to delete design. Please try again.')
    }
  }

  // Show loading state
  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!user) {
    return null
  }

  const isNewUser = designs.length === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-3">
                <Image 
                  src="/product-logo.svg" 
                  alt="QR Canvas Logo" 
                  width={32} 
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-xl font-semibold text-slate-900 dark:text-white">
                  QR Canvas
                </span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <DashboardHeader
          userName={user.firstName}
          isNewUser={isNewUser}
          isSubscribed={isSubscribed}
        />

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* User's Designs */}
        {!isNewUser && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Your Designs
            </h2>
          </div>
        )}
        
        <DesignGrid designs={designs} onDelete={handleDeleteDesign} />
      </main>
    </div>
  )
}

