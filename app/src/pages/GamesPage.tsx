import { useState } from 'react'
import Navbar from '@/sections/Navbar'
import EarthDetectiveAcademy from '@/sections/EarthDetectiveAcademy'
import Contact from '@/sections/Contact'
import PixelArcadeGame from '@/components/PixelArcadeGame'
import PixelTransition from '@/components/ui/PixelTransition'
import { Gamepad2, ArrowLeft, Sparkles, Orbit, Sun, Flame, ThermometerSnowflake, Award } from 'lucide-react'

export default function GamesPage() {
  const [is2dArcadeMode, setIs2dArcadeMode] = useState(false)

  return (
    <div className="min-h-screen bg-transparent text-white relative">
      {/* Dynamic Full Page Pixel Transition Wrapper */}
      <PixelTransition
        active={is2dArcadeMode}
        onActiveChange={setIs2dArcadeMode}
        trigger="manual"
        gridSize={16}
        pixelColor="#38bdf8"
        animationStepDuration={0.4}
        pattern="ripple"
        pixelAnimation="grow"
        aspectRatio=""
        style={{ width: '100%', minHeight: '100vh' }}
        className="w-full min-h-screen"
        firstContent={
          /* MODE 1: MODERN SCIENTIFIC SATELLITE LABORATORY (Liquid Glass) */
          <div className="w-full min-h-screen flex flex-col justify-between">
            <Navbar />

            <main className="pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
              {/* Floating Full-Page Vibe Shift Banner */}
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 liquid-glass-card rounded-2xl p-4 sm:p-5 border border-sky-400/30 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
                    <Orbit size={20} className="animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                      VIBE SHIFT ENGINE · REACT BITS PIXEL TRANSITION
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-white">
                      Transform entire page into 2D Retro Space & Climate Arcade
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIs2dArcadeMode(true)}
                  className="liquid-glass-pill inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                >
                  <Gamepad2 size={16} className="text-emerald-400 animate-pulse" />
                  <span>VIBE SHIFT TO 2D ARCADE</span>
                  <Sparkles size={14} className="text-sky-300" />
                </button>
              </div>

              {/* The Modern Earth Detective Academy */}
              <EarthDetectiveAcademy onLaunch2dMode={() => setIs2dArcadeMode(true)} />
            </main>

            <Contact />
          </div>
        }
        secondContent={
          /* MODE 2: FULL-PAGE 2D RETRO ARCADE WORLD */
          <div className="w-full min-h-screen bg-[#040810] text-white p-4 sm:p-8 font-mono relative overflow-x-hidden">
            {/* CRT Scanline Fullscreen Overlay */}
            <div
              className="pointer-events-none fixed inset-0 z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"
              aria-hidden="true"
            />

            {/* Retro 8-bit Top Navigation Bar */}
            <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-sky-400/30 pb-4 mb-8">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIs2dArcadeMode(false)}
                  className="flex items-center gap-2 rounded-xl border border-sky-400/50 bg-sky-500/15 px-4 py-2 text-xs font-bold text-sky-200 hover:bg-sky-500/30 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] active:scale-95"
                >
                  <ArrowLeft size={14} />
                  <span>◄ RETURN TO NASA LAB (MODERN GLASS)</span>
                </button>
                <div className="hidden md:block text-[11px] text-white/50">
                  ORION-SPACE // RETRO 2D SATELLITE ARCADE
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-300 font-bold tracking-widest text-[11px]">
                  2D PIXEL SIMULATOR ACTIVE
                </span>
              </div>
            </header>

            {/* Main Full-Page 2D Arcade Stage */}
            <div className="max-w-7xl mx-auto space-y-10">
              {/* Playable 2D Retro Satellite Pilot Arcade Game */}
              <PixelArcadeGame onExitToLab={() => setIs2dArcadeMode(false)} />

              {/* 2D Retro Climate Missions Dossiers Grid */}
              <div className="pt-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
                  <div>
                    <span className="text-sky-400 text-xs tracking-widest uppercase block">
                      ARCHIVE CASES // 8-BIT EDITION
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wider">
                      RETRO DETECTIVE DOSSIERS
                    </h3>
                  </div>
                  <div className="text-xs text-white/40">
                    NASA SPACE APPS 2026
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
                  {/* Retro Dossier 1 */}
                  <div className="rounded-2xl border border-sky-400/30 bg-[#070e1c] p-5 space-y-3 shadow-lg">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      <Sun size={18} />
                    </div>
                    <div className="text-[10px] text-sky-400 font-bold uppercase">CASE 01 · MERRA-2</div>
                    <h4 className="text-sm font-bold text-white">Monsoon Thermal Shift</h4>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      25-year late-monsoon September warming (+0.40 °C/dec) uncovered on the Barisal Coast.
                    </p>
                    <div className="text-[10px] text-emerald-300 font-mono pt-2 border-t border-white/10">
                      STATUS: VERIFIED (p = 0.00007)
                    </div>
                  </div>

                  {/* Retro Dossier 2 */}
                  <div className="rounded-2xl border border-rose-400/30 bg-[#070e1c] p-5 space-y-3 shadow-lg">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/30">
                      <Flame size={18} />
                    </div>
                    <div className="text-[10px] text-rose-400 font-bold uppercase">CASE 02 · VIIRS 375M</div>
                    <h4 className="text-sm font-bold text-white">Thermal Hotspot Hunt</h4>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      NASA FIRMS 3.75 µm thermal infrared sensors detecting active wildfires through smoke clouds.
                    </p>
                    <div className="text-[10px] text-emerald-300 font-mono pt-2 border-t border-white/10">
                      STATUS: SUB-PIXEL RADIANCE ACTIVE
                    </div>
                  </div>

                  {/* Retro Dossier 3 */}
                  <div className="rounded-2xl border border-sky-400/30 bg-[#070e1c] p-5 space-y-3 shadow-lg">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      <ThermometerSnowflake size={18} />
                    </div>
                    <div className="text-[10px] text-sky-400 font-bold uppercase">CASE 03 · CRYOSPHERE</div>
                    <h4 className="text-sm font-bold text-white">Albedo Shield Feedback</h4>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      Polar sea ice reflecting 85% of solar radiation before melt feedback accelerates heating.
                    </p>
                    <div className="text-[10px] text-sky-300 font-mono pt-2 border-t border-white/10">
                      STATUS: 0.85 REFLECTION MATRIX
                    </div>
                  </div>

                  {/* Retro Dossier 4 */}
                  <div className="rounded-2xl border border-emerald-400/30 bg-[#070e1c] p-5 space-y-3 shadow-lg">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      <Award size={18} />
                    </div>
                    <div className="text-[10px] text-emerald-400 font-bold uppercase">CASE 04 · CERTIFICATION</div>
                    <h4 className="text-sm font-bold text-white">Junior Detective Rank</h4>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      Official NASA Space Apps Challenge 2026 investigator certification granted upon quiz mastery.
                    </p>
                    <div className="text-[10px] text-emerald-300 font-mono pt-2 border-t border-white/10">
                      STATUS: OPEN FOR STUDENTS
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Retro Footer */}
              <div className="pt-8 pb-12 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-white/50">
                <div>TEAM ORION SPACE · NASA SPACE APPS 2026 // BARISAL, BANGLADESH</div>
                <button
                  onClick={() => setIs2dArcadeMode(false)}
                  className="text-sky-300 hover:text-white underline font-bold"
                >
                  Return to NASA Modern Lab View
                </button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  )
}
