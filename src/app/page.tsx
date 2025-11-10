import { Navigation } from '@/components/LandingPage/Navigation'
import { Hero } from '@/components/LandingPage/Hero'
import { Footer } from '@/components/LandingPage/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Footer />
    </div>
  )
}

