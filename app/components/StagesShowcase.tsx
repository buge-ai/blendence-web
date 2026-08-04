'use client';

/**
 * StagesShowcase — the scroll-driven Stages section (homepage).
 *
 * Client's brief: "three transparent product images stay on the right
 * vertically. the first one is focused, and the title, description and glass
 * on the left. while the user scrolls down the product changes too and the
 * next one gets focused. and we can put three lines on the left side so the
 * user can understand it."
 *
 * Desktop (> 768px):
 *   A 300vh track (one viewport per product) with a `position: sticky`
 *   100vh stage pinned inside it. Scroll progress over the track drives
 *   `active` (0 → 1 → 2 = KidGrow → KidRise → TeenFocus):
 *
 *       active = clamp(floor(progress * 3), 0, 2)
 *
 *   so each product owns one third of the track. The three indicator lines
 *   and the three sachets are both buttons that scroll the WINDOW to the
 *   CENTRE of a product's third — (i + 0.5) / 3 of the scrollable range —
 *   which is the only offset guaranteed to land inside segment i rather than
 *   on a rounding-sensitive boundary.
 *
 * Mobile (≤ 768px):
 *   Same pinned track, restyled as one compact column — logo, the three
 *   renders in a horizontal row, horizontal indicator dashes, then the
 *   crossfading copy. The glass is hidden (client call: no room for it),
 *   and the sticky uses 100dvh so the collapsing URL bar can't jump it.
 *
 * Copy is reused verbatim from `t.mainPage.stagesCarousel` — this component
 * introduced NO new translation keys.
 *
 * NOTE (repo gotcha): classes handed to imported motion components (Reveal,
 * motion.*) never receive the styled-jsx scope hash — they are styled as
 * :global() descendants of a scoped plain-DOM parent. Never bare top-level
 * :global().
 */

import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
    useReducedMotion,
} from 'framer-motion';
import { EASE } from '@/lib/motion';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

const PRODUCT_KEYS = ['kidgrow', 'kidrise', 'teenfocus'] as const;
type ProductKey = (typeof PRODUCT_KEYS)[number];

interface StageEntry {
    id: ProductKey;
    href: string;
    /** Transparent box + sachets render (client packaging) — the right-hand stack. */
    render: string;
    /** Prepared glass, keyed to a transparent PNG — floats frameless. */
    glass: string;
    glassFit: 'cover' | 'contain';
    accent: string;
    tint: string;
}

const PRODUCT_DATA: StageEntry[] = [
    {
        id: 'kidgrow',
        href: '/stages/kidgrow',
        render: '/images/boxes/kidgrow-box.png',
        glass: '/images/glasses/kidgrow-glass-cut.png',
        glassFit: 'contain',
        accent: 'var(--kidgrow)',
        tint: 'var(--kidgrow-tint)',
    },
    {
        id: 'kidrise',
        href: '/stages/kidrise',
        render: '/images/boxes/kidrise-box.png',
        glass: '/images/glasses/kidrise-glass-cut.png',
        glassFit: 'contain',
        accent: 'var(--kidrise)',
        tint: 'var(--kidrise-tint)',
    },
    {
        id: 'teenfocus',
        href: '/stages/teenfocus',
        render: '/images/boxes/teenfocus-box.png',
        glass: '/images/glasses/teenfocus-glass-cut.png',
        glassFit: 'contain',
        accent: 'var(--teenfocus)',
        tint: 'var(--teenfocus-tint)',
    },
];

const COUNT = PRODUCT_DATA.length;

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

export default function StagesShowcase() {
    const { t, language } = useLanguage();
    const reduce = useReducedMotion();
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    const copy = t.mainPage.stagesCarousel;
    /* The shared string already ends in an arrow glyph in some locales —
       strip it so the button's own SVG chevron isn't doubled. */
    const learnMore = copy.learnMore.replace(/[→›»>]+\s*$/, '').trim();

    const products = PRODUCT_DATA.map((entry) => {
        const tr = copy.products[entry.id];
        return {
            ...entry,
            href: `/${language}${entry.href}`,
            title: tr.title,
            tagline: tr.tagline,
            whyBlend: tr.whyBlend,
        };
    });

    /* ---- scroll → active index -------------------------------------- */
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start start', 'end end'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (progress) => {
        if (!Number.isFinite(progress)) return;
        const next = Math.min(COUNT - 1, Math.max(0, Math.floor(progress * COUNT)));
        setActive((current) => (current === next ? current : next));
    });

    /* ---- active index → scroll offset (indicator + sachet clicks) ---- */
    const focusIndex = useCallback(
        (index: number) => {
            const el = trackRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const trackTop = rect.top + window.scrollY;
            const range = rect.height - window.innerHeight;
            const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth';
            if (range <= 0) {
                // Mobile / un-pinned: nothing to travel through.
                window.scrollTo({ top: trackTop, behavior });
                return;
            }
            // Centre of segment `index` — floor(p * 3) lands squarely on it.
            const top = trackTop + ((index + 0.5) / COUNT) * range;
            window.scrollTo({ top, behavior });
        },
        [reduce]
    );

    const current = products[active];

    return (
        <section id="stages-section" className="ss-section" aria-label={copy.heading}>
            {/* ================= DESKTOP: pinned scroll stage ================= */}
            <div ref={trackRef} className="ss-track">
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
                        floats top-left, visible through all three products.
                        Logo only: a subheading here collided with the copy
                        card on shorter viewports, so the client cut it. */}
                    <div className="ss-pin-head">
                        <span className="ss-logo">
                            <Image
                                src={blob('logos/reset_stage_logo_stages_org_color.png')}
                                alt="Stages"
                                width={400}
                                height={140}
                                style={{ objectFit: 'contain', height: 'auto', maxWidth: '100%' }}
                            />
                        </span>
                    </div>

                    <div className="ss-stage">
                        {/* ---- LEFT: indicator rail + crossfading copy ---- */}
                        <div className="ss-left">
                            <div className="ss-rail" aria-label={copy.heading}>
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
                                        <span className="ss-glass">
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

                        {/* ---- RIGHT: the three sachets, all visible ---- */}
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

                /* ---- Scroll track: one viewport per product ---- */
                .ss-track {
                    position: relative;
                    height: 300vh;
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

                /* ================= MOBILE ≤768px: compact pinned column ===========
                   Same 300vh track and scrubbing — only the stage is restyled.
                   dvh keeps the pin steady while the URL bar collapses. */
                @media (max-width: 768px) {
                    .ss-sticky {
                        height: 100vh;
                        height: 100dvh;
                        flex-direction: column;
                        align-items: stretch;
                        justify-content: flex-start;
                        padding: 4.5rem 0 0.75rem;
                    }

                    .ss-pin-head {
                        position: static;
                        transform: none;
                        padding: 0 1.25rem;
                    }

                    .ss-logo {
                        width: min(170px, 44vw);
                    }

                    .ss-stage {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                        padding: 0.4rem 1.25rem 0;
                        flex: 1;
                        min-height: 0;
                    }

                    /* Renders first, as a horizontal row of three. */
                    .ss-stack {
                        order: -1;
                        flex-direction: row;
                        justify-content: center;
                        gap: 0.5rem;
                        max-width: none;
                    }

                    .ss-sachet {
                        width: 33%;
                        /* 0.35 desktop dim washes the pale boxes out entirely
                           at phone size — keep them readable. */
                        opacity: 0.55;
                    }

                    .ss-sachet.is-active {
                        opacity: 1;
                        transform: scale(1.06);
                    }

                    .ss-sachet-img {
                        height: 11vh;
                        height: 11dvh;
                    }

                    .ss-left {
                        display: flex;
                        flex-direction: column;
                        align-items: stretch;
                        gap: 0.5rem;
                        flex: 1;
                        min-height: 0;
                    }

                    .ss-rail {
                        flex-direction: row;
                        gap: 1.1rem;
                    }

                    .ss-copy {
                        min-height: 0;
                        flex: 1;
                        align-items: flex-start;
                    }

                    .ss-copy :global(.ss-card) {
                        grid-template-columns: 1fr;
                        gap: 0;
                    }

                    /* Client call: no glasses on mobile — no room for them. */
                    .ss-glass {
                        display: none;
                    }

                    .ss-title {
                        font-size: clamp(1.6rem, 7.2vw, 2.1rem);
                    }

                    .ss-tagline {
                        font-size: 0.9rem;
                    }

                    .ss-why {
                        gap: 0.45rem;
                    }

                    .ss-why li {
                        font-size: 0.84rem;
                        line-height: 1.45;
                    }

                    .ss-copy :global(.ss-link) {
                        padding: 0.55rem 1.25rem;
                        font-size: 0.85rem;
                        margin-top: 0.15rem;
                    }
                }
            `}</style>
        </section>
    );
}
