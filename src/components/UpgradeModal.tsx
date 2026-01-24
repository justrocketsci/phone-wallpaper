'use client'

import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check, Coins } from 'lucide-react'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  feature?: string
  currentCredits?: number
}

export function UpgradeModal({ isOpen, onClose, feature, currentCredits = 0 }: UpgradeModalProps) {
  const getTitle = () => {
    if (feature) {
      return `${feature} Requires Credits`
    }
    return 'Buy Download Credits'
  }

  const getDescription = () => {
    if (feature === 'Export PNG') {
      return 'Each PNG export costs 1 credit. Purchase a credit pack to download your wallpaper.'
    }
    return 'Purchase credits to export high-resolution PNG wallpapers for your phone.'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <Coins className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-center mb-3">
            {getTitle()}
          </DialogTitle>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-center">
            {getDescription()}
          </p>
        </DialogHeader>

        {/* Current Balance */}
        {currentCredits > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 text-center mb-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Current balance</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {currentCredits} {currentCredits === 1 ? 'credit' : 'credits'}
            </p>
          </div>
        )}

        {/* Features */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>1 credit = 1 PNG download</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>High-resolution exports</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>Credits never expire</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>No subscription required</span>
          </div>
        </div>

        {/* Pricing Options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">5</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">credits</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">$2.99</div>
          </div>
          <div className="border-2 border-blue-500 dark:border-blue-400 rounded-lg p-3 text-center relative">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              Best
            </span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">15</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">credits</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-white">$6.99</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button asChild variant="secondary" size="lg" className="w-full">
            <Link href="/purchase">
              Buy Credits
            </Link>
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
