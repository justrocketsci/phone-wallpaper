/**
 * Environment variable validation
 * Validates all required environment variables at startup
 */

const requiredEnvVars = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  // Stripe Payments
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
} as const

// Runtime-only variables (not needed during build)
const runtimeOnlyEnvVars = {
  // Stripe price (only needed at runtime for checkout API route)
  STRIPE_PRICE_DOWNLOAD: process.env.STRIPE_PRICE_DOWNLOAD,
  // Webhook secrets (only needed at runtime for API routes)
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
} as const

const optionalEnvVars = {
  // Base URL (has fallbacks everywhere it's used)
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,

  // Google Analytics (optional)
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,

  // Search Console Verification (optional)
  NEXT_PUBLIC_GOOGLE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  NEXT_PUBLIC_BING_VERIFICATION: process.env.NEXT_PUBLIC_BING_VERIFICATION,
} as const

/**
 * Validates that all required environment variables are set
 * Throws an error with detailed information if any are missing
 */
export function validateEnv(): void {
  const missing: string[] = []
  const invalid: Array<{ key: string; reason: string }> = []
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build'

  // Check required variables
  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value || value.trim() === '') {
      missing.push(key)
    } else {
      // Additional validation for specific variables
      if (key === 'DATABASE_URL' && !value.startsWith('postgresql://')) {
        invalid.push({ key, reason: 'must be a valid PostgreSQL connection string' })
      }
      if (key === 'STRIPE_SECRET_KEY' && !value.startsWith('sk_')) {
        invalid.push({ key, reason: 'must be a valid Stripe secret key (starts with sk_)' })
      }
      if (key === 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY' && !value.startsWith('pk_')) {
        invalid.push({ key, reason: 'must be a valid Stripe publishable key (starts with pk_)' })
      }
    }
  }

  // Check runtime-only variables (only in production runtime, not during build)
  if (!isBuildTime) {
    for (const [key, value] of Object.entries(runtimeOnlyEnvVars)) {
      if (!value || value.trim() === '') {
        missing.push(key)
      } else {
        // Additional validation
        if (key === 'STRIPE_PRICE_DOWNLOAD' && !value.startsWith('price_')) {
          invalid.push({ key, reason: 'must be a valid Stripe price ID (starts with price_)' })
        }
        if (key === 'STRIPE_WEBHOOK_SECRET' && !value.startsWith('whsec_')) {
          invalid.push({ key, reason: 'must be a valid Stripe webhook secret (starts with whsec_)' })
        }
      }
    }
  }

  // Report errors if any
  if (missing.length > 0 || invalid.length > 0) {
    const errorMessages: string[] = ['Environment variable validation failed:']

    if (missing.length > 0) {
      errorMessages.push('\nMissing required variables:')
      missing.forEach((key) => {
        errorMessages.push(`   - ${key}`)
      })
    }

    if (invalid.length > 0) {
      errorMessages.push('\nInvalid variable values:')
      invalid.forEach(({ key, reason }) => {
        errorMessages.push(`   - ${key}: ${reason}`)
      })
    }

    errorMessages.push('\nSee ENV_SETUP.md for configuration instructions.')

    throw new Error(errorMessages.join('\n'))
  }

  // Log success in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Environment variables validated successfully')

    // Log optional variables status
    const optionalSet = Object.entries(optionalEnvVars)
      .filter(([_, value]) => value && value.trim() !== '')
      .map(([key]) => key)

    if (optionalSet.length > 0) {
      console.log(`Optional variables set: ${optionalSet.join(', ')}`)
    }
  }
}

/**
 * Get a required environment variable
 * Throws an error if not set (should be caught by validateEnv at startup)
 */
export function getRequiredEnv(key: keyof typeof requiredEnvVars | keyof typeof runtimeOnlyEnvVars): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`)
  }
  return value
}

/**
 * Get an optional environment variable
 */
export function getOptionalEnv(key: keyof typeof optionalEnvVars): string | undefined {
  return process.env[key] || undefined
}
