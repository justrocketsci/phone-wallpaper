/**
 * Validation schemas using Zod
 * Used for API request validation
 */

import { z } from 'zod'

/**
 * QR Block schema
 */
const QRBlockSchema = z.object({
  id: z.string(),
  url: z.string().url('Invalid URL format').max(2953, 'URL too long for QR code'),
  label: z.string().min(1, 'Label required').max(50, 'Label too long (max 50 chars)'),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  size: z.number().min(50).max(500),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
  errorCorrection: z.enum(['L', 'M', 'Q', 'H']),
  iconType: z.enum(['youtube', 'website', 'instagram', 'twitter', 'linkedin', 'tiktok', 'github', 'custom']).optional(),
})

/**
 * Device schema
 */
const DeviceSchema = z.object({
  id: z.string(),
  model: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
  safeArea: z.object({
    top: z.number(),
    bottom: z.number(),
    left: z.number(),
    right: z.number(),
  }),
  systemUI: z.any().optional(), // Complex nested object, validate presence only
})

/**
 * Gradient schema
 */
const GradientSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  type: z.enum(['linear', 'radial']).optional(),
  colors: z.array(z.string()).optional(),
  angle: z.number().optional(),
})

/**
 * Typography schema
 */
const TypographySchema = z.object({
  fontFamily: z.string(),
  fontSize: z.number().positive(),
  fontWeight: z.union([z.number(), z.string()]),
  textTransform: z.enum(['none', 'uppercase', 'lowercase', 'capitalize']),
})

/**
 * Design settings schema (stored in JSON)
 */
const DesignSettingsSchema = z.object({
  device: DeviceSchema,
  gradient: GradientSchema,
  qrBlocks: z.array(QRBlockSchema).max(10, 'Maximum 10 QR codes allowed'),
  typography: TypographySchema,
})

/**
 * Base64 image validation
 * Validates format and size
 */
const Base64ImageSchema = z
  .string()
  .regex(/^data:image\/(png|jpeg|jpg|webp);base64,/, 'Invalid image format')
  .refine(
    (data) => {
      // Calculate approximate size in bytes (base64 is ~1.37x original)
      const base64Length = data.split(',')[1]?.length || 0
      const sizeInBytes = (base64Length * 3) / 4
      const sizeInKB = sizeInBytes / 1024
      return sizeInKB <= 500 // 500KB limit
    },
    { message: 'Thumbnail too large (max 500KB)' }
  )

/**
 * POST /api/designs request schema
 */
export const CreateDesignSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name too long (max 100 chars)')
    .trim(),
  settings: DesignSettingsSchema,
  thumbnail: Base64ImageSchema.optional(),
})

/**
 * PATCH /api/designs/[id] request schema
 */
export const UpdateDesignSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name too long (max 100 chars)')
    .trim()
    .optional(),
  settings: DesignSettingsSchema.optional(),
  thumbnail: Base64ImageSchema.optional().nullable(),
})

/**
 * Helper to validate and parse request body
 */
export async function validateRequest<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await request.json()
    const result = schema.safeParse(body)
    
    if (!result.success) {
      const errors = result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`)
      return {
        success: false,
        error: `Validation failed: ${errors.join(', ')}`,
      }
    }
    
    return { success: true, data: result.data }
  } catch (error) {
    return {
      success: false,
      error: 'Invalid JSON in request body',
    }
  }
}

