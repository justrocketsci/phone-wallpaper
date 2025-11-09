# QR Wallpaper Creator

A Next.js web application for creating beautiful QR code wallpapers optimized for phone lock screens.

## Features

- Choose from popular iPhone and Android devices
- Select from curated gradient backgrounds
- Add up to 2 QR codes with custom URLs
- Brand icons (built-in library + custom upload)
- Wallpaper-optimized typography
- Export at exact device resolution

## Tech Stack

- Next.js 15 + TypeScript
- Tailwind CSS
- Zustand (state management)
- QRCode.js (QR generation)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
├── lib/             # Utilities and helpers
└── data/            # Device specs, gradients, fonts, icons
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

