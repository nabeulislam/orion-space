import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { Orbit, Radio, Layers, ArrowUpRight, Trophy } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

const STEAM_MISSIONS = [
  {
    icon: Orbit,
    category: 'CLIMATE SERIES',
    title: 'The Late-Monsoon Mystery',
    desc: 'Annual average temperatures showed no trend across Bangladesh. Students analyze 25 years of NASA MERRA-2 monthly records to uncover the hidden +0.40 °C/decade late-monsoon warming along the coast.',
    metric: '+0.40 °C / decade in September',
  },
  {
    icon: Radio,
    category: 'INFRARED SENSING',
    title: 'Thermal Hotspot Identification',
    desc: 'Smoke haze blinds visible optical cameras during burning seasons. Students switch between visible and NASA VIIRS 375m thermal infrared bands to identify active fires through cloud covers.',
    metric: '3.75 µm thermal infrared detection',
  },
  {
    icon: Layers,
    category: 'CRYOSPHERE ALBEDO',
    title: 'Polar Ice Reflectance Feedback',
    desc: 'White sea ice reflects 85% of solar radiation. Students adjust polar ice cover on a responsive feedback model to calculate how melt rates increase ocean heat absorption.',
    metric: '85% solar radiation reflection',
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
          <h2 className="font-display text-4xl sm:text-6xl tracking-tight text-white">
            EARTH DETECTIVE GAMES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
            Interactive learning scenarios where students test hypotheses against 25 years of NASA MERRA-2 and VIIRS satellite observations.
          </p>
        </div>

        <Link
          to="/games"
          className="liquid-glass-pill inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-normal text-white self-start md:self-auto"
        >
          <Trophy size={15} className="text-white/80" />
          <span>Launch Missions</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Pristine Liquid Glass Cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STEAM_MISSIONS.map((mission) => (
          <motion.div
            key={mission.title}
            whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
            className="h-full"
          >
            <Card className="liquid-glass-card group rounded-3xl p-3 flex flex-col justify-between h-full">
              <CardHeader className="p-6 pb-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70">
                    {mission.category}
                  </span>
                </div>

                <div className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-white/90">
                  <mission.icon size={20} strokeWidth={1.5} />
                </div>

                <CardTitle className="mt-5 text-xl font-medium tracking-tight text-white group-hover:text-white transition-colors">
                  {mission.title}
                </CardTitle>

                <CardDescription className="mt-2 text-sm leading-relaxed text-white/65 font-normal">
                  {mission.desc}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 py-3">
                <div className="rounded-xl border border-white/10 bg-black/45 px-3.5 py-2.5 font-mono text-xs text-white/80">
                  {mission.metric}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <Link
                  to="/games"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white transition-colors"
                >
                  <span>Open Scenario</span>
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <span className="text-[10px] font-mono text-white/40 tracking-wider">SIMULATION</span>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
