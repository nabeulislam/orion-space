import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Events from '@/sections/Events'
import Proshow from '@/sections/Proshow'
import Contact from '@/sections/Contact'

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <Navbar />
      <main className="relative bg-transparent">
        <Hero />

        {/* Refined Apple-style Telemetry Typography Bar (No oscillating scroll jitter) */}
        <div className="border-y border-white/[0.08] bg-white/[0.02] backdrop-blur-xl py-5 px-6">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-sky-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-semibold tracking-wider">NASA SPACE APPS 2026 // GLOBAL CHALLENGE</span>
            </div>
            <div className="text-white/60 tracking-wider hidden md:block">
              25-YEAR SATELLITE REANALYSIS · NASA MERRA-2 · EOSDIS GIBS · VIIRS THERMAL SENSORS
            </div>
            <div className="text-emerald-300 font-semibold tracking-wider">
              BARISAL, BANGLADESH · STATISTICAL PROOF VERIFIED
            </div>
          </div>
        </div>

        <Events />
        <Proshow />
      </main>
      <Contact />
    </div>
  )
}
