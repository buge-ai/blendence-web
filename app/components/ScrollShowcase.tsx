'use client';

/**
 * ScrollShowcase — the scroll-driven product showcase used by BOTH homepage
 * product sections (Stages, 3 products; Reset, 2). Data and copy come in as
 * props; this file owns only the behaviour and the layout.
 *
 * Client's brief (Stages, then reused for Reset): "the transparent product
 * images stay on the right vertically. the first one is focused, and the
 * title, description and glass on the left. while the user scrolls down the
 * product changes too and the next one gets focused. and we can put lines on
 * the left side so the user can understand it."
 *
 * Desktop (> 768px):
 *   An N × 100vh track (one viewport per product) with a `position: sticky`
 *   100vh stage pinned inside it. Scroll progress over the track drives
 *   `active`:
 *
 *       active = clamp(floor(progress * N), 0, N - 1)
 *
 *   so each product owns one Nth of the track. The indicator lines and the
 *   renders are both buttons that scroll the WINDOW to the CENTRE of a
 *   product's slice — (i + 0.5) / N of the scrollable range — which is the
 *   only offset guaranteed to land inside segment i rather than on a
 *   rounding-sensitive boundary.
 *
 * Mobile (≤ 768px):
 *   The desktop split-stage is swapped out (not restyled) for a VERTICAL
 *   accordion — the earlier phone layout put the renders in a row with
 *   dashes underneath, which read as a swipeable carousel, so users swiped
 *   sideways and nothing moved.
 *
 *   Same track and the same scrubbing. The products are always stacked in
 *   order; `active` expands one into a full card (render, title, whyBlend,
 *   link) while the others stay as compact render-left / name-right rows.
 *   So the products already seen collapse ABOVE the open card and the ones
 *   still to come wait BELOW it — the layout itself states which way the
 *   section runs. Growth animates via `flex-grow` (height/flex-basis don't
 *   interpolate from auto). The rail on the left fills CONTINUOUSLY with
 *   scroll, so there's live feedback between the accordion's discrete snaps.
 *   Boxes are transparent and the open one drops its border entirely
 *   (client call). The glass is dropped on mobile, as before. The sticky
 *   uses 100dvh so a collapsing URL bar can't jump the pin.
 *
 * Copy is reused verbatim from the callers' existing translation subtrees —
 * neither section introduced NEW translation keys.
 *
 * NOTE (repo gotcha): classes handed to imported motion components (Reveal,
 * motion.*) and to CHILD components never receive the styled-jsx scope hash
 * — they are styled as :global() descendants of a scoped plain-DOM parent.
 * Never bare top-level :global().
 */

import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useMotionValueEvent,
    useReducedMotion,
    type MotionValue,
} from 'framer-motion';
import { EASE } from '@/lib/motion';

export interface ShowcaseProduct {
    id: string;
    /** Already locale-prefixed. */
    href: string;
    title: string;
    /** Bold one-liner under the title. */
    tagline: string;
    whyBlend: string[];
    /** Transparent box + sachets render (client packaging). */
    render: string;
    /** Desktop-only companion image beside the copy. */
    glass: string;
    glassFit: 'cover' | 'contain';
    /**
     * True when `glass` is a rectangular photo (.jpg) rather than a cut-out
     * PNG — it then gets a rounded frame instead of floating frameless.
     */
    glassFramed?: boolean;
    accent: string;
    tint: string;
}

interface ScrollShowcaseProps {
    sectionId: string;
    /** Accessible name for the section and the indicator rail. */
    ariaLabel: string;
    logoSrc: string;
    logoAlt: string;
    /** Already stripped of any trailing arrow glyph by the caller. */
    learnMore: string;
    products: ShowcaseProduct[];
}

const Arrow = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

const ChevronDown = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M6 9l6 6 6-6" />
    </svg>
);

/**
 * One mobile rail bar. Its own component because the product count varies
 * per section, and a hook can't be called from a variable-length loop.
 */
function RailFill({
    progress,
    index,
    count,
}: {
    progress: MotionValue<number>;
    index: number;
    count: number;
}) {
    const scaleY = useTransform(progress, [index / count, (index + 1) / count], [0, 1], {
        clamp: true,
    });
    return <motion.span className="ms-rail-fill" style={{ scaleY }} />;
}

export default function ScrollShowcase({
    sectionId,
    ariaLabel,
    logoSrc,
    logoAlt,
    learnMore,
    products,
}: ScrollShowcaseProps) {
    const reduce = useReducedMotion();
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    const count = products.length;

    /* ---- scroll → active index -------------------------------------- */
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start start', 'end end'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (progress) => {
        if (!Number.isFinite(progress)) return;
        const next = Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
        setActive((current) => (current === next ? current : next));
    });

    /* Bouncing chevron — the whole point is "scroll DOWN, not sideways".
       It retires as soon as the user takes the hint. */
    const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [0.6, 0], { clamp: true });

    /* ---- active index → scroll offset (indicator + render clicks) ---- */
    const focusIndex = useCallback(
        (index: number) => {
            const el = trackRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const trackTop = rect.top + window.scrollY;
            const range = rect.height - window.innerHeight;
            const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth';
            if (range <= 0) {
                // Un-pinned: nothing to travel through.
                window.scrollTo({ top: trackTop, behavior });
                return;
            }
            // Centre of segment `index` — floor(p * N) lands squarely on it.
            const top = trackTop + ((index + 0.5) / count) * range;
            window.scrollTo({ top, behavior });
        },
        [reduce, count]
    );

    const current = products[active];

    return (
        <section id={sectionId} className="ss-section" aria-label={ariaLabel}>
            {/* ================= DESKTOP: pinned scroll stage ================= */}
            {/* One viewport of scroll per product. */}
            <div ref={trackRef} className="ss-track" style={{ height: `${count * 100}vh` }}>
                <div
                    className="ss-sticky"
                    style={
                        {
                            '--accent': current.accent,
                            '--tint': current.tint,
                        } as React.CSSProperties
                    }
                >
                    {/* Logo lives INSIDE the pinned scene (client request) —
                        floats top-left, visible through every product. Logo
                        only: a subheading here collided with the copy card on
                        shorter viewports, so the client cut it. */}
                    <div className="ss-pin-head">
                        <span className="ss-logo">
                            <Image
                                src={logoSrc}
                                alt={logoAlt}
                                width={400}
                                height={140}
                                style={{ objectFit: 'contain', height: 'auto', maxWidth: '100%' }}
                            />
                        </span>
                    </div>

                    <div className="ss-stage">
                        {/* ---- LEFT: indicator rail + crossfading copy ---- */}
                        <div className="ss-left">
                            <div className="ss-rail" aria-label={ariaLabel}>
                                {products.map((p, i) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        aria-current={i === active}
                                        className={`ss-rail-btn${i === active ? ' is-active' : ''}`}
                                        style={{ '--bar': p.accent } as React.CSSProperties}
                                        onClick={() => focusIndex(i)}
                                    >
                                        <span className="ss-rail-bar" />
                                        <span className="ss-sr">{p.title}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="ss-copy">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.div
                                        key={current.id}
                                        className="ss-card"
                                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                                        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                                        transition={{ duration: reduce ? 0.2 : 0.45, ease: EASE }}
                                    >
                                        <div className="ss-text">
                                            <h3 className="ss-title font-display">
                                                {current.title}
                                                <span className="ss-tm">™</span>
                                            </h3>
                                            <p className="ss-tagline">{current.tagline}</p>
                                            <ul className="ss-why">
                                                {current.whyBlend.map((line, j) => (
                                                    <li key={j}>{line}</li>
                                                ))}
                                            </ul>
                                            <Link href={current.href} className="ss-link">
                                                {learnMore}
                                                <Arrow />
                                            </Link>
                                        </div>
                                        <span
                                            className={`ss-glass${
                                                current.glassFramed ? ' is-framed' : ''
                                            }`}
                                        >
                                            <Image
                                                src={current.glass}
                                                alt={current.title}
                                                fill
                                                sizes="(max-width: 1024px) 30vw, 260px"
                                                style={{ objectFit: current.glassFit }}
                                            />
                                        </span>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* ---- RIGHT: every render, all visible ---- */}
                        <div className="ss-stack">
                            {products.map((p, i) => (
                                <button
                                    key={p.id}
                                    type="button"
                                    className={`ss-sachet${i === active ? ' is-active' : ''}`}
                                    onClick={() => focusIndex(i)}
                                    aria-label={p.title}
                                    aria-current={i === active}
                                >
                                    <span className="ss-sachet-img">
                                        <Image
                                            src={p.render}
                                            alt=""
                                            fill
                                            sizes="(max-width: 1024px) 30vw, 340px"
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ============ MOBILE: vertical accordion ============
                        Same scrub, different metaphor. The active product
                        expands; the rest stay as compact rows above and below
                        it, so the section is unambiguously VERTICAL.
                        Hidden ≥769px. */}
                    <div className="ms-wrap">
                        <div className="ms-rail" aria-hidden="true">
                            <div className="ms-rail-segs">
                                {products.map((p, i) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        tabIndex={-1}
                                        className="ms-rail-seg"
                                        onClick={() => focusIndex(i)}
                                    >
                                        <RailFill
                                            progress={scrollYProgress}
                                            index={i}
                                            count={count}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="ms-list">
                            {products.map((p, i) => (
                                <div
                                    key={p.id}
                                    className={`ms-item${i === active ? ' is-active' : ''}`}
                                    style={{ '--card-accent': p.accent } as React.CSSProperties}
                                >
                                    {i === active ? (
                                        <motion.div
                                            className="ms-open"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                duration: reduce ? 0.2 : 0.4,
                                                delay: reduce ? 0 : 0.14,
                                                ease: EASE,
                                            }}
                                        >
                                            <span className="ms-open-head">
                                                <span className="ms-step">
                                                    {`0${i + 1}`}
                                                    <em>{` / 0${count}`}</em>
                                                </span>
                                                {/* Cue only on the first card;
                                                    it retires once you scroll. */}
                                                {i === 0 && (
                                                    <motion.span
                                                        className="ms-hint"
                                                        style={{ opacity: hintOpacity }}
                                                        aria-hidden="true"
                                                    >
                                                        <ChevronDown />
                                                    </motion.span>
                                                )}
                                            </span>
                                            <span className="ms-hero">
                                                <Image
                                                    src={p.render}
                                                    alt=""
                                                    fill
                                                    sizes="80vw"
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </span>
                                            <h3 className="ms-open-title font-display">
                                                {p.title}
                                                <span className="ss-tm">™</span>
                                            </h3>
                                            <ul className="ms-why">
                                                {p.whyBlend.map((line, j) => (
                                                    <li key={j}>{line}</li>
                                                ))}
                                            </ul>
                                            <Link href={p.href} className="ms-open-link">
                                                {learnMore}
                                                <Arrow />
                                            </Link>
                                        </motion.div>
                                    ) : (
                                        /* Collapsed: render left, name right. */
                                        <button
                                            type="button"
                                            className="ms-row"
                                            onClick={() => focusIndex(i)}
                                        >
                                            <span className="ms-thumb">
                                                <Image
                                                    src={p.render}
                                                    alt=""
                                                    fill
                                                    sizes="90px"
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </span>
                                            <span className="ms-name font-display">
                                                {p.title}
                                                <span className="ss-tm">™</span>
                                            </span>
                                            <span className="ms-num">{`0${i + 1}`}</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .ss-section {
                    position: relative;
                    width: 100%;
                    background: var(--surface);
                }

                /* ---- In-scene header: floats over the pinned stage ---- */
                .ss-pin-head {
                    position: absolute;
                    top: 5.5rem;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    max-width: var(--container-wide);
                    padding: 0.75rem 3rem 0;
                    z-index: 2;
                    /* Decorative here — never block rail/sachet clicks. */
                    pointer-events: none;
                }

                .ss-logo {
                    display: block;
                    width: min(210px, 30vw);
                }

                /* ---- Scroll track ----
                   Height is set inline (count × 100vh) — it varies per
                   section, and useScroll measures the element either way. */
                .ss-track {
                    position: relative;
                }

                .ss-sticky {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    /* The nav is fixed — leave room for it inside the pin
                       rather than shortening the sticky viewport. */
                    padding: 5.5rem 0 2rem;
                    box-sizing: border-box;
                    /* One minimalist studio plate for all three products
                       (client killed the per-product tint crossfade). */
                    background: url('/images/main/showcase-bg.jpg') center / cover
                        no-repeat var(--surface-mist);
                }

                .ss-stage {
                    width: 100%;
                    max-width: var(--container-wide);
                    margin: 0 auto;
                    padding: 0 3rem;
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) minmax(220px, 0.42fr);
                    gap: clamp(1.5rem, 3vw, 3rem);
                    align-items: center;
                }

                /* ---- Left column ---- */
                .ss-left {
                    display: grid;
                    grid-template-columns: 76px 1fr;
                    align-items: center;
                    gap: 0.5rem;
                }

                /* The three lines the client asked for. */
                .ss-rail {
                    display: flex;
                    flex-direction: column;
                    gap: 0.85rem;
                    align-items: flex-start;
                }

                .ss-rail-btn {
                    display: block;
                    padding: 0.35rem 0;
                    background: none;
                    border: 0;
                    cursor: pointer;
                    position: relative;
                }

                .ss-rail-bar {
                    display: block;
                    width: 44px;
                    height: 3px;
                    border-radius: 999px;
                    background: var(--hairline);
                    transition: width 0.45s var(--ease), background-color 0.45s var(--ease);
                }

                .ss-rail-btn.is-active .ss-rail-bar {
                    width: 64px;
                    background: var(--bar);
                }

                /* Product name kept for screen readers / the accessible name
                   of each line — the bars stay the only visual. */
                .ss-sr {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip-path: inset(50%);
                    white-space: nowrap;
                    border: 0;
                }

                .ss-rail-btn:hover .ss-rail-bar,
                .ss-rail-btn:focus-visible .ss-rail-bar {
                    width: 64px;
                    background: var(--bar);
                }

                .ss-copy {
                    position: relative;
                    min-height: 380px;
                    display: flex;
                    align-items: center;
                }

                /* .ss-card is handed to motion.div — no scope hash, so it and
                   the imported <Link> inside it are styled as :global()
                   descendants of this scoped parent. */
                .ss-copy :global(.ss-card) {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) clamp(210px, 20vw, 300px);
                    gap: clamp(1.25rem, 2.5vw, 2.5rem);
                    align-items: center;
                    width: 100%;
                }

                .ss-text {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.7rem;
                }

                .ss-title {
                    font-size: clamp(2.2rem, 3.6vw, 3.1rem);
                    line-height: 1.05;
                    color: var(--text-heading);
                    margin: 0;
                }

                .ss-tm {
                    font-size: 0.34em;
                    vertical-align: super;
                    margin-left: 0.15em;
                    color: var(--accent);
                }

                .ss-tagline {
                    font-size: 1.02rem;
                    font-weight: 600;
                    line-height: 1.5;
                    color: var(--text-heading);
                    margin: 0;
                    max-width: 26em;
                }

                /* "Why this blend" — accent-dashed list, replaces the old
                   single desc paragraph (client request). */
                .ss-why {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                    max-width: 32em;
                }

                .ss-why li {
                    position: relative;
                    padding-left: 1.35rem;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: var(--text-body);
                }

                .ss-why li::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0.66em;
                    width: 0.7rem;
                    height: 2px;
                    border-radius: 1px;
                    background: var(--accent, var(--turquoise-deep));
                }

                /* Ghost pill, matching globals' .btn-ghost. Imported <Link> →
                   :global() under a scoped parent (see note at top). */
                .ss-copy :global(.ss-link) {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 0.35rem;
                    padding: 0.75rem 1.6rem;
                    background: rgba(255, 255, 255, 0.7);
                    color: var(--petrol);
                    border: 1px solid var(--hairline);
                    border-radius: var(--radius-pill);
                    font-weight: 600;
                    font-size: 0.88rem;
                    letter-spacing: 0.02em;
                    text-decoration: none;
                    transition: transform var(--dur-fast) var(--ease),
                        background var(--dur-fast) var(--ease),
                        border-color var(--dur-fast) var(--ease),
                        color var(--dur-fast) var(--ease);
                }

                .ss-copy :global(.ss-link:hover) {
                    background: var(--petrol);
                    border-color: var(--petrol);
                    color: #fff;
                    transform: translateY(-2px);
                }

                /* Glass — keyed to a transparent PNG, so it floats frameless
                   over the backdrop like the packaging renders do. */
                .ss-glass {
                    display: block;
                    position: relative;
                    width: 100%;
                    height: clamp(280px, 34vh, 340px);
                    filter: drop-shadow(0 20px 40px rgba(26, 77, 92, 0.16));
                }

                /* Reset's companion shots are rectangular photos, not cut-out
                   PNGs — a drop-shadow on a .jpg just outlines the crop, so
                   frame them instead. */
                .ss-glass.is-framed {
                    height: clamp(300px, 46vh, 460px);
                    border-radius: 20px;
                    overflow: hidden;
                    filter: none;
                    box-shadow: 0 20px 44px rgba(26, 77, 92, 0.16);
                }

                /* ---- Right column: three sachets, stacked ---- */
                .ss-stack {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1vh;
                    width: 100%;
                    max-width: 300px;
                    margin: 0 auto;
                }

                .ss-sachet {
                    display: block;
                    width: 100%;
                    background: none;
                    border: 0;
                    padding: 0;
                    cursor: pointer;
                    opacity: 0.35;
                    transform: scale(0.9);
                    transition: opacity 0.5s var(--ease), transform 0.5s var(--ease),
                        filter 0.5s var(--ease);
                }

                .ss-sachet.is-active {
                    opacity: 1;
                    transform: scale(1.08);
                    filter: drop-shadow(0 18px 34px rgba(16, 51, 61, 0.18));
                }

                .ss-sachet-img {
                    display: block;
                    position: relative;
                    width: 100%;
                    height: 26vh;
                }

                /* ---- Reduced motion ---- */
                @media (prefers-reduced-motion: reduce) {
                    .ss-sticky,
                    .ss-rail-bar,
                    .ss-sachet {
                        transition: none;
                    }

                    .ss-sachet,
                    .ss-sachet.is-active {
                        transform: none;
                        filter: none;
                    }
                }

                /* ---- Narrower desktops ---- */
                @media (max-width: 1024px) {
                    .ss-stage {
                        padding: 0 1.5rem;
                        grid-template-columns: 1fr 0.62fr;
                        gap: 1.5rem;
                    }

                    .ss-left {
                        grid-template-columns: 60px 1fr;
                    }

                    .ss-glass {
                        height: 200px;
                    }

                    .ss-copy {
                        min-height: 430px;
                    }
                }

                /* ================= MOBILE: vertical card stack ====================
                   The old phone layout laid the three renders out in a ROW with
                   a row of dashes under them — which read as a swipeable
                   carousel, so people swiped sideways and nothing happened.
                   Replaced by three stacked boxes that rise from the bottom.
                   Off by default; the media query below turns it on. */
                .ms-wrap {
                    display: none;
                    flex: 1;
                    min-height: 0;
                    gap: 0.75rem;
                    padding: 0.5rem 1rem 0;
                }

                /* ---- Left rail: three bars, each filling across its third ---- */
                .ms-rail {
                    flex: 0 0 18px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0.4rem 0 1rem;
                }

                .ms-rail-segs {
                    flex: 1;
                    min-height: 0;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                }

                .ms-rail-seg {
                    flex: 1;
                    width: 4px;
                    min-height: 0;
                    padding: 0;
                    border: 0;
                    border-radius: 999px;
                    background: rgba(26, 77, 92, 0.14);
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                }

                /* motion.span → no scope hash (see note at top of file).
                   Neutral, not per-product accent — the rail is a progress
                   readout, not another place to put brand colour. */
                .ms-rail :global(.ms-rail-fill) {
                    display: block;
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    background: var(--petrol);
                    transform-origin: top center;
                }

                /* ---- The accordion ----
                   All three boxes are always stacked in order. The active one
                   grows to fill; the other two stay as compact render-left /
                   name-right rows, so the ones already seen sit ABOVE and the
                   ones still to come sit BELOW. Growth is animated by
                   transitioning flex-grow, which — unlike height/flex-basis —
                   interpolates cleanly. */
                .ms-list {
                    flex: 1;
                    min-height: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.55rem;
                }

                /* Transparent throughout — the studio plate behind the pin is
                   the only background. Collapsed rows keep a hairline so they
                   still read as separate boxes; the open one drops its frame
                   entirely and sits directly on the plate. */
                .ms-item {
                    flex: 0 1 70px;
                    min-height: 70px;
                    position: relative;
                    overflow: hidden;
                    box-sizing: border-box;
                    border-radius: 18px;
                    border: 1px solid var(--hairline);
                    background: transparent;
                    transition: flex-grow 0.55s var(--ease), border-color 0.4s var(--ease);
                }

                .ms-item.is-active {
                    flex-grow: 1;
                    border-color: transparent;
                }

                /* ---- Collapsed row ---- */
                .ms-row {
                    display: flex;
                    align-items: center;
                    gap: 0.85rem;
                    width: 100%;
                    height: 100%;
                    min-height: 68px;
                    padding: 0 1rem;
                    background: none;
                    border: 0;
                    text-align: left;
                    cursor: pointer;
                }

                .ms-thumb {
                    display: block;
                    position: relative;
                    flex: none;
                    width: 74px;
                    height: 50px;
                }

                .ms-name {
                    font-size: 1.15rem;
                    line-height: 1.1;
                    color: var(--text-heading);
                }

                .ms-num {
                    margin-left: auto;
                    font-size: 0.68rem;
                    font-weight: 700;
                    letter-spacing: 0.16em;
                    color: var(--text-body);
                    opacity: 0.5;
                }

                /* ---- Expanded card ---- */
                /* motion.div → :global under the scoped .ms-item. */
                .ms-item :global(.ms-open) {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.4rem;
                    height: 100%;
                    padding: 0.8rem 1.1rem 1rem;
                    box-sizing: border-box;
                }

                .ms-open-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                }

                .ms-step {
                    font-size: 0.68rem;
                    font-weight: 700;
                    letter-spacing: 0.16em;
                    color: var(--text-body);
                    opacity: 0.65;
                }

                .ms-step em {
                    font-style: normal;
                    opacity: 0.5;
                }

                /* The "scroll DOWN" cue. Lives in the card header, not at the
                   rail's foot — that's where floating site widgets sit. */
                .ms-open-head :global(.ms-hint) {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    border-radius: 999px;
                    color: var(--petrol);
                    background: rgba(255, 255, 255, 0.8);
                    border: 1px solid var(--hairline);
                    animation: ms-bob 1.7s var(--ease) infinite;
                }

                @keyframes ms-bob {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(5px);
                    }
                }

                /* Bleeds past the card padding so the wide box render fills
                   the width — object-fit contain otherwise letterboxes it. */
                .ms-hero {
                    display: block;
                    position: relative;
                    width: calc(100% + 1.4rem);
                    margin: 0 -0.7rem;
                    flex: 1 1 0;
                    min-height: 84px;
                }

                .ms-open-title {
                    font-size: clamp(1.5rem, 7vw, 2rem);
                    line-height: 1.05;
                    color: var(--text-heading);
                    margin: 0;
                }

                .ms-why {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                }

                .ms-why li {
                    position: relative;
                    padding-left: 1.1rem;
                    font-size: 0.78rem;
                    line-height: 1.45;
                    color: var(--text-body);
                }

                .ms-why li::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0.62em;
                    width: 0.6rem;
                    height: 2px;
                    border-radius: 1px;
                    background: var(--card-accent);
                }

                /* Imported <Link> → :global (see note at top of file). */
                .ms-item :global(.ms-open-link) {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 0.15rem;
                    padding: 0.55rem 1.25rem;
                    background: rgba(255, 255, 255, 0.75);
                    color: var(--petrol);
                    border: 1px solid var(--hairline);
                    border-radius: var(--radius-pill);
                    font-weight: 600;
                    font-size: 0.82rem;
                    letter-spacing: 0.02em;
                    text-decoration: none;
                }

                @media (max-width: 768px) {
                    .ss-sticky {
                        height: 100vh;
                        height: 100dvh;
                        flex-direction: column;
                        align-items: stretch;
                        justify-content: flex-start;
                        padding: 5rem 0 0;
                    }

                    .ss-pin-head {
                        position: static;
                        transform: none;
                        padding: 0 1.25rem;
                    }

                    .ss-logo {
                        width: min(160px, 42vw);
                    }

                    /* The desktop split-stage is fully replaced below 768px. */
                    .ss-stage {
                        display: none;
                    }

                    .ms-wrap {
                        display: flex;
                    }
                }

                /* Short phones (iPhone SE and friends): the open card only gets
                   ~350px, and whyBlend runs to nine lines. Tighten everything
                   rather than clip the CTA off the bottom. */
                @media (max-width: 768px) and (max-height: 740px) {
                    /* Reclaim what we can and hand it to the render, which is
                       last in line for space (it is the flexing element).
                       NOT from .ss-sticky's top padding — that 5rem is what
                       clears the fixed nav pill, and the logo tucks under it
                       the moment it shrinks. */
                    .ss-logo {
                        width: min(132px, 36vw);
                    }

                    .ms-wrap {
                        padding-bottom: 0.5rem;
                    }

                    .ms-list {
                        gap: 0.4rem;
                    }

                    .ms-item {
                        flex-basis: 56px;
                        min-height: 56px;
                    }

                    .ms-row {
                        min-height: 54px;
                        padding: 0 0.8rem;
                        gap: 0.7rem;
                    }

                    .ms-thumb {
                        width: 62px;
                        height: 42px;
                    }

                    .ms-name {
                        font-size: 1rem;
                    }

                    .ms-item :global(.ms-open) {
                        padding: 0.55rem 0.9rem 0.7rem;
                        gap: 0.3rem;
                    }

                    .ms-hero {
                        min-height: 56px;
                    }

                    .ms-open-title {
                        font-size: 1.3rem;
                    }

                    .ms-why {
                        gap: 0.28rem;
                    }

                    .ms-why li {
                        font-size: 0.72rem;
                        line-height: 1.38;
                    }

                    .ms-item :global(.ms-open-link) {
                        padding: 0.45rem 1rem;
                        font-size: 0.78rem;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .ms-open-head :global(.ms-hint) {
                        animation: none;
                    }

                    .ms-item {
                        transition: none;
                    }
                }
            `}</style>
        </section>
    );
}
