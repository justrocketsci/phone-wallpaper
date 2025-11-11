# Testing Guide (No Webhooks Required!)

This guide shows you how to test the full authentication and payment flow **without setting up webhooks** during development.

## What Changed?

The app now automatically creates users in the database **on-demand** when they:
- Visit the `/create` page
- Click "Subscribe"
- Try to export a wallpaper

**No Clerk webhook needed!** Users are synced from Clerk to Neon automatically.

---

## Quick Start Testing

### 1. Set Up Your `.env.local`

Create `.env.local` in the project root with the **minimum required** environment variables:

```bash
# Clerk (REQUIRED - get from clerk.com dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database (REQUIRED - get from neon.tech)
DATABASE_URL=postgresql://xxxxx

# Stripe (REQUIRED - get from stripe.com dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_ID=price_xxxxx

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ⚠️ SKIP THESE FOR NOW (not needed for local testing)
# CLERK_WEBHOOK_SECRET=     <- Skip this!
# STRIPE_WEBHOOK_SECRET=    <- We'll add this when deploying
```

---

### 2. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Neon
npx prisma db push
```

---

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Testing the Flow (Step-by-Step)

### Test 1: User Authentication ✅

1. Go to `http://localhost:3000`
2. Click **"Get Started"** or **"Sign Up"**
3. Create a test account with Clerk
4. You should be redirected to `/subscribe`

**What happens behind the scenes:**
- ✅ Clerk creates user account
- ✅ App redirects to subscribe page
- ✅ User record **automatically created** in Neon database

**Verify in database:**
```bash
npx prisma studio
```
- Open the `User` table
- You should see your test user!

---

### Test 2: Subscription Flow ✅

1. On `/subscribe` page, click **"Subscribe Now"**
2. You'll be redirected to Stripe checkout
3. Use test card: `4242 4242 4242 4242`
4. Complete checkout
5. You'll be redirected to success page
6. **Success page will automatically activate your subscription!**

**What happens:**
- ✅ Stripe creates subscription
- ✅ You're redirected to `/subscribe/success`
- ✅ Success page fetches session from Stripe
- ✅ **User is automatically marked as subscribed** (no manual work needed!)
- ✅ You can immediately start creating wallpapers

**Note:** This uses a session verification endpoint instead of webhooks, so it works locally without ngrok!

---

### Test 3: Alternative - Manual Subscription Activation (Optional)

If the automatic activation fails, you can manually activate:

```bash
# Open Prisma Studio
npx prisma studio
```

1. Click on **User** table
2. Find your test user
3. Edit the record:
   - `subscriptionStatus` → `"active"`
   - `stripeCustomerId` → Copy from Stripe dashboard
4. Save

---

### Test 4: Protected Routes & Export ✅

1. Go to `/create`
2. You should now have access (subscribed user)
3. Design a wallpaper:
   - Choose device
   - Choose gradient
   - Add QR code
4. Click **"Download Wallpaper"**
5. Wallpaper should download! 🎉

**What happens:**
- ✅ App checks subscription status in database
- ✅ User is marked as "active"
- ✅ Export is allowed

---

### Test 5: Non-Subscribed User Flow ✅

1. Open **Prisma Studio** again
2. Change `subscriptionStatus` to `null` or `"canceled"`
3. Refresh `/create` page
4. You should be redirected to `/subscribe`

**Or create a second test user:**
1. Sign out
2. Create new account
3. Go to `/create`
4. You'll be redirected to `/subscribe` (not subscribed yet)

---

## What You CAN Test Locally

✅ **User signup & authentication**  
✅ **Auto-creation of users in database**  
✅ **Subscription page UI**  
✅ **Stripe checkout flow**  
✅ **Automatic subscription activation** (via success page!)  
✅ **Protected routes**  
✅ **Export functionality**  
✅ **Customer portal**  
✅ **Complete end-to-end flow**

---

## What You CANNOT Test Without Webhooks

❌ **Subscription status updates** (renewals, cancellations)  
❌ **Past due / failed payment handling**  
❌ **Subscription events** (invoice.paid, subscription.updated, etc.)

**These require Stripe webhooks, which you'll add when:**
- Deploying to production (recommended)
- Or using ngrok/cloudflare tunnel for local testing

---

## Recommended Testing Strategy

### Phase 1: Local Testing (Now)
- ✅ Test authentication
- ✅ Test UI/UX
- ✅ Test export with manual subscription
- ✅ Test protected routes
- ⚠️ Skip automatic webhooks

### Phase 2: Deploy to Production
- Deploy to Vercel/Netlify/Railway
- Set up Stripe webhook with production URL
- Test real subscription flow end-to-end

---

## Common Issues & Solutions

### "User not found" Error
**Problem:** User signed up but not in database  
**Solution:** Go to `/create` page - user will be auto-created

### "Subscribe to Export" Button Shows
**Problem:** User not marked as subscribed  
**Solution:** Manually set `subscriptionStatus = "active"` in Prisma Studio

### Stripe Checkout Works But Nothing Happens
**Problem:** Webhook not configured  
**Solution:** Normal! Manually activate user in database for testing

### Database Connection Error
**Problem:** `DATABASE_URL` not set or incorrect  
**Solution:** Check `.env.local` and Neon dashboard

### Clerk Authentication Not Working
**Problem:** API keys missing or incorrect  
**Solution:** Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

---

## When to Add Webhooks

**Add webhooks when you:**
- Deploy to production
- Want to test real payment flows
- Need automatic subscription updates

**For now, you can skip them and test 90% of functionality!**

---

## Next Steps

1. ✅ Test user signup
2. ✅ Verify user created in Neon
3. ✅ Test Stripe checkout UI
4. ✅ Manually activate subscription
5. ✅ Test wallpaper export
6. 🚀 Deploy when ready
7. 🔗 Add webhooks in production

---

## Useful Commands

```bash
# View database
npx prisma studio

# Reset database (careful!)
npx prisma db push --force-reset

# Check database schema
npx prisma db pull

# Generate Prisma client (after schema changes)
npx prisma generate
```

---

## Need Help?

- **Clerk Issues**: [docs.clerk.com](https://docs.clerk.com)
- **Stripe Issues**: [stripe.com/docs](https://stripe.com/docs)
- **Neon Issues**: [neon.tech/docs](https://neon.tech/docs)
- **Prisma Issues**: [prisma.io/docs](https://prisma.io/docs)

Happy testing! 🎉

