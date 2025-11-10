export interface FontOption {
  id: string
  name: string
  family: string
  variable: string
  weights: number[]
  category: 'sans-serif' | 'monospace'
  description: string
  wallpaperOptimized: boolean
}

export const fonts: FontOption[] = [
  {
    id: 'inter',
    name: 'Inter',
    family: 'Inter',
    variable: 'var(--font-inter)',
    weights: [400, 500, 600, 700, 800],
    category: 'sans-serif',
    description: 'Clean, modern sans-serif with excellent legibility',
    wallpaperOptimized: true,
  },
  {
    id: 'manrope',
    name: 'Manrope',
    family: 'Manrope',
    variable: 'var(--font-manrope)',
    weights: [400, 500, 600, 700, 800],
    category: 'sans-serif',
    description: 'Geometric sans-serif, perfect for headings',
    wallpaperOptimized: true,
  },
  {
    id: 'outfit',
    name: 'Outfit',
    family: 'Outfit',
    variable: 'var(--font-outfit)',
    weights: [400, 500, 600, 700, 800],
    category: 'sans-serif',
    description: 'Rounded, friendly geometric typeface',
    wallpaperOptimized: true,
  },
  {
    id: 'sora',
    name: 'Sora',
    family: 'Sora',
    variable: 'var(--font-sora)',
    weights: [400, 500, 600, 700, 800],
    category: 'sans-serif',
    description: 'Tech-inspired, modern sans-serif',
    wallpaperOptimized: true,
  },
  {
    id: 'jetbrains-mono',
    name: 'JetBrains Mono',
    family: 'JetBrains Mono',
    variable: 'var(--font-mono)',
    weights: [400, 500, 600, 700, 800],
    category: 'monospace',
    description: 'Developer-friendly monospace with great readability',
    wallpaperOptimized: true,
  },
]

