import { Metadata } from 'next'
import WallpaperCreator from '@/components/WallpaperCreator'

export const metadata: Metadata = {
  title: 'Create Wallpaper',
  description: 'Design and create your custom QR code wallpaper. Choose from various backgrounds, add QR codes, and export for your device.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>
}) {
  const params = await searchParams

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <WallpaperCreator templateId={params.template} />
    </main>
  )
}
