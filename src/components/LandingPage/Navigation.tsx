import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 flex-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/product-logo.svg"
                alt="QR Canvas Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-semibold text-slate-900 dark:text-white">
                QR Canvas
              </span>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#pricing"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <Button asChild variant="default" size="md">
              <Link href="/create">
                Start Creating
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
