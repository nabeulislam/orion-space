import { Link } from 'react-router'
import { Github, Globe, MapPin, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react'

export default function Contact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="relative mt-24 border-t border-white/12 bg-[#060812]/95 backdrop-blur-3xl shadow-[0_-30px_70px_rgba(0,0,0,0.9)] text-white">
      {/* Specular top rim highlight (Apple Glass chamfer) */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 md:grid-cols-12 lg:gap-16">
          {/* Brand & Mission column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif-it text-2xl sm:text-3xl font-semibold tracking-wide text-white">
                orion space
              </span>
              <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-sky-300">
                2026 Edition
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-slate-300 font-normal">
              Be An Earth System Trend Detective. Autonomous planetary telemetry, NASA reanalysis data, and interactive STEAM cases built for NASA Space Apps Challenge 2026.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>NASA POWER & MERRA-2 TELEMETRY ONLINE</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 text-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
              Mission Modules
            </p>
            <ul className="space-y-3 font-normal">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>Home & Orbit</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/dossiers" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>Intelligence Dossiers</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>Earth Detective Academy</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/cockpit" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>Agent Telemetry Cockpit</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between group">
                  <span>About & Proof Methodology</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/agent" className="text-sky-300 hover:text-sky-200 transition-colors flex items-center justify-between group font-medium">
                  <span>Launch 3D Digital Twin</span>
                  <Compass size={14} className="text-sky-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Team with Apple Squircle Icons */}
          <div className="md:col-span-4 text-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
              Verification & Attribution
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-3.5 text-slate-200">
                <div className="apple-icon-badge h-9 w-9 flex-none text-sky-400">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="font-medium text-white text-xs">Event Location</div>
                  <div className="text-xs text-slate-400">Barisal, Bangladesh</div>
                </div>
              </li>

              <li>
                <a
                  href="https://github.com/nabeulislam/orion-space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 text-slate-200 hover:text-white group transition-colors"
                >
                  <div className="apple-icon-badge h-9 w-9 flex-none text-sky-400 group-hover:text-white">
                    <Github size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-white text-xs flex items-center gap-1.5">
                      <span>GitHub Repository</span>
                      <ArrowUpRight size={12} className="text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-xs text-slate-400 font-mono">github.com/nabeulislam/orion-space</div>
                  </div>
                </a>
              </li>

              <li className="flex items-center gap-3.5 text-slate-200">
                <div className="apple-icon-badge h-9 w-9 flex-none text-sky-400">
                  <Globe size={16} />
                </div>
                <div>
                  <div className="font-medium text-white text-xs">Challenge Entry</div>
                  <div className="text-xs text-slate-400">NASA Space Apps Challenge 2026</div>
                </div>
              </li>

              <li className="flex items-center gap-3.5 text-slate-200">
                <div className="apple-icon-badge h-9 w-9 flex-none text-sky-400">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div className="font-medium text-white text-xs">Open Source License</div>
                  <div className="text-xs text-slate-400">MIT · Peer Verifiable Codebase</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with back-to-top */}
        <div className="mt-14 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            © 2026 Team Orion Space · Developed for NASA Space Apps Challenge Barisal.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors font-mono cursor-pointer"
          >
            <span>Back to Orbit</span>
            <ArrowUpRight size={13} className="-rotate-45" />
          </button>
        </div>
      </div>
    </footer>
  )
}
