import React, { useEffect, useState, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view';
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]:;?><',
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-[#ffa25e] font-mono',
  animateOn = 'hover',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const iterationRef = useRef(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  const startAnimation = () => {
    setIsScrambling(true);
    iterationRef.current = 0;
  };

  useEffect(() => {
    if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAnimation();
          }
        },
        { threshold: 0.1 }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [animateOn]);

  useEffect(() => {
    if (!isScrambling) return;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterationRef.current) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      if (iterationRef.current >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
        setDisplayText(text);
      }

      iterationRef.current += 1 / ((maxIterations * 10) / text.length || 1);
    }, speed);

    return () => clearInterval(interval);
  }, [isScrambling, text, speed, maxIterations, characters]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => {
        if (animateOn === 'hover') {
          startAnimation();
        }
      }}
    >
      <span className={`${className} ${isScrambling ? encryptedClassName : ''}`}>
        {displayText}
      </span>
    </span>
  );
};

export default DecryptedText;
