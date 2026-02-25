'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

export default function ProductGroups() {
    const { t, language } = useLanguage();

    return (
        <section className="product-groups">
            <div className="group-card stages-group">
                <div className="group-content">
                    <div className="group-logo">
                        <Image
                            src={blob('logos/reset_stage_logo_stages_org_color.png')}
                            alt="Stages"
                            width={320}
                            height={120}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <p className="group-desc">{t.mainPage.productGroups.stagesDescription}</p>
                    <Link href={`/${language}/stages`} className="group-link">
                        {t.mainPage.productGroups.exploreRange} <span className="arrow">→</span>
                    </Link>
                </div>
                <div className="group-bg-overlay gradient-stages"></div>
            </div>

            <div className="group-card reset-group">
                <div className="group-content">
                    <div className="group-logo">
                        <Image
                            src={blob('logos/reset_stage_logo_reset_org_color.png')}
                            alt="Reset"
                            width={320}
                            height={120}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <p className="group-desc">{t.mainPage.productGroups.resetDescription}</p>
                    <Link href={`/${language}/reset`} className="group-link">
                        {t.mainPage.productGroups.exploreRange} <span className="arrow">→</span>
                    </Link>
                </div>
                <div className="group-bg-overlay gradient-reset"></div>
            </div>

            <style jsx>{`
        .product-groups {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 80vh;
            background: #fff;
        }

        .group-card {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4rem;
            overflow: hidden;
            text-align: center;
            color: #111;
            transition: all 0.4s ease;
            cursor: pointer;
        }

        .group-card:hover .group-bg-overlay {
            transform: scale(1.05);
            opacity: 0.8;
        }

        .group-content {
            position: relative;
            z-index: 2;
            max-width: 500px;
        }

        .group-logo {
            margin-bottom: 1.5rem;
            display: flex;
            justify-content: center;
        }

        .group-title {
            font-size: 4rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            letter-spacing: -0.02em;
        }

        .group-desc {
            font-size: 1.25rem;
            line-height: 1.5;
            margin-bottom: 2.5rem;
            color: #444;
        }

        .group-subdesc {
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 2.5rem;
            color: #666;
        }

        .group-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #111;
            text-decoration: none;
            border-bottom: 2px solid transparent;
            padding-bottom: 4px;
            transition: border-color 0.2s;
        }

        .group-link:hover {
            border-bottom-color: #111;
        }

        .arrow {
            transition: transform 0.2s;
        }
        .group-link:hover .arrow {
            transform: translateX(4px);
        }

        /* Backgrounds */
        .group-bg-overlay {
            position: absolute;
            inset: 0;
            z-index: 0;
            opacity: 0.4;
            transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;
        }

        .gradient-stages {
            background: url('${blob('main/stages-teaser.png')}') no-repeat center center/cover;
        }

        .gradient-reset {
             background: url('${blob('main/reset-spotlight.png')}') no-repeat center center/cover;
        }

        @media (max-width: 768px) {
            .product-groups {
                grid-template-columns: 1fr;
                min-height: auto;
            }
            .group-card {
                padding: 6rem 2rem;
            }
        }
      `}</style>
        </section>
    );
}
