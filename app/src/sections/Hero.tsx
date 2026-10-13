import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import SplitText from '@/components/ui/SplitText'

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 18,
        y: (e.clientY / innerHeight - 0.5) * 18,
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
  }, [])

  return (
    <section id="home" className="relative h-[100svh] min-h-[660px] overflow-hidden select-none bg-transparent">
      {/* Hero Title & Tagline matching reference aesthetic */}
      <div className="absolute inset-x-0 top-[38%] sm:top-[40%] -translate-y-1/2 z-[5] flex justify-center px-6">
        <div className="w-full max-w-5xl text-left">
          <h1 className="font-display text-[clamp(2.8rem,8.2vw,7.6rem)] font-black tracking-[0.08em] leading-none text-white select-none drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
            <SplitText text="ORION SPACE" delay={0.1} stagger={0.035} />
          </h1>

          <p className="font-serif-it mt-3 sm:mt-4 text-[clamp(1.1rem,2vw,1.75rem)] text-white/80 tracking-wide font-normal">
            Be An Earth System Trend Detective.
          </p>
        </div>
      </div>

      {/* Astronaut drifting across center matching reference aesthetic */}
      <img
        src={`${import.meta.env.BASE_URL}astronaut.png`}
        alt="Orion Space astronaut drifting in orbit"
        draggable={false}
        className="animate-floaty absolute left-[54%] sm:left-[55%] top-[24%] sm:top-[26%] z-[10] w-[clamp(250px,34vw,470px)] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none transition-transform duration-300 ease-out drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 0.6}px), calc(-50% + ${mousePos.y * 0.6 - scrollY * 0.2}px)) rotate(-3deg)`,
        }}
      />

      {/* Single clean glass pill CTA resting on Earth (matching reference image) */}
      <div className="absolute bottom-[11%] sm:bottom-[13%] left-1/2 z-20 -translate-x-1/2">
        <Link
          to="/dossiers"
          className="liquid-glass-pill inline-flex min-h-[52px] items-center gap-3 rounded-full px-9 py-3 text-sm sm:text-base font-normal text-white transition-all hover:scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
        >
          <span>Explore Dossiers</span>
          <ArrowUpRight size={18} className="text-white/80" />
        </Link>
      </div>
    </section>
  )
}
