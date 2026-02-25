'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

export default function ProductGroups() {
    const { t, language } = useLanguage();

    return (
        <section className="product-groups">
            <div className="group-card stages-group">
                <div className="group-bg-overlay gradient-stages"></div>
                <Link href={`/${language}/stages`} className="group-content-link">
                    <div className="group-content">
                        <span className="group-label">BLENDENCE</span>
                        <h2 className="group-title">Stages</h2>
                        <div className="group-divider"></div>
                        <p className="group-desc">{t.mainPage.productGroups.stagesDescription}</p>
                        <span className="group-link">
                            {t.mainPage.productGroups.exploreRange}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </Link>
            </div>

            <div className="group-card reset-group">
                <div className="group-bg-overlay gradient-reset"></div>
                <Link href={`/${language}/reset`} className="group-content-link">
                    <div className="group-content">
                        <span className="group-label">BLENDENCE</span>
                        <h2 className="group-title">Reset</h2>
                        <div className="group-divider"></div>
                        <p className="group-desc">{t.mainPage.productGroups.resetDescription}</p>
                        <span className="group-link">
                            {t.mainPage.productGroups.exploreRange}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </Link>
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
            color: #1a1a1a;
            transition: all 0.4s ease;
            cursor: pointer;
            background: #f5f5f5;
        }

        .group-card:hover .group-bg-overlay {
            transform: scale(1.05);
            opacity: 0.75;
        }

        .group-card:hover .group-content {
            background: rgba(255, 255, 255, 0.85);
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
            transform: translateY(-4px);
        }

        .group-card:hover .group-link {
            gap: 1rem;
        }

        .group-content {
            position: relative;
            z-index: 2;
            max-width: 420px;
            width: 100%;
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border-radius: 20px;
            padding: 3rem 2.5rem;
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
            transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .group-label {
            display: inline-block;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #999;
            margin-bottom: 0.75rem;
        }

        .group-title {
            font-size: 3rem;
            font-weight: 700;
            letter-spacing: -0.03em;
            margin: 0;
            line-height: 1;
        }

        .stages-group .group-title {
            color: #2C5F6F;
        }

        .reset-group .group-title {
            color: #1A4D5C;
        }

        .group-divider {
            width: 40px;
            height: 3px;
            border-radius: 2px;
            margin: 1.25rem auto;
        }

        .stages-group .group-divider {
            background: linear-gradient(90deg, #7CB342, #00BCD4);
        }

        .reset-group .group-divider {
            background: linear-gradient(90deg, #00BCD4, #1A4D5C);
        }

        .group-desc {
            font-size: 1rem;
            line-height: 1.65;
            margin-bottom: 1.75rem;
            color: #555;
        }

        .group-link {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #1A4D5C;
            transition: gap 0.3s ease;
        }

        /* Backgrounds */
        .group-bg-overlay {
            position: absolute;
            inset: 0;
            z-index: 0;
            opacity: 0.55;
            transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;
        }

        .group-card::after {
            content: '';
            position: absolute;
            inset: 0;
            z-index: 1;
            background: radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.02) 70%);
            pointer-events: none;
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
                padding: 5rem 2rem;
            }
            .group-title {
                font-size: 2.5rem;
            }
            .group-content {
                padding: 2.5rem 2rem;
            }
        }
      `}</style>
        </section>
    );
}
