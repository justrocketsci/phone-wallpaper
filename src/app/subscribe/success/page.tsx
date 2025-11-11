'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SubscribeSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    async function verifySession() {
      console.log('🔍 Starting session verification...')
      console.log('Session ID:', sessionId)
      
      if (!sessionId) {
        console.error('❌ No session ID found in URL')
        setError('No session ID found. Please try subscribing again.')
        setLoading(false)
        return
      }

      try {
        console.log('📡 Calling verify-session API...')
        // Verify the session with our backend
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`)
        
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error('❌ API returned error:', errorData)
          throw new Error(errorData.error || 'Failed to verify session')
        }

        const data = await response.json()
        console.log('✅ Verification response:', data)
        
        if (data.success) {
          console.log('🎉 Subscription activated successfully!')
          setLoading(false)
        } else {
          console.error('❌ Verification failed:', data)
          throw new Error(data.error || 'Session verification failed')
        }
      } catch (err: any) {
        console.error('💥 Session verification error:', err)
        setError(err.message || 'Something went wrong. Please contact support.')
        setLoading(false)
      }
    }

    verifySession()
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 text-center">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Activating your subscription...
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Please wait while we confirm your payment.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 text-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Oops! Something went wrong
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {error}
            </p>
            <Link 
              href="/subscribe"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Welcome to QR Canvas Pro!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Your subscription is now active. You can start creating unlimited wallpapers right away.
          </p>

          {/* CTA Button */}
          <Link 
            href="/create"
            className="inline-block w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg"
          >
            Start Creating
          </Link>

          {/* Additional Info */}
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            A confirmation email has been sent to your inbox.
          </p>
        </div>
      </div>
    </div>
  )
}
