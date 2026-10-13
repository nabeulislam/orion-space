import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, Maximize2, Minimize2, ExternalLink, Orbit, Sparkles, MessageSquare } from 'lucide-react'

export default function AgentPage() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadStep, setLoadStep] = useState(0)

  const steps = [
    'CONNECTING TO NASA EOSDIS & MERRA-2 APIS...',
    'HYDRATING PHOTOREALISTIC CESIUM GLOBE & CLOUDS...',
    'CALIBRATING 3D SATELLITE ANOMALY SENSORS...',
    'INITIALIZING AUTONOMOUS AGENT ENGINE...',
  ]

  useEffect(() => {
    // Progressively step through telemetry sequence
    const interval = setInterval(() => {
      setLoadStep((prev) => {
        if (prev < steps.length - 1) return prev + 1
        return prev
      })
    }, 850)

    // Complete loading overlay after Cesium finishes initial WebGL compilation
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 3600)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [steps.length])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#060608]">
      {/* Top Floating Control Bar */}
      <header className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        {/* Back to Portal button */}
        <Link
          to="/"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#090b10]/90 px-4 py-2 text-xs sm:text-sm font-medium text-white backdrop-blur-2xl transition-all hover:bg-white/15 hover:border-[#38bdf8]/50 shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
        >
          <ArrowLeft size={16} />
          <span>Exit to Portal</span>
        </Link>

        {/* Center Status Badge */}
        <div className="hidden sm:inline-flex items-center gap-2.5 rounded-full border border-[#38bdf8]/35 bg-[#090b10]/90 px-4 py-1.5 backdrop-blur-xl shadow-lg pointer-events-auto">
          <Orbit size={15} className="text-[#38bdf8] animate-spin" style={{ animationDuration: '8s' }} />
          <span className="text-xs font-mono font-semibold text-white tracking-wide">
            ORION 3D CESIUM ENGINE
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono text-emerald-400">ACTIVE</span>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-mono text-emerald-400 backdrop-blur-xl">
            <MessageSquare size={13} />
            <span>PRESS [SPACE] FOR AI AGENT</span>
          </div>

          <a
            href={`${import.meta.env.BASE_URL}agent/index.html`}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Standalone Window"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#090b10]/90 text-white/80 backdrop-blur-2xl transition-all hover:text-white hover:border-[#38bdf8]/40"
          >
            <ExternalLink size={15} />
          </a>

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#090b10]/90 text-white/80 backdrop-blur-2xl transition-all hover:text-white hover:border-[#38bdf8]/40"
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </header>

      {/* Embedded 3D Cesium Project */}
      <iframe
        src={`${import.meta.env.BASE_URL}agent/index.html`}
        title="Orion Space 3D Cesium Digital Twin"
        className="w-full h-full border-0 select-none"
        allow="geolocation; microphone; camera; fullscreen; accelerometer; gyroscope"
      />

      {/* Cinematic Orbital Launch HUD Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#060608] px-6 transition-opacity duration-700 pointer-events-none">
          {/* Animated orbital reticle */}
          <div className="relative flex items-center justify-center">
            <div className="h-32 w-32 rounded-full border border-dashed border-[#38bdf8]/40 animate-spin" style={{ animationDuration: '12s' }} />
            <div className="absolute h-24 w-24 rounded-full border border-white/20 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
            <div className="absolute h-16 w-16 rounded-full border-2 border-t-[#38bdf8] border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '1.5s' }} />
            <Sparkles size={24} className="text-[#38bdf8] animate-pulse" />
          </div>

          {/* Telemetry Progress */}
          <div className="mt-8 text-center max-w-md w-full">
            <div className="font-mono text-xs tracking-widest text-[#38bdf8] uppercase">
              ORION SPACE · MISSION 2026
            </div>

            <h3 className="font-display mt-2 text-2xl tracking-wide text-white">
              LAUNCHING 3D IMMERSIVE DIGITAL TWIN
            </h3>

            <p className="mt-3 font-mono text-xs text-white/60 min-h-[20px]">
              {steps[loadStep]}
            </p>

            {/* Glowing progress bar */}
            <div className="mt-5 h-1 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 transition-all duration-700 ease-out"
                style={{ width: `${((loadStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
