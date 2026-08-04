'use client';

import React from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, Stagger, StaggerItem, WordReveal, ImageReveal, Parallax, EASE } from '@/lib/motion';

function ArrowIcon() {
    return (
        <svg
            className="policy-arrow"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    );
}

export default function ApproachPage() {
    const { t, language } = useLanguage();
    const p = t.approachPage;
    const reduce = useReducedMotion();

    return (
        <div className="approach-page">
            <Navigation />

            <main>
                {/* Hero Section */}
                <section className="approach-hero">
                    <motion.div
                        className="hero-bg"
                        initial={reduce ? {} : { scale: 1.08 }}
                        animate={reduce ? {} : { scale: 1 }}
                        transition={{ duration: 1.6, ease: EASE }}
                    />
                    <div className="hero-scrim" />
                    <div className="container hero-inner">
                        <Reveal y={18}>
                            <span
                                className="eyebrow hero-eyebrow"
                                style={{ '--eyebrow-accent': 'var(--turquoise)' } as React.CSSProperties}
                            >
                                {t.nav.ourApproach}
                            </span>
                        </Reveal>
                        <WordReveal as="h1" className="font-display hero-title" text={p.title} delay={0.1} />
                        <Reveal delay={0.2} y={18}>
                            <p className="hero-sub">{p.subtitle}</p>
                        </Reveal>
                        <Reveal delay={0.3} y={18}>
                            <p className="hero-lead">{p.lead}</p>
                        </Reveal>
                    </div>
                </section>

                {/* Designed, not improvised — the visual argument for the
                    process, moved here from the homepage. Copy stays on the
                    existing t.mainPage.philosophy keys. */}
                <section className="designed-band" aria-label={t.mainPage.philosophy.label}>
                    <div className="designed-grid">
                        <div className="designed-content">
                            <Reveal className="eyebrow-row">
                                <span className="eyebrow">{t.mainPage.philosophy.label}</span>
                            </Reveal>
                            <WordReveal
                                as="h2"
                                className="designed-title font-display"
                                text={t.mainPage.philosophy.title}
                            />
                            <Reveal delay={0.12} className="designed-text">
                                <h3>{t.mainPage.philosophy.heading}</h3>
                                <p>{t.mainPage.philosophy.description}</p>
                            </Reveal>
                        </div>
                        <Parallax distance={24} className="designed-visual">
                            <ImageReveal className="visual-frame">
                                <div className="visual-bg visual-designed" />
                            </ImageReveal>
                            {/* Spec chips — the "designed" claim backed by process facts */}
                            <div className="spec-layer" aria-hidden="true">
                                <Stagger delay={0.35} className="spec-stagger">
                                    {t.mainPage.philosophy.specs.map((spec, i) => (
                                        <StaggerItem key={spec} className={`spec-chip chip-${i + 1}`}>
                                            {spec}
                                        </StaggerItem>
                                    ))}
                                </Stagger>
                            </div>
                        </Parallax>
                    </div>
                </section>

                {/* Needs First Section */}
                <section className="section">
                    <div className="container">
                        <Reveal y={18}>
                            <div className="section-head">
                                <span className="rule" />
                                <h2>{p.needsFirst.title}</h2>
                            </div>
                        </Reveal>
                        <div className="content-block">
                            {p.needsFirst.content.map((paragraph, index) => (
                                <Reveal key={index} delay={index * 0.05} y={18}>
                                    <p>{paragraph}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How Blends Are Designed */}
                <section className="section steps-section">
                    <div className="container">
                        <Reveal y={18}>
                            <div className="section-head">
                                <span className="rule" />
                                <h2>{p.howDesigned.title}</h2>
                            </div>
                        </Reveal>
                        <Stagger className="steps-grid" delay={0.1}>
                            {p.howDesigned.steps.map((step, index) => (
                                <StaggerItem className="step" key={index}>
                                    <span className="step-number">{index + 1}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.content}</p>
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>
                </section>

                {/* Two Ways Section */}
                <section className="section two-ways-section">
                    <div className="container">
                        <Reveal y={18}>
                            <div className="section-head">
                                <span className="rule" />
                                <h2>{p.twoWays.title}</h2>
                            </div>
                        </Reveal>
                        <Stagger className="two-ways-grid" delay={0.1}>
                            <StaggerItem className="way-card">
                                <h3>{p.twoWays.stages.title}</h3>
                                <p>{p.twoWays.stages.content}</p>
                            </StaggerItem>
                            <StaggerItem className="way-card">
                                <h3>{p.twoWays.reset.title}</h3>
                                <p>{p.twoWays.reset.content}</p>
                            </StaggerItem>
                        </Stagger>
                    </div>
                </section>

                {/* Technology Section */}
                <section className="section">
                    <div className="container">
                        <Reveal y={18}>
                            <div className="section-head">
                                <span className="rule" />
                                <h2>{p.technology.title}</h2>
                            </div>
                        </Reveal>
                        <div className="content-block">
                            <Reveal y={18}>
                                <p>{p.technology.content}</p>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* Quality & Responsibility */}
                <section className="section quality-section">
                    <div className="container">
                        <Reveal y={18}>
                            <div className="section-head">
                                <span className="rule" />
                                <h2>{p.quality.title}</h2>
                            </div>
                        </Reveal>
                        <div className="content-block">
                            <Reveal y={18}>
                                <p>{p.quality.content}</p>
                            </Reveal>
                            <Reveal delay={0.05} y={18}>
                                <p className="learn-more">{p.quality.learnMore}</p>
                            </Reveal>
                            <Reveal delay={0.1} y={18}>
                                <div className="policy-links">
                                    <Link href={`/${language}/food-safety`} className="policy-link">
                                        <span>{p.quality.foodSafetyLink}</span>
                                        <ArrowIcon />
                                    </Link>
                                    <Link href={`/${language}/gender-equality`} className="policy-link">
                                        <span>{p.quality.genderEqualityLink}</span>
                                        <ArrowIcon />
                                    </Link>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .approach-page {
                    background: var(--surface);
                    color: var(--text-body);
                }
                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                /* Hero */
                .approach-hero {
                    position: relative;
                    padding: 12rem 0 6rem;
                    overflow: hidden;
                    isolation: isolate;
                }
                .approach-hero :global(.hero-bg) {
                    position: absolute;
                    inset: 0;
                    background: url('/images/main/approach-hero.jpg') no-repeat center center;
                    background-size: cover;
                    background-color: var(--petrol-deep);
                    z-index: -2;
                    will-change: transform;
                }
                /* Darker on the left where the type sits; the process
                   arrangement stays readable on the right. */
                .hero-scrim {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(105deg, rgba(16, 51, 61, 0.68) 0%, rgba(16, 51, 61, 0.38) 55%, rgba(16, 51, 61, 0.12) 100%);
                    z-index: -1;
                }
                .hero-inner {
                    position: relative;
                }
                .hero-eyebrow {
                    color: rgba(234, 242, 243, 0.82);
                    margin-bottom: 1.25rem;
                }
                .approach-hero :global(.hero-title) {
                    font-size: clamp(2.4rem, 4.5vw, 3.8rem);
                    color: #fff;
                    max-width: 16ch;
                    margin-bottom: 1.5rem;
                }
                .hero-sub {
                    font-size: clamp(1.15rem, 1.6vw, 1.4rem);
                    font-weight: 400;
                    line-height: 1.5;
                    color: var(--text-on-dark);
                    max-width: 34ch;
                    margin-bottom: 1.75rem;
                }
                .hero-lead {
                    font-size: 1.15rem;
                    line-height: 1.7;
                    color: rgba(234, 242, 243, 0.92);
                    max-width: 60ch;
                }

                /* ---- DESIGNED, NOT IMPROVISED ----
                   Ported from the homepage. Uses its own wide grid rather
                   than this page's 900px .container so the image frame has
                   room for the floating spec chips.

                   NOTE: classes passed to imported motion components
                   (Reveal, WordReveal, Parallax, ImageReveal, Stagger,
                   StaggerItem) never receive the styled-jsx scope hash, so
                   they are styled as :global() descendants of a scoped
                   plain-DOM parent. Never use bare top-level :global(). */
                .designed-band {
                    background: var(--surface);
                }
                .designed-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    max-width: var(--container-wide);
                    margin: 0 auto;
                    padding: var(--section-pad) 3rem;
                    gap: clamp(2.5rem, 6vw, 6rem);
                    align-items: center;
                }
                .designed-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 1.35rem;
                }
                .designed-content :global(.eyebrow-row) {
                    display: block;
                }
                .designed-content :global(.designed-title) {
                    font-size: clamp(2.2rem, 4.2vw, 3.4rem);
                    color: var(--text-heading);
                    margin: 0;
                }
                .designed-content :global(.designed-text) {
                    max-width: 34em;
                }
                .designed-content :global(.designed-text h3) {
                    font-size: clamp(1.25rem, 2vw, 1.5rem);
                    margin-bottom: 0.85rem;
                    font-weight: 600;
                    color: var(--text-heading);
                    letter-spacing: -0.01em;
                    line-height: 1.25;
                }
                .designed-content :global(.designed-text p) {
                    font-size: 1.05rem;
                    color: var(--text-body);
                    line-height: 1.7;
                }
                .designed-grid :global(.designed-visual) {
                    width: 100%;
                    position: relative;
                }
                .designed-grid :global(.visual-frame) {
                    border-radius: var(--radius-lg);
                    aspect-ratio: 3 / 4;
                    box-shadow: var(--shadow-soft);
                    background: var(--surface-mist);
                }
                .visual-bg {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-color: var(--surface-mist);
                }
                .visual-designed {
                    background-image: url('/images/main/designed-grid.jpg');
                }

                /* Spec chips floating over the frame */
                .spec-layer {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    pointer-events: none;
                }
                .spec-layer :global(.spec-stagger) {
                    position: absolute;
                    inset: 0;
                }
                .spec-layer :global(.spec-chip) {
                    position: absolute;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.55rem;
                    padding: 0.55rem 1.05rem;
                    background: rgba(255, 255, 255, 0.86);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    border: 1px solid rgba(255, 255, 255, 0.65);
                    border-radius: var(--radius-pill);
                    box-shadow: var(--shadow-lift);
                    font-size: 0.8rem;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                    color: var(--petrol);
                    white-space: nowrap;
                }
                .spec-layer :global(.spec-chip)::before {
                    content: '';
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: var(--turquoise-deep);
                    flex-shrink: 0;
                }
                .spec-layer :global(.chip-1) {
                    top: 9%;
                    left: -1rem;
                }
                .spec-layer :global(.chip-2) {
                    top: 46%;
                    right: -1.25rem;
                }
                .spec-layer :global(.chip-3) {
                    bottom: 9%;
                    left: 9%;
                }

                /* Sections */
                .section {
                    padding: var(--section-pad) 0;
                    border-top: 1px solid var(--hairline);
                }
                .section-head {
                    margin-bottom: 2.5rem;
                }
                .rule {
                    display: block;
                    width: 24px;
                    height: 2px;
                    border-radius: 2px;
                    background: var(--turquoise-deep);
                    margin-bottom: 1.25rem;
                }
                h2 {
                    font-size: clamp(1.7rem, 3vw, 2.2rem);
                    font-weight: 600;
                    letter-spacing: -0.01em;
                    color: var(--text-heading);
                }
                .content-block p {
                    font-size: 1.2rem;
                    line-height: 1.8;
                    color: var(--text-body);
                    margin-bottom: 1rem;
                }
                /* Steps */
                .steps-section :global(.steps-grid) {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 3rem;
                    margin-top: 0.5rem;
                }
                .step-number {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    border: 1px solid var(--hairline);
                    background: transparent;
                    font-family: var(--font-display-family);
                    font-size: 1.5rem;
                    font-weight: 500;
                    margin-bottom: 1.5rem;
                    color: var(--petrol);
                }
                .steps-section :global(.step h3) {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                    color: var(--text-heading);
                }
                .steps-section :global(.step p) {
                    font-size: 1.05rem;
                    line-height: 1.7;
                    color: var(--text-body);
                }

                /* Two Ways */
                .two-ways-section :global(.two-ways-grid) {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    margin-top: 0.5rem;
                }
                .two-ways-section :global(.way-card) {
                    padding: 2.5rem;
                    background: var(--surface-mist);
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--hairline);
                    transition: transform var(--dur-fast) var(--ease),
                        box-shadow var(--dur-fast) var(--ease);
                }
                .two-ways-section :global(.way-card:hover) {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lift);
                }
                .two-ways-section :global(.way-card h3) {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                    color: var(--text-heading);
                }
                .two-ways-section :global(.way-card p) {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: var(--text-body);
                }

                /* Quality */
                .learn-more {
                    margin-top: 1.5rem;
                    color: var(--text-muted);
                    font-size: 1rem !important;
                }
                .policy-links {
                    display: flex;
                    flex-direction: column;
                    margin-top: 1rem;
                }
                .policy-links :global(.policy-link) {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.75rem;
                    padding: 1.15rem 0;
                    font-size: 1.1rem;
                    font-weight: 500;
                    color: var(--text-heading);
                    text-decoration: none;
                    border-top: 1px solid var(--hairline);
                    transition: color var(--dur-fast) var(--ease);
                }
                .policy-links :global(.policy-link:last-child) {
                    border-bottom: 1px solid var(--hairline);
                }
                .policy-links :global(.policy-link .policy-arrow) {
                    color: var(--turquoise-deep);
                    transition: transform var(--dur-fast) var(--ease);
                }
                .policy-links :global(.policy-link:hover) {
                    color: var(--turquoise-deep);
                }
                .policy-links :global(.policy-link:hover .policy-arrow) {
                    transform: translateX(3px);
                }

                @media (max-width: 1024px) {
                    .designed-grid {
                        grid-template-columns: 1fr;
                        padding: var(--section-pad) 1.5rem;
                        gap: 2.5rem;
                    }
                    .designed-grid :global(.visual-frame) {
                        max-width: 520px;
                        margin: 0 auto;
                    }
                }

                @media (max-width: 768px) {
                    .approach-hero {
                        padding: 9rem 0 4rem;
                    }
                    .hero-lead {
                        font-size: 1.05rem;
                    }
                    .steps-section :global(.steps-grid) {
                        grid-template-columns: 1fr;
                        gap: 2.5rem;
                    }
                    .two-ways-section :global(.two-ways-grid) {
                        grid-template-columns: 1fr;
                    }
                    .two-ways-section :global(.way-card) {
                        padding: 1.75rem;
                    }
                    .content-block p {
                        font-size: 1.1rem;
                    }
                }

                @media (max-width: 480px) {
                    .spec-layer :global(.spec-chip) {
                        font-size: 0.7rem;
                        padding: 0.45rem 0.85rem;
                    }
                    .spec-layer :global(.chip-1) {
                        left: 0.6rem;
                    }
                    .spec-layer :global(.chip-2) {
                        right: 0.6rem;
                    }
                }
            `}</style>
        </div>
    );
}
