import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export function Pricing() {
  const features = [
    'Unlimited wallpaper exports',
    'Up to 2 QR codes per wallpaper',
    'Premium gradient backgrounds',
    'All device resolutions',
    'High-resolution PNG exports',
    'Save up to 10 designs',
    'Cancel anytime',
  ]

  return (
    <section id="pricing" className="relative py-24 bg-white dark:bg-slate-900 overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Simple, Affordable Pricing
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            One plan with everything you need to create stunning QR code wallpapers. No hidden fees, no complicated tiers.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="relative">
            {/* Card with Gradient Border Effect */}
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="absolute inset-[2px] bg-white dark:bg-slate-800 rounded-2xl" />

              {/* Card Content */}
              <div className="relative z-10 p-8 md:p-10">
                {/* Launch Offer Badges */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                    🎉 Launch Offer
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                    50% OFF
                  </div>
                </div>

                {/* Plan Name */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Pro Plan 🚀
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Everything you need to grow your presence
                  </p>
                </div>

                {/* Discounted Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
                      $1.97
                    </span>
                    <span className="text-xl text-slate-600 dark:text-slate-400">/month</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-lg text-slate-400 dark:text-slate-500 line-through">
                      $3.95
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      /month
                    </span>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg px-4 py-2 inline-block">
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">
                      ⚡ Limited time offer - Lock in this rate forever
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" strokeWidth={3} />
                      </div>
                      <span className="text-base md:text-lg text-slate-700 dark:text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  asChild
                  size="xl"
                  className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 hover:from-pink-700 hover:via-purple-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 px-3 py-2"
                >
                  <Link href="/sign-up">
                    Start Creating Now
                  </Link>
                </Button>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Secure payment via Stripe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Cancel anytime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


