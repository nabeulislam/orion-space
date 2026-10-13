import { useState } from 'react'
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
    folderColor: '#f07832',
    tag: 'Core Discovery',
    image: '/data/climate/bangladesh_t2m_trend_map.png'
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
    folderColor: '#ff8c42',
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
    folderColor: '#e05a2b',
    tag: 'Climate Impact',
    image: '/data/climate/dhaka_t2m_trend_analysis.png'
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
    folderColor: '#ffa25e',
    tag: '3D Agent Core'
  }
]

export default function FolderDossiers() {
  const [selectedCase, setSelectedCase] = useState<CaseDossier>(DOSSIERS[0])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // React Bits Folder interactive items
  const folderItems: FolderEntry[] = [
    {
      title: 'Barisal Coast September Anomaly',
      description: '+0.40 °C/dec · p=0.00007 · FDR Passed'
    },
    {
      title: 'NASA MERRA-2 25-Year Matrix',
      description: '34 Grid Cells across Bangladesh (2001-2025)'
    },
    {
      title: 'NASA FIRMS Fire Telemetry',
      description: 'Active thermal infrared satellite hotspot tracking'
    },
    {
      title: 'NASA GIBS Cloud Reflectance',
      description: 'MODIS Terra/Aqua true-color global imagery'
    }
  ]

  return (
    <section id="dossiers" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
      {/* Background radial accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(240,120,50,0.08),transparent_70%)]" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <h2 className="font-display text-3xl tracking-wide text-white sm:text-5xl">
            INTELLIGENCE DOSSIERS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60 max-w-2xl">
            Classified case files investigating planetary system anomalies. Click the interactive 3D folder below to pull out evidence sheets or select a dossier from the mission archive.
          </p>
        </div>

        {/* Quick dossier stats */}
        <div className="flex items-center gap-3">
          <div className="liquid-glass-card rounded-2xl px-5 py-3 text-center">
            <div className="text-xl font-bold font-mono text-white">34</div>
            <div className="text-[10px] text-white/50 tracking-wider uppercase font-mono">Grid Cells</div>
          </div>
          <div className="liquid-glass-card rounded-2xl px-5 py-3 text-center">
            <div className="text-xl font-bold font-mono text-[#38bdf8]">+0.40°</div>
            <div className="text-[10px] text-white/50 tracking-wider uppercase font-mono">Barisal Rate</div>
          </div>
          <div className="liquid-glass-card rounded-2xl px-5 py-3 text-center">
            <div className="text-xl font-bold font-mono text-white">99.9%</div>
            <div className="text-[10px] text-white/50 tracking-wider uppercase font-mono">FDR Conf.</div>
          </div>
        </div>
      </div>

      {/* Main Folder Showcase Grid */}
      <div className="mt-12 grid gap-10 lg:grid-cols-12 items-start">
        {/* Left Column: Interactive 3D Folder Component (React Bits) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="liquid-glass-card relative w-full rounded-3xl p-8 text-center">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-white/70 tracking-wider">
                ORBITAL INTELLIGENCE ARCHIVE
              </span>
              <span className="rounded-full border border-white/12 bg-white/5 px-2.5 py-0.5 text-white/80 font-mono text-[10px]">
                Interactive Dossier
              </span>
            </div>

            {/* Folder Component Rendering */}
            <div className="flex justify-center items-center py-6 min-h-[300px]">
              <Folder
                label="NASA TREND EVIDENCE"
                color={selectedCase.folderColor}
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

            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/60">
              <p className="flex items-center justify-center gap-2">
                <Info size={14} className="text-[#ffa25e]" />
                <span>Click folder to open · Drag sheets out · Click any sheet to zoom</span>
              </p>
            </div>
          </div>

          {/* Folder Tabs Selector */}
          <div className="w-full mt-6 space-y-2.5">
            {DOSSIERS.map((dossier) => {
              const isSelected = selectedCase.id === dossier.id
              return (
                <button
                  key={dossier.id}
                  onClick={() => setSelectedCase(dossier)}
                  className={`liquid-glass-card w-full text-left rounded-2xl p-4 transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#38bdf8]/60 bg-sky-500/10 shadow-[0_0_24px_rgba(56,189,248,0.2)]'
                      : 'hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center text-white"
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
                        : 'border-amber-500/40 text-amber-300 bg-amber-500/10'
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
          <div className="liquid-glass-card rounded-3xl p-8 sm:p-10">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
              <div>
                <span className="font-mono text-xs tracking-wider text-[#ffa25e]">
                  {selectedCase.caseNumber} · {selectedCase.classification}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-white mt-1">
                  {selectedCase.title}
                </h3>
                <p className="text-sm font-serif-it text-white/70 mt-1">
                  {selectedCase.subtitle}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-white/50 block">Time Horizon</span>
                <span className="font-mono text-sm font-semibold text-white">
                  {selectedCase.dateRange}
                </span>
              </div>
            </div>

            {/* Scientific Summary */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#ffa25e]/80 mb-2">
                Executive Investigation Summary
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-white/80 font-normal">
                {selectedCase.summary}
              </p>
            </div>

            {/* Key Findings List */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#ffa25e]/80 mb-3 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Verified Statistical Evidence
              </h4>
              <ul className="space-y-2.5">
                {selectedCase.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#f07832] flex-none" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scientific Figures / Map Preview if available */}
            {selectedCase.image && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-white/60">
                    NASA Spatial Trend Analysis Map
                  </span>
                  <button
                    onClick={() => {
                      setPreviewImage(selectedCase.image!)
                      setDialogOpen(true)
                    }}
                    className="text-xs text-[#ffa25e] hover:text-[#ffb780] flex items-center gap-1 font-medium transition-colors"
                  >
                    <span>Enlarge Full Resolution</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
                <div
                  onClick={() => {
                    setPreviewImage(selectedCase.image!)
                    setDialogOpen(true)
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-black/40 transition-all hover:border-[#f07832]"
                >
                  <img
                    src={selectedCase.image}
                    alt={selectedCase.title}
                    className="h-48 sm:h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs text-white/90 font-mono">
                      Generated via Mann-Kendall + Theil-Sen Analysis (analysis/trend_analysis.py)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Satellite Providers Bar */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-white/50 mr-1">NASA Providers:</span>
                {selectedCase.satelliteSources.map((source) => (
                  <Badge
                    key={source}
                    variant="secondary"
                    className="bg-[#f07832]/10 text-[#ffa25e] border-[#f07832]/30 text-[11px]"
                  >
                    {source}
                  </Badge>
                ))}
              </div>

              <a
                href="#cockpit"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffa25e] hover:text-[#ffb780] transition-colors"
              >
                <span>Query In 3D Agent</span>
                <TrendingUp size={14} />
              </a>
            </div>
          </div>
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
    </section>
  )
}
