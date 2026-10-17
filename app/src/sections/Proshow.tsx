import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { ArrowUpRight, Globe, Layers, Flame, Compass } from 'lucide-react'

const AGENT_CAPABILITIES = [
  {
    icon: Globe,
    title: 'Photorealistic 3D Globe',
    desc: 'CesiumJS digital twin with continuous satellite terrain, bathymetry, and elevation vectors.',
    cta: 'Launch Globe',
    link: '/agent',
    color: 'rgba(56, 189, 248, 0.8)',
  },
  {
    icon: Layers,
    title: 'NASA GIBS Reflectance',
    desc: 'Daily WMTS true-color satellite imagery streamed directly from NASA EOSDIS.',
    cta: 'View GIBS',
    link: '/dossiers',
    color: 'rgba(99, 102, 241, 0.8)',
  },
  {
    icon: Flame,
    title: 'NASA FIRMS Hotspots',
    desc: 'Thermal infrared 3.75 µm anomaly detection for real-time active fire identification.',
    cta: 'Scan FIRMS',
    link: '/games',
    color: 'rgba(14, 165, 233, 0.8)',
  },
  {
    icon: Compass,
    title: 'Spatial Orbit Control',
    desc: 'Conversational voice commands and spacebar flight controls over coordinate points.',
    cta: 'Open Flight',
    link: '/cockpit',
    color: 'rgba(168, 85, 247, 0.8)',
  },
]

export default function Proshow() {
  return (
    <motion.section
      id="immersive-showcase"
      className="relative overflow-hidden py-28 border-t border-white/[0.08] bg-transparent"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative mx-auto max-w-6xl px-6 text-center sm:px-10">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-orion/25 bg-orion-deep/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-orion-bright mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-orion animate-pulse" />
          <span>CesiumJS Planetary Twin Engine</span>
        </div>

        {/* Crisp optical heading */}
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white">
          IMMERSIVE 3D AGENT
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-white/65 font-normal">
          Autonomous orbital environment with calibrated NASA Earth terrain, real-time GIBS satellite reflectance, and thermal infrared anomaly layers.
        </p>

        {/* 4 True Glassmorphism Cards with Electric Conic Border and Integrated Action Buttons */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {AGENT_CAPABILITIES.map((cap) => (
            <motion.div
              key={cap.title}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="relative h-full flex flex-col"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '24px',
                  isolation: 'isolate',
                }}
              >
                {/* Electric Border Effect from user reference */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: '26px',
                    padding: '2px',
                    background: `conic-gradient(
                      from 0deg,
                      transparent 0deg,
                      ${cap.color} 60deg,
                      ${cap.color.replace('0.8', '0.4')} 120deg,
                      transparent 180deg,
                      ${cap.color.replace('0.8', '0.3')} 240deg,
                      transparent 360deg
                    )`,
                    zIndex: -1,
                  }}
                />

                {/* Main Glass Card Body */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    minHeight: '340px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.75rem',
                    borderRadius: '24px',
                    background: `
                      linear-gradient(145deg, 
                        rgba(255, 255, 255, 0.12), 
                        rgba(255, 255, 255, 0.03) 50%,
                        rgba(8, 14, 26, 0.5) 100%
                      )
                    `,
                    backdropFilter: 'blur(28px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: `
                      0 16px 40px rgba(0, 0, 0, 0.45),
                      0 2px 8px rgba(0, 0, 0, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.32),
                      inset 0 -1px 0 rgba(255, 255, 255, 0.08)
                    `,
                    overflow: 'hidden',
                  }}
                >
                  {/* Enhanced Top Glass Reflection Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '55%',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
                      pointerEvents: 'none',
                      borderRadius: '24px 24px 0 0',
                    }}
                  />

                  {/* Glass Shine Line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '12px',
                      right: '12px',
                      height: '1.5px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                      borderRadius: '1px',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Side Glass Reflection */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '2px',
                      height: '100%',
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                      borderRadius: '24px 0 0 24px',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Card Content Top */}
                  <div className="relative z-10">
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '46px',
                        width: '46px',
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3)',
                        color: '#7dd3fc',
                      }}
                    >
                      <cap.icon size={22} strokeWidth={1.7} />
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-white leading-snug">
                      {cap.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-white/70 font-normal">
                      {cap.desc}
                    </p>
                  </div>

                  {/* Card Action Button (applying button directly on cards like Explore Dossiers) */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/45">
                      TELEMETRY
                    </span>

                    <Link
                      to={cap.link}
                      className="liquid-glass-pill inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-normal text-white hover:scale-105 transition-all shadow-[0_4px_16px_rgba(56,189,248,0.2)]"
                    >
                      <span>{cap.cta}</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clean Primary Launch Actions */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/agent"
            className="liquid-glass-pill inline-flex min-h-[54px] items-center gap-3 rounded-full px-9 text-base font-normal text-white hover:scale-105 transition-all shadow-[0_12px_36px_rgba(56,189,248,0.25)]"
          >
            <Globe size={18} className="text-white/80" />
            <span>Launch 3D Digital Twin</span>
            <ArrowUpRight size={17} />
          </Link>

          <Link
            to="/cockpit"
            className="liquid-glass-pill inline-flex min-h-[54px] items-center gap-2 rounded-full px-8 text-base font-normal text-white/80 hover:text-white hover:scale-105 transition-all"
          >
            <span>Agent Telemetry Cockpit</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
