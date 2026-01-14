'use client';

import React from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function ApproachPage() {
    const { t, language } = useLanguage();
    const p = t.approachPage;

    return (
        <div className="approach-page">
            <Navigation />

            <main>
                {/* Hero Section */}
                <section className="approach-hero">
                    <div className="container">
                        <h1>{p.title}</h1>
                        <h2 className="subtitle">{p.subtitle}</h2>
                        <p className="lead">
                            {p.lead}
                        </p>
                    </div>
                </section>

                {/* Needs First Section */}
                <section className="section">
                    <div className="container">
                        <div className="section-divider"></div>
                        <h2>{p.needsFirst.title}</h2>
                        <div className="content-block">
                            {p.needsFirst.content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How Blends Are Designed */}
                <section className="section steps-section">
                    <div className="container">
                        <div className="section-divider"></div>
                        <h2>{p.howDesigned.title}</h2>
                        <div className="steps-grid">
                            {p.howDesigned.steps.map((step, index) => (
                                <div className="step" key={index}>
                                    <span className="step-number">{index + 1}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Two Ways Section */}
                <section className="section two-ways-section">
                    <div className="container">
                        <div className="section-divider"></div>
                        <h2>{p.twoWays.title}</h2>
                        <div className="two-ways-grid">
                            <div className="way-card">
                                <h3>{p.twoWays.stages.title}</h3>
                                <p>{p.twoWays.stages.content}</p>
                            </div>
                            <div className="way-card">
                                <h3>{p.twoWays.reset.title}</h3>
                                <p>{p.twoWays.reset.content}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technology Section */}
                <section className="section">
                    <div className="container">
                        <div className="section-divider"></div>
                        <h2>{p.technology.title}</h2>
                        <div className="content-block">
                            <p>{p.technology.content}</p>
                        </div>
                    </div>
                </section>

                {/* Quality & Responsibility */}
                <section className="section quality-section">
                    <div className="container">
                        <div className="section-divider"></div>
                        <h2>{p.quality.title}</h2>
                        <div className="content-block">
                            <p>{p.quality.content}</p>
                            <p className="learn-more">{p.quality.learnMore}</p>
                            <div className="policy-links">
                                <Link href={`/${language}/food-safety`} className="policy-link">
                                    {p.quality.foodSafetyLink}
                                    <span className="arrow">→</span>
                                </Link>
                                <Link href={`/${language}/gender-equality`} className="policy-link">
                                    {p.quality.genderEqualityLink}
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
                    padding: 10rem 0 4rem;
                    background: url('/approach-background.png') no-repeat center center;
                    background-size: cover;
                    position: relative;
                }
                h1 {
                    font-size: 4.5rem;
                    font-weight: 300;
                    margin-bottom: 1rem;
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                    color: #111;
                }
                .subtitle {
                    font-size: 1.5rem;
                    font-weight: 400;
                    color: #666;
                    margin-bottom: 2rem;
                }
                .lead {
                    font-size: 1.35rem;
                    line-height: 1.7;
                    color: #444;
                    max-width: 700px;
                }

                /* Sections */
                .section {
                    padding: 4rem 0;
                }
                .section-divider {
                    width: 100%;
                    height: 1px;
                    background: #e5e5e5;
                    margin-bottom: 3rem;
                }
                h2 {
                    font-size: 2.25rem;
                    font-weight: 400;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.02em;
                    color: #111;
                    position: relative;
                    display: inline-block;
                }
                h2::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 12px;
                    background: linear-gradient(90deg, rgba(166, 198, 169, 0.4) 0%, rgba(200, 220, 195, 0.3) 50%, rgba(166, 198, 169, 0.15) 100%);
                    border-radius: 4px;
                    z-index: -1;
                    transform: skewX(-3deg);
                }
                .content-block p {
                    font-size: 1.2rem;
                    line-height: 1.8;
                    color: #444;
                    margin-bottom: 1rem;
                }
                .content-block p:last-child {
                    margin-bottom: 0;
                }

                /* Steps */
                .steps-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 3rem;
                    margin-top: 2rem;
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
                    margin-bottom: 0.75rem;
                    color: #111;
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
                    margin-top: 2rem;
                }
                .way-card {
                    padding: 2.5rem;
                    background: #fafafa;
                    border-radius: 16px;
                }
                .way-card h3 {
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin-bottom: 0.75rem;
                    color: #111;
                }
                .way-card p {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #555;
                }

                /* Quality */
                .quality-section {
                    padding-bottom: 6rem;
                }
                .learn-more {
                    margin-top: 1.5rem;
                    color: #888;
                    font-size: 1rem !important;
                }
                .policy-links {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1rem;
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
                        padding: 7rem 0 3rem;
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
                        padding: 3rem 0;
                    }
                    h2 {
                        font-size: 1.75rem;
                    }
                    .steps-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .two-ways-grid {
                        grid-template-columns: 1fr;
                    }
                    .way-card {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
