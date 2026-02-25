'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import VideoHero from '@/app/components/VideoHero';
import ResetSpotlight from '@/app/components/ResetSpotlight';
import StagesCarousel from '@/app/components/StagesCarousel';
import ProductGroups from '@/app/components/ProductGroups';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

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

        {/* SECTION 2 & 3: INTRO / MANIFESTO */}
        {/* Ramp Style: Large typography, airy spacing, clean white background */}
        {/* SECTION 2: DESIGNED, NOT IMPROVISED */}
        <section className="section-grid intro-grid">
          <div className="grid-content-left centered">
            <span className="section-label">{t.mainPage.philosophy.label}</span>
            <h2 className="display-text" dangerouslySetInnerHTML={{ __html: t.mainPage.philosophy.title.replace(/\n/g, '<br/>') }} />
            <div className="section-text">
              <h3>{t.mainPage.philosophy.heading}</h3>
              <p>{t.mainPage.philosophy.description}</p>
            </div>
          </div>
          <div className="grid-visual-right visual-designed"></div>
        </section>

        {/* SECTION 3: NUTRITION THAT ADAPTS */}
        <section className="section-grid adaptation-grid reverse-mobile">
          <div className="grid-visual-left visual-adapts"></div>
          <div className="grid-content-right centered">
            <span className="section-label">{t.mainPage.adaptability.label}</span>
            <h2 className="display-text" dangerouslySetInnerHTML={{ __html: t.mainPage.adaptability.title.replace(/\n/g, '<br/>') }} />
            <div className="section-text">
              <h3>{t.mainPage.adaptability.heading}</h3>
              <p>{t.mainPage.adaptability.description}</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: PRODUCT GROUPS (Stages & Reset Selection) */}
        <ProductGroups />

        {/* SECTION 5: NEW STAGES CAROUSEL */}
        <StagesCarousel />

        {/* SECTION 6: RESET SPOTLIGHT (Bento Grid Design) */}
        <ResetSpotlight />

        {/* SECTION 7: OUR APPROACH */}
        <section className="approach-teaser centered-block">
          <div className="container">
            <h2 className="section-title">{t.mainPage.approach.title}</h2>
            <div className="approach-message">
              <p className="big-statement" dangerouslySetInnerHTML={{ __html: t.mainPage.approach.bigStatement.replace(/\n/g, '<br/>') }} />
              <p className="approach-desc">{t.mainPage.approach.description}</p>
            </div>
            <Link href={`/${language}/approach`} className="btn-outline">{t.mainPage.approach.button}</Link>
          </div>
        </section>

      </main>
      <Footer />

      <style jsx>{`
        .v2-app {
            background-color: #ffffff;
            color: #111;
            font-family: 'Inter', sans-serif;
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
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* GRID LAYOUTS */
        .section-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: auto;
            background: #fff;
            max-width: 1400px;
            margin: 0 auto;
            padding: 4rem 3rem;
            gap: 3rem;
            align-items: center;
        }

        .grid-content-left, .grid-content-right {
            padding: 3rem 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .section-label {
            display: block;
            text-transform: none;
            font-size: 0.9rem;
            color: #888;
            margin-bottom: 1rem;
            font-weight: 500;
            letter-spacing: 0.03em;
        }

        .display-text {
            font-size: 2.8rem;
            font-weight: 700;
            line-height: 1.1;
            color: #1A4D5C;
            margin-bottom: 1.5rem;
            letter-spacing: -0.03em;
        }

        .section-text {
            margin-top: 0.5rem;
            max-width: 520px;
        }

        .section-text h3 {
             font-size: 1.6rem;
             margin-bottom: 1rem;
             font-weight: 600;
             color: #1A4D5C;
             letter-spacing: -0.01em;
             line-height: 1.2;
        }

        .section-text p {
             font-size: 1.05rem;
             color: #555;
             line-height: 1.6;
             max-width: 480px;
        }

        .grid-visual-right, .grid-visual-left {
            width: 100%;
            aspect-ratio: 3 / 4;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-color: #f5f5f5;
            border-radius: 1.25rem;
            overflow: hidden;
        }

        .visual-designed {
            background-image: url('${blob('main/design-not-improvised.png')}');
        }

        .visual-adapts {
            background-image: url('${blob('main/nutrition-that-adapts.png')}');
        }

        @media (max-width: 1024px) {
            .section-grid {
                grid-template-columns: 1fr;
                padding: 2rem 1.5rem;
                gap: 2rem;
            }
            .grid-visual-right, .grid-visual-left {
                width: 100%;
                aspect-ratio: 3 / 4;
            }
            .grid-content-left, .grid-content-right {
                padding: 2rem 1rem;
            }
            .reverse-mobile .grid-visual-left {
                order: 1;
            }
            .display-text { font-size: 2.2rem; }
        }


        /* APPROACH TEASER */
        .approach-teaser {
            padding: 10rem 0;
            text-align: center;
            background: #ffffff;
            border-top: 1px solid rgba(0,0,0,0.05);
        }

        .section-title {
            font-size: 3rem;
            font-weight: 500;
            margin-bottom: 3rem;
        }

        .big-statement {
            font-size: 2.5rem;
            font-weight: 500;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            color: #111;
        }

        .approach-desc {
            max-width: 600px;
            margin: 0 auto 3rem;
            font-size: 1.125rem;
            color: #666;
        }

        .btn-outline {
            display: inline-block;
            border: 1px solid #e0e0e0;
            color: #111;
            padding: 0.8rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s;
            background: white;
        }
        .btn-outline:hover {
            border-color: #000;
            background: #000;
            color: white;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
            .manifesto-grid { grid-template-columns: 1fr; }
            .manifesto-card { padding: 3rem; min-height: auto; }
        }
      `}</style>
    </div>
  );
}
