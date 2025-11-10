'use client'

import { useWallpaperStore } from '@/lib/store'
import { WallpaperCanvas } from './WallpaperCanvas'
import { ExportBar } from '../ExportBar'
import { useRef, useEffect, useState } from 'react'

export function PreviewPhone() {
  const { device } = useWallpaperStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 276, height: 600 })

  useEffect(() => {
    if (!containerRef.current || !device) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [device])

  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 text-center">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="text-2xl font-bold mb-2">Get Started</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Select a device from the sidebar to begin creating your wallpaper
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 p-8">
      <div className="text-center">
        <h2 className="text-lg font-semibold">{device.model}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {device.width} × {device.height}px
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex-shrink-0"
        style={{
          aspectRatio: `${device.width} / ${device.height}`,
          maxHeight: '600px',
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
        }}
      >
        <WallpaperCanvas
          width={device.width}
          height={device.height}
          displayWidth={dimensions.width}
          displayHeight={dimensions.height}
        />
      </div>

      <ExportBar />
    </div>
  )
}

