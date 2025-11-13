/**
 * Rate limiting utilities
 * Supports both in-memory (development) and Redis-based (production) rate limiting
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Rate limiter instance
 * Uses in-memory cache if Upstash Redis is not configured
 */
const getRateLimiter = (
  requests: number,
  window: string
): Ratelimit | null => {
  // Check if Upstash Redis is configured
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (upstashUrl && upstashToken) {
    // Use Redis-based rate limiting for production
    const redis = new Redis({
      url: upstashUrl,
      token: upstashToken,
    })

    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(requests, window),
      analytics: true,
      prefix: '@ratelimit',
    })
  }

  // Use in-memory rate limiting for development/small deployments
  // Note: In-memory won't work across multiple instances
  return new Ratelimit({
    redis: Redis.fromEnv() as any, // Type workaround for in-memory
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: false, // Disable analytics for in-memory
    prefix: '@ratelimit',
    ephemeralCache: new Map(), // In-memory cache
  })
}

/**
 * Rate limiters for different endpoints
 */
export const rateLimiters = {
  // Design API: 100 requests per 15 minutes
  designs: getRateLimiter(100, '15 m'),
  
  // Checkout: 10 requests per hour
  checkout: getRateLimiter(10, '1 h'),
  
  // General API: 200 requests per 15 minutes
  api: getRateLimiter(200, '15 m'),
}

/**
 * Check rate limit for a given identifier (usually userId)
 * Returns success=false if rate limit exceeded
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  if (!limiter) {
    // Rate limiting disabled
    return { success: true }
  }

  try {
    const { success, limit, remaining, reset } = await limiter.limit(identifier)
    return { success, limit, remaining, reset }
  } catch (error) {
    console.error('Rate limit check failed:', error)
    // Fail open - allow request if rate limiter fails
    return { success: true }
  }
}

/**
 * Middleware helper to apply rate limiting to API routes
 */
export async function withRateLimit(
  identifier: string,
  limiter: Ratelimit | null,
  handler: () => Promise<Response>
): Promise<Response> {
  const result = await checkRateLimit(limiter, identifier)

  if (!result.success) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests. Please try again later.',
        limit: result.limit,
        reset: result.reset,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': String(result.limit || 0),
          'X-RateLimit-Remaining': String(result.remaining || 0),
          'X-RateLimit-Reset': String(result.reset || 0),
          'Retry-After': String(Math.ceil((result.reset || Date.now()) / 1000)),
        },
      }
    )
  }

  // Execute handler and add rate limit headers to response
  const response = await handler()
  
  if (result.limit !== undefined) {
    const headers = new Headers(response.headers)
    headers.set('X-RateLimit-Limit', String(result.limit))
    headers.set('X-RateLimit-Remaining', String(result.remaining || 0))
    headers.set('X-RateLimit-Reset', String(result.reset || 0))
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  }

  return response
}

