'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, Lock, Download } from 'lucide-react'

interface ActionMenuProps {
  isSubscribed: boolean
  onSaveToAccount: () => void
  onExportPNG: () => void
  canExport: boolean
  onShowUpgrade: (feature: string) => void
}

export function ActionMenu({
  isSubscribed,
  onSaveToAccount,
  onExportPNG,
  canExport,
  onShowUpgrade,
}: ActionMenuProps) {
  const handleSaveToAccount = () => {
    if (!isSubscribed) {
      onShowUpgrade('Save to Account')
    } else {
      onSaveToAccount()
    }
  }

  const handleExportPNG = () => {
    if (!isSubscribed) {
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
        {!isSubscribed && (
          <>
            <DropdownMenuItem
              onClick={handleSaveToAccount}
              disabled={!canExport}
              className="px-4 py-2.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 cursor-pointer"
            >
              <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div className="flex-1">
                <div className="font-medium flex items-center gap-2">
                  Save to Account
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                    Pro
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Save up to 10 designs</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleExportPNG}
              disabled={!canExport}
              className="px-4 py-2.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 cursor-pointer"
            >
              <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div className="flex-1">
                <div className="font-medium flex items-center gap-2">
                  Export PNG
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                    Pro
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Download wallpaper</div>
              </div>
            </DropdownMenuItem>
          </>
        )}

        {isSubscribed && (
          <DropdownMenuItem
            onClick={handleExportPNG}
            disabled={!canExport}
            className="px-4 py-2.5 cursor-pointer"
          >
            <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div className="flex-1">
              <div className="font-medium">Export PNG</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Download wallpaper</div>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

