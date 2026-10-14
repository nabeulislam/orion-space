import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Events from '@/sections/Events'
import Proshow from '@/sections/Proshow'
import Contact from '@/sections/Contact'
import ScrollVelocity from '@/components/ui/ScrollVelocity'

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      <main className="relative bg-transparent">
        <Hero />

        {/* React Bits Scrolly Kinetic Typography driven by Lenis */}
        <ScrollVelocity
          texts={[
            'ORION SPACE · BE AN EARTH SYSTEM TREND DETECTIVE · NASA SPACE APPS 2026 ·',
            '25-YEAR SATELLITE REANALYSIS · NASA MERRA-2 · EOSDIS GIBS · VIIRS THERMAL SENSORS ·',
          ]}
          velocity={2.5}
          className="border-y border-white/[0.06] bg-white/[0.02] backdrop-blur-md py-6"
          parallaxClassName="text-2xl sm:text-4xl font-display font-light uppercase tracking-[0.22em] text-white/20"
        />

        <Events />
        <Proshow />
      </main>
      <Contact />
    </div>
  )
}
