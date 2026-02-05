'use client'

import { useWallpaperStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface ExportBarProps {
  onDownload?: () => void
  isRedirecting?: boolean
}

export function ExportBar({ onDownload, isRedirecting = false }: ExportBarProps) {
  const { device, gradient, qrBlocks } = useWallpaperStore()

  const canExport = device && gradient && qrBlocks.length > 0

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <Button
        onClick={onDownload}
        disabled={!canExport || isRedirecting}
        size="lg"
        className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        {isRedirecting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Redirecting to checkout...
          </>
        ) : (
          <>
            <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
            Download PNG &mdash; $1.99
          </>
        )}
      </Button>

      {!canExport && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Complete all steps first
        </p>
      )}
    </div>
  )
}
