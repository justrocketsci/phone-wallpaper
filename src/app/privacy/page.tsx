import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how QR Canvas collects, uses, and protects your personal information.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-semibold text-slate-900 dark:text-white">
              QR Canvas
            </Link>
            <Link
              href="/"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-200 font-semibold">
              ⚠️ DRAFT DOCUMENT - This Privacy Policy is a template and requires legal review and customization before production use.
            </p>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Last updated: November 12, 2025
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Introduction
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                QR Canvas (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our QR code wallpaper creation service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Information We Collect
              </h2>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                Personal Information
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                When you create an account, we collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
                <li>Email address</li>
                <li>Name (first and last)</li>
                <li>Profile information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                Design Data
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                When you create wallpapers, we store:
              </p>
              <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
                <li>QR code URLs and content</li>
                <li>Design preferences (colors, backgrounds, fonts)</li>
                <li>Created wallpaper designs</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                Payment Information
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                For subscription payments, we use Stripe. We do not store your full credit card details. Stripe collects and processes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
                <li>Payment card information</li>
                <li>Billing address</li>
                <li>Transaction history</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                How We Use Your Information
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
                <li>Provide and maintain our service</li>
                <li>Process your subscription payments</li>
                <li>Send you service-related notifications</li>
                <li>Improve and optimize our application</li>
                <li>Analyze usage patterns and trends</li>
                <li>Prevent fraud and enhance security</li>
                <li>Comply with legal obligations</li>
                <li>Respond to your support requests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Third-Party Services
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We use the following third-party services:
              </p>
              
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                Clerk (Authentication)
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We use Clerk for user authentication and account management. Clerk processes your email, name, and authentication data. View their privacy policy at{' '}
                <a href="https://clerk.com/privacy" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  clerk.com/privacy
                </a>
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                Stripe (Payments)
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We use Stripe for payment processing. Stripe handles all payment card information securely. View their privacy policy at{' '}
                <a href="https://stripe.com/privacy" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  stripe.com/privacy
                </a>
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                Analytics Services
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We may use analytics services like Google Analytics to understand how users interact with our service. These services may use cookies and similar technologies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Data Security
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure hosting infrastructure</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Your Rights
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your data</li>
                <li><strong>Portability:</strong> Request transfer of your data</li>
                <li><strong>Objection:</strong> Object to processing of your data</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
              </ul>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                To exercise these rights, please contact us using the information below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Data Retention
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Children&apos;s Privacy
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                If you have any questions about this Privacy Policy or our practices, please contact us at:
              </p>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@qrcanvas.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                  privacy@qrcanvas.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

