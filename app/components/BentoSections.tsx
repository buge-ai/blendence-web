'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const stagesProducts = [
    {
        id: 'kidgrow',
        title: 'KidGrow',
        age: '4–7',
        range: 'Years',
        desc: 'Optimized nutrition for early growth stages.',
        fullDesc: 'Designed to fit naturally into everyday routines, supporting early development with essential nutrients.',
        href: '/stages/kidgrow',
        image: '/product/kid-grow.png',
        overlayColor: 'rgba(27, 94, 32, 0.8)' // Green tint
    },
    {
        id: 'kidrise',
        title: 'KidRise',
        age: '8–12',
        range: 'Years',
        desc: 'Supporting consistency throughout school days.',
        fullDesc: 'Optimized for learning and active routines, providing sustained energy without the crash.',
        href: '/stages/kidrise',
        image: '/product/kid-rise.png',
        overlayColor: 'rgba(230, 81, 0, 0.8)' // Orange tint
    },
    {
        id: 'teenfocus',
        title: 'TeenFocus',
        age: '13–16',
        range: 'Years',
        desc: 'Designed for mentally demanding school years.',
        fullDesc: 'Focus-intensive formula that helps teenagers stay sharp and balanced during stressful periods.',
        href: '/stages/teenfocus',
        image: '/product/teen-focus.png',
        overlayColor: 'rgba(13, 71, 161, 0.8)' // Blue tint
    }
];

const resetProducts = [
    {
        id: 'balance',
        title: 'Reset Balance',
        tag: 'Everyday',
        desc: 'Supporting lightness and balance during periods when daily routines feel heavier.',
        href: '/reset/balance',
        bgColor: '#e0f2f1', // Very light teal
    },
    {
        id: 'intense',
        title: 'Reset Intense',
        tag: 'Targeted',
        desc: 'Clean, plant-based formulation for moments requiring deeper nutritional reset and portability.',
        href: '/reset/intense',
        bgColor: '#f3e5f5', // Very light purple
    }
];

export default function BentoSections() {
    return (
        <>
            {/* STAGES SECTION */}
            <section id="stages-section" className="bento-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="ramp-heading">Nutrition designed for<br />the stages of life.</h2>
                        <p className="ramp-subheading">
                            As the body’s needs shift across different stages of life, nutrition should adapt accordingly.
                        </p>
                    </div>

                    <div className="bento-grid stages-grid">
                        {stagesProducts.map((product) => (
                            <Link href={product.href} key={product.id} className="stage-card">
                                <div className="card-bg">
                                    <div
                                        className="bg-image"
                                        style={{
                                            backgroundImage: `url('${product.image}')`,
                                            width: '100%',
                                            height: '100%',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            position: 'absolute',
                                            inset: 0,
                                            transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
                                        }}
                                    />
                                    <div className="bg-overlay" />
                                </div>

                                <div className="card-top">
                                    <span className="product-title">{product.title}</span>
                                </div>

                                <div className="card-content-bottom">
                                    <div className="norm-content">
                                        <span className="age-badge">{product.age} {product.range}</span>
                                    </div>
                                    <div className="hover-content">
                                        <h3 className="hover-headline">{product.desc}</h3>
                                        <div className="hover-divider" />
                                        <p className="hover-sub">{product.fullDesc}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* RESET SECTION */}
            <section id="reset-section" className="bento-section highlight-bg">
                <div className="container">
                    <div className="section-header">
                        <h2 className="ramp-heading">Moments of balance.</h2>
                        <p className="ramp-subheading">
                            Designed for moments when lightness and balance matter more.
                        </p>
                    </div>

                    <div className="bento-grid reset-grid">
                        {resetProducts.map((product) => (
                            <Link href={product.href} key={product.id} className="bento-card reset-card">
                                <div className="card-content">
                                    <span className="card-label">{product.tag}</span>
                                    <h3>{product.title}</h3>
                                    <p>{product.desc}</p>
                                    <span className="link-arrow">Learn more &rarr;</span>
                                </div>
                                <div className="card-backdrop" style={{ background: product.bgColor }} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
        .bento-section {
          padding: 8rem 0;
          background: #ffffff;
        }

        .bento-section.highlight-bg {
          background: #f9f9fa;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-header {
          margin-bottom: 4rem;
          max-width: 800px;
        }

        .ramp-heading {
          font-size: 3.5rem;
          line-height: 1.1;
          font-weight: 500;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          color: #111;
        }

        .ramp-subheading {
          font-size: 1.5rem;
          line-height: 1.5;
          color: #666;
          max-width: 600px;
        }

        /* GRID LAYOUTS */
        .bento-grid {
          display: grid;
          gap: 1.5rem;
        }

        .stages-grid {
             grid-template-columns: repeat(3, 1fr);
             height: 600px; /* Fixed height for the row */
        }

        /* STAGE CARD (New Design) - Use :global to target Link component */
        :global(.stage-card) {
            position: relative;
            border-radius: 24px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: #fff;
            text-decoration: none;
            cursor: pointer;
            width: 100%;
            height: 100%;
            background-color: #111; /* Fallback color */
        }

        /* BACKGROUNDS */
        :global(.stage-card) .card-bg {
            position: absolute;
            inset: 0;
            z-index: 0;
        }

        /* Target the bg-image div */
        :global(.stage-card) .bg-image {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        :global(.stage-card):hover .bg-image {
            transform: scale(1.05);
        }

        :global(.stage-card) .bg-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6));
            transition: background 0.4s ease;
            z-index: 1; /* Above image */
        }
        
        :global(.stage-card):hover .bg-overlay {
            background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.85));
        }

        /* CONTENT */
        .card-top {
            position: relative;
            z-index: 2;
            padding: 2rem;
            display: flex;
            justify-content: flex-start;
        }

        .product-title {
            font-size: 1.25rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: rgba(255,255,255,0.9);
        }

        .card-content-bottom {
            position: relative;
            z-index: 2;
            padding: 2rem;
            min-height: 180px; /* Space for hover content */
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        /* Norm Content (Visible Initially) */
        .norm-content {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        :global(.stage-card):hover .norm-content {
            opacity: 0;
            transform: translateY(20px);
            position: absolute; 
            pointer-events: none;
        }

        .age-badge {
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(4px);
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-weight: 600;
            font-size: 0.9rem;
            letter-spacing: 0.02em;
            text-transform: uppercase;
        }

        /* Hover Content (Hidden Initially) */
        .hover-content {
            position: absolute;
            bottom: 2rem;
            left: 2rem;
            right: 2rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
            transition-delay: 0.05s;
        }

        :global(.stage-card):hover .hover-content {
            opacity: 1;
            transform: translateY(0);
        }

        .hover-headline {
            font-size: 1.75rem;
            font-weight: 400;
            line-height: 1.1;
            margin-bottom: 1rem;
            color: #fff;
        }

        .hover-divider {
            width: 40px;
            height: 2px;
            background: #fff;
            margin-bottom: 1rem;
            opacity: 0.6;
        }

        .hover-sub {
            font-size: 1rem;
            line-height: 1.5;
            color: rgba(255,255,255,0.8);
            max-width: 100%;
        }


        /* OLD RESET SECTION STYLES (Keep existing) */
        .reset-grid {
            grid-template-columns: 1fr 1fr;
        }
        
        .bento-card {
            position: relative;
            background: #ffffff;
            border-radius: 32px;
            overflow: hidden;
            text-decoration: none;
            color: inherit;
            transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
            border: 1px solid rgba(0,0,0,0.04);
            display: flex;
            flex-direction: column;
        }

        .reset-card {
             min-height: 350px;
             background: white;
        }

        .bento-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.08); 
            z-index: 2;
        }

        .card-content {
            position: relative;
            z-index: 2;
            padding: 2.5rem;   
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        .card-label {
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 0.75rem;
            font-weight: 700;
            color: #888;
            margin-bottom: 1rem;
            display: block;
        }
        
        .bento-card h3 {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 1rem;
            line-height: 1.1;
        }

        .bento-card p {
            font-size: 1.125rem;
            line-height: 1.5;
            color: #555;
            flex-grow: 1;
        }

        .link-arrow {
            display: inline-block;
            margin-top: 2rem;
            font-weight: 600;
            font-size: 1rem;
            color: #111;
        }

        .card-backdrop {
            position: absolute;
            bottom: 0; right: 0; width: 60%; height: 60%;
            border-top-left-radius: 100%;
            opacity: 0.5;
            filter: blur(40px);
            z-index: 0;
        }

        @media (max-width: 1024px) {
            .stages-grid, .reset-grid {
                grid-template-columns: 1fr;
                height: auto;
            }
            :global(.stage-card) {
                height: 400px; /* Taller on mobile to show image */
            }
            .ramp-heading {
                font-size: 2.5rem;
            }
        }
      `}</style>
        </>
    );
}
