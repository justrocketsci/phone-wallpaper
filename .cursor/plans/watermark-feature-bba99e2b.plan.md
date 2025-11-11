<!-- bba99e2b-1462-484c-81e0-9ae75e40ff7b 58c8a8d6-f273-40c3-9337-adbb7c129e5a -->
# Add Watermark for Non-Subscribers in Step 3

## Implementation Strategy

Add a diagonal watermark overlay that appears in the preview once non-subscribers reach Step 3, preventing screenshot abuse while keeping the actual PNG exports clean for paying users.

## Key Requirements

- Watermark text: "MADE IN QRCANVAS.APP"
- Appears once user reaches Step 3 (persists even if they navigate back)
- Only visible for non-subscribers (`isSubscribed === false`)
- NOT included in PNG exports (export is subscriber-only anyway)
- Semi-transparent (30% opacity)
- Diagonal positioning across the phone preview

## Files to Modify

### 1. Update Sidebar to Track Step 3 Access

**File:** `src/components/Sidebar/Sidebar.tsx`

- Add state to track if user has reached Step 3: `hasReachedStep3`
- Set to `true` when `activeStep === 3`
- Pass this flag down via context or lift state up to parent

### 2. Lift Watermark State to WallpaperCreator

**File:** `src/components/WallpaperCreator.tsx`

- Add state: `showWatermark` (boolean)
- Receive `setShowWatermark` callback from Sidebar or manage here
- Pass both `isSubscribed` and `showWatermark` down to PreviewPhone

### 3. Pass Watermark Props Through PreviewPhone

**File:** `src/components/Preview/PreviewPhone.tsx`

- Accept `showWatermark` prop
- Pass it down to `WallpaperCanvas`

### 4. Add Watermark Overlay to WallpaperCanvas

**File:** `src/components/Preview/WallpaperCanvas.tsx`

- Add watermark overlay as final layer in the canvas
- Only render if `!isSubscribed && showWatermark`
- Style: diagonal text, centered, 30% opacity, large font
- Position above all other content but below system UI

## Implementation Details

### Watermark Styling

```tsx
{!isSubscribed && showWatermark && (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
    <div 
      className="text-white font-bold whitespace-nowrap select-none"
      style={{
        fontSize: '80px',
        opacity: 0.3,
        transform: 'rotate(-45deg)',
        letterSpacing: '4px',
      }}
    >
      MADE IN QRCANVAS.APP
    </div>
  </div>
)}
```

### State Flow

1. User navigates to Step 3 in Sidebar
2. Sidebar sets `hasReachedStep3 = true`
3. State lifted to WallpaperCreator via callback or context
4. WallpaperCreator passes `showWatermark={hasReachedStep3 && !isSubscribed}` to PreviewPhone
5. PreviewPhone passes to WallpaperCanvas
6. WallpaperCanvas renders watermark overlay

## Testing Checklist

- [ ] Watermark appears when non-subscriber reaches Step 3
- [ ] Watermark persists when navigating back to Steps 1 or 2
- [ ] Watermark does NOT appear for subscribers
- [ ] Watermark does NOT appear in PNG exports
- [ ] Watermark is diagonal and semi-transparent (30% opacity)
- [ ] Watermark doesn't interfere with design editing

### To-dos

- [x] Update Sidebar to track when user reaches Step 3
- [x] Add watermark state management in WallpaperCreator
- [x] Pass watermark props through PreviewPhone component
- [x] Add watermark overlay rendering in WallpaperCanvas
- [x] Test watermark visibility for subscribers vs non-subscribers