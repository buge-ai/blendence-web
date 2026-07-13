'use client';

import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, Stagger, StaggerItem, WordReveal, Parallax, EASE, DUR } from '@/lib/motion';
import { useLanguage } from '@/lib/LanguageContext';

interface ProductLayoutProps {
    title: string;
    subtitle: string;
    description: string;
    tag: string;
    heroImage: string;
    themeColor: string; // Canonical product hex — string-interpolated (e.g. `${themeColor}18`), keep as hex literal
    themeTint?: string;  // Canonical product tint hex — soft hero wash, keep as hex literal
    features: {
        title: string;
        content: string | React.ReactNode;
        full?: boolean; // force full-width; defaults to the every-third heuristic
    }[];
    /* Per-product "Clean Formulation" bullets (ingredients + no-added-sugar, etc.).
       When provided, these replace the generic default checklist. */
    cleanFormulation?: string[];
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
    themeTint,
    features,
    cleanFormulation,
    specs
}: ProductLayoutProps) {
    const { t } = useLanguage();
    const reduce = useReducedMotion();
    const washColor = themeTint ?? `${themeColor}18`;

    return (
        <div
            className="product-page"
            style={{ '--theme': themeColor, '--theme-wash': washColor } as React.CSSProperties}
        >
            <Navigation />

            <main>
                {/* HERO */}
                <section className="product-hero">
                    <div className="container">
                        <div className="hero-content">
                            <Reveal>
                                <span className="eyebrow" style={{ '--eyebrow-accent': 'var(--theme)' } as React.CSSProperties}>
                                    {tag}
                                </span>
                            </Reveal>
                            <WordReveal
                                as="h1"
                                className="font-display hero-title"
                                text={title}
                                delay={0.08}
                            />
                            <Reveal delay={0.16}>
                                <p className="hero-subtitle">{subtitle}</p>
                            </Reveal>
                            {description && (
                                <Reveal delay={0.24}>
                                    <p className="hero-desc">{description}</p>
                                </Reveal>
                            )}
                        </div>
                        <div className="hero-visual">
                            <div className="visual-backdrop" />
                            <Parallax distance={20} className="visual-parallax">
                                <motion.div
                                    className="visual-img-container"
                                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                                    animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                                    transition={{ duration: DUR.slow, ease: EASE }}
                                >
                                    <motion.img
                                        src={heroImage}
                                        alt={title}
                                        className="product-img"
                                        animate={reduce ? undefined : { y: [-8, 8, -8] }}
                                        transition={reduce ? undefined : { duration: 6, ease: 'easeInOut', repeat: Infinity }}
                                    />
                                </motion.div>
                            </Parallax>
                        </div>
                    </div>
                </section>

                {/* FEATURES GRID */}
                <section className="features-section">
                    <div className="container">
                        <Stagger className="features-grid">
                            {features.map((feature, idx) => {
                                const isFull = feature.full ?? idx % 3 === 0;
                                return (
                                    <StaggerItem key={idx} className={`feature-cell${isFull ? ' full-width' : ''}`}>
                                        <div className={`feature-card${isFull ? ' full-width' : ''}`}>
                                            <h3>{feature.title}</h3>
                                            <div className="feature-body">{feature.content}</div>
                                        </div>
                                    </StaggerItem>
                                );
                            })}
                        </Stagger>
                    </div>
                </section>

                {/* COMPOSITION / "What it does not include" */}
                <section className="composition-section">
                    <div className="container">
                        <div className="composition-box">
                            <Reveal>
                                <h3>{t.productLayout.cleanFormulation}</h3>
                            </Reveal>
                            <Stagger className="check-list" delay={0.08}>
                                {(cleanFormulation ?? [
                                    t.productLayout.noArtificialColors,
                                    t.productLayout.noArtificialFlavors,
                                    t.productLayout.noUnnecessaryAdditives,
                                ]).map((item, i) => (
                                    <StaggerItem key={i} className="check-item">
                                        <svg className="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                        <span>{item}</span>
                                    </StaggerItem>
                                ))}
                            </Stagger>
                        </div>
                        {specs && (
                            <Reveal delay={0.1}>
                                <div className="specs-box">
                                    {specs.map((s, i) => (
                                        <div key={i} className="spec-row">
                                            <span className="spec-label">{s.label}</span>
                                            <span className="spec-val">{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        )}
                    </div>
                </section>

            </main>
            <Footer />

            <style jsx>{`
        .product-page {
            background: var(--surface);
            color: var(--text-body);
            font-family: var(--font-body-family);
        }

        .container {
            max-width: var(--container);
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

        .hero-content .eyebrow {
            margin-bottom: 1.25rem;
        }

        .hero-content :global(.hero-title) {
            font-size: clamp(2.8rem, 5.5vw, 4.5rem);
            margin-bottom: 1.5rem;
        }

        .hero-subtitle {
            font-size: 1.5rem;
            color: var(--text-heading);
            margin-bottom: 1rem;
            font-weight: 500;
        }

        .hero-desc {
            font-size: 1.125rem;
            line-height: 1.6;
            color: var(--text-body);
            max-width: 90%;
        }

        .visual-backdrop {
            position: absolute;
            inset: -20%;
            z-index: 0;
            border-radius: 50%;
            background: radial-gradient(circle, var(--theme-wash) 0%, transparent 70%);
            filter: blur(50px);
            opacity: 0.7;
        }

        .hero-visual {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
        }

        .hero-visual :global(.visual-parallax) {
            position: relative;
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        .hero-visual :global(.visual-img-container) {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        .hero-visual :global(.product-img) {
            position: relative;
            z-index: 1;
            max-width: 100%;
            height: auto;
            max-height: 500px;
            filter: drop-shadow(0 24px 48px rgba(16, 51, 61, 0.14));
        }

        /* FEATURES */
        .features-section {
            padding: var(--section-pad) 0;
            background: var(--surface);
        }

        .features-section :global(.features-grid) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        .features-section :global(.feature-cell) {
            display: flex;
        }

        .features-section :global(.feature-cell.full-width) {
            grid-column: span 2;
        }

        .feature-card {
            background: var(--surface);
            padding: 3rem;
            border-radius: var(--radius-lg);
            border: 1px solid var(--hairline);
            box-shadow: var(--shadow-soft);
            width: 100%;
            transition: transform var(--dur-fast) var(--ease),
                box-shadow var(--dur-fast) var(--ease);
        }

        .feature-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lift);
        }

        .feature-card.full-width {
            background: var(--surface-mist);
            border-color: transparent;
        }

        .feature-card h3 {
            font-size: 1.75rem;
            margin-bottom: 1.5rem;
            font-weight: 600;
            color: var(--text-heading);
        }

        .feature-body {
            font-size: 1.125rem;
            line-height: 1.6;
            color: var(--text-body);
        }

        .feature-body :global(p) {
            margin-bottom: 1rem;
        }

        .feature-body :global(p:last-child) {
            margin-bottom: 0;
        }

        /* Lists in features */
        .feature-body :global(ul) {
            list-style: none;
            padding: 0;
        }

        .feature-body :global(li) {
            margin-bottom: 0.75rem;
            padding-left: 1.5rem;
            position: relative;
        }

        .feature-body :global(li::before) {
            content: '';
            position: absolute;
            left: 0;
            top: 0.65em;
            width: 12px;
            height: 2px;
            border-radius: 2px;
            background: var(--theme);
        }

        /* COMPOSITION */
        .composition-section {
            padding: var(--section-pad) 0;
        }

        .composition-box {
            text-align: center;
            margin-bottom: 4rem;
        }

        .composition-box h3 {
            font-size: 2rem;
            margin-bottom: 2rem;
            color: var(--text-heading);
            font-weight: 600;
        }

        .composition-box :global(.check-list) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            max-width: 620px;
            margin: 0 auto;
            text-align: left;
        }

        .composition-box :global(.check-item) {
            font-size: 1.125rem;
            color: var(--text-body);
            display: flex;
            align-items: flex-start;
            gap: 0.7rem;
            line-height: 1.5;
        }

        .check-icon {
            color: var(--theme);
            flex-shrink: 0;
            margin-top: 0.15em;
        }

        /* SPECS */
        .specs-box {
            max-width: 640px;
            margin: 0 auto;
            border: 1px solid var(--hairline);
            border-radius: var(--radius-lg);
            overflow: hidden;
        }

        .spec-row {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--hairline);
        }

        .spec-row:last-child {
            border-bottom: none;
        }

        .spec-label {
            color: var(--text-muted);
        }

        .spec-val {
            color: var(--text-heading);
            font-weight: 600;
        }

        @media (max-width: 1024px) {
            .product-hero .container {
                grid-template-columns: 1fr;
                text-align: center;
            }
            .hero-content .eyebrow {
                justify-content: center;
            }
            .hero-desc {
                max-width: 100%;
            }
            .features-section :global(.features-grid) {
                grid-template-columns: 1fr;
            }
            .features-section :global(.feature-cell.full-width) {
                grid-column: span 1;
            }
        }

        @media (max-width: 768px) {
            .product-hero {
                padding: 8rem 0 4rem;
            }
            .feature-card {
                padding: 2.25rem;
            }
            .composition-box :global(.check-list) {
                padding: 0 0.5rem;
            }
        }
      `}</style>
        </div>
    );
}
