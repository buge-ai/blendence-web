'use client';

import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LiquidHero from './components/LiquidHero';
import BentoSections from './components/BentoSections';
import ProductGroups from './components/ProductGroups';

const backgrounds = [
  '/hero/v2/kid-grow-v2.png',
  '/hero/v2/kid-rise-v2.png',
  '/hero/v2/teen-focus-v2.png',
];

const products: string[] = []; // No overlay products for v2 hero

export default function V2Home() {
  const [[page, direction], setPage] = useState([0, 0]);

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
            <span className="section-label">Philosophy</span>
            <h2 className="display-text">Designed,<br />not improvised.</h2>
            <div className="section-text">
              <h3>Deliberate Process</h3>
              <p>At Blendence, nutrition doesn’t happen by chance. Every blend is designed through a deliberate process that aligns nutritional science with real-life use.</p>
            </div>
          </div>
          <div className="grid-visual-right visual-designed"></div>
        </section>

        {/* SECTION 3: NUTRITION THAT ADAPTS */}
        <section className="section-grid adaptation-grid reverse-mobile">
          <div className="grid-visual-left visual-adapts"></div>
          <div className="grid-content-right centered">
            <span className="section-label">Adaptability</span>
            <h2 className="display-text">Nutrition that adapts<br />to real life.</h2>
            <div className="section-text">
              <h3>Real Life Adaptation</h3>
              <p>From home to school, from work to demanding periods, daily routines are rarely the same. Blendence is designed to fit into real life — without rituals, complexity, or extremes.</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: PRODUCT GROUPS (Stages & Reset Selection) */}
        <ProductGroups />

        {/* SECTION 5 & 6: BENTO GRIDS (Stages & Reset Product Details) */}
        <BentoSections />

        {/* SECTION 7: OUR APPROACH */}
        <section className="approach-teaser centered-block">
          <div className="container">
            <h2 className="section-title">How we design nutrition.</h2>
            <div className="approach-message">
              <p className="big-statement">We don’t start with ingredients.<br />We start with needs.</p>
              <p className="approach-desc">Our approach brings together nutritional science, food engineering, and real-life use to create blends that are relevant, consistent, and clean.</p>
            </div>
            <a href="/approach" className="btn-outline">Our approach</a>
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
            padding: 6rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .section-text {
            margin-top: 2rem;
            max-width: 500px;
        }
        
        .section-text h3 {
             font-size: 1.5rem;
             margin-bottom: 1rem;
             font-weight: 500;
        }

        .section-text p {
             font-size: 1.125rem;
             color: #555;
             line-height: 1.6;
        }

        .grid-visual-right, .grid-visual-left {
            width: 100%;
            height: 100%;
            min-height: 500px;
            background-size: cover;
            background-position: center;
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
                height: 400px;
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
