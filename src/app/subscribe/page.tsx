'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SubscribePage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      setError(null)

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()

      // Redirect to Stripe Checkout URL directly
      if (!url) {
        throw new Error('No checkout URL returned')
      }

      window.location.href = url
    } catch (err: any) {
      console.error('Subscription error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Subscribe to QR Canvas
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Unlock unlimited wallpaper exports
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 border border-blue-200 dark:border-blue-800">
            {/* Launch Offer Badges */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                🎉 Launch Offer
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                50% OFF
              </div>
            </div>

            {/* Discounted Pricing */}
            <div className="text-center mb-4">
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-5xl font-bold text-slate-900 dark:text-white">
                  $1.97
                </span>
                <span className="text-slate-600 dark:text-slate-400">/month</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-base text-slate-400 dark:text-slate-500 line-through">
                  $3.95
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  /month
                </span>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg px-3 py-1.5 inline-block">
                <p className="text-xs font-semibold text-orange-700 dark:text-orange-400">
                  ⚡ Limited time offer - Lock in this rate forever
                </p>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited wallpaper exports
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Up to 2 QR codes per wallpaper
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Premium gradient backgrounds
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                All device resolutions
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                High-resolution PNG exports
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save up to 10 designs
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cancel anytime
              </li>
            </ul>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg disabled:shadow-none disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Subscribe Now'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p className="mb-2">Secure payment powered by Stripe</p>
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

