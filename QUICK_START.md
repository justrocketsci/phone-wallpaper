# Quick Start Guide

## Getting Started

The development server should already be running at **http://localhost:3000**

If not, start it with:
```bash
npm run dev
```

## How to Use the App

### Step 1: Select Your Phone
1. Click on the "1. Phone" tab in the sidebar
2. Choose your device from the list (e.g., iPhone 16 Pro Max, Pixel 8 Pro)
3. The preview will show your device's aspect ratio

### Step 2: Choose a Background
1. Click on the "2. Background" tab
2. Browse through 14 gradient options
3. Click on your favorite gradient to apply it

### Step 3: Add QR Codes
1. Click on the "3. QR Codes" tab
2. Enter a URL (e.g., https://youtube.com/@yourhandle)
3. Add a label (e.g., "<just rocket science>")
4. Click "Add QR Code"
5. Optionally add a second QR code (max 2)
6. Customize:
   - Icon type (YouTube, Instagram, Website, etc.)
   - QR code color

### Step 4: Customize Typography
1. Click on the "4. Typography" tab
2. Choose a preset (Modern & Clean, Bold Statement, etc.) OR
3. Customize manually:
   - Font family
   - Font size
   - Font weight
   - Letter spacing
   - Text transform
   - Underline

### Step 5: Export Your Wallpaper
1. Click "Download Wallpaper" to export as PNG
2. The file will download at your device's exact resolution
3. Set it as your lock screen wallpaper!

## Tips

- **Safe Areas**: The dashed border shows the safe area - keep your QR codes inside it
- **QR Colors**: Use dark colors (#000000) for light backgrounds, light colors (#ffffff) for dark backgrounds
- **Scanning**: The QR codes have high error correction and will scan well even with wear
- **Save Your Work**: Click "Save Config" to save your design as JSON for later editing
- **Load Designs**: Click "Load Config" to restore a previously saved design

## Example URLs

Try these for testing:
- YouTube: `https://youtube.com/@channel`
- Website: `https://example.com`
- Instagram: `https://instagram.com/username`
- LinkedIn: `https://linkedin.com/in/yourname`

## Templates

The app includes 3 pre-configured templates in `src/data/templates.ts`:
1. **YouTube + Website** - Perfect for content creators
2. **Social Duo** - Instagram + TikTok combo
3. **Professional** - LinkedIn + Portfolio

## Troubleshooting

**QR code not scanning?**
- Ensure sufficient contrast between QR color and background
- Try a darker QR color
- Increase QR size
- Use higher error correction (already set to H)

**Elements cut off?**
- Check the safe area overlay
- Move QR codes away from edges
- The safe area accounts for status bar, notch, and home indicator

**Font not loading?**
- Refresh the page
- All fonts are loaded from Google Fonts
- Check your internet connection

## Next Steps

1. Test your wallpaper on your actual device
2. Scan the QR codes with your camera to verify they work
3. Share your creation!

## Support

- Check the README.md for more technical details
- See IMPLEMENTATION.md for full feature list
- All code is documented with inline comments

---

**Enjoy creating your custom QR wallpapers!**

