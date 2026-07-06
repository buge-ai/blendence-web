'use client';

import React from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Reveal, WordReveal } from '@/lib/motion';

function ArrowIcon() {
    return (
        <svg
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

export default function AboutPage() {
    const { t, language } = useLanguage();
    const p = t.aboutPage;

    return (
        <div className="about-page">
            <Navigation />

            <main>
                <section className="about-hero">
                    <div className="container">
                        <Reveal y={18}>
                            <span className="eyebrow">{t.nav.about}</span>
                        </Reveal>
                        <WordReveal as="h1" className="font-display hero-title" text={p.title} delay={0.1} />
                    </div>
                </section>

                <section className="about-content">
                    <div className="container">
                        <div className="content-block">
                            <WordReveal
                                as="p"
                                className="font-display intro-statement"
                                text={p.intro}
                                delay={0.05}
                            />
                            <Reveal delay={0.1} y={18}>
                                <p className="body-copy">{p.description}</p>
                            </Reveal>

                            <Reveal delay={0.1} y={18}>
                                <div className="company-note">
                                    <span className="eyebrow">{t.footer.company}</span>
                                    <p dangerouslySetInnerHTML={{ __html: p.companyNote }} />
                                </div>
                            </Reveal>

                            <Reveal delay={0.15} y={18}>
                                <Link href={`/${language}/approach`} className="btn-ghost approach-link">
                                    {p.exploreApproach}
                                    <ArrowIcon />
                                </Link>
                            </Reveal>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .about-page {
                    background: var(--surface);
                    color: var(--text-body);
                    min-height: 100vh;
                }
                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                .about-hero {
                    padding: 12rem 0 3rem;
                    background: linear-gradient(180deg, var(--surface-mist) 0%, var(--surface) 100%);
                }
                .about-hero :global(.hero-title) {
                    font-size: clamp(2.4rem, 4.5vw, 3.8rem);
                    margin-top: 1.25rem;
                }
                .about-content {
                    padding: 3rem 0 var(--section-pad);
                }
                .content-block {
                    max-width: 720px;
                }
                .content-block :global(.intro-statement) {
                    font-size: clamp(1.6rem, 3vw, 2.2rem);
                    line-height: 1.35;
                    color: var(--text-heading);
                    margin-bottom: 2.5rem;
                }
                .body-copy {
                    font-size: 1.25rem;
                    line-height: 1.75;
                    color: var(--text-body);
                }
                .company-note {
                    margin-top: 3.5rem;
                    padding-top: 2rem;
                    border-top: 1px solid var(--hairline);
                }
                .company-note .eyebrow {
                    margin-bottom: 1rem;
                }
                .company-note p {
                    font-size: 1.05rem;
                    line-height: 1.7;
                    color: var(--text-body);
                }
                .company-note :global(strong) {
                    color: var(--text-heading);
                    font-weight: 600;
                }
                .company-note :global(a) {
                    transition: opacity var(--dur-fast) var(--ease);
                }
                .company-note :global(a:hover) {
                    opacity: 0.72;
                }
                .content-block :global(.approach-link) {
                    margin-top: 2.75rem;
                }

                @media (max-width: 768px) {
                    .about-hero {
                        padding: 9rem 0 2rem;
                    }
                    .body-copy {
                        font-size: 1.1rem;
                    }
                }
            `}</style>
        </div>
    );
}
