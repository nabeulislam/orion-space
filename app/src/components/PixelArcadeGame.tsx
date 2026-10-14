import { useState, useEffect, useRef, useCallback } from 'react'
import { Trophy, Volume2, VolumeX, RotateCcw, ArrowLeft, Shield, Snowflake } from 'lucide-react'

interface PixelArcadeGameProps {
  onExitToLab: () => void
}

interface GameObject {
  id: number
  x: number
  y: number
  type: 'data' | 'fire' | 'ice' | 'cloud'
  points: number
  label: string
  radius: number
  scanned?: boolean
}

export default function PixelArcadeGame({ onExitToLab }: PixelArcadeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [score, setScore] = useState<number>(0)
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('orion_pixel_highscore') || '0', 10)
  })
  const [shield, setShield] = useState<number>(100)
  const [climateStability, setClimateStability] = useState<number>(100)
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [gameWon, setGameWon] = useState<boolean>(false)
  const [combo, setCombo] = useState<number>(0)
  const [rank, setRank] = useState<string>('CADET')

  // Audio Context for 8-bit synthesized retro sound effects
  const audioCtxRef = useRef<AudioContext | null>(null)

  const playSfx = useCallback((type: 'collect' | 'scan' | 'hit' | 'win') => {
    if (!audioEnabled) return
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      const now = ctx.currentTime

      if (type === 'collect') {
        // High retro chime
        osc.type = 'square'
        osc.frequency.setValueAtTime(587.33, now) // D5
        osc.frequency.setValueAtTime(880, now + 0.06) // A5
        gain.gain.setValueAtTime(0.08, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
        osc.start(now)
        osc.stop(now + 0.18)
      } else if (type === 'scan') {
        // Infrared laser sweep
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(900, now)
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.15)
        gain.gain.setValueAtTime(0.07, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
        osc.start(now)
        osc.stop(now + 0.15)
      } else if (type === 'hit') {
        // Low rumble buzz
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(140, now)
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.22)
        gain.gain.setValueAtTime(0.12, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)
        osc.start(now)
        osc.stop(now + 0.22)
      } else if (type === 'win') {
        // Arpeggiated victory jingle
        osc.type = 'square'
        const notes = [523.25, 659.25, 783.99, 1046.5] // C, E, G, C
        notes.forEach((freq, idx) => {
          const o = ctx.createOscillator()
          const g = ctx.createGain()
          o.type = 'square'
          o.connect(g)
          g.connect(ctx.destination)
          o.frequency.setValueAtTime(freq, now + idx * 0.08)
          g.gain.setValueAtTime(0.09, now + idx * 0.08)
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.12)
          o.start(now + idx * 0.08)
          o.stop(now + idx * 0.08 + 0.12)
        })
      }
    } catch {
      // Audio not supported or blocked
    }
  }, [audioEnabled])

  // Game state refs
  const stateRef = useRef({
    playerX: 300,
    playerSpeed: 0,
    scanActive: false,
    scanRadius: 0,
    items: [] as GameObject[],
    particles: [] as Array<{ x: number; y: number; vx: number; vy: number; color: string; life: number }>,
    stars: [] as Array<{ x: number; y: number; size: number; speed: number }>,
    nextSpawn: 0,
    keys: { left: false, right: false, scan: false }
  })

  // Update Detective Rank based on score
  useEffect(() => {
    if (score >= 1200) {
      setRank('CHIEF CLIMATE DETECTIVE')
      if (!gameWon) {
        setGameWon(true)
        playSfx('win')
      }
    } else if (score >= 600) {
      setRank('SENIOR ORBITAL DETECTIVE')
    } else if (score >= 250) {
      setRank('SATELLITE INVESTIGATOR')
    } else {
      setRank('CADET DETECTIVE')
    }

    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('orion_pixel_highscore', score.toString())
    }
  }, [score, highScore, gameWon, playSfx])

  // Input listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.keys.left = true
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.keys.right = true
      }
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        triggerScan()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.keys.left = false
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.keys.right = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const triggerScan = useCallback(() => {
    const s = stateRef.current
    if (s.scanActive) return
    s.scanActive = true
    s.scanRadius = 20
    playSfx('scan')
  }, [playSfx])

  const restartGame = () => {
    setScore(0)
    setShield(100)
    setClimateStability(100)
    setGameOver(false)
    setGameWon(false)
    setCombo(0)
    stateRef.current.items = []
    stateRef.current.particles = []
    stateRef.current.playerX = 300
    playSfx('collect')
  }

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize stars
    const s = stateRef.current
    s.stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() > 0.8 ? 2 : 1,
      speed: 0.5 + Math.random() * 1.5
    }))

    let animId: number
    let lastTime = performance.now()

    const render = (time: number) => {
      const dt = Math.min(0.1, (time - lastTime) / 1000)
      lastTime = time

      const width = canvas.width
      const height = canvas.height

      // Background clear: Retro Deep Space Slate
      ctx.fillStyle = '#060a14'
      ctx.fillRect(0, 0, width, height)

      // Scrolling starfield
      ctx.fillStyle = '#ffffff'
      s.stars.forEach(star => {
        star.y += star.speed
        if (star.y > height) star.y = 0
        ctx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size)
      })

      // Draw Pixel Earth Horizon at bottom
      const horizonY = height - 70
      ctx.fillStyle = '#09233b'
      ctx.fillRect(0, horizonY, width, 70)

      // Bangladesh Bay of Bengal coastal pixel silhouette
      ctx.fillStyle = '#0d3859'
      for (let x = 0; x < width; x += 16) {
        const bh = 14 + Math.sin(x * 0.03) * 8 + Math.cos(x * 0.07) * 6
        ctx.fillRect(x, horizonY - bh, 16, bh)
      }

      // Orbital flight path guide line
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)'
      ctx.setLineDash([6, 6])
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, 90)
      ctx.lineTo(width, 90)
      ctx.stroke()
      ctx.setLineDash([])

      // Update Player
      if (s.keys.left) s.playerSpeed = -260
      else if (s.keys.right) s.playerSpeed = 260
      else s.playerSpeed *= 0.85

      s.playerX += s.playerSpeed * dt
      s.playerX = Math.max(30, Math.min(width - 30, s.playerX))

      const playerY = 90

      // Draw Scan Wave
      if (s.scanActive) {
        s.scanRadius += 300 * dt
        ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, 1 - s.scanRadius / 160)})`
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(s.playerX, playerY, s.scanRadius, 0, Math.PI * 2)
        ctx.stroke()

        if (s.scanRadius > 160) {
          s.scanActive = false
        }
      }

      // Spawn falling items
      s.nextSpawn -= dt
      if (s.nextSpawn <= 0) {
        s.nextSpawn = 1.0 + Math.random() * 0.8
        const types: Array<'data' | 'fire' | 'ice' | 'cloud'> = ['data', 'fire', 'ice', 'cloud']
        const chosen = types[Math.floor(Math.random() * types.length)]
        let label = 'MERRA-2 T2M'
        let points = 100
        if (chosen === 'fire') {
          label = 'VIIRS FIRE'
          points = 150
        } else if (chosen === 'ice') {
          label = 'ALBEDO ICE'
          points = 120
        } else if (chosen === 'cloud') {
          label = 'AEROSOL SMOG'
          points = -40
        }

        s.items.push({
          id: Math.random(),
          x: 40 + Math.random() * (width - 80),
          y: height - 10,
          type: chosen,
          points,
          label,
          radius: 14
        })
      }

      // Update and draw items (floating up from Earth into orbit)
      for (let i = s.items.length - 1; i >= 0; i--) {
        const item = s.items[i]
        item.y -= 75 * dt // drift upwards toward satellite orbit

        // Pixel item rendering
        const ix = Math.floor(item.x)
        const iy = Math.floor(item.y)

        if (item.type === 'data') {
          // Blue data cube
          ctx.fillStyle = '#38bdf8'
          ctx.fillRect(ix - 8, iy - 8, 16, 16)
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(ix - 4, iy - 4, 8, 8)
        } else if (item.type === 'fire') {
          // Thermal hotspot diamond
          ctx.fillStyle = '#f43f5e'
          ctx.beginPath()
          ctx.moveTo(ix, iy - 10)
          ctx.lineTo(ix + 9, iy)
          ctx.lineTo(ix, iy + 10)
          ctx.lineTo(ix - 9, iy)
          ctx.closePath()
          ctx.fill()
          ctx.fillStyle = '#fed7aa'
          ctx.fillRect(ix - 3, iy - 3, 6, 6)
        } else if (item.type === 'ice') {
          // Albedo ice crystal
          ctx.fillStyle = '#34d399'
          ctx.fillRect(ix - 7, iy - 7, 14, 14)
          ctx.fillStyle = '#e0f2fe'
          ctx.fillRect(ix - 3, iy - 3, 6, 6)
        } else if (item.type === 'cloud') {
          // Smog haze cloud
          ctx.fillStyle = 'rgba(100, 116, 139, 0.85)'
          ctx.fillRect(ix - 12, iy - 6, 24, 12)
          ctx.fillRect(ix - 8, iy - 10, 16, 16)
        }

        // Label above item
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
        ctx.font = '9px monospace'
        ctx.textAlign = 'center'
        ctx.fillText(item.label, ix, iy - 14)

        // Check scan wave collision for fires
        if (s.scanActive && item.type === 'fire' && !item.scanned) {
          const dist = Math.hypot(item.x - s.playerX, item.y - playerY)
          if (dist < s.scanRadius + 15) {
            item.scanned = true
            setScore(prev => prev + 180)
            setCombo(c => c + 1)
            playSfx('collect')
            // Spawn spark particles
            for (let p = 0; p < 8; p++) {
              s.particles.push({
                x: item.x,
                y: item.y,
                vx: (Math.random() - 0.5) * 120,
                vy: (Math.random() - 0.5) * 120,
                color: '#38bdf8',
                life: 0.5
              })
            }
            s.items.splice(i, 1)
            continue
          }
        }

        // Check collision with satellite player
        const distToPlayer = Math.hypot(item.x - s.playerX, item.y - playerY)
        if (distToPlayer < 24) {
          if (item.type === 'cloud') {
            setShield(prev => Math.max(0, prev - 20))
            setCombo(0)
            playSfx('hit')
          } else {
            setScore(prev => prev + item.points)
            setCombo(c => c + 1)
            playSfx('collect')
            if (item.type === 'ice') {
              setClimateStability(prev => Math.min(100, prev + 8))
            }
          }

          // Particles
          for (let p = 0; p < 6; p++) {
            s.particles.push({
              x: s.playerX,
              y: playerY,
              vx: (Math.random() - 0.5) * 100,
              vy: (Math.random() - 0.5) * 100,
              color: item.type === 'cloud' ? '#64748b' : '#38bdf8',
              life: 0.4
            })
          }

          s.items.splice(i, 1)
          continue
        }

        // Passed off top without collection
        if (item.y < 30) {
          if (item.type === 'fire') {
            setClimateStability(prev => Math.max(0, prev - 12))
          }
          s.items.splice(i, 1)
        }
      }

      // Draw and update particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i]
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.life -= dt
        if (p.life <= 0) {
          s.particles.splice(i, 1)
          continue
        }
        ctx.fillStyle = p.color
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 3, 3)
      }

      // Draw 8-bit Satellite Player (ORION-1)
      const px = Math.floor(s.playerX)
      const py = Math.floor(playerY)

      // Solar panels (left & right wings)
      ctx.fillStyle = '#0284c7'
      ctx.fillRect(px - 22, py - 6, 12, 12)
      ctx.fillRect(px + 10, py - 6, 12, 12)

      // Panel solar cells grid lines
      ctx.fillStyle = '#38bdf8'
      ctx.fillRect(px - 17, py - 6, 2, 12)
      ctx.fillRect(px + 15, py - 6, 2, 12)

      // Satellite Central Chassis
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(px - 7, py - 9, 14, 18)

      // Sensor Dish / Antenna
      ctx.fillStyle = '#38bdf8'
      ctx.fillRect(px - 2, py + 9, 4, 6)
      ctx.fillStyle = '#34d399'
      ctx.fillRect(px - 1, py + 15, 2, 3)

      // CRT Scanline raster effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.16)'
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1.5)
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [playSfx])

  return (
    <div className="relative w-full rounded-3xl border border-sky-400/40 bg-[#050b14] p-5 sm:p-7 shadow-[0_0_60px_rgba(56,189,248,0.2)] font-mono text-white select-none">
      {/* Top Arcade Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sky-400/20 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitToLab}
            className="flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-300 hover:bg-sky-500/20 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.2)]"
          >
            <ArrowLeft size={14} />
            <span>EXIT TO LAB</span>
          </button>

          <div>
            <div className="text-[10px] text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              RETRO 2D ORBITAL SIMULATOR
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wider">
              ORION: 2D SATELLITE PILOT
            </h3>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:block">
            <span className="text-white/40 block text-[9px] uppercase">DETECTIVE RANK:</span>
            <span className="text-sky-300 font-bold">{rank}</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="text-white/40 block text-[9px]">HIGH SCORE</span>
            <span className="text-emerald-300 font-bold">{highScore.toString().padStart(6, '0')}</span>
          </div>

          <div className="rounded-xl border border-sky-400/30 bg-sky-500/10 px-3.5 py-1.5 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <span className="text-sky-300 block text-[9px]">SCORE</span>
            <span className="text-xl font-black text-white">{score.toString().padStart(6, '0')}</span>
          </div>

          <button
            onClick={() => setAudioEnabled(prev => !prev)}
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white"
            title="Toggle Retro Chiptune SFX"
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* Vital Telemetry Bars */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-white/50 flex items-center gap-1">
              <Shield size={12} className="text-sky-400" />
              SATELLITE SHIELD
            </span>
            <span className="text-sky-300">{shield}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-300"
              style={{ width: `${shield}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-white/50 flex items-center gap-1">
              <Snowflake size={12} className="text-emerald-400" />
              PLANETARY STABILITY
            </span>
            <span className="text-emerald-300">{climateStability}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-all duration-300"
              style={{ width: `${climateStability}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2D Retro Canvas Stage */}
      <div className="relative mt-4 overflow-hidden rounded-2xl border border-sky-400/30 shadow-inner bg-black">
        <canvas
          ref={canvasRef}
          width={840}
          height={380}
          className="w-full h-[320px] sm:h-[380px] block cursor-crosshair"
          onClick={triggerScan}
        />

        {/* Combo Multiplier Pill */}
        {combo > 1 && (
          <div className="absolute top-4 left-4 rounded-full border border-sky-400/40 bg-sky-500/20 px-3 py-1 text-xs font-bold text-sky-200 animate-bounce">
            COMBO x{combo}!
          </div>
        )}

        {/* Game Over / Win Overlay */}
        {(gameOver || shield <= 0 || climateStability <= 0) && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center space-y-4 backdrop-blur-sm">
            <div className="h-16 w-16 rounded-2xl border border-rose-500/50 bg-rose-500/20 flex items-center justify-center text-rose-300 shadow-[0_0_30px_rgba(244,63,94,0.4)]">
              <RotateCcw size={32} />
            </div>
            <h4 className="text-2xl font-bold text-rose-300">TELEMETRY LINK SEVERED</h4>
            <p className="text-xs text-white/60 max-w-md">
              Aerosol haze clouded the satellite optics. Final Score: <strong>{score}</strong>.
            </p>
            <button
              onClick={restartGame}
              className="rounded-full border border-sky-400 bg-sky-500/20 px-7 py-3 text-sm font-bold text-white hover:bg-sky-500/40 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              RESTART ORBIT
            </button>
          </div>
        )}

        {gameWon && (
          <div className="absolute top-4 right-4 rounded-xl border border-emerald-400/50 bg-emerald-500/20 p-3 text-xs text-emerald-200 flex items-center gap-2 shadow-[0_0_20px_rgba(52,211,153,0.3)] animate-pulse">
            <Trophy size={18} />
            <div>
              <div className="font-bold">MISSION ACCOMPLISHED</div>
              <div className="text-[10px] text-white/70">8-Bit Master Detective Badge Unlocked!</div>
            </div>
          </div>
        )}
      </div>

      {/* Retro Arcade Controls Bar (Touch / Mouse Friendly) */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
        <div className="flex items-center gap-2 text-white/60 text-[11px]">
          <span className="rounded bg-white/10 px-2 py-1 font-bold text-white">A / ◄</span>
          <span className="rounded bg-white/10 px-2 py-1 font-bold text-white">D / ►</span>
          <span>Steer Orbit</span>
          <span className="rounded bg-white/10 px-2 py-1 font-bold text-white ml-2">SPACE</span>
          <span>Deploy Infrared Scan</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onPointerDown={() => { stateRef.current.keys.left = true }}
            onPointerUp={() => { stateRef.current.keys.left = false }}
            className="flex-1 sm:flex-initial rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-bold hover:bg-white/10 active:scale-95 transition-transform"
          >
            ◄ LEFT
          </button>
          <button
            onClick={triggerScan}
            className="flex-1 sm:flex-initial rounded-xl border border-sky-400/50 bg-sky-500/20 px-6 py-2.5 font-bold text-sky-200 hover:bg-sky-500/30 active:scale-95 transition-transform shadow-[0_0_15px_rgba(56,189,248,0.25)]"
          >
            ⚡ SCAN WAVE
          </button>
          <button
            onPointerDown={() => { stateRef.current.keys.right = true }}
            onPointerUp={() => { stateRef.current.keys.right = false }}
            className="flex-1 sm:flex-initial rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-bold hover:bg-white/10 active:scale-95 transition-transform"
          >
            RIGHT ►
          </button>
        </div>
      </div>
    </div>
  )
}
