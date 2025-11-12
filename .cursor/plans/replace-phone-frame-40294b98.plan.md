<!-- 40294b98-3568-47cc-b477-66d896d4dc96 70a4efdd-e65a-4f55-9169-e57876bc68c7 -->
# Replace Phone Frame in Landing Page

## Change Required

Update the phone frame image source in [`src/components/LandingPage/PhoneShowcase.tsx`](src/components/LandingPage/PhoneShowcase.tsx):

**Line 181:** Change the Image component's `src` prop from `/iphone-frame.png` to `/iphone-frame2.png`

```typescript
// Current (line 180-186)
<Image
  src="/iphone-frame.png"
  alt="iPhone Frame"
  fill
  className="object-contain relative z-10 pointer-events-none"
  priority
/>

// Will become
<Image
  src="/iphone-frame2.png"
  alt="iPhone Frame"
  fill
  className="object-contain relative z-10 pointer-events-none"
  priority
/>
```

This is the only change needed. The gradient backgrounds (line 92-96) and QR code cycling logic (line 99-176) are independent of the frame image and will continue working as before.