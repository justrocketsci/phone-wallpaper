# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QR Canvas is a Next.js 15 web application for creating QR code wallpapers optimized for phone lock screens. Users can select a device, choose a gradient background, add up to 2 QR codes with brand icons, and export at device resolution. Export is gated by a one-time Stripe payment per download.

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
- **Payments**: Stripe (one-time payment per download)
- **Database**: PostgreSQL via Prisma
- **QR Generation**: `qrcode` library

### Key Files

**State Management** - `src/lib/store.ts`
- Central Zustand store for wallpaper state (device, gradient, qrBlocks, typography)
- `getSerializableState()` returns JSON-safe state for saving designs
- `loadFromDesign()` hydrates store from saved design
- `savePendingDownload()` / `loadPendingDownload()` / `clearPendingDownload()` persist state across checkout for post-payment download

**Export System** - `src/lib/export.ts`
- `exportWallpaperAsPNG()` renders wallpaper to canvas at device resolution
- Handles QR code positioning, gradient rendering, and icon SVGs
- Uses device `systemUI` data for smart vertical positioning (single QR centered between clock and widgets)

**Environment** - `src/lib/env.ts`
- `validateEnv()` validates required and runtime-only env vars at startup
- Required: `DATABASE_URL`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Runtime-only: `STRIPE_PRICE_DOWNLOAD`, `STRIPE_WEBHOOK_SECRET`

### Data Models

**Purchase** (Prisma)
- One record per Stripe checkout session (`stripeSessionId`)
- Tracks `amountPaid`, `email`, `downloaded`, `downloadedAt`, `status` (e.g. `completed`, `refunded`)
- One download per purchase; reuse of same session is blocked after first download

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

- `/api/create-checkout-session` - Creates Stripe Checkout session (rate limited by IP)
- `/api/verify-download` - Verifies payment and allows one-time download
- `/api/webhooks/stripe` - Stripe webhook (checkout.session.completed, charge.refunded)

### Static Data

- `src/data/devices.json` - Device specs (dimensions, safe areas, systemUI)
- `src/data/gradients.ts` - Gradient presets
- `src/data/templates.ts` - Pre-configured wallpaper templates
- `src/data/icons.ts` - Brand icon definitions

## Environment Variables

Required in `.env.local`:
- `DATABASE_URL` - PostgreSQL connection string
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_DOWNLOAD` - Stripe price ID for one-time download (runtime)
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret (runtime)
- `NEXT_PUBLIC_BASE_URL` - Site URL for SEO/webhooks (optional; has fallbacks)

See `ENV_SETUP.md` for full configuration.
