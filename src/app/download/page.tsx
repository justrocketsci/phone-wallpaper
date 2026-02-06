'use client'

import { Suspense, useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useWallpaperStore } from '@/lib/store'
import { loadPendingDownload, clearPendingDownload } from '@/lib/store'
import { exportWallpaperAsPNG } from '@/lib/export'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react'

type DownloadStatus = 'verifying' | 'downloading' | 'success' | 'error'

function DownloadContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<DownloadStatus>('verifying')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const hasStarted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    const processDownload = async () => {
      if (!sessionId) {
        setStatus('error')
        setErrorMessage('No session ID provided. Please try your purchase again.')
        return
      }

      try {
        // Verify the payment
        const response = await fetch(`/api/verify-download?session_id=${encodeURIComponent(sessionId)}`)
        const data = await response.json()

        if (!response.ok) {
          setStatus('error')
          setErrorMessage(data.error || 'Verification failed')
          return
        }

        // Restore wallpaper state from localStorage
        const savedState = loadPendingDownload()
        if (!savedState || !savedState.device || !savedState.gradient) {
          setStatus('error')
          setErrorMessage(
            'Could not restore your wallpaper design. This can happen if you cleared your browser data or used a different browser. Please create your wallpaper again.'
          )
          return
        }

        // Load state into Zustand store
        const { loadFromDesign } = useWallpaperStore.getState()
        loadFromDesign(savedState)

        // Generate and download the PNG
        setStatus('downloading')
        await exportWallpaperAsPNG()

        // Clean up localStorage
        clearPendingDownload()
        setStatus('success')

        // Fire Google Ads conversion event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-10983483990/FRUGCMj5ifQbENbUqvUo',
            'value': 1.0,
            'currency': 'USD',
          })
        }
      } catch (error: any) {
        console.error('Download failed:', error)
        setStatus('error')
        setErrorMessage(error.message || 'An unexpected error occurred')
      }
    }

    processDownload()
  }, [sessionId])

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
      {status === 'verifying' && (
        <>
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Verifying Payment</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Please wait while we verify your purchase...
          </p>
        </>
      )}

      {status === 'downloading' && (
        <>
          <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Generating Wallpaper</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Your wallpaper is being generated and will download automatically...
          </p>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Download Complete!</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Your wallpaper has been downloaded. Check your downloads folder.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            <Link href="/create">
              Create Another
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </>
      )}

      {status === 'error' && (
        <>
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Something Went Wrong</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {errorMessage}
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Link href="/create">
                Try Again
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

function DownloadFallback() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
      <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Loading...</h1>
    </div>
  )
}

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-8">
      <Suspense fallback={<DownloadFallback />}>
        <DownloadContent />
      </Suspense>
    </div>
  )
}
