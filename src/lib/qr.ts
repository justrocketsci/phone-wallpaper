import QRCode from 'qrcode'

export interface QROptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  color?: {
    dark?: string
    light?: string
  }
  width?: number
  margin?: number
}

/**
 * Generate a QR code as an SVG string
 */
export async function generateQRSVG(
  text: string,
  options: QROptions = {}
): Promise<string> {
  const {
    errorCorrectionLevel = 'H',
    color = { dark: '#000000', light: '#ffffff' },
    width = 200,
    margin = 1,
  } = options

  try {
    const svg = await QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel,
      color,
      width,
      margin,
    })
    return svg
  } catch (error) {
    console.error('QR generation error:', error)
    throw new Error('Failed to generate QR code')
  }
}

/**
 * Generate a QR code as a data URL
 */
export async function generateQRDataURL(
  text: string,
  options: QROptions = {}
): Promise<string> {
  const {
    errorCorrectionLevel = 'H',
    color = { dark: '#000000', light: '#ffffff' },
    width = 200,
    margin = 1,
  } = options

  try {
    const dataURL = await QRCode.toDataURL(text, {
      errorCorrectionLevel,
      color,
      width,
      margin,
    })
    return dataURL
  } catch (error) {
    console.error('QR generation error:', error)
    throw new Error('Failed to generate QR code')
  }
}

/**
 * Validate if a QR code URL/text is valid
 */
export function validateQRText(text: string): { valid: boolean; error?: string } {
  if (!text || text.trim().length === 0) {
    return { valid: false, error: 'Text cannot be empty' }
  }

  if (text.length > 2953) {
    return {
      valid: false,
      error: 'Text is too long for QR code (max 2953 characters)',
    }
  }

  return { valid: true }
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string) => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255

    const [rs, gs, bs] = [r, g, b].map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    )

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const l1 = getLuminance(color1)
  const l2 = getLuminance(color2)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if QR code has sufficient contrast (should be > 3:1)
 */
export function hasGoodContrast(qrColor: string, backgroundColor: string): boolean {
  return getContrastRatio(qrColor, backgroundColor) > 3
}

