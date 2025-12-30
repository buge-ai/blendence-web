'use client';

import React from 'react';
import Link from 'next/link';

export default function ProductGroups() {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="product-groups">
            <div className="group-card stages-group">
                <div className="group-content">
                    <h2 className="group-title">Stages</h2>
                    <p className="group-desc">Nutrition designed for the stages of life. Adapted to shifting needs across growth and development.</p>
                    <a href="#stages-section" onClick={(e) => scrollToSection(e, 'stages-section')} className="group-link">
                        Explore Stages <span className="arrow">↓</span>
                    </a>
                </div>
                <div className="group-bg-overlay gradient-stages"></div>
            </div>

            <div className="group-card reset-group">
                <div className="group-content">
                    <h2 className="group-title">Reset</h2>
                    <p className="group-desc">Designed for moments when lightness and balance matter more.</p>
                    <p className="group-subdesc">Some periods feel heavier than usual. Reset is designed to support balance and digestive lightness during those moments — without turning nutrition into a ritual or a promise.</p>
                    <a href="#reset-section" onClick={(e) => scrollToSection(e, 'reset-section')} className="group-link">
                        Explore Reset <span className="arrow">↓</span>
                    </a>
                </div>
                <div className="group-bg-overlay gradient-reset"></div>
            </div>

            <style jsx>{`
        .product-groups {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 80vh; /* Takes up substantial vertical space */
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

        .group-title {
            font-size: 4rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            letter-spacing: -0.02em;
        }

        .group-desc {
            font-size: 1.25rem;
            line-height: 1.5;
            margin-bottom: 1rem;
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
            transform: translateY(4px);
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
            background: url('/main/stages-teaser.png') no-repeat center center/cover;
        }

        .gradient-reset {
             background: url('/main/reset-spotlight.png') no-repeat center center/cover;
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
