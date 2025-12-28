'use client';

import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductLayoutProps {
    title: string;
    subtitle: string;
    description: string;
    tag: string;
    heroImage: string;
    themeColor: string; // Hex for gradient/accent
    features: {
        title: string;
        content: string | React.ReactNode;
    }[];
    specs?: {
        label: string;
        value: string;
    }[];
}

export default function ProductLayout({
    title,
    subtitle,
    description,
    tag,
    heroImage,
    themeColor,
    features,
    specs
}: ProductLayoutProps) {
    return (
        <div className="product-page">
            <Navigation />

            <main>
                {/* HERO */}
                <section className="product-hero">
                    <div className="container">
                        <div className="hero-content">
                            <span className="hero-tag" style={{ color: themeColor }}>{tag}</span>
                            <h1 className="hero-title">{title}</h1>
                            <p className="hero-subtitle">{subtitle}</p>
                            <p className="hero-desc">{description}</p>
                        </div>
                        <div className="hero-visual">
                            <div className="visual-backdrop" style={{ background: `radial-gradient(circle, ${themeColor}20 0%, transparent 70%)` }}></div>
                            <motion.div
                                className="visual-img-container"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <img src={heroImage} alt={title} className="product-img" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FEATURES GRID */}
                <section className="features-section">
                    <div className="container">
                        <div className="features-grid">
                            {features.map((feature, idx) => (
                                <div key={idx} className={`feature-card ${idx === 0 ? 'full-width' : ''}`}>
                                    <h3>{feature.title}</h3>
                                    <div className="feature-body">{feature.content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* COMPOSITION / "What it does not include" */}
                <section className="composition-section">
                    <div className="container">
                        <div className="composition-box">
                            <h3>Clean Formulation</h3>
                            <div className="check-list">
                                <div className="check-item">No artificial colors</div>
                                <div className="check-item">No artificial flavors</div>
                                <div className="check-item">No unnecessary additives</div>
                            </div>
                        </div>
                        {specs && (
                            <div className="specs-box">
                                {specs.map((s, i) => (
                                    <div key={i} className="spec-row">
                                        <span className="spec-label">{s.label}</span>
                                        <span className="spec-val">{s.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

            </main>
            <Footer />

            <style jsx>{`
        .product-page {
            background: #ffffff;
            color: #111;
            font-family: 'Inter', sans-serif;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* HERO */
        .product-hero {
            padding: 10rem 0 6rem;
            min-height: 80vh;
            display: flex;
            align-items: center;
        }
        
        .product-hero .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            width: 100%;
        }

        .hero-tag {
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 700;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            display: block;
        }

        .hero-title {
            font-size: 4.5rem;
            line-height: 1;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 1.5rem;
        }

        .hero-subtitle {
            font-size: 1.5rem;
            color: #444;
            margin-bottom: 1rem;
            font-weight: 500;
        }

        .hero-desc {
            font-size: 1.125rem;
            line-height: 1.6;
            color: #666;
            max-width: 90%;
        }

        .visual-backdrop {
            position: absolute;
            inset: -20%;
            z-index: 0;
            border-radius: 50%;
            filter: blur(60px);
        }

        .hero-visual {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
        }
        
        .product-img {
            position: relative;
            z-index: 1;
            max-width: 100%;
            height: auto;
            max-height: 500px;
            filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
        }

        /* FEATURES */
        .features-section {
            padding: 6rem 0;
            background: #fdfdfc;
        }

        .features-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        .feature-card {
            background: #ffffff;
            padding: 3rem;
            border-radius: 24px;
            border: 1px solid rgba(0,0,0,0.05);
        }

        .feature-card.full-width {
            grid-column: span 2;
            background: #f4f4f2;
            border: none;
        }

        .feature-card h3 {
            font-size: 1.75rem;
            margin-bottom: 1.5rem;
            font-weight: 500;
        }

        .feature-body {
            font-size: 1.125rem;
            line-height: 1.6;
            color: #555;
        }
        
        /* Lists in features */
        .feature-body ul {
            list-style: none;
            padding: 0;
        }
        .feature-body li {
            margin-bottom: 0.75rem;
            padding-left: 1.5rem;
            position: relative;
        }
        .feature-body li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #888;
        }

        /* COMPOSITION */
        .composition-section {
            padding: 6rem 0;
        }
        
        .composition-box {
            text-align: center;
            margin-bottom: 4rem;
        }
        
        .composition-box h3 {
            font-size: 2rem;
            margin-bottom: 2rem;
        }
        
        .check-list {
            display: flex;
            justify-content: center;
            gap: 3rem;
            flex-wrap: wrap;
        }
        
        .check-item {
            font-size: 1.125rem;
            color: #444;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .check-item::before {
            content: '';
            width: 8px;
            height: 8px;
            background: #111;
            border-radius: 50%;
        }

        @media (max-width: 1024px) {
            .product-hero .container {
                grid-template-columns: 1fr;
                text-align: center;
            }
            .hero-title {
                font-size: 3.5rem;
            }
            .features-grid {
                grid-template-columns: 1fr;
            }
            .feature-card.full-width {
                grid-column: span 1;
            }
        }
      `}</style>
        </div>
    );
}
