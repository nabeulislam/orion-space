import * as React from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { X } from "lucide-react"

export interface AppleSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
}

/**
 * Rubber-band resistance curve from Designing Fluid Interfaces (Apple WWDC 2018):
 * overshoot * dimension * constant / (dimension + constant * |overshoot|)
 */
function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

export function AppleSheet({
  open,
  onOpenChange,
  children,
  title,
  description
}: AppleSheetProps) {
  const [mounted, setMounted] = React.useState(false)
  const y = useMotionValue(0)
  const isDragging = React.useRef(false)
  const sheetRef = React.useRef<HTMLDivElement>(null)

  // Map sheet drag-down to scrim opacity
  const scrimOpacity = useTransform(y, [0, 400], [0.65, 0])

  React.useEffect(() => {
    if (open) {
      setMounted(true)
      // Reset y
      y.set(0)
      // Lock body scroll
      document.body.style.overflow = "hidden"
    } else {
      const timer = setTimeout(() => {
        setMounted(false)
        document.body.style.overflow = ""
      }, 320)
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open, y])

  if (!mounted && !open) return null

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only initiate drag on grab handle or header area
    const target = e.target as HTMLElement
    if (target.closest("button") || target.closest("a") || target.closest("input")) return

    isDragging.current = true
    const startY = e.clientY
    const startValue = y.get()
    let lastY = startY
    let lastTime = performance.now()
    let velocity = 0

    const pointerId = e.pointerId
    target.setPointerCapture?.(pointerId)

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!isDragging.current) return
      const now = performance.now()
      const dt = Math.max(1, now - lastTime)
      const currentY = moveEvent.clientY
      const dy = currentY - startY
      velocity = ((currentY - lastY) / dt) * 1000 // px/s
      lastY = currentY
      lastTime = now

      const rawTarget = startValue + dy
      if (rawTarget < 0) {
        // Dragging UP beyond top bound: apply Apple rubber-banding
        const windowHeight = window.innerHeight || 800
        const resisted = rubberband(rawTarget, windowHeight, 0.45)
        y.set(resisted)
      } else {
        // Dragging DOWN towards dismiss
        y.set(rawTarget)
      }
    }

    const onPointerUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      target.releasePointerCapture?.(pointerId)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
      window.removeEventListener("pointercancel", onPointerUp)

      const currentY = y.get()
      // Apple momentum projection: endpoint = currentY + project(v)
      // decelerationRate ≈ 0.998
      const projected = currentY + (velocity / 1000) * (0.998 / (1 - 0.998))

      // Dismiss if pulled down > 140px OR projected velocity indicates a down-flick
      if (currentY > 140 || projected > 250 || velocity > 450) {
        // Animate off screen with spring matching Apple specs (damping ~0.8, response 0.3)
        animate(y, window.innerHeight || 800, {
          type: "spring",
          damping: 24, // damping ratio ~0.8
          stiffness: 280, // response ~0.3s
          velocity: velocity,
          onComplete: () => onOpenChange(false)
        })
      } else {
        // Snap back to open resting state (y = 0)
        animate(y, 0, {
          type: "spring",
          damping: 24, // ~0.8
          stiffness: 300, // ~0.3s
          velocity: velocity
        })
      }
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    window.addEventListener("pointercancel", onPointerUp)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Background Dimming Scrim */}
      <motion.div
        className="fixed inset-0 bg-black backdrop-blur-sm"
        style={{ opacity: scrimOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 0.65 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => onOpenChange(false)}
      />

      {/* iOS Sheet Content with Rubberband & Interruptible Springs */}
      <motion.div
        ref={sheetRef}
        style={{ y }}
        initial={{ y: "100%" }}
        animate={{ y: open ? 0 : "100%" }}
        transition={{
          type: "spring",
          damping: 24, // damping ratio 0.8
          stiffness: 300 // response 0.3s
        }}
        className="relative z-10 mx-auto w-full max-w-2xl rounded-t-[32px] border-t border-white/20 bg-[#0c101c]/95 p-6 text-white shadow-2xl backdrop-blur-2xl max-h-[88vh] flex flex-col will-change-transform"
      >
        {/* Grab Handle */}
        <div
          onPointerDown={handlePointerDown}
          className="mx-auto h-1.5 w-12 cursor-grab active:cursor-grabbing rounded-full bg-white/30 hover:bg-white/50 transition-colors mb-4 -mt-1 select-none touch-none"
        />

        {/* Sheet Header Area with Grab Capability */}
        <div onPointerDown={handlePointerDown} className="flex items-start justify-between pb-3 select-none touch-none">
          <div>
            {title && (
              <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-white">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-xs text-white/60">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close sheet"
            className="apple-icon-badge h-8 w-8 text-white/70 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content inside sheet */}
        <div className="mt-2 overflow-y-auto custom-scrollbar flex-1 pr-1">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default AppleSheet
