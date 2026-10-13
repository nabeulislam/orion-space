import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'Be An Earth System Trend Detective',
  blurAmount = 4,
  borderColor = '#38bdf8',
  glowColor = 'rgba(56, 189, 248, 0.4)',
  animationDuration = 0.4,
  className = '',
}) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  return (
    <span className={`relative inline-flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, index) => {
        const isHovered = currentIndex === index;

        return (
          <React.Fragment key={`${word}-${index}`}>
            <span
              className="relative cursor-pointer transition-all duration-300"
              onMouseEnter={() => setCurrentIndex(index)}
              onMouseLeave={() => setCurrentIndex(null)}
            >
              <span
                className="inline-block transition-all duration-300"
                style={{
                  filter:
                    currentIndex !== null && !isHovered
                      ? `blur(${blurAmount}px)`
                      : 'blur(0px)',
                  opacity: currentIndex !== null && !isHovered ? 0.4 : 1,
                }}
              >
                {word}
              </span>

              {isHovered && (
                <motion.span
                  layoutId="focus-box"
                  className="pointer-events-none absolute -inset-1 rounded-lg border"
                  style={{
                    borderColor,
                    boxShadow: `0 0 16px ${glowColor}`,
                  }}
                  transition={{
                    duration: animationDuration,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </span>
  );
};

export default TrueFocus;
