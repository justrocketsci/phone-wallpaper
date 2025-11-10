'use client'

import { Device } from '@/lib/store'

interface IPhoneSystemUIProps {
  device: Device
  width: number
  height: number
}

export function IPhoneSystemUI({ device, width, height }: IPhoneSystemUIProps) {
  if (!device.systemUI) return null

  // Calculate scale factor based on standard iPhone viewport (390×844 points)
  const standardWidth = 390
  const scaleFactor = width / standardWidth

  return (
    <div className="absolute inset-0 pointer-events-none text-white">
      {/* Home indicator bar at very bottom */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-white rounded-full"
        style={{
          bottom: `${scaleFactor * 8}px`,
          width: `${width * 0.35}px`,
          height: `${scaleFactor * 5}px`,
        }}
      />
    </div>
  )
}

