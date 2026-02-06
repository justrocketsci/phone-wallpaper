# Environment Variables Setup Guide

This guide explains all environment variables needed for QR Canvas.

## Quick Setup

1. Copy the example file (you'll need to create this):
```bash
cp .env.example .env.local
```

2. Fill in the required values in `.env.local`

---

## Required Environment Variables

### Database

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/qrcanvas"
```
- PostgreSQL connection string for Prisma
- Format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`

### Stripe Payments

```bash
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_DOWNLOAD=price_xxxxx
```

Get these from [Stripe Dashboard](https://dashboard.stripe.com):
1. **API Keys:** Dashboard > Developers > API keys
2. **Webhook Secret:** 
   - Go to Developers > Webhooks
   - Create endpoint: `your-domain.com/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `charge.refunded`
3. **Price ID (STRIPE_PRICE_DOWNLOAD):**
   - Go to Products
   - Create a product (or use existing) for one-time download
   - Create a one-time price (e.g. $1.99)
   - Copy the price ID (starts with `price_`)

---

## Rate Limiting (Optional for Production)

### Upstash Redis (Recommended for Production)

```bash
# Optional - For Redis-based rate limiting in production
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

**Setup:**
1. Go to [Upstash](https://upstash.com)
2. Create a free Redis database
3. Copy the REST URL and token
4. Add to environment variables

**Note:** Rate limiting works in-memory without Redis, but for production with multiple instances, Redis-based rate limiting is recommended.

**Current Limits:**
- Checkout API: 10 requests per hour per IP (when Redis configured)
- General API: 200 requests per 15 minutes (when Redis configured)

---

## SEO & Analytics

### Base URL

```bash
# Development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Production
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

**Important:** Update this in production to your actual domain!

### Google Analytics 4 (Optional but Recommended)

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Setup:
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a GA4 property
3. Get your Measurement ID (starts with `G-`)
4. Add to environment variables

### Search Engine Verification (Optional)

```bash
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
NEXT_PUBLIC_BING_VERIFICATION=your-bing-code
```

**Google Search Console:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Choose "HTML tag" verification method
4. Copy the content value from the meta tag
5. Add to environment variable

**Bing Webmaster Tools:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Choose meta tag verification
4. Copy the verification code
5. Add to environment variable

---

## Complete .env.local Example

Create a `.env.local` file in your project root:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/qrcanvas"

# Stripe Payments (one-time download)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_DOWNLOAD=price_xxxxx

# SEO Configuration (optional)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Search Console Verification (optional)
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-code
NEXT_PUBLIC_BING_VERIFICATION=your-code
```

---

## Environment-Specific Values

### Development (.env.local)
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# Use Stripe test keys (sk_test_*, pk_test_*)
```

### Production (via your hosting platform)
```bash
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
# Use Stripe live keys (sk_live_*, pk_live_*)
```

---

## Deployment Checklist

When deploying to production (Vercel, Netlify, etc.):

- [ ] Add all environment variables to your hosting platform's settings
- [ ] Update `NEXT_PUBLIC_BASE_URL` to production domain
- [ ] Switch to Stripe live keys
- [ ] Add your production domain to Stripe webhook endpoints
- [ ] Set up Google Analytics (optional)
- [ ] Verify Google Search Console (optional)
- [ ] Verify Bing Webmaster Tools (optional)

---

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Never expose secret keys in client-side code
- Only `NEXT_PUBLIC_*` variables are exposed to the browser
- Rotate keys immediately if they're ever exposed
- Use test keys in development, live keys in production

---

## Testing Your Setup

After setting up environment variables:

```bash
# 1. Restart your dev server
npm run dev

# 2. Check if analytics are working
# Open browser console and verify Google Analytics loads

# 3. Test payments
# Create a wallpaper, click Download, complete checkout with Stripe test card: 4242 4242 4242 4242

# 4. Check SEO metadata
# Visit http://localhost:3000
# View page source and verify meta tags are present
```

---

## Troubleshooting

### "Missing environment variable" errors
- Ensure `.env.local` exists in project root
- Restart your dev server after adding variables
- Check for typos in variable names

### Analytics not tracking
- Verify `NEXT_PUBLIC_GA_ID` is set correctly
- Check browser console for errors
- Ensure ad blockers aren't blocking Analytics

### Sitemap showing localhost URLs
- Update `NEXT_PUBLIC_BASE_URL` to your production domain
- Redeploy your application

### Search Console can't verify
- Ensure verification code is added to environment variables
- Redeploy to apply changes
- Wait a few minutes and try verifying again

---

## Need Help?

- **Stripe Documentation:** https://stripe.com/docs
- **Next.js Environment Variables:** https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- **Google Analytics Setup:** https://support.google.com/analytics


