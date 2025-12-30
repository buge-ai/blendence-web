'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ResetSpotlight.module.css';

interface ResetProduct {
    id: string;
    title: string;
    tagline: string;
    desc: string;
    fullDesc: string;
    href: string;
    productImage: string;
    lifestyleImage: string;
    whyBlend: string[];
    accentColor: string;
    patternColor: string;
}

const resetProducts: ResetProduct[] = [
    {
        id: 'balance',
        title: 'Reset Balance',
        tagline: 'Everyday — Designed for ongoing routines',
        desc: 'Supporting lightness and balance.',
        fullDesc: 'Designed for periods when daily routines continue, but a lighter, more balanced option feels more appropriate.',
        href: '/reset/balance',
        productImage: '/product/product-1.png',
        lifestyleImage: '/main/reset/reset-balance-glass.png',
        whyBlend: [
            "Reset Balance focuses on continuity, not intensity.",
            "It is designed for moments when you want to support balance and digestive lightness without disrupting your everyday flow.",
            "Rather than adding more, Reset Balance is about reducing unnecessary load — supporting fluid balance, digestive-friendly routines, and satiety between meals."
        ],
        accentColor: '#8B9A6B', // Sage green
        patternColor: '#A8B88D'
    },
    {
        id: 'intense',
        title: 'Reset Intense',
        tagline: 'Targeted — Designed for focused moments',
        desc: 'A more pronounced sense of lightness.',
        fullDesc: 'Designed for periods when everyday balance feels harder to maintain and a more concentrated approach becomes relevant.',
        href: '/reset/intense',
        productImage: '/product/product-1.png',
        lifestyleImage: '/main/reset/reset-intense-glass.png',
        whyBlend: [
            "Reset Intense focuses on intensity of formulation, not intensity of use.",
            "It is designed for moments when you want to support digestive lightness and balance in a shorter, more focused way.",
            "Intended for intermittent use, rather than continuous routines — practical for specific moments when a stronger sense of lightness is preferred."
        ],
        accentColor: '#7A8B65', // Soft olive
        patternColor: '#96A67E'
    }
];

export default function ResetSpotlight() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [animationPhase, setAnimationPhase] = useState<'idle' | 'out' | 'in'>('idle');
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const animationPhaseRef = React.useRef(animationPhase);

    // Keep ref in sync with state
    React.useEffect(() => {
        animationPhaseRef.current = animationPhase;
    }, [animationPhase]);

    const goToNext = useCallback(() => {
        if (animationPhaseRef.current !== 'idle') return;
        setDirection('next');
        setAnimationPhase('out');

        // Swap content at midpoint when boxes are rotated away
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % resetProducts.length);
            setAnimationPhase('in');
        }, 350);

        // Animation complete
        setTimeout(() => {
            setAnimationPhase('idle');
        }, 700);
    }, []);

    const goToPrev = useCallback(() => {
        if (animationPhaseRef.current !== 'idle') return;
        setDirection('prev');
        setAnimationPhase('out');

        // Swap content at midpoint when boxes are rotated away
        setTimeout(() => {
            setActiveIndex((prev) => (prev - 1 + resetProducts.length) % resetProducts.length);
            setAnimationPhase('in');
        }, 350);

        // Animation complete
        setTimeout(() => {
            setAnimationPhase('idle');
        }, 700);
    }, []);

    const goToSlide = useCallback((index: number) => {
        if (animationPhaseRef.current !== 'idle') return;
        setActiveIndex((currentActiveIndex) => {
            if (index === currentActiveIndex) return currentActiveIndex;
            setDirection(index > currentActiveIndex ? 'next' : 'prev');
            setAnimationPhase('out');

            // Swap content at midpoint when boxes are rotated away
            setTimeout(() => {
                setActiveIndex(index);
                setAnimationPhase('in');
            }, 350);

            // Animation complete
            setTimeout(() => {
                setAnimationPhase('idle');
            }, 700);

            return currentActiveIndex; // Don't change yet, let the timeout do it
        });
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(goToNext, 6000);
        return () => clearInterval(interval);
    }, [isPaused, goToNext]);

    const currentProduct = resetProducts[activeIndex];

    // Determine animation class based on phase
    let animClass = '';
    if (animationPhase === 'out') {
        animClass = direction === 'next' ? styles.animateOut : styles.animateOutReverse;
    } else if (animationPhase === 'in') {
        animClass = styles.animateIn;
    }


    return (
        <section
            id="reset-section"
            className={styles.resetSection}
        >
            <div className={styles.container}>
                {/* Section Header */}
                <div className={styles.sectionHeader}>
                    <h2 className={styles.heading}>
                        Moments of<br />balance.
                    </h2>
                    <p className={styles.subheading}>
                        Reset is designed for moments when the body feels heavier than usual. Its plant-based, fiber-supported formulation is designed to support digestive lightness and a sense of balance.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className={styles.bentoGrid}>
                    {/* Left Column */}
                    <div className={styles.leftColumn}>
                        {/* Top Left - Title Box */}
                        <div
                            className={`${styles.titleBox} ${animClass}`}
                            style={{
                                '--accent-color': currentProduct.accentColor,
                                '--pattern-color': currentProduct.patternColor
                            } as React.CSSProperties}
                        >
                            <div className={styles.patternBg}>
                                <svg viewBox="0 0 400 200" className={styles.patternSvg}>
                                    <defs>
                                        <pattern id="resetOrganicPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                                            <path
                                                d="M40 0C20 10 10 30 10 50C10 70 20 90 40 80C60 70 70 50 70 30C70 10 60 0 40 0Z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                opacity="0.3"
                                            />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#resetOrganicPattern)" />
                                </svg>
                            </div>
                            <div className={styles.titleContent}>
                                <Link href={currentProduct.href} className={styles.productLink}>
                                    <div className={styles.titleRow}>
                                        <h3 className={styles.productTitle}>{currentProduct.title}</h3>
                                        <span className={styles.trademark}>™</span>
                                    </div>
                                </Link>
                                <p className={styles.productDesc}>{currentProduct.desc}</p>
                                <p className={styles.productFullDesc}>{currentProduct.fullDesc}</p>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className={styles.bottomRow}>
                            {/* Product Image Box */}
                            <div
                                className={`${styles.productBox} ${animClass}`}
                                style={{
                                    '--accent-color': currentProduct.accentColor
                                } as React.CSSProperties}
                            >
                                <div className={styles.productImageWrapper}>
                                    <Image
                                        src={currentProduct.productImage}
                                        alt={currentProduct.title}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        sizes="(max-width: 768px) 100vw, 300px"
                                        priority
                                    />
                                </div>
                                <div className={styles.productInfo}>
                                    <span className={styles.taglineLabel}>{currentProduct.tagline}</span>
                                </div>
                            </div>

                            {/* Why This Blend Box */}
                            <div
                                className={`${styles.ingredientsBox} ${animClass}`}
                                style={{
                                    '--accent-color': currentProduct.accentColor
                                } as React.CSSProperties}
                            >
                                <div className={styles.ingredientsHeader}>
                                    <span className={styles.ingredientsLabel}>Why this blend</span>
                                </div>
                                <div className={styles.whyBlendContent}>
                                    {currentProduct.whyBlend.map((paragraph: string, idx: number) => (
                                        <p key={idx} className={styles.whyBlendParagraph}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                                <Link href={currentProduct.href} className={styles.learnMore}>
                                    Learn more →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Lifestyle Image (9:16) */}
                    <div className={`${styles.lifestyleBox} ${animClass}`}>
                        <div className={styles.lifestyleImageWrapper}>
                            <Image
                                src={currentProduct.lifestyleImage}
                                alt={`${currentProduct.title} lifestyle`}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 400px"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Carousel Controls */}
                <div className={styles.carouselControls}>
                    <button
                        className={styles.playBtn}
                        onClick={() => setIsPaused(!isPaused)}
                        aria-label={isPaused ? 'Play' : 'Pause'}
                    >
                        {isPaused ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                        )}
                    </button>

                    <div className={styles.progressBar}>
                        {resetProducts.map((_, idx) => (
                            <button
                                key={idx}
                                className={`${styles.progressSegment} ${idx === activeIndex ? styles.active : ''}`}
                                onClick={() => goToSlide(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            >
                                <span
                                    className={styles.progressFill}
                                    style={{
                                        animationPlayState: idx === activeIndex && !isPaused ? 'running' : 'paused',
                                        backgroundColor: idx === activeIndex ? resetProducts[idx].accentColor : undefined
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
