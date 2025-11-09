import { create } from 'zustand'

export interface Device {
  id: string
  brand: string
  model: string
  width: number
  height: number
  safeArea: {
    top: number
    right: number
    bottom: number
    left: number
  }
  notch?: {
    width: number
    height: number
  }
}

export interface Gradient {
  id: string
  name: string
  type: 'linear' | 'radial'
  colors: string[]
  angle?: number
}

export interface QRBlock {
  id: string
  url: string
  label: string
  iconType?: 'youtube' | 'website' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'github' | 'custom'
  customIcon?: string
  x: number
  y: number
  size: number
  color: string
  errorCorrection: 'L' | 'M' | 'Q' | 'H'
}

export interface Typography {
  fontFamily: string
  fontSize: number
  fontWeight: number
  letterSpacing: number
  textTransform: 'none' | 'uppercase' | 'lowercase'
  underline: boolean
}

interface WallpaperState {
  device: Device | null
  gradient: Gradient | null
  qrBlocks: QRBlock[]
  typography: Typography
  setDevice: (device: Device) => void
  setGradient: (gradient: Gradient) => void
  addQRBlock: (block: QRBlock) => void
  updateQRBlock: (id: string, updates: Partial<QRBlock>) => void
  removeQRBlock: (id: string) => void
  setTypography: (typography: Partial<Typography>) => void
}

export const useWallpaperStore = create<WallpaperState>((set) => ({
  device: null,
  gradient: null,
  qrBlocks: [],
  typography: {
    fontFamily: 'inter',
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0,
    textTransform: 'none',
    underline: true,
  },
  setDevice: (device) => set({ device }),
  setGradient: (gradient) => set({ gradient }),
  addQRBlock: (block) => set((state) => {
    if (state.qrBlocks.length >= 2) return state
    return { qrBlocks: [...state.qrBlocks, block] }
  }),
  updateQRBlock: (id, updates) => set((state) => ({
    qrBlocks: state.qrBlocks.map((block) =>
      block.id === id ? { ...block, ...updates } : block
    ),
  })),
  removeQRBlock: (id) => set((state) => ({
    qrBlocks: state.qrBlocks.filter((block) => block.id !== id),
  })),
  setTypography: (typography) => set((state) => ({
    typography: { ...state.typography, ...typography },
  })),
}))

