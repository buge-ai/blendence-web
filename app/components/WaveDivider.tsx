'use client';

/**
 * WaveDivider — the BLENDENCE signature gesture.
 *
 * Three thin strands (petrol / turquoise / green — the blend) flow across
 * the section boundary and converge into a single line, drawing themselves
 * as the divider scrolls into view. Use between major sections; never more
 * than one visual idea competing with it nearby.
 *
 * Tones map to the canonical category identities in globals.css.
 */

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

const TONES = {
  brand: ['#1A4D5C', '#00BCD4', '#7CB342'],
  stages: ['#1A4D5C', '#C08A52', '#D9964E'],
  reset: ['#1A4D5C', '#5E8C6A', '#7CB342'],
} as const;

/* Three strands that weave and converge at the right edge. */
const PATHS = [
  'M0,54 C160,10 340,90 540,58 C740,26 900,84 1100,60 C1260,41 1370,52 1440,58',
  'M0,64 C200,96 380,22 580,52 C780,82 940,30 1140,54 C1290,72 1380,62 1440,58',
  'M0,44 C180,64 400,58 600,66 C820,74 980,44 1180,50 C1310,54 1390,56 1440,58',
];

export default function WaveDivider({
  tone = 'brand',
  flip = false,
  className,
  style,
}: {
  tone?: keyof typeof TONES;
  flip?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center 55%'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    restDelta: 0.001,
  });

  const colors = TONES[tone];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        transform: flip ? 'scaleY(-1)' : undefined,
        ...style,
      }}
    >
      <svg
        viewBox="0 0 1440 108"
        fill="none"
        preserveAspectRatio="none"
        style={{ width: '100%', height: 'clamp(56px, 8vw, 108px)', display: 'block' }}
      >
        {PATHS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={colors[i]}
            strokeOpacity={[0.55, 0.75, 0.65][i]}
            strokeWidth={1.6}
            strokeLinecap="round"
            style={reduce ? undefined : { pathLength: progress }}
            initial={reduce ? undefined : { pathLength: 0 }}
          />
        ))}
      </svg>
    </div>
  );
}
