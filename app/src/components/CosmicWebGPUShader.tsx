import { useState, useEffect } from 'react'
import { Shader, Aurora, FloatingParticles } from 'shaders/react'

/**
 * Hardware-accelerated WebGPU cosmic aura and celestial particles
 * Powered by shaders/react with graceful WebGPU capability detection.
 */
export default function CosmicWebGPUShader() {
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    // Only initialize when browser natively provides WebGPU adapter
    if (typeof navigator !== 'undefined') {
      const navGpu = (navigator as unknown as { gpu?: { requestAdapter: () => Promise<unknown> } }).gpu
      if (navGpu && typeof navGpu.requestAdapter === 'function') {
        navGpu
          .requestAdapter()
          .then((adapter) => {
            if (adapter) {
              setSupported(true)
            }
          })
          .catch(() => {
            // Graceful fallback to CSS starfield & orbital simulation
          })
      }
    }
  }, [])

  if (!supported) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-25 mix-blend-screen">
      <Shader className="h-full w-full">
        <Aurora
          colorA="#0284c7"
          colorB="#38bdf8"
          speed={0.25}
          opacity={0.3}
          blendMode="screen"
        />
        <FloatingParticles
          count={140}
          particleSize={0.25}
          speed={0.1}
          opacity={0.28}
        />
      </Shader>
    </div>
  )
}
