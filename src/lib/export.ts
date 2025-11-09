import { useWallpaperStore } from './store'
import { generateQRDataURL } from './qr'
import { gradients } from '@/data/gradients'
import { fonts } from '@/data/fonts'

/**
 * Export wallpaper as PNG
 */
export async function exportWallpaperAsPNG(): Promise<void> {
  const state = useWallpaperStore.getState()
  const { device, gradient, qrBlocks, typography } = state

  if (!device || !gradient) {
    throw new Error('Missing required data for export')
  }

  // Create a canvas at device resolution
  const canvas = document.createElement('canvas')
  canvas.width = device.width
  canvas.height = device.height
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Failed to get canvas context')
  }

  // Draw gradient background
  const gradData = gradients.find((g) => g.id === gradient.id)
  if (gradData) {
    if (gradData.type === 'linear') {
      const angle = (gradData.angle || 135) * (Math.PI / 180)
      const x1 = device.width / 2 - Math.cos(angle) * device.width / 2
      const y1 = device.height / 2 - Math.sin(angle) * device.height / 2
      const x2 = device.width / 2 + Math.cos(angle) * device.width / 2
      const y2 = device.height / 2 + Math.sin(angle) * device.height / 2

      const linearGradient = ctx.createLinearGradient(x1, y1, x2, y2)
      gradData.colors.forEach((color, index) => {
        linearGradient.addColorStop(index / (gradData.colors.length - 1), color)
      })
      ctx.fillStyle = linearGradient
    } else {
      const radialGradient = ctx.createRadialGradient(
        device.width / 2,
        device.height / 2,
        0,
        device.width / 2,
        device.height / 2,
        Math.max(device.width, device.height) / 2
      )
      gradData.colors.forEach((color, index) => {
        radialGradient.addColorStop(index / (gradData.colors.length - 1), color)
      })
      ctx.fillStyle = radialGradient
    }
    ctx.fillRect(0, 0, device.width, device.height)
  }

  // Generate and draw QR codes
  for (const block of qrBlocks) {
    const xPos = (device.width * block.x) / 100
    const yPos = (device.height * block.y) / 100

    try {
      // Generate QR code
      const qrDataURL = await generateQRDataURL(block.url, {
        errorCorrectionLevel: block.errorCorrection,
        color: { dark: block.color, light: '#00000000' },
        width: block.size,
        margin: 1,
      })

      // Load QR image
      const qrImage = await loadImage(qrDataURL)

      // Draw white background for QR
      const padding = 16
      const bgSize = block.size + padding * 2
      const bgX = xPos - bgSize / 2
      const bgY = yPos - bgSize / 2

      ctx.fillStyle = 'white'
      roundRect(ctx, bgX, bgY, bgSize, bgSize, 16)
      ctx.fill()

      // Add shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
      ctx.shadowBlur = 20
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 4

      // Draw QR code
      ctx.drawImage(
        qrImage,
        xPos - block.size / 2,
        yPos - block.size / 2,
        block.size,
        block.size
      )

      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Draw label with icon
      const labelY = yPos + block.size / 2 + padding + 30

      // Set font
      const fontData = fonts.find((f) => f.id === typography.fontFamily)
      const fontFamily = fontData?.family || 'Inter'
      ctx.font = `${typography.fontWeight} ${typography.fontSize}px ${fontFamily}`
      ctx.fillStyle = block.color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Apply text transform
      let labelText = block.label
      if (typography.textTransform === 'uppercase') {
        labelText = labelText.toUpperCase()
      } else if (typography.textTransform === 'lowercase') {
        labelText = labelText.toLowerCase()
      }

      // Draw text shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 2

      ctx.fillText(labelText, xPos, labelY)

      // Draw underline if needed
      if (typography.underline) {
        const textWidth = ctx.measureText(labelText).width
        ctx.beginPath()
        ctx.moveTo(xPos - textWidth / 2, labelY + typography.fontSize / 2 + 2)
        ctx.lineTo(xPos + textWidth / 2, labelY + typography.fontSize / 2 + 2)
        ctx.strokeStyle = block.color
        ctx.lineWidth = 2
        ctx.stroke()
      }

      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
    } catch (error) {
      console.error(`Failed to draw QR for ${block.id}:`, error)
    }
  }

  // Convert canvas to blob and download
  canvas.toBlob((blob) => {
    if (!blob) {
      throw new Error('Failed to create image blob')
    }

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `wallpaper-${device.model.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, 'image/png')
}

/**
 * Helper to load an image from a data URL
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * Helper to draw rounded rectangle
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

/**
 * Save wallpaper config as JSON
 */
export function saveWallpaperConfig(): void {
  const state = useWallpaperStore.getState()
  const config = {
    device: state.device,
    gradient: state.gradient,
    qrBlocks: state.qrBlocks,
    typography: state.typography,
    version: '1.0',
    exportedAt: new Date().toISOString(),
  }

  const blob = new Blob([JSON.stringify(config, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `wallpaper-config-${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Load wallpaper config from JSON
 */
export async function loadWallpaperConfig(file: File): Promise<void> {
  const text = await file.text()
  const config = JSON.parse(text)

  if (!config.version || !config.device || !config.gradient) {
    throw new Error('Invalid config file')
  }

  const { setDevice, setGradient, setTypography, addQRBlock } =
    useWallpaperStore.getState()

  setDevice(config.device)
  setGradient(config.gradient)
  setTypography(config.typography)

  // Clear existing QR blocks and add from config
  const store = useWallpaperStore.getState()
  store.qrBlocks.forEach((block) => {
    store.removeQRBlock(block.id)
  })

  config.qrBlocks.forEach((block: any) => {
    addQRBlock(block)
  })
}

