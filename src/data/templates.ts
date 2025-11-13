import { QRBlock, Typography } from '@/lib/store'

export interface Template {
  id: string
  name: string
  description: string
  gradient: string
  qrBlocks: Omit<QRBlock, 'id'>[]
  typography: Typography
}

export const templates: Template[] = [
  {
    id: 'youtube-website',
    name: 'YouTube + Website',
    description: 'Showcase your channel and website',
    gradient: 'ocean-blue',
    qrBlocks: [
      {
        url: 'https://www.youtube.com/@yourhandle',
        label: '<just rocket science>',
        iconType: 'youtube',
        x: 50,
        y: 40,
        size: 200,
        color: '#000000',
        errorCorrection: 'H',
      },
      {
        url: 'https://www.example.com',
        label: '<yourwebsite.com>',
        iconType: 'website',
        x: 50,
        y: 70,
        size: 200,
        color: '#000000',
        errorCorrection: 'H',
      },
    ],
    typography: {
      fontFamily: 'jetbrains-mono',
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 0,
      textTransform: 'none',
    },
  },
  {
    id: 'social-duo',
    name: 'Social Duo',
    description: 'Instagram + TikTok',
    gradient: 'sunset',
    qrBlocks: [
      {
        url: 'https://www.instagram.com/yourhandle',
        label: '@yourhandle',
        iconType: 'instagram',
        x: 50,
        y: 40,
        size: 200,
        color: '#000000',
        errorCorrection: 'H',
      },
      {
        url: 'https://www.tiktok.com/@yourhandle',
        label: '@yourhandle',
        iconType: 'tiktok',
        x: 50,
        y: 70,
        size: 200,
        color: '#000000',
        errorCorrection: 'H',
      },
    ],
    typography: {
      fontFamily: 'outfit',
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: 0.5,
      textTransform: 'lowercase',
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'LinkedIn + Portfolio',
    gradient: 'midnight',
    qrBlocks: [
      {
        url: 'https://www.linkedin.com/in/yourname',
        label: 'LinkedIn Profile',
        iconType: 'linkedin',
        x: 50,
        y: 40,
        size: 200,
        color: '#ffffff',
        errorCorrection: 'H',
      },
      {
        url: 'https://www.example.com',
        label: 'Portfolio',
        iconType: 'website',
        x: 50,
        y: 70,
        size: 200,
        color: '#ffffff',
        errorCorrection: 'H',
      },
    ],
    typography: {
      fontFamily: 'inter',
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: 0.3,
      textTransform: 'none',
    },
  },
]

