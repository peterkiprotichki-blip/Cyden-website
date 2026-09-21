import React from 'react';
import { motion } from 'motion/react';

/**
 * Animated Hero Patterns:
 * 1. Delicate rotating orbital concentric rings (evoking cask hoops, glassware, and precision logistics)
 * 2. Gentle effervescent rising micro-bubbles (evoking sparkling cider, lager, and chilled beverages)
 * 3. Flowing topographic / liquid wave ribbons (reflecting the North Rift highlands & Kerio Valley)
 * 4. Micro celestial / constellation glimmers
 */
export function HeroAnimatedPatterns() {
  // Floating effervescent bubbles with randomized delays & durations
  const bubbles = [
    { id: 1, left: '8%', size: 6, duration: 9, delay: 0, color: 'bg-amber-300/30' },
    { id: 2, left: '16%', size: 4, duration: 11, delay: 2, color: 'bg-[#3AA88C]/35' },
    { id: 3, left: '27%', size: 8, duration: 14, delay: 1, color: 'bg-amber-400/25' },
    { id: 4, left: '42%', size: 5, duration: 10, delay: 3, color: 'bg-white/20' },
    { id: 5, left: '55%', size: 7, duration: 13, delay: 0.5, color: 'bg-[#3AA88C]/30' },
    { id: 6, left: '68%', size: 4, duration: 12, delay: 2.5, color: 'bg-amber-300/25' },
    { id: 7, left: '79%', size: 9, duration: 15, delay: 1.5, color: 'bg-amber-400/20' },
    { id: 8, left: '88%', size: 5, duration: 10, delay: 4, color: 'bg-[#3AA88C]/35' },
    { id: 9, left: '94%', size: 7, duration: 13, delay: 2, color: 'bg-white/25' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 1. Concentric Rotating Heritage Rings (Top Right) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-[0.08] lg:opacity-[0.12]"
      >
        <svg viewBox="0 0 600 600" fill="none" className="w-full h-full text-[#3AA88C]">
          <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="300" cy="300" r="220" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="160" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="300" cy="300" r="100" stroke="currentColor" strokeWidth="2" />
          <path d="M300 10 L300 590 M10 300 L590 300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
        </svg>
      </motion.div>

      {/* 2. Concentric Rotating Cask Rings (Bottom Left) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-48 -left-48 w-[700px] h-[700px] opacity-[0.06] lg:opacity-[0.1]"
      >
        <svg viewBox="0 0 700 700" fill="none" className="w-full h-full text-amber-400">
          <circle cx="350" cy="350" r="330" stroke="currentColor" strokeWidth="1" strokeDasharray="8 12" />
          <circle cx="350" cy="350" r="260" stroke="currentColor" strokeWidth="1" />
          <circle cx="350" cy="350" r="180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" />
          <circle cx="350" cy="350" r="110" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* 3. Flowing Liquid Topographic Wave Ribbons across the Hero */}
      <div className="absolute inset-x-0 bottom-0 h-96 opacity-15 overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full text-white"
        >
          <motion.path
            initial={{ d: 'M0,192L60,176C120,160,240,128,360,138.7C480,149,600,203,720,202.7C840,203,960,149,1080,133.3C1200,117,1320,139,1380,149.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z' }}
            animate={{
              d: [
                'M0,192L60,176C120,160,240,128,360,138.7C480,149,600,203,720,202.7C840,203,960,149,1080,133.3C1200,117,1320,139,1380,149.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
                'M0,160L60,181.3C120,203,240,245,360,240C480,235,600,181,720,165.3C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
                'M0,192L60,176C120,160,240,128,360,138.7C480,149,600,203,720,202.7C840,203,960,149,1080,133.3C1200,117,1320,139,1380,149.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
              ],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            stroke="#3AA88C"
            strokeWidth="1.5"
            fill="none"
          />
          <motion.path
            initial={{ d: 'M0,128L60,144C120,160,240,192,360,186.7C480,181,600,139,720,133.3C840,128,960,160,1080,176C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z' }}
            animate={{
              d: [
                'M0,128L60,144C120,160,240,192,360,186.7C480,181,600,139,720,133.3C840,128,960,160,1080,176C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
                'M0,160L60,149.3C120,139,240,117,360,122.7C480,128,600,160,720,181.3C840,203,960,213,1080,197.3C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
                'M0,128L60,144C120,160,240,192,360,186.7C480,181,600,139,720,133.3C840,128,960,160,1080,176C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
              ],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
            stroke="#F2A93B"
            strokeWidth="1"
            strokeDasharray="4 6"
            fill="none"
          />
        </svg>
      </div>

      {/* 4. Effervescent Floating Rising Bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            bottom: '-20px',
          }}
          animate={{
            y: [0, -850],
            x: [0, Math.sin(b.id) * 35, 0],
            opacity: [0, 0.75, 0.9, 0],
            scale: [0.8, 1.2, 0.9],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
          }}
          className={`absolute rounded-full backdrop-blur-xs ${b.color} shadow-xs`}
        />
      ))}

      {/* 5. Subtle Constellation Glimmers */}
      {[
        { top: '22%', left: '18%', delay: 0 },
        { top: '35%', left: '48%', delay: 2 },
        { top: '15%', left: '72%', delay: 1 },
        { top: '68%', left: '85%', delay: 3 },
      ].map((pos, idx) => (
        <motion.div
          key={idx}
          style={{ top: pos.top, left: pos.left }}
          animate={{
            scale: [0.7, 1.3, 0.7],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: pos.delay,
            ease: 'easeInOut',
          }}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-200"
        />
      ))}
    </div>
  );
}

/**
 * Geometric Heritage Guilloche & Concentric Rings Pattern
 * For the "Excellence in Distribution Since 2013" card and premium banners.
 */
export function HeritageGuillochePattern({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Slow counter-rotating rosette */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-24 -bottom-24 w-96 h-96 opacity-15"
      >
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full text-amber-300">
          <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
          <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="70" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
          <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="2" />
          {/* Starburst rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="200"
              y1="20"
              x2="200"
              y2="380"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeOpacity="0.4"
              transform={`rotate(${deg} 200 200)`}
            />
          ))}
        </svg>
      </motion.div>

      {/* Subtle floating gold sparkle dots */}
      <motion.div
        animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-1/3 w-2 h-2 rounded-full bg-amber-400"
      />
      <motion.div
        animate={{ y: [0, 14, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-12 left-1/4 w-1.5 h-1.5 rounded-full bg-[#3AA88C]"
      />
    </div>
  );
}

/**
 * Animated Dot Grid / Subtle Constellation Wave for Light Sections
 * Gently pulses with a traveling opacity wave without harsh rectangular lines.
 */
export function AnimatedDotPattern({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none opacity-40 ${className}`}>
      <motion.div
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-full h-full"
        style={{
          backgroundImage: 'radial-gradient(#1B3E6F 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}

/**
 * Animated Flowing Ribbon for the Wholesale CTA Banner
 */
export function AnimatedBannerRibbon() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1000 300"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full opacity-15"
      >
        <motion.path
          animate={{
            d: [
              'M0,150 C300,50 600,250 1000,120 L1000,300 L0,300 Z',
              'M0,120 C300,220 600,80 1000,180 L1000,300 L0,300 Z',
              'M0,150 C300,50 600,250 1000,120 L1000,300 L0,300 Z',
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          fill="url(#cta-gradient)"
        />
        <defs>
          <linearGradient id="cta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#F2A93B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3AA88C" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Subtle Animated Watermark Pattern for Cards
 */
export function CardWatermarkPattern({ color = '#1B3E6F' }: { color?: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      className="absolute -bottom-10 -right-10 w-44 h-44 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity pointer-events-none"
    >
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full" style={{ color }}>
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="18" stroke="currentColor" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

