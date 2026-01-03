'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import LiquidHero from '@/app/components/LiquidHero';
import ResetSpotlight from '@/app/components/ResetSpotlight';
import StagesCarousel from '@/app/components/StagesCarousel';
import ProductGroups from '@/app/components/ProductGroups';
import { useLanguage } from '@/lib/LanguageContext';

const backgrounds = [
  '/hero/v4/kid-grow-v4.png',
  '/hero/v4/kid-rise-v4.png',
  '/hero/v4/teen-focus-v4.png',
];

const products = [
  '/hero/v3/kid-grow-transparent.svg',
  '/hero/v3/kid-rise-transparent.svg',
  '/hero/v3/teen-focus-transparent.svg',
];

export default function V2Home() {
  const [[page, direction], setPage] = useState([0, 0]);
  const { t, language } = useLanguage();

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleSlideChange = (index: number) => {
    setPage([index, index > page ? 1 : -1]);
  };

  const getIndex = (p: number) => {
    return Math.abs(p % backgrounds.length);
  };

  const currentIndex = getIndex(page);

  return (
    <div className="v2-app">
      <Navigation />

      <main>
        {/* HERO SECTION - Liquid Animation */}
        <section className="hero-section-wrapper">
          <LiquidHero
            backgrounds={backgrounds}
            products={products}
            activeIndex={currentIndex}
            direction={direction}
            onSlideChange={handleSlideChange}
            onNext={() => paginate(1)}
            onPrev={() => paginate(-1)}
          />
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
        
        .hero-section-wrapper {
            position: relative;
            height: 100vh;
            height: 100dvh; /* Dynamic viewport height for mobile */
            min-height: 600px; /* Minimum height to ensure content fits */
            width: 100%;
            overflow: hidden;
            background: #000;
        }

        @media (max-width: 768px) {
            .hero-section-wrapper {
                height: auto;
                min-height: 100vh;
                min-height: 100dvh;
            }
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* GRID LAYOUTS (Re-introduced) */
        .section-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 85vh;
            background: #fff;
        }

        .grid-content-left, .grid-content-right {
            padding: 8rem 6rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .section-label {
            display: block;
            text-transform: none;
            font-size: 1.125rem;
            color: #111;
            margin-bottom: 1.5rem;
            font-weight: 400;
        }

        .display-text {
            font-size: 4.2rem;
            font-weight: 700;
            line-height: 1.05;
            color: #1A4D5C;
            margin-bottom: 3rem;
            letter-spacing: -0.03em;
        }

        .section-text {
            margin-top: 1rem;
            max-width: 650px;
        }
        
        .section-text h3 {
             font-size: 2.6rem;
             margin-bottom: 2rem;
             font-weight: 700;
             color: #1A4D5C;
             letter-spacing: -0.02em;
             line-height: 1.1;
        }

        .section-text p {
             font-size: 1.35rem;
             color: #444;
             line-height: 1.6;
             max-width: 580px;
        }

        .grid-visual-right, .grid-visual-left {
            width: 100%;
            height: 100%;
            aspect-ratio: 3 / 4;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-color: #f9f9f9;
        }

        .visual-designed {
            background-image: url('/main/design-not-improvised.png');
        }

        .visual-adapts {
            background-image: url('/main/nutrition-that-adapts.png');
        }

        @media (max-width: 1024px) {
            .section-grid {
                grid-template-columns: 1fr;
                min-height: auto;
            }
            .grid-visual-right, .grid-visual-left {
                height: auto;
                width: 100%;
                aspect-ratio: 3 / 4;
            }
            .grid-content-left, .grid-content-right {
                padding: 4rem 2rem;
            }
            .reverse-mobile .grid-visual-left {
                order: 1; 
            }
            .display-text { font-size: 3rem; }
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
            .display-text { font-size: 3.5rem; }
            .manifesto-grid { grid-template-columns: 1fr; }
            .manifesto-card { padding: 3rem; min-height: auto; }
        }
      `}</style>
    </div>
  );
}
