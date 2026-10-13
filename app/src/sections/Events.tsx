import { Link } from 'react-router'
import { Sun, Flame, ThermometerSnowflake, ArrowUpRight, Trophy } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const STEAM_MISSIONS = [
  {
    icon: Sun,
    category: 'CLIMATE SERIES',
    title: 'The Late-Monsoon Mystery',
    desc: 'Annual average temperatures showed no trend across Bangladesh. Students analyze 25 years of NASA MERRA-2 monthly records to uncover the hidden +0.40 °C/decade late-monsoon warming along the coast.',
    metric: '+0.40 °C / decade in September',
  },
  {
    icon: Flame,
    category: 'INFRARED SENSING',
    title: 'Thermal Hotspot Identification',
    desc: 'Smoke haze blinds visible optical cameras during burning seasons. Students switch between visible and NASA VIIRS 375m thermal infrared bands to identify active fires through cloud covers.',
    metric: '3.75 µm thermal infrared detection',
  },
  {
    icon: ThermometerSnowflake,
    category: 'CRYOSPHERE ALBEDO',
    title: 'Polar Ice Reflectance Feedback',
    desc: 'White sea ice reflects 85% of solar radiation. Students adjust polar ice cover on a responsive feedback model to calculate how melt rates increase ocean heat absorption.',
    metric: '85% solar radiation reflection',
  },
]

export default function Events() {
  return (
    <section id="games-preview" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10 bg-transparent">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <h2 className="font-display text-4xl sm:text-6xl tracking-wide text-white">
            EARTH DETECTIVE GAMES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
            Interactive learning scenarios where students test hypotheses against 25 years of NASA MERRA-2 and VIIRS satellite observations.
          </p>
        </div>

        <Link
          to="/games"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-normal text-white backdrop-blur-md transition-all hover:bg-white/15 hover:border-white/40 self-start md:self-auto"
        >
          <Trophy size={15} className="text-white/80" />
          <span>Launch Missions</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Clean Shadcn Cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STEAM_MISSIONS.map((mission) => (
          <Card
            key={mission.title}
            className="group rounded-3xl border border-white/10 bg-white/[0.02] p-2 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04] shadow-[0_10px_35px_rgba(0,0,0,0.4)] flex flex-col justify-between"
          >
            <CardHeader className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-white/15 bg-white/5 text-[11px] font-mono tracking-wider text-white/70">
                  {mission.category}
                </Badge>
              </div>

              <div className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80">
                <mission.icon size={20} />
              </div>

              <CardTitle className="mt-4 text-xl font-medium tracking-tight text-white group-hover:text-white transition-colors">
                {mission.title}
              </CardTitle>

              <CardDescription className="mt-2 text-sm leading-relaxed text-white/60 font-normal">
                {mission.desc}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 py-2">
              <div className="rounded-xl border border-white/[0.08] bg-black/30 px-3.5 py-2 font-mono text-xs text-white/75">
                {mission.metric}
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <Link
                to="/games"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 group-hover:text-white transition-colors"
              >
                <span>Open Scenario</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <span className="text-[10px] font-mono text-white/40">SIMULATION</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
