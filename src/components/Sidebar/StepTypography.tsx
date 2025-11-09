'use client'

import { useWallpaperStore } from '@/lib/store'
import { fonts, fontPresets } from '@/data/fonts'
import { clsx } from 'clsx'

export function StepTypography() {
  const { typography, setTypography } = useWallpaperStore()

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Presets</label>
        <div className="space-y-2">
          {fontPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() =>
                setTypography({
                  fontFamily: preset.font,
                  fontSize: preset.size,
                  fontWeight: preset.weight,
                  letterSpacing: preset.letterSpacing,
                  textTransform: preset.transform,
                  underline: preset.underline,
                })
              }
              className="w-full p-3 text-left border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 rounded-lg transition-colors"
            >
              <div className="font-medium text-sm">{preset.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {fonts.find((f) => f.id === preset.font)?.name} • {preset.weight}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
        <label className="block text-sm font-medium mb-2">Custom Settings</label>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1">Font Family</label>
            <select
              value={typography.fontFamily}
              onChange={(e) => setTypography({ fontFamily: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm"
            >
              {fonts.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">
              Font Size: {typography.fontSize}px
            </label>
            <input
              type="range"
              min="10"
              max="24"
              value={typography.fontSize}
              onChange={(e) => setTypography({ fontSize: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">
              Font Weight: {typography.fontWeight}
            </label>
            <input
              type="range"
              min="400"
              max="800"
              step="100"
              value={typography.fontWeight}
              onChange={(e) => setTypography({ fontWeight: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">
              Letter Spacing: {typography.letterSpacing}px
            </label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={typography.letterSpacing}
              onChange={(e) =>
                setTypography({ letterSpacing: parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Text Transform</label>
            <select
              value={typography.textTransform}
              onChange={(e) =>
                setTypography({
                  textTransform: e.target.value as 'none' | 'uppercase' | 'lowercase',
                })
              }
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm"
            >
              <option value="none">None</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="underline"
              checked={typography.underline}
              onChange={(e) => setTypography({ underline: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="underline" className="text-sm">
              Underline
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

