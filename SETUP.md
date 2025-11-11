# Authentication & Payments Setup Guide

This guide will help you configure Clerk authentication, Stripe payments, and Neon database for your QR Canvas application.

> **NEW:** Clerk webhooks are now **optional** for development! Users are automatically synced to the database on-demand. See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for testing without webhooks.

## Prerequisites

You'll need accounts on:
- [Clerk](https://clerk.com) - Authentication
- [Stripe](https://stripe.com) - Payments
- [Neon](https://neon.tech) - PostgreSQL Database

---

## Step 1: Set Up Neon Database

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project (name it "qr-canvas" or similar)
3. Copy the connection string from the dashboard
4. Create a `.env.local` file in the project root with:

```bash
DATABASE_URL="postgresql://[your-connection-string]"
```

5. Run Prisma migration to create the database tables:

```bash
npx prisma generate
npx prisma db push
```

---

## Step 2: Set Up Clerk Authentication

1. Go to [clerk.com](https://clerk.com) and create a free account
2. Create a new application
3. In the Clerk dashboard:
   - Go to **API Keys**
   - Copy your **Publishable Key** and **Secret Key**

4. Add to `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/create
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/subscribe
```

5. Configure Clerk Webhook (for user creation):
   - In Clerk dashboard, go to **Webhooks**
   - Click **Add Endpoint**
   - URL: `https://your-domain.com/api/webhooks/clerk` (use ngrok for local testing)
   - Subscribe to events: `user.created`, `user.updated`, `user.deleted`
   - Copy the **Signing Secret**

6. Add webhook secret to `.env.local`:

```bash
CLERK_WEBHOOK_SECRET=whsec_xxxxx  # OPTIONAL - Skip for local testing
```

> **Note:** You can skip the Clerk webhook setup entirely during development. The app now creates users automatically when they first access it. See [TESTING_GUIDE.md](./TESTING_GUIDE.md).

---

## Step 3: Set Up Stripe Payments

1. Go to [stripe.com](https://stripe.com) and create an account
2. In the Stripe dashboard:
   - Go to **Developers > API Keys**
   - Copy your **Publishable Key** and **Secret Key**

3. Add to `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

4. Create a Product and Price:
   - Go to **Products** in Stripe dashboard
   - Click **Add Product**
   - Name: "QR Canvas Pro"
   - Price: $3.95 recurring monthly
   - Copy the **Price ID** (starts with `price_`)

5. Add price ID to `.env.local`:

```bash
STRIPE_PRICE_ID=price_xxxxx
```

6. Configure Stripe Webhook:
   - Go to **Developers > Webhooks**
   - Click **Add Endpoint**
   - URL: `https://your-domain.com/api/webhooks/stripe` (use ngrok for local testing)
   - Events to send:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy the **Signing Secret**

7. Add webhook secret to `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

8. Configure Stripe Customer Portal:
   - Go to **Settings > Billing > Customer Portal**
   - Enable customer portal
   - Configure branding and settings as desired

---

## Step 4: Application URL Configuration

Add your application URL to `.env.local`:

```bash
# For local development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# For production (update when deployed)
# NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## Final `.env.local` File

### Minimum Required for Local Testing:

```bash
# Clerk (REQUIRED)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/create
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/subscribe

# Database (REQUIRED)
DATABASE_URL="postgresql://xxxxx"

# Stripe (REQUIRED)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_ID=price_xxxxx

# App (REQUIRED)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OPTIONAL - Add these when deploying to production:
# CLERK_WEBHOOK_SECRET=whsec_xxxxx
# STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

> **Quick Start:** You only need the REQUIRED variables above for local testing. Webhooks can be added later when deploying to production.

---

## Testing Webhooks Locally

To test webhooks on your local machine, use [ngrok](https://ngrok.com):

1. Install ngrok: `npm install -g ngrok`
2. Start your dev server: `npm run dev`
3. In a new terminal, run: `ngrok http 3000`
4. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
5. Update webhook endpoints in Clerk and Stripe:
   - Clerk: `https://abc123.ngrok.io/api/webhooks/clerk`
   - Stripe: `https://abc123.ngrok.io/api/webhooks/stripe`

---

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client and push schema:
```bash
npx prisma generate
npx prisma db push
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

---

## Testing the Payment Flow

1. Sign up for a new account at `/sign-up`
2. You'll be redirected to `/subscribe`
3. Click "Subscribe Now"
4. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
5. Complete checkout
6. You'll be redirected to `/subscribe/success`
7. Go to `/create` and test exporting a wallpaper

---

## Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Check Neon dashboard to ensure database is active
- Run `npx prisma db push` to sync schema

### Clerk Authentication Issues
- Verify API keys are correct
- Check that redirect URLs match your configuration
- Ensure middleware is properly configured

### Stripe Payment Issues
- Use test mode keys (starting with `pk_test_` and `sk_test_`)
- Verify webhook endpoint is accessible
- Check Stripe dashboard logs for webhook delivery status

### Webhook Not Working
- Ensure ngrok is running for local development
- Check webhook signing secrets are correct
- Verify endpoint URLs in Clerk/Stripe dashboard
- Check server logs for webhook errors

---

## Production Deployment Checklist

Before deploying to production:

1. **Switch to Production Keys**
   - Clerk: Use production API keys
   - Stripe: Use live mode keys (starting with `pk_live_` and `sk_live_`)
   - Update `NEXT_PUBLIC_APP_URL` to your production domain

2. **Update Webhook URLs**
   - Clerk: `https://your-domain.com/api/webhooks/clerk`
   - Stripe: `https://your-domain.com/api/webhooks/stripe`

3. **Database**
   - Ensure Neon database is on a paid plan (free tier pauses after inactivity)
   - Run migrations: `npx prisma migrate deploy`

4. **Security**
   - Never commit `.env.local` to git (it's already in `.gitignore`)
   - Use environment variables in your deployment platform
   - Enable HTTPS on your domain

5. **Stripe Setup**
   - Complete Stripe account verification
   - Set up real bank account for payouts
   - Configure tax settings if applicable

---

## Support

If you encounter issues:
- Clerk: [docs.clerk.com](https://docs.clerk.com)
- Stripe: [stripe.com/docs](https://stripe.com/docs)
- Neon: [neon.tech/docs](https://neon.tech/docs)
- Prisma: [prisma.io/docs](https://prisma.io/docs)

