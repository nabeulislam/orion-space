import { Link } from 'react-router'
import { Github, Globe, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <footer id="contact" className="relative border-t border-white/10 bg-transparent">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-serif-it text-2xl font-semibold text-white">orion space</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
            Be An Earth System Trend Detective. NASA Space Apps Challenge 2026 entry developed by Team Orion Space.
          </p>
        </div>

        <div className="text-sm">
          <p className="font-semibold uppercase tracking-widest text-white/40">Navigation</p>
          <ul className="mt-4 space-y-2.5 text-white/70">
            <li>
              <Link to="/" className="transition-colors hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/dossiers" className="transition-colors hover:text-white">Intelligence Dossiers</Link>
            </li>
            <li>
              <Link to="/games" className="transition-colors hover:text-white">Earth Detective Games</Link>
            </li>
            <li>
              <Link to="/cockpit" className="transition-colors hover:text-white">Agent Telemetry Cockpit</Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-white">About & Methodology</Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold uppercase tracking-widest text-white/40">Project & Team</p>
          <ul className="mt-4 space-y-3 text-white/70">
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-sky-400" />
              <span>Barisal, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Github size={16} className="text-sky-400" />
              <a
                href="https://github.com/nabeulislam/orion-space"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                github.com/nabeulislam/orion-space
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Globe size={16} className="text-sky-400" />
              <span>NASA Space Apps Challenge 2026</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.07] py-6 text-center text-xs text-white/40">
        © 2026 Orion Space · Team Orion Space, Barisal, BD · NASA Space Apps Challenge
      </div>
    </footer>
  )
}
