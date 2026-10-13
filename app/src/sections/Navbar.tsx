import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Dossiers', path: '/dossiers' },
  { label: 'Games', path: '/games' },
  { label: 'Cockpit', path: '/cockpit' },
  { label: 'About', path: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060608]/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-3 sm:py-4'
          : 'py-5 sm:py-7 bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10">
        {/* Brand logo - pure minimalist lowercase serif matching reference */}
        <Link
          to="/"
          className="font-serif-it text-2xl sm:text-3xl font-semibold tracking-wide text-white transition-opacity hover:opacity-80"
        >
          orion space
        </Link>

        {/* Center Desktop Navigation */}
        <ul className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className={`relative py-1 transition-colors hover:text-white ${
                    isActive ? 'text-white font-semibold' : 'text-white/65'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right Action Button - Immersive 3D Cesium Project */}
        <div className="hidden md:flex items-center">
          <Link
            to="/agent"
            className="liquid-glass-pill group inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-medium text-white transition-all hover:scale-105 shadow-[0_0_24px_rgba(56,189,248,0.2)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Launch 3D Agent</span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="mx-5 mt-3 rounded-2xl border border-white/10 bg-[#060608]/95 p-6 backdrop-blur-2xl md:hidden shadow-2xl">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`block py-1 text-base font-medium transition-colors ${
                      isActive ? 'text-white font-semibold' : 'text-white/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 pt-4 border-t border-white/10">
            <Link
              to="/agent"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#38bdf8]/30 bg-gradient-to-r from-blue-600/20 to-sky-600/20 py-2.5 text-sm font-medium text-white shadow-lg"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Launch 3D Agent</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
