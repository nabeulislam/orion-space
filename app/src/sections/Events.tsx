import { Link } from 'react-router'
import { Sun, Flame, ThermometerSnowflake, ArrowUpRight, Trophy, Sparkles } from 'lucide-react'
import SplitText from '@/components/ui/SplitText'
import DecryptedText from '@/components/ui/DecryptedText'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ScrollReveal from '@/components/ui/ScrollReveal'

const STEAM_GAMES = [
  {
    icon: Sun,
    title: 'The Late-Monsoon Mystery',
    desc: 'Farmers reported extreme late-summer heat, but national annual averages hid the trend. Analyze 25 years of NASA MERRA-2 monthly observations to reveal the hidden +0.40 °C/decade warming.',
    tag: 'CASE 01 · CLIMATE PARADOX',
    stat: '+0.40 °C / DECADE',
    color: '#f07832',
    spotlight: 'rgba(240, 120, 50, 0.18)',
  },
  {
    icon: Flame,
    title: 'Thermal Hotspot Hunt',
    desc: 'Thick smoke haze blinds optical satellites. Switch into NASA VIIRS 375m and MODIS FIRMS thermal infrared sensors to detect active crop-burning fires through cloud covers.',
    tag: 'CASE 02 · ORBITAL SENSORS',
    stat: '3.75 µm THERMAL BAND',
    color: '#ff6b35',
    spotlight: 'rgba(255, 107, 53, 0.18)',
  },
  {
    icon: ThermometerSnowflake,
    title: 'Polar Ice Albedo Mirror',
    desc: 'White polar sea ice reflects 85% of solar radiation. Simulate melting feedbacks and see how darker open oceans absorb heat and accelerate global warming.',
    tag: 'CASE 03 · CRYOSPHERE SIM',
    stat: '85% ALBEDO REFLECTION',
    color: '#38bdf8',
    spotlight: 'rgba(56, 189, 248, 0.18)',
  },
]

export default function Events() {
  return (
    <section id="games-preview" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 overflow-hidden">
      {/* Background soft glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.06),transparent_70%)]" />

      <ScrollReveal direction="up" distance={30}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#38bdf8] uppercase">
              <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
              <DecryptedText text="NASA STEAM ACADEMY · KID DETECTIVE LABS" speed={35} />
            </div>

            <h2 className="font-display mt-3 text-4xl sm:text-6xl tracking-wide text-white leading-tight">
              <SplitText text="EARTH DETECTIVE GAMES" delay={0.1} />
            </h2>

            <p className="mt-3 text-sm sm:text-base text-white/65 max-w-2xl leading-relaxed">
              Designed for kids, students, and curious space explorers. Uncover genuine planetary trends using authentic NASA satellite data feeds and earn your NASA Space Apps Detective Certification.
            </p>
          </div>

          <Link
            to="/games"
            className="inline-flex items-center gap-2 self-start md:self-auto rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/15 hover:border-[#38bdf8]/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            <Trophy size={16} className="text-amber-400" />
            <span>Academy & Badges</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </ScrollReveal>

      {/* Interactive Mini-Games Grid with Spotlight & Motion */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STEAM_GAMES.map((game, idx) => (
          <ScrollReveal key={game.title} delay={idx * 0.15} direction="up" distance={40}>
            <SpotlightCard
              spotlightColor={game.spotlight}
              className="group h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10"
                    style={{ backgroundColor: `${game.color}15`, color: game.color }}
                  >
                    <game.icon size={22} />
                  </span>

                  <span className="font-mono text-[10px] tracking-wider rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
                    <DecryptedText text={game.tag} speed={40} />
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-white group-hover:text-[#38bdf8] transition-colors">
                  {game.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {game.desc}
                </p>

                <div className="mt-5 inline-block rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-xs font-semibold" style={{ color: game.color }}>
                  {game.stat}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <Link
                  to="/games"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 group-hover:text-white transition-colors"
                >
                  <span>Play Interactive Mission</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <span className="text-[11px] font-mono text-emerald-400">UNLOCKED</span>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
