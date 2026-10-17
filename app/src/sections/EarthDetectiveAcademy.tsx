import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Award,
  ThermometerSnowflake,
  Flame,
  Sun,
  Eye,
  Check,
  RotateCcw,
  Trophy,
  AlertTriangle,
  Gamepad2,
  Sparkles
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import PixelTransition from '@/components/ui/PixelTransition'
import PixelArcadeGame from '@/components/PixelArcadeGame'

export default function EarthDetectiveAcademy({ onTriggerFullRetro, onLaunch2dMode }: { onTriggerFullRetro?: () => void; onLaunch2dMode?: () => void } = {}) {
  const [isPixelVibeMode, setIsPixelVibeMode] = useState(false)
  const [activeGame, setActiveGame] = useState<'mystery' | 'satellite' | 'albedo' | 'quiz'>('mystery')

  // Game 1: Monsoon Mystery State
  const [selectedMonth, setSelectedMonth] = useState<string>('Annual')
  const [mysterySolved, setMysterySolved] = useState<boolean>(false)

  // Game 2: Thermal Satellite Hunt State
  const [sensorMode, setSensorMode] = useState<'visible' | 'thermal'>('visible')
  const [foundFires, setFoundFires] = useState<number[]>([])

  // Game 3: Albedo Simulator State
  const [icePercent, setIcePercent] = useState<number>(75)

  // Game 4: Quiz State
  const [quizStep, setQuizStep] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizFinished, setQuizFinished] = useState<boolean>(false)
  const [licenseOpen, setLicenseOpen] = useState<boolean>(false)

  // Earned Badges
  const [badges, setBadges] = useState<{ [key: string]: boolean }>({
    mystery: false,
    satellite: false,
    albedo: false,
    certified: false,
  })

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#34d399', '#818cf8', '#67e8f9']
    })
  }

  // Handle Month Selection in Game 1
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
    if (month === 'September') {
      setMysterySolved(true)
      if (!badges.mystery) {
        setBadges((prev) => ({ ...prev, mystery: true }))
        triggerConfetti()
      }
    }
  }

  // Handle Fire Discovery in Game 2
  const handleFireClick = (fireId: number) => {
    if (sensorMode === 'thermal' && !foundFires.includes(fireId)) {
      const nextFires = [...foundFires, fireId]
      setFoundFires(nextFires)
      if (nextFires.length === 3 && !badges.satellite) {
        setBadges((prev) => ({ ...prev, satellite: true }))
        triggerConfetti()
      }
    }
  }

  // Quiz Questions
  const QUIZ_QUESTIONS = [
    {
      question: "Why did the yearly temperature average hide Bangladesh's warming in NASA MERRA-2 data?",
      options: [
        "Because satellites cannot see Bangladesh.",
        "Because yearly averages blend cooling spring months with extreme September warming (+0.40 °C/decade).",
        "Because temperature never changes on Earth.",
        "Because the ocean was too cold to measure."
      ],
      correct: 1,
      explanation: "Yearly averages can hide seasonal extremes! While spring was slightly cool, late-monsoon September is warming rapidly in 34/34 cells."
    },
    {
      question: "Which satellite technology helps NASA FIRMS detect wildfires through thick smoke clouds?",
      options: [
        "Normal smartphone cameras.",
        "Thermal Infrared Sensors that detect the invisible heat radiating from fires.",
        "Sound microphones listening for crackling wood.",
        "Visible green spectrum cameras."
      ],
      correct: 1,
      explanation: "Thermal infrared sensors see wavelengths of heat (like 3.9 µm) that pass right through smoke particles."
    },
    {
      question: "What is the 'Ice-Albedo Feedback' loop?",
      options: [
        "When ice gets cold, it turns into ice cream.",
        "White ice reflects 85% of solar heat; when it melts into dark ocean, water absorbs 90% of heat, causing faster warming.",
        "Ice reflects dark shadows only.",
        "Water is colder than snow, so the planet cools down."
      ],
      correct: 1,
      explanation: "Bright white surfaces reflect sunlight (high albedo), while dark ocean absorbs it, accelerating warming."
    },
    {
      question: "What statistical test did Team Orion Space use to prove the September trend wasn't random luck?",
      options: [
        "A coin toss test.",
        "Mann-Kendall test with Benjamini-Hochberg False Discovery Rate (FDR q = 0.05).",
        "Just guessing based on hot weather.",
        "Looking at one hot day in Barisal."
      ],
      correct: 1,
      explanation: "Orion Space used rigorous Mann-Kendall trend tests and FDR multiple-testing corrections across 442 series!"
    }
  ]

  const handleQuizAnswer = (optionIdx: number) => {
    setSelectedAnswer(optionIdx)
    const isCorrect = optionIdx === QUIZ_QUESTIONS[quizStep].correct
    if (isCorrect) {
      setScore((s) => s + 1)
    }

    setTimeout(() => {
      setSelectedAnswer(null)
      if (quizStep + 1 < QUIZ_QUESTIONS.length) {
        setQuizStep((s) => s + 1)
      } else {
        setQuizFinished(true)
        setBadges((prev) => ({ ...prev, certified: true }))
        triggerConfetti()
      }
    }, 1500)
  }

  const restartQuiz = () => {
    setQuizStep(0)
    setScore(0)
    setSelectedAnswer(null)
    setQuizFinished(false)
  }

  return (
    <motion.section
      id="academy"
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_70%)] blur-[120px]" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <h2 className="font-display text-3xl tracking-wide text-white sm:text-5xl">
            EARTH DETECTIVE ACADEMY
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl font-normal leading-relaxed">
            Designed for students and aspiring space detectives. Solve 3 interactive planetary cases based on real NASA satellite datasets and earn your NASA Space Apps Detective Certification!
          </p>
        </div>

        {/* Badges showcase with Apple Squircle styling */}
        <div className="liquid-glass-card rounded-2xl p-3 flex items-center gap-3">
          <div className="text-right px-2 hidden sm:block">
            <div className="text-xs font-semibold text-white">Detective Badges</div>
            <div className="text-[10px] text-white/50 font-mono">
              {Object.values(badges).filter(Boolean).length} of 4 Earned
            </div>
          </div>
          <div className="flex gap-2">
            <div
              title="Seasonal Sleuth Badge"
              className={`apple-icon-badge h-10 w-10 flex-none ${
                badges.mystery
                  ? 'border-orion/50 bg-orion-deep/20 text-orion-bright shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'text-white/30'
              }`}
            >
              <Sun size={18} />
            </div>
            <div
              title="Wildfire Scout Badge"
              className={`apple-icon-badge h-10 w-10 flex-none ${
                badges.satellite
                  ? 'border-rose-400/50 bg-rose-500/20 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                  : 'text-white/30'
              }`}
            >
              <Flame size={18} />
            </div>
            <div
              title="Cryosphere Guardian Badge"
              className={`apple-icon-badge h-10 w-10 flex-none ${
                badges.albedo
                  ? 'border-orion/50 bg-orion-deep/20 text-orion-bright shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'text-white/30'
              }`}
            >
              <ThermometerSnowflake size={18} />
            </div>
            <div
              title="NASA Space Apps Certified Detective Badge"
              className={`apple-icon-badge h-10 w-10 flex-none ${
                badges.certified
                  ? 'border-signal/50 bg-signal-deep/20 text-signal-bright shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                  : 'text-white/30'
              }`}
            >
              <Trophy size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Game Tabs Navigation */}
      <div className="mt-10 flex flex-wrap gap-2.5 sm:gap-3">
        <button
          onClick={() => { setActiveGame('mystery'); setIsPixelVibeMode(false); }}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
            activeGame === 'mystery'
              ? 'border-orion/60 bg-orion-deep/15 text-orion-ice shadow-[0_0_20px_rgba(56,189,248,0.2)]'
              : 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.08] hover:text-white'
          }`}
        >
          <Sun size={16} className="text-orion-bright" />
          <span>Game 1: The Late-Monsoon Mystery</span>
          {badges.mystery && <Check size={14} className="text-signal" />}
        </button>

        <button
          onClick={() => { setActiveGame('satellite'); setIsPixelVibeMode(false); }}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
            activeGame === 'satellite'
              ? 'border-rose-400/60 bg-rose-500/15 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
              : 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.08] hover:text-white'
          }`}
        >
          <Flame size={16} className="text-rose-400" />
          <span>Game 2: Thermal Hotspot Hunt</span>
          {badges.satellite && <Check size={14} className="text-signal" />}
        </button>

        <button
          onClick={() => { setActiveGame('albedo'); setIsPixelVibeMode(false); }}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
            activeGame === 'albedo'
              ? 'border-orion/60 bg-orion-deep/15 text-orion-ice shadow-[0_0_20px_rgba(56,189,248,0.2)]'
              : 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.08] hover:text-white'
          }`}
        >
          <ThermometerSnowflake size={16} className="text-orion" />
          <span>Game 3: Albedo Ice Shield Sim</span>
          {badges.albedo && <Check size={14} className="text-signal" />}
        </button>

        <button
          onClick={() => { setActiveGame('quiz'); setIsPixelVibeMode(false); }}
          className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
            activeGame === 'quiz'
              ? 'border-signal/60 bg-signal-deep/15 text-signal-ice shadow-[0_0_20px_rgba(52,211,153,0.2)]'
              : 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.08] hover:text-white'
          }`}
        >
          <Award size={16} className="text-signal" />
          <span>Final Exam: Detective Certification</span>
          {badges.certified && <Check size={14} className="text-signal" />}
        </button>

        <button
          onClick={() => { if (onTriggerFullRetro) onTriggerFullRetro(); else if (onLaunch2dMode) onLaunch2dMode(); else setIsPixelVibeMode(true); }}
          className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
            isPixelVibeMode
              ? 'border-signal bg-signal-deep/25 text-signal-ice shadow-[0_0_30px_rgba(52,211,153,0.4)] scale-105'
              : 'border-orion/40 bg-orion-deep/10 text-orion-ice hover:bg-orion-deep/20 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
          }`}
        >
          <Gamepad2 size={16} className="text-signal animate-pulse" />
          <span>👾 2D Retro Arcade (Vibe Shift)</span>
          <Sparkles size={14} className="text-orion-bright" />
        </button>
      </div>

      
      {/* Dynamic Pixel Transition Vibe Shift Arena */}
      <div className="mt-8 relative w-full h-[780px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <PixelTransition
          active={isPixelVibeMode}
          onActiveChange={setIsPixelVibeMode}
          trigger="manual"
          gridSize={14}
          pixelColor="#38bdf8"
          animationStepDuration={0.35}
          pattern="ripple"
          pixelAnimation="grow"
          aspectRatio=""
          style={{ width: '100%', height: '100%' }}
          className="w-full h-full"
          firstContent={
            <div className="w-full h-full overflow-y-auto p-2 sm:p-4 custom-scrollbar">
              {/* GAME 1: THE LATE-MONSOON MYSTERY */}
      {activeGame === 'mystery' && (
        <div className="liquid-glass-card mt-8 rounded-3xl p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-lg bg-orion-deep/10 px-3 py-1 text-xs font-mono text-orion-bright border border-orion/20">
                CASE FILE 01 · BARISAL COAST INVESTIGATION
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-white">
                The Mystery of the Hidden Heat
              </h3>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                <strong className="text-white">The Clue:</strong> Farmers in Barisal complained that their late-summer crops were suffering from unusual heat, but national climate reports looking at the <span className="text-orion-bright font-semibold">Annual Average</span> showed <span className="text-orion-bright font-semibold">0.00 °C warming trend!</span>
              </p>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                As a NASA Trend Detective, test each month below to uncover which month was hiding the secret warming!
              </p>

              {/* Month selector buttons */}
              <div className="pt-2">
                <span className="text-xs font-mono text-white/50 block mb-2">
                  Select a Month to Test (NASA MERRA-2 25-Year Data):
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Annual', 'January', 'March', 'May', 'July', 'September', 'November'].map((m) => {
                    const isSelected = selectedMonth === m
                    const isSep = m === 'September'
                    return (
                      <button
                        key={m}
                        onClick={() => handleMonthChange(m)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all border ${
                          isSelected
                            ? isSep
                              ? 'border-orion bg-orion-deep/25 text-orion-ice scale-105 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                              : 'border-white/20 bg-white/10 text-white'
                            : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                        }`}
                      >
                        {m}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Clue Debrief */}
              {mysterySolved ? (
                <div className="rounded-2xl border border-signal-deep/30 bg-signal-ink/30 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-signal font-semibold text-sm">
                    <Check size={18} />
                    <span>MYSTERY SOLVED! DETECTIVE REPORT:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80">
                    You found it! In <strong className="text-orion-bright">September</strong>, temperature is skyrocketing by <strong className="text-orion-bright">+0.40 °C per decade</strong> with a Mann-Kendall p-value of 0.00007! The yearly average hid it because spring months cooled slightly.
                  </p>
                  <p className="text-xs font-mono text-signal-bright">
                    🎖️ Seasonal Sleuth Badge Awarded to your profile!
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-orion/20 bg-orion-deep/5 p-4 text-xs text-orion-bright/80 font-mono">
                  💡 <em>Hint: Look toward the end of the monsoon season right before autumn...</em>
                </div>
              )}
            </div>

            {/* Right Side: Interactive Sensor Readout Display */}
            <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 text-center space-y-5 shadow-inner">
              <div className="flex justify-between items-center text-xs font-mono text-white/50 border-b border-white/10 pb-3">
                <span>STATION: BARISAL (22.5°N, 90.0°E)</span>
                <span>STATUS: {selectedMonth.toUpperCase()} SENSOR</span>
              </div>

              {/* Simulated Thermometer Dial */}
              <div className="py-6">
                <div className="text-xs uppercase font-mono tracking-widest text-white/50">
                  Observed 10-Year Temperature Shift
                </div>
                <div className={`mt-2 font-display text-5xl sm:text-6xl ${
                  selectedMonth === 'September'
                    ? 'text-orion animate-pulse'
                    : selectedMonth === 'May'
                    ? 'text-orion'
                    : 'text-white'
                }`}>
                  {selectedMonth === 'September' && '+0.40 °C'}
                  {selectedMonth === 'Annual' && '+0.02 °C'}
                  {selectedMonth === 'January' && '+0.17 °C'}
                  {selectedMonth === 'March' && '−0.28 °C'}
                  {selectedMonth === 'May' && '−0.48 °C'}
                  {selectedMonth === 'July' && '+0.15 °C'}
                  {selectedMonth === 'November' && '+0.23 °C'}
                </div>
                <div className="mt-2 text-xs font-mono text-white/60">
                  {selectedMonth === 'September'
                    ? 'CRITICAL MONSOON SHIFT (p = 0.00007) · 31/34 CELLS CONFIRMED'
                    : 'NO STATISTICALLY SIGNIFICANT TREND DETECTED'}
                </div>
              </div>

              {/* Trend Visualizer Bar */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-xs text-white/60 font-mono">
                  <span>Statistical Significance Gauge:</span>
                  <span className={selectedMonth === 'September' ? 'text-signal font-bold' : 'text-white/40'}>
                    {selectedMonth === 'September' ? '99.993% CONFIDENCE (p < 0.0001)' : 'NOT SIGNIFICANT (p > 0.05)'}
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      selectedMonth === 'September' ? 'w-full bg-[#38bdf8]' : 'w-1/12 bg-white/30'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GAME 2: THERMAL HOTSPOT HUNT (FIRMS vs GIBS) */}
      {activeGame === 'satellite' && (
        <div className="liquid-glass-card mt-8 rounded-3xl p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-lg bg-rose-500/10 px-3 py-1 text-xs font-mono text-rose-300 border border-rose-400/20">
                CASE FILE 02 · ORBITAL SENSOR INVESTIGATION
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-white">
                Thermal Satellite Hotspot Hunt
              </h3>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                Thick smoke is blanketing the river delta and mangrove forests! Visible light cameras cannot see through the haze. Switch your satellite sensor to <strong className="text-rose-300">NASA FIRMS Thermal Infrared</strong> to detect the 3 hidden fire cores!
              </p>

              {/* Sensor Switch */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSensorMode('visible')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all ${
                    sensorMode === 'visible'
                      ? 'border-white/30 bg-white/15 text-white'
                      : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <Eye size={16} />
                  <span>Visible Light (NASA GIBS)</span>
                </button>
                <button
                  onClick={() => setSensorMode('thermal')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all ${
                    sensorMode === 'thermal'
                      ? 'border-rose-400 bg-rose-500/25 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                      : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <Flame size={16} />
                  <span>Thermal Infrared (NASA FIRMS)</span>
                </button>
              </div>

              {/* Progress counter */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/60">Hotspots Identified:</span>
                  <span className="text-rose-400 font-bold">{foundFires.length} of 3 Found</span>
                </div>
                <Progress value={(foundFires.length / 3) * 100} className="h-2" />
                {foundFires.length === 3 && (
                  <p className="text-xs text-signal font-semibold pt-1">
                    ✓ All thermal hotspots marked! NASA FIRMS coordinates transmitted.
                  </p>
                )}
              </div>
            </div>

            {/* Simulated Satellite Screen */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-3xl border border-white/15 overflow-hidden bg-ink/80 backdrop-blur-md shadow-2xl">
                {/* Simulated landscape image */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ${
                    sensorMode === 'visible'
                      ? 'bg-[radial-gradient(ellipse_at_center,#1e293b,#0f172a)]'
                      : 'bg-[radial-gradient(ellipse_at_center,#111827,#030712)]'
                  }`}
                >
                  {/* Smoke clouds overlay in visible mode */}
                  {sensorMode === 'visible' && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center p-6 text-center">
                      <div className="rounded-2xl border border-white/20 bg-black/60 p-4 max-w-xs text-xs text-white/90">
                        <AlertTriangle size={24} className="text-orion mx-auto mb-2" />
                        <strong>DENSE SMOKE BLANKET</strong>
                        <p className="mt-1 text-white/70">
                          Optical sensors are blinded by aerosol smoke particles! Switch to Thermal Infrared to see the heat.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Thermal Infrared Mode Layer */}
                  {sensorMode === 'thermal' && (
                    <div className="absolute inset-0 p-6">
                      <div className="flex justify-between text-[11px] font-mono text-rose-400/80">
                        <span>BAND: 3.75 µm THERMAL CHANNELS</span>
                        <span>CLICK FIRE CORES TO PINPOINT</span>
                      </div>

                      {/* Hotspot 1 */}
                      <button
                        onClick={() => handleFireClick(1)}
                        className={`absolute top-[28%] left-[24%] h-14 w-14 rounded-full flex items-center justify-center transition-all ${
                          foundFires.includes(1)
                            ? 'bg-signal-deep/40 border-2 border-signal text-white'
                            : 'bg-rose-500/40 border-2 border-rose-500 animate-ping text-rose-200'
                        }`}
                      >
                        <Flame size={20} className={foundFires.includes(1) ? 'text-signal-bright' : 'text-rose-400'} />
                      </button>

                      {/* Hotspot 2 */}
                      <button
                        onClick={() => handleFireClick(2)}
                        className={`absolute top-[62%] left-[68%] h-14 w-14 rounded-full flex items-center justify-center transition-all ${
                          foundFires.includes(2)
                            ? 'bg-signal-deep/40 border-2 border-signal text-white'
                            : 'bg-rose-500/40 border-2 border-rose-500 animate-ping text-rose-200'
                        }`}
                      >
                        <Flame size={20} className={foundFires.includes(2) ? 'text-signal-bright' : 'text-rose-400'} />
                      </button>

                      {/* Hotspot 3 */}
                      <button
                        onClick={() => handleFireClick(3)}
                        className={`absolute top-[40%] left-[52%] h-14 w-14 rounded-full flex items-center justify-center transition-all ${
                          foundFires.includes(3)
                            ? 'bg-signal-deep/40 border-2 border-signal text-white'
                            : 'bg-rose-500/40 border-2 border-rose-500 animate-ping text-rose-200'
                        }`}
                      >
                        <Flame size={20} className={foundFires.includes(3) ? 'text-signal-bright' : 'text-rose-400'} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GAME 3: ALBEDO ICE SHIELD SIMULATION */}
      {activeGame === 'albedo' && (
        <div className="liquid-glass-card mt-8 rounded-3xl p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-lg bg-orion-deep/10 px-3 py-1 text-xs font-mono text-orion-bright border border-orion/20">
                CASE FILE 03 · CRYOSPHERE FEEDBACK EXPERIMENT
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-white">
                The Polar Ice Mirror (Albedo Effect)
              </h3>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                Earth has a natural sun shield: bright polar sea ice! White ice reflects up to <strong className="text-white">85% of solar radiation</strong> right back out to space. But when ice melts into dark open water, the ocean absorbs <strong className="text-orion-bright">90% of heat</strong>.
              </p>

              {/* Interactive Slider */}
              <div className="pt-4 space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/60">Polar Ice Cover Percentage:</span>
                  <span className="font-bold text-orion-bright text-sm">{icePercent}% Ice Cover</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={icePercent}
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    setIcePercent(val)
                    if (val < 25 && !badges.albedo) {
                      setBadges((prev) => ({ ...prev, albedo: true }))
                      triggerConfetti()
                    }
                  }}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
                />
                <div className="flex justify-between text-[11px] font-mono text-white/40">
                  <span>Melting Crisis (5%)</span>
                  <span>Healthy Shield (95%)</span>
                </div>
              </div>

              {/* Feedback Summary */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">Solar Energy Reflected to Space:</span>
                  <span className="font-mono text-orion-bright font-bold">{Math.round(icePercent * 0.85)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Solar Heat Absorbed by Water:</span>
                  <span className="font-mono text-rose-400 font-bold">{Math.round(100 - icePercent * 0.85)}%</span>
                </div>
                <p className="text-white/70 pt-2 border-t border-white/10">
                  {icePercent < 30 ? (
                    <span className="text-rose-300">
                      ⚠️ Low Albedo Alert: Earth is absorbing massive solar heat, accelerating sea level rise in coastal deltas like Barisal!
                    </span>
                  ) : (
                    <span className="text-signal-bright">
                      ✓ High Albedo Mirror active: White ice cools the planet by bouncing sunlight away.
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Interactive Visual Gauge */}
            <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 text-center space-y-6 shadow-inner">
              <div className="text-xs uppercase font-mono tracking-widest text-orion-bright/80">
                Earth Surface Temperature Simulation
              </div>

              {/* Sunbeam Reflection Graphic */}
              <div className="relative mx-auto h-44 w-44 rounded-full border-4 border-orion/30 flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: `rgb(${Math.round(20 + (100 - icePercent) * 1.5)}, ${Math.round(40 + icePercent * 0.5)}, ${Math.round(60 + icePercent)})`,
                }}
              >
                <div className="text-center z-10">
                  <div className="text-3xl font-bold font-mono text-white">
                    {(14 + (100 - icePercent) * 0.05).toFixed(1)} °C
                  </div>
                  <div className="text-[10px] font-mono text-white/70 uppercase">Avg Global Temp</div>
                </div>
              </div>

              <div className="text-xs font-mono text-white/50">
                Slide below 25% to trigger the Cryosphere Guardian Badge!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GAME 4: FINAL CERTIFICATION QUIZ */}
      {activeGame === 'quiz' && (
        <div className="liquid-glass-card mt-8 rounded-3xl p-6 sm:p-10">
          {!quizFinished ? (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-signal-bright">
                  QUESTION {quizStep + 1} OF {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs font-mono text-white/60">
                  SCORE: {score}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl text-white">
                {QUIZ_QUESTIONS[quizStep].question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizStep].options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx
                  const isCorrect = idx === QUIZ_QUESTIONS[quizStep].correct

                  let btnStyle = 'border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.08]'
                  if (selectedAnswer !== null) {
                    if (isCorrect) {
                      btnStyle = 'border-signal bg-signal-deep/20 text-signal-ice'
                    } else if (isSelected) {
                      btnStyle = 'border-rose-400 bg-rose-500/20 text-rose-200'
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleQuizAnswer(idx)}
                      className={`w-full text-left rounded-2xl p-4 text-xs sm:text-sm font-medium transition-all border ${btnStyle}`}
                    >
                      <span className="font-mono text-xs text-white/40 mr-2.5">[{idx + 1}]</span>
                      {opt}
                    </button>
                  )
                })}
              </div>

              {selectedAnswer !== null && (
                <div className="rounded-xl border border-white/15 bg-white/[0.03] backdrop-blur-md p-4 text-xs text-white/80 font-mono animate-fadeIn">
                  💡 <strong>Analysis:</strong> {QUIZ_QUESTIONS[quizStep].explanation}
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="text-center max-w-xl mx-auto py-8 space-y-5">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-signal bg-signal-deep/20 text-signal-bright shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                <Trophy size={40} />
              </div>
              <h3 className="font-display text-3xl text-white">
                MISSION ACCOMPLISHED!
              </h3>
              <p className="text-sm text-white/70">
                You scored <strong className="text-signal">{score} out of {QUIZ_QUESTIONS.length}</strong>! You have officially proven your trend detective skills in planetary climate data.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <button
                  onClick={() => setLicenseOpen(true)}
                  className="liquid-glass-pill rounded-full px-7 py-3 text-xs sm:text-sm font-semibold text-white transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)]"
                >
                  View Official Detective License
                </button>
                <button
                  onClick={restartQuiz}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs sm:text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw size={15} />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
            </div>
          }
          secondContent={
            <div className="w-full h-full overflow-y-auto p-2 sm:p-4 custom-scrollbar flex items-center justify-center">
              <PixelArcadeGame onExitToLab={() => setIsPixelVibeMode(false)} />
            </div>
          }
        />
      </div>

      {/* Official Junior Detective License Dialog */}
      <Dialog open={licenseOpen} onOpenChange={setLicenseOpen}>
        <DialogContent className="max-w-lg border-white/15 bg-[#0a0a10]/98 text-white backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-orion flex items-center gap-2">
              <Award size={22} />
              NASA SPACE APPS 2026 OFFICIAL CERTIFICATE
            </DialogTitle>
            <DialogDescription className="text-white/60 text-xs">
              Be An Earth System Trend Detective · Team Orion Space (Barisal, BD)
            </DialogDescription>
          </DialogHeader>

          {/* Printable License Card */}
          <div className="mt-4 rounded-2xl border border-orion/40 bg-gradient-to-br from-[#0c182b] to-[#080d18] p-6 text-left relative overflow-hidden shadow-2xl">
            <div className="absolute right-4 top-4 opacity-10">
              <Trophy size={120} />
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-orion-bright">
                  Global Challenge Division
                </span>
                <h4 className="font-display text-lg text-white">ORION JUNIOR DETECTIVE</h4>
              </div>
              <Badge className="bg-orion text-black font-mono text-[10px] font-semibold">
                OFFICIALLY CERTIFIED
              </Badge>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/50">Investigator Rank:</span>
                <span className="font-semibold text-white">Senior Trend Analyst · Grade 1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Primary Finding:</span>
                <span className="font-mono text-orion-bright">Barisal Coast (+0.40 °C/dec)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Statistical Test:</span>
                <span className="font-mono text-signal">Mann-Kendall p = 0.00007</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Authorizing Body:</span>
                <span className="font-semibold text-white">NASA Space Apps Challenge 2026</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-white/40 font-mono">
              <span>DOC ID: OS-NASA-2026-CERT</span>
              <span>BARISAL, BANGLADESH</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.section>
  )
}
