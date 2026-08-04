'use client';

/**
 * MomentsCarousel — the five blends as one family's week, 07:15 → weekend.
 *
 * Answers "when does this fit my life?" before the lineup is ever shown.
 * Editorial header on the left; on the right an analog dial whose hands
 * turn to the active card's time of day as the rail scrolls, beside the
 * prev/next arrows. Then a horizontal scroll-snap rail of seven cards
 * (two blends appear twice, in two different moments). Native overflow
 * scrolling does the dragging/swiping (momentum and trackpads come free);
 * the arrows page it by one card for pointer users. Each whole card is a
 * link to its product page.
 *
 * NOTE: classes handed to imported motion components (Reveal, WordReveal)
 * never receive the styled-jsx scope hash — they are styled as :global()
 * descendants of a scoped plain-DOM parent. Never bare top-level :global().
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Reveal, WordReveal } from '@/lib/motion';
import { useLanguage } from '@/lib/LanguageContext';

/* Card key → image + route + accent token. Order here is the day's order.
   `clock` is the fallback dial time for cards whose chip isn't a parseable
   HH:MM (the weekend card). */
const CARD_META: Record<
  string,
  { image: string; path: string; accent: string; clock?: string }
> = {
  kidgrow: { image: '/images/moments/moment-kidgrow.jpg', path: 'stages/kidgrow', accent: 'var(--kidgrow)' },
  kidrise: { image: '/images/moments/moment-kidrise.jpg', path: 'stages/kidrise', accent: 'var(--kidrise)' },
  balance: { image: '/images/moments/moment-balance.jpg', path: 'reset/balance', accent: 'var(--balance)' },
  team: { image: '/images/moments/moment-team.jpg', path: 'reset/balance', accent: 'var(--balance)' },
  teenfocus: { image: '/images/moments/moment-teenfocus.jpg', path: 'stages/teenfocus', accent: 'var(--teenfocus)' },
  intense: { image: '/images/moments/moment-intense.jpg', path: 'reset/intense', accent: 'var(--intense)' },
  trail: { image: '/images/moments/moment-trail.jpg', path: 'reset/intense', accent: 'var(--intense)', clock: '09:00' },
};

/* "07:15" → minutes since midnight, or null for non-time chips. */
const parseTime = (s: string): number | null => {
  const match = /^(\d{1,2}):(\d{2})$/.exec(s.trim());
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
};

export default function MomentsCarousel() {
  const { t, language } = useLanguage();
  const m = t.mainPage.moments;

  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* Dial time per card, minutes since midnight (weekend card falls back to
     its CARD_META.clock). Kept in a ref so the scroll handler always reads
     the current locale's values without re-binding. */
  const times = m.cards.map(
    (card) => parseTime(card.time) ?? parseTime(CARD_META[card.key]?.clock ?? '') ?? 540,
  );
  const timesRef = useRef(times);
  timesRef.current = times;

  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  /* Cumulative minutes drive the hands, so paging forward through the day
     spins the clock forward (and back-scrolling rewinds it) instead of
     each hand snapping along its shortest path. */
  const [clockMin, setClockMin] = useState(times[0] ?? 435);

  const syncRail = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);

    /* Cards snap to the left gutter, so the active card is the one whose
       offset (relative to the first card) sits nearest the scroll position. */
    const cards = el.querySelectorAll<HTMLElement>('[data-moment-card]');
    if (!cards.length) return;
    const base = cards[0].offsetLeft;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - base - el.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    if (best !== activeIdxRef.current) {
      /* Capture the previous index by VALUE: the state updater runs later,
         after the ref below has already been advanced to `best`. */
      const prev = activeIdxRef.current;
      const t = timesRef.current;
      setClockMin((c) => c + (t[best] ?? 0) - (t[prev] ?? 0));
      activeIdxRef.current = best;
      setActiveIdx(best);
    }
  }, []);

  useEffect(() => {
    syncRail();
    window.addEventListener('resize', syncRail);
    return () => window.removeEventListener('resize', syncRail);
  }, [syncRail]);

  /* Page by one card + gap, measured off the first card so the step stays
     correct across breakpoints. */
  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-moment-card]');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  return (
    <section className="moments-section" aria-label={m.label}>
      <div className="moments-inner">
        <div className="moments-head">
          <div className="head-copy">
            <Reveal className="eyebrow-row">
              <span
                className="eyebrow"
                style={{ '--eyebrow-accent': 'var(--green-deep)' } as React.CSSProperties}
              >
                {m.label}
              </span>
            </Reveal>
            <WordReveal
              as="h2"
              className="moments-title font-display"
              text={m.title}
            />
            <Reveal delay={0.12} className="moments-desc">
              <p>{m.description}</p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="head-controls">
            {/* Analog dial showing the active card's time of day; the hands
                turn as the rail scrolls through the day. Decorative. */}
            <div
              className="rail-clock"
              aria-hidden="true"
              style={{ '--clock-accent': CARD_META[m.cards[activeIdx]?.key]?.accent } as React.CSSProperties}
            >
              <svg viewBox="0 0 100 100" focusable="false">
                <circle className="clock-face" cx="50" cy="50" r="47" />
                {Array.from({ length: 12 }, (_, i) => (
                  <line
                    key={i}
                    className={`clock-tick${i % 3 === 0 ? ' tick-main' : ''}`}
                    x1="50"
                    y1="7"
                    x2="50"
                    y2={i % 3 === 0 ? 14 : 11}
                    style={{ transform: `rotate(${i * 30}deg)` }}
                  />
                ))}
                <g className="clock-hand hand-hour" style={{ transform: `rotate(${clockMin * 0.5}deg)` }}>
                  <line x1="50" y1="53" x2="50" y2="30" />
                </g>
                <g className="clock-hand hand-minute" style={{ transform: `rotate(${clockMin * 6}deg)` }}>
                  <line x1="50" y1="54" x2="50" y2="20" />
                </g>
                <circle className="clock-pin" cx="50" cy="50" r="3.4" />
              </svg>
            </div>
            <button
              type="button"
              className="rail-btn"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Previous moment"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="rail-btn"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="Next moment"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Reveal>
        </div>
      </div>

      <div className={`rail-shell${atStart ? ' at-start' : ''}${atEnd ? ' at-end' : ''}`}>
        <div
          className="rail"
          ref={railRef}
          onScroll={syncRail}
          role="region"
          aria-label={m.title}
          tabIndex={0}
        >
          {m.cards.map((card) => {
            const meta = CARD_META[card.key];
            if (!meta) return null;
            return (
              <Link
                key={card.key}
                href={`/${language}/${meta.path}`}
                className="moment-card"
                data-moment-card=""
                style={{ '--card-accent': meta.accent } as React.CSSProperties}
              >
                <div className="card-media">
                  <img
                    src={meta.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="card-scrim" aria-hidden="true" />
                  <span className="time-chip">{card.time}</span>
                  <div className="card-body">
                    <span className="card-tag">{card.tag}</span>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-text">{card.text}</p>
                  </div>
                </div>
              </Link>
            );
          })}
          {/* Trailing spacer so the last card can clear the right gutter. */}
          <span className="rail-tail" aria-hidden="true" />
        </div>
      </div>

      <style jsx>{`
        .moments-section {
          width: 100%;
          background: var(--surface);
          /* The rail's own 2rem block-end padding (shadow room) is
             subtracted here so the section reads as evenly padded. */
          padding: var(--section-pad) 0 max(1.5rem, calc(var(--section-pad) - 2rem));
          overflow: hidden;
        }

        .moments-inner {
          max-width: var(--container-wide);
          margin: 0 auto;
          padding: 0 3rem;
        }

        /* ---- Header: copy left, rail controls bottom-right ---- */
        .moments-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2.5rem;
          margin-bottom: clamp(1.6rem, 3vw, 2.25rem);
        }

        .head-copy {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          max-width: 46rem;
        }

        .head-copy :global(.eyebrow-row) {
          display: block;
        }

        .head-copy :global(.moments-title) {
          font-size: clamp(2.2rem, 4.2vw, 3.4rem);
          color: var(--text-heading);
          margin: 0;
          max-width: 22em;
        }

        .head-copy :global(.moments-desc p) {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-body);
          max-width: 36em;
        }

        .moments-head :global(.head-controls) {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-shrink: 0;
          padding-bottom: 0.35rem;
        }

        /* ---- The dial: hands driven by cumulative minutes, so they spin
               with the rail rather than snapping. Pin picks up the active
               card's accent. ---- */
        .moments-head :global(.rail-clock) {
          width: 64px;
          height: 64px;
          margin-right: 0.85rem;
        }

        .moments-head :global(.rail-clock svg) {
          width: 100%;
          height: 100%;
          display: block;
        }

        .moments-head :global(.clock-face) {
          fill: var(--surface);
          stroke: var(--hairline);
          stroke-width: 2;
        }

        .moments-head :global(.clock-tick) {
          stroke: rgba(16, 51, 61, 0.16);
          stroke-width: 2;
          transform-origin: 50px 50px;
        }

        .moments-head :global(.tick-main) {
          stroke: rgba(16, 51, 61, 0.34);
        }

        .moments-head :global(.clock-hand) {
          transform-origin: 50px 50px;
          transition: transform 0.9s var(--ease);
        }

        .moments-head :global(.clock-hand line) {
          stroke: var(--petrol);
          stroke-linecap: round;
        }

        .moments-head :global(.hand-hour line) {
          stroke-width: 4.5;
        }

        .moments-head :global(.hand-minute line) {
          stroke-width: 3;
        }

        .moments-head :global(.clock-pin) {
          fill: var(--clock-accent, var(--turquoise-deep));
          transition: fill var(--dur-fast) var(--ease);
        }

        @media (prefers-reduced-motion: reduce) {
          .moments-head :global(.clock-hand) {
            transition: none;
          }
        }

        .moments-head :global(.rail-btn) {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          background: var(--surface);
          color: var(--petrol);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--dur-fast) var(--ease),
            background var(--dur-fast) var(--ease),
            border-color var(--dur-fast) var(--ease),
            opacity var(--dur-fast) var(--ease);
        }

        .moments-head :global(.rail-btn:hover:not(:disabled)) {
          background: var(--surface-mist);
          border-color: var(--petrol);
          transform: translateY(-2px);
        }

        .moments-head :global(.rail-btn:disabled) {
          opacity: 0.32;
          cursor: default;
        }

        /* ---- Rail: edge fades hint at more cards in both directions ---- */
        .rail-shell {
          position: relative;
        }

        .rail-shell::before,
        .rail-shell::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: clamp(1.5rem, 4vw, 4rem);
          z-index: 2;
          pointer-events: none;
          transition: opacity var(--dur-fast) var(--ease);
        }

        .rail-shell::before {
          left: 0;
          background: linear-gradient(to right, var(--surface), rgba(255, 255, 255, 0));
        }

        .rail-shell::after {
          right: 0;
          background: linear-gradient(to left, var(--surface), rgba(255, 255, 255, 0));
        }

        .rail-shell.at-start::before {
          opacity: 0;
        }

        .rail-shell.at-end::after {
          opacity: 0;
        }

        /* The rail is full-bleed so cards can bleed past the container edge,
           but its gutter matches the header's container inset so the first
           card lines up with the headline. scroll-padding keeps the snap
           positions honest against that gutter. */
        .rail {
          /* Mirrors .moments-inner's inset exactly: the container's own
             centring offset plus its 3rem padding. Uses % (not vw) so a
             visible scrollbar can't push the two out of alignment. */
          --rail-gutter: calc(max(0px, (100% - var(--container-wide)) / 2) + 3rem);
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-padding-left: var(--rail-gutter);
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          /* overflow-x:auto forces overflow-y to auto too, so the rail
             clips vertically — the block padding is what keeps the cards'
             hover lift and soft shadow from being cut off. */
          padding: 0.75rem var(--rail-gutter) 2rem;
        }

        .rail::-webkit-scrollbar {
          display: none;
        }

        .rail-tail {
          flex: 0 0 1px;
        }

        /* ---- Card ---- */
        .rail :global(.moment-card) {
          flex: 0 0 clamp(300px, 26vw, 380px);
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-lg);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          box-shadow: var(--shadow-soft);
          transition: transform var(--dur-fast) var(--ease),
            box-shadow var(--dur-fast) var(--ease),
            border-color var(--dur-fast) var(--ease);
        }

        .rail :global(.moment-card:hover) {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lift);
          border-color: rgba(16, 51, 61, 0.16);
        }

        .card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: var(--surface-mist);
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.2s var(--ease);
        }

        .rail :global(.moment-card:hover) .card-media img {
          transform: scale(1.04);
        }

        /* Deep petrol fade rising from the bottom edge — carries the
           overlaid copy without a solid panel. */
        .card-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(11, 36, 43, 0.86) 0%,
            rgba(11, 36, 43, 0.52) 32%,
            rgba(11, 36, 43, 0) 62%
          );
          pointer-events: none;
        }

        /* Time chip — filled with the card's accent (the same color its
           dial pin takes), white type on top. Lives in the top corner now
           that the copy owns the bottom of the image. */
        .time-chip {
          position: absolute;
          left: 1rem;
          top: 1rem;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          padding: 0.45rem 0.95rem;
          background: var(--card-accent, var(--petrol));
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: var(--radius-pill);
          box-shadow: var(--shadow-soft);
          font-family: var(--font-display-family);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #fff;
          font-variant-numeric: tabular-nums;
        }

        /* Copy overlays the bottom of the photo, inside the same box. */
        .card-body {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 0 1.5rem 1.4rem;
        }

        .card-tag {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.72);
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.25;
          color: #fff;
          margin: 0;
        }

        .card-text {
          font-size: 0.9rem;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.86);
          margin: 0;
        }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 1024px) {
          .moments-inner {
            padding: 0 1.5rem;
          }

          .moments-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.75rem;
          }

          .rail {
            --rail-gutter: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .moments-inner {
            padding: 0 1.25rem;
          }

          .rail {
            --rail-gutter: 1.25rem;
            gap: 1rem;
          }

          .rail :global(.moment-card) {
            flex: 0 0 82%;
            max-width: 340px;
          }

          .card-body {
            padding: 0 1.25rem 1.2rem;
          }
        }
      `}</style>
    </section>
  );
}
