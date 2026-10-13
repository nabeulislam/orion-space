import { useMemo } from 'react'

// deterministic pseudo-random so the sky is stable between renders
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Star = {
  left: string
  top: string
  size: number
  opacity: number
  delay: string
  flare: boolean
  hue: string
}

export default function Starfield({ density = 160 }: { density?: number }) {
  const stars = useMemo<Star[]>(() => {
    const rand = mulberry32(20260226)
    const list: Star[] = []
    for (let i = 0; i < density; i++) {
      const flare = rand() > 0.965
      const size = flare ? 3 + rand() * 2 : 0.6 + rand() * 1.8
      const purple = rand() > 0.82
      list.push({
        left: `${(rand() * 100).toFixed(2)}%`,
        top: `${(rand() * 100).toFixed(2)}%`,
        size,
        opacity: 0.35 + rand() * 0.65,
        delay: `${(rand() * 5).toFixed(2)}s`,
        flare,
        hue: purple ? '#c4b5fd' : rand() > 0.5 ? '#bfdbfe' : '#ffffff',
      })
    }
    return list
  }, [density])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className={`star ${s.flare ? 'star-flare' : 'star-twinkle'}`}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            background: s.hue,
            animationDelay: s.delay,
            boxShadow: s.flare
              ? `0 0 ${s.size * 4}px ${s.size}px ${s.hue}55`
              : `0 0 ${s.size * 2}px ${s.hue}66`,
          }}
        />
      ))}
    </div>
  )
}
