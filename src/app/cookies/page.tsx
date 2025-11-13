import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn about the cookies we use to provide authentication and payment processing on QR Canvas.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
              QR Canvas uses cookies to provide essential functionality for our service. 
              All cookies used by our application are strictly necessary for the operation 
              of the service and cannot be disabled.
            </p>
          </div>
        </section>

        {/* What are cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            What are cookies?
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Cookies are small text files that are placed on your device when you visit a website. 
            They help websites remember your preferences and provide essential functionality.
          </p>
        </section>

        {/* Cookies we use */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Cookies we use
          </h2>

          {/* Authentication Cookies */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Authentication Cookies (Clerk)
            </h3>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <div>
                <span className="font-medium">Purpose:</span> To authenticate users and maintain secure login sessions
              </div>
              <div>
                <span className="font-medium">Cookie names:</span> <code className="px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded text-sm">__session</code>, <code className="px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded text-sm">__clerk_db_jwt</code>
              </div>
              <div>
                <span className="font-medium">Duration:</span> Session-based (deleted when you close your browser) or up to 7 days
              </div>
              <div>
                <span className="font-medium">Provider:</span> Clerk (our authentication service)
              </div>
              <div>
                <span className="font-medium">Category:</span> Strictly Necessary
              </div>
            </div>
          </div>

          {/* Payment Cookies */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Payment Processing Cookies (Stripe)
            </h3>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <div>
                <span className="font-medium">Purpose:</span> To securely process payments and prevent fraud
              </div>
              <div>
                <span className="font-medium">Cookie names:</span> <code className="px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded text-sm">__stripe_mid</code>, <code className="px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded text-sm">__stripe_sid</code>
              </div>
              <div>
                <span className="font-medium">Duration:</span> 1 year (mid) / 30 minutes (sid)
              </div>
              <div>
                <span className="font-medium">Provider:</span> Stripe (our payment processor)
              </div>
              <div>
                <span className="font-medium">Category:</span> Strictly Necessary
              </div>
            </div>
          </div>
        </section>

        {/* Why we use them */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Why these cookies are necessary
          </h2>
          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p className="leading-relaxed">
              The cookies we use are essential for the core functionality of QR Canvas:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Authentication cookies</strong> allow you to sign in and access your account securely. 
                Without these, you would not be able to save your designs or access premium features.
              </li>
              <li>
                <strong>Payment cookies</strong> enable secure subscription processing and protect against 
                fraudulent transactions. They are only used when you interact with our payment system.
              </li>
            </ul>
          </div>
        </section>

        {/* Managing cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Can I disable these cookies?
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Because these cookies are strictly necessary for the operation of QR Canvas, 
            they cannot be disabled through our website. However, you can configure your 
            browser to block or delete cookies:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
            </li>
            <li>
              <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
            </li>
            <li>
              <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
            </li>
          </ul>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
            Please note that blocking these cookies will prevent you from using QR Canvas.
          </p>
        </section>

        {/* Updates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Updates to this policy
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in our 
            practices or for operational, legal, or regulatory reasons. We will notify 
            you of any material changes by updating the "Last updated" date at the top 
            of this policy.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Questions?
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            If you have any questions about our use of cookies, please contact us through 
            our support channels.
          </p>
        </section>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

