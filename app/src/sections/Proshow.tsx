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
    title: 'NASA GIBS Live Clouds',
    desc: 'Real-time WMTS satellite cloud reflectance streaming directly from NASA EOSDIS.',
  },
  {
    icon: Activity,
    title: 'NASA FIRMS Hotspots',
    desc: 'Thermal infrared 3.75 µm anomaly detection for real-time wildfire tracking.',
  },
  {
    icon: MessageSquare,
    title: 'Autonomous Map Agent',
    desc: 'Conversational voice and flight telemetry harness accessible via spacebar.',
  },
]

export default function Proshow() {
  return (
    <section id="immersive-showcase" className="relative overflow-hidden py-32 border-t border-white/10 bg-[#050508]">
      {/* Background radial space glow matching reference image */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(37,99,235,0.18),transparent_75%)] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-10">
        <p className="font-serif-it text-lg text-white/60">planetary digital twin</p>

        <h2 className="font-display mt-3 text-4xl sm:text-7xl leading-tight tracking-wide text-white">
          IMMERSIVE 3D AGENT
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/60 font-normal">
          Step into Project Orion Space’s CesiumJS digital twin. Experience high-resolution photorealistic 3D Earth rendering, streaming NASA GIBS satellite cloud reflectance, live FIRMS thermal infrared anomaly layers, and autonomous conversational flight cinematics.
        </p>

        {/* Clean Shadcn Cards Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-4 text-left">
          {FEATURES.map((feat) => (
            <Card
              key={feat.title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <CardHeader className="p-0">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80">
                  <feat.icon size={18} />
                </div>
                <CardTitle className="mt-4 text-sm font-medium text-white tracking-wide">
                  {feat.title}
                </CardTitle>
                <CardDescription className="mt-1.5 text-xs leading-relaxed text-white/55 font-normal">
                  {feat.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Clean Action Cluster matching reference styling */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/agent"
            className="glass-pill inline-flex min-h-[54px] items-center gap-3 rounded-full px-9 text-base font-normal text-white transition-all hover:bg-white/20 hover:scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-white/20"
          >
            <Orbit size={18} className="text-white/80" />
            <span>Launch Immersive Experience</span>
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
