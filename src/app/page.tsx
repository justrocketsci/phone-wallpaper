import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { Navigation } from '@/components/LandingPage/Navigation'
import { Hero } from '@/components/LandingPage/Hero'
import { FAQ } from '@/components/LandingPage/FAQ'
import { Footer } from '@/components/LandingPage/Footer'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Create stunning QR code wallpapers that turn every phone lock screen into an opportunity. Drive traffic, boost engagement, and make your call-to-action unforgettable.',
  keywords: [
    'QR code wallpaper',
    'phone lock screen marketing',
    'custom QR wallpaper',
    'QR code generator',
    'create QR wallpaper',
    'phone wallpaper maker'
  ],
  openGraph: {
    title: 'QR Canvas - Turn Your Lock Screen Into a Marketing Tool',
    description: 'Create stunning QR code wallpapers that turn every phone lock screen into an opportunity.',
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Canvas - Turn Your Lock Screen Into a Marketing Tool',
    description: 'Create stunning QR code wallpapers that turn every phone lock screen into an opportunity.',
  },
}

export default async function Home() {
  const { userId } = await auth()

  // Redirect signed-in users to dashboard
  if (userId) {
    redirect('/dashboard')
  }

  // Structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'QR Canvas',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '3.95',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
    },
    description: 'Create stunning QR code wallpapers that drive engagement and boost your call-to-action. Turn every phone lock screen into a marketing opportunity.',
    featureList: [
      'Custom QR code wallpapers',
      'Multiple device support',
      'Gradient backgrounds',
      'Up to 2 QR codes per wallpaper',
      'High-resolution PNG export',
      'Brand icon library',
    ],
    screenshot: '/og-image.png',
  }

  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <Hero />
      <FAQ />
      <Footer />
    </div>
  )
}

