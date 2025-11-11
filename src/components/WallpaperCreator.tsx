'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { PreviewPhone } from './Preview/PreviewPhone'
import { Sidebar } from './Sidebar/Sidebar'
import { UpgradeModal } from './UpgradeModal'
import { ActionMenu } from './ActionMenu'
import { useWallpaperStore } from '@/lib/store'
import {
  loadDesign,
  updateDesign,
  saveDesign,
  generateDesignName,
  generateThumbnail,
  getTemplateSettings,
} from '@/lib/design'
import { exportWallpaperAsPNG } from '@/lib/export'
import { templates } from '@/data/templates'
import { gradients } from '@/data/gradients'
import devices from '@/data/devices.json'

interface WallpaperCreatorProps {
  templateId?: string
  designId?: string
  isSubscribed: boolean
}

export default function WallpaperCreator({
  templateId,
  designId,
  isSubscribed,
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

  const {
    loadFromDesign,
    resetStore,
    getSerializableState,
    setDevice,
    setGradient,
    addQRBlock,
  } = useWallpaperStore()

  // Fetch design count for subscribed users
  useEffect(() => {
    const fetchDesignCount = async () => {
      if (!isSubscribed) return

      try {
        const response = await fetch('/api/designs')
        const data = await response.json()
        setDesignCount(data.designs?.length || 0)
      } catch (error) {
        console.error('Failed to fetch design count:', error)
      }
    }

    fetchDesignCount()
  }, [isSubscribed, currentDesignId]) // Refetch when a new design is saved

  // Load design or template on mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true)

        if (designId) {
          // Load existing design
          const design = await loadDesign(designId)
          loadFromDesign(design.settings)
          setDesignName(design.name)
          setCurrentDesignId(design.id)
        } else if (templateId) {
          // Load template
          const template = templates.find((t) => t.id === templateId)
          if (template) {
            resetStore()

            // Set gradient
            const gradientData = gradients.find((g) => g.id === template.gradient)
            if (gradientData) {
              setGradient(gradientData)
            }

            // Set default device (iPhone 15 Pro or first available)
            const defaultDevice =
              devices.find((d) => d.model === 'iPhone 15 Pro') || devices[0]
            if (defaultDevice) {
              setDevice(defaultDevice)
            }

            // Add QR blocks from template
            template.qrBlocks.forEach((block, index) => {
              addQRBlock({
                ...block,
                id: `qr-${Date.now()}-${index}`,
              })
            })

            // Set generated name
            setDesignName(generateDesignName())
          }
        } else {
          // Fresh start
          resetStore()
          setDesignName(generateDesignName())
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

  // Auto-save function
  const performSave = useCallback(async () => {
    if (isSaving) return

    try {
      setIsSaving(true)
      setSaveError(null)

      const settings = getSerializableState()
      const thumbnail = generateThumbnail(settings)

      if (currentDesignId) {
        // Update existing design
        await updateDesign(currentDesignId, {
          name: designName,
          settings,
          thumbnail,
        })
      } else {
        // Create new design
        const newDesign = await saveDesign(designName, settings, thumbnail)
        setCurrentDesignId(newDesign.id)
        // Update URL to reflect the new design ID
        router.replace(`/create?design=${newDesign.id}`)
      }

      setLastSaved(new Date())
    } catch (error: any) {
      console.error('Failed to save design:', error)
      // Extract error message from API response
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

  // Manual save handler
  const handleSave = () => {
    // Show upgrade modal if not subscribed
    if (!isSubscribed) {
      setUpgradeFeature('Save to Account')
      setShowUpgradeModal(true)
      return
    }
    performSave()
  }

  // Handler for export PNG from ActionMenu
  const handleExportPNG = async () => {
    const state = getSerializableState()
    if (!state.device || !state.gradient || state.qrBlocks.length === 0) {
      setSaveError('Please complete your design first')
      return
    }

    try {
      await exportWallpaperAsPNG()
    } catch (error) {
      console.error('Export failed:', error)
      setSaveError('Failed to export wallpaper')
    }
  }

  // Handler for showing upgrade modal with feature context
  const handleShowUpgrade = (feature: string) => {
    setUpgradeFeature(feature)
    setShowUpgradeModal(true)
  }

  // Handler for when user reaches Step 3
  const handleStep3Reached = () => {
    if (!isSubscribed) {
      setShowWatermark(true)
    }
  }

  // Auto-save every 30 seconds
  useEffect(() => {
    // Don't auto-save for non-subscribers
    if (!isSubscribed) return

    const interval = setInterval(() => {
      const state = getSerializableState()
      // Only auto-save if there's actual content
      if (state.device && state.gradient && state.qrBlocks.length > 0) {
        performSave()
      }
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [performSave, getSerializableState, isSubscribed])

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
          <button
            onClick={() => router.push('/dashboard')}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <input
            type="text"
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none outline-none text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
            placeholder="Design name"
          />
        </div>

        <div className="flex items-center gap-4">
          {!isSubscribed ? (
            /* Non-Subscriber: Show ActionMenu dropdown */
            <ActionMenu
              isSubscribed={isSubscribed}
              onSaveToAccount={handleSave}
              onExportPNG={handleExportPNG}
              canExport={!!(getSerializableState().device && getSerializableState().gradient && getSerializableState().qrBlocks.length > 0)}
              onShowUpgrade={handleShowUpgrade}
            />
          ) : (
            /* Subscriber: Show design count and auto-save status */
            <>
              {designCount !== null && (
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {designCount}/10 designs
                </div>
              )}

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
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Auto-saved {lastSaved.toLocaleTimeString()}
                  </span>
                ) : null}
              </div>

              {/* Action menu for subscribers (simpler version) */}
              <ActionMenu
                isSubscribed={isSubscribed}
                onSaveToAccount={handleSave}
                onExportPNG={handleExportPNG}
                canExport={!!(getSerializableState().device && getSerializableState().gradient && getSerializableState().qrBlocks.length > 0)}
                onShowUpgrade={handleShowUpgrade}
              />
            </>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onStep3Reached={handleStep3Reached} />
        <div className="flex-1 flex items-center justify-center p-8">
          <PreviewPhone isSubscribed={isSubscribed} showWatermark={showWatermark} />
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
      />
    </div>
  )
}

