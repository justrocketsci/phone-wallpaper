<!-- 5f8bd25f-1ba6-4c72-8c8d-81728e8d8bfe 87725998-6811-4343-bc86-a80b1aad469e -->
# Center Single QR Code Between Lock Screen Elements

## Changes Required

### 1. Update `WallpaperCanvas.tsx` - QR Positioning Logic

**File**: `src/components/Preview/WallpaperCanvas.tsx`

**Current behavior** (lines 127-129):

- Single QR code positioned at 50% (screen center)
- Multiple QR codes use their configured y positions

**New behavior**:

- Single QR code centered between time display bottom and bottom widgets top
- Calculate dynamic position based on device's `systemUI` data
- Fallback to 50% for devices without `systemUI` data (Android)
- Multiple QR codes remain unchanged

**Implementation**:

Replace the simple 50% calculation with:

```typescript
// Calculate optimal vertical position for single QR code
let yPercent: number
if (qrBlocks.length === 1) {
  if (device?.systemUI?.lockScreenClock && device?.systemUI?.bottomWidgets) {
    // Estimate bottom of time display (time starts at timeTopPercent, add ~5.5% for digit height)
    const timeBottom = device.systemUI.lockScreenClock.timeTopPercent + 5.5
    const widgetsTop = device.systemUI.bottomWidgets.topPercent
    // Center between time and widgets
    yPercent = (timeBottom + widgetsTop) / 2
  } else {
    // Fallback for devices without systemUI data
    yPercent = 50
  }
} else {
  yPercent = block.y
}
const yPos = (height * yPercent) / 100
```

### 2. Testing Verification

After implementation, verify:

- Single QR code appears centered between time and bottom widgets on iPhone 16 Pro Max
- Position scales correctly for all iPhone models with `systemUI` data
- Android devices (Pixel, Samsung) maintain 50% centering (no `systemUI` data)
- Two QR codes maintain their current positioning