'use client';

import React, { useRef, useState, useEffect } from 'react';
import './ScrollExpand.css';

export interface ScrollExpandProps {
  src?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  useWindowScroll?: boolean;
  startWidth?: number; // percentage, default 42
  startHeight?: number; // percentage, default 58
  startRadius?: number; // px, default 24
  endRadius?: number; // px, default 0
  mediaZoom?: number; // default 1.35
  scrollDistance?: number; // multiplier of container height, default 1.2
  holdDistance?: number; // percentage of scroll, default 0.35
  smoothing?: number; // lerp smoothing, default 0.1
  overlayScrim?: number; // default 0.45
  enabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '/satellite_hero.png',
  alt = 'Satellite imagery',
  title = '',
  scrollHint = '',
  useWindowScroll = false,
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  enabled = true,
  children,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setProgress(1);
      return;
    }

    const calculateProgress = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;

      if (useWindowScroll) {
        // As container enters viewport and scrolls through
        const totalScrollable = rect.height - windowH;
        if (totalScrollable <= 0) {
          targetProgress.current = rect.top < windowH * 0.5 ? 1 : 0;
        } else {
          const raw = -rect.top / totalScrollable;
          targetProgress.current = Math.min(1, Math.max(0, raw));
        }
      } else {
        // Track inside parent frame or relative to viewport center
        const startOffset = windowH * 0.8;
        const endOffset = windowH * 0.2;
        const currentPos = rect.top;
        const p = (startOffset - currentPos) / (startOffset - endOffset);
        targetProgress.current = Math.min(1, Math.max(0, p));
      }
    };

    const handleScroll = () => {
      calculateProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    calculateProgress();

    // Smooth lerp loop
    const tick = () => {
      setProgress((prev) => {
        const factor = Math.min(1, Math.max(0.01, smoothing));
        const diff = targetProgress.current - prev;
        if (Math.abs(diff) < 0.001) {
          return targetProgress.current;
        }
        return prev + diff * factor;
      });
      animFrame.current = requestAnimationFrame(tick);
    };

    animFrame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animFrame.current) {
        cancelAnimationFrame(animFrame.current);
      }
    };
  }, [useWindowScroll, enabled, smoothing]);

  // Apply hold distance: progress stretches from 0 to 1 before hold phase
  const expansionProgress = holdDistance > 0
    ? Math.min(1, progress / (1 - Math.min(0.8, holdDistance)))
    : progress;

  const currentWidth = startWidth + (100 - startWidth) * expansionProgress;
  const currentHeight = startHeight + (100 - startHeight) * expansionProgress;
  const currentRadius = startRadius + (endRadius - startRadius) * expansionProgress;
  const currentZoom = mediaZoom - (mediaZoom - 1.0) * expansionProgress;
  const currentScrim = overlayScrim * (1 - expansionProgress * 0.4);

  // Height multiplier for track
  const containerHeight = useWindowScroll ? `${Math.max(1.5, scrollDistance * 100 + 50)}vh` : '100%';

  return (
    <div
      ref={containerRef}
      className={`scroll-expand-container ${className}`}
      style={{
        height: containerHeight,
        ...style,
      }}
    >
      <div className={useWindowScroll ? 'scroll-expand-sticky' : 'relative w-full h-full flex items-center justify-center overflow-hidden'}>
        <div
          className="scroll-expand-frame"
          style={{
            width: `${currentWidth}%`,
            height: `${currentHeight}%`,
            borderRadius: `${currentRadius}px`,
          }}
        >
          {src && (
            <img
              src={src}
              alt={alt}
              className="scroll-expand-media"
              style={{
                transform: `scale(${currentZoom})`,
              }}
            />
          )}

          <div
            className="scroll-expand-scrim"
            style={{
              opacity: currentScrim,
            }}
          />

          <div className="scroll-expand-content">
            {title && (
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight font-medium mb-3">
                {title}
              </h2>
            )}
            {children}
          </div>

          {scrollHint && expansionProgress < 0.8 && (
            <div
              className="scroll-expand-hint"
              style={{
                opacity: 1 - expansionProgress * 1.5,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>{scrollHint}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
