import { useState } from 'react'
import Navbar from '@/sections/Navbar'
import EarthDetectiveAcademy from '@/sections/EarthDetectiveAcademy'
import Contact from '@/sections/Contact'
import PixelTransition from '@/components/ui/PixelTransition'
import PixelArcadeGame from '@/components/PixelArcadeGame'
import { Gamepad2, ArrowLeft, Trophy, Sparkles, Shield } from 'lucide-react'

export default function GamesPage() {
  const [is2dRetroMode, setIs2dRetroMode] = useState(false)

  return (
    <div className="min-h-screen bg-transparent text-white relative">
      <PixelTransition
        active={is2dRetroMode}
        onActiveChange={setIs2dRetroMode}
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
          /* Full Modern Scientific Earth Detective Academy Portal */
          <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            
            {/* Top Vibe Shift Callout Banner */}
            <div className="pt-24 px-6 max-w-7xl mx-auto w-full">
              <div className="liquid-glass-card rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border border-orion/30 shadow-[0_0_30px_rgba(56,189,248,0.12)]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl border border-orion/40 bg-orion-deep/15 flex items-center justify-center text-orion-bright shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                    <Gamepad2 size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-orion flex items-center gap-1.5 uppercase tracking-wider">
                      <span>Full Page Vibe Shift</span>
                      <Sparkles size={12} />
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-white">
                      Prefer retro 8-bit gaming? Transform the entire page into a 2D Retro Space Arcade!
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => setIs2dRetroMode(true)}
                  className="liquid-glass-pill rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center gap-2 border-orion/50"
                >
                  <Gamepad2 size={16} className="text-signal" />
                  <span>LAUNCH FULL 2D ARCADE</span>
                </button>
              </div>
            </div>

            <main className="py-6 bg-transparent">
              <EarthDetectiveAcademy onTriggerFullRetro={() => setIs2dRetroMode(true)} />
            </main>
            <Contact />
          </div>
        }
        secondContent={
          /* Full Page 2D Retro Space Arcade Experience */
          <div className="min-h-screen w-full bg-[#030712] text-white font-mono flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none">
            {/* Retro CRT Grid Scanline Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_75%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-70 z-20" />

            {/* Retro Arcade Full-Page Header */}
            <header className="relative z-30 flex flex-wrap items-center justify-between gap-4 border-b border-orion/30 pb-5 max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIs2dRetroMode(false)}
                  className="flex items-center gap-2 rounded-xl border border-orion/50 bg-orion-deep/20 px-5 py-2.5 text-xs font-bold text-orion-ice hover:bg-orion-deep/30 active:scale-95 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>RETURN TO SCIENTIFIC PORTAL</span>
                </button>

                <div>
                  <div className="text-[10px] text-orion tracking-widest uppercase flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-signal animate-ping" />
                    <span>SYSTEM ONLINE · 2D RETRO SIMULATOR</span>
                  </div>
                  <h1 className="text-lg sm:text-2xl font-black text-white tracking-wider">
                    ORION: EARTH DETECTIVE 2D
                  </h1>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-orion/30 bg-orion-deep/10 px-4 py-2 text-xs flex items-center gap-2">
                  <Shield size={14} className="text-orion-bright" />
                  <span className="text-white/70">8-BIT ORBIT ENGINE</span>
                </div>
                <div className="rounded-xl border border-signal/40 bg-signal-deep/15 px-4 py-2 text-xs font-bold text-signal-bright flex items-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                  <Trophy size={14} />
                  <span>NASA CHALLENGE 2026</span>
                </div>
              </div>
            </header>

            {/* Main Interactive 2D Game Area */}
            <main className="relative z-30 my-8 max-w-7xl mx-auto w-full flex-1 flex flex-col items-center justify-center">
              <PixelArcadeGame onExitToLab={() => setIs2dRetroMode(false)} />
            </main>

            {/* Retro Bottom Status Bar */}
            <footer className="relative z-30 border-t border-orion/20 pt-4 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between text-xs text-white/50">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orion" />
                <span>ORION-1 SATELLITE TELEMETRY LINK · BARISAL COAST DIVISION</span>
              </div>
              <div className="font-mono text-orion">
                DISCOVER HIDDEN +0.40 °C/DECADE WARMING VIA SENSORS
              </div>
            </footer>
          </div>
        }
      />
    </div>
  )
}
