'use client'

import { useWallpaperStore } from '@/lib/store'
import { exportWallpaperAsPNG } from '@/lib/export'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download, Save, Coins } from 'lucide-react'

interface ExportBarProps {
  credits: number
  onSave?: () => void
  isSaving?: boolean
}

export function ExportBar({ credits, onSave, isSaving = false }: ExportBarProps) {
  const { device, gradient, qrBlocks } = useWallpaperStore()
  const [isExporting, setIsExporting] = useState(false)

  const hasCredits = credits > 0

  const handleExport = async () => {
    if (!device || !gradient || qrBlocks.length === 0) {
      alert('Please complete your wallpaper design before exporting')
      return
    }

    setIsExporting(true)
    try {
      await exportWallpaperAsPNG()
    } catch (error: any) {
      console.error('Export failed:', error)
      if (error.message === 'INSUFFICIENT_CREDITS') {
        alert('You need credits to export. Purchase credits to download your wallpaper.')
      } else {
        alert('Failed to export wallpaper. Please try again.')
      }
    } finally {
      setIsExporting(false)
    }
  }

  const canExport = device && gradient && qrBlocks.length > 0

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {/* Save Button - always available (free) */}
      <Button
        onClick={onSave}
        disabled={!canExport || isSaving}
        variant="default"
        size="lg"
        className="group"
      >
        {isSaving ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Saving...
          </>
        ) : (
          <>
            <Save className="w-5 h-5 transition-transform group-hover:scale-110" />
            Save
          </>
        )}
      </Button>

      {/* Export Button - requires credits */}
      {hasCredits ? (
        <Button
          onClick={handleExport}
          disabled={!canExport || isExporting}
          variant="secondary"
          size="lg"
          className="group"
        >
          {isExporting ? (
            <>
              <div className="w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
              Download PNG
              <span className="text-xs opacity-70 ml-1">(1 credit)</span>
            </>
          )}
        </Button>
      ) : (
        <Button asChild variant="secondary" size="lg">
          <Link href="/purchase" className="group">
            <Coins className="w-5 h-5 text-amber-500" />
            Buy Credits to Download
          </Link>
        </Button>
      )}

      {!canExport && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Complete all steps first
        </p>
      )}
    </div>
  )
}
