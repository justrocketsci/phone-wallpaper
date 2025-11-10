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
      // Generate QR code with fixed high resolution (1024px ensures crisp quality)
      const qrDataURL = await generateQRDataURL(block.url, {
        errorCorrectionLevel: block.errorCorrection,
        color: { dark: block.color, light: '#00000000' },
        width: 1024,
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

      // Draw label with icon in a pill backdrop
      // Match preview spacing: QR bottom edge + margin between QR and pill + half pill height
      const pillMarginTop = Math.round(typography.fontSize * 0.75)
      const pillPaddingY = Math.round(typography.fontSize * 0.35)
      const iconSize = Math.max(16, Math.round(typography.fontSize * 1.25))
      const pillHeight = Math.max(iconSize, typography.fontSize) + pillPaddingY * 2
      
      // Calculate pill center Y position: QR bottom + padding + margin + half pill height
      const labelY = yPos + block.size / 2 + padding + pillMarginTop + pillHeight / 2

      // Set font
      const fontData = fonts.find((f) => f.id === typography.fontFamily)
      const fontFamily = fontData?.family || 'Inter'
      ctx.font = `${typography.fontWeight} ${typography.fontSize}px ${fontFamily}`
      ctx.textBaseline = 'middle'

      // Apply text transform
      let labelText = block.label
      if (typography.textTransform === 'uppercase') {
        labelText = labelText.toUpperCase()
      } else if (typography.textTransform === 'lowercase') {
        labelText = labelText.toLowerCase()
      }

      // Measurements for layout
      const textWidth = ctx.measureText(labelText).width
      const gapSize = Math.max(6, Math.round(typography.fontSize * 0.35))
      const pillPaddingX = Math.round(typography.fontSize * 0.7)

      // Compute content width and pill dimensions (iconSize and pillHeight already calculated above)
      const contentWidth = (block.iconType && block.iconType !== 'custom' ? iconSize + gapSize : 0) + textWidth
      const pillWidth = contentWidth + pillPaddingX * 2
      const pillX = Math.round(xPos - pillWidth / 2)
      const pillY = Math.round(labelY - pillHeight / 2)

      // Draw pill background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      roundRect(ctx, pillX, pillY, pillWidth, pillHeight, pillHeight / 2)
      ctx.fill()

      // Add pill shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)'
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 2
      roundRect(ctx, pillX, pillY, pillWidth, pillHeight, pillHeight / 2)
      ctx.fill()

      // Reset shadow
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Center content horizontally within pill (same as preview flexbox centering)
      const contentStartX = Math.round(xPos - contentWidth / 2)
      const iconY = Math.round(labelY - iconSize / 2)

      // Draw icon if present
      if (block.iconType && block.iconType !== 'custom') {
        const svg = getIconSVG(block.iconType, block.color)
        const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
        const iconImg = await loadImage(dataUrl)
        ctx.drawImage(iconImg, contentStartX, iconY, iconSize, iconSize)
      }

      // Draw text
      const textX = contentStartX + (block.iconType && block.iconType !== 'custom' ? iconSize + gapSize : 0)
      ctx.fillStyle = block.color
      ctx.fillText(labelText, textX, labelY)
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
 * Return SVG markup for an icon type colored with the provided color.
 */
function getIconSVG(
  iconType: 'youtube' | 'website' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'github',
  color: string
): string {
  const baseSvgOpen = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">`
  const svgClose = `</svg>`
  switch (iconType) {
    case 'youtube':
      return `${baseSvgOpen}<path fill="${color}" stroke="white" stroke-width="1.5" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>${svgClose}`
    case 'instagram':
      return `${baseSvgOpen}<path fill="${color}" stroke="white" stroke-width="1.5" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>${svgClose}`
    case 'twitter':
      return `${baseSvgOpen}<path fill="${color}" stroke="white" stroke-width="1.5" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>${svgClose}`
    case 'linkedin':
      return `${baseSvgOpen}<path fill="${color}" stroke="white" stroke-width="1.5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>${svgClose}`
    case 'tiktok':
      return `${baseSvgOpen}<path fill="${color}" stroke="white" stroke-width="1.5" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>${svgClose}`
    case 'github':
      return `${baseSvgOpen}<path fill="${color}" stroke="white" stroke-width="1.5" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>${svgClose}`
    case 'website':
      return `${baseSvgOpen}<g fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></g>${svgClose}`
  }
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

