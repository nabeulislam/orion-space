import {
  Github,
  ExternalLink,
  Sparkles,
  MapPin,
  Code2,
  FileCheck2,
  ShieldCheck
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import SpotlightCard from '@/components/ui/SpotlightCard'

export default function MissionControl() {
  return (
    <footer id="mission" className="relative border-t border-sky-500/20 bg-[#020617] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        {/* Top Challenge Attribution Card */}
        <SpotlightCard className="mb-16 p-8 sm:p-12 border-sky-500/30 bg-[#040d24]/90">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-sky-500 text-black font-semibold text-xs">
                  NASA Space Apps Challenge 2026
                </Badge>
                <Badge variant="outline" className="border-sky-400/40 text-sky-300 text-xs">
                  Local Event: Barisal, Bangladesh
                </Badge>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl text-white">
                PROJECT ORION SPACE
              </h3>

              <p className="font-serif-it text-lg sm:text-xl text-sky-200/90">
                Be An Earth System Trend Detective!
              </p>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl">
                Built to solve the NASA challenge by discovering that 25 years of NASA MERRA-2 yearly temperature averages hid a dramatic +0.40 °C/decade late-monsoon warming in Bangladesh, validated by two-sided Mann-Kendall and Benjamini-Hochberg False Discovery Rate corrections.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-white/60">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-sky-400" />
                  Barisal, Bangladesh
                </span>
                <span className="flex items-center gap-1.5">
                  <Code2 size={14} className="text-emerald-400" />
                  Lead: Md Mushfiqur Rahim
                </span>
                <span className="flex items-center gap-1.5">
                  <FileCheck2 size={14} className="text-amber-400" />
                  Open Source MIT License
                </span>
              </div>
            </div>

            {/* Quick Action Links for Judges */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href="/pitch/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-amber-400/40 bg-amber-500/15 p-4 text-sm font-semibold text-amber-200 transition-all hover:bg-amber-500/25 hover:shadow-[0_0_24px_rgba(251,191,36,0.3)]"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles size={18} className="text-amber-400" />
                  <span>Launch Official Pitch Deck</span>
                </div>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://github.com/MD-Mushfiqur123/orion-space"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/5 p-4 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30"
              >
                <div className="flex items-center gap-2.5">
                  <Github size={18} className="text-sky-400" />
                  <span>GitHub Repository</span>
                </div>
                <ExternalLink size={16} />
              </a>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-[11px] text-white/60 space-y-1">
                <div className="text-white/80 font-semibold">Reproduce Statistical Pipeline:</div>
                <div className="text-sky-300 select-all">pip install numpy scipy</div>
                <div className="text-sky-300 select-all">python3 analysis/trend_analysis.py</div>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* 3-Column Footer Information */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          {/* Column 1: Science & Method */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-widest text-sky-400">
              Statistical Methodology
            </h4>
            <ul className="space-y-2 text-white/65">
              <li>• Two-sided Mann-Kendall Trend Test</li>
              <li>• Theil-Sen Robust Pairwise Slope</li>
              <li>• Benjamini-Hochberg FDR (q = 0.05)</li>
              <li>• Trend-Free Pre-Whitening (Yue et al. 2002)</li>
              <li>• 442 Series Tested (34 Cells × 13 Months)</li>
            </ul>
          </div>

          {/* Column 2: NASA Data Providers */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-widest text-sky-400">
              NASA Data Providers
            </h4>
            <ul className="space-y-2 text-white/65">
              <li>• NASA GSFC GMAO MERRA-2 (T2M)</li>
              <li>• NASA POWER API v2.10 (NASA LaRC)</li>
              <li>• NASA EOSDIS GIBS WMTS (MODIS / VIIRS)</li>
              <li>• NASA FIRMS Active Thermal Anomalies</li>
              <li>• Natural Earth Geographic Cartography</li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-widest text-sky-400">
              System Modules
            </h4>
            <ul className="space-y-2 text-white/65">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Orbital Hero & Space Overview
                </a>
              </li>
              <li>
                <a href="#dossiers" className="hover:text-white transition-colors">
                  Intelligence Dossiers (Folder Style)
                </a>
              </li>
              <li>
                <a href="#academy" className="hover:text-white transition-colors">
                  Earth Detective STEAM Academy
                </a>
              </li>
              <li>
                <a href="#cockpit" className="hover:text-white transition-colors">
                  Autonomous Agent Cockpit & Recharts
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Challenge Ethics & Verification */}
          <div className="space-y-3">
            <h4 className="font-semibold uppercase tracking-widest text-sky-400">
              Judges Verification
            </h4>
            <p className="leading-relaxed text-white/65">
              Orion Space is built with scientific integrity. We report air temperature trends only and do not extrapolate unverified claims. The entire analysis is 100% open-source and reproducible.
            </p>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck size={14} />
              <span>Peer-Verifiable Codebase</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40 font-mono">
          <div>
            © 2026 Project Orion Space · Team Orion Space · Barisal, Bangladesh
          </div>
          <div>
            NASA Space Apps Challenge 2026 · Be An Earth System Trend Detective!
          </div>
        </div>
      </div>
    </footer>
  )
}
