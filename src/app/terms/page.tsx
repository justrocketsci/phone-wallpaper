import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using QR Canvas, our QR code wallpaper creation service.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
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
              ⚠️ DRAFT DOCUMENT - These Terms of Service are a template and require legal review and customization before production use.
            </p>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Last updated: November 12, 2025
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                By accessing and using QR Canvas (&ldquo;the Service&rdquo;), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                QR Canvas provides a web-based platform for creating custom QR code wallpapers. The Service allows users to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
                <li>Create custom QR code wallpapers</li>
                <li>Choose from various backgrounds and design options</li>
                <li>Add up to 2 QR codes per wallpaper</li>
                <li>Purchase and download wallpapers in high resolution</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                3. Age Requirement
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                You must be at least 13 years old to use this Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                4. Payments and Downloads
              </h2>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                4.1 Pricing
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Each wallpaper download is available as a one-time purchase at the price displayed at checkout. No account or subscription is required. Payments are processed securely through Stripe.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                4.2 Refund Policy
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Due to the digital nature of the product, refunds are handled on a case-by-case basis. If you experience a technical issue preventing your download, please contact us for assistance.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                4.3 Price Changes
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We reserve the right to modify prices at any time. The price at the time of your purchase is the price you pay.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                5. Acceptable Use
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Create QR codes linking to malicious, fraudulent, or illegal content</li>
                <li>Harass, abuse, or harm others</li>
                <li>Distribute spam or unsolicited messages</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for any automated or bulk operations without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                6. Intellectual Property
              </h2>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                6.1 Your Content
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                You retain all rights to the wallpapers you create. By using the Service, you grant us a limited license to store and display your designs for the purpose of providing the Service.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                6.2 Our Content
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                The Service, including its design, features, and functionality, is owned by QR Canvas and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or reverse engineer any part of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                7. Disclaimers and Limitations of Liability
              </h2>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                7.1 Service Availability
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                The Service is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We do not guarantee that the Service will be uninterrupted, secure, or error-free. We reserve the right to modify or discontinue the Service at any time.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
                7.2 Limitation of Liability
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                To the maximum extent permitted by law, QR Canvas shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses resulting from:
              </p>
              <ul className="list-disc pl-6 mb-4 text-slate-700 dark:text-slate-300 space-y-2">
                <li>Your use or inability to use the Service</li>
                <li>Unauthorized access to your account or data</li>
                <li>Errors or interruptions in the Service</li>
                <li>Any third-party content or conduct</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                8. Indemnification
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                You agree to indemnify and hold harmless QR Canvas, its affiliates, and their respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                9. Termination
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We reserve the right to suspend or terminate your account and access to the Service at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Upon termination, your right to use the Service will immediately cease. You may request deletion of your data by contacting us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                11. Governing Law
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                12. Contact Information
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <p className="text-slate-700 dark:text-slate-300 mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:support@qrcanvas.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                  support@qrcanvas.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

