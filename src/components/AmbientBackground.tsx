import React from 'react';
import { motion } from 'motion/react';

interface AmbientBackgroundProps {
  variant?: 'hero' | 'light' | 'section';
  className?: string;
}

export default function AmbientBackground({ variant = 'hero', className = '' }: AmbientBackgroundProps) {
  if (variant === 'hero') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Soft, silky deep navy gradient vignette */}
        <div className="absolute inset-0 bg-radial-at-t from-[#1B3E6F]/40 via-transparent to-[#081529]/80" />

        {/* Subtle luminous deep-sea emerald glow */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-24 -left-20 w-[500px] h-[500px] rounded-full bg-[#3AA88C]/15 blur-[120px]"
        />

        {/* Warm prestige cognac glow on the right */}
        <motion.div
          animate={{
            x: [0, -35, 20, 0],
            y: [0, 30, -20, 0],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/6 -right-20 w-[550px] h-[550px] rounded-full bg-[#D49339]/12 blur-[130px]"
        />

        {/* Subtle deep royal accent in the center bottom */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-32 left-1/4 w-[600px] h-[450px] rounded-full bg-[#1B3E6F]/30 blur-[140px]"
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#3AA88C]/10 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#E8582F]/10 blur-3xl"
      />
    </div>
  );
}
