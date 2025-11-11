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
  // QR Canvas - Your product showcase
  {
    id: 'qr-canvas',
    name: 'QR Canvas',
    gradient: {
      id: 'qr-canvas-gradient',
      name: 'QR Canvas',
      type: 'linear',
      colors: ['#667eea', '#764ba2', '#f093fb'],
      angle: 135,
    },
    qrBlocks: [
      {
        url: 'https://www.qrcanvas.app',
        label: 'QR Canvas',
        iconType: 'website',
        x: 50,
        y: 48,
        size: 360,
        color: '#000000',
        errorCorrection: 'H',
      },
    ],
  },
  
  // Just Rocket Science - Space/YouTube content
  {
    id: 'rocket-science',
    name: 'The Just Rocket Science Show',
    gradient: {
      id: 'space-gradient',
      name: 'Space',
      type: 'linear',
      colors: ['#0f2027', '#203a43', '#2c5364'],
      angle: 135,
    },
    qrBlocks: [
      {
        url: 'https://www.youtube.com/@just_rocket_science',
        label: 'The Just Rocket Science Show',
        iconType: 'youtube',
        x: 50,
        y: 48,
        size: 360,
        color: '#000000',
        errorCorrection: 'H',
      },
    ],
  },
  
  // AstroForge - Orange & Black asteroid mining company
  {
    id: 'astroforge',
    name: 'AstroForge',
    gradient: {
      id: 'astroforge-gradient',
      name: 'AstroForge',
      type: 'linear',
      colors: ['#1a1a1a', '#ff6b35', '#1a1a1a'],
      angle: 135,
    },
    qrBlocks: [
      {
        url: 'https://www.astroforge.com/',
        label: 'AstroForge',
        iconType: 'website',
        x: 50,
        y: 48,
        size: 360,
        color: '#000000',
        errorCorrection: 'H',
      },
    ],
  },
  
  // Apex Space - Yellow, Black & Blue satellite manufacturing
  {
    id: 'apex-space',
    name: 'Apex Space',
    gradient: {
      id: 'apex-gradient',
      name: 'Apex Space',
      type: 'linear',
      colors: ['#1a1a2e', '#0f4c75', '#ffd700', '#1a1a2e'],
      angle: 135,
    },
    qrBlocks: [
      {
        url: 'https://www.apexspace.com/',
        label: 'Apex Space',
        iconType: 'website',
        x: 50,
        y: 48,
        size: 360,
        color: '#000000',
        errorCorrection: 'H',
      },
    ],
  },
]

