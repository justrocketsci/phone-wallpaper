import Link from 'next/link'

export default function PurchaseCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 text-center">
          {/* Cancel Icon */}
          <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Purchase Canceled
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Your purchase was canceled. No charges were made to your account.
          </p>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              href="/purchase"
              className="inline-block w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="inline-block w-full px-6 py-4 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-semibold transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>

          {/* Additional Info */}
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            Questions? Contact us at support@qrcanvas.com
          </p>
        </div>
      </div>
    </div>
  )
}
