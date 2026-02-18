/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
  return [
  {
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
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://js.stripe.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com",
  "worker-src 'self' blob:",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.google.com https://www.googleadservices.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://api.stripe.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://stats.g.doubleclick.net",
  "frame-src 'self' https://js.stripe.com https://td.doubleclick.net https://googleads.g.doubleclick.net",
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