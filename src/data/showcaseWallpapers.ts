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
      colors: ['#e4e9ff', '#8fa3ff', '#764ba2', '#f093fb'],
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
      colors: ['#d6efff', '#5b7a8a', '#203a43', '#0f2027'],
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
      colors: ['#ffe6d5', '#ff8f5b', '#302727'],
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
      colors: ['#deeaff', '#3a70b3', '#ffd700', '#202244'],
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

