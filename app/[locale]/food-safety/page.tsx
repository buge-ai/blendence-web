'use client';

import React from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { Reveal, WordReveal } from '@/lib/motion';

export default function FoodSafetyPage() {
  const { t } = useLanguage();
  const p = t.foodSafetyPage;

  return (
    <div className="policy-page">
      <Navigation />

      <main className="content-wrapper">
        <div className="container">
          <Reveal y={16}>
            <span
              className="eyebrow"
              style={{ '--eyebrow-accent': 'var(--green-deep)' } as React.CSSProperties}
            >
              {p.eyebrow}
            </span>
          </Reveal>
          <WordReveal as="h1" className="font-display page-title" text={p.title} delay={0.1} />
          <Reveal delay={0.15} y={16}>
            <span className="policy-badge">{p.policyTitle}</span>
          </Reveal>

          <div className="content-body">
            {p.paragraphs.map((paragraph, index) => (
              <Reveal className="policy-para" key={index} delay={index * 0.04} y={16}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal y={16}>
            <p className="signature">{p.signature}</p>
          </Reveal>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .policy-page {
          background-color: var(--surface);
          color: var(--text-body);
          min-height: 100vh;
        }

        .content-wrapper {
          padding: 11rem 2rem 6rem;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
        }

        .eyebrow {
          margin-bottom: 1.25rem;
        }

        .container :global(.page-title) {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          margin-bottom: 1.5rem;
        }

        .policy-badge {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--green-deep);
          background: rgba(94, 140, 58, 0.1);
          border: 1px solid rgba(94, 140, 58, 0.22);
          padding: 0.5rem 1.1rem;
          border-radius: var(--radius-pill);
          margin-bottom: 3rem;
        }

        .content-body {
          border-top: 1px solid var(--hairline);
        }

        .content-body :global(.policy-para) {
          padding: 1.5rem 0;
          border-bottom: 1px solid var(--hairline);
        }

        .content-body :global(.policy-para p) {
          font-size: 1.1rem;
          line-height: 1.9;
          color: var(--text-body);
        }

        .signature {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--petrol);
          margin-top: 3rem;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 8rem 1.25rem 4rem;
          }

          .content-body :global(.policy-para p) {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
