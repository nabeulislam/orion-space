import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack'
import { motion } from 'framer-motion'
import {
  Github,
  ExternalLink,
  Sparkles,
  MapPin,
  Code2,
  FileCheck2,
  ShieldCheck
} from 'lucide-react'

export default function MissionControl() {
  return (
    <motion.section
      id="mission"
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        {/* Top Challenge Attribution Card */}
        <div className="liquid-glass-card mb-16 rounded-3xl p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 border border-white/15 px-3.5 py-1 font-mono text-xs text-white/90">
                  NASA Space Apps Challenge 2026
                </span>
                <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 font-mono text-xs text-sky-300">
                  Local Event: Barisal, Bangladesh
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl text-white">
                PROJECT ORION SPACE
              </h3>

              <p className="font-serif-it text-lg sm:text-xl text-white/80">
                Be An Earth System Trend Detective!
              </p>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl font-normal">
                Built to solve the NASA challenge by discovering that 25 years of NASA MERRA-2 yearly temperature averages hid a +0.40 °C/decade late-monsoon warming in Bangladesh, validated by two-sided Mann-Kendall and Benjamini-Hochberg False Discovery Rate corrections.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-white/60">
                <span className="flex items-center gap-1.5 text-white/75">
                  <MapPin size={14} className="text-[#38bdf8]" />
                  Barisal, Bangladesh
                </span>
                <span className="flex items-center gap-1.5 text-white/75">
                  <Code2 size={14} className="text-[#38bdf8]" />
                  Lead: Md Mushfiqur Rahim
                </span>
                <span className="flex items-center gap-1.5 text-white/75">
                  <FileCheck2 size={14} className="text-[#38bdf8]" />
                  Open Source MIT License
                </span>
              </div>
            </div>

            {/* Quick Action Links for Judges */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href={`${import.meta.env.BASE_URL}pitch/index.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-pill flex items-center justify-between rounded-2xl p-4 text-sm font-semibold text-white"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles size={18} className="text-white/80" />
                  <span>Launch Official Pitch Deck</span>
                </div>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://github.com/nabeulislam/orion-space"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-pill flex items-center justify-between rounded-2xl p-4 text-sm font-semibold text-white/80 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <Github size={18} className="text-white/80" />
                  <span>GitHub Repository</span>
                </div>
                <ExternalLink size={16} />
              </a>

              <div className="rounded-2xl border border-white/10 bg-black/45 p-4 font-mono text-[11px] text-white/60 space-y-1">
                <div className="text-white/80 font-semibold">Reproduce Statistical Pipeline:</div>
                <div className="text-sky-300 select-all">pip install numpy scipy</div>
                <div className="text-sky-300 select-all">python3 analysis/trend_analysis.py</div>
              </div>
            </div>
          </div>
        </div>

              {/* React Bits ScrollStack: 4 System Verification Pillars */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-sky-400">
              System Architecture & Methodology
            </span>
            <h3 className="font-display text-2xl sm:text-4xl text-white mt-1">
              Scientific Verification Stack
            </h3>
          </div>

          <ScrollStack
            itemDistance={90}
            itemStackDistance={20}
            stackPosition="20%"
            itemScale={0.04}
            useWindowScroll={true}
            className="w-full"
          >
            <ScrollStackItem>
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                      PILLAR 01 · 25-YEAR REANALYSIS
                    </span>
                    <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[10px] text-sky-300">
                      NASA POWER v2.10
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">NASA MERRA-2 Atmospheric Reanalysis</h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                    Processed 25 years (2001–2025) of 2-metre air temperature across 34 grid cells in Bangladesh via NASA POWER API v2.10. Disaggregated by individual month to uncover hidden seasonal trends obscured by annual means.
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-sky-300/80 pt-2 border-t border-white/10">
                  <span>34 Grid Cells</span>
                  <span>•</span>
                  <span>Monthly Disaggregation</span>
                  <span>•</span>
                  <span>2001–2025</span>
                </div>
              </div>
            </ScrollStackItem>
            <ScrollStackItem>
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      PILLAR 02 · STATISTICAL RIGOR
                    </span>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-300">
                      FDR q=0.05 PASS
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">Mann-Kendall & Benjamini-Hochberg FDR Protocol</h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                    Tested 442 separate climate series. Corrected for multiple comparisons using Benjamini-Hochberg False Discovery Rate at q = 0.05. Barisal coast September warming reaches +0.40 °C/decade with p = 0.00007.
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-emerald-300/80 pt-2 border-t border-white/10">
                  <span>442 Series Evaluated</span>
                  <span>•</span>
                  <span>Theil-Sen Median Slope</span>
                  <span>•</span>
                  <span>p = 0.00007</span>
                </div>
              </div>
            </ScrollStackItem>
            <ScrollStackItem>
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                      PILLAR 03 · MULTI-SENSOR STREAMS
                    </span>
                    <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[10px] text-sky-300">
                      ORBITAL TELEMETRY
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">NASA EOSDIS GIBS & FIRMS Active Infrared</h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                    Real-time orbital telemetry streaming true-color MODIS/VIIRS cloud reflectance alongside VIIRS 375m active thermal anomaly fires, validating land-surface observations against atmospheric thermal anomalies.
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-sky-300/80 pt-2 border-t border-white/10">
                  <span>VIIRS 375m Resolution</span>
                  <span>•</span>
                  <span>Thermal Band 4 (3.75 μm)</span>
                  <span>•</span>
                  <span>EOSDIS Tiles</span>
                </div>
              </div>
            </ScrollStackItem>
            <ScrollStackItem>
              <div className="flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      PILLAR 04 · OPEN SCIENCE
                    </span>
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300">
                      100% REPRODUCIBLE
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">Fully Reproducible Python Pipeline</h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                    Every figure, table, and statistic can be reproduced with a single terminal command: <code className="text-cyan-300 bg-black/60 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">python3 analysis/trend_analysis.py</code>.
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-cyan-300/80 pt-2 border-t border-white/10">
                  <span>Open Source MIT</span>
                  <span>•</span>
                  <span>NumPy & SciPy</span>
                  <span>•</span>
                  <span>GitHub CI Automated</span>
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>

        {/* 4-Column Footer Information */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          {/* Column 1: Science & Method */}
          <div className="liquid-glass-card rounded-2xl p-6 space-y-3">
            <h4 className="font-semibold uppercase tracking-widest text-white/90 font-mono text-[11px]">
              Statistical Methodology
            </h4>
            <ul className="space-y-2 text-white/70 leading-relaxed">
              <li>• Two-sided Mann-Kendall Trend Test</li>
              <li>• Theil-Sen Median Slope Analysis</li>
              <li>• Benjamini-Hochberg FDR (q = 0.05)</li>
              <li>• Trend-Free Pre-Whitening (Yue et al. 2002)</li>
              <li>• 442 Series Tested (34 Cells × 13 Months)</li>
            </ul>
          </div>

          {/* Column 2: NASA Data Providers */}
          <div className="liquid-glass-card rounded-2xl p-6 space-y-3">
            <h4 className="font-semibold uppercase tracking-widest text-white/90 font-mono text-[11px]">
              NASA Data Providers
            </h4>
            <ul className="space-y-2 text-white/70 leading-relaxed">
              <li>• NASA GSFC GMAO MERRA-2 (T2M)</li>
              <li>• NASA POWER API v2.10 (NASA LaRC)</li>
              <li>• NASA EOSDIS GIBS WMTS (MODIS / VIIRS)</li>
              <li>• NASA FIRMS Active Thermal Anomalies</li>
              <li>• Natural Earth Geographic Cartography</li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="liquid-glass-card rounded-2xl p-6 space-y-3">
            <h4 className="font-semibold uppercase tracking-widest text-white/90 font-mono text-[11px]">
              System Modules
            </h4>
            <ul className="space-y-2 text-white/70 leading-relaxed">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Orbital Space Overview
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
                  Agent Telemetry Cockpit & Charts
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Challenge Ethics & Verification */}
          <div className="liquid-glass-card rounded-2xl p-6 space-y-3">
            <h4 className="font-semibold uppercase tracking-widest text-white/90 font-mono text-[11px]">
              Judges Verification
            </h4>
            <p className="leading-relaxed text-slate-300 font-normal">
              Orion Space is built with scientific integrity. We report air temperature trends only and do not extrapolate unverified claims. The entire analysis is 100% open-source and reproducible.
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck size={14} />
              <span>Peer-Verifiable Codebase</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
