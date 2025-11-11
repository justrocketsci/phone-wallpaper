import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <SignedOut>
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
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="flex items-center gap-3">
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
            </SignedIn>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <Link 
                href="/sign-in"
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up"
                className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200"
              >
                Get Started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link 
                href="/dashboard"
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link 
                href="/create"
                className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200"
              >
                Create
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  )
}

