import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const features = [
  'High-resolution PNG export',
  'All device resolutions',
  'Up to 2 QR codes per wallpaper',
  'No account needed',
  'Pay per download',
  'Secure payment via Stripe',
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 bg-white dark:bg-slate-900 overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Simple Pricing
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            No subscription. No account. Just pay per download.
          </p>
        </div>

        {/* Single Pricing Card */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden ring-2 ring-blue-500 dark:ring-blue-400">
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 text-sm font-semibold">
              Per Wallpaper
            </div>

            <div className="p-8 pt-14">
              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-slate-900 dark:text-white mb-2">
                  $1.99
                </div>
                <div className="text-xl text-slate-600 dark:text-slate-400">
                  per wallpaper download
                </div>
              </div>

              {/* CTA Button */}
              <Button
                asChild
                size="xl"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                <Link href="/create">
                  Start Creating
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white text-center mb-6">
            What&apos;s included
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" strokeWidth={3} />
                </div>
                <span className="text-slate-700 dark:text-slate-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure payment via Stripe</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>No account required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No subscription</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
