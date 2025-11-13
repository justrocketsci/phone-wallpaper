'use client'

import { useWallpaperStore, QRBlock } from '@/lib/store'
import { icons } from '@/data/icons'
import { clsx } from 'clsx'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function StepQR() {
  const { qrBlocks, addQRBlock, updateQRBlock, removeQRBlock } = useWallpaperStore()
  const [newUrl, setNewUrl] = useState('')
  const [newLabel, setNewLabel] = useState('')

  const handleAddQR = () => {
    if (!newUrl || qrBlocks.length >= 2) return

    const newBlock: QRBlock = {
      id: `qr-${Date.now()}`,
      url: newUrl,
      label: newLabel || newUrl,
      iconType: 'website',
      x: 50,
      y: qrBlocks.length === 0 ? 40 : 70,
      size: Math.min(563, 650), // Ensure size stays within backend validation limit
      color: '#000000',
      errorCorrection: 'H',
    }

    addQRBlock(newBlock)
    setNewUrl('')
    setNewLabel('')
  }

  return (
    <div className="space-y-4">
      {qrBlocks.length < 2 && (
        <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <Input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <Input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="My Website"
              maxLength={30}
            />
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-right">
              {newLabel.length}/30 characters
            </div>
          </div>
          <Button
            onClick={handleAddQR}
            disabled={!newUrl}
            variant="secondary"
            className="w-full"
          >
            Add QR Code ({qrBlocks.length}/2)
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {qrBlocks.map((block) => (
          <div
            key={block.id}
            className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{block.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {block.url}
                </div>
              </div>
              <Button
                onClick={() => removeQRBlock(block.id)}
                variant="ghost"
                size="sm"
                className="ml-2 text-red-500 hover:text-red-600"
              >
                Remove
              </Button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium mb-1">Icon</label>
                <Select
                  value={block.iconType || 'website'}
                  onValueChange={(value) =>
                    updateQRBlock(block.id, {
                      iconType: value as QRBlock['iconType'],
                    })
                  }
                >
                  <SelectTrigger className="w-full text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {icons.map((icon) => (
                      <SelectItem key={icon.id} value={icon.id}>
                        {icon.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Color: {block.color}
                </label>
                <input
                  type="color"
                  value={block.color}
                  onChange={(e) => updateQRBlock(block.id, { color: e.target.value })}
                  className="w-full h-8 rounded border border-slate-300 dark:border-slate-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {qrBlocks.length === 0 && (
        <div className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">
          Add your first QR code to get started
        </div>
      )}
    </div>
  )
}

