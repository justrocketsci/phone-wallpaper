<!-- 87e120b2-8ef8-4d7b-b5e4-6a4f9eb5b23f 8e8dd735-11b0-4bda-85db-acacd098177b -->
# Add Vercel Analytics to QR Canvas

## Overview

Integrate Vercel Web Analytics to track visitors and page views. This will work alongside the existing Google Analytics implementation.

## Implementation Steps

### 1. Install @vercel/analytics Package

Add the `@vercel/analytics` package to the project dependencies using npm:

```bash
npm i @vercel/analytics
```

### 2. Add Analytics Component to Root Layout

Update `src/app/layout.tsx` to import and include the `<Analytics />` component from `@vercel/analytics/next`.

Key changes:

- Import: `import { Analytics } from '@vercel/analytics/next';`
- Add `<Analytics />` component before the closing `</body>` tag, after `{children}` and `<CookieNotice />`

File to modify: `src/app/layout.tsx` (lines 1-137)

### 3. Enable Analytics in Vercel Dashboard

After deployment, enable Web Analytics:

- Go to your project in Vercel Dashboard
- Click the "Analytics" tab
- Click "Enable" to activate Web Analytics
- This will add new routes scoped at `/_vercel/insights/*`

### 4. Deploy and Verify

- Deploy the changes to Vercel
- Visit your site and check the browser's Network tab for a Fetch/XHR request to `/_vercel/insights/view`
- View analytics data in the Vercel Dashboard under the Analytics tab

## Notes

- Vercel Analytics will work alongside existing Google Analytics
- No environment variables needed for basic analytics
- Analytics component is lightweight and uses Next.js route tracking
- Data will appear in dashboard after users visit the site post-deployment

### To-dos

- [ ] Install @vercel/analytics package via npm
- [ ] Add Analytics component to src/app/layout.tsx
- [ ] Enable Web Analytics in Vercel Dashboard (manual step)
- [ ] Deploy to Vercel and verify analytics tracking is working