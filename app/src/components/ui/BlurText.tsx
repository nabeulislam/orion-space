import React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';

interface BlurTextProps extends Omit<HTMLMotionProps<'p'>, 'children'> {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = '',
  delay = 0.2,
  duration = 0.5,
  stagger = 0.05,
  ...props
}) => {
  const words = text.split(' ');

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

  const wordVariants: Variants = {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 15 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      className={`inline-flex flex-wrap gap-x-1.5 ${className}`}
      {...props}
    >
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} variants={wordVariants} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default BlurText;
