'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './StagesCarousel.module.css';

interface StageProduct {
    id: string;
    title: string;
    age: string;
    range: string;
    desc: string;
    fullDesc: string;
    href: string;
    productImage: string;
    lifestyleImage: string;
    ingredients: string[];
    accentColor: string;
    patternColor: string;
}

const stagesProducts: StageProduct[] = [
    {
        id: 'kidgrow',
        title: 'KidGrow',
        age: '4–7',
        range: 'Years',
        desc: 'Optimized nutrition for early growth stages.',
        fullDesc: 'Designed to fit naturally into everyday routines, supporting early development with essential nutrients.',
        href: '/stages/kidgrow',
        productImage: '/main/stages/kid-grow.png',
        lifestyleImage: '/main/stages/kid-grow-glass.png',
        ingredients: ['Grape', 'Orange', 'Peach', 'Banana', 'Orange Peel'],
        accentColor: '#D67030',
        patternColor: '#E8A06A'
    },
    {
        id: 'kidrise',
        title: 'KidRise',
        age: '8–12',
        range: 'Years',
        desc: 'Supporting consistency throughout school days.',
        fullDesc: 'Optimized for learning and active routines, providing sustained energy without the crash.',
        href: '/stages/kidrise',
        productImage: '/main/stages/kid-rise.png',
        lifestyleImage: '/main/stages/kid-rise-glass.png',
        ingredients: ['Apple', 'Banana', 'Carrot', 'Lemon', 'Orange Peel'],
        accentColor: '#C89010',
        patternColor: '#E0B850'
    },
    {
        id: 'teenfocus',
        title: 'TeenFocus',
        age: '13–16',
        range: 'Years',
        desc: 'Designed for mentally demanding school years.',
        fullDesc: 'Focus-intensive formula that helps teenagers stay sharp and balanced during stressful periods.',
        href: '/stages/teenfocus',
        productImage: '/main/stages/teen-focus.png',
        lifestyleImage: '/main/stages/teen-focus-glass.png',
        ingredients: ['Strawberry', 'Grape', 'Kiwi', 'Lemon', 'Banana', 'Flaxseed'],
        accentColor: '#4A9C8C',
        patternColor: '#7CBFB2'
    }
];

export default function StagesCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');

    const goToNext = useCallback(() => {
        if (isAnimating) return;
        setDirection('next');
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % stagesProducts.length);
            setIsAnimating(false);
        }, 600);
    }, [isAnimating]);

    const goToPrev = useCallback(() => {
        if (isAnimating) return;
        setDirection('prev');
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev - 1 + stagesProducts.length) % stagesProducts.length);
            setIsAnimating(false);
        }, 600);
    }, [isAnimating]);

    const goToSlide = useCallback((index: number) => {
        if (isAnimating || index === activeIndex) return;
        setDirection(index > activeIndex ? 'next' : 'prev');
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex(index);
            setIsAnimating(false);
        }, 600);
    }, [isAnimating, activeIndex]);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, [isPaused, goToNext]);

    const currentProduct = stagesProducts[activeIndex];
    const animClass = isAnimating
        ? direction === 'next' ? styles.animateOut : styles.animateOutReverse
        : styles.animateIn;

    return (
        <section
            id="stages-section"
            className={styles.stagesSection}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
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
                                    <span className={styles.ageLabel}>{currentProduct.age}</span>
                                    <span className={styles.rangeLabel}>{currentProduct.range}</span>
                                </div>
                            </div>

                            {/* Ingredients Box */}
                            <div
                                className={`${styles.ingredientsBox} ${animClass}`}
                                style={{
                                    '--accent-color': currentProduct.accentColor
                                } as React.CSSProperties}
                            >
                                <div className={styles.ingredientsHeader}>
                                    <span className={styles.ingredientsLabel}>Ingredients</span>
                                </div>
                                <ul className={styles.ingredientsList}>
                                    {currentProduct.ingredients.map((ingredient, idx) => (
                                        <li key={idx} className={styles.ingredientItem}>
                                            <span className={styles.ingredientDot} />
                                            {ingredient}
                                        </li>
                                    ))}
                                </ul>
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
