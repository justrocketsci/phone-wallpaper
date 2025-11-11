<!-- ad288631-c216-4ba8-855b-f19e0877250c 3cbb2f87-2ec7-4089-9247-62f8b0f0904c -->
# Shadcn UI Migration Plan

Migrate the application to use Shadcn UI components with Radix UI primitives while maintaining the exact current color scheme across all pages.

## Phase 1: Install & Configure Shadcn UI

### 1.1 Initialize Shadcn UI

Run the Shadcn CLI to set up the component system:

```bash
npx shadcn-ui@latest init
```

Configuration during init:

- Style: Default
- Base color: Slate (matches current scheme)
- CSS variables: Yes
- Tailwind config: Yes
- Components directory: `src/components/ui`
- Utils: Yes (creates `lib/utils.ts`)

### 1.2 Update CSS Variables

Edit `src/app/globals.css` to match current color scheme exactly:

Preserve existing:

- `--background: #ffffff` / `#0a0a0a`
- `--foreground: #171717` / `#ededed`

Add Shadcn variables mapped to current colors:

- `--primary`: slate-900 (HSL: 222.2 47.4% 11.2%)
- `--primary-foreground`: white
- `--secondary`: blue-600 for interactive elements
- `--accent`: blue-50/blue-900 for selected states
- `--destructive`: red-500 for delete actions
- `--muted`: slate-100/slate-800 for backgrounds
- `--border`: slate-200/slate-700
- `--input`: slate-300/slate-600
- `--ring`: blue-500 for focus rings

### 1.3 Install Required Components

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add card
```

### 1.4 Install Icon Library

```bash
npm install lucide-react
```

## Phase 2: Create Custom Component Variants

### 2.1 Customize Button Component

Edit `src/components/ui/button.tsx` to add custom variants matching current design:

**Variants needed:**

- `default`: bg-slate-900 dark:bg-white (primary CTA)
- `secondary`: bg-blue-600 hover:bg-blue-700
- `outline`: transparent with border
- `ghost`: text-only hover state
- `destructive`: text-red-500

**Sizes:**

- `sm`: px-4 py-2
- `md`: px-6 py-2.5
- `lg`: px-6 py-3
- `xl`: px-8 py-4

**Rounded:**

- `lg`: rounded-lg
- `xl`: rounded-xl

### 2.2 Customize Input Component

Edit `src/components/ui/input.tsx`:

- Border: `border-slate-300 dark:border-slate-600`
- Background: `bg-white dark:bg-slate-800`
- Focus ring: `focus:ring-blue-500`

### 2.3 Customize Select Component

Edit `src/components/ui/select.tsx`:

- Match input styling
- Dropdown background: `bg-white dark:bg-slate-800`

### 2.4 Customize Dialog Component

Edit `src/components/ui/dialog.tsx`:

- Overlay: `bg-black/50 backdrop-blur-sm`
- Content: `bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl`

### 2.5 Customize Card Component

Edit `src/components/ui/card.tsx`:

- Background: `bg-white dark:bg-slate-800`
- Border: `border-slate-200 dark:border-slate-700`

## Phase 3: Migrate Components

### 3.1 Replace All Buttons

**Files to update:**

- `src/components/LandingPage/Hero.tsx`
  - Line 34-39: "Start Creating" → `<Button variant="default" size="xl">`
  - Line 40-45: "Sign In" → `<Button variant="outline" size="xl">`

- `src/components/LandingPage/Navigation.tsx`
  - Line 52-56: "Get Started" → `<Button variant="default" size="md">`
  - Line 66-70: "Create" → `<Button variant="default" size="md">`

- `src/components/Dashboard/DashboardHeader.tsx`
  - Line 33-51: "Create New Design" → `<Button variant="secondary" size="lg">`
  - Line 76-84: "Upgrade to Premium" → `<Button variant="outline">`

- `src/components/WallpaperCreator.tsx`
  - Line 247-264: Back button → Icon button with `<Button variant="ghost" size="icon">`

- `src/components/UpgradeModal.tsx`
  - Line 167-172: "Subscribe Now" → `<Button variant="secondary" size="lg">`
  - Line 173-178: "Maybe Later" → `<Button variant="ghost">`

- `src/components/ActionMenu.tsx`
  - Line 61-75: Dropdown trigger → Keep custom for now, but use `<Button variant="outline">`

- `src/components/ExportBar.tsx`
  - Line 47-65: "Download PNG" → `<Button variant="secondary" size="lg">`

- `src/components/Sidebar/StepPhone.tsx`
  - Line 16-31: Device selection → `<Button variant="outline">` with conditional variant

- `src/components/Sidebar/StepQR.tsx`
  - Line 57-63: "Add QR Code" → `<Button variant="secondary">`
  - Line 80-85: "Remove" → `<Button variant="ghost" size="sm">`

### 3.2 Replace Modals

**UpgradeModal (`src/components/UpgradeModal.tsx`):**

Replace entire modal structure with Shadcn Dialog:

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
```

- Wrap content in `<DialogContent>`
- Use `<DialogTitle>` for heading
- Auto-handles overlay, close button, accessibility

### 3.3 Replace Dropdown Menus

**ActionMenu (`src/components/ActionMenu.tsx`):**

Replace custom dropdown with Shadcn DropdownMenu:

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
```

- Replace lines 59-144 with DropdownMenu components
- Remove custom open/close state management
- Remove useEffect for click outside (built-in)
- Preserve lock icons and "Pro" badges

### 3.4 Replace Form Inputs

**StepQR (`src/components/Sidebar/StepQR.tsx`):**

- Line 39-45: URL input → `<Input type="url">`
- Line 49-55: Label input → `<Input type="text">`
- Line 91-106: Icon select → `<Select>` component

**WallpaperCreator (`src/components/WallpaperCreator.tsx`):**

- Line 265-271: Design name input → `<Input>` with custom styling

### 3.5 Replace SVG Icons

Install lucide-react icons and replace inline SVGs:

**Common icons to replace:**

- Check mark → `<Check className="w-4 h-4" />`
- Plus → `<Plus className="w-5 h-5" />`
- Download → `<Download className="w-5 h-5" />`
- Arrow left → `<ArrowLeft className="w-6 h-6" />`
- Lock → `<Lock className="w-5 h-5" />`
- Chevron down → `<ChevronDown className="w-4 h-4" />`
- X (close) → `<X className="w-6 h-6" />`

**Files with most icon usage:**

- `src/components/UpgradeModal.tsx`: 5 icons
- `src/components/Dashboard/DashboardHeader.tsx`: 4 icons
- `src/components/WallpaperCreator.tsx`: 3 icons
- `src/components/ActionMenu.tsx`: 3 icons

### 3.6 Add Card Component Usage

**Dashboard/DesignGrid.tsx:**

Wrap design items in `<Card>` components instead of raw divs with className

**Sidebar/StepQR.tsx:**

- Line 36: Add QR form → `<Card>`
- Line 69-122: QR block display → `<Card>`

## Phase 4: Verify Color Preservation

### 4.1 Color Mapping Verification

Ensure these exact colors are maintained:

**Primary Actions:**

- Hero CTA, Navigation "Get Started/Create" → `bg-slate-900 dark:bg-white text-white dark:text-slate-900`

**Secondary Actions:**

- Dashboard "Create New Design", Export buttons → `bg-blue-600 hover:bg-blue-700`

**Interactive States:**

- Selected device, gradient → `border-blue-500 bg-blue-50 dark:bg-blue-900/20`

**Status Indicators:**

- Premium badge → `bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800`
- Upgrade prompts → `bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800`

**Neutral Elements:**

- Cards, modals → `bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700`
- Disabled states → `bg-slate-300 dark:bg-slate-700`

### 4.2 Test All Pages

Manually verify color scheme matches exactly on:

- Landing page (Hero, Navigation)
- Dashboard
- Create/wallpaper creator
- Subscribe page
- Modals (Upgrade modal)

## Summary

**New Dependencies:**

- `@radix-ui/*` (auto-installed via Shadcn)
- `class-variance-authority`
- `tailwind-merge`
- `lucide-react`

**Files Created:**

- `src/components/ui/button.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/card.tsx`
- `src/lib/utils.ts`

**Files Modified:**

- `src/app/globals.css` (add CSS variables)
- `tailwind.config.ts` (Shadcn additions)
- 15 component files (button/modal/input replacements)

**Benefits Achieved:**

- Accessible components with ARIA, keyboard nav, focus management
- Consistent component API across app
- Reduced code duplication (267 inline classNames → reusable variants)
- Same visual appearance and color scheme
- Icon system instead of inline SVGs

### To-dos

- [ ] Run Shadcn UI init and install required components (button, dialog, dropdown-menu, input, select, card)
- [ ] Update globals.css with Shadcn CSS variables mapped to current color scheme
- [ ] Customize Shadcn components (button variants, input styles, dialog, card) to match current design
- [ ] Install lucide-react and create icon mapping for common SVGs
- [ ] Replace all button elements across 9 files with Shadcn Button component
- [ ] Replace UpgradeModal with Shadcn Dialog component
- [ ] Replace ActionMenu custom dropdown with Shadcn DropdownMenu
- [ ] Replace form inputs and selects with Shadcn Input and Select components
- [ ] Replace inline SVGs with lucide-react icons across all components
- [ ] Test all pages to verify color scheme matches exactly