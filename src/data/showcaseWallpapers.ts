import { Gradient } from './gradients'
import { QRBlock } from '@/lib/store'

/**
 * Showcase wallpaper configuration for landing page carousel
 * Each configuration represents a complete wallpaper with gradient and QR codes
 */
export interface ShowcaseWallpaper {
  id: string
  name: string
  gradient: Gradient
  qrBlocks: Omit<QRBlock, 'id'>[]
}

export const showcaseWallpapers: ShowcaseWallpaper[] = [
  {
    id: 'social-media-hub',
    name: 'Social Media Hub',
    gradient: {
      id: 'ocean-blue',
      name: 'Ocean Blue',
      type: 'linear',
      colors: ['#667eea', '#764ba2'],
      angle: 135,
    },
    qrBlocks: [
      {
        url: 'https://instagram.com/yourhandle',
        label: 'Instagram',
        iconType: 'instagram',
        x: 50,
        y: 35,
        size: 180,
        color: '#FFFFFF',
        errorCorrection: 'H',
      },
      {
        url: 'https://youtube.com/@yourchannel',
        label: 'YouTube',
        iconType: 'youtube',
        x: 50,
        y: 60,
        size: 180,
        color: '#FFFFFF',
        errorCorrection: 'H',
      },
    ],
  },
  {
    id: 'professional-network',
    name: 'Professional Network',
    gradient: {
      id: 'sunset',
      name: 'Sunset',
      type: 'linear',
      colors: ['#ff6b6b', '#feca57'],
      angle: 135,
    },
    qrBlocks: [
      {
        url: 'https://linkedin.com/in/yourprofile',
        label: 'LinkedIn',
        iconType: 'linkedin',
        x: 50,
        y: 40,
        size: 200,
        color: '#FFFFFF',
        errorCorrection: 'H',
      },
      {
        url: 'https://github.com/yourusername',
        label: 'GitHub',
        iconType: 'github',
        x: 50,
        y: 65,
        size: 160,
        color: '#FFFFFF',
        errorCorrection: 'H',
      },
    ],
  },
  {
    id: 'website-portfolio',
    name: 'Website Portfolio',
    gradient: {
      id: 'mint-fresh',
      name: 'Mint Fresh',
      type: 'linear',
      colors: ['#4facfe', '#00f2fe'],
      angle: 135,
    },
    qrBlocks: [
      {
        url: 'https://yourwebsite.com',
        label: 'Visit My Website',
        iconType: 'website',
        x: 50,
        y: 48,
        size: 220,
        color: '#FFFFFF',
        errorCorrection: 'H',
      },
    ],
  },
  {
    id: 'creator-links',
    name: 'Creator Links',
    gradient: {
      id: 'purple-dream',
      name: 'Purple Dream',
      type: 'linear',
      colors: ['#a8edea', '#fed6e3'],
      angle: 135,
    },
    qrBlocks: [
      {
        url: 'https://tiktok.com/@yourhandle',
        label: 'TikTok',
        iconType: 'tiktok',
        x: 50,
        y: 36,
        size: 170,
        color: '#000000',
        errorCorrection: 'H',
      },
      {
        url: 'https://twitter.com/yourhandle',
        label: 'Twitter',
        iconType: 'twitter',
        x: 50,
        y: 62,
        size: 170,
        color: '#000000',
        errorCorrection: 'H',
      },
    ],
  },
  {
    id: 'minimal-business',
    name: 'Minimal Business',
    gradient: {
      id: 'forest',
      name: 'Forest',
      type: 'linear',
      colors: ['#134e5e', '#71b280'],
      angle: 135,
    },
    qrBlocks: [
      {
        url: 'https://yourcompany.com/contact',
        label: 'Contact Us',
        iconType: 'website',
        x: 50,
        y: 45,
        size: 200,
        color: '#FFFFFF',
        errorCorrection: 'H',
      },
    ],
  },
]

