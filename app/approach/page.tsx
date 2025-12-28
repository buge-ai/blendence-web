'use client';

import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function ApproachPage() {
    return (
        <div className="approach-page">
            <Navigation />

            <main>
                <section className="approach-hero">
                    <div className="container">
                        <span className="label">The Blendence Method</span>
                        <h1>How we design nutrition.</h1>
                        <p className="lead">
                            We don’t start with ingredients. We start with needs.
                            Our approach brings together nutritional science, food engineering,
                            and real-life use to create blends that are relevant and consistent.
                        </p>
                    </div>
                </section>

                <section className="tech-section">
                    <div className="container grid">
                        <div className="content">
                            <h2>The Power of Freeze Drying</h2>
                            <p>
                                At the heart of Blendence is advanced freeze-drying technology (Lyophilization).
                                Unlike traditional drying methods that can lose up to 60% of nutritional value,
                                freeze-drying preserves more than 95% of vitamins, minerals, and amino acids.
                            </p>
                            <ul className="benefits-list">
                                <li><strong>No Preservatives:</strong> The process naturally stabilizes the food, requiring zero additives.</li>
                                <li><strong>Intense Flavor:</strong> Removing water concentrates the natural flavor and aroma.</li>
                                <li><strong>Long Shelf Life:</strong> Naturally shelf-stable while remaining 100% raw and alive.</li>
                                <li><strong>Zero Heat Damage:</strong> Nutrients are never exposed to high temperatures.</li>
                            </ul>
                        </div>
                        <div className="visual">
                            <div className="tech-box">
                                <span className="tech-icon">❄️</span>
                                <h3>Lyophilization</h3>
                                <p>Water is removed via sublimation under vacuum, bypassing the liquid phase.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="philosophy-section">
                    <div className="container">
                        <div className="philosophy-card">
                            <h2>Naturally Powerful. Perfectly Balanced.</h2>
                            <p>
                                Turkey's first 100% freeze-dried mix brand. Every blend is 100% natural,
                                vegan, and contains no added sugar, artificial flavors, or coloring agents.
                            </p>
                            <div className="stats-grid">
                                <div className="stat">
                                    <span className="stat-value">100%</span>
                                    <span className="stat-label">Natural</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">0%</span>
                                    <span className="stat-label">Additives</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">95%</span>
                                    <span className="stat-label">Nutrient Retention</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="quality-section">
                    <div className="container">
                        <h2>Quality & Safety</h2>
                        <p>Our production facility in Edirne follows the highest international standards.</p>
                        <div className="certs">
                            <span>ISO 9001</span>
                            <span>ISO 22000</span>
                            <span>HACCP</span>
                            <span>FSSC 22000 (Upcoming)</span>
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
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                .approach-hero {
                    padding: 10rem 0 6rem;
                    background: #f9f9fa;
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
                    font-size: 4rem;
                    font-weight: 700;
                    margin-bottom: 2rem;
                    letter-spacing: -0.02em;
                }
                .lead {
                    font-size: 1.5rem;
                    line-height: 1.5;
                    color: #444;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .tech-section {
                    padding: 8rem 0;
                }
                .grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6rem;
                    align-items: center;
                }
                h2 {
                    font-size: 2.5rem;
                    margin-bottom: 1.5rem;
                }
                p {
                    font-size: 1.125rem;
                    line-height: 1.6;
                    color: #444;
                    margin-bottom: 2rem;
                }
                .benefits-list {
                    list-style: none;
                    padding: 0;
                }
                .benefits-list li {
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                    padding-left: 1.5rem;
                    position: relative;
                }
                .benefits-list li::before {
                    content: '→';
                    position: absolute;
                    left: 0;
                    color: #111;
                }
                .tech-box {
                    background: #111;
                    color: #fff;
                    padding: 4rem;
                    border-radius: 32px;
                    text-align: center;
                }
                .tech-icon {
                    font-size: 3rem;
                    display: block;
                    margin-bottom: 1rem;
                }
                .philosophy-section {
                    padding: 4rem 0;
                }
                .philosophy-card {
                    background: #f0f4f8;
                    padding: 6rem;
                    border-radius: 48px;
                    text-align: center;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 2rem;
                    margin-top: 4rem;
                }
                .stat {
                    display: flex;
                    flex-direction: column;
                }
                .stat-value {
                    font-size: 3rem;
                    font-weight: 700;
                }
                .stat-label {
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-size: 0.8rem;
                    color: #666;
                }
                .quality-section {
                    padding: 8rem 0;
                    text-align: center;
                    border-top: 1px solid #eee;
                }
                .certs {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 3rem;
                    flex-wrap: wrap;
                }
                .certs span {
                    font-weight: 700;
                    font-size: 0.9rem;
                    background: #eee;
                    padding: 0.5rem 1.5rem;
                    border-radius: 99px;
                }

                @media (max-width: 768px) {
                    h1 { font-size: 2.5rem; }
                    .grid { grid-template-columns: 1fr; gap: 4rem; }
                    .philosophy-card { padding: 3rem; }
                    .stats-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
