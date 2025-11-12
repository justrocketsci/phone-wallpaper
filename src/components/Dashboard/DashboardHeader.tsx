'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Check, CheckCircle } from 'lucide-react'

interface DashboardHeaderProps {
  userName?: string | null
  isNewUser: boolean
  isSubscribed: boolean
}

export function DashboardHeader({ userName, isNewUser, isSubscribed }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      {/* Welcome Message */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          {isNewUser ? (
            <>Welcome{userName ? `, ${userName}` : ''}! 👋</>
          ) : (
            <>Welcome back{userName ? `, ${userName}` : ''}!</>
          )}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {isNewUser
            ? 'Get started by creating your first QR code wallpaper.'
            : 'Continue working on your designs or start a new one.'}
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="secondary" size="lg">
            <Link href="/create">
              <Plus className="w-5 h-5" />
              Create New Design
            </Link>
          </Button>
        </div>

        {/* Subscription Status */}
        <div className="flex items-center gap-2">
          {isSubscribed ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Premium Active
              </span>
            </div>
          ) : (
            <Button asChild variant="outline" className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-300">
              <Link href="/subscribe">
                Upgrade to Premium
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Welcome Banner for New Users */}
      {isNewUser && (
        <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            🎨 Getting Started
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Click &quot;Create New Design&quot; above to start building your first QR code wallpaper. 
            Choose your device, pick a gradient background, add your QR codes, and export!
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <CheckCircle className="w-4 h-4" />
              <span>Choose device & gradient</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <CheckCircle className="w-4 h-4" />
              <span>Add up to 2 QR codes</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <CheckCircle className="w-4 h-4" />
              <span>Export high-res PNG</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

