'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const STORAGE_KEY = 'qr-canvas-cookie-notice-dismissed'

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Check if user has already dismissed the notice
    const isDismissed = localStorage.getItem(STORAGE_KEY)
    
    if (!isDismissed) {
      // Small delay before showing to allow page to load
      const timer = setTimeout(() => {
        setIsVisible(true)
        setIsAnimating(true)
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
      localStorage.setItem(STORAGE_KEY, 'true')
    }, 300) // Match animation duration
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isAnimating ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-slate-900 border-t border-slate-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Message */}
            <div className="flex-1 text-sm text-slate-200">
              <p>
                We use strictly necessary cookies to provide authentication and payment processing.{' '}
                <Link 
                  href="/cookies" 
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  Learn more
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleDismiss}
                className="px-4 py-2 bg-white text-slate-900 rounded-md hover:bg-slate-100 transition-colors font-medium text-sm whitespace-nowrap"
              >
                Got it
              </button>
              <button
                onClick={handleDismiss}
                className="p-2 text-slate-400 hover:text-slate-200 transition-colors sm:hidden"
                aria-label="Close cookie notice"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

