# Security Testing Documentation

This document describes security-relevant behavior in the current QR Canvas application (no user authentication; one-time Stripe payment per download).

---

## Payment & Download Flow

### Checkout Session Creation (POST /api/create-checkout-session)

- **Rate limiting:** Checkout is rate limited by IP (e.g. 10 requests per hour when Upstash Redis is configured). See `src/lib/rate-limit.ts`.
- **No auth:** Anyone can request a checkout session; payment is the gate.
- **Validation:** Uses `STRIPE_PRICE_DOWNLOAD`; no user-supplied price or product.

**Manual test:**
- [ ] From `/create`, complete design and click Download → redirects to Stripe Checkout.
- [ ] Without Redis, multiple checkout requests succeed; with Redis, verify 429 after limit.

### Verify Download (GET /api/verify-download)

- **Input:** `session_id` query parameter (Stripe Checkout Session ID).
- **Checks:** Session exists, `payment_status === 'paid'`, purchase not already used (`downloaded`), purchase not `refunded`.
- **Idempotency:** First successful verify creates/updates `Purchase` and marks `downloaded: true`; subsequent calls for same session return 403 ("This download has already been used") when applicable.

**Manual tests:**
- [ ] Complete payment, land on `/download?session_id=...` → 200 and PNG download.
- [ ] Call verify-download again with same `session_id` (e.g. reload `/download`) → 403 or success depending on implementation (one download per purchase).
- [ ] Call with invalid or missing `session_id` → 400/402/500 as appropriate.
- [ ] After refunding in Stripe, call verify-download with that session → 403 ("This purchase has been refunded").

### Stripe Webhook (POST /api/webhooks/stripe)

- **Verification:** Request body is verified with `STRIPE_WEBHOOK_SECRET` (signature check). Invalid signature → 400.
- **Events:** `checkout.session.completed` (create `Purchase`), `charge.refunded` (set `Purchase.status = 'refunded'`).
- **Idempotency:** Duplicate `checkout.session.completed` does not create a second `Purchase` (unique on `stripeSessionId`).

**Manual test (with ngrok or production URL):**
- [ ] Trigger a test payment; confirm `Purchase` row in DB.
- [ ] Trigger a refund in Stripe Dashboard; confirm `Purchase.status` is `refunded`.

---

## General Protections

### XSS

- **Status:** ✅ Mitigated by React (escaping in JSX). User content (e.g. QR labels) is not rendered as raw HTML.

### SQL Injection

- **Status:** ✅ All DB access via Prisma (parameterized). No raw SQL in app code.

### Environment & Secrets

- **Status:** ✅ `src/lib/env.ts` validates required env vars at startup. No Clerk; Stripe keys and webhook secret are required at runtime where used. See [ENV_SETUP.md](ENV_SETUP.md).

### Security Headers

- **Status:** ✅ Configured in `next.config.js` (CSP, X-Frame-Options, etc.). See [SECURITY_IMPROVEMENTS.md](SECURITY_IMPROVEMENTS.md).

---

## Recommendations

- Keep Stripe webhook signature verification enabled; never skip it.
- In production, use Upstash Redis for checkout rate limiting so limits apply across instances.
- Do not commit `.env.local`; set all secrets in the hosting platform.
- Use Stripe test keys in development and live keys only in production.
