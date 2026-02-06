# Database & Payments Setup Guide

This guide helps you configure the database and Stripe one-time payments for QR Canvas.

## Prerequisites

You'll need:
- [Stripe](https://stripe.com) - One-time payment for PNG download
- PostgreSQL (e.g. [Neon](https://neon.tech), [Vercel Postgres](https://vercel.com/storage/postgres), or local)

---

## Step 1: Set Up Database

1. Create a PostgreSQL database (Neon, Vercel Postgres, or local).
2. Copy the connection string from the dashboard.
3. Create a `.env.local` file in the project root:

```bash
DATABASE_URL="postgresql://[your-connection-string]"
```

4. Generate Prisma client and push schema:

```bash
npx prisma generate
npx prisma db push
```

---

## Step 2: Set Up Stripe (One-Time Download)

1. Go to [stripe.com](https://stripe.com) and create an account.
2. In the Stripe dashboard:
   - Go to **Developers > API Keys**
   - Copy your **Publishable Key** and **Secret Key**

3. Add to `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

4. Create a Product and one-time Price:
   - Go to **Products** in Stripe dashboard
   - Click **Add Product**
   - Name: e.g. "QR Canvas Download"
   - Add a **one-time** price (e.g. $1.99)
   - Copy the **Price ID** (starts with `price_`)

5. Add price ID to `.env.local`:

```bash
STRIPE_PRICE_DOWNLOAD=price_xxxxx
```

6. Configure Stripe Webhook (required for recording purchases and refunds):
   - Go to **Developers > Webhooks**
   - Click **Add Endpoint**
   - URL: `https://your-domain.com/api/webhooks/stripe` (use [ngrok](https://ngrok.com) for local: `https://xxxx.ngrok.io/api/webhooks/stripe`)
   - Events to send:
     - `checkout.session.completed`
     - `charge.refunded`
   - Copy the **Signing Secret**

7. Add webhook secret to `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

## Step 3: Application URL (Optional)

```bash
# For local development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# For production (update when deployed)
# NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

---

## Final `.env.local` (Minimum)

```bash
# Database (REQUIRED)
DATABASE_URL="postgresql://xxxxx"

# Stripe (REQUIRED)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_DOWNLOAD=price_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App URL (optional; has fallbacks)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

See [ENV_SETUP.md](ENV_SETUP.md) for full variable list and optional analytics/verification.

---

## Testing Webhooks Locally

1. Install ngrok: `npm install -g ngrok`
2. Start dev server: `npm run dev`
3. In another terminal: `ngrok http 3000`
4. Copy the HTTPS URL and in Stripe Dashboard > Webhooks add endpoint: `https://xxxx.ngrok.io/api/webhooks/stripe`
5. Use the webhook signing secret in `.env.local`

---

## Running the Application

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Testing the Payment Flow

1. Go to [http://localhost:3000](http://localhost:3000) → **Get Started** (or go to `/create`).
2. Design a wallpaper: choose device, gradient, add at least one QR code.
3. Click **Download PNG — $1.99**.
4. Complete Stripe Checkout with test card: `4242 4242 4242 4242`.
5. You are redirected to `/download?session_id=...`; the PNG is generated and downloaded.

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for more testing steps.

---

## Troubleshooting

### Database
- Verify `DATABASE_URL` format and that the database is reachable.
- Run `npx prisma db push` to sync schema.

### Stripe
- Use test keys (`pk_test_`, `sk_test_`) in development.
- Ensure webhook endpoint is reachable (ngrok for local).
- Check Stripe Dashboard > Webhooks for delivery and logs.

### "Missing environment variable"
- See [ENV_SETUP.md](ENV_SETUP.md). Restart the dev server after changing `.env.local`.

---

## Production Checklist

- [ ] Use Stripe **live** keys and set `STRIPE_WEBHOOK_SECRET` for production URL.
- [ ] Set `NEXT_PUBLIC_BASE_URL` to your production domain.
- [ ] Add production Stripe webhook: `https://your-domain.com/api/webhooks/stripe`.
- [ ] Do not commit `.env.local`; set env vars in your hosting platform.

---

## Support

- [Stripe Docs](https://stripe.com/docs)
- [Prisma Docs](https://prisma.io/docs)
- [ENV_SETUP.md](ENV_SETUP.md) - All environment variables
