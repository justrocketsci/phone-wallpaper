'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, Download, Coins, Save } from 'lucide-react'

interface ActionMenuProps {
  credits: number
  onSaveToAccount: () => void
  onExportPNG: () => void
  canExport: boolean
  onShowUpgrade: (feature: string) => void
}

export function ActionMenu({
  credits,
  onSaveToAccount,
  onExportPNG,
  canExport,
  onShowUpgrade,
}: ActionMenuProps) {
  const hasCredits = credits > 0

  const handleExportPNG = () => {
    if (!hasCredits) {
      onShowUpgrade('Export PNG')
    } else {
      onExportPNG()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <span>Actions</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {/* Save to Account - always available (free) */}
        <DropdownMenuItem
          onClick={onSaveToAccount}
          disabled={!canExport}
          className="px-4 py-2.5 cursor-pointer"
        >
          <Save className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="flex-1">
            <div className="font-medium">Save to Account</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Auto-saves every 30s</div>
          </div>
        </DropdownMenuItem>

        {/* Export PNG - requires credits */}
        <DropdownMenuItem
          onClick={handleExportPNG}
          disabled={!canExport}
          className="px-4 py-2.5 cursor-pointer"
        >
          {hasCredits ? (
            <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          )}
          <div className="flex-1">
            <div className="font-medium flex items-center gap-2">
              Export PNG
              <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
                1 credit
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {hasCredits ? 'Download high-res wallpaper' : 'Buy credits to download'}
            </div>
          </div>
        </DropdownMenuItem>

        {/* Buy more credits link */}
        {!hasCredits && (
          <DropdownMenuItem asChild className="px-4 py-2.5 cursor-pointer bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30">
            <Link href="/purchase">
              <Coins className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div className="flex-1">
                <div className="font-medium text-blue-700 dark:text-blue-300">Buy Credits</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Starting at $2.99</div>
              </div>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
