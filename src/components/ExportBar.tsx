'use client'

import { useWallpaperStore } from '@/lib/store'
import { exportWallpaperAsPNG, saveWallpaperConfig, loadWallpaperConfig } from '@/lib/export'
import { useState, useRef } from 'react'

export function ExportBar() {
  const { device, gradient, qrBlocks } = useWallpaperStore()
  const [isExporting, setIsExporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleSaveConfig = () => {
    try {
      saveWallpaperConfig()
    } catch (error) {
      console.error('Save config failed:', error)
      alert('Failed to save configuration.')
    }
  }

  const handleLoadConfig = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      await loadWallpaperConfig(file)
      alert('Configuration loaded successfully!')
    } catch (error) {
      console.error('Load config failed:', error)
      alert('Failed to load configuration. Please check the file.')
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const canExport = device && gradient && qrBlocks.length > 0

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleExport}
        disabled={!canExport || isExporting}
        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors shadow-lg disabled:shadow-none disabled:cursor-not-allowed"
      >
        {isExporting ? 'Exporting...' : 'Download Wallpaper'}
      </button>

      <div className="flex gap-2">
        <button
          onClick={handleSaveConfig}
          disabled={!canExport}
          className="px-4 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:bg-slate-100 dark:disabled:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed"
          title="Save configuration"
        >
          Save Config
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleLoadConfig}
          className="hidden"
          id="load-config"
        />
        <label
          htmlFor="load-config"
          className="px-4 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors cursor-pointer inline-block"
          title="Load configuration"
        >
          Load Config
        </label>
      </div>

      {!canExport && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Complete all steps to export
        </p>
      )}
    </div>
  )
}

