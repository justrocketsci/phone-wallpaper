import { QRBlock, Device } from './store'

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check if QR block is within device safe area
 */
export function isWithinSafeArea(
  block: QRBlock,
  device: Device
): { valid: boolean; warning?: string } {
  const xPos = (device.width * block.x) / 100
  const yPos = (device.height * block.y) / 100
  const halfSize = block.size / 2

  const left = xPos - halfSize
  const right = xPos + halfSize
  const top = yPos - halfSize
  const bottom = yPos + halfSize

  if (left < device.safeArea.left) {
    return { valid: false, warning: 'QR code extends beyond left safe area' }
  }
  if (right > device.width - device.safeArea.right) {
    return { valid: false, warning: 'QR code extends beyond right safe area' }
  }
  if (top < device.safeArea.top) {
    return { valid: false, warning: 'QR code extends beyond top safe area' }
  }
  if (bottom > device.height - device.safeArea.bottom) {
    return { valid: false, warning: 'QR code extends beyond bottom safe area' }
  }

  return { valid: true }
}

/**
 * Check if two QR blocks overlap
 */
export function doBlocksOverlap(block1: QRBlock, block2: QRBlock, device: Device): boolean {
  const x1 = (device.width * block1.x) / 100
  const y1 = (device.height * block1.y) / 100
  const x2 = (device.width * block2.x) / 100
  const y2 = (device.height * block2.y) / 100

  const half1 = block1.size / 2
  const half2 = block2.size / 2

  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  const minDistance = half1 + half2 + 50 // 50px buffer for label

  return distance < minDistance
}

/**
 * Suggest optimal QR size based on device
 */
export function getOptimalQRSize(device: Device): number {
  const shortestSide = Math.min(device.width, device.height)
  return Math.floor(shortestSide * 0.18) // 18% of shortest side
}

/**
 * Validate label length
 */
export function validateLabelLength(label: string): { valid: boolean; warning?: string } {
  if (label.length === 0) {
    return { valid: false, warning: 'Label cannot be empty' }
  }
  if (label.length > 50) {
    return { valid: false, warning: 'Label is too long (max 50 characters)' }
  }
  return { valid: true }
}

/**
 * Get recommended error correction level based on QR complexity
 */
export function getRecommendedErrorCorrection(
  url: string
): 'L' | 'M' | 'Q' | 'H' {
  const length = url.length
  
  if (length < 50) return 'H' // High for short URLs
  if (length < 100) return 'Q' // Quartile for medium URLs
  if (length < 200) return 'M' // Medium for longer URLs
  return 'L' // Low for very long URLs
}

