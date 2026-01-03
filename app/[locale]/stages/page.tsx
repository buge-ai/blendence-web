'use client';

import React from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import StagesCarousel from '@/app/components/StagesCarousel';
import ProductGroups from '@/app/components/ProductGroups';

export default function StagesCategoryPage() {
    return (
        <div className="stages-page">
            <Navigation />

            <main>
                <section className="category-hero">
                    <div className="container">
                        <span className="label">Product Ranges</span>
                        <h1>Stages.</h1>
                        <p className="lead">
                            Nutrition designed for the transitions of life.
                            As the body's needs shift, our blends adapt to support
                            growth, focus, and everyday consistency.
                        </p>
                    </div>
                </section>

                {/* Re-use the carousel for interaction */}
                <StagesCarousel />

                <section className="stages-intro">
                    <div className="container">
                        <div className="info-grid">
                            <div className="info-item">
                                <h3>Early Growth (4–7)</h3>
                                <p>Building the foundation with essential vitamins and natural energy for active play.</p>
                            </div>
                            <div className="info-item">
                                <h3>Active Schooling (8–12)</h3>
                                <p>Supporting cognitive development and physical consistency during busy school days.</p>
                            </div>
                            <div className="info-item">
                                <h3>Mental Focus (13–16)</h3>
                                <p>Designed for demanding academic periods and hormonal transitions.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .stages-page {
                    background: #fff;
                    color: #111;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                .category-hero {
                    padding: 10rem 0 6rem;
                    background: #fff;
                    text-align: center;
                }
                .label {
                    display: block;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #888;
                    margin-bottom: 2rem;
                }
                h1 {
                    font-size: 5rem;
                    font-weight: 700;
                    margin-bottom: 2rem;
                    letter-spacing: -0.04em;
                    color: #1A4D5C;
                }
                .lead {
                    font-size: 1.5rem;
                    line-height: 1.5;
                    color: #444;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .stages-intro {
                    padding: 8rem 0;
                    background: #f9f9fa;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 4rem;
                }
                h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: #1A4D5C;
                }
                p {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: #666;
                }

                @media (max-width: 768px) {
                    h1 { font-size: 3.5rem; }
                    .info-grid { grid-template-columns: 1fr; gap: 2.5rem; }
                }
            `}</style>
        </div>
    );
}
