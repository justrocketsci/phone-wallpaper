<!-- 74dea92a-620c-447e-a239-593ecfacf0cd dd67f1bd-0fbc-43b5-8f3a-0cd9d8da534a -->
# Cookie Notice Implementation

## Overview

Add a simple informational cookie notice banner (non-blocking, bottom-positioned) that explains the use of necessary cookies. Since the app only uses strictly necessary cookies (Clerk auth + Stripe payments), no opt-in/opt-out is required - just transparency.

## Implementation Steps

### 1. Create Cookie Notice Component

**File:** `src/components/CookieNotice.tsx`

Build a client component with:

- Bottom-fixed banner with z-index for visibility
- Message explaining necessary cookies (Clerk + Stripe)
- "Got it" dismiss button
- localStorage to persist dismissal (`cookie-notice-dismissed`)
- Slide-up animation on mount
- Non-blocking (doesn't prevent interaction)

### 2. Create Cookie Policy Page

**File:** `src/app/cookies/page.tsx`

Simple page listing:

- What cookies are used (Clerk session cookies, Stripe payment cookies)
- Why they're necessary (authentication, payment processing)
- That they cannot be disabled (strictly necessary for service)
- Cookie durations and purposes

### 3. Integrate into Root Layout

**File:** `src/app/layout.tsx`

Add `<CookieNotice />` component just before closing `</body>` tag (after children)

### 4. Add Footer Link

**File:** `src/components/LandingPage/Footer.tsx`

Add "Cookies" link in the Quick Links section pointing to `/cookies`

## Files to Create/Modify

**New files:**

- `src/components/CookieNotice.tsx` - Cookie notice banner component
- `src/app/cookies/page.tsx` - Cookie policy information page

**Modified files:**

- `src/app/layout.tsx` - Add CookieNotice component
- `src/components/LandingPage/Footer.tsx` - Add cookies link

## Technical Details

**localStorage key:** `qr-canvas-cookie-notice-dismissed`
**Banner position:** Bottom-fixed, full-width
**Animation:** Slide up from bottom on mount
**Dismissal:** Permanent (until localStorage cleared)

### To-dos

- [x] 
- [x] 
- [x] 
- [x] 