'use client'

import { useWallpaperStore } from '@/lib/store'
import { gradients, Gradient } from '@/data/gradients'
import { clsx } from 'clsx'

export function StepBackground() {
  const { gradient, setGradient } = useWallpaperStore()

  const getGradientStyle = (grad: Gradient) => {
    if (grad.type === 'linear') {
      return {
        background: `linear-gradient(${grad.angle || 135}deg, ${grad.colors.join(', ')})`,
      }
    } else {
      return {
        background: `radial-gradient(circle, ${grad.colors.join(', ')})`,
      }
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {gradients.map((grad) => (
          <button
            key={grad.id}
            onClick={() => setGradient(grad)}
            className={clsx(
              'relative rounded-lg overflow-hidden transition-all aspect-video border-2',
              gradient?.id === grad.id
                ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
            )}
          >
            <div className="absolute inset-0" style={getGradientStyle(grad)} />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <div className="text-white text-xs font-medium">{grad.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

