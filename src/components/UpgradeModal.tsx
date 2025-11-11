'use client'

import Link from 'next/link'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  feature?: string
}

export function UpgradeModal({ isOpen, onClose, feature }: UpgradeModalProps) {
  if (!isOpen) return null

  const getTitle = () => {
    if (feature) {
      return `${feature} Requires Subscription`
    }
    return 'Upgrade to Premium'
  }

  const getDescription = () => {
    if (feature === 'Save to Account') {
      return 'Subscribe to save up to 10 designs to your account and access them from any device.'
    }
    if (feature === 'Export PNG') {
      return 'Subscribe to download high-resolution PNG wallpapers for your phone.'
    }
    return 'Subscribe to QR Canvas to unlock unlimited wallpaper exports and save your designs.'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 border border-slate-200 dark:border-slate-700">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            {getTitle()}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {getDescription()}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0"
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
            <span>Unlimited wallpaper exports</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0"
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
            <span>Up to 2 QR codes per wallpaper</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0"
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
            <span>High-resolution PNG exports</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0"
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
            <span>Save up to 10 designs</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">
              $3.95
            </span>
            <span className="text-slate-600 dark:text-slate-400">/month</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Cancel anytime
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/subscribe"
            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg text-center"
          >
            Subscribe Now
          </Link>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-200 text-center"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  )
}

