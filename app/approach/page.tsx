'use client';

import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ApproachPage() {
    return (
        <div className="approach-page">
            <Navigation />

            <main>
                {/* Hero Section */}
                <section className="approach-hero">
                    <div className="container">
                        <h1>The Blendence Method</h1>
                        <h2 className="subtitle">Designing nutrition by starting with real-life needs</h2>
                        <p className="lead">
                            At Blendence, we don't start with ingredients.
                            We start by understanding how nutritional needs change across different life stages and everyday moments.
                            Our products are designed around this simple idea: nutrition should fit real life, not the other way around.
                        </p>
                    </div>
                </section>

                {/* Needs First Section */}
                <section className="section">
                    <div className="container">
                        <div className="section-divider"></div>
                        <h2>Needs first. Ingredients second.</h2>
                        <div className="content-block">
                            <p>Nutritional needs are not static.</p>
                            <p>They evolve with age, routines, and different phases of life.</p>
                            <p>
                                Our approach begins by identifying these needs first — then selecting plant-based ingredients where relevant nutritional components naturally occur.
                                Only after this step do we design the blend itself.
                            </p>
                        </div>
                    </div>
                </section>

                {/* How Blends Are Designed */}
                <section className="section steps-section">
                    <div className="container">
                        <div className="section-divider"></div>
                        <h2>How our blends are designed</h2>
                        <div className="steps-grid">
                            <div className="step">
                                <span className="step-number">1</span>
                                <h3>Identify the need</h3>
                                <p>
                                    We look at how the body's needs change across life stages or specific moments, such as growth periods, school routines, or times when balance feels more important.
                                </p>
                            </div>
                            <div className="step">
                                <span className="step-number">2</span>
                                <h3>Select natural sources</h3>
                                <p>
                                    We choose fruits and vegetables where these nutritional components naturally occur, without unnecessary additions or complexity.
                                </p>
                            </div>
                            <div className="step">
                                <span className="step-number">3</span>
                                <h3>Formulate for real life</h3>
                                <p>
                                    Blends are designed to fit easily into everyday routines — not to create new rituals or unrealistic expectations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Two Ways Section */}
                <section className="section two-ways-section">
                    <div className="container">
                        <div className="section-divider"></div>
                        <h2>Two ways of thinking about nutrition</h2>
                        <div className="two-ways-grid">
                            <div className="way-card">
                                <h3>Stages</h3>
                                <p>
                                    Stages focuses on life phases.
                                    From early growth to school years and teenage routines, each blend is designed around how nutritional needs evolve over time.
                                </p>
                            </div>
                            <div className="way-card">
                                <h3>Reset</h3>
                                <p>
                                    Reset focuses on moments.
                                    It is designed for periods when routines shift and lightness or balance becomes more relevant.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technology Section */}
                <section className="section">
                    <div className="container">
                        <div className="section-divider"></div>
                        <h2>Technology as a tool</h2>
                        <div className="content-block">
                            <p>
                                We use food processing technologies such as freeze drying to preserve the natural character of plant-based ingredients.
                                Technology supports our approach — it does not define it.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Quality & Responsibility */}
                <section className="section quality-section">
                    <div className="container">
                        <div className="section-divider"></div>
                        <h2>Quality & Responsibility</h2>
                        <div className="content-block">
                            <p>
                                Our production operates under structured food safety and quality systems aligned with international standards, including FSSC 22000.
                            </p>
                            <p className="learn-more">Learn more about our commitments:</p>
                            <div className="policy-links">
                                <Link href="/food-safety" className="policy-link">
                                    Food Safety Policy
                                    <span className="arrow">→</span>
                                </Link>
                                <Link href="/gender-equality" className="policy-link">
                                    Gender Equality Plan
                                    <span className="arrow">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .approach-page {
                    background: #fff;
                    color: #111;
                }
                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                
                /* Hero */
                .approach-hero {
                    padding: 12rem 0 6rem;
                    background: linear-gradient(180deg, #f9f9fa 0%, #fff 100%);
                }
                h1 {
                    font-size: 4.5rem;
                    font-weight: 300;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                }
                .subtitle {
                    font-size: 1.5rem;
                    font-weight: 400;
                    color: #666;
                    margin-bottom: 3rem;
                }
                .lead {
                    font-size: 1.35rem;
                    line-height: 1.7;
                    color: #444;
                    max-width: 700px;
                }

                /* Sections */
                .section {
                    padding: 6rem 0;
                }
                .section-divider {
                    width: 100%;
                    height: 1px;
                    background: #e5e5e5;
                    margin-bottom: 4rem;
                }
                h2 {
                    font-size: 2.25rem;
                    font-weight: 400;
                    margin-bottom: 2rem;
                    letter-spacing: -0.02em;
                }
                .content-block p {
                    font-size: 1.2rem;
                    line-height: 1.8;
                    color: #444;
                    margin-bottom: 1.5rem;
                }
                .content-block p:last-child {
                    margin-bottom: 0;
                }

                /* Steps */
                .steps-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 3rem;
                    margin-top: 3rem;
                }
                .step {
                    position: relative;
                }
                .step-number {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #f5f5f5;
                    font-size: 1rem;
                    font-weight: 500;
                    margin-bottom: 1.5rem;
                    color: #111;
                }
                .step h3 {
                    font-size: 1.25rem;
                    font-weight: 500;
                    margin-bottom: 1rem;
                }
                .step p {
                    font-size: 1.05rem;
                    line-height: 1.7;
                    color: #666;
                }

                /* Two Ways */
                .two-ways-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    margin-top: 3rem;
                }
                .way-card {
                    padding: 3rem;
                    background: #fafafa;
                    border-radius: 16px;
                }
                .way-card h3 {
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin-bottom: 1rem;
                }
                .way-card p {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #555;
                }

                /* Quality */
                .quality-section {
                    padding-bottom: 8rem;
                }
                .learn-more {
                    margin-top: 2rem;
                    color: #888;
                    font-size: 1rem !important;
                }
                .policy-links {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }
                .policy-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 1.1rem;
                    color: #111;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                .policy-link:hover {
                    gap: 1rem;
                }
                .arrow {
                    transition: transform 0.3s ease;
                }
                .policy-link:hover .arrow {
                    transform: translateX(4px);
                }

                @media (max-width: 768px) {
                    .approach-hero {
                        padding: 8rem 0 4rem;
                    }
                    h1 {
                        font-size: 2.75rem;
                    }
                    .subtitle {
                        font-size: 1.2rem;
                    }
                    .lead {
                        font-size: 1.15rem;
                    }
                    .section {
                        padding: 4rem 0;
                    }
                    h2 {
                        font-size: 1.75rem;
                    }
                    .steps-grid {
                        grid-template-columns: 1fr;
                        gap: 2.5rem;
                    }
                    .two-ways-grid {
                        grid-template-columns: 1fr;
                    }
                    .way-card {
                        padding: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}
