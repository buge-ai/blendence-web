'use client';

import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="about-page">
            <Navigation />

            <main>
                <section className="about-hero">
                    <div className="container">
                        <h1>About Blendence</h1>
                    </div>
                </section>

                <section className="about-content">
                    <div className="container">
                        <div className="content-block">
                            <p className="intro">
                                Blendence is a nutrition brand built around thoughtful formulation and real-life relevance.
                            </p>
                            <p>
                                We design plant-based blends by starting with needs, not ingredients. Our approach brings together food engineering, nutritional insight, and everyday usability to create products that fit naturally into daily routines.
                            </p>
                            <p className="company-note">
                                Blendence is part of <strong>BUGE Foods</strong>, a food-tech company focused on clean formulation, food safety, and responsible production.
                            </p>
                            <Link href="/approach" className="approach-link">
                                Explore our approach
                                <span className="arrow">→</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .about-page {
                    background: #fff;
                    color: #111;
                    min-height: 100vh;
                }
                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                .about-hero {
                    padding: 12rem 0 4rem;
                    background: linear-gradient(180deg, #f9f9fa 0%, #fff 100%);
                }
                h1 {
                    font-size: 4rem;
                    font-weight: 300;
                    letter-spacing: -0.02em;
                    color: #111;
                }
                .about-content {
                    padding: 4rem 0 10rem;
                }
                .content-block {
                    max-width: 700px;
                }
                .intro {
                    font-size: 1.75rem;
                    line-height: 1.5;
                    color: #111;
                    margin-bottom: 2rem;
                    font-weight: 400;
                }
                p {
                    font-size: 1.25rem;
                    line-height: 1.7;
                    color: #444;
                    margin-bottom: 2rem;
                }
                .company-note {
                    color: #666;
                    padding-top: 1rem;
                    border-top: 1px solid #eee;
                    margin-top: 3rem;
                }
                .company-note strong {
                    color: #111;
                }
                .approach-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 1.125rem;
                    color: #111;
                    text-decoration: none;
                    margin-top: 2rem;
                    padding: 1rem 0;
                    border-bottom: 1px solid #111;
                    transition: all 0.3s ease;
                }
                .approach-link:hover {
                    gap: 1.25rem;
                }
                .arrow {
                    transition: transform 0.3s ease;
                }
                .approach-link:hover .arrow {
                    transform: translateX(4px);
                }

                @media (max-width: 768px) {
                    .about-hero {
                        padding: 8rem 0 3rem;
                    }
                    h1 {
                        font-size: 2.5rem;
                    }
                    .intro {
                        font-size: 1.35rem;
                    }
                    p {
                        font-size: 1.1rem;
                    }
                }
            `}</style>
        </div>
    );
}
