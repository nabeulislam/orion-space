import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import GlassmorphismCardStack from '@/components/ui/GlassmorphismCardStack'
import ScrollExpand from '@/components/ui/ScrollExpand'
import Proshow from '@/sections/Proshow'
import Contact from '@/sections/Contact'
import ScrollVelocity from '@/components/ui/ScrollVelocity'

export default function Home() {
  const heroImage = `${import.meta.env.BASE_URL}satellite_hero.png`

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

        {/* React Bits ScrollExpand: Opens up as user scrolls to reveal satellite telemetry */}
        <div className="relative my-12">
          <ScrollExpand
            src={heroImage}
            alt="NASA satellite sensor fusion and telemetry sweep"
            title="Every pixel, verified"
            scrollHint="Scroll to expand view"
            useWindowScroll
            startWidth={48}
            startHeight={56}
            startRadius={28}
            endRadius={0}
            mediaZoom={1.35}
            scrollDistance={1.4}
            holdDistance={0.3}
            smoothing={0.12}
            overlayScrim={0.5}
            enabled
          >
            <p className="text-sm sm:text-base text-white/75 max-w-xl text-center leading-relaxed font-normal mt-2">
              The frame opens up smoothly as you scroll and hands the whole stage to 25 years of NASA satellite reanalysis and multispectral telemetry.
            </p>
          </ScrollExpand>
        </div>

        {/* Apple-grade Glassmorphism Card Stack with Stack and Carousel views */}
        <GlassmorphismCardStack />

        {/* 3D Autonomous Agent Launch with React Bits LatticeLoader */}
        <Proshow />
      </main>
      <Contact />
    </div>
  )
}
