'use client';

import React from 'react';
import Link from 'next/link';
import { Stagger, StaggerItem } from '@/lib/motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function ProductGroups() {
    const { t, language } = useLanguage();

    return (
        <section className="product-groups-section">
        <Stagger className="product-groups">
            <StaggerItem className="group-card stages-group">
                <div className="group-bg-overlay gradient-stages"></div>
                <div className="group-tint"></div>
                <Link href={`/${language}/stages`} className="group-content-link">
                    <div className="group-content">
                        <span className="group-label">BLENDENCE</span>
                        <h2 className="group-title font-display">{t.mainPage.productGroups.stagesTitle}</h2>
                        <div className="group-divider"></div>
                        <p className="group-desc">{t.mainPage.productGroups.stagesDescription}</p>
                        <span className="group-link">
                            {t.mainPage.productGroups.exploreRange}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </Link>
            </StaggerItem>

            <StaggerItem className="group-card reset-group">
                <div className="group-bg-overlay gradient-reset"></div>
                <div className="group-tint"></div>
                <Link href={`/${language}/reset`} className="group-content-link">
                    <div className="group-content">
                        <span className="group-label">BLENDENCE</span>
                        <h2 className="group-title font-display">{t.mainPage.productGroups.resetTitle}</h2>
                        <div className="group-divider"></div>
                        <p className="group-desc">{t.mainPage.productGroups.resetDescription}</p>
                        <span className="group-link">
                            {t.mainPage.productGroups.exploreRange}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </Link>
            </StaggerItem>
        </Stagger>

        {/* NOTE: Stagger / StaggerItem / Link are imported components, so
           classes passed to them never receive the styled-jsx scope hash.
           All rules below are therefore :global() descendants of the plain
           .product-groups-section wrapper — still page-scoped, no leakage. */}
        <style jsx>{`
        .product-groups-section :global(.product-groups) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 80vh;
            background: var(--surface);
        }

        .product-groups-section :global(.group-card) {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4rem;
            overflow: hidden;
            text-align: center;
            background: var(--surface-mist);
        }

        .product-groups-section :global(.stages-group) {
            --card-accent: var(--stages-accent);
        }

        .product-groups-section :global(.reset-group) {
            --card-accent: var(--reset-accent);
        }

        .product-groups-section :global(.group-content-link) {
            text-decoration: none;
            display: block;
            width: 100%;
            max-width: 420px;
        }

        .product-groups-section :global(.group-card:hover .group-bg-overlay) {
            transform: scale(1.04);
        }

        .product-groups-section :global(.group-card:hover .group-content) {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lift);
        }

        .product-groups-section :global(.group-card:hover .group-link svg) {
            transform: translateX(3px);
        }

        .product-groups-section :global(.group-content) {
            position: relative;
            z-index: 2;
            width: 100%;
            background: rgba(255, 255, 255, 0.78);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border-radius: var(--radius-lg);
            padding: 3rem 2.5rem;
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: var(--shadow-soft);
            transition: transform var(--dur-fast) var(--ease),
                box-shadow var(--dur-fast) var(--ease);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .product-groups-section :global(.group-label) {
            display: inline-block;
            font-size: 0.72rem;
            font-weight: 600;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-bottom: 0.85rem;
        }

        .product-groups-section :global(.group-title) {
            font-size: clamp(2.4rem, 4vw, 3.2rem);
            margin: 0;
            line-height: 1;
            color: var(--text-heading);
        }

        .product-groups-section :global(.group-divider) {
            width: 44px;
            height: 2px;
            border-radius: 2px;
            margin: 1.25rem auto;
            background: var(--card-accent);
        }

        .product-groups-section :global(.group-desc) {
            font-size: 1rem;
            line-height: 1.7;
            margin-bottom: 1.75rem;
            color: var(--text-body);
        }

        .product-groups-section :global(.group-link) {
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            font-size: 0.82rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--card-accent);
        }

        .product-groups-section :global(.group-link svg) {
            transition: transform var(--dur-fast) var(--ease);
        }

        /* Backgrounds */
        .product-groups-section :global(.group-bg-overlay) {
            position: absolute;
            inset: 0;
            z-index: 0;
            transition: transform 1.2s var(--ease);
        }

        /* Category tint wash — makes each half unmistakably Stages amber /
           Reset sage even before the imagery is read. */
        .product-groups-section :global(.group-tint) {
            position: absolute;
            inset: 0;
            z-index: 1;
            background: linear-gradient(
                165deg,
                color-mix(in srgb, var(--card-accent) 26%, transparent) 0%,
                transparent 52%,
                color-mix(in srgb, var(--card-accent) 12%, transparent) 100%
            );
            pointer-events: none;
        }

        .product-groups-section :global(.group-card::after) {
            content: '';
            position: absolute;
            inset: 0;
            z-index: 1;
            background: radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.02) 70%);
            pointer-events: none;
        }

        .product-groups-section :global(.gradient-stages) {
            background: url('/images/main/stages-field.jpg') no-repeat center center/cover;
        }

        .product-groups-section :global(.gradient-reset) {
             background: url('/images/main/reset-field.jpg') no-repeat center center/cover;
        }

        @media (max-width: 768px) {
            .product-groups-section :global(.product-groups) {
                grid-template-columns: 1fr;
                min-height: auto;
            }
            .product-groups-section :global(.group-card) {
                padding: 5rem 2rem;
            }
            .product-groups-section :global(.group-content) {
                padding: 2.5rem 2rem;
            }
        }
      `}</style>
        </section>
    );
}
