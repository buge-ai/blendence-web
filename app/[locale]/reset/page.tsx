'use client';

import React from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import BentoSections from '@/app/components/BentoSections';

export default function ResetCategoryPage() {
    return (
        <div className="reset-page">
            <Navigation />

            <main>
                <section className="category-hero">
                    <div className="container">
                        <span className="label">Specialized Ranges</span>
                        <h1>Reset.</h1>
                        <p className="lead">
                            Designed for moments when lightness and balance matter more.
                            Clean, plant-based formulations for deep nutritional support during your busiest periods.
                        </p>
                    </div>
                </section>

                <BentoSections />

                <section className="philosophy-teaser">
                    <div className="container">
                        <h2>The Reset Philosophy</h2>
                        <p>
                            We believe that nutrition should be effortless during stressful times.
                            Our Reset line is built on portability and potency,
                            ensuring you stay balanced no matter where life takes you.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .reset-page {
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
                .philosophy-teaser {
                    padding: 8rem 0;
                    background: #f9f9fa;
                    text-align: center;
                }
                h2 {
                    font-size: 2.5rem;
                    margin-bottom: 1.5rem;
                    color: #1A4D5C;
                }
                p {
                    font-size: 1.25rem;
                    line-height: 1.6;
                    color: #666;
                    max-width: 700px;
                    margin: 0 auto;
                }

                @media (max-width: 768px) {
                    h1 { font-size: 3.5rem; }
                }
            `}</style>
        </div>
    );
}
