# iPhone System UI Overlay Implementation

## Overview
Successfully implemented toggleable iPhone lock-screen system UI overlays to help designers identify keep-out zones when creating wallpapers.

## What Was Implemented

### 1. Extended Device Data Model
**Files Modified:**
- `src/lib/store.ts` - Added `systemUI` interface to Device type
- `src/data/devices.json` - Added system UI metrics to all 8 iPhone models

**System UI Metrics Added:**
- Status bar height and positioning
- Lock screen clock widget (date/time) positioning and size
- Bottom widgets (flashlight/camera) positioning and icon sizes
- Metrics are device-specific and account for Dynamic Island vs notch variations

### 2. State Management
**Files Modified:**
- `src/lib/store.ts`

**Changes:**
- Added `showSystemUI` boolean state (defaults to `true`)
- Added `setShowSystemUI` action to toggle overlay visibility

### 3. iPhone System UI Component
**Files Created:**
- `src/components/Preview/IPhoneSystemUI.tsx`

**Features:**
- Renders realistic iOS lock screen elements:
  - Status bar with "Verizon" carrier, signal bars, WiFi, and battery icons
  - Date display: "Sunday, March 14"
  - Time display: "10:10"
  - Flashlight and camera icons with glassmorphism effect
  - Home indicator bar
- Responsive sizing based on device dimensions
- Handles both Dynamic Island and notch layouts
- Uses semi-transparent overlays with backdrop blur for authentic iOS appearance

### 4. Integration
**Files Modified:**
- `src/components/Preview/WallpaperCanvas.tsx` - Renders overlay conditionally
- `src/components/Preview/PreviewPhone.tsx` - Adds toggle control

**Behavior:**
- Overlay only appears for Apple devices with systemUI data
- Toggle switch appears below phone preview for iPhone models
- User can show/hide overlay as needed
- Overlay is layered above wallpaper content but remains non-interactive (pointer-events: none)

## Supported Devices
All iPhone models now have system UI overlays:
- iPhone 16 Pro Max
- iPhone 16 Pro
- iPhone 15 Pro Max
- iPhone 15 Pro
- iPhone 15
- iPhone 14 Pro Max
- iPhone 14 Pro
- iPhone 13 Pro Max

## User Experience
1. Select any iPhone from the device list
2. The lock screen UI overlay appears by default
3. Use the "Show Lock Screen UI" toggle to show/hide the overlay
4. Overlay helps identify safe zones for placing QR codes and content
5. Export functionality remains unaffected (overlay is preview-only)

## Technical Details
- **Conditional Rendering:** Overlay only appears for `device.brand === 'Apple' && device.systemUI`
- **Responsive Scaling:** All UI elements scale proportionally with device dimensions
- **No Export Impact:** Overlay is preview-only and doesn't affect exported wallpapers
- **Accessibility:** Toggle includes proper ARIA attributes and semantic HTML

## Future Enhancements (Optional)
- Add system UI overlays for Android devices
- Make carrier name, date, and time customizable
- Add battery percentage display option
- Support for different iOS versions/styles

