export interface Gradient {
  id: string
  name: string
  type: 'linear' | 'radial'
  colors: string[]
  angle?: number
  description?: string
}

export const gradients: Gradient[] = [
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    type: 'linear',
    colors: ['#667eea', '#764ba2'],
    angle: 135,
    description: 'Deep purple to vibrant blue',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    type: 'linear',
    colors: ['#ff6b6b', '#feca57'],
    angle: 135,
    description: 'Warm red to golden yellow',
  },
  {
    id: 'mint-fresh',
    name: 'Mint Fresh',
    type: 'linear',
    colors: ['#4facfe', '#00f2fe'],
    angle: 135,
    description: 'Cool cyan to mint',
  },
  {
    id: 'purple-dream',
    name: 'Purple Dream',
    type: 'linear',
    colors: ['#a8edea', '#fed6e3'],
    angle: 135,
    description: 'Soft aqua to pink',
  },
  {
    id: 'forest',
    name: 'Forest',
    type: 'linear',
    colors: ['#134e5e', '#71b280'],
    angle: 135,
    description: 'Deep teal to sage green',
  },
  {
    id: 'coral-reef',
    name: 'Coral Reef',
    type: 'linear',
    colors: ['#ff9a56', '#ff6a88'],
    angle: 135,
    description: 'Coral orange to pink',
  },
  {
    id: 'northern-lights',
    name: 'Northern Lights',
    type: 'linear',
    colors: ['#00c6ff', '#0072ff'],
    angle: 135,
    description: 'Electric blue gradient',
  },
  {
    id: 'lavender-fields',
    name: 'Lavender Fields',
    type: 'linear',
    colors: ['#e0c3fc', '#8ec5fc'],
    angle: 135,
    description: 'Soft lavender to sky blue',
  },
  {
    id: 'peach-fuzz',
    name: 'Peach Fuzz',
    type: 'linear',
    colors: ['#ffecd2', '#fcb69f'],
    angle: 135,
    description: 'Soft peach gradient',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    type: 'linear',
    colors: ['#2c3e50', '#3498db'],
    angle: 135,
    description: 'Dark navy to bright blue',
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    type: 'linear',
    colors: ['#f093fb', '#f5576c'],
    angle: 135,
    description: 'Pink to rose',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    type: 'linear',
    colors: ['#348f50', '#56b4d3'],
    angle: 135,
    description: 'Rich emerald to teal',
  },
  {
    id: 'radial-sunset',
    name: 'Radial Sunset',
    type: 'radial',
    colors: ['#ff6b6b', '#feca57', '#ff9ff3'],
    description: 'Radial warm gradient',
  },
  {
    id: 'radial-ocean',
    name: 'Radial Ocean',
    type: 'radial',
    colors: ['#4facfe', '#00f2fe', '#43e97b'],
    description: 'Radial cool gradient',
  },
]

