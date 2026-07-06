'use client';

import React from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { Reveal, WordReveal } from '@/lib/motion';

const POLICY_PARAGRAPHS = [
  "As Buge Gıda Ar-Ge Danışmanlık San. Tic. A.Ş. (Buge Foods), we are committed to producing freeze-dried fruit and vegetable products in full compliance with the Turkish Food Codex, applicable legal regulations, and FSSC 22000 / ISO 22000 standards.",
  "We prioritize food safety, consumer health, and consistent quality at every stage of our operations, aiming to deliver safe and reliable products to consumers.",
  "In order to meet customer expectations and maintain the highest level of satisfaction, we continuously improve our production processes, increase efficiency, and ensure consistent product quality.",
  "We control food safety risks throughout the entire production chain, ensure full traceability, and maintain a transparent and honest production approach.",
  "We establish relationships with our suppliers based on mutual trust and a shared commitment to quality, preserve product authenticity from raw material sourcing onward, and implement necessary measures to prevent fraud and adulteration.",
  "We promote a strong food safety culture across the organization by providing continuous training to increase employees' knowledge, awareness, and sense of responsibility.",
  "We conduct all activities with an environmentally responsible, ethical, and sustainable approach, use natural resources efficiently, and act with a strong sense of social responsibility.",
  "By continuously improving our quality and food safety management system, and striving to be a reliable, innovative, and exemplary organization within the sector, this policy constitutes the foundation of Buge Foods' FSSC 22000 Food Safety and Quality Policy.",
];

export default function FoodSafetyPage() {
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
              Quality &amp; Compliance
            </span>
          </Reveal>
          <WordReveal as="h1" className="font-display page-title" text="Food Safety and Quality Policy" delay={0.1} />
          <Reveal delay={0.15} y={16}>
            <span className="policy-badge">FSSC 22000 FOOD SAFETY AND QUALITY POLICY</span>
          </Reveal>

          <div className="content-body">
            {POLICY_PARAGRAPHS.map((paragraph, index) => (
              <Reveal className="policy-para" key={index} delay={index * 0.04} y={16}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal y={16}>
            <p className="signature">General Manager – Buge Foods</p>
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
