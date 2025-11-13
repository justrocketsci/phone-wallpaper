<!-- b98d7288-6d42-4fe2-8bdd-f042ee74967a fc64d71a-5acb-4649-a421-31d4b4a2c07f -->
# Minimum Viable Security (MVS) for First Production

## Launch Blockers (Must Fix)

### 1. Security Headers (~15 minutes)

Add essential headers in `next.config.js`:

- X-Frame-Options: DENY (prevent clickjacking)
- X-Content-Type-Options: nosniff (prevent MIME sniffing)
- Referrer-Policy: strict-origin-when-cross-origin
- Basic CSP for Google Analytics

**Why Critical:** One-line config changes that prevent common attacks. No code changes needed.

### 2. Input Validation (~2 hours)

Add basic Zod validation to API routes:

- `POST /api/designs`: Validate name (1-100 chars), settings structure, thumbnail size
- `PATCH /api/designs/[id]`: Same validation
- `POST /api/create-checkout-session`: Already protected by Stripe/Clerk

**Why Critical:** Prevents malicious data injection and database bloat. Core protection.

### 3. Environment Variable Validation (~30 minutes)

Create startup validation that checks all required env vars exist:

- Database URL
- Clerk keys
- Stripe keys
- Webhook secrets

**Why Critical:** Prevents silent failures and crashes in production.

### 4. IDOR Protection Test (~30 minutes)

Manual testing to verify users can't access other users' designs:

- Test GET /api/designs/[id] with different user IDs
- Test PATCH /api/designs/[id] with wrong owner
- Test DELETE /api/designs/[id] with wrong owner

**Why Critical:** Already implemented, just need to verify it works.

### 5. Fix Environment Variable Inconsistency (~5 minutes)

Standardize `NEXT_PUBLIC_APP_URL` → `NEXT_PUBLIC_BASE_URL` in:

- `src/app/api/create-checkout-session/route.ts`
- `src/app/api/create-portal-session/route.ts`

**Why Critical:** Quick fix, prevents confusion and potential bugs.

## Strongly Recommended (Launch Day)

### 6. Basic Rate Limiting (~1-2 hours)

Simple in-memory rate limiting using `@upstash/ratelimit` or similar:

- Designs API: 100 requests/15 min per user
- Checkout: 10 requests/hour per user

**Why Important:** Prevents abuse and API spam. Good for launch day traffic spikes.

### 7. Production Checklist (~30 minutes)

Verify before deploying:

- [ ] Using production Clerk keys (not test)
- [ ] Using production Stripe keys (not test)
- [ ] `NEXT_PUBLIC_BASE_URL` set to actual domain
- [ ] Stripe webhook pointing to production URL
- [ ] Clerk webhook pointing to production URL
- [ ] Database backups enabled
- [ ] Production source maps disabled

## Can Wait Until Post-Launch

These are important but not blockers:

- **Advanced Monitoring:** Sentry, structured logging (add in week 1)
- **Webhook Idempotency:** Stripe retries work fine initially (add in week 1)
- **Database Connection Pooling:** Not critical for low traffic (monitor and add as needed)
- **Advanced Security Testing:** Pen testing, load testing (schedule for month 1)
- **Dependency Automation:** Dependabot/Renovate (set up after launch)
- **Data Export Features:** Can implement as users request it
- **Cookie Consent Banner:** Only if targeting EU/CA initially
- **Advanced CSP:** Start basic, tighten over time

## Already Secure ✓

These are already implemented correctly:

- Webhook signature verification (Stripe & Clerk)
- SQL injection protection (Prisma ORM)
- XSS protection (React auto-escaping)
- No hardcoded secrets
- Proper .gitignore for secrets
- Generic error messages
- HTTPS (Vercel handles)
- Authentication (Clerk handles)

## Total Time Investment

- **Critical (Must Do):** ~3.5 hours
- **Strongly Recommended:** ~2.5 hours
- **Total for launch:** ~6 hours

## Implementation Order

1. Security headers (15 min) ← Do first, easiest
2. Env var validation (30 min)
3. Env var standardization (5 min)
4. Input validation (2 hours)
5. IDOR testing (30 min)
6. Rate limiting (1-2 hours)
7. Production checklist (30 min)

You'll have a production-ready, secure app in under a day of focused work.

### To-dos

- [ ] Add security headers to next.config.js (X-Frame-Options, CSP, etc.)
- [ ] Add Zod validation to design API routes (name, settings, thumbnail)
- [ ] Create startup validation for all required environment variables
- [ ] Manual test IDOR protection on all design endpoints
- [ ] Fix NEXT_PUBLIC_APP_URL vs NEXT_PUBLIC_BASE_URL inconsistency
- [ ] Implement basic rate limiting for API routes
- [ ] Complete pre-deployment production checklist