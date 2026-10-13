import { Link } from 'react-router'
import { ArrowUpRight, Orbit, Compass, Activity, Globe, MessageSquare } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const FEATURES = [
  {
    icon: Globe,
    title: 'Photorealistic 3D Globe',
    desc: 'CesiumJS digital twin with continuous satellite terrain, bathymetry, and elevation.',
  },
  {
    icon: Compass,
    title: 'NASA GIBS Cloud Reflectance',
    desc: 'Daily WMTS satellite imagery streamed directly from NASA EOSDIS.',
  },
  {
    icon: Activity,
    title: 'NASA FIRMS Hotspots',
    desc: 'Thermal infrared 3.75 µm anomaly detection for real-time wildfire identification.',
  },
  {
    icon: MessageSquare,
    title: 'Voice & Keyboard Flight Control',
    desc: 'Conversational voice commands and spacebar flight controls over coordinate points.',
  },
]

export default function Proshow() {
  return (
    <section id="immersive-showcase" className="relative overflow-hidden py-32 border-t border-white/10 bg-transparent">
      <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">
        <h2 className="font-display text-4xl sm:text-7xl leading-tight tracking-wide text-white">
          IMMERSIVE 3D AGENT
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/60 font-normal">
          CesiumJS planetary environment with high-resolution 3D Earth terrain, daily NASA GIBS cloud reflectance, live FIRMS thermal anomaly layers, and automated flight paths.
        </p>

        {/* Clean Shadcn Cards Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-4 text-left">
          {FEATURES.map((feat) => (
            <Card
              key={feat.title}
              className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-2xl transition-all duration-300 hover:border-white/25 hover:bg-black/55 shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
            >
              <CardHeader className="p-0">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80">
                  <feat.icon size={18} />
                </div>
                <CardTitle className="mt-4 text-sm font-medium text-white tracking-wide">
                  {feat.title}
                </CardTitle>
                <CardDescription className="mt-1.5 text-xs leading-relaxed text-white/60 font-normal">
                  {feat.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Clean Action Cluster */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/agent"
            className="glass-pill inline-flex min-h-[54px] items-center gap-3 rounded-full px-9 text-base font-normal text-white transition-all hover:bg-white/20 hover:scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-white/20"
          >
            <Orbit size={18} className="text-white/80" />
            <span>Launch 3D Agent</span>
            <ArrowUpRight size={17} />
          </Link>

          <Link
            to="/cockpit"
            className="inline-flex min-h-[54px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 text-base font-normal text-white/70 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
          >
            <span>Agent Telemetry Cockpit</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
