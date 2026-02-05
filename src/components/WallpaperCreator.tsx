'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PreviewPhone } from './Preview/PreviewPhone'
import { Sidebar } from './Sidebar/Sidebar'
import { useWallpaperStore } from '@/lib/store'
import { savePendingDownload } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download } from 'lucide-react'
import { templates } from '@/data/templates'
import { gradients } from '@/data/gradients'
import devices from '@/data/devices.json'

interface WallpaperCreatorProps {
  templateId?: string
}

export default function WallpaperCreator({
  templateId,
}: WallpaperCreatorProps) {
  const [isLoading, setIsLoading] = useState(!!templateId)
  const [error, setError] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const {
    loadFromDesign,
    resetStore,
    getSerializableState,
    setDevice,
    setGradient,
    addQRBlock,
  } = useWallpaperStore()

  // Load template on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true)

        if (templateId) {
          const template = templates.find((t) => t.id === templateId)
          if (template) {
            resetStore()

            const gradientData = gradients.find((g) => g.id === template.gradient)
            if (gradientData) {
              setGradient(gradientData)
            }

            const defaultDevice =
              devices.find((d) => d.model === 'iPhone 15 Pro') || devices[0]
            if (defaultDevice) {
              setDevice(defaultDevice)
            }

            template.qrBlocks.forEach((block, index) => {
              addQRBlock({
                ...block,
                id: `qr-${Date.now()}-${index}`,
              })
            })
          }
        } else {
          resetStore()
        }
      } catch (error) {
        console.error('Failed to load template:', error)
        setError('Failed to load template')
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId])

  const handleDownload = async () => {
    const state = getSerializableState()
    if (!state.device || !state.gradient || state.qrBlocks.length === 0) {
      setError('Please complete your design first (device + background + QR code)')
      return
    }

    setError(null)
    setIsRedirecting(true)

    try {
      // Save state to localStorage for restoration after payment
      savePendingDownload()

      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error: any) {
      console.error('Checkout failed:', error)
      setError(error.message || 'Failed to start checkout')
      setIsRedirecting(false)
    }
  }

  const canDownload = (() => {
    const state = getSerializableState()
    return !!(state.device && state.gradient && state.qrBlocks.length > 0)
  })()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Top bar */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </Button>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">
            QR Canvas
          </span>
        </div>

        <div className="flex items-center gap-4">
          {error && (
            <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
          )}

          <Button
            onClick={handleDownload}
            disabled={!canDownload || isRedirecting}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {isRedirecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Redirecting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download PNG &mdash; $1.99
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-8">
          <PreviewPhone onDownload={handleDownload} isRedirecting={isRedirecting} />
        </div>
      </div>
    </div>
  )
}
