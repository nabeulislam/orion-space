import React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';

interface SplitTextProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0.1,
  duration = 0.6,
  stagger = 0.04,
  ...props
}) => {
  const letters = text.split('');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      aria-label={text}
      className={`inline-flex flex-wrap ${className}`}
      {...props}
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default SplitText;
