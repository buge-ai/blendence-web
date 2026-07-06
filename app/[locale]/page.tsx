'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import VideoHero from '@/app/components/VideoHero';
import ResetSpotlight from '@/app/components/ResetSpotlight';
import StagesCarousel from '@/app/components/StagesCarousel';
import ProductGroups from '@/app/components/ProductGroups';
import WaveDivider from '@/app/components/WaveDivider';
import AdaptiveScenes from '@/app/components/AdaptiveScenes';
import { Reveal, WordReveal, ImageReveal, Parallax, Stagger, StaggerItem } from '@/lib/motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function V2Home() {
  const { t, language } = useLanguage();

  return (
    <div className="v2-app">
      <Navigation />

      <main>
        {/* VIDEO HERO SECTION */}
        <section className="video-hero-section-wrapper">
          <VideoHero />
        </section>

        {/* SECTION 2: DESIGNED, NOT IMPROVISED */}
        <section className="section-band">
          <div className="section-grid intro-grid">
            <div className="grid-content">
              <Reveal className="eyebrow-row">
                <span className="eyebrow">{t.mainPage.philosophy.label}</span>
              </Reveal>
              <WordReveal
                as="h2"
                className="display-text font-display"
                text={t.mainPage.philosophy.title}
              />
              <Reveal delay={0.12} className="section-text">
                <h3>{t.mainPage.philosophy.heading}</h3>
                <p>{t.mainPage.philosophy.description}</p>
              </Reveal>
            </div>
            <Parallax distance={24} className="grid-visual">
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

        {/* SECTION 3: NUTRITION THAT ADAPTS */}
        <section className="section-band mist">
          <div className="section-grid adaptation-grid reverse-mobile">
            <Parallax distance={24} className="grid-visual">
              <Reveal>
                <AdaptiveScenes
                  scenes={t.mainPage.adaptability.scenes.map((s, i) => ({
                    ...s,
                    src: `/images/adapt/${['scene-morning', 'scene-desk', 'scene-evening'][i]}.jpg`,
                  }))}
                />
              </Reveal>
            </Parallax>
            <div className="grid-content">
              <Reveal className="eyebrow-row">
                <span className="eyebrow" style={{ '--eyebrow-accent': 'var(--green-deep)' } as React.CSSProperties}>
                  {t.mainPage.adaptability.label}
                </span>
              </Reveal>
              <WordReveal
                as="h2"
                className="display-text font-display"
                text={t.mainPage.adaptability.title}
              />
              <Reveal delay={0.12} className="section-text">
                <h3>{t.mainPage.adaptability.heading}</h3>
                <p>{t.mainPage.adaptability.description}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WAVE DIVIDER — manifesto region → product ranges */}
        <WaveDivider tone="brand" />

        {/* SECTION 4: PRODUCT GROUPS (Stages & Reset Selection) */}
        <ProductGroups />

        {/* SECTION 5: STAGES CAROUSEL */}
        <StagesCarousel />

        {/* SECTION 6: RESET SPOTLIGHT */}
        <ResetSpotlight />

        {/* WAVE DIVIDER — ranges → approach */}
        <WaveDivider tone="reset" />

        {/* SECTION 7: OUR APPROACH */}
        <section className="section-band mist approach-band">
          <div className="approach-teaser">
            <div className="container">
              <Reveal className="eyebrow-row">
                <span className="eyebrow">{t.mainPage.approach.title}</span>
              </Reveal>
              <WordReveal
                as="h2"
                className="big-statement font-display"
                text={t.mainPage.approach.bigStatement}
              />
              <Reveal delay={0.12}>
                <p className="approach-desc">{t.mainPage.approach.description}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <Link href={`/${language}/approach`} className="btn-ghost">
                  {t.mainPage.approach.button}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style jsx>{`
        .v2-app {
            background-color: var(--surface);
            color: var(--text-body);
            font-family: var(--font-body-family);
            overflow-x: hidden;
        }

        .video-hero-section-wrapper {
            position: relative;
            width: 100%;
            height: 100vh;
            height: 100dvh;
            overflow: hidden;
        }

        .container {
            max-width: var(--container);
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* ---- SECTION BANDS (full-bleed alternating washes) ---- */
        .section-band {
            width: 100%;
            background: var(--surface);
        }

        .section-band.mist {
            background: var(--surface-mist);
        }

        /* ---- EDITORIAL GRID ---- */
        .section-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            max-width: var(--container-wide);
            margin: 0 auto;
            padding: var(--section-pad) 3rem;
            gap: clamp(2.5rem, 6vw, 6rem);
            align-items: center;
        }

        .grid-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1.35rem;
        }

        /* NOTE: classes passed to imported motion components (Reveal,
           WordReveal, Parallax, ImageReveal) never receive the styled-jsx
           scope hash, so they are styled as :global() descendants of a
           scoped plain-DOM parent. Never use bare top-level :global(). */

        .grid-content :global(.eyebrow-row) {
            display: block;
        }

        .grid-content :global(.display-text) {
            font-size: clamp(2.4rem, 4.6vw, 3.7rem);
            color: var(--text-heading);
            margin: 0;
        }

        .grid-content :global(.section-text) {
            max-width: 34em;
        }

        .grid-content :global(.section-text h3) {
             font-size: clamp(1.25rem, 2vw, 1.5rem);
             margin-bottom: 0.85rem;
             font-weight: 600;
             color: var(--text-heading);
             letter-spacing: -0.01em;
             line-height: 1.25;
        }

        .grid-content :global(.section-text p) {
             font-size: 1.05rem;
             color: var(--text-body);
             line-height: 1.7;
             max-width: 34em;
        }

        /* ---- EDITORIAL IMAGE FRAMES ---- */
        .section-grid :global(.grid-visual) {
            width: 100%;
            position: relative;
        }

        .section-grid :global(.visual-frame) {
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

        /* ---- SPEC CHIPS (over the "designed" frame) ---- */
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

        /* ---- APPROACH TEASER ---- */
        .approach-band {
            border-top: 1px solid var(--hairline);
        }

        .approach-teaser {
            padding: var(--section-pad) 0;
            text-align: center;
        }

        .approach-teaser :global(.eyebrow-row) {
            display: flex;
            justify-content: center;
        }

        .approach-teaser :global(.big-statement) {
            font-size: clamp(2.2rem, 4.2vw, 3.4rem);
            margin: 1.5rem auto 1.75rem;
            color: var(--text-heading);
            max-width: 16em;
        }

        .approach-desc {
            max-width: 34em;
            margin: 0 auto 2.5rem;
            font-size: 1.125rem;
            line-height: 1.7;
            color: var(--text-body);
        }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 1024px) {
            .section-grid {
                grid-template-columns: 1fr;
                padding: var(--section-pad) 1.5rem;
                gap: 2.5rem;
            }
            .reverse-mobile :global(.grid-visual) {
                order: 1;
            }
            .section-grid :global(.visual-frame) {
                max-width: 520px;
                margin: 0 auto;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 0 1.25rem;
            }
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
