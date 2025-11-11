'use client'

import { useWallpaperStore, Device } from '@/lib/store'
import devices from '@/data/devices.json'
import { clsx } from 'clsx'
import { Button } from '@/components/ui/button'

export function StepPhone() {
  const { device, setDevice } = useWallpaperStore()

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2">
        {devices.map((d) => {
          const deviceData = d as Device
          const isSelected = device?.id === deviceData.id
          return (
            <Button
              key={deviceData.id}
              onClick={() => setDevice(deviceData)}
              variant={isSelected ? "default" : "outline"}
              className={clsx(
                'h-auto p-3 justify-start',
                isSelected && 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20'
              )}
            >
              <div className="text-left">
                <div className="font-medium text-sm">{deviceData.model}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {deviceData.width} × {deviceData.height}px
                </div>
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

