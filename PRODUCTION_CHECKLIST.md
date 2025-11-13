# Production Deployment Checklist

Use this checklist before deploying to production to ensure all security and configuration steps are complete.

## 1. Environment Variables

### Required Variables
- [ ] `DATABASE_URL` - Production PostgreSQL connection string
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Production Clerk key (pk_live_*)
- [ ] `CLERK_SECRET_KEY` - Production Clerk secret (sk_live_*)
- [ ] `CLERK_WEBHOOK_SECRET` - Production Clerk webhook secret
- [ ] `STRIPE_SECRET_KEY` - Production Stripe key (sk_live_*)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Production Stripe key (pk_live_*)
- [ ] `STRIPE_WEBHOOK_SECRET` - Production Stripe webhook secret
- [ ] `STRIPE_PRICE_ID` - Production Stripe price ID (price_*)
- [ ] `NEXT_PUBLIC_BASE_URL` - Your production domain (e.g., https://yourdomain.com)

### Optional Variables (Recommended)
- [ ] `NEXT_PUBLIC_GA_ID` - Google Analytics measurement ID
- [ ] `NEXT_PUBLIC_GOOGLE_VERIFICATION` - Google Search Console verification
- [ ] `NEXT_PUBLIC_BING_VERIFICATION` - Bing Webmaster Tools verification
- [ ] `UPSTASH_REDIS_REST_URL` - Upstash Redis URL (for production rate limiting)
- [ ] `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token

## 2. Third-Party Service Configuration

### Clerk
- [ ] Switched from test keys to production keys
- [ ] Added production domain to allowed origins
- [ ] Configured production webhook endpoint: `https://yourdomain.com/api/webhooks/clerk`
- [ ] Webhook listening for events: `user.created`, `user.updated`, `user.deleted`
- [ ] Tested sign-up and sign-in flows
- [ ] Enabled 2FA for admin accounts (optional but recommended)

### Stripe
- [ ] Switched from test keys to production keys
- [ ] Created production product and pricing
- [ ] Configured production webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
- [ ] Webhook listening for events:
  - [ ] `checkout.session.completed`
  - [ ] `customer.subscription.updated`
  - [ ] `customer.subscription.deleted`
- [ ] Tested checkout flow with real card
- [ ] Enabled Stripe Radar for fraud detection (recommended)
- [ ] Reviewed dispute handling process

### Database
- [ ] Production database provisioned
- [ ] Database backups enabled and scheduled
- [ ] Ran Prisma migrations: `npx prisma migrate deploy`
- [ ] Verified database connection from production environment
- [ ] Set up connection pooling (PgBouncer recommended for Vercel)

## 3. Security Configuration

### Headers & CSP
- [ ] Security headers configured in `next.config.js`
- [ ] Content Security Policy allows necessary domains
- [ ] Tested that Google Analytics loads correctly
- [ ] Verified Clerk authentication works with CSP
- [ ] Checked that Stripe checkout embeds work

### Rate Limiting
- [ ] Rate limiting implemented for all API routes
- [ ] Upstash Redis configured for production (optional but recommended)
- [ ] Tested rate limiting behavior
- [ ] Verified rate limit headers are returned

### Input Validation
- [ ] Zod validation active on all design endpoints
- [ ] Tested with invalid inputs to verify rejection
- [ ] Thumbnail size limits enforced (500KB max)
- [ ] Name length validation working (1-100 chars)

### Environment Validation
- [ ] Startup validation runs and checks all required env vars
- [ ] Tested with missing env var to verify error message

## 4. DNS & Domain

### Domain Setup
- [ ] Domain purchased and registered
- [ ] DNS records configured to point to hosting platform
- [ ] SSL certificate provisioned (automatic on Vercel)
- [ ] HTTPS redirect enabled
- [ ] WWW vs non-WWW decided and configured

### Security
- [ ] Domain registrar 2FA enabled
- [ ] Domain transfer lock enabled
- [ ] DNSSEC enabled (if supported by registrar)
- [ ] CAA records configured (optional)

## 5. Hosting Platform (Vercel)

### Deployment Settings
- [ ] Project connected to Git repository
- [ ] Production branch configured (usually `main`)
- [ ] All environment variables added to Vercel dashboard
- [ ] Build command: `npm run build` or `next build`
- [ ] Install command: `npm install`
- [ ] Framework preset: Next.js

### Security & Performance
- [ ] Deployment protection enabled (optional)
- [ ] Source maps disabled for production
- [ ] Analytics enabled (Vercel Analytics or Google Analytics)
- [ ] Error logging configured (consider Sentry)

## 6. SEO & Analytics

### Meta Tags
- [ ] `NEXT_PUBLIC_BASE_URL` set to production domain
- [ ] Open Graph image created and uploaded to `/public/og-image.png`
- [ ] Verified meta tags in production using View Source
- [ ] Twitter card meta tags working

### Search Engines
- [ ] Submitted sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- [ ] Submitted sitemap to Bing Webmaster Tools
- [ ] Verified ownership in Google Search Console
- [ ] Verified ownership in Bing Webmaster Tools
- [ ] Robots.txt accessible: `https://yourdomain.com/robots.txt`

### Analytics
- [ ] Google Analytics configured and tracking
- [ ] Verified tracking in GA4 Real-Time reports
- [ ] Set up conversion tracking for subscriptions (optional)

## 7. Testing in Production

### Authentication
- [ ] Sign up with new email address
- [ ] Sign in with existing account
- [ ] Sign out works correctly
- [ ] Password reset flow (if applicable)
- [ ] Session persists across page refreshes

### Core Functionality
- [ ] Create a new wallpaper design
- [ ] Save design to database
- [ ] Edit existing design
- [ ] Delete design
- [ ] Load saved designs from dashboard
- [ ] Export wallpaper as PNG

### Subscription Flow
- [ ] Access subscription page
- [ ] Complete checkout with real card (test with small amount)
- [ ] Verify webhook received and user upgraded
- [ ] Access subscriber-only features
- [ ] Verify billing portal access
- [ ] Test subscription cancellation

### IDOR Protection (Manual Security Test)
- [ ] Create two user accounts
- [ ] Try to access another user's design by ID
- [ ] Verify 404 response (not 403)
- [ ] Try to update another user's design
- [ ] Try to delete another user's design

### Rate Limiting
- [ ] Make multiple rapid requests to design API
- [ ] Verify rate limit kicks in (429 status)
- [ ] Check rate limit headers in response
- [ ] Wait for reset and verify access restored

### Error Handling
- [ ] Test invalid design data submission
- [ ] Verify user-friendly error messages
- [ ] Check that no stack traces leak to users
- [ ] Verify errors are logged properly

## 8. Monitoring & Alerts

### Logging
- [ ] Error logging configured (Sentry, LogRocket, etc.)
- [ ] Webhook failure notifications set up
- [ ] Critical error alerts configured

### Metrics
- [ ] Set up uptime monitoring (UptimeRobot, Better Uptime, etc.)
- [ ] Monitor API response times
- [ ] Track subscription conversion rates
- [ ] Monitor error rates

## 9. Legal & Compliance

### Privacy & Terms
- [ ] Privacy policy reviewed and accurate
- [ ] Terms of service reviewed
- [ ] Cookie consent banner (if required for your jurisdiction)
- [ ] GDPR compliance (if targeting EU)
- [ ] CCPA compliance (if targeting California)

### Data Handling
- [ ] Data retention policy documented
- [ ] User data deletion process tested
- [ ] Backup and recovery procedures documented

## 10. Performance

### Optimization
- [ ] Images optimized (using Next.js Image component where applicable)
- [ ] Fonts preloaded
- [ ] Lighthouse score reviewed (aim for 90+ on all metrics)
- [ ] Core Web Vitals passing

### Caching
- [ ] Static assets cached properly
- [ ] API responses cached where appropriate
- [ ] CDN configured (Vercel Edge Network)

## 11. Final Checks

### Code Quality
- [ ] No console.log statements in production code (or using proper logger)
- [ ] No commented-out code blocks
- [ ] No TODO comments referencing critical issues
- [ ] TypeScript errors resolved
- [ ] ESLint warnings reviewed and addressed

### Version Control
- [ ] All changes committed to Git
- [ ] Production branch up to date
- [ ] Tagged release version (optional but recommended)

### Documentation
- [ ] README updated with deployment info
- [ ] Environment variable documentation current
- [ ] Architecture decisions documented (if applicable)

## 12. Post-Launch

### Immediate (First 24 Hours)
- [ ] Monitor error logs closely
- [ ] Watch webhook delivery success rate
- [ ] Check analytics for traffic
- [ ] Verify all critical flows work
- [ ] Be available for emergency fixes

### Week 1
- [ ] Review user feedback
- [ ] Monitor subscription conversion
- [ ] Check for security alerts
- [ ] Review performance metrics
- [ ] Plan iteration improvements

## Emergency Contacts

Document these before launch:

- **Hosting Support:** Vercel support contact
- **Domain Registrar:** Support contact
- **Payment Processor:** Stripe support
- **Database Provider:** Support contact
- **On-Call Developer:** Your contact info

## Rollback Plan

In case of critical issues:

1. Revert to previous deployment in Vercel dashboard
2. Or: Git revert and redeploy
3. Update DNS if needed
4. Notify users if service was impacted
5. Post-mortem after issue resolved

---

## Sign-Off

Before deploying to production, this checklist should be reviewed and approved by:

- [ ] **Developer:** Confirm all technical items complete
- [ ] **Security Review:** Confirm security measures in place
- [ ] **Product Owner:** Confirm business requirements met

**Deployment Date:** __________________

**Deployed By:** __________________

**Production URL:** __________________

---

## Quick Reference

### Verify Environment Variables
```bash
# Run this locally to check if all vars are set
node -e "require('./src/lib/env').validateEnv()"
```

### Database Migration
```bash
npx prisma migrate deploy
```

### Test Webhook Endpoints
```bash
# Clerk webhook
curl -X POST https://yourdomain.com/api/webhooks/clerk \
  -H "svix-id: test" \
  -H "svix-timestamp: test" \
  -H "svix-signature: test"

# Stripe webhook  
curl -X POST https://yourdomain.com/api/webhooks/stripe \
  -H "stripe-signature: test"
```

### Monitor Logs
- Vercel: Dashboard > Logs
- Sentry: sentry.io dashboard (if configured)

---

**Remember:** Take your time with this checklist. It's better to catch issues before launch than to deal with them in production!

