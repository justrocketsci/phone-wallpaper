# Testing Guide

How to test the QR Canvas payment and download flow locally and in production.

---

## Quick Start

### 1. Set Up `.env.local`

Create `.env.local` in the project root with:

```bash
# Database (REQUIRED)
DATABASE_URL=postgresql://xxxxx

# Stripe (REQUIRED - from stripe.com dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_DOWNLOAD=price_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App URL (optional)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

See [ENV_SETUP.md](ENV_SETUP.md) for details.

### 2. Database & Dev Server

```bash
npx prisma generate
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Testing the Download Flow

### Test 1: Create → Pay → Download

1. Go to `http://localhost:3000` and click **Get Started** (or open `/create`).
2. **Design a wallpaper:**
   - Step 1: Choose a device (e.g. iPhone 15 Pro).
   - Step 2: Choose a gradient.
   - Step 3: Add at least one QR code (URL + label).
3. Click **Download PNG — $1.99**.
4. You are redirected to Stripe Checkout. Use test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: any future date (e.g. 12/34)
   - CVC: any 3 digits
   - ZIP: any 5 digits
5. After payment, you are redirected to `/download?session_id=...`.
6. The app verifies the session, restores your design from localStorage, generates the PNG, and downloads it.
7. You should see "Download Complete!" and the file in your downloads folder.

**What happens:**
- Design state is saved to localStorage before redirecting to Stripe.
- Stripe webhook `checkout.session.completed` creates a `Purchase` record (when webhook is configured).
- `/api/verify-download` checks the session is paid and allows one download per purchase; it creates/updates `Purchase` and marks `downloaded: true`.
- Client restores state, runs `exportWallpaperAsPNG()`, then clears localStorage.

### Test 2: Same Session Used Twice (Should Fail)

1. After a successful download, copy the `/download` URL (including `session_id=...`).
2. Open it in the same or a new tab (or clear localStorage and reopen).
3. The verify API should still return success, but if you no longer have the design in localStorage you get the error: "Could not restore your wallpaper design..."
4. If you still have the design in localStorage (e.g. same browser, no clear), the PNG is generated again. The backend allows one "download" per purchase in the sense that the session is verified once per redemption; the actual one-time enforcement is that after the first successful verify+export, the user typically leaves the page and state is cleared.

**Note:** Each Stripe checkout session is intended for one download. The app records `downloaded` on the `Purchase` row; verify-download checks this and rejects if the purchase was already used. See `src/app/api/verify-download/route.ts`.

### Test 3: No Session / Invalid Session

1. Open `/download` without a `session_id` query param.
   - You should see an error: "No session ID provided" or similar.
2. Open `/download?session_id=invalid`.
   - You should see a verification error (e.g. "Invalid session" or "Verification failed").

---

## Testing With Stripe Webhooks (Recommended for Full Flow)

For the backend to record purchases (and refunds) automatically:

1. **Local:** Use [ngrok](https://ngrok.com): `ngrok http 3000`, then in Stripe Dashboard add webhook endpoint `https://YOUR_NGROK_URL/api/webhooks/stripe` with events `checkout.session.completed` and `charge.refunded`. Put the signing secret in `STRIPE_WEBHOOK_SECRET`.
2. **Production:** Add webhook `https://your-domain.com/api/webhooks/stripe` with the same events and set `STRIPE_WEBHOOK_SECRET` in your hosting env.

Then run the flow again; in Prisma Studio you should see a `Purchase` row after checkout.

---

## What You Can Test Locally

- Landing page, navigation, pricing, FAQ.
- Create page: device, gradient, QR blocks, templates (`?template=...`).
- Export bar: disabled until device + gradient + at least one QR.
- Checkout: redirect to Stripe, pay with test card, redirect back to `/download`.
- Verify-download: success path and error messages when session is missing/invalid or design not in localStorage.
- Refunds: in Stripe Dashboard refund a payment; webhook should set `Purchase.status` to `refunded`; verify-download for that session should then reject.

---

## Common Issues

### "Could not restore your wallpaper design..."
- Design state is stored in localStorage only until the download completes. If you used a different browser, cleared storage, or opened the success URL in a new session without going through the same create flow, state is gone. Create the wallpaper again and complete payment in the same browser session.

### "This download has already been used"
- The backend allows one download per Stripe session. Each new download requires a new purchase (new checkout session).

### "Stripe price not configured"
- Set `STRIPE_PRICE_DOWNLOAD` in `.env.local` to your Stripe price ID (one-time price for the download).

### "Verification failed" / "Invalid session"
- Check that `session_id` is the full Stripe Checkout Session ID.
- Ensure you use Stripe test keys and a session from test mode.
- If you use webhooks, ensure `STRIPE_WEBHOOK_SECRET` matches the endpoint and that the webhook is receiving events (Stripe Dashboard > Webhooks).

### Rate limit (429) on checkout
- Checkout is rate limited by IP (e.g. 10/hour when Redis is configured). If Redis is not set, rate limiting is disabled. For local testing you can use a new incognito window or different IP if you hit the limit.

---

## Useful Commands

```bash
npx prisma studio   # Inspect Purchase and other tables
npx prisma generate # After schema changes
npx prisma db push  # Sync schema to DB
```

---

## Need Help?

- [ENV_SETUP.md](ENV_SETUP.md) - Environment variables
- [SETUP.md](SETUP.md) - Database and Stripe setup
- [Stripe Testing](https://stripe.com/docs/testing)
