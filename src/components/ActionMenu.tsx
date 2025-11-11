'use client'

import { useState, useRef, useEffect } from 'react'

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
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSaveToAccount = () => {
    if (!isSubscribed) {
      onShowUpgrade('Save to Account')
    } else {
      onSaveToAccount()
    }
    setIsOpen(false)
  }

  const handleExportPNG = () => {
    if (!isSubscribed) {
      onShowUpgrade('Export PNG')
    } else {
      onExportPNG()
    }
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
        aria-label="Actions menu"
      >
        <span>Actions</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
          {!isSubscribed && (
            <>

              <button
                onClick={handleSaveToAccount}
                disabled={!canExport}
                className="w-full px-4 py-2.5 text-left hover:bg-amber-50 dark:hover:bg-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-slate-700 dark:text-slate-300"
              >
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    Save to Account
                    <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                      Pro
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Save up to 10 designs</div>
                </div>
              </button>

              <button
                onClick={handleExportPNG}
                disabled={!canExport}
                className="w-full px-4 py-2.5 text-left hover:bg-amber-50 dark:hover:bg-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-slate-700 dark:text-slate-300"
              >
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    Export PNG
                    <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                      Pro
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Download wallpaper</div>
                </div>
              </button>
            </>
          )}

          {isSubscribed && (
            <>
              {/* Subscriber Menu - Just Export PNG */}
              <button
                onClick={handleExportPNG}
                disabled={!canExport}
                className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-slate-700 dark:text-slate-300"
              >
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <div>
                  <div className="font-medium">Export PNG</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Download wallpaper</div>
                </div>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

