'use client'

import { PreviewPhone } from './Preview/PreviewPhone'
import { Sidebar } from './Sidebar/Sidebar'

export default function WallpaperCreator() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-8">
        <PreviewPhone />
      </div>
    </div>
  )
}

