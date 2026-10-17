import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardData } from '../../lib/utils';
import { ArrowUpRight, Satellite } from 'lucide-react';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

export interface CardProps {
    id: number;
    title: string;
    description: string;
    index: number;
    totalCards: number;
    color: string;
    category?: string;
    metric?: string;
    metricLabel?: string;
    image?: string;
    badge?: string;
    link?: string;
}

export const Card: React.FC<CardProps> = ({ 
    title, 
    description, 
    index, 
    totalCards, 
    color,
    category = "EARTH TELEMETRY",
    metric = "25 Years",
    metricLabel = "Observation Record",
    image,
    badge = "NASA SATELLITE SUITE",
    link = "/dossiers"
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const container = containerRef.current;
        if (!card || !container) return;

        const targetScale = 1 - (totalCards - index) * 0.05;

        // Set initial state
        gsap.set(card, {
            scale: 1,
            transformOrigin: "center top"
        });

        // Create scroll trigger for stacking effect
        const trigger = ScrollTrigger.create({
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const scale = gsap.utils.interpolate(1, targetScale, progress);

                gsap.set(card, {
                    scale: Math.max(scale, targetScale),
                    transformOrigin: "center top"
                });
            }
        });

        return () => {
            trigger.kill();
        };
    }, [index, totalCards]);

    return (
        <div
            ref={containerRef}
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'sticky',
                top: 0
            }}
            className="w-full px-4 sm:px-6"
        >
            <div
                ref={cardRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '920px',
                    minHeight: '480px',
                    borderRadius: '24px',
                    isolation: 'isolate',
                    top: `calc(-4vh + ${index * 26}px)`,
                    transformOrigin: 'top'
                }}
                className="card-content transition-shadow duration-300"
            >
                {/* Electric Border Effect */}
                <div
                    style={{
                        position: 'absolute',
                        inset: '-3px',
                        borderRadius: '27px',
                        padding: '3px',
                        background: `conic-gradient(
                            from 0deg,
                            transparent 0deg,
                            ${color} 60deg,
                            ${color.replace('0.8', '0.6')} 120deg,
                            transparent 180deg,
                            ${color.replace('0.8', '0.4')} 240deg,
                            transparent 360deg
                        )`,
                        zIndex: -1
                    }}
                />

                {/* Main Card Content */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    minHeight: '480px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '24px',
                    background: `
                        linear-gradient(145deg, 
                            rgba(255, 255, 255, 0.12), 
                            rgba(255, 255, 255, 0.04)
                        )
                    `,
                    backdropFilter: 'blur(25px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.45),
                        0 2px 8px rgba(0, 0, 0, 0.25),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.1)
                    `,
                    overflow: 'hidden'
                }}>
                    {/* Enhanced Glass reflection overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)',
                        pointerEvents: 'none',
                        borderRadius: '24px 24px 0 0'
                    }} />

                    {/* Glass shine effect */}
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        right: '10px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                        borderRadius: '1px',
                        pointerEvents: 'none'
                    }} />

                    {/* Side glass reflection */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '2px',
                        height: '100%',
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                        borderRadius: '24px 0 0 24px',
                        pointerEvents: 'none'
                    }} />

                    {/* Frosted glass texture */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `
                            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 2px),
                            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 1px, transparent 2px),
                            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.06) 1px, transparent 2px)
                        `,
                        backgroundSize: '30px 30px, 25px 25px, 35px 35px',
                        pointerEvents: 'none',
                        borderRadius: '24px',
                        opacity: 0.7
                    }} />

                    {/* Rich Telemetry & Card Presentation */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 h-full">
                        {/* Media image section */}
                        {image && (
                            <div className="md:col-span-5 relative overflow-hidden bg-black/40 min-h-[220px] md:min-h-full border-b md:border-b-0 md:border-r border-white/10">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />
                                
                                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15">
                                    <div className="text-xl sm:text-2xl font-mono font-semibold text-sky-300">
                                        {metric}
                                    </div>
                                    <div className="text-[11px] font-mono text-white/70 uppercase tracking-wider">
                                        {metricLabel}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Text Content */}
                        <div className={`p-6 sm:p-8 flex flex-col justify-between ${image ? 'md:col-span-7' : 'md:col-span-12'}`}>
                            <div>
                                <div className="flex items-center justify-between gap-3 mb-4">
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-sky-300 font-medium">
                                        <Satellite size={12} />
                                        <span>{badge}</span>
                                    </span>
                                    <span className="text-xs font-mono text-white/50">
                                        0{index + 1} / 0{totalCards}
                                    </span>
                                </div>

                                <div className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
                                    {category}
                                </div>

                                <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
                                    {title}
                                </h3>

                                <p className="text-sm sm:text-base leading-relaxed text-white/75 font-normal">
                                    {description}
                                </p>
                            </div>

                            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                                <div className="text-xs font-mono text-white/50">
                                    <span className="text-emerald-400 font-medium">● PEER VERIFIABLE</span> · SATELLITE ANOMALY
                                </div>

                                <Link
                                    to={link}
                                    className="liquid-glass-pill inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-normal text-white hover:scale-105 transition-all shadow-[0_6px_20px_rgba(56,189,248,0.2)]"
                                >
                                    <span>Explore Telemetry</span>
                                    <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const StackedCards: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.fromTo(container,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: "power2.out"
            }
        );
    }, []);

    return (
        <main ref={containerRef} className="relative bg-transparent text-white w-full py-16">
            {/* Section Header */}
            <section className="mx-auto max-w-5xl px-6 pb-12 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-sky-300 mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <span>Planetary Detection Matrix</span>
                </div>
                <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white mb-4">
                    EARTH SYSTEM ANOMALIES
                </h2>
                <p className="text-sm sm:text-base text-white/65 max-w-2xl mx-auto leading-relaxed">
                    25-year calibrated time-series observations from NASA GMAO MERRA-2 and VIIRS multispectral sensors, stacked with interactive scroll physics.
                </p>
            </section>

            {/* Cards Section */}
            <section className="relative w-full">
                {cardData.map((card, index) => {
                    return (
                        <Card
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            description={card.description}
                            index={index}
                            totalCards={cardData.length}
                            color={card.color}
                            category={card.category}
                            metric={card.metric}
                            metricLabel={card.metricLabel}
                            image={card.image}
                            badge={card.badge}
                            link={card.link}
                        />
                    );
                })}
            </section>
        </main>
    );
};

export default StackedCards;
