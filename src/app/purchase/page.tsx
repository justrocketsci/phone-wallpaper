'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

const CREDIT_PACKS = [
  {
    id: '5',
    credits: 5,
    price: '$2.99',
    pricePerCredit: '$0.60',
    popular: false,
  },
  {
    id: '15',
    credits: 15,
    price: '$6.99',
    pricePerCredit: '$0.47',
    popular: true,
    savings: 'Save 22%',
  },
]

export default function PurchasePage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async (packId: string) => {
    try {
      setLoading(packId)
      setError(null)

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creditPack: packId }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()

      if (!url) {
        throw new Error('No checkout URL returned')
      }

      window.location.href = url
    } catch (err: any) {
      console.error('Purchase error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Buy Download Credits
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Export high-resolution wallpapers for your phone
          </p>
        </div>

        {/* Credit Packs */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border-2 transition-all ${
                pack.popular
                  ? 'border-blue-500 dark:border-blue-400'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Best Value
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
                  {pack.credits}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-lg">
                  credits
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {pack.price}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {pack.pricePerCredit} per download
                </div>
                {pack.savings && (
                  <div className="mt-2 inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    {pack.savings}
                  </div>
                )}
              </div>

              <button
                onClick={() => handlePurchase(pack.id)}
                disabled={loading !== null}
                className={`w-full px-6 py-4 rounded-lg font-semibold transition-colors duration-200 ${
                  pack.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === pack.id ? 'Loading...' : `Buy ${pack.credits} Credits`}
              </button>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Features */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-center">
            What you get with credits
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
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
              <span>All device resolutions</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Credits never expire</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Free design saves (unlimited)</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>No subscription required</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
          <p className="mb-2">Secure payment powered by Stripe</p>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
