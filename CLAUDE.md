# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QR Canvas is a Next.js 15 web application for creating QR code wallpapers optimized for phone lock screens. Users can select a device, choose a gradient background, add up to 2 QR codes with brand icons, and export at device resolution.

## Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npx prisma generate  # Generate Prisma client after schema changes
npx prisma db push   # Push schema changes to database
npx prisma studio    # Open Prisma database GUI
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router, TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand store (`src/lib/store.ts`)
- **Auth**: Clerk (`@clerk/nextjs`)
- **Payments**: Stripe (subscriptions)
- **Database**: PostgreSQL via Prisma
- **QR Generation**: `qrcode` library

### Key Files

**State Management** - `src/lib/store.ts`
- Central Zustand store for wallpaper state (device, gradient, qrBlocks, typography)
- `getSerializableState()` returns JSON-safe state for saving designs
- `loadFromDesign()` hydrates store from saved design

**Export System** - `src/lib/export.ts`
- `exportWallpaperAsPNG()` renders wallpaper to canvas at device resolution
- Handles QR code positioning, gradient rendering, and icon SVGs
- Uses device `systemUI` data for smart vertical positioning

**Authentication Flow** - `src/middleware.ts`
- Public routes: `/`, `/sign-in`, `/sign-up`, `/api/webhooks`, `/privacy`, `/terms`, `/cookies`, `/subscribe`
- Protected routes require Clerk auth via `auth.protect()`

**Subscription Logic** - `src/lib/subscription.ts`
- `getUserSubscription()` checks Stripe subscription status
- Active statuses: `active`, `trialing`

### Data Models

**User** (Prisma)
- Links Clerk auth (`clerkId`) to Stripe (`stripeCustomerId`, `stripeSubscriptionId`)
- Stores subscription status and end date

**Design** (Prisma)
- User's saved wallpaper designs
- `settings` JSON field stores full `SerializableState`
- Optional `thumbnail` for dashboard grid

### Component Hierarchy

```
WallpaperCreator (main orchestrator)
├── Sidebar (3-step wizard)
│   ├── StepPhone (device selection)
│   ├── StepBackground (gradient selection)
│   └── StepQR (QR code configuration)
└── PreviewPhone (live preview)
    └── WallpaperCanvas (renders wallpaper)
```

### API Routes

- `/api/designs` - CRUD for saved designs (GET list, POST create)
- `/api/designs/[id]` - GET/PATCH/DELETE individual design
- `/api/create-checkout-session` - Stripe checkout
- `/api/create-portal-session` - Stripe customer portal
- `/api/webhooks/stripe` - Stripe webhook handler
- `/api/webhooks/clerk` - Clerk webhook handler

### Static Data

- `src/data/devices.json` - Device specs (dimensions, safe areas, systemUI)
- `src/data/gradients.ts` - Gradient presets
- `src/data/templates.ts` - Pre-configured wallpaper templates
- `src/data/icons.ts` - Brand icon definitions

## Environment Variables

Required in `.env.local`:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_ID` - Subscription product price
- `NEXT_PUBLIC_BASE_URL` - Site URL for SEO/webhooks
