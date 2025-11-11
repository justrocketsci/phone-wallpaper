<!-- e1e09d0e-e557-435a-b800-cb6eaa90279b 51a3e757-33dc-4f5a-8e66-96bea02f280e -->
# Authentication + Payments Implementation Plan

## Overview

Transform the app from open-access to a paid subscription model. Users must authenticate and subscribe ($3.95/month) to export wallpapers. No dashboard or saved designs in this phase - just auth + payment gating.

---

## Phase 1: Environment & Dependencies

### Install Required Packages

```bash
npm install @clerk/nextjs @prisma/client stripe @stripe/stripe-js
npm install -D prisma
```

### Environment Variables Setup

Create `.env.local` with:

```bash
# Clerk (you'll provide)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/create
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/subscribe

# Database (you'll provide after Neon setup)
DATABASE_URL=

# Stripe (you'll provide)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=
```

If for some reason you can't create the .env.local file, let me know and I can help you create it.

---

## Phase 2: Database Setup

### Initialize Prisma

Create `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id                String    @id @default(cuid())
  clerkId           String    @unique
  email             String    @unique
  name              String?
  
  // Subscription fields
  stripeCustomerId  String?   @unique
  stripeSubscriptionId String? @unique
  subscriptionStatus String?  // active, canceled, past_due, etc.
  subscriptionEndsAt DateTime?
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

### Create Database Client

Create `src/lib/db.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## Phase 3: Authentication with Clerk

### Add Clerk Provider

Modify `src/app/layout.tsx`:

- Import `ClerkProvider`
- Wrap children with `<ClerkProvider>`

### Create Middleware

Create `src/middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

### Create Auth Pages

**`src/app/sign-in/[[...sign-in]]/page.tsx`**:

```typescript
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  )
}
```

**`src/app/sign-up/[[...sign-up]]/page.tsx`**:

```typescript
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp />
    </div>
  )
}
```

### Add User Navigation

Update `src/components/LandingPage/Navigation.tsx`:

- Add `UserButton` from Clerk for authenticated users
- Show "Sign In" button for unauthenticated users

---

## Phase 4: Stripe Integration

### Create Stripe Client

Create `src/lib/stripe.ts`:

```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})
```

### Create Stripe Client-Side

Create `src/lib/stripe-client.ts`:

```typescript
import { loadStripe } from '@stripe/stripe-js'

export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}
```

### Subscription Helper

Create `src/lib/subscription.ts`:

```typescript
import { auth } from '@clerk/nextjs/server'
import { prisma } from './db'

export async function getUserSubscription() {
  const { userId } = await auth()
  if (!userId) return null
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })
  
  if (!user) return null
  
  const isActive = 
    user.subscriptionStatus === 'active' ||
    user.subscriptionStatus === 'trialing'
  
  return {
    isActive,
    status: user.subscriptionStatus,
    endsAt: user.subscriptionEndsAt,
  }
}
```

---

## Phase 5: API Routes

### Clerk Webhook (User Creation)

Create `src/app/api/webhooks/clerk/route.ts`:

- Handle `user.created` event
- Create user in database with Clerk ID

### Stripe Checkout Session

Create `src/app/api/create-checkout-session/route.ts`:

- Create Stripe checkout session
- Set success/cancel URLs
- Return session ID for client redirect

### Stripe Customer Portal

Create `src/app/api/create-portal-session/route.ts`:

- Create Stripe billing portal session
- Return URL for redirect

### Stripe Webhooks

Create `src/app/api/webhooks/stripe/route.ts`:

- Handle `checkout.session.completed`
- Handle `customer.subscription.updated`
- Handle `customer.subscription.deleted`
- Update user subscription status in database

---

## Phase 6: Subscription Pages

### Subscribe Page

Create `src/app/subscribe/page.tsx`:

- Show pricing ($3.95/month)
- "Subscribe Now" button triggers checkout
- Redirect to Stripe Checkout

### Success Page

Create `src/app/subscribe/success/page.tsx`:

- Thank you message
- "Start Creating" button → `/create`

### Cancel Page

Create `src/app/subscribe/cancel/page.tsx`:

- "Subscription canceled" message
- "Try Again" button

---

## Phase 7: Payment Gate on Export

### Update Export Function

Modify `src/lib/export.ts` (`exportWallpaperAsPNG`):

- Check subscription status before export
- Throw error if not subscribed

### Update Export Bar

Modify `src/components/ExportBar.tsx`:

- Check subscription status on mount
- Show "Subscribe to Export" if not subscribed
- Show "Download Wallpaper" if subscribed
- Handle subscription errors gracefully

### Create Subscription Check Hook

Create `src/hooks/useSubscription.ts`:

```typescript
'use client'
import { useEffect, useState } from 'react'

export function useSubscription() {
  const [isActive, setIsActive] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/api/subscription-status')
      .then(res => res.json())
      .then(data => {
        setIsActive(data.isActive)
        setLoading(false)
      })
  }, [])
  
  return { isActive, loading }
}
```

### Subscription Status API

Create `src/app/api/subscription-status/route.ts`:

- Return current user's subscription status
- Used by client components

---

## Phase 8: Update Landing Page

### Modify Hero Section

Update `src/components/LandingPage/Hero.tsx`:

- Change CTA from "Get Started Free" to "Start Creating - $3.95/mo"
- Update copy to mention subscription

### Add Pricing Section (Optional)

Create `src/components/LandingPage/Pricing.tsx`:

- Show single pricing card
- List features
- CTA button

---

## Phase 9: Protect Create Page

### Update Create Page

Modify `src/app/create/page.tsx`:

- Check subscription status server-side
- Redirect to `/subscribe` if not subscribed
- Show banner if subscription is expiring soon

---

## Key Files Summary

**New Files:**

- `prisma/schema.prisma` - Database schema
- `src/lib/db.ts` - Prisma client
- `src/lib/stripe.ts` - Stripe server client
- `src/lib/stripe-client.ts` - Stripe client-side
- `src/lib/subscription.ts` - Subscription helpers
- `src/middleware.ts` - Clerk auth middleware
- `src/app/sign-in/[[...sign-in]]/page.tsx` - Sign in page
- `src/app/sign-up/[[...sign-up]]/page.tsx` - Sign up page
- `src/app/subscribe/page.tsx` - Subscription page
- `src/app/subscribe/success/page.tsx` - Success page
- `src/app/subscribe/cancel/page.tsx` - Cancel page
- `src/app/api/webhooks/clerk/route.ts` - Clerk webhook
- `src/app/api/webhooks/stripe/route.ts` - Stripe webhook
- `src/app/api/create-checkout-session/route.ts` - Checkout
- `src/app/api/create-portal-session/route.ts` - Portal
- `src/app/api/subscription-status/route.ts` - Status check
- `src/hooks/useSubscription.ts` - Subscription hook
- `.env.local` - Environment variables

**Modified Files:**

- `src/app/layout.tsx` - Add ClerkProvider
- `src/components/LandingPage/Navigation.tsx` - Add auth buttons
- `src/components/LandingPage/Hero.tsx` - Update pricing copy
- `src/components/ExportBar.tsx` - Add subscription check
- `src/lib/export.ts` - Add payment gate
- `src/app/create/page.tsx` - Add subscription check
- `package.json` - Add dependencies

---

## Testing Checklist

1. User can sign up with Clerk
2. New user is created in database via webhook
3. Unauthenticated users are redirected to sign-in
4. Authenticated users without subscription see subscribe page
5. Stripe checkout flow completes successfully
6. Webhook updates subscription status in database
7. Subscribed users can export wallpapers
8. Non-subscribed users see "Subscribe to Export" button
9. Customer portal allows subscription management
10. Subscription cancellation is handled gracefully

### To-dos

- [ ] Install Clerk, Prisma, and Stripe packages
- [ ] Create Prisma schema and initialize Neon database
- [ ] Implement Clerk authentication with middleware and auth pages
- [ ] Create Stripe clients and subscription helpers
- [ ] Build all API routes for webhooks, checkout, and subscription status
- [ ] Build subscribe, success, and cancel pages
- [ ] Add subscription checks to export functionality
- [ ] Update navigation, hero, and create page for paid model