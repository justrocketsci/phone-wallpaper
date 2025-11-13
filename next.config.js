/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://accounts.google.com https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.dev",
              "style-src 'self' 'unsafe-inline' https://accounts.google.com https://*.clerk.accounts.dev",
              "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.clerk.accounts.dev https://img.clerk.com",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.clerk.accounts.dev https://*.clerk.dev https://api.clerk.dev https://api.clerk.com https://api.stripe.com",
              "frame-src 'self' https://challenges.cloudflare.com https://accounts.google.com https://js.stripe.com https://*.clerk.accounts.dev https://*.clerk.dev",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

