import type { Metadata } from 'next'
import { Inter, Manrope, Outfit, Sora, JetBrains_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
})

const sora = Sora({ 
  subsets: ['latin'],
  variable: '--font-sora',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://qrcanvas.app'),
  title: {
    default: 'QR Canvas - Create Beautiful QR Code Wallpapers',
    template: '%s | QR Canvas'
  },
  description: 'Create stunning QR code wallpapers that drive engagement and boost your call-to-action. Turn every phone lock screen into a marketing opportunity.',
  keywords: [
    'QR code wallpaper',
    'wallpaper creator',
    'phone wallpaper',
    'QR code generator',
    'custom wallpaper',
    'mobile marketing',
    'lock screen marketing',
    'QR code background',
    'iPhone wallpaper',
    'Android wallpaper',
    'custom QR code',
    'wallpaper maker'
  ],
  authors: [{ name: 'QR Canvas' }],
  creator: 'QR Canvas',
  publisher: 'QR Canvas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'QR Canvas',
    title: 'QR Canvas - Create Beautiful QR Code Wallpapers',
    description: 'Create stunning QR code wallpapers that drive engagement and boost your call-to-action. Turn every phone lock screen into a marketing opportunity.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QR Canvas - Create Beautiful QR Code Wallpapers for Any Device',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Canvas - Create Beautiful QR Code Wallpapers',
    description: 'Create stunning QR code wallpapers that drive engagement and boost your call-to-action',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${manrope.variable} ${outfit.variable} ${sora.variable} ${jetbrainsMono.variable} font-inter antialiased`}>
          {/* Google Analytics */}
          {GA_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `}
              </Script>
            </>
          )}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

