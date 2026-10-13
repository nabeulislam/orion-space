import { Link } from 'react-router'
import { Sun, Flame, ThermometerSnowflake, ArrowUpRight, Trophy } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const STEAM_GAMES = [
  {
    icon: Sun,
    number: '01',
    category: 'CLIMATE PARADOX',
    title: 'The Late-Monsoon Mystery',
    desc: 'Farmers reported severe late-summer heat, but national annual averages showed no change. Analyze 25 years of NASA MERRA-2 monthly data to reveal the hidden +0.40 °C/decade warming.',
    finding: '+0.40 °C / decade in September',
  },
  {
    icon: Flame,
    number: '02',
    category: 'ORBITAL SENSORS',
    title: 'Thermal Hotspot Hunt',
    desc: 'Dense smoke haze blinds standard optical cameras. Switch to NASA VIIRS 375m and MODIS thermal infrared bands to detect active agricultural fires through cloud blankets.',
    finding: '3.75 µm thermal infrared detection',
  },
  {
    icon: ThermometerSnowflake,
    number: '03',
    category: 'CRYOSPHERE',
    title: 'Polar Ice Albedo Mirror',
    desc: 'White polar sea ice reflects 85% of incoming solar radiation. Simulate Earth albedo feedback and discover how melting ice accelerates ocean heat absorption.',
    finding: '85% solar radiation reflection',
  },
]

export default function Events() {
  return (
    <section id="games-preview" className="relative mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <p className="font-serif-it text-lg text-white/60">planetary intelligence for students</p>
          <h2 className="font-display mt-2 text-4xl sm:text-6xl tracking-wide text-white">
            EARTH DETECTIVE GAMES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
            Interactive STEAM learning missions teaching students and young researchers how to detect planetary climate patterns using NASA satellite observations.
          </p>
        </div>

        <Link
          to="/games"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-normal text-white backdrop-blur-md transition-all hover:bg-white/15 hover:border-white/40 self-start md:self-auto"
        >
          <Trophy size={15} className="text-white/80" />
          <span>Enter Academy</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Clean Shadcn Cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STEAM_GAMES.map((game) => (
          <Card
            key={game.title}
            className="group rounded-3xl border border-white/10 bg-white/[0.02] p-2 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04] shadow-[0_10px_35px_rgba(0,0,0,0.4)] flex flex-col justify-between"
          >
            <CardHeader className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white/40">{game.number}</span>
                <Badge variant="outline" className="border-white/15 bg-white/5 text-[10px] font-mono uppercase tracking-wider text-white/70">
                  {game.category}
                </Badge>
              </div>

              <div className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80">
                <game.icon size={20} />
              </div>

              <CardTitle className="mt-4 text-xl font-medium tracking-tight text-white group-hover:text-white transition-colors">
                {game.title}
              </CardTitle>

              <CardDescription className="mt-2 text-sm leading-relaxed text-white/60 font-normal">
                {game.desc}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 py-2">
              <div className="rounded-xl border border-white/[0.08] bg-black/30 px-3.5 py-2 font-mono text-xs text-white/75">
                {game.finding}
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <Link
                to="/games"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 group-hover:text-white transition-colors"
              >
                <span>Play Mini-Game</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <span className="text-[10px] font-mono text-white/40">INTERACTIVE</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
