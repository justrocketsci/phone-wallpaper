# OpenGraph Image Instructions

## Required OG Image

You need to create an OpenGraph image for social media sharing:

**File:** `public/og-image.png`

**Specifications:**
- **Dimensions:** 1200 x 630 pixels
- **Format:** PNG or JPEG
- **File Size:** < 1MB (ideally < 300KB)

## Design Elements

Include the following in your OG image:

1. **QR Canvas Logo** - Your brand logo prominently displayed
2. **Headline** - "Create Beautiful QR Code Wallpapers"
3. **Subheadline** - "Turn your lock screen into a marketing tool"
4. **Visual Element** - Sample wallpaper preview or phone mockup
5. **Brand Colors** - Use your purple/pink gradient theme

## Design Tools

You can create this image using:
- **Figma** (recommended) - [figma.com](https://figma.com)
- **Canva** - [canva.com](https://canva.com)
- **Adobe Photoshop**
- **Online OG Image generators**

## Alternative: Dynamic OG Image

Alternatively, you can use Next.js OG Image Generation for dynamic images.

Create `src/app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'QR Canvas - Create Beautiful QR Code Wallpapers'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ec4899, #a855f7, #f97316)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
          }}
        >
          QR Canvas
        </div>
        <div
          style={{
            fontSize: 40,
            color: '#475569',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          Create Beautiful QR Code Wallpapers
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
```

## After Creating

Once you create `public/og-image.png`, the following will automatically work:
- Social media sharing previews (Twitter, Facebook, LinkedIn)
- Link unfurling in messaging apps
- Search engine rich snippets

## Testing

Test your OG image at:
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

## Placeholder

Until you create the actual image, you can use a placeholder or the dynamic generation approach above.

