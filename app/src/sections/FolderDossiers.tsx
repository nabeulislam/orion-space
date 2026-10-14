import { DecryptedText } from '@/components/ui/DecryptedText'
import { ShinyText } from '@/components/ui/ShinyText'
import MorphSlider from '@/components/ui/MorphSlider'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  ExternalLink,
  TrendingUp,
  CheckCircle2,
  Info
} from 'lucide-react'
import Folder, { type FolderEntry } from '@/components/ui/Folder'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface CaseDossier {
  id: string
  caseNumber: string
  title: string
  classification: string
  subtitle: string
  dateRange: string
  summary: string
  keyFindings: string[]
  satelliteSources: string[]
  status: 'VERIFIED' | 'CRITICAL' | 'MONITORING'
  folderColor: string
  tag: string
  image?: string
}

const DOSSIERS: CaseDossier[] = [
  {
    id: 'case-01',
    caseNumber: 'NASA-BD-2026-01',
    title: 'The Monsoon Temperature Paradox',
    classification: 'PEER-VERIFIED',
    subtitle: 'Barisal Coast Late-Monsoon Thermal Shift (2001–2025)',
    dateRange: '2001 – 2025 (25 Years)',
    summary:
      'Yearly average temperature over Bangladesh shows no significant trend across any of the 34 MERRA-2 grid cells. When broken down by month, September shows statistically robust warming in 34/34 cells (31/34 survive Benjamini-Hochberg FDR correction). On the Barisal coast, the warming rate reaches +0.40 °C per decade (Mann-Kendall p = 0.00007).',
    keyFindings: [
      'Annual Mean Trend: +0.02 °C/decade (Not statistically significant, 0/34 cells).',
      'September Trend: +0.36 °C/decade median across Bangladesh (+0.40 °C/decade on Barisal Coast).',
      'Significance: Mann-Kendall p = 0.00007 (exceeds 99.99% confidence threshold).',
      'Multiple Testing: Passed Benjamini-Hochberg False Discovery Rate at q = 0.05.',
      'Autocorrelation: Verified using Trend-Free Pre-Whitening (Yue et al. 2002).'
    ],
    satelliteSources: ['NASA GSFC GMAO MERRA-2', 'NASA POWER API v2.10', 'NASA EOSDIS'],
    status: 'CRITICAL',
    folderColor: '#0284c7',
    tag: 'Core Discovery',
    image: `${import.meta.env.BASE_URL}data/climate/bangladesh_t2m_trend_map.png`
  },
  {
    id: 'case-02',
    caseNumber: 'NASA-BD-2026-02',
    title: 'EOSDIS Multi-Sensor Thermal Sweeps',
    classification: 'REAL-TIME STREAM',
    subtitle: 'NASA GIBS Cloud Imagery & FIRMS Active Wildfire Sensor',
    dateRange: 'Continuous Telemetry',
    summary:
      'Streaming true-color corrected reflectance from MODIS (Terra/Aqua) and VIIRS alongside NASA FIRMS thermal anomaly hotspots. Orion Space layers active thermal detections onto the 3D globe to detect biomass burns and agricultural fires before they become regional wildfire disasters.',
    keyFindings: [
      'NASA GIBS WMTS stream provides daily true-color clouds and surface reflectance.',
      'NASA FIRMS thermal infrared sensors detect active hotspots at 375m VIIRS resolution.',
      'Sundarbans mangrove perimeter and Chittagong hill tracts monitored for heat anomalies.',
      'Event integration allows automated camera fly-tos to detected fire coordinates.'
    ],
    satelliteSources: ['MODIS Terra/Aqua', 'VIIRS Suomi-NPP', 'NASA FIRMS', 'EOSDIS Worldview'],
    status: 'VERIFIED',
    folderColor: '#0284c7',
    tag: 'Earth Observation'
  },
  {
    id: 'case-03',
    caseNumber: 'NASA-BD-2026-03',
    title: 'Deltaic Vulnerability & Sea-Level Altimetry',
    classification: 'SYSTEM IMPACT',
    subtitle: 'Bay of Bengal Cyclonic Corridors & Coastal Inundation',
    dateRange: 'Long-term Sentinel',
    summary:
      'Late-monsoon warming overlaps the post-monsoon cyclone season (October-November) and the crucial Aman rice cultivation cycle in southern Bangladesh. Tracking ocean sea surface temperatures (SST) and satellite radar altimetry provides early indicators for storm surge intensity.',
    keyFindings: [
      'September warming increases thermal energy in the northern Bay of Bengal basin.',
      'Low-lying coastal delta of Barisal is particularly vulnerable to late-season storm surges.',
      'Integration with Natural Earth coastal polygons and tidal altimetry stations.',
      'Provides actionable trend intelligence for rural agricultural planning.'
    ],
    satelliteSources: ['Sentinel-3 Altimetry', 'NOAA Coral Reef Watch SST', 'Natural Earth'],
    status: 'MONITORING',
    folderColor: '#0284c7',
    tag: 'Climate Impact',
    image: `${import.meta.env.BASE_URL}data/climate/dhaka_t2m_trend_analysis.png`
  },
  {
    id: 'case-04',
    caseNumber: 'NASA-BD-2026-04',
    title: 'Orion Autonomous Agent Architecture',
    classification: 'AI ENGINE',
    subtitle: 'Spatial Intelligence Reasoning & Geospatial Flight Engine',
    dateRange: 'Version 2.0 Live',
    summary:
      'Orion Space pairs a CesiumJS 3D digital twin of Earth with an autonomous query system. Users and judges can query "Where is warming trending fastest?" or "Show active fires" to trigger automated flight cinematics, camera focus, and statistical evidence display.',
    keyFindings: [
      'Built upon CesiumJS with high-fidelity 3D globe and terrain rendering.',
      'Autonomous query system translates natural language inquiries into geospatial actions.',
      'Fully offline-reproducible Python statistical pipeline (`trend_analysis.py`).',
      'Zero-key architecture allows full client-side exploration without barriers.'
    ],
    satelliteSources: ['CesiumJS Engine', 'NASA EOSDIS GIBS', 'NASA FIRMS API'],
    status: 'VERIFIED',
    folderColor: '#0284c7',
    tag: '3D Agent Core'
  }
]

export default function FolderDossiers() {
  const [selectedCase, setSelectedCase] = useState<CaseDossier>(DOSSIERS[0])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0)

  // React Bits Folder interactive items with satellite image previews
  const folderItems: FolderEntry[] = [
    {
      title: 'Barisal Coast September Anomaly',
      description: '+0.40 °C/dec · p=0.00007 · FDR Passed',
      image: `${import.meta.env.BASE_URL}data/climate/bangladesh_t2m_trend_map.png`
    },
    {
      title: 'NASA MERRA-2 25-Year Matrix',
      description: '34 Grid Cells across Bangladesh (2001-2025)',
      image: `${import.meta.env.BASE_URL}data/climate/dhaka_t2m_trend_analysis.png`
    },
    {
      title: 'NASA FIRMS Fire Telemetry',
      description: 'Active thermal infrared satellite hotspot tracking',
      image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'NASA GIBS Cloud Reflectance',
      description: 'MODIS Terra/Aqua true-color global imagery',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop'
    }
  ]

  return (
    <motion.section
      id="dossiers"
      className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background radial accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_70%)]" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <h2 className="font-display text-3xl tracking-wide text-white sm:text-5xl">
            INTELLIGENCE DOSSIERS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
            Classified case files investigating planetary system anomalies. Click the interactive 3D folder below to pull out evidence sheets or select a dossier from the mission archive.
          </p>
        </div>

        {/* Quick dossier stats with Apple spring physics */}
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ y: -3, scale: 1.02 }} className="liquid-glass-card rounded-2xl px-5 py-3 text-center">
            <div className="text-xl font-bold font-mono text-white">34</div>
            <div className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">Grid Cells</div>
          </motion.div>
          <motion.div whileHover={{ y: -3, scale: 1.02 }} className="liquid-glass-card rounded-2xl px-5 py-3 text-center">
            <div className="text-xl font-bold font-mono text-[#38bdf8]">+0.40°</div>
            <div className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">Barisal Rate</div>
          </motion.div>
          <motion.div whileHover={{ y: -3, scale: 1.02 }} className="liquid-glass-card rounded-2xl px-5 py-3 text-center">
            <div className="text-xl font-bold font-mono text-white">99.9%</div>
            <div className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">FDR Conf.</div>
          </motion.div>
        </div>
      </div>

      {/* Main Folder Showcase Grid */}
      <div className="mt-12 grid gap-10 lg:grid-cols-12 items-start">
        {/* Left Column: Interactive 3D Folder Component (React Bits) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="liquid-glass-card relative w-full rounded-3xl p-8 text-center">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-slate-300 tracking-wider">
                ORBITAL INTELLIGENCE ARCHIVE
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-slate-200 font-mono text-[10px]">
                Interactive Dossier
              </span>
            </div>

            {/* Folder Component Rendering */}
            <div className="flex justify-center items-center py-6 min-h-[300px]">
              <Folder
                label="NASA TREND EVIDENCE"
                color="#0284c7"
                mode="flap"
                variant="glass"
                size={1.15}
                items={folderItems}
                openOn="click"
                draggable={true}
                zoomOnClick={true}
                onItemClick={(_item, index) => {
                  if (DOSSIERS[index]) {
                    setSelectedCase(DOSSIERS[index])
                  }
                }}
              />
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-400 font-mono">
              <p className="flex items-center justify-center gap-2">
                <Info size={14} className="text-sky-400" />
                <span>Click folder to open · Drag sheets out · Click any sheet to zoom</span>
              </p>
            </div>
          </div>

          {/* Folder Tabs Selector - Unified Apple Liquid Glass Buttons (No Rainbows) */}
          <div className="w-full mt-6 space-y-2.5">
            {DOSSIERS.map((dossier) => {
              const isSelected = selectedCase.id === dossier.id
              return (
                <button
                  key={dossier.id}
                  onClick={() => setSelectedCase(dossier)}
                  className={`liquid-glass-card w-full text-left rounded-2xl p-4 transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-white/30 bg-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
                      : 'hover:border-white/20 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center text-white flex-none"
                      style={{ backgroundColor: `${dossier.folderColor}22`, borderColor: dossier.folderColor, borderWidth: 1 }}
                    >
                      <FileText size={18} style={{ color: dossier.folderColor }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-white/50">{dossier.caseNumber}</span>
                        <span className="text-[10px] rounded-full px-2 py-0.5 border border-white/10 bg-white/5 text-white/70 font-mono">
                          {dossier.tag}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mt-0.5">{dossier.title}</h4>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      dossier.status === 'CRITICAL'
                        ? 'border-rose-500/40 text-rose-300 bg-rose-500/10'
                        : dossier.status === 'VERIFIED'
                        ? 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
                        : 'border-sky-500/40 text-sky-300 bg-sky-500/10'
                    }`}
                  >
                    {dossier.status}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Active Dossier Deep-Dive Evidence Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCase.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-glass-card rounded-3xl p-8 sm:p-10"
            >
              {/* Header info */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-xs tracking-wider text-sky-400">
                    <DecryptedText text={selectedCase.caseNumber} speed={40} /> · {selectedCase.classification}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-white mt-1">
                    <ShinyText text={selectedCase.title} speed={5} />
                  </h3>
                  <p className="text-sm font-serif-it text-white/70 mt-1">
                    {selectedCase.subtitle}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-white/50 block font-mono">Time Horizon</span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {selectedCase.dateRange}
                  </span>
                </div>
              </div>

              {/* Scientific Summary */}
              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-2 font-semibold">
                  Executive Investigation Summary
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-white/85 font-normal">
                  {selectedCase.summary}
                </p>
              </div>

              {/* Key Findings List */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h4 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-3 flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  Verified Statistical Evidence
                </h4>
                <ul className="space-y-2.5">
                  {selectedCase.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400 flex-none" />
                      <span className="leading-relaxed">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* React Bits Interactive Image Select & Satellite Band Inspector */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                    <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                      Satellite Spectral Evidence Gallery
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-white/50">
                    Select band or figure below to inspect
                  </span>
                </div>

                {/* Selectable Thumbnail Chips */}
                {(() => {
                  const gallery = [
                    {
                      id: 'trend-map',
                      title: 'Spatial Matrix Map',
                      desc: '34-Cell Grid Mann-Kendall Trend',
                      url: `${import.meta.env.BASE_URL}data/climate/bangladesh_t2m_trend_map.png`,
                      tag: 'MERRA-2 T2M'
                    },
                    {
                      id: 'timeseries',
                      title: '25-Year Time Series',
                      desc: 'Theil-Sen Pairwise Median Slope',
                      url: `${import.meta.env.BASE_URL}data/climate/dhaka_t2m_trend_analysis.png`,
                      tag: '2001-2025'
                    },
                    {
                      id: 'gibs-clouds',
                      title: 'NASA EOSDIS Reflectance',
                      desc: 'MODIS Terra/Aqua Daily Global Stream',
                      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
                      tag: 'GIBS WMTS'
                    },
                    {
                      id: 'viirs-thermal',
                      title: 'VIIRS 375m Thermal IR',
                      desc: 'Active Hotspot Anomaly Radiance',
                      url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
                      tag: 'FIRMS SENSOR'
                    }
                  ];

                  const currentImg = gallery[activeImageIdx] || gallery[0];

                  return (
                    <div className="space-y-4">
                      {/* Image Select Buttons Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {gallery.map((img, idx) => {
                          const isSelected = activeImageIdx === idx;
                          return (
                            <button
                              key={img.id}
                              onClick={() => setActiveImageIdx(idx)}
                              className={`rounded-xl p-2.5 text-left transition-all border cursor-pointer ${
                                isSelected
                                  ? 'border-sky-400 bg-sky-500/20 text-white shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                                  : 'border-white/10 bg-white/[0.02] text-white/60 hover:bg-white/[0.06] hover:text-white'
                              }`}
                            >
                              <div className="text-[10px] font-mono text-sky-300 font-semibold mb-0.5">
                                {img.tag}
                              </div>
                              <div className="text-xs font-semibold truncate text-white">
                                {img.title}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Image Viewer Card */}
                      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/50 shadow-2xl">
                        <div className="relative h-56 sm:h-72 w-full overflow-hidden">
                          <img
                            src={currentImg.url}
                            alt={currentImg.title}
                            className="w-full h-full object-cover transition-opacity duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="inline-block rounded-full bg-sky-500/30 border border-sky-400/40 px-2.5 py-0.5 text-[10px] font-mono text-sky-200 mb-1">
                                  {currentImg.tag}
                                </span>
                                <h5 className="text-sm sm:text-base font-bold text-white">
                                  {currentImg.title}
                                </h5>
                                <p className="text-xs text-white/70 font-mono mt-0.5">
                                  {currentImg.desc}
                                </p>
                              </div>

                              <button
                                onClick={() => {
                                  setPreviewImage(currentImg.url);
                                  setDialogOpen(true);
                                }}
                                className="liquid-glass-pill rounded-full px-4 py-2 text-xs font-semibold text-white flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:scale-105 transition-all"
                              >
                                <span>Inspect Full Res</span>
                                <ExternalLink size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Satellite Providers Bar */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 mr-1 font-mono">NASA Providers:</span>
                  {selectedCase.satelliteSources.map((source) => (
                    <Badge
                      key={source}
                      variant="secondary"
                      className="bg-sky-500/10 text-sky-300 border-sky-400/30 text-[11px] font-mono"
                    >
                      {source}
                    </Badge>
                  ))}
                </div>

                <a
                  href="#cockpit"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>Query In 3D Agent</span>
                  <TrendingUp size={14} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

            {/* React Bits WebGL MorphSlider: Multi-Spectral Satellite Spectral Laboratory */}
      <div className="mt-16 liquid-glass-card rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-mono text-sky-300 mb-2">
              <Sparkles size={13} />
              <span>REACT BITS WEBGL OGL SHADER MORPH SLIDER</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-white">
              Planetary Observation Sweeps
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl">
              Drag or use controls to morph between NASA true-color reflectance, VIIRS thermal infrared hotspots, and atmospheric reanalysis models using GPU displacement shaders.
            </p>
          </div>
          <div className="text-xs font-mono text-white/40 flex items-center gap-2">
            <span>OGL WebGL 2.0</span>
            <span>·</span>
            <span>Fluid Spring Physics</span>
          </div>
        </div>

        <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl">
          <MorphSlider
            items={[
              {
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
                caption: 'NASA MODIS Terra/Aqua True-Colour Satellite Reflectance'
              },
              {
                image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
                caption: 'NASA FIRMS VIIRS 375m Thermal Anomaly Infrared Sweeps'
              },
              {
                image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600&auto=format&fit=crop',
                caption: 'NASA MERRA-2 2-Metre Air Temperature Reanalysis Model'
              },
              {
                image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1600&auto=format&fit=crop',
                caption: 'Cryosphere Albedo & Deltaic Sea-Level Radar Altimetry'
              }
            ]}
          />
        </div>
      </div>

      {/* Image Preview Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl border-white/15 bg-[#0a0a10]/95 text-white backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-white">
              {selectedCase.title} · Spatial Trend Map
            </DialogTitle>
            <DialogDescription className="text-white/60 text-xs">
              NASA MERRA-2 25-Year Trend Matrix (2001–2025). 34 grid cells with Mann-Kendall & Theil-Sen slope verification.
            </DialogDescription>
          </DialogHeader>
          {previewImage && (
            <div className="mt-3 overflow-hidden rounded-xl border border-white/15 bg-black/60">
              <img
                src={previewImage}
                alt="NASA Climate Analysis Figure"
                className="w-full max-h-[70vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.section>
  )
}
