import LatticeLoader from '@/components/ui/LatticeLoader'
import MaskedHeading from '@/components/ui/MaskedHeading'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { ArrowUpRight, Orbit, Layers, ScanLine, Radio } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const FEATURES = [
  {
    icon: Orbit,
    title: 'Photorealistic 3D Globe',
    desc: 'CesiumJS digital twin with continuous satellite terrain, bathymetry, and elevation.',
  },
  {
    icon: Layers,
    title: 'NASA GIBS Cloud Reflectance',
    desc: 'Daily WMTS satellite imagery streamed directly from NASA EOSDIS.',
  },
  {
    icon: ScanLine,
    title: 'NASA FIRMS Hotspots',
    desc: 'Thermal infrared 3.75 µm anomaly detection for real-time wildfire identification.',
  },
  {
    icon: Radio,
    title: 'Voice & Keyboard Flight Control',
    desc: 'Conversational voice commands and spacebar flight controls over coordinate points.',
  },
]

export default function Proshow() {
  return (
    <motion.section
      id="immersive-showcase"
      className="relative overflow-hidden py-32 border-t border-white/10 bg-transparent"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">
        <div className="w-full flex justify-center py-2">
          <MaskedHeading
            text="IMMERSIVE 3D AGENT"
            tag="h2"
            mediaType="image"
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop"
            fillScale={1.25}
            parallax={24}
            drift={14}
            weight={900}
            className="font-display text-4xl sm:text-7xl leading-tight tracking-wide text-white"
          />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/65 font-normal">
          CesiumJS planetary environment with high-resolution 3D Earth terrain, daily NASA GIBS cloud reflectance, live FIRMS thermal anomaly layers, and automated flight paths.
        </p>

        {/* Clean Liquid Glass Cards Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-4 text-left">
          {FEATURES.map((feat) => (
            <motion.div
              key={feat.title}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="h-full"
            >
              <Card className="liquid-glass-card rounded-2xl p-5 group flex flex-col justify-between h-full">
                <CardHeader className="p-0">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90">
                    <feat.icon size={18} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="mt-4 text-sm font-medium text-white tracking-wide">
                    {feat.title}
                  </CardTitle>
                  <CardDescription className="mt-1.5 text-xs leading-relaxed text-white/60 font-normal">
                    {feat.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

                {/* React Bits LatticeLoader 3D Agent Status */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-sky-400/30 bg-sky-500/10 px-5 py-2.5 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <LatticeLoader
              status="working"
              label="3D PLANETARY TWIN"
              pattern="orbit"
              grid={3}
              shape="round"
              color="#38bdf8"
              cellSize={6}
              gap={2}
              fontSize={12}
              glow={true}
              glowColor="rgba(56, 189, 248, 0.4)"
              showTimer={false}
            />
            <span className="text-[11px] font-mono text-emerald-300 border-l border-white/10 pl-3">
              CESIUM ENGINE READY
            </span>
          </div>
        </div>

        {/* Clean Action Cluster */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/agent"
            className="liquid-glass-pill inline-flex min-h-[54px] items-center gap-3 rounded-full px-9 text-base font-normal text-white"
          >
            <Orbit size={18} className="text-white/80" />
            <span>Launch 3D Agent</span>
            <ArrowUpRight size={17} />
          </Link>

          <Link
            to="/cockpit"
            className="inline-flex min-h-[54px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 text-base font-normal text-white/70 backdrop-blur-md transition-all hover:bg-white/15 hover:text-white"
          >
            <span>Agent Telemetry Cockpit</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

