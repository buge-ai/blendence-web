'use client';

/**
 * MethodSection — the transition out of the video hero.
 *
 * ONE compact band, no second row: the hero video resolves on five pastel
 * powder mounds against white, so this section opens on that SAME white
 * (`var(--surface)`, no wash) and the cut reads as one continuous frame.
 *
 *   Left  — the adaptability claim ("Nutrition that adapts to real life.").
 *   Right — the triptych: one blend (Reset Intense palette) in three states,
 *           fresh → freeze-dried → glass, side by side. Shot-consistent, so
 *           the three panels read as three moments of one thing rather than
 *           three photos. Step number + title only; no captions — the band
 *           has to stay short so the scroll out of the film keeps moving.
 *
 * NOTE: classes handed to imported motion components (Reveal, WordReveal,
 * Stagger, StaggerItem) never receive the styled-jsx scope hash — they are
 * styled as :global() descendants of a scoped plain-DOM parent. Never bare
 * top-level :global().
 */

import React from 'react';
import { Reveal, WordReveal, Stagger, StaggerItem } from '@/lib/motion';
import { useLanguage } from '@/lib/LanguageContext';

const STAGE_IMAGES = [
  '/images/method/method-fresh.jpg',
  '/images/method/method-freezedried.jpg',
  '/images/method/method-glass.jpg',
];

export default function MethodSection() {
  const { t } = useLanguage();
  const a = t.mainPage.adaptability;
  const m = t.mainPage.method;

  return (
    <section className="method-section" aria-label={a.label}>
      <div className="method-inner">
        <div className="method-grid">
          {/* ---- Left: the claim, on the hero's own white ---- */}
          <div className="method-copy">
            <Reveal className="eyebrow-row">
              <span className="eyebrow">{a.label}</span>
            </Reveal>
            <WordReveal
              as="h2"
              className="method-title font-display"
              text={a.title}
            />
            <Reveal delay={0.12} className="method-text">
              <p>{a.description}</p>
            </Reveal>
          </div>

          {/* ---- Right: the triptych — one blend, three states ---- */}
          <Stagger className="triptych" delay={0.05}>
            {m.stages.map((stage, i) => (
              <StaggerItem key={stage.step} className="panel">
                <div className="panel-frame">
                  <img
                    src={STAGE_IMAGES[i]}
                    alt={`${stage.title}: ${stage.caption}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="panel-body">
                  <span className="panel-step">{stage.step}</span>
                  <h3 className="panel-title">{stage.title}</h3>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      <style jsx>{`
        /* PURE white, continuous with the video's final frame. Do not add
           a wash here — the seam with the film depends on it. */
        .method-section {
          width: 100%;
          background: var(--surface);
        }

        .method-inner {
          max-width: var(--container-wide);
          margin: 0 auto;
          /* Modest top padding: this is the seam with the video. */
          padding: clamp(3rem, 6vw, 5rem) 3rem;
        }

        .method-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.3fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
        }

        /* ---- Left column ---- */
        .method-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.2rem;
        }

        .method-copy :global(.eyebrow-row) {
          display: block;
        }

        .method-copy :global(.method-title) {
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          color: var(--text-heading);
          margin: 0;
          max-width: 16em;
        }

        .method-copy :global(.method-text) {
          max-width: 34em;
        }

        .method-copy :global(.method-text p) {
          font-size: 1.05rem;
          color: var(--text-body);
          line-height: 1.7;
        }

        /* ---- Right column: three stages side by side ---- */
        .method-grid :global(.triptych) {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 1.8vw, 1.25rem);
        }

        .method-grid :global(.panel) {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .panel-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--surface);
          box-shadow: var(--shadow-soft);
        }

        .panel-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.2s var(--ease);
        }

        .panel-frame:hover img {
          transform: scale(1.03);
        }

        .panel-body {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        /* Step number sits above its title on a hairline — the thread
           that ties the three panels into one sequence. */
        .panel-step {
          font-family: var(--font-display-family);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--turquoise-deep);
          font-variant-numeric: tabular-nums;
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .panel-step::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--hairline);
        }

        .panel-title {
          font-size: clamp(1rem, 1.3vw, 1.05rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: var(--text-heading);
          margin: 0;
        }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 1024px) {
          .method-inner {
            padding: clamp(2.75rem, 6vw, 4rem) 1.5rem;
          }

          /* Text above the panels; the panels stay 3-across while they fit. */
          .method-grid {
            grid-template-columns: 1fr;
            gap: 2.25rem;
          }
        }

        /* Below 768px the triptych becomes a horizontal snap-scroller with
           a peek of the next panel, so the sequence stays a sequence
           instead of collapsing into a tall stack. */
        @media (max-width: 768px) {
          .method-inner {
            padding-left: 0;
            padding-right: 0;
          }

          .method-copy {
            padding: 0 1.25rem;
          }

          .method-grid :global(.triptych) {
            display: flex;
            grid-template-columns: none;
            gap: 1rem;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            /* overflow-x:auto forces overflow-y to auto too, so the block
               padding is what keeps the panels' soft shadow unclipped. */
            padding: 0.5rem 1.25rem 1.5rem;
          }

          .method-grid :global(.triptych)::-webkit-scrollbar {
            display: none;
          }

          .method-grid :global(.panel) {
            flex: 0 0 62%;
            max-width: 300px;
            scroll-snap-align: center;
          }
        }
      `}</style>
    </section>
  );
}
