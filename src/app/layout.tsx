import type { Metadata } from 'next'
import { Inter, Manrope, Outfit, Sora, JetBrains_Mono } from 'next/font/google'
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
  title: 'QR Wallpaper Creator',
  description: 'Create beautiful QR code wallpapers for your phone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} ${outfit.variable} ${sora.variable} ${jetbrainsMono.variable} font-inter antialiased`}>
        {children}
      </body>
    </html>
  )
}

