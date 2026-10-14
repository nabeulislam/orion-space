import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import Starfield from '@/sections/Starfield'
import CosmicWebGPUShader from './CosmicWebGPUShader'

export default function CosmicBackground() {
  const location = useLocation()
  const isAgentView = location.pathname === '/agent'
  const isHome = location.pathname === '/'
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (isAgentView) return

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 16,
        y: (e.clientY / innerHeight - 0.5) * 16,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isAgentView])

  if (isAgentView) return null

  // On Home, Earth is heroically placed at the center bottom fold; on content pages it sits cleanly as a subtle distant horizon rim
  const earthBaseY = isHome ? 50 : 86
  const earthScrollMultiplier = isHome ? 0.22 : 0.04
  const earthYOffset = earthBaseY + scrollY * earthScrollMultiplier

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050508]"
    >
      {/* Base deep cosmic void */}
      <div className="absolute inset-0 bg-[#050508]" />

      {/* WebGPU Shaders Engine (Aurora & Particle Field) */}
      <CosmicWebGPUShader />

      {/* Atmospheric space nebula glows - strictly Cyan, Electric Sky & Deep Indigo (Zero Orange) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_30%,rgba(37,99,235,0.18),rgba(10,15,25,0.4)_65%,transparent_85%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_65%_at_50%_100%,rgba(56,189,248,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_35%_at_50%_96%,rgba(14,165,233,0.06),transparent_60%)]" />

      {/* Fixed global Starfield across all scroll views and pages */}
      <Starfield density={230} />

      {/* Concentric faint orbital arcs */}
      <div
        className="absolute left-1/2 top-[54%] h-[145vw] w-[145vw] -translate-x-1/2 rounded-[100%] border border-white/[0.04] transition-transform duration-700 ease-out"
        style={{
          transform: `translate(-50%, ${scrollY * 0.05}px) rotate(${scrollY * 0.015}deg)`,
        }}
      />
      <div
        className="absolute left-1/2 top-[62%] h-[180vw] w-[180vw] -translate-x-1/2 rounded-[100%] border border-sky-400/[0.05] transition-transform duration-700 ease-out"
        style={{
          transform: `translate(-50%, ${scrollY * 0.03}px) rotate(${-scrollY * 0.01}deg)`,
        }}
      />

      {/* Living Earth Globe - dynamically tuned so cards stay 100% visible and unwashed */}
      <div
        className={`absolute bottom-0 left-1/2 w-[clamp(540px,72vw,1120px)] -translate-x-1/2 transition-all duration-700 ease-out ${
          isHome ? 'opacity-100' : 'opacity-70'
        }`}
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 0.25}px), ${earthYOffset}%)`,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}earth.png`}
          alt="Planet Earth observed from space"
          className="earth-glow w-full select-none"
          draggable={false}
        />
      </div>

      {/* Soft space vignette & content contrast scrim */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_45%,transparent_60%,rgba(5,5,8,0.75))]" />
      {!isHome && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/40 via-transparent to-[#050508]/80 pointer-events-none" />
      )}
    </div>
  )
}
