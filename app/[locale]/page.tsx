'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import VideoHero from '@/app/components/VideoHero';
import ResetSpotlight from '@/app/components/ResetSpotlight';
import StagesShowcase from '@/app/components/StagesShowcase';
import ProductGroups from '@/app/components/ProductGroups';
import WaveDivider from '@/app/components/WaveDivider';
import MethodSection from '@/app/components/MethodSection';
import MomentsCarousel from '@/app/components/MomentsCarousel';
import { Reveal, WordReveal } from '@/lib/motion';
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

        {/* SECTION 2: MOMENTS — straight out of the hero, the blends as one
            family's week. "When does this fit my life?" answered first. */}
        <MomentsCarousel />

        {/* WAVE DIVIDER — moments → method */}
        <WaveDivider tone="brand" />

        {/* SECTION 3: THE METHOD — the adaptability claim left, the
            fresh → freeze-dried → glass triptych right. */}
        <MethodSection />

        {/* WAVE DIVIDER — manifesto region → product ranges */}
        <WaveDivider tone="brand" />

        {/* SECTION 4: PRODUCT GROUPS (Stages & Reset Selection) */}
        <ProductGroups />

        {/* SECTION 5: STAGES — scroll-pinned showcase (carries the
            #stages-section anchor the hero CTA scrolls to) */}
        <StagesShowcase />

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
            /* clip, NOT hidden: overflow-x:hidden makes overflow-y compute to
               auto, which turns this div into the scroll container for its
               descendants and silently kills position:sticky (StagesShowcase's
               pinned stage). clip does the same horizontal clamping without
               creating a scrollport. */
            overflow-x: clip;
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

        /* NOTE: classes passed to imported motion components (Reveal,
           WordReveal, Parallax, ImageReveal) never receive the styled-jsx
           scope hash, so they are styled as :global() descendants of a
           scoped plain-DOM parent. Never use bare top-level :global(). */

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
            margin: 1.1rem auto 1.25rem;
            color: var(--text-heading);
            max-width: 16em;
        }

        .approach-desc {
            max-width: 34em;
            margin: 0 auto 1.85rem;
            font-size: 1.125rem;
            line-height: 1.7;
            color: var(--text-body);
        }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 480px) {
            .container {
                padding: 0 1.25rem;
            }
        }
      `}</style>
    </div>
  );
}
