import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/LandingPage/Navigation'
import { Hero } from '@/components/LandingPage/Hero'
import { Footer } from '@/components/LandingPage/Footer'

export default async function Home() {
  const { userId } = await auth()

  // Redirect signed-in users to dashboard
  if (userId) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Footer />
    </div>
  )
}

