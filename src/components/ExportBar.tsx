'use client'

import { useWallpaperStore } from '@/lib/store'
import { exportWallpaperAsPNG } from '@/lib/export'
import { useState } from 'react'
import Link from 'next/link'

interface ExportBarProps {
  isSubscribed: boolean
}

export function ExportBar({ isSubscribed }: ExportBarProps) {
  const { device, gradient, qrBlocks } = useWallpaperStore()
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    if (!device || !gradient || qrBlocks.length === 0) {
      alert('Please complete your wallpaper design before exporting')
      return
    }

    setIsExporting(true)
    try {
      await exportWallpaperAsPNG()
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export wallpaper. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const canExport = device && gradient && qrBlocks.length > 0

  return (
    <div className="flex items-center justify-center gap-3">
      {!isSubscribed ? (
        /* Non-Subscriber: Show Subscribe Button */
        <Link
          href="/subscribe"
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Subscribe to Export
        </Link>
      ) : (
        /* Subscriber: Show Download Button */
        <button
          onClick={handleExport}
          disabled={!canExport || isExporting}
          className="group px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed flex items-center gap-2.5"
        >
          {isExporting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Exporting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PNG
            </>
          )}
        </button>
      )}

      {!canExport && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Complete all steps first
        </p>
      )}
    </div>
  )
}

