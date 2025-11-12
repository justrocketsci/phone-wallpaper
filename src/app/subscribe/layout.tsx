import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subscribe',
  description: 'Unlock unlimited QR code wallpaper exports for just $3.95/month. All device resolutions, unlimited exports, cancel anytime.',
  keywords: [
    'QR Canvas subscription',
    'QR wallpaper pricing',
    'unlimited wallpaper exports',
    'QR code wallpaper subscription'
  ],
  openGraph: {
    title: 'Subscribe to QR Canvas - Unlimited Wallpaper Exports',
    description: 'Unlock unlimited QR code wallpaper exports for just $3.95/month.',
    url: '/subscribe',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subscribe to QR Canvas - Unlimited Wallpaper Exports',
    description: 'Unlock unlimited QR code wallpaper exports for just $3.95/month.',
  },
}

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

