'use client';

/**
 * StageGrowth — the /stages "life stages" section as scrollytelling.
 *
 * A 97-frame transparent WebP sequence (fal Seedance on a magenta chroma
 * screen, soft-ramp keyed — see the 2026-08-04 session scratchpad
 * `seedgrow/`) of the client's stage icons growing: sprout (2 leaves) →
 * sapling (4) → leafy branch. While the 260vh track scrolls, the sticky
 * stage scrubs the sequence on a <canvas> (left) and highlights the
 * matching age-stage card (right). Clicking a card jumps the scroll to
 * that stage's segment.
 *
 * ≤768px: same pinned scrubbing, restyled as one compact column — the
 * canvas shrinks on top with the three cards tightened beneath it (100dvh
 * so the collapsing URL bar can't jump the pin). Reduced motion: the
 * canvas holds the final (fully grown) frame instead of scrubbing.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const FRAME_COUNT = 97;
const frameSrc = (i: number) =>
  `/images/stages/growth/growth-${String(i + 1).padStart(3, '0')}.webp`;

const STAGES = [
  { icon: '/images/stages/stage-sprout.png', age: '4-7', accent: 'var(--kidgrow)', tint: 'var(--kidgrow-tint)' },
  { icon: '/images/stages/stage-sapling.png', age: '8-12', accent: 'var(--kidrise)', tint: 'var(--kidrise-tint)' },
  { icon: '/images/stages/stage-branch.png', age: '13-16', accent: 'var(--teenfocus)', tint: 'var(--teenfocus-tint)' },
];

export default function StageGrowth() {
  const { t } = useLanguage();
  const c = t.categoryPages;
  const cards = [
    { title: c.earlyGrowth, desc: c.earlyGrowthDesc },
    { title: c.activeSchooling, desc: c.activeSchoolingDesc },
    { title: c.mentalFocus, desc: c.mentalFocusDesc },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const frameIdxRef = useRef(0);
  const rafRef = useRef(0);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  /* Decode all frames up front — 97 transparent WebPs, ~1.4 MB total. */
  useEffect(() => {
    let alive = true;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.decode?.().catch(() => undefined).finally(() => {
        if (!alive) return;
        framesRef.current[i] = img;
        // paint the resting frame as soon as it is available
        if (i === frameIdxRef.current) draw(i);
      });
    }
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = useCallback((i: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[i];
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!Number.isFinite(p)) return;
    const idx = reduce
      ? FRAME_COUNT - 1
      : Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1))));
    if (idx !== frameIdxRef.current) {
      frameIdxRef.current = idx;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => draw(idx));
    }
    const seg = Math.max(0, Math.min(2, Math.floor(p * 3)));
    setActive((prev) => (prev === seg ? prev : seg));
  });

  /* Reduced motion rests on the fully grown branch. */
  useEffect(() => {
    if (reduce) {
      frameIdxRef.current = FRAME_COUNT - 1;
      draw(FRAME_COUNT - 1);
    }
  }, [reduce, draw]);

  /* Card click → the centre of that stage's third of the track. */
  const jumpTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const range = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / 3) * range, behavior: 'smooth' });
  }, []);

  return (
    <div className="growth-track" ref={trackRef}>
      <div className="growth-sticky">
        <div className="growth-stage">
          <div className="growth-canvas-wrap" aria-hidden="true">
            <canvas ref={canvasRef} width={600} height={600} />
          </div>

          <div className="growth-cards">
            {cards.map((card, i) => (
              <button
                key={i}
                type="button"
                className={`growth-card${i === active ? ' is-active' : ''}`}
                style={{ '--stage-accent': STAGES[i].accent } as React.CSSProperties}
                onClick={() => jumpTo(i)}
              >
                <span className="card-top">
                  <Image src={STAGES[i].icon} alt="" width={44} height={44} className="card-icon" />
                  <span className="card-age">{STAGES[i].age}</span>
                </span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .growth-track {
          position: relative;
          height: 260vh;
        }

        .growth-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          /* Same minimalist studio plate as the homepage showcase —
             the per-stage tint swap was rejected by the client. */
          background: url('/images/main/showcase-bg.jpg') center / cover
            no-repeat var(--surface);
        }

        .growth-stage {
          width: 100%;
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 5.5rem 3rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }

        .growth-canvas-wrap {
          display: flex;
          justify-content: center;
        }

        .growth-canvas-wrap canvas {
          width: min(100%, 52vh);
          aspect-ratio: 1 / 1;
          height: auto;
        }

        .growth-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .growth-card {
          text-align: left;
          border: 1px solid var(--hairline);
          border-radius: var(--radius-lg);
          background: var(--surface);
          padding: 1.35rem 1.5rem;
          cursor: pointer;
          opacity: 0.62;
          transition: opacity var(--dur-fast) var(--ease),
            transform var(--dur-fast) var(--ease),
            border-color var(--dur-fast) var(--ease),
            box-shadow var(--dur-fast) var(--ease);
        }

        .growth-card.is-active {
          opacity: 1;
          transform: translateX(6px);
          border-color: var(--stage-accent);
          box-shadow: var(--shadow-soft);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.6rem;
        }

        .growth-card :global(.card-icon) {
          object-fit: contain;
        }

        .card-age {
          font-family: var(--font-display-family);
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--stage-accent);
          font-variant-numeric: tabular-nums;
        }

        .growth-card h3 {
          margin: 0 0 0.35rem;
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text-heading);
        }

        .growth-card p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-body);
        }

        @media (prefers-reduced-motion: reduce) {
          .growth-sticky,
          .growth-card {
            transition: none;
          }
        }

        /* ---- ≤768px: compact pinned column — canvas on top, cards below.
           Same track and scrubbing; dvh keeps the pin steady under the
           collapsing URL bar. ---- */
        @media (max-width: 768px) {
          .growth-sticky {
            height: 100vh;
            height: 100dvh;
            align-items: flex-start;
          }

          .growth-stage {
            grid-template-columns: 1fr;
            padding: 4.5rem 1.25rem 0.75rem;
            gap: 0.6rem;
            align-items: start;
          }

          .growth-canvas-wrap canvas {
            width: min(56vw, 22vh);
            width: min(56vw, 22dvh);
          }

          .growth-cards {
            gap: 0.6rem;
          }

          .growth-card {
            padding: 0.85rem 1rem;
          }

          .growth-card.is-active {
            transform: none;
          }

          .card-top {
            margin-bottom: 0.35rem;
          }

          .growth-card :global(.card-icon) {
            width: 32px;
            height: 32px;
          }

          .growth-card h3 {
            font-size: 1rem;
            margin-bottom: 0.25rem;
          }

          .growth-card p {
            font-size: 0.84rem;
            line-height: 1.45;
          }
        }
      `}</style>
    </div>
  );
}
