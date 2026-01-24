import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buy Credits',
  description: 'Purchase download credits for QR Canvas. Export high-resolution QR code wallpapers with our simple credit system. Credits never expire.',
  keywords: [
    'QR Canvas credits',
    'QR wallpaper download',
    'buy wallpaper credits',
    'QR code wallpaper export'
  ],
  openGraph: {
    title: 'Buy Credits - QR Canvas',
    description: 'Purchase download credits to export high-resolution QR code wallpapers.',
    url: '/purchase',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Credits - QR Canvas',
    description: 'Purchase download credits to export high-resolution QR code wallpapers.',
  },
}

export default function PurchaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
