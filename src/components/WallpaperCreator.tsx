'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { PreviewPhone } from './Preview/PreviewPhone'
import { Sidebar } from './Sidebar/Sidebar'
import { UpgradeModal } from './UpgradeModal'
import { ActionMenu } from './ActionMenu'
import { useWallpaperStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Check, Coins } from 'lucide-react'
import {
  loadDesign,
  updateDesign,
  saveDesign,
  generateDesignName,
  generateThumbnail,
} from '@/lib/design'
import { exportWallpaperAsPNG } from '@/lib/export'
import { templates } from '@/data/templates'
import { gradients } from '@/data/gradients'
import devices from '@/data/devices.json'

interface WallpaperCreatorProps {
  templateId?: string
  designId?: string
  credits: number
}

export default function WallpaperCreator({
  templateId,
  designId,
  credits: initialCredits,
}: WallpaperCreatorProps) {
  const router = useRouter()
  const [currentDesignId, setCurrentDesignId] = useState<string | null>(
    designId || null
  )
  const [designName, setDesignName] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(!!designId || !!templateId)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState<string | undefined>(undefined)
  const [designCount, setDesignCount] = useState<number | null>(null)
  const [showWatermark, setShowWatermark] = useState(false)
  const [credits, setCredits] = useState(initialCredits)

  const hasCredits = credits > 0

  const {
    loadFromDesign,
    resetStore,
    getSerializableState,
    setDevice,
    setGradient,
    addQRBlock,
  } = useWallpaperStore()

  // Fetch design count
  useEffect(() => {
    const fetchDesignCount = async () => {
      try {
        const response = await fetch('/api/designs')
        const data = await response.json()
        setDesignCount(data.designs?.length || 0)
      } catch (error) {
        console.error('Failed to fetch design count:', error)
      }
    }

    fetchDesignCount()
  }, [currentDesignId])

  // Load design or template on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true)

        if (designId) {
          if (currentDesignId !== designId) {
            const design = await loadDesign(designId)
            loadFromDesign(design.settings)
            setDesignName(design.name)
            setCurrentDesignId(design.id)
          }
        } else if (templateId) {
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

            setDesignName(generateDesignName())
          }
        } else {
          if (!currentDesignId) {
            resetStore()
            setDesignName(generateDesignName())
          }
        }
      } catch (error) {
        console.error('Failed to load design:', error)
        setSaveError('Failed to load design')
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [designId, templateId])

  // Auto-save function (saves are free for all users)
  const performSave = useCallback(async () => {
    if (isSaving) return

    try {
      setIsSaving(true)
      setSaveError(null)

      const settings = getSerializableState()
      const thumbnail = generateThumbnail(settings)

      if (currentDesignId) {
        await updateDesign(currentDesignId, {
          name: designName,
          settings,
          thumbnail,
        })
      } else {
        const newDesign = await saveDesign(designName, settings, thumbnail)
        setCurrentDesignId(newDesign.id)
        router.replace(`/create?design=${newDesign.id}`)
      }

      setLastSaved(new Date())
    } catch (error: any) {
      console.error('Failed to save design:', error)
      const errorMessage = error?.message || 'Failed to save'
      setSaveError(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }, [
    currentDesignId,
    designName,
    getSerializableState,
    isSaving,
    router,
  ])

  // Manual save handler (saves are free)
  const handleSave = () => {
    performSave()
  }

  // Handler for export PNG from ActionMenu
  const handleExportPNG = async () => {
    const state = getSerializableState()
    if (!state.device || !state.gradient || state.qrBlocks.length === 0) {
      setSaveError('Please complete your design first')
      return
    }

    // Check if user has credits
    if (!hasCredits) {
      setUpgradeFeature('Export PNG')
      setShowUpgradeModal(true)
      return
    }

    try {
      await exportWallpaperAsPNG()
      // Refresh credits after successful export
      const response = await fetch('/api/credits')
      const data = await response.json()
      setCredits(data.credits || 0)
    } catch (error: any) {
      console.error('Export failed:', error)
      if (error.message === 'INSUFFICIENT_CREDITS') {
        setUpgradeFeature('Export PNG')
        setShowUpgradeModal(true)
        // Refresh credits to ensure UI is in sync
        const response = await fetch('/api/credits')
        const data = await response.json()
        setCredits(data.credits || 0)
      } else {
        setSaveError('Failed to export wallpaper')
      }
    }
  }

  // Handler for showing upgrade modal with feature context
  const handleShowUpgrade = (feature: string) => {
    setUpgradeFeature(feature)
    setShowUpgradeModal(true)
  }

  // Handler for when user reaches Step 3
  const handleStep3Reached = () => {
    if (!hasCredits) {
      setShowWatermark(true)
    }
  }

  // Auto-save every 30 seconds (saves are free for everyone)
  useEffect(() => {
    const interval = setInterval(() => {
      const state = getSerializableState()
      if (state.device && state.gradient && state.qrBlocks.length > 0) {
        performSave()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [performSave, getSerializableState])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading design...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Top bar with save status */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <Input
            type="text"
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none shadow-none focus-visible:ring-2 focus-visible:ring-blue-500 px-2"
            placeholder="Design name"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Credit balance badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
            <Coins className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {credits} {credits === 1 ? 'credit' : 'credits'}
            </span>
          </div>

          {/* Design count */}
          {designCount !== null && (
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {designCount}/10 designs
            </div>
          )}

          {/* Save status */}
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {isSaving ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </span>
            ) : saveError ? (
              <span className="text-red-600 dark:text-red-400">{saveError}</span>
            ) : lastSaved ? (
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-500" />
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            ) : null}
          </div>

          {/* Action menu */}
          <ActionMenu
            credits={credits}
            onSaveToAccount={handleSave}
            onExportPNG={handleExportPNG}
            canExport={!!(getSerializableState().device && getSerializableState().gradient && getSerializableState().qrBlocks.length > 0)}
            onShowUpgrade={handleShowUpgrade}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onStep3Reached={handleStep3Reached} />
        <div className="flex-1 flex items-center justify-center p-8">
          <PreviewPhone
            credits={credits}
            showWatermark={showWatermark && !hasCredits}
            onSave={handleSave}
            isSaving={isSaving}
          />
        </div>
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => {
          setShowUpgradeModal(false)
          setUpgradeFeature(undefined)
        }}
        feature={upgradeFeature}
        currentCredits={credits}
      />
    </div>
  )
}
