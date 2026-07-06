'use client';

/**
 * BLENDENCE shared motion language.
 *
 * One easing, one duration scale, a small set of reveal primitives.
 * Every animated surface on the site should be built from these so the
 * whole experience moves as a single system.
 *
 * Reduced motion: every primitive collapses to a plain opacity fade.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  animate,
  type Variants,
} from 'framer-motion';

/* Signature easing — calm, expensive, no bounce. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  fast: 0.5,
  base: 0.8,
  slow: 1.1,
} as const;

export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const;

/* ---------------------------------------------------------------- */
/* Reveal — fade + rise + blur-settle for blocks of content          */
/* ---------------------------------------------------------------- */

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = DUR.base,
  className,
  style,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
      viewport={{ once, margin: VIEWPORT.margin }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Stagger / StaggerItem — choreographed groups (cards, list items)  */
/* ---------------------------------------------------------------- */

const staggerContainer: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({
    transition: { staggerChildren: 0.09, delayChildren: delay },
  }),
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(5px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DUR.base, ease: EASE },
  },
};

const staggerChildReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base } },
};

export function Stagger({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerContainer}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={reduce ? staggerChildReduced : staggerChild}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* WordReveal — masked word-by-word rise for display headlines.      */
/* Supports multi-line copy via '\n'.                                */
/* ---------------------------------------------------------------- */

export function WordReveal({
  text,
  as: Tag = 'h2',
  className,
  delay = 0,
  style,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  // Observe the (un-clipped) container, not the masked words: a word
  // translated fully outside its overflow-hidden mask has zero visual
  // intersection, so a per-word whileInView would never fire.
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-12% 0px -12% 0px' });
  const lines = text.split('\n');

  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: DUR.base, delay }}
      >
        <Tag className={className} style={style}>
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </Tag>
      </motion.div>
    );
  }

  let wordIndex = 0;
  return (
    <Tag ref={containerRef} className={className} style={style} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.split(' ').map((word, wi) => {
            const idx = wordIndex++;
            return (
              <span
                key={wi}
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  verticalAlign: 'bottom',
                  paddingBottom: '0.08em',
                  marginBottom: '-0.08em',
                }}
              >
                <motion.span
                  style={{ display: 'inline-block', willChange: 'transform' }}
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : { y: '110%' }}
                  transition={{
                    duration: 0.75,
                    delay: delay + idx * 0.05,
                    ease: EASE,
                  }}
                >
                  {word}
                  {' '}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/* ---------------------------------------------------------------- */
/* ImageReveal — clipped frame; image settles from 1.12 → 1          */
/* ---------------------------------------------------------------- */

export function ImageReveal({
  children,
  className,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={{ overflow: 'hidden', ...style }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.fast, delay, ease: EASE }}
    >
      <motion.div
        style={{ width: '100%', height: '100%' }}
        initial={reduce ? {} : { scale: 1.12 }}
        whileInView={reduce ? {} : { scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: DUR.slow + 0.3, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Parallax — gentle scroll-linked drift                             */
/* ---------------------------------------------------------------- */

export function Parallax({
  children,
  distance = 40,
  className,
  style,
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* CountUp — stat counters (investor-facing numbers)                 */
/* ---------------------------------------------------------------- */

export function CountUp({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.6,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
