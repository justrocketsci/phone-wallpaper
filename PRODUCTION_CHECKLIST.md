# Production Deployment Checklist

Use this checklist before deploying to production to ensure all security and configuration steps are complete.

## 1. Environment Variables

### Required Variables (set in Vercel dashboard)
- [ ] `DATABASE_URL` - Production PostgreSQL connection string
- [ ] `STRIPE_SECRET_KEY` - Production Stripe key (sk_live_*)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Production Stripe key (pk_live_*)
- [ ] `STRIPE_WEBHOOK_SECRET` - Production Stripe webhook secret
- [ ] `STRIPE_PRICE_DOWNLOAD` - Production Stripe price ID (price_*)
- [ ] `NEXT_PUBLIC_BASE_URL` - Your production domain (e.g., https://yourdomain.com)

### Optional Variables (Recommended)
- [ ] `NEXT_PUBLIC_GA_ID` - Google Analytics measurement ID
- [ ] `NEXT_PUBLIC_GOOGLE_VERIFICATION` - Google Search Console verification
- [ ] `NEXT_PUBLIC_BING_VERIFICATION` - Bing Webmaster Tools verification
- [ ] `UPSTASH_REDIS_REST_URL` - Upstash Redis URL (for production rate limiting)
- [ ] `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token

## 2. Third-Party Service Configuration

### Stripe
- [ ] Switched from test keys to production keys
- [ ] Created production product and price for per-download payment
- [ ] Configured production webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
- [ ] Webhook listening for events:
  - [ ] `checkout.session.completed`
  - [ ] `charge.refunded`
- [ ] Tested checkout flow with real card
- [ ] Enabled Stripe Radar for fraud detection (recommended)

### Database
- [ ] Production database provisioned
- [ ] Database backups enabled and scheduled
- [ ] Ran `npx prisma db push` to sync schema
- [ ] Verified database connection from production environment
- [ ] Set up connection pooling (PgBouncer recommended for Vercel)

## 3. Security Configuration

### Headers & CSP
- [ ] Security headers configured in `next.config.js`
- [ ] Content Security Policy allows necessary domains
- [ ] Tested that Google Analytics loads correctly
- [ ] Checked that Stripe checkout works

### Rate Limiting
- [ ] Rate limiting implemented for checkout API route
- [ ] Upstash Redis configured for production (optional but recommended)
- [ ] Tested rate limiting behavior

### Environment Validation
- [ ] Startup validation runs and checks all required env vars
- [ ] Tested with missing env var to verify error message

## 4. DNS & Domain

### Domain Setup
- [ ] Domain purchased and registered
- [ ] DNS records configured to point to Vercel
- [ ] SSL certificate provisioned (automatic on Vercel)
- [ ] HTTPS redirect enabled
- [ ] WWW vs non-WWW decided and configured

## 5. Hosting Platform (Vercel)

### Deployment Settings
- [ ] Project connected to Git repository
- [ ] Production branch configured (usually `main`)
- [ ] All environment variables added to Vercel dashboard
- [ ] Build command: `npm run build`
- [ ] Framework preset: Next.js

### Performance
- [ ] Analytics enabled (Vercel Analytics or Google Analytics)
- [ ] Error logging configured (consider Sentry)

## 6. SEO & Analytics

### Meta Tags
- [ ] `NEXT_PUBLIC_BASE_URL` set to production domain
- [ ] Open Graph image created and uploaded to `/public/og-image.png`
- [ ] Verified meta tags in production using View Source

### Search Engines
- [ ] Submitted sitemap to Google Search Console
- [ ] Verified ownership in Google Search Console
- [ ] Robots.txt accessible: `https://yourdomain.com/robots.txt`

### Analytics
- [ ] Google Analytics configured and tracking
- [ ] Verified tracking in GA4 Real-Time reports

## 7. Testing in Production

### Core Functionality
- [ ] Create a new wallpaper design
- [ ] Complete checkout and download wallpaper
- [ ] Verify webhook received and purchase recorded
- [ ] Export wallpaper as PNG at correct device resolution
- [ ] Test on multiple devices/browsers

### Payment Flow
- [ ] Complete checkout with real card
- [ ] Verify download triggers after payment
- [ ] Verify double-download prevention works
- [ ] Test with Stripe test card for refund flow

### Rate Limiting
- [ ] Make multiple rapid requests to checkout API
- [ ] Verify rate limit kicks in (429 status)
- [ ] Wait for reset and verify access restored

### Error Handling
- [ ] Verify user-friendly error messages
- [ ] Check that no stack traces leak to users

## 8. Monitoring & Alerts

### Logging
- [ ] Error logging configured
- [ ] Webhook failure notifications set up

### Metrics
- [ ] Set up uptime monitoring
- [ ] Monitor API response times

## 9. Legal & Compliance

### Privacy & Terms
- [ ] Privacy policy reviewed and accurate
- [ ] Terms of service reviewed
- [ ] Cookie consent banner functional
- [ ] GDPR compliance (if targeting EU)

## 10. Final Checks

### Code Quality
- [ ] No console.log statements in production code (or using proper logger)
- [ ] TypeScript errors resolved
- [ ] ESLint warnings reviewed and addressed

### Version Control
- [ ] All changes committed to Git
- [ ] Production branch up to date

---

## Quick Reference

### Verify Environment Variables
```bash
node -e "require('./src/lib/env').validateEnv()"
```

### Database Schema Sync
```bash
npx prisma db push
```

### Test Webhook Endpoint
```bash
# Stripe webhook
curl -X POST https://yourdomain.com/api/webhooks/stripe \
  -H "stripe-signature: test"
```

### Monitor Logs
- Vercel: Dashboard > Logs
