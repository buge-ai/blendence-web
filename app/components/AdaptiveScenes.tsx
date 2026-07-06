'use client';

/**
 * AdaptiveScenes — the visual argument for "Nutrition that adapts to real life."
 *
 * One frame, three moments of the same day. Scenes crossfade on a slow
 * cycle with a time-of-day caption, so the image itself adapts — the
 * section's headline made literal. Auto-advance pauses on hover and only
 * runs while the frame is in view; reduced motion gets a static scene
 * with instant manual navigation.
 */

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';

export type AdaptiveScene = {
  src: string;
  time: string;
  label: string;
};

const CYCLE_MS = 4200;

export default function AdaptiveScenes({ scenes }: { scenes: AdaptiveScene[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused || reduce || scenes.length < 2) return;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % scenes.length);
    }, CYCLE_MS);
    return () => clearTimeout(timer);
  }, [inView, paused, reduce, index, scenes.length]);

  if (scenes.length === 0) return null;
  const scene = scenes[index];

  return (
    <div
      ref={ref}
      className="adaptive-scenes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="scenes-frame">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="scene"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={
              reduce
                ? { duration: 0.2 }
                : { duration: 1.1, ease: EASE }
            }
          >
            <Image
              src={scene.src}
              alt={scene.label}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="scene-scrim" />

        {/* Time-of-day caption — the "adapts" story in one chip */}
        <div className="scene-caption">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={index}
              className="caption-inner"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE }}
            >
              <span className="caption-time">{scene.time}</span>
              <span className="caption-label">{scene.label}</span>
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Scene bars — manual navigation */}
        <div className="scene-nav">
          {scenes.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`${s.time} — ${s.label}`}
              aria-current={i === index}
              className={`scene-bar${i === index ? ' active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* NOTE: motion.* elements never receive the styled-jsx scope hash —
         they are styled as :global() descendants of the scoped plain-DOM
         wrappers written in this file. */}
      <style jsx>{`
        .adaptive-scenes {
          width: 100%;
        }

        .scenes-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-soft);
          background: var(--surface-mist);
        }

        .scenes-frame :global(.scene) {
          position: absolute;
          inset: 0;
        }

        .scene-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            to top,
            rgba(16, 51, 61, 0.34) 0%,
            rgba(16, 51, 61, 0) 34%
          );
          pointer-events: none;
        }

        .scene-caption {
          position: absolute;
          left: 1.25rem;
          bottom: 1.25rem;
          z-index: 2;
          pointer-events: none;
        }

        .scene-caption :global(.caption-inner) {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.55rem 1.05rem;
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: var(--radius-pill);
          box-shadow: var(--shadow-soft);
        }

        .scene-caption :global(.caption-time) {
          font-family: var(--font-display-family);
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.01em;
          color: var(--petrol);
          padding-right: 0.7rem;
          border-right: 1px solid var(--hairline);
          font-variant-numeric: tabular-nums;
        }

        .scene-caption :global(.caption-label) {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--text-body);
          white-space: nowrap;
        }

        .scene-nav {
          position: absolute;
          right: 1.25rem;
          bottom: 1.55rem;
          z-index: 2;
          display: flex;
          gap: 0.45rem;
        }

        .scene-bar {
          width: 22px;
          height: 3px;
          padding: 0;
          border: none;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.45);
          cursor: pointer;
          transition: background var(--dur-fast) var(--ease),
            width var(--dur-fast) var(--ease);
        }

        .scene-bar.active {
          width: 34px;
          background: #fff;
        }

        @media (max-width: 480px) {
          .scene-caption {
            left: 0.85rem;
            bottom: 0.85rem;
          }

          .scene-caption :global(.caption-label) {
            font-size: 0.72rem;
          }

          .scene-nav {
            right: 0.85rem;
            bottom: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
