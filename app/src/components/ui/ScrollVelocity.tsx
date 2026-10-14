import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion';

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
  parallaxClassName?: string;
}

interface ParallaxTextProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function ParallaxText({ children, baseVelocity = 100, className = '' }: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-45, -20, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap overflow-hidden whitespace-nowrap select-none py-2">
      <motion.div className={`flex flex-nowrap gap-8 ${className}`} style={{ x }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-block">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  texts,
  velocity = 3,
  className = '',
  parallaxClassName = '',
}) => {
  return (
    <div className={`overflow-hidden py-6 ${className}`}>
      {texts.map((text, i) => (
        <ParallaxText
          key={i}
          baseVelocity={i % 2 === 0 ? velocity : -velocity}
          className={parallaxClassName}
        >
          {text}
        </ParallaxText>
      ))}
    </div>
  );
};

export default ScrollVelocity;
