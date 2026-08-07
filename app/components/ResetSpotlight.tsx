'use client';

/**
 * ResetSpotlight — the Reset section of the homepage.
 *
 * Runs on the same ScrollShowcase engine as Stages (client call: one
 * product-showcase language across the page), so the pinned scroll track,
 * the desktop stage and the mobile accordion all live there. This file is
 * the Reset data + copy binding, plus the two bands the Stages section
 * doesn't have: the intro paragraph above the track and the "Explore Reset
 * Range" CTA below it.
 *
 * Replaces the previous bento grid + 6s autoplay carousel. Autoplay is gone
 * — scroll position alone picks the product, so nothing advances out from
 * under a reader mid-sentence.
 *
 * Copy comes from `t.mainPage.resetSpotlight` — no new translation keys.
 * `products.*.tag` and `products.*.fullDesc` are no longer rendered here;
 * the bento boxes that carried them are gone, and the whyBlend list covers
 * the same ground. Both still render on the /reset/* detail pages.
 */

import React from 'react';
import Link from 'next/link';
import ScrollShowcase, { type ShowcaseProduct } from './ScrollShowcase';
import { Reveal } from '@/lib/motion';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

const PRODUCT_KEYS = ['balance', 'intense'] as const;
type ProductKey = (typeof PRODUCT_KEYS)[number];

interface ResetEntry {
    id: ProductKey;
    href: string;
    render: string;
    /** Lifestyle photo (.jpg), so it frames rather than floats. */
    glass: string;
    accent: string;
    tint: string;
}

const PRODUCT_DATA: ResetEntry[] = [
    {
        id: 'balance',
        href: '/reset/balance',
        render: '/images/boxes/reset-balance-box.png',
        glass: '/images/glasses/reset-balance-glass-v2.jpg',
        accent: 'var(--balance)',
        tint: 'var(--balance-tint)',
    },
    {
        id: 'intense',
        href: '/reset/intense',
        render: '/images/boxes/reset-intense-box.png',
        glass: '/images/glasses/reset-intense-glass-v2.jpg',
        accent: 'var(--intense)',
        tint: 'var(--intense-tint)',
    },
];

const Arrow = () => (
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
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

export default function ResetSpotlight() {
    const { t, language } = useLanguage();
    const copy = t.mainPage.resetSpotlight;

    /* Some locales already end the string in an arrow glyph — strip it so the
       button's own SVG chevron isn't doubled. */
    const learnMore = copy.learnMore.replace(/[→›»>]+\s*$/, '').trim();

    const products: ShowcaseProduct[] = PRODUCT_DATA.map((entry) => {
        const tr = copy.products[entry.id];
        return {
            ...entry,
            href: `/${language}${entry.href}`,
            title: tr.title,
            /* `desc` is the bold one-liner, which is the role `tagline` plays
               in the shared layout. Reset's own `tagline` is a category label
               ("Everyday: …") that the bento used as a caption. */
            tagline: tr.desc,
            whyBlend: tr.whyBlend,
            glassFit: 'cover',
            glassFramed: true,
        };
    });

    return (
        <div id="reset-section" className="rs-wrap">
            {/* The pinned scene has room for the logo only (a subheading there
                collided with the copy card), so the intro leads in above it. */}
            <Reveal className="rs-intro">
                <p className="rs-lede">{copy.subheading}</p>
            </Reveal>

            <ScrollShowcase
                sectionId="reset-showcase"
                ariaLabel={copy.heading}
                logoSrc={blob('logos/reset_stage_logo_reset_org_color.png')}
                logoAlt="Reset"
                learnMore={learnMore}
                products={products}
            />

            <Reveal className="rs-cta-band">
                <Link href={`/${language}${copy.ctaLink}`} className="btn-primary rs-cta">
                    {copy.cta}
                    <Arrow />
                </Link>
            </Reveal>

            <style jsx>{`
                .rs-wrap {
                    position: relative;
                    width: 100%;
                    background: var(--surface);
                }

                /* Reveal is an imported motion component — no styled-jsx scope
                   hash, so it and its imported children are styled as :global()
                   descendants of this scoped parent. */
                .rs-wrap :global(.rs-intro) {
                    width: 100%;
                    max-width: var(--container-wide);
                    margin: 0 auto;
                    padding: clamp(3.5rem, 8vw, 6rem) 3rem clamp(1.5rem, 4vw, 3rem);
                    box-sizing: border-box;
                }

                .rs-lede {
                    margin: 0;
                    max-width: 46em;
                    font-size: clamp(1rem, 1.5vw, 1.15rem);
                    line-height: 1.65;
                    color: var(--text-body);
                }

                .rs-wrap :global(.rs-cta-band) {
                    display: flex;
                    justify-content: center;
                    padding: clamp(2rem, 5vw, 3.5rem) 3rem clamp(3.5rem, 8vw, 5.5rem);
                }

                .rs-wrap :global(.rs-cta) {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                @media (max-width: 768px) {
                    .rs-wrap :global(.rs-intro) {
                        padding: 3rem 1.25rem 1.25rem;
                    }

                    .rs-lede {
                        font-size: 0.95rem;
                        line-height: 1.6;
                    }

                    .rs-wrap :global(.rs-cta-band) {
                        padding: 2rem 1.25rem 3.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
