'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './StagesCarousel.module.css';

interface StageProduct {
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

const stagesProducts: StageProduct[] = [
    {
        id: 'kidgrow',
        title: 'KidGrow',
        tagline: 'Designed for early growth stages, suitable for all ages.',
        desc: 'Optimized nutrition for early growth stages.',
        fullDesc: 'Designed to fit naturally into everyday routines, supporting early development with essential nutrients.',
        href: '/stages/kidgrow',
        productImage: '/main/stages/kid-grow.png',
        lifestyleImage: '/main/stages/kid-grow-glass.png',
        whyBlend: [
            "During early growth stages, the body requires a variety of nutritional building blocks as part of normal development.",
            "Many of these components are naturally present in fruits and vegetables commonly included in balanced diets.",
            "KidGrow is designed by identifying these everyday needs first, then selecting plant-based ingredients where they naturally occur — combined into a blend that fits easily into daily routines."
        ],
        accentColor: '#D67030',
        patternColor: '#E8A06A'
    },
    {
        id: 'kidrise',
        title: 'KidRise',
        tagline: 'Designed for school-age routines, suitable for all ages.',
        desc: 'Supporting consistency throughout school days.',
        fullDesc: 'Optimized for learning and active routines, providing sustained energy without the crash.',
        href: '/stages/kidrise',
        productImage: '/main/stages/kid-rise.png',
        lifestyleImage: '/main/stages/kid-rise-glass.png',
        whyBlend: [
            "School-age years come with changing routines and increasing cognitive and physical demands.",
            "A balanced diet during this stage typically includes a range of plant-based foods that naturally contain essential nutritional components.",
            "KidRise is designed by mapping these stage-specific needs first, then blending selected fruits and vegetables into a formulation that supports everyday consistency."
        ],
        accentColor: '#C89010',
        patternColor: '#E0B850'
    },
    {
        id: 'teenfocus',
        title: 'TeenFocus',
        tagline: 'Designed for focus-intensive teenage stages.',
        desc: 'Designed for mentally demanding school years.',
        fullDesc: 'Focus-intensive formula that helps teenagers stay sharp and balanced during stressful periods.',
        href: '/stages/teenfocus',
        productImage: '/main/stages/teen-focus.png',
        lifestyleImage: '/main/stages/teen-focus-glass.png',
        whyBlend: [
            "As school routines become more demanding, maintaining everyday focus plays a bigger role in daily life.",
            "During early teenage years, nutritional needs naturally evolve alongside learning and active routines.",
            "TeenFocus is designed around these changing needs, using plant-based ingredients where essential nutritional components naturally occur — combined into a blend that fits easily into daily routines."
        ],
        accentColor: '#4A9C8C',
        patternColor: '#7CBFB2'
    }
];

export default function StagesCarousel() {
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
            setActiveIndex((prev) => (prev + 1) % stagesProducts.length);
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
            setActiveIndex((prev) => (prev - 1 + stagesProducts.length) % stagesProducts.length);
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
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, [isPaused, goToNext]);

    const currentProduct = stagesProducts[activeIndex];

    // Determine animation class based on phase
    let animClass = '';
    if (animationPhase === 'out') {
        animClass = direction === 'next' ? styles.animateOut : styles.animateOutReverse;
    } else if (animationPhase === 'in') {
        animClass = styles.animateIn;
    }


    return (
        <section
            id="stages-section"
            className={styles.stagesSection}
        >
            <div className={styles.container}>
                {/* Section Header */}
                <div className={styles.sectionHeader}>
                    <h2 className={styles.heading}>
                        Nutrition designed for<br />the stages of life.
                    </h2>
                    <p className={styles.subheading}>
                        As the body's needs shift across different stages of life, nutrition should adapt accordingly.
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
                                        <pattern id="organicPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                                            <path
                                                d="M40 0C20 10 10 30 10 50C10 70 20 90 40 80C60 70 70 50 70 30C70 10 60 0 40 0Z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                opacity="0.3"
                                            />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#organicPattern)" />
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
                        {stagesProducts.map((_, idx) => (
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
                                        backgroundColor: idx === activeIndex ? stagesProducts[idx].accentColor : undefined
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
