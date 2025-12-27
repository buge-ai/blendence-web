'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function V2Home() {
  const [activeImage, setActiveImage] = useState(0);
  const heroImages = [
    '/hero/kid-grow.png',
    '/hero/kid-rise.png',
    '/hero/teen-focus.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navigation />
      <main>
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-bg">
            {heroImages.map((src, index) => (
              <div
                key={src}
                className={`hero-img-wrapper ${index === activeImage ? 'active' : ''}`}
              >
                <Image
                  src={src}
                  alt="Hero Background"
                  fill
                  className="hero-img"
                  priority={index === 0}
                />
              </div>
            ))}
            <div className="hero-overlay"></div>
          </div>

          <div className="container hero-content">
            <h5 className="animate-fade-in" style={{ animationDelay: '0.1s' }}>Naturally powerful, perfectly balanced.</h5>
            <h1 className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Designed nutrition<br />
              for everyday balance.
            </h1>
            <a href="#approach" className="btn btn-primary animate-fade-in" style={{ animationDelay: '0.5s' }}>
              Explore our approach
            </a>
          </div>
        </section>

        {/* MANIFESTO SECTION */}
        <section className="section-padding manifesto-section">
          <div className="container">
            <div className="manifesto-grid">
              <div className="manifesto-text">
                <h2>Designed,<br />not improvised.</h2>
              </div>
              <div className="manifesto-desc">
                <p>At Blendence, nutrition doesn’t happen by chance.</p>
                <p>Every blend is designed through a deliberate process that aligns nutritional science with real-life use.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ADAPTABILITY SECTION */}
        <section className="section-padding adaptability-section">
          <div className="container center-text">
            <h2>Nutrition that adapts<br />to real life.</h2>
            <p className="max-w-md">
              From home to school, from work to demanding periods, daily routines are rarely the same.
              Blendence is designed to fit into real life — without rituals, complexity, or extremes.
            </p>
          </div>
        </section>

        {/* STAGES TEASER */}
        <section className="section-padding stages-teaser" id="stages">
          <div className="container">
            <div className="split-layout">
              <div>
                <h2>Nutrition designed for the stages of life.</h2>
                <p>
                  As the body’s needs shift across different stages of life, nutrition should adapt accordingly.
                  Stages is our framework for designing nutrition around these transitions.
                </p>
                <a href="#" className="link-arrow">Explore Stages &rarr;</a>
              </div>
              <div className="visual-box abstract-tree">
                {/* Abstract tree/growth visual could go here */}
                <div className="circle-growth"></div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT CARDS */}
        <section className="section-padding product-showcase">
          <div className="container">
            <div className="product-grid">
              {/* Product 1 */}
              <div className="product-card">
                <div className="card-image">
                  <Image src="/product/product-1.png" alt="KidGrow" width={400} height={400} />
                </div>
                <div className="card-info">
                  <h3>KidGrow <span className="tag">4–7</span></h3>
                  <p>Optimized nutrition for early growth stages — designed to fit naturally into everyday routines.</p>
                  <a href="#" className="btn-link">Explore KidGrow</a>
                </div>
              </div>

              {/* Product 2 */}
              <div className="product-card">
                <div className="card-image">
                  <Image src="/product/product-2.png" alt="KidRise" width={400} height={400} />
                </div>
                <div className="card-info">
                  <h3>KidRise <span className="tag">8–12</span></h3>
                  <p>Optimized nutrition for learning and active routines — supporting consistency throughout school days.</p>
                  <a href="#" className="btn-link">Explore KidRise</a>
                </div>
              </div>

              {/* Product 3 */}
              <div className="product-card">
                <div className="card-image">
                  <Image src="/product/product-3.png" alt="TeenFocus" width={400} height={400} />
                </div>
                <div className="card-info">
                  <h3>TeenFocus <span className="tag">13–16</span></h3>
                  <p>Optimized nutrition for focus-intensive stages — designed for mentally demanding school years.</p>
                  <a href="#" className="btn-link">Explore TeenFocus</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESET SPOTLIGHT */}
        <section className="section-padding reset-section" id="reset">
          <div className="container">
            <div className="reset-layout">
              <div className="reset-content">
                <h2>Designed for moments when lightness and balance matter more.</h2>
                <p>Some periods feel heavier than usual.</p>
                <p>Reset supports lightness and balance during periods when daily routines feel heavier — through clean, plant-based formulation.</p>
                <a href="#" className="btn btn-primary">Explore Reset</a>
              </div>
              <div className="reset-visual">
                {/* Placeholder for mockup */}
                <div className="reset-placeholder">
                  <span>Reset Mockup</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APPROACH TEASER */}
        <section className="section-padding approach-section" id="approach">
          <div className="container center-text">
            <h2>How we design nutrition.</h2>
            <div className="approach-text">
              <p className="big-statement">We don’t start with ingredients.<br />We start with needs.</p>
              <p>Our approach brings together nutritional science, food engineering, and real-life use to create blends that are relevant, consistent, and clean.</p>
              <a href="#" className="btn btn-outline">Our approach</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style jsx>{`
        /* HERO */
        .hero-section {
          position: relative;
          height: 100vh;
          min-height: 700px;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-color: var(--c-primary-dark);
        }

        .hero-img-wrapper {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 2.5s ease-in-out;
          will-change: opacity, transform;
        }

        .hero-img-wrapper.active {
          opacity: 1;
          z-index: 1;
        }

        .hero-img {
          object-fit: cover;
          transform: scale(1.05); /* Start slightly zoomed in or out */
          transition: transform 7s ease-out; /* Slow drift */
        }

        .hero-img-wrapper.active .hero-img {
          transform: scale(1.15); /* Slowly zoom in while active */
        }
        
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(15, 36, 32, 0.7), rgba(15, 36, 32, 0.3));
          z-index: 2;
        }

        .container.hero-content {
          position: relative;
          z-index: 3;
        }

        .hero-content h5 {
          font-family: var(--font-body);
          font-size: 1.1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .hero-content h1 {
          font-size: clamp(3rem, 5vw, 5rem);
          line-height: 1.1;
          margin-bottom: 3rem;
        }

        /* MANIFESTO */
        .manifesto-section {
          background-color: var(--c-neutral-50);
        }

        .manifesto-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: end;
        }

        .manifesto-text h2 {
          font-size: 4rem;
          color: var(--c-primary-dark);
        }

        .manifesto-desc p {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--c-neutral-800);
        }

        /* ADAPTABILITY */
        .adaptability-section {
          background-color: white;
          padding: 8rem 0;
        }

        .center-text {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .max-w-md {
          max-width: 700px;
          margin: 2rem auto 0;
          font-size: 1.5rem;
          color: var(--c-neutral-800);
        }

        /* STAGES TEASER */
        .stages-teaser {
          background-color: var(--c-neutral-100);
        }

        .split-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        
        .link-arrow {
          display: inline-block;
          margin-top: 2rem;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--c-primary);
        }

        .visual-box {
          height: 400px;
          background: #e6e4dc;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .circle-growth {
          width: 200px;
          height: 200px;
          background: var(--c-accent-gold);
          border-radius: 50%;
          opacity: 0.2;
          transform: scale(1);
          animation: pulse 4s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(0.8); opacity: 0.1; }
        }

        /* PRODUCTS */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .product-card {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-lg);
        }

        .card-image {
          background: var(--c-neutral-50);
          border-radius: 16px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          min-height: 300px;
        }
        
        .card-image img {
           transition: transform 0.5s ease;
        }
        
        .product-card:hover .card-image img {
          transform: scale(1.05);
        }

        .card-info h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tag {
          font-size: 0.9rem;
          font-family: var(--font-body);
          background: var(--c-neutral-100);
          padding: 0.2rem 0.8rem;
          border-radius: 99px;
          color: var(--c-primary);
        }

        .card-info p {
          color: var(--c-neutral-800);
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .btn-link {
          font-weight: 600;
          color: var(--c-primary);
          text-decoration: underline;
          text-decoration-color: transparent;
          transition: all 0.2s;
        }
        
        .product-card:hover .btn-link {
          text-decoration-color: var(--c-primary);
        }

        /* RESET */
        .reset-section {
          background-color: var(--c-primary);
          color: white;
          border-radius: 32px;
          margin: 4rem 2rem; /* inset section */
        }

        .reset-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .reset-content h2, .reset-content p {
          color: white;
        }
        
        .reset-content h2 {
          margin-bottom: 2rem;
        }
        
        .reset-content .btn {
          margin-top: 2rem;
          background: white;
          color: var(--c-primary);
        }

        .reset-visual {
          height: 400px;
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* APPROACH */
        .approach-text {
          max-width: 800px;
          margin-top: 3rem;
        }
        
        .big-statement {
          font-size: 2rem;
          font-weight: 500;
          color: var(--c-primary-dark);
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .manifesto-grid, .split-layout, .reset-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .manifesto-text h2 {
            font-size: 2.5rem;
          }
          
          .reset-section {
            margin: 2rem 1rem;
            border-radius: 20px;
          }
        }
      `}</style>
    </>
  );
}
