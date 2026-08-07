'use client';

/**
 * StagesShowcase — the Stages section of the homepage.
 *
 * All behaviour and layout live in ScrollShowcase, which the Reset section
 * uses too; this file is just the Stages data + copy binding. See
 * ScrollShowcase.tsx for how the pinned scroll track, the desktop stage and
 * the mobile accordion work.
 *
 * Copy is reused verbatim from `t.mainPage.stagesCarousel` — no new
 * translation keys.
 */

import React from 'react';
import ScrollShowcase, { type ShowcaseProduct } from './ScrollShowcase';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

const PRODUCT_KEYS = ['kidgrow', 'kidrise', 'teenfocus'] as const;
type ProductKey = (typeof PRODUCT_KEYS)[number];

interface StageEntry {
    id: ProductKey;
    href: string;
    /** Transparent box + sachets render (client packaging). */
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

export default function StagesShowcase() {
    const { t, language } = useLanguage();
    const copy = t.mainPage.stagesCarousel;

    /* The shared string already ends in an arrow glyph in some locales —
       strip it so the button's own SVG chevron isn't doubled. */
    const learnMore = copy.learnMore.replace(/[→›»>]+\s*$/, '').trim();

    const products: ShowcaseProduct[] = PRODUCT_DATA.map((entry) => {
        const tr = copy.products[entry.id];
        return {
            ...entry,
            href: `/${language}${entry.href}`,
            title: tr.title,
            tagline: tr.tagline,
            whyBlend: tr.whyBlend,
        };
    });

    return (
        <ScrollShowcase
            sectionId="stages-section"
            ariaLabel={copy.heading}
            logoSrc={blob('logos/reset_stage_logo_stages_org_color.png')}
            logoAlt="Stages"
            learnMore={learnMore}
            products={products}
        />
    );
}
