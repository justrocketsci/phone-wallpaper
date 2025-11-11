import Link from 'next/link'
import { PhoneShowcase } from './PhoneShowcase'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background - Stripe-inspired with slate blend */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-pink-950">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-100/30 to-pink-200/40 dark:from-transparent dark:via-orange-950/30 dark:to-pink-900/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-8 xl:gap-12 items-center lg:items-start">
          {/* Left Column - Hero Text */}
          <div className="text-center lg:text-left lg:max-w-none">
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
              The BEST Call to Action
              <br />
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                for your product
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
              Create stunning QR code wallpapers that turn every phone unlock into an opportunity. 
              Drive traffic, boost engagement, and make your call-to-action unforgettable.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold text-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Creating
              </Link>
              <Link
                href="/sign-in"
                className="px-8 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-xl font-semibold text-lg hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Right Column - iPhone Showcase */}
          <div className="relative flex items-center lg:items-start justify-center lg:justify-end">
            <PhoneShowcase />
          </div>
        </div>
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-orange-300 dark:bg-orange-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </section>
  )
}

