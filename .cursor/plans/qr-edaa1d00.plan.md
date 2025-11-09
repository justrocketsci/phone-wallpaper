<!-- edaa1d00-722e-4819-ab09-202546f60922 659d1bed-e289-4115-9427-2e582cf41db4 -->
# QR Wallpaper Web App Plan

## Step 1 · Project Foundations

- Bootstrap Next.js app in `/Users/anuragbonth/Documents/programming/phone-wallpaper` with TypeScript, Tailwind, and linting/formatting.
- Lay out core directories (`src/app`, `src/components`, `src/lib`, `src/data`).
- Configure font loading and Tailwind design tokens sized for wallpaper design controls.

## Step 2 · Curated Data & Assets

- Compile `src/data/devices.json` containing key iOS/Android models, screen dimensions, safe-area padding, dynamic island/notch geometry.
- Author `src/data/gradients.ts`, `fonts.ts`, and `templates.ts` with starter presets.
- Provide `src/data/icons/` SVG set for popular brands and enable optional user icon upload with validation and placement helpers.

## Step 3 · Core UI & State Management

- Implement global state store (`src/lib/store.ts`) capturing device, background, QR blocks, typography.
- Build sidebar stepper components for device, background, QR configuration (cap 2 blocks), typography.
- Create responsive preview canvas `PreviewPhone.tsx` with device frame, safe-area overlays, drag/snap positioning.

## Step 4 · QR & Typography Rendering

- Implement QR generation helper (`src/lib/qr.ts`) producing SVG paths with color/error-correction support.
- Render text labels and brand icons with proper spacing, underline styles, and contrast checks; warn if readability/scannability at risk.
- Enforce quiet zones, max two QR blocks, and handle custom icon uploads (sanitize, scale, drop shadow/outline options).

## Step 5 · Export Pipeline

- Compose wallpaper as SVG via React; convert to PNG at device resolution (`src/lib/export.ts`) using Canvas/OffscreenCanvas.
- Provide download flow with resolution/DPR options and metadata (`.json`) export for reloading designs.
- Add final polish: gradient grain option, instructions overlay, shareable preset links, analytics opt-out.

### To-dos

- [ ] Bootstrap Next.js project structure with Tailwind, linting, initial directories
- [ ] Gather device specs, gradients, fonts, icons; populate data files
- [ ] Implement sidebar steps, preview canvas, global state
- [ ] Add QR generation, typography, brand icon handling, validations
- [ ] Implement SVG-to-PNG export, presets save/load