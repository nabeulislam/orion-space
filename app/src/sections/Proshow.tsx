import { Link } from 'react-router'
import { ArrowUpRight, Orbit, Compass, Activity, Eye } from 'lucide-react'
import SplitText from '@/components/ui/SplitText'
import DecryptedText from '@/components/ui/DecryptedText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ShinyText from '@/components/ui/ShinyText'

export default function Proshow() {
  return (
    <section id="immersive-showcase" className="relative overflow-hidden py-32 border-t border-white/10 bg-[#060608]">
      {/* Background space glow & orbital mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(37,99,235,0.22),transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.12),transparent_50%)] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 text-center">
        <ScrollReveal direction="up" distance={30}>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-mono text-sky-400 backdrop-blur-md">
            <Orbit size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
            <DecryptedText text="AUTONOMOUS PLANETARY DIGITAL TWIN" speed={30} />
          </div>

          <h2 className="font-display mt-4 text-5xl sm:text-7xl leading-tight tracking-wide text-white">
            <SplitText text="IMMERSIVE 3D AGENT" delay={0.1} />
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/65">
            Step directly into Project Orion Space’s CesiumJS digital twin. Experience high-resolution photorealistic 3D Earth rendering, streaming NASA GIBS satellite cloud reflectance, live FIRMS thermal infrared anomaly layers, and autonomous conversational flight cinematics.
          </p>
        </ScrollReveal>

        {/* High-Tech Telemetry Teaser Frame */}
        <ScrollReveal direction="up" distance={40} delay={0.2}>
          <div className="mt-12 rounded-3xl border border-white/15 bg-[#090b10]/80 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-left relative overflow-hidden group">
            {/* Corner cybernetic accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#38bdf8]/60 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#38bdf8]/60 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#38bdf8]/60 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#38bdf8]/60 rounded-br-xl" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-sm font-semibold tracking-wider text-white">
                  CESIUM ENGINE TELEMETRY · 100% OPERATIONAL
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-white/50">
                <span>STATION: BARISAL [22.5°N, 90.0°E]</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-sky-400">
                  <Compass size={18} />
                  <span className="text-xs font-mono font-bold">NASA GIBS CLOUDS</span>
                </div>
                <p className="mt-2 text-xs text-white/60">Live satellite truecolor cloud reflectance streaming</p>
                <div className="mt-3 text-[10px] font-mono text-emerald-400">● REAL-TIME WMTS</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Activity size={18} />
                  <span className="text-xs font-mono font-bold">NASA FIRMS HOTSPOTS</span>
                </div>
                <p className="mt-2 text-xs text-white/60">VIIRS 375m active thermal anomaly scans</p>
                <div className="mt-3 text-[10px] font-mono text-emerald-400">● 3.75 µm PASS</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Orbit size={18} />
                  <span className="text-xs font-mono font-bold">AI MAP AGENT</span>
                </div>
                <p className="mt-2 text-xs text-white/60">Autonomous conversational voice & flight harness</p>
                <div className="mt-3 text-[10px] font-mono text-emerald-400">● SPACEBAR TOGGLE</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-purple-400">
                  <Eye size={18} />
                  <span className="text-xs font-mono font-bold">SENSOR VIEWS</span>
                </div>
                <p className="mt-2 text-xs text-white/60">Normal, FLIR Thermal, Noir, NVG, CRT modes</p>
                <div className="mt-3 text-[10px] font-mono text-emerald-400">● 5 PRESETS</div>
              </div>
            </div>

            {/* Launch CTA Action Cluster */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <Link
                to="/agent"
                className="glass-pill inline-flex min-h-[54px] items-center gap-3 rounded-full px-8 text-base font-semibold text-white transition-all hover:scale-105 shadow-[0_0_35px_rgba(56,189,248,0.35)] border border-[#38bdf8]/50 bg-gradient-to-r from-blue-600/30 to-sky-500/30"
              >
                <Orbit size={18} className="animate-spin text-sky-400" style={{ animationDuration: '6s' }} />
                <ShinyText text="Launch Immersive Experience" speed={3} className="text-white font-semibold" />
                <ArrowUpRight size={18} />
              </Link>

              <Link
                to="/cockpit"
                className="inline-flex min-h-[54px] items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 text-sm sm:text-base font-medium text-white/80 backdrop-blur-md transition-all hover:bg-white/15 hover:text-white"
              >
                <span>Agent Telemetry Cockpit</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
