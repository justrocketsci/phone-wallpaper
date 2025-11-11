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
  dynamicIsland?: {
    width: number
    height: number
    topOffset: number
  }
  systemUI?: {
    statusBar: {
      topPercent: number     // % from top (0.029 = 2.9%)
    }
    lockScreenClock: {
      dateTopPercent: number // % from top (0.122 = 12.2%)
      timeTopPercent: number // % from top (0.181 = 18.1%)
    }
    bottomWidgets: {
      topPercent: number     // % from top (0.918 = 91.8%)
      iconSizePercent: number // % of device width
    }
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
}

export interface SerializableState {
  device: Device | null
  gradient: Gradient | null
  qrBlocks: QRBlock[]
  typography: Typography
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
  loadFromDesign: (settings: SerializableState) => void
  resetStore: () => void
  getSerializableState: () => SerializableState
}

const defaultTypography: Typography = {
  fontFamily: 'inter',
  fontSize: 56,
  fontWeight: 600,
  letterSpacing: 0,
  textTransform: 'none',
}

export const useWallpaperStore = create<WallpaperState>((set, get) => ({
  device: null,
  gradient: null,
  qrBlocks: [],
  typography: defaultTypography,
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
  loadFromDesign: (settings) => set({
    device: settings.device,
    gradient: settings.gradient,
    qrBlocks: settings.qrBlocks,
    typography: settings.typography,
  }),
  resetStore: () => set({
    device: null,
    gradient: null,
    qrBlocks: [],
    typography: defaultTypography,
  }),
  getSerializableState: () => {
    const state = get()
    return {
      device: state.device,
      gradient: state.gradient,
      qrBlocks: state.qrBlocks,
      typography: state.typography,
    }
  },
}))

