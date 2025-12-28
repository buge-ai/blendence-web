'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Product data for each slide
const slideData = [
    {
        id: 0,
        tag: 'KIDGROW',
        tagColor: '#7ED957',
        title: 'Foundation\nfor Growth',
        subtitle: 'Ages 4-7',
        description: 'Optimized nutrition for early growth stages — designed to fit naturally into everyday routines.',
        cta: 'Explore KidGrow',
        accentGlow: 'rgba(126, 217, 87, 0.4)'
    },
    {
        id: 1,
        tag: 'KIDRISE',
        tagColor: '#FFB347',
        title: 'Energy\nfor Learning',
        subtitle: 'Ages 8-12',
        description: 'Optimized nutrition for learning and active routines — supporting consistency throughout school days.',
        cta: 'Explore KidRise',
        accentGlow: 'rgba(255, 179, 71, 0.4)'
    },
    {
        id: 2,
        tag: 'TEENFOCUS',
        tagColor: '#87CEEB',
        title: 'Clarity\nfor Excellence',
        subtitle: 'Ages 13-16',
        description: 'Optimized nutrition for focus-intensive stages — designed for mentally demanding school years.',
        cta: 'Explore TeenFocus',
        accentGlow: 'rgba(135, 206, 235, 0.4)'
    }
];

// Product-specific variants (smaller scale effect)
// removed duplicate interface

// Background with fade + subtle warp/scale effect
const backgroundVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '-30%' : '30%', // Subtle movement from opposite side
        opacity: 0,
        scale: 1.1, // Slight zoom for warp effect
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    },
    exit: (direction: number) => ({
        x: direction < 0 ? '-30%' : '30%', // Subtle exit movement
        opacity: 0,
        scale: 1.1, // Zoom out effect
        transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    })
};

// Product-specific variants (smaller scale effect)
const productVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 0.85,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.55,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    },
    exit: (direction: number) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 0.85,
        transition: {
            duration: 0.55,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    })
};

interface LiquidHeroProps {
    backgrounds: string[];
    products?: string[];
    activeIndex: number;
    direction: number;
    onSlideChange?: (index: number) => void;
    onNext?: () => void;
    onPrev?: () => void;
}

export default function LiquidHero({ backgrounds, products, activeIndex, direction, onSlideChange, onNext, onPrev }: LiquidHeroProps) {
    const currentSlide = slideData[activeIndex] || slideData[0];

    return (
        <div className="liquid-hero-container">
            {/* Background Slider - Same animation as product */}
            <div className="background-slider">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={`bg-${activeIndex}`}
                        custom={direction}
                        variants={backgroundVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="background-slide"
                    >
                        <img
                            src={backgrounds[activeIndex]}
                            alt=""
                            className="background-image"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="hero-gradient-overlay" />

            <motion.div
                className="accent-glow"
                animate={{
                    background: `radial-gradient(circle at 50% 50%, ${currentSlide.accentGlow} 0%, transparent 60%)`
                }}
                transition={{ duration: 0.8 }}
            />

            {/* Product Carousel - Only render if products exist */}
            {products && products.length > 0 && (
                <div className="product-carousel-container">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={`product-${activeIndex}`}
                            custom={direction}
                            variants={productVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="carousel-item"
                        >
                            <div className="product-image-wrapper">
                                <motion.img
                                    src={products[activeIndex]}
                                    alt={currentSlide.tag}
                                    className="product-image"
                                    style={{
                                        maxWidth: '350px',
                                        maxHeight: '55vh',
                                        width: 'auto',
                                        height: 'auto',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            <div className="particles-container">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle"
                        animate={{
                            opacity: [0.2, 0.5, 0.2],
                            y: [-20, -100],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            width: `${2 + Math.random() * 3}px`,
                            height: `${2 + Math.random() * 3}px`,
                            backgroundColor: 'white'
                        }}
                    />
                ))}
            </div>

            {/* Content Layer - Static Brand Message */}
            <div className="content-layer static-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="hero-title">
                        Designed nutrition<br />for everyday balance.
                    </h1>
                    <p className="hero-subtitle">Naturally powerful, perfectly balanced.</p>

                    <motion.a
                        href="/v2/approach"
                        className="hero-cta"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore our approach &rarr;
                    </motion.a>
                </motion.div>
            </div>

            {/* Arrow Navigation */}
            <div className="hero-arrows">
                <button className="arrow-btn prev-btn" onClick={onPrev} aria-label="Previous slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="arrow-btn next-btn" onClick={onNext} aria-label="Next slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Navigation Elements */}
            <div className="product-list">
                {slideData.map((slide, index) => (
                    <motion.button
                        key={slide.id}
                        className={`product-list-item ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => onSlideChange?.(index)}
                    >
                        <motion.span
                            className="list-indicator"
                            animate={{
                                width: index === activeIndex ? 24 : 6,
                                backgroundColor: index === activeIndex ? slide.tagColor : 'rgba(255,255,255,0.3)'
                            }}
                        />
                        {/* Only show tag if active or hover? User said "just the images" for titles, but navigation might need labels. Keeping simple dots/lines might be cleaner if "just images" is strict. Let's keep labels for now as they are small navigation aids. */}
                        {slide.tag}
                    </motion.button>
                ))}
            </div>

            <style jsx>{`
                .liquid-hero-container {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    overflow: hidden;
                    background: #0a0a0f;
                }

                /* Background Slider */
                .background-slider {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                    overflow: hidden;
                }

                .background-slide {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                }

                .background-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .hero-gradient-overlay {
                    position: absolute; inset: 0; z-index: 2;
                    background: radial-gradient(circle at center, transparent 0%, rgba(10,10,15,0.4) 100%);
                    pointer-events: none;
                }
                .accent-glow { position: absolute; inset: 0; z-index: 3; pointer-events: none; opacity: 0.5; }

                .product-carousel-container {
                    position: absolute;
                    top: 55%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    pointer-events: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .carousel-item {
                    position: absolute;
                    width: auto;
                    height: auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .product-image-wrapper {
                    position: relative;
                    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
                    padding-bottom: 20px;
                }

                .product-image {
                    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.4));
                }

                .content-layer {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 8%;
                    z-index: 20;
                    width: 450px;
                    text-align: left;
                    pointer-events: none;
                }
                
                .content-layer > * {
                    pointer-events: auto;
                }

                .hero-title {
                    font-family: var(--font-display, sans-serif);
                    font-size: 3.5rem;
                    color: white;
                    line-height: 1.1;
                    margin: 0.5rem 0 1rem;
                    white-space: pre-line;
                }
                .hero-subtitle { color: rgba(255,255,255,0.9); font-size: 1.25rem; margin-bottom: 0.5rem; font-weight: 500; }
                .hero-description { color: rgba(255,255,255,0.7); font-size: 1rem; line-height: 1.6; margin-bottom: 2rem; }

                .hero-cta {
                    display: inline-block;
                    padding: 1rem 2rem;
                    background: white;
                    color: black;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.9rem;
                    letter-spacing: 0.05em;
                    transition: transform 0.2s;
                }

                .product-tag {
                    display: flex; align-items: center; gap: 0.8rem;
                    text-transform: uppercase; font-weight: 800; font-size: 0.9rem; letter-spacing: 0.25em;
                }
                .tag-dot { width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 10px currentColor; }

                .particles-container { position: absolute; inset: 0; z-index: 4; pointer-events: none; }
                .particle { position: absolute; border-radius: 50%; }

                .product-list {
                    position: absolute;
                    right: 4rem;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    z-index: 20;
                }
                .product-list-item {
                    background: none; border: none; color: rgba(255,255,255,0.3);
                    cursor: pointer; display: flex; align-items: center; gap: 1.2rem;
                    font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;
                    transition: all 0.4s ease;
                }
                .product-list-item:hover { color: rgba(255,255,255,0.6); }
                .product-list-item.active { color: white; transform: translateX(-10px) scale(1.05); }
                .list-indicator { height: 3px; border-radius: 4px; transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1); }

                @media (max-width: 1024px) {
                    .product-image { max-height: 45vh; max-width: 300px; }
                    .content-layer { bottom: 10%; width: 400px; }
                }

                .hero-arrows {
                    position: absolute;
                    bottom: 4rem;
                    right: 14rem; /* Positioned left of the product list */
                    display: flex;
                    gap: 1rem;
                    z-index: 25;
                }

                .arrow-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(0, 0, 0, 0.3);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                }

                .arrow-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.5);
                    transform: scale(1.1);
                }

                @media (max-width: 768px) {
                    .product-image { max-height: 35vh; max-width: 250px; }
                    .content-layer { bottom: 5%; left: 50%; transform: translateX(-50%); width: 90%; text-align: center; display: flex; flex-direction: column; align-items: center; }
                    .product-list { display: none; }
                    .product-carousel-container { top: 40%; }
                    
                    .hero-arrows {
                        bottom: 2rem;
                        right: 50%;
                        transform: translateX(50%);
                    }
                }
            `}</style>
        </div>
    );
}
