import { Device, Gradient, QRBlock, Typography } from './store'
import { templates } from '@/data/templates'

export interface DesignSettings {
  device: Device | null
  gradient: Gradient | null
  qrBlocks: QRBlock[]
  typography: Typography
}

export interface Design {
  id: string
  name: string
  settings: DesignSettings
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

/**
 * Save a design to the database
 */
export async function saveDesign(
  name: string,
  settings: DesignSettings,
  thumbnail?: string
): Promise<Design> {
  const response = await fetch('/api/designs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      settings,
      thumbnail,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to save design')
  }

  const { design } = await response.json()
  return design
}

/**
 * Update an existing design
 */
export async function updateDesign(
  id: string,
  updates: {
    name?: string
    settings?: DesignSettings
    thumbnail?: string
  }
): Promise<Design> {
  const response = await fetch(`/api/designs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to update design')
  }

  const { design } = await response.json()
  return design
}

/**
 * Load a design from the database
 */
export async function loadDesign(id: string): Promise<Design> {
  const response = await fetch(`/api/designs/${id}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to load design')
  }

  const { design } = await response.json()
  return design
}

/**
 * Get all designs for the current user
 */
export async function getDesigns(): Promise<Design[]> {
  const response = await fetch('/api/designs')

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch designs')
  }

  const { designs } = await response.json()
  return designs
}

/**
 * Delete a design
 */
export async function deleteDesign(id: string): Promise<void> {
  const response = await fetch(`/api/designs/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to delete design')
  }
}

/**
 * Generate a thumbnail from the wallpaper canvas
 */
export function generateThumbnail(
  settings: DesignSettings,
  maxWidth = 300,
  maxHeight = 400
): string {
  const { device, gradient } = settings

  if (!device || !gradient) {
    return ''
  }

  // Create a small canvas for the thumbnail
  const canvas = document.createElement('canvas')
  const aspectRatio = device.height / device.width

  // Calculate thumbnail dimensions maintaining aspect ratio
  let thumbWidth = maxWidth
  let thumbHeight = maxWidth * aspectRatio

  if (thumbHeight > maxHeight) {
    thumbHeight = maxHeight
    thumbWidth = maxHeight / aspectRatio
  }

  canvas.width = thumbWidth
  canvas.height = thumbHeight
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return ''
  }

  // Draw a simple gradient background (simplified version)
  if (gradient.type === 'linear') {
    const angle = (gradient.angle || 135) * (Math.PI / 180)
    const x1 = thumbWidth / 2 - Math.cos(angle) * thumbWidth / 2
    const y1 = thumbHeight / 2 - Math.sin(angle) * thumbHeight / 2
    const x2 = thumbWidth / 2 + Math.cos(angle) * thumbWidth / 2
    const y2 = thumbHeight / 2 + Math.sin(angle) * thumbHeight / 2

    const linearGradient = ctx.createLinearGradient(x1, y1, x2, y2)
    gradient.colors.forEach((color, index) => {
      linearGradient.addColorStop(
        index / (gradient.colors.length - 1),
        color
      )
    })
    ctx.fillStyle = linearGradient
  } else {
    const radialGradient = ctx.createRadialGradient(
      thumbWidth / 2,
      thumbHeight / 2,
      0,
      thumbWidth / 2,
      thumbHeight / 2,
      Math.max(thumbWidth, thumbHeight) / 2
    )
    gradient.colors.forEach((color, index) => {
      radialGradient.addColorStop(
        index / (gradient.colors.length - 1),
        color
      )
    })
    ctx.fillStyle = radialGradient
  }

  ctx.fillRect(0, 0, thumbWidth, thumbHeight)

  // Convert to base64 data URL
  return canvas.toDataURL('image/jpeg', 0.7)
}

/**
 * Apply a template to the store
 * Returns the template settings to be applied to the store
 */
export function getTemplateSettings(templateId: string): DesignSettings | null {
  const template = templates.find((t) => t.id === templateId)

  if (!template) {
    return null
  }

  // We need to load the actual gradient and device data
  // For now, return a structure that matches what's expected
  // The actual gradient and device will need to be resolved by the component
  return {
    device: null, // Will be set by component based on user selection or default
    gradient: null, // Will be resolved from gradient ID
    qrBlocks: template.qrBlocks.map((block, index) => ({
      ...block,
      id: `qr-${Date.now()}-${index}`,
    })),
    typography: template.typography,
  }
}

/**
 * Generate a default name for a new design
 */
export function generateDesignName(): string {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `Design - ${dateStr} at ${timeStr}`
}

