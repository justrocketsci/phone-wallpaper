<!-- dc011425-41ea-45f3-871e-1117b9463ac4 7127bbda-7465-4f8e-bde3-7f1dac3b200d -->
# Dashboard and Improved UX Flow Implementation

## New User Flow

Sign Up → Dashboard (welcome + templates) → Create → Export (paywall triggered)

## Returning User Flow  

Sign In → Dashboard (saved designs grid) → Create/Edit → Export (paywall if no subscription)

## Implementation Steps

### 1. Database Schema Updates

**File: `prisma/schema.prisma`**

Add `Design` model to store wallpaper configurations:

```prisma
model Design {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name        String
  settings    Json     // Stores device, gradient, qrBlocks, typography
  thumbnail   String?  // Optional base64 thumbnail for grid view
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId])
}

model User {
  // ... existing fields ...
  designs     Design[]
}
```

Run migrations after schema update.

### 2. Create Dashboard Page

**File: `/src/app/dashboard/page.tsx`**

Server component that:

- Fetches user's designs from database
- Determines if user is new (no designs)
- Renders appropriate dashboard view
- Shows subscription status

### 3. Dashboard Components

**File: `/src/components/Dashboard/DashboardHeader.tsx`**

- Welcome banner for new users
- Subscription status indicator
- "Create New Design" CTA button

**File: `/src/components/Dashboard/DesignGrid.tsx`**

- Grid display of saved designs with thumbnails
- Edit/Delete actions per design
- Empty state for new users

**File: `/src/components/Dashboard/TemplatePicker.tsx`**

- Visual template gallery from `templates.ts`
- Click template → navigate to `/create?template={id}`
- Prominent display for new users

### 4. API Routes for Design Management

**File: `/src/app/api/designs/route.ts`**

- GET: List user's designs (sorted by updatedAt desc)
- POST: Create new design

**File: `/src/app/api/designs/[id]/route.ts`**

- GET: Fetch specific design
- PATCH: Update design
- DELETE: Delete design

### 5. Update Create Page

**File: `/src/app/create/page.tsx`**

Remove hard subscription check:

```typescript
// REMOVE:
if (!subscription?.isActive) {
  redirect('/subscribe')
}

// KEEP: Allow all authenticated users
// Pass subscription status and design ID to WallpaperCreator
```

Support query params:

- `?template={id}` - Load template
- `?design={id}` - Load saved design

### 6. Update WallpaperCreator Component

**File: `/src/components/WallpaperCreator.tsx`**

Add props for:

- `initialDesignId?: string` - For editing existing designs
- `templateId?: string` - For starting from template
- `isSubscribed: boolean` - Pass to ExportBar

Add auto-save functionality:

- Debounced save (every 10 seconds or on manual trigger)
- Save button in UI
- Toast notifications for save status

### 7. Update Export Logic

**File: `/src/components/ExportBar.tsx`**

Change from redirect to modal:

```typescript
// CURRENT: router.push('/subscribe')
// NEW: Open upgrade modal with clear value prop
if (!isActive) {
  setShowUpgradeModal(true)
  return
}
```

**File: `/src/components/UpgradeModal.tsx`** (new)

- Modal overlay explaining subscription benefits
- "Subscribe Now" button → `/subscribe`
- "Maybe Later" to close modal

### 8. Update Navigation & Routing

**File: `/src/components/LandingPage/Navigation.tsx`**

Update logo click behavior:

- When signed in: Link to `/dashboard`
- When signed out: Link to `/` (landing)

**File: `/src/middleware.ts`**

Keep public routes as-is (no changes needed for basic flow).

**Clerk Redirect Configuration:**

After successful sign-in/sign-up, redirect to `/dashboard`:

- Set in Clerk dashboard settings OR
- Use Clerk's `afterSignInUrl` and `afterSignUpUrl` environment variables

### 9. Update Store for Design Loading

**File: `/src/lib/store.ts`**

Add methods:

- `loadFromDesign(settings)` - Populate store from saved design
- `resetStore()` - Clear all state for new design
- `getSerializableState()` - Get current state for saving

### 10. Design Management Utilities

**File: `/src/lib/design.ts`** (new)

Helper functions:

- `saveDesign(name, settings)` - Save to DB via API
- `loadDesign(id)` - Fetch from DB via API  
- `deleteDesign(id)` - Delete from DB via API
- `generateThumbnail(canvas)` - Create base64 preview image
- `applyTemplate(templateId)` - Load template into store

### 11. Update Landing Page for Signed-In Users

**File: `/src/app/page.tsx`**

Add logic to redirect signed-in users:

```typescript
const { userId } = await auth()
if (userId) {
  redirect('/dashboard')
}
```

This ensures returning users go straight to dashboard, not landing page.

## Files to Create

1. `/src/app/dashboard/page.tsx`
2. `/src/components/Dashboard/DashboardHeader.tsx`
3. `/src/components/Dashboard/DesignGrid.tsx`
4. `/src/components/Dashboard/TemplatePicker.tsx`
5. `/src/app/api/designs/route.ts`
6. `/src/app/api/designs/[id]/route.ts`
7. `/src/components/UpgradeModal.tsx`
8. `/src/lib/design.ts`

## Files to Modify

1. `prisma/schema.prisma`
2. `/src/app/create/page.tsx`
3. `/src/components/WallpaperCreator.tsx`
4. `/src/components/ExportBar.tsx`
5. `/src/lib/store.ts`
6. `/src/components/LandingPage/Navigation.tsx`
7. `/src/app/page.tsx`

## Environment Variables to Add

```env
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Testing Checklist

- New user signs up → sees dashboard with welcome banner and templates
- Clicking template → redirects to `/create` with template loaded
- Design auto-saves while working
- Export without subscription → shows upgrade modal
- Export with subscription → downloads wallpaper
- Returning user signs in → sees dashboard with their designs
- Editing saved design → loads correctly in creator
- Deleting design → removes from dashboard
- Logo click when signed in → goes to dashboard

### To-dos

- [x] Update Prisma schema to add Design model and run migrations