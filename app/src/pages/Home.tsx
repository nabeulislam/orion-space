import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Events from '@/sections/Events'
import Proshow from '@/sections/Proshow'
import Contact from '@/sections/Contact'
import useLenis from '@/hooks/useLenis'

export default function Home() {
  // Initialize Lenis smooth scroll
  useLenis()

  return (
    <div className="min-h-screen bg-[#060608] text-white selection:bg-[#38bdf8]/30 selection:text-white">
      <Navbar />
      <main className="relative">
        <Hero />
        <Events />
        <Proshow />
      </main>
      <Contact />
    </div>
  )
}
