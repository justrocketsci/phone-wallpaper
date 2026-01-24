import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Purchase Credits',
  description: 'Buy credits to download QR code wallpapers. Pay per download, no subscription required.',
}

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
