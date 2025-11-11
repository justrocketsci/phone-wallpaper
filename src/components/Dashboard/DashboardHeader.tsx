'use client'

import Link from 'next/link'

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
          <Link
            href="/create"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Design
          </Link>
        </div>

        {/* Subscription Status */}
        <div className="flex items-center gap-2">
          {isSubscribed ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <svg
                className="w-5 h-5 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Premium Active
              </span>
            </div>
          ) : (
            <Link
              href="/subscribe"
              className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
            >
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                Upgrade to Premium
              </span>
            </Link>
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
            Click "Create New Design" above to start building your first QR code wallpaper. 
            Choose your device, pick a gradient background, add your QR codes, and export!
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Choose device & gradient</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Add up to 2 QR codes</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Export high-res PNG</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

