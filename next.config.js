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
            value: 'SAMEORIGIN',
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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://accounts.google.com https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.dev https://clerk.qrcanvas.app",
              "style-src 'self' 'unsafe-inline' https://accounts.google.com https://*.clerk.accounts.dev https://clerk.qrcanvas.app",
              "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.clerk.accounts.dev https://img.clerk.com https://clerk.qrcanvas.app",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.clerk.accounts.dev https://*.clerk.dev https://api.clerk.dev https://api.clerk.com https://api.stripe.com https://clerk.qrcanvas.app",
              "frame-src 'self' https://challenges.cloudflare.com https://accounts.google.com https://js.stripe.com https://*.clerk.accounts.dev https://*.clerk.dev https://clerk.qrcanvas.app",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

