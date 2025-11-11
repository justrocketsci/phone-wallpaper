'use client'

import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check, Lock } from 'lucide-react'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  feature?: string
}

export function UpgradeModal({ isOpen, onClose, feature }: UpgradeModalProps) {
  const getTitle = () => {
    if (feature) {
      return `${feature} Requires Subscription`
    }
    return 'Upgrade to Premium'
  }

  const getDescription = () => {
    if (feature === 'Save to Account') {
      return 'Subscribe to save up to 10 designs to your account and access them from any device.'
    }
    if (feature === 'Export PNG') {
      return 'Subscribe to download high-resolution PNG wallpapers for your phone.'
    }
    return 'Subscribe to QR Canvas to unlock unlimited wallpaper exports and save your designs.'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
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

        {/* Features */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>Unlimited wallpaper exports</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>Up to 2 QR codes per wallpaper</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>High-resolution PNG exports</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>Save up to 10 designs</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">
              $3.95
            </span>
            <span className="text-slate-600 dark:text-slate-400">/month</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Cancel anytime
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button asChild variant="secondary" size="lg" className="w-full">
            <Link href="/subscribe">
              Subscribe Now
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

