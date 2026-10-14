'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  Layers, 
  Orbit, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight,
  LayoutGrid
} from 'lucide-react';

interface TelemetryCard {
  id: string;
  category: string;
  badge: string;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
  instrument: string;
  band: string;
  image: string;
  link: string;
}

const CARDS: TelemetryCard[] = [
  {
    id: 'case-01',
    category: 'CLIMATE SERIES',
    badge: 'NASA MERRA-2 REANALYSIS',
    title: 'Late-Monsoon Thermal Shift',
    desc: 'Annual average temperatures masked a sharp seasonal change across coastal Bangladesh. 25 years of monthly records uncover a +0.40 °C/decade warming signature concentrated in September.',
    metric: '+0.40 °C',
    metricLabel: 'Warming per decade (September)',
    instrument: 'GSFC GMAO MERRA-2',
    band: '2m Surface Air Temp (T2M)',
    image: `${import.meta.env.BASE_URL}data/climate/bangladesh_t2m_trend_map.png`,
    link: '/dossiers',
  },
  {
    id: 'case-02',
    category: 'THERMAL SENSING',
    badge: 'VIIRS 375M SATELLITE SWEEP',
    title: 'Active Hotspot Penetration',
    desc: 'Dense monsoonal smoke blinds visible optical lenses. By isolating the 3.75 µm thermal infrared channel, active fires and agricultural burns are pinpointed through heavy cloud haze.',
    metric: '375m',
    metricLabel: 'Sub-pixel thermal resolution',
    instrument: 'VIIRS Suomi-NPP',
    band: 'Channel I-4 (3.74–3.84 µm)',
    image: `${import.meta.env.BASE_URL}satellite_hero.png`,
    link: '/games',
  },
  {
    id: 'case-03',
    category: 'ATMOSPHERIC TELEMETRY',
    badge: 'DECADO-SEASONAL REGRESSION',
    title: 'Megacity Microclimate Shift',
    desc: 'Continuous decadal telemetry over Dhaka confirms rapid surface heat flux and changing monsoon humidity patterns across the Ganges-Brahmaputra Delta.',
    metric: '25 Years',
    metricLabel: 'Continuous calibrated observations',
    instrument: 'MODIS Terra/Aqua & POWER',
    band: 'Spectral Albedo & Surface Flux',
    image: `${import.meta.env.BASE_URL}data/climate/dhaka_t2m_trend_analysis.png`,
    link: '/dossiers',
  },
  {
    id: 'case-04',
    category: 'DIGITAL TWIN',
    badge: 'CESIUM 3D SATELLITE RUNTIME',
    title: 'Autonomous Geospatial Agent',
    desc: 'Interactive 3D digital twin rendering global orbital tracks, real-time sensor coverage pyramids, and dynamic climate anomaly layers with WebGL/WebGPU acceleration.',
    metric: '31 Stations',
    metricLabel: 'Multi-sensor spatial nodes',
    instrument: 'CesiumJS Digital Twin Engine',
    band: 'Multi-layer Satellite Sensor Fusion',
    image: `${import.meta.env.BASE_URL}preview_ship_routes.png`,
    link: '/agent',
  },
];

export const GlassmorphismCardStack: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'stack' | 'carousel'>('stack');

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  };

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10">
      {/* Header bar with Apple style layout & view mode toggle */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/[0.08] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-sky-300 mb-3">
            <Orbit size={13} className="text-sky-400" />
            <span>Planetary Intelligence Suite</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white">
            Earth System Trends
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
            Peer-verifiable planetary observations extracted from NASA satellites. Swipe through or stack cards to explore active telemetry.
          </p>
        </div>

        {/* View mode toggle pill & navigation buttons */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-white/12 bg-white/[0.04] p-1 backdrop-blur-xl">
            <button
              onClick={() => setViewMode('stack')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                viewMode === 'stack'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Layers size={13} />
              <span>Stack</span>
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                viewMode === 'carousel'
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <LayoutGrid size={13} />
              <span>Carousel</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevCard}
              aria-label="Previous card"
              className="apple-icon-badge h-9 w-9 rounded-full text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextCard}
              aria-label="Next card"
              className="apple-icon-badge h-9 w-9 rounded-full text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Stack Mode or Carousel Mode */}
      <div className="mt-12">
        {viewMode === 'stack' ? (
          <div className="relative h-[480px] sm:h-[460px] w-full flex items-center justify-center">
            {CARDS.map((card, index) => {
              // Calculate relative offset from active index
              const offset = (index - activeIndex + CARDS.length) % CARDS.length;
              const isVisible = offset < 3;
              if (!isVisible) return null;

              const zIndex = 30 - offset * 10;
              const scale = 1 - offset * 0.05;
              const translateY = offset * 20;
              const opacity = 1 - offset * 0.25;

              return (
                <motion.div
                  key={card.id}
                  onClick={() => offset !== 0 && setActiveIndex(index)}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{
                    opacity,
                    y: translateY,
                    scale,
                    zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 24,
                  }}
                  className={`absolute inset-x-0 mx-auto max-w-4xl cursor-pointer select-none rounded-[28px] overflow-hidden ${
                    offset === 0 ? 'pointer-events-auto shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)]' : 'pointer-events-auto shadow-lg'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 45%, rgba(10, 16, 28, 0.88) 100%)',
                    backdropFilter: 'blur(36px) saturate(2.1)',
                    WebkitBackdropFilter: 'blur(36px) saturate(2.1)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderTopColor: 'rgba(255, 255, 255, 0.38)',
                  }}
                  whileHover={offset === 0 ? { y: translateY - 6, scale: scale * 1.01 } : {}}
                  whileTap={offset === 0 ? { scale: scale * 0.99 } : {}}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
                    {/* Visual Media Showcase */}
                    <div className="md:col-span-5 relative overflow-hidden bg-black/40 min-h-[200px] md:min-h-full">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                      
                      {/* Metric Tag overlay */}
                      <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10">
                        <div className="text-xl sm:text-2xl font-mono font-medium text-sky-300">
                          {card.metric}
                        </div>
                        <div className="text-[11px] font-mono text-white/60 uppercase tracking-wider">
                          {card.metricLabel}
                        </div>
                      </div>
                    </div>

                    {/* Card Content & Details */}
                    <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-sky-300 font-medium">
                            {card.badge}
                          </span>
                          <span className="text-xs font-mono text-white/40">
                            0{index + 1} / 0{CARDS.length}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-white mb-3">
                          {card.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-white/70">
                          {card.desc}
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                        <div className="text-xs font-mono text-white/50">
                          <div><span className="text-white/30">SENSOR:</span> {card.instrument}</div>
                          <div><span className="text-white/30">CHANNEL:</span> {card.band}</div>
                        </div>

                        <Link
                          to={card.link}
                          className="liquid-glass-pill inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-normal text-white hover:scale-105 transition-all shadow-[0_6px_20px_rgba(56,189,248,0.2)]"
                        >
                          <span>Explore Case</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Carousel Mode with responsive touch drag */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative flex flex-col justify-between rounded-[24px] overflow-hidden p-6 transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.02) 45%, rgba(8, 12, 22, 0.85) 100%)',
                  backdropFilter: 'blur(32px) saturate(2.0)',
                  WebkitBackdropFilter: 'blur(32px) saturate(2.0)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderTopColor: 'rgba(255, 255, 255, 0.36)',
                  boxShadow: '0 20px 45px -15px rgba(0, 0, 0, 0.75)',
                }}
              >
                <div>
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-5 bg-black/40">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-sm font-mono font-medium text-sky-300">
                      {card.metric}
                    </div>
                  </div>

                  <span className="inline-flex items-center rounded-full border border-sky-400/25 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sky-300 mb-2">
                    {card.category}
                  </span>

                  <h3 className="font-display text-lg font-medium text-white mb-2 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="text-[10px] font-mono text-white/40 truncate max-w-[120px]">
                    {card.instrument}
                  </div>
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1 text-xs text-sky-300 hover:text-white transition-colors"
                  >
                    <span>View</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Dots progress indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Jump to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i ? 'w-8 bg-sky-400' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlassmorphismCardStack;
