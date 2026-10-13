import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import Starfield from '@/sections/Starfield'

export default function CosmicBackground() {
  const location = useLocation()
  const isAgentView = location.pathname === '/agent'
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (isAgentView) return

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
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

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050508]"
    >
      {/* Base deep cosmic space */}
      <div className="absolute inset-0 bg-[#050508]" />

      {/* Atmospheric space nebula glows matching reference palette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_30%,rgba(37,99,235,0.2),rgba(10,15,25,0.4)_65%,transparent_85%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_65%_at_50%_100%,rgba(56,189,248,0.22),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_35%_at_50%_96%,rgba(240,120,50,0.08),transparent_60%)]" />

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

      {/* Rising Earth Globe - anchored at horizon, visible across whole journey */}
      <div
        className="absolute bottom-0 left-1/2 w-[clamp(540px,72vw,1120px)] -translate-x-1/2 translate-y-[52%] sm:translate-y-[49%] transition-transform duration-700 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 0.25}px), calc(50% + ${scrollY * 0.09}px))`,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}earth.png`}
          alt="Planet Earth observed from space"
          className="earth-glow w-full select-none"
          draggable={false}
        />
      </div>

      {/* Soft space vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_45%,transparent_60%,rgba(5,5,8,0.65))]" />
    </div>
  )
}
