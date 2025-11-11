<!-- 0d780596-c4a7-47ae-9d04-07d9fd121c06 16c8d76d-e4df-46c1-915e-793ae2874995 -->
# iPhone 16 Pro Lock Screen Elements Implementation

## Overview

Implement complete iPhone 16 Pro lock screen overlay for the Phone Showcase on the landing page, including status bar, dynamic date/time display, and bottom widgets with iOS 18-style frosted glass design.

## Components to Create/Modify

### 1. Create LockScreenOverlay Component

**File:** `src/components/LandingPage/LockScreenOverlay.tsx`

Create a new component that renders all lock screen UI elements:

- Status bar (top, ~3% from top)
- Date text (centered, ~12% from top)
- Large time display (centered, ~18% from top)
- Bottom widgets (flashlight left, camera right, ~92% from top)

**Key Features:**

- Dynamic time using `useState` and `useEffect` with 1-second interval
- Format time as "h:mm" (e.g., "9:41")
- Format date as "EEEE, MMMM d" (e.g., "Tuesday, April 1")
- Percentage-based positioning to match device specs from `devices.json`
- White text with subtle shadows for readability over any wallpaper
- SF Pro font family to match iOS

### 2. Status Bar Component

Within `LockScreenOverlay.tsx`, create status bar section:

**Left side:** Time (dynamic, e.g., "9:41")

**Right side:**

- Cellular signal icon (5 bars)
- WiFi icon
- Battery indicator (with percentage, e.g., "99%")

Icons will be SVG-based, matching iOS design language.

### 3. Bottom Widgets

Circular frosted glass buttons matching iOS 18 design:

**Left widget:** Flashlight icon

- Circular button (~55-60px diameter at showcase scale)
- Backdrop blur with `backdrop-blur-xl`
- Semi-transparent white background `rgba(255, 255, 255, 0.15)`
- Flashlight icon (SVG)

**Right widget:** Camera icon

- Same styling as flashlight
- Camera icon (SVG)

Position at ~20% from left/right edges, ~92% from top.

### 4. Date & Time Display

**Date:**

- Font: SF Pro Text Regular
- Size: ~17-19px (scaled)
- Color: White with subtle shadow
- Position: centered horizontally, ~12% from top

**Time:**

- Font: SF Pro Display Bold/Semibold
- Size: ~84-88px (scaled)
- Color: White with text shadow
- Position: centered horizontally, ~18% from top
- Format: "9:41" style (no leading zero for hours < 10)

### 5. Update PhoneShowcase Component

**File:** `src/components/LandingPage/PhoneShowcase.tsx`

Add the `LockScreenOverlay` component inside the phone frame:

- Position it in the same container as the wallpaper content
- Ensure proper z-index layering (above wallpaper, below phone frame)
- Position absolute with matching screen area dimensions:
  - top: 1.4%
  - left: 2.1%
  - width: 95.8%
  - height: 97.2%
  - borderRadius: 52px

### 6. Styling Considerations

- Use inline styles for precise positioning based on percentages
- Text shadows for readability: `textShadow: '0 1px 3px rgba(0,0,0,0.3)'`
- Ensure all elements are `pointer-events-none` to avoid blocking interactions
- Scale all elements proportionally with the phone frame size
- Use CSS backdrop-filter for frosted glass effect on widgets

## Implementation Details

### Dynamic Time Hook

```typescript
const [currentTime, setCurrentTime] = useState(new Date())

useEffect(() => {
  const timer = setInterval(() => setCurrentTime(new Date()), 1000)
  return () => clearInterval(timer)
}, [])

const timeString = currentTime.toLocaleTimeString('en-US', { 
  hour: 'numeric', 
  minute: '2-digit',
  hour12: true 
}).replace(/^0/, '').toUpperCase().replace(' ', '')

const dateString = currentTime.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long', 
  day: 'numeric'
})
```

### Icon Assets

Create SVG icons for:

- Cellular signal (5 bars, increasing height)
- WiFi (standard WiFi symbol)
- Battery (rounded rectangle with fill level and lightning if charging)
- Flashlight (iOS-style flashlight icon)
- Camera (iOS-style camera icon)

All icons should be white with appropriate stroke widths.

## Files to Modify/Create

**New Files:**

- `src/components/LandingPage/LockScreenOverlay.tsx`

**Modified Files:**

- `src/components/LandingPage/PhoneShowcase.tsx` (import and render LockScreenOverlay)

## Testing Checklist

- Verify time updates every second
- Check positioning at different viewport sizes (mobile, tablet, desktop)
- Ensure readability over all showcase wallpaper gradients
- Confirm proper layering (wallpaper → lock screen UI → phone frame)
- Validate that showcase carousel transitions don't break the overlay
- Check that lock screen elements don't interfere with QR codes

### To-dos

- [x] Create LockScreenOverlay component with status bar, date/time, and bottom widgets
- [x] Integrate LockScreenOverlay into PhoneShowcase component with proper positioning
- [x] Test lock screen elements across different viewport sizes and wallpaper transitions