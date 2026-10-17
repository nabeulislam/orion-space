import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import StackedCards from '@/components/ui/glass-cards'
import Proshow from '@/sections/Proshow'
import Contact from '@/sections/Contact'

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      <main className="relative bg-transparent">
        <Hero />

        {/* GSAP + ScrollTrigger Stacking Glass Cards with Electric Border Effect */}
        <StackedCards />

        {/* 3D Autonomous Agent Launch with Electric Glassmorphism Cards */}
        <Proshow />
      </main>
      <Contact />
    </div>
  )
}
