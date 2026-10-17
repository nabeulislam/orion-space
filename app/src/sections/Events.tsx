import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { Orbit, Radio, Layers, ArrowUpRight, Trophy, RotateCw, Satellite, Sparkles } from 'lucide-react'
import FlipCard from '@/components/ui/FlipCard'

const STEAM_MISSIONS = [
  {
    icon: Orbit,
    category: 'CLIMATE SERIES',
    title: 'The Late-Monsoon Mystery',
    desc: 'Annual average temperatures showed no trend across Bangladesh. Students analyze 25 years of NASA MERRA-2 monthly records to uncover the hidden +0.40 °C/decade late-monsoon warming along the coast.',
    metric: '+0.40 °C / decade in September',
    instrument: 'NASA GSFC GMAO MERRA-2',
    band: '2m Surface Air Temp (T2M)',
    coordinates: '22.5°N, 90.0°E (Barisal)',
    significance: 'Mann-Kendall p = 0.00007',
    hypothesis: 'Seasonal monthly disaggregation reveals hidden trends masked by annual averages.'
  },
  {
    icon: Radio,
    category: 'INFRARED SENSING',
    title: 'Thermal Hotspot Identification',
    desc: 'Smoke haze blinds visible optical cameras during burning seasons. Students switch between visible and NASA VIIRS 375m thermal infrared bands to identify active fires through cloud covers.',
    metric: '3.75 µm thermal infrared detection',
    instrument: 'VIIRS Suomi-NPP / JPSS',
    band: 'I-4 Channel (3.74 – 3.84 µm)',
    coordinates: '21.9°N, 89.2°E (Sundarbans)',
    significance: 'Sub-pixel fire radiance at 375m',
    hypothesis: 'Thermal infrared penetrates smoke scattering where visible wavelengths fail.'
  },
  {
    icon: Layers,
    category: 'CRYOSPHERE ALBEDO',
    title: 'Polar Ice Reflectance Feedback',
    desc: 'White sea ice reflects 85% of solar radiation. Students adjust polar ice cover on a responsive feedback model to calculate how melt rates increase ocean heat absorption.',
    metric: '85% solar radiation reflection',
    instrument: 'Sentinel-3 / CryoSat-2 Altimetry',
    band: 'Synthetic Aperture Radar (SAR)',
    coordinates: '78.2°N, 15.6°E (Arctic Svalbard)',
    significance: 'Albedo drop: 0.85 → 0.06 ocean',
    hypothesis: 'Ice-albedo positive feedback loop amplifies polar thermodynamic warming.'
  },
]

export default function Events() {
  return (
    <motion.section
      id="games-preview"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10 bg-transparent"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-orion/30 bg-orion-deep/10 px-3.5 py-1 text-xs font-mono text-orion-bright mb-3">
            <Sparkles size={13} />
            <span>STEAM EARTH MISSIONS · SATELLITE DISCOVERY</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl tracking-tight text-white">
            EARTH DETECTIVE MISSIONS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
            Interactive learning scenarios where students test hypotheses against 25 years of NASA MERRA-2 and VIIRS satellite observations. Hover or click cards to flip for sensor telemetry.
          </p>
        </div>

        <Link
          to="/games"
          className="liquid-glass-pill inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-normal text-white self-start md:self-auto hover:scale-105 transition-all shadow-[0_8px_25px_rgba(56,189,248,0.2)]"
        >
          <Trophy size={15} className="text-white/80" />
          <span>Launch Missions Lab</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* 3D Interactive FlipCards with Authentic Liquid Glass Material */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STEAM_MISSIONS.map((mission) => (
          <div key={mission.title} className="w-full h-[430px]">
            <FlipCard
              width="100%"
              height={430}
              radius={24}
              tilt={true}
              glare={true}
              glareOpacity={0.25}
              className="liquid-glass-flip w-full h-full"
              front={
                <div className="liquid-glass-card rounded-[24px] p-7 flex flex-col justify-between h-full text-left">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-orion-bright">
                        {mission.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-white/40">
                        <RotateCw size={12} className="animate-spin text-white/30" style={{ animationDuration: '6s' }} />
                        <span>Flip 3D</span>
                      </span>
                    </div>

                    <div className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-orion-bright shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                      <mission.icon size={22} strokeWidth={1.5} />
                    </div>

                    <h3 className="mt-5 text-xl font-medium tracking-tight text-white">
                      {mission.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white/70 font-normal">
                      {mission.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-3.5 py-2 font-mono text-[11px] text-orion-ice">
                      {mission.metric}
                    </div>
                    <span className="text-xs font-medium text-white/70 hover:text-white flex items-center gap-1">
                      <span>Telemetry</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              }
              back={
                <div className="liquid-glass-card rounded-[24px] p-7 flex flex-col justify-between h-full text-left">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <Satellite size={16} className="text-orion" />
                        <span className="font-mono text-xs font-semibold text-white tracking-wider">
                          ORBITAL SENSOR SPECS
                        </span>
                      </div>
                      <span className="rounded-full bg-signal-deep/20 border border-signal/30 px-2 py-0.5 text-[10px] font-mono text-signal-bright">
                        ACTIVE
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Instrument:</span>
                        <span className="text-white font-medium">{mission.instrument}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Spectral Band:</span>
                        <span className="text-orion-bright">{mission.band}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Target Coordinates:</span>
                        <span className="text-white/90">{mission.coordinates}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Statistical Validation:</span>
                        <span className="text-signal-bright">{mission.significance}</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[11px] text-white/75 font-sans leading-relaxed">
                      🔬 <strong className="text-white">Hypothesis:</strong> {mission.hypothesis}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <Link
                      to="/games"
                      onClick={(e) => e.stopPropagation()}
                      className="liquid-glass-pill inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium text-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                    >
                      <Trophy size={13} />
                      <span>Investigate In Lab</span>
                      <ArrowUpRight size={13} />
                    </Link>
                    <span className="text-[11px] font-mono text-white/40">
                      Click to flip ↺
                    </span>
                  </div>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </motion.section>
  )
}
