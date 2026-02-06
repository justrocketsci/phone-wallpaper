# QR Canvas - QR Code Wallpaper Creator

A Next.js web application for creating beautiful QR code wallpapers optimized for phone lock screens.

## ✨ Features

- 📱 Choose from popular iPhone and Android devices
- 🎨 Select from curated gradient backgrounds
- 🔗 Add up to 2 QR codes with custom URLs
- 🎯 Brand icons (built-in library + custom upload)
- ✍️ Wallpaper-optimized typography
- 📤 Export at exact device resolution (one-time payment per download)
- 💳 Stripe one-time payment for PNG download
- 🔍 SEO optimized with structured data

## 🛠 Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **QR Generation:** QRCode.js
- **Payments:** Stripe (one-time checkout)
- **Database:** PostgreSQL + Prisma
- **SEO:** Structured data (JSON-LD), OpenGraph, Twitter Cards

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Stripe account (for one-time download payments)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd phone-wallpaper
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Then fill in all required values. See [ENV_SETUP.md](ENV_SETUP.md) for detailed instructions.

**Required variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRICE_DOWNLOAD`, `STRIPE_WEBHOOK_SECRET` - Stripe (see [ENV_SETUP.md](ENV_SETUP.md))
- `NEXT_PUBLIC_BASE_URL` - Your site URL (optional; has fallbacks)
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── create/            # Wallpaper creator page
│   ├── download/           # Post-payment download page
│   ├── privacy/            # Privacy policy
│   ├── terms/              # Terms of service
│   ├── cookies/            # Cookie policy
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx           # Landing page
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # SEO sitemap
├── components/            # React components
│   ├── LandingPage/       # Landing page components
│   ├── Preview/           # Wallpaper preview
│   ├── Sidebar/           # Creator sidebar
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and helpers
│   ├── db.ts             # Database client
│   ├── env.ts             # Environment validation
│   ├── export.ts         # Export functionality
│   ├── qr.ts             # QR code generation
│   ├── rate-limit.ts     # Rate limiting (checkout)
│   └── stripe.ts         # Stripe integration
└── data/                  # Static data
    ├── devices.json       # Device specifications
    ├── gradients.ts       # Gradient presets
    ├── fonts.ts           # Font options
    └── templates.ts       # Wallpaper templates
```

## 🔍 SEO Configuration

This project is fully optimized for search engines. See [SEO_IMPLEMENTATION_PLAN.md](SEO_IMPLEMENTATION_PLAN.md) for complete details.

### What's Included

✅ **Dynamic robots.txt** - `src/app/robots.ts`  
✅ **Dynamic sitemap** - `src/app/sitemap.ts`  
✅ **Comprehensive metadata** - OpenGraph, Twitter Cards, keywords  
✅ **Structured data** - JSON-LD schema for SoftwareApplication  
✅ **Google Analytics 4** - Optional analytics tracking  
✅ **Legal pages** - Privacy Policy & Terms of Service  
✅ **FAQ section** - Targets long-tail keywords  

### SEO Setup Checklist

- [ ] Set `NEXT_PUBLIC_BASE_URL` in production
- [ ] Create OpenGraph image: `public/og-image.png` (1200x630px)
- [ ] Set up Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify ownership in search consoles

See detailed instructions in [SEO_IMPLEMENTATION_PLAN.md](SEO_IMPLEMENTATION_PLAN.md)

## 🎨 Creating the OpenGraph Image

You need to create a social sharing image at `public/og-image.png`:

- **Size:** 1200 x 630 pixels
- **Format:** PNG or JPEG
- **Content:** Logo, headline, sample wallpaper preview

See [public/og-image-instructions.md](public/og-image-instructions.md) for design guidelines.

## 💻 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format
```

## 🗄 Database

This project uses Prisma with PostgreSQL:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Create a migration
npx prisma migrate dev --name migration_name
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Important:** Update these in production:
- `NEXT_PUBLIC_BASE_URL` → your production domain
- Use Stripe **live** keys (not test keys)
- Update Stripe webhook endpoint to production URL

### Environment Variables for Production

See [ENV_SETUP.md](ENV_SETUP.md) for the complete list of environment variables needed in production.

## 📊 Analytics & Monitoring

After deployment:

1. **Google Analytics** - Track user behavior (optional)
2. **Google Search Console** - Monitor search performance
3. **Bing Webmaster Tools** - Bing search visibility
4. **Stripe Dashboard** - Monitor payments and webhooks

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier (if configured)

## 🔐 Security

- Never commit `.env.local` to version control
- Use environment variables for all secrets
- Keep dependencies updated
- Use Stripe webhooks for secure payment handling
- Implement rate limiting for API routes (recommended)

## 📚 Documentation

- [SEO Implementation Plan](SEO_IMPLEMENTATION_PLAN.md) - Complete SEO guide
- [Environment Setup](ENV_SETUP.md) - Environment variables guide
- [OpenGraph Image Guide](public/og-image-instructions.md) - Create social sharing image
- [Quick Start Guide](QUICK_START.md) - If available
- [Setup Guide](SETUP.md) - If available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:
- Open an issue on GitHub
- Check existing documentation
- Contact support@qrcanvas.app

## 🎯 Roadmap

- [ ] Blog for content marketing
- [ ] Additional device support
- [ ] Custom font uploads
- [ ] Advanced QR code customization
- [ ] Multi-language support
- [ ] A/B testing for wallpaper designs

---

**Built with ❤️ using Next.js 15**

