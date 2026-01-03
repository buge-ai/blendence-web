'use client';

import React, { useEffect, useState } from 'react';
import { IconChevronLeft, IconChevronRight, IconLeaf } from '@tabler/icons-react';
import styles from './LiquidHero.module.css';
import { useLanguage } from '@/lib/LanguageContext';

const AUTO_PLAY_INTERVAL = 6000;

interface LiquidHeroProps {
    backgrounds: string[];
    products?: string[];
    activeIndex: number;
    direction?: number;
    onSlideChange?: (index: number) => void;
    onNext?: () => void;
    onPrev?: () => void;
}

// Theme colors for each slide
const SLIDE_COLORS = [
    "#D67030", // KidGrow
    "#C89010", // KidRise
    "#4A9C8C"  // TeenFocus
];

export default function LiquidHero({ backgrounds, activeIndex, onSlideChange, onNext, onPrev }: LiquidHeroProps) {
    const [isPaused, setIsPaused] = useState(false);
    const { t } = useLanguage();

    // Get slide content from translations
    const slideKeys = ['kidgrow', 'kidrise', 'teenfocus'] as const;
    const slides = slideKeys.map((key, index) => ({
        id: index,
        title: t.mainPage.hero.slides[key].title,
        subtitle: t.mainPage.hero.slides[key].subtitle,
        description: t.mainPage.hero.slides[key].description,
        badges: t.mainPage.hero.slides[key].badges,
        themeColor: SLIDE_COLORS[index]
    }));

    // Auto-play Logic
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            if (onNext) onNext();
        }, AUTO_PLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [isPaused, onNext]);

    return (
        <div
            className={styles.liquidHeroContainer}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* 1. Morph Image Layer (Backgrounds) */}
            <div className={styles.morphLayer}>
                {backgrounds.map((bg, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div
                            key={`bg-${index}`}
                            className={`${styles.morphSlide} ${isActive ? styles.morphSlideActive : styles.morphSlideInactive}`}
                        >
                            <div className={styles.imageWrapper}>
                                <img
                                    src={bg}
                                    alt={`Slide ${index}`}
                                    className={styles.heroImage}
                                />
                                <div className={styles.gradientOverlay} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 2. Content Layout (Static + Dynamic) */}
            <div className={styles.layoutWrapper}>
                <div className={styles.contentStack}>

                    {/* Static Title Block */}
                    <div className={styles.staticBlock}>
                        <h2 className={styles.staticTitle}>
                            {t.mainPage.hero.staticTitle}
                        </h2>
                        <p className={styles.staticSubtitle}>
                            {t.mainPage.hero.staticSubtitle}
                        </p>
                    </div>

                    {/* Dynamic Slides Stack */}
                    <div className={styles.dynamicStack}>
                        {slides.map((slide, index) => {
                            const isActive = index === activeIndex;
                            // Ensure we only render if background exists (safety)
                            if (index >= backgrounds.length) return null;

                            return (
                                <div
                                    key={slide.id}
                                    className={`${styles.slideItem} ${isActive ? styles.slideItemActive : ''} ${isActive ? styles.animVisible : ''}`}
                                >
                                    <div className={`${styles.badgeWrapper} ${styles.animItem} ${styles.delay1}`}>
                                        <span className={styles.badge} style={{ color: slide.themeColor }}>
                                            {slide.subtitle}
                                        </span>
                                    </div>

                                    <h3 className={`${styles.mainTitle} ${styles.animItem} ${styles.delay2}`}>
                                        <span className={styles.titleLine} style={{ color: slide.themeColor }}>
                                            {slide.title}
                                        </span>
                                    </h3>

                                    <div className={`${styles.ingredients} ${styles.animItem} ${styles.delay4}`}>
                                        {slide.badges.map((badge, i) => (
                                            <span key={i} className={styles.ingredientPill}>
                                                <IconLeaf size={14} /> {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* 3. Navigation Controls */}
            <div className={styles.navContainer}>
                {/* Dots / Indicators */}
                <div className={styles.navInner}>
                    {backgrounds.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => onSlideChange?.(idx)}
                            className={`${styles.indicator} ${idx === activeIndex ? styles.indicatorActive : styles.indicatorInactive}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Arrows */}
                <div className={styles.navArrows}>
                    <button className={styles.arrowBtn} onClick={onPrev} aria-label="Previous slide">
                        <IconChevronLeft size={24} />
                    </button>
                    <button className={styles.arrowBtn} onClick={onNext} aria-label="Next slide">
                        <IconChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
