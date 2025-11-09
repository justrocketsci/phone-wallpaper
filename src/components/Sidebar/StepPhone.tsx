'use client'

import { useWallpaperStore, Device } from '@/lib/store'
import devices from '@/data/devices.json'
import { clsx } from 'clsx'

export function StepPhone() {
  const { device, setDevice } = useWallpaperStore()

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2">
        {devices.map((d) => {
          const deviceData = d as Device
          return (
            <button
              key={deviceData.id}
              onClick={() => setDevice(deviceData)}
              className={clsx(
                'p-3 rounded-lg border-2 text-left transition-all',
                device?.id === deviceData.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              )}
            >
              <div className="font-medium text-sm">{deviceData.model}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {deviceData.width} × {deviceData.height}px
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

