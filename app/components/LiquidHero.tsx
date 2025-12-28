'use client';

import React, { useEffect, useState } from 'react';
import { IconChevronLeft, IconChevronRight, IconArrowRight, IconShoppingBag, IconLeaf } from '@tabler/icons-react';
import styles from './LiquidHero.module.css';

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

// Data mapping for specific slides
const SLIDE_CONTENT = [
    {
        id: 0,
        title: "KidGrow",
        subtitle: "STAGES",
        description: "Packed with essential vitamins for growing bodies. A delicious blend of banana, orange, pear, and grapes to fuel their play.",
        ingredients: ["Banana", "Orange", "Pear", "Grapes"],
        themeColor: "#D67030"
    },
    {
        id: 1,
        title: "KidRise",
        subtitle: "STAGES",
        description: "The perfect morning kickstart. Apple, carrot, and lemon combine for a zesty immunity boost that tastes like sunshine.",
        ingredients: ["Apple", "Carrot", "Lemon", "Banana"],
        themeColor: "#C89010"
    },
    {
        id: 2,
        title: "TeenFocus",
        subtitle: "STAGES",
        description: "Stay sharp and focused. A green power blend of kale, spinach, and apple designed to support mental clarity.",
        ingredients: ["Kale", "Spinach", "Apple", "Lemon"],
        themeColor: "#4A9C8C"
    }
];

export default function LiquidHero({ backgrounds, activeIndex, onSlideChange, onNext, onPrev }: LiquidHeroProps) {
    const [isPaused, setIsPaused] = useState(false);

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
                        <h1 className={styles.staticTitle}>
                            Designed nutrition for everyday balance.
                        </h1>
                        <p className={styles.staticSubtitle}>
                            Naturally powerful, perfectly balanced.
                        </p>
                    </div>

                    {/* Dynamic Slides Stack */}
                    <div className={styles.dynamicStack}>
                        {SLIDE_CONTENT.map((slide, index) => {
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
                                        <span className={styles.naturalTag}>
                                            <IconLeaf size={14} /> 100% Natural
                                        </span>
                                    </div>

                                    <h1 className={`${styles.mainTitle} ${styles.animItem} ${styles.delay2}`}>
                                        <span className={styles.titleLine} style={{ color: slide.themeColor }}>
                                            {slide.title}
                                        </span>
                                    </h1>

                                    <div className={`${styles.ingredients} ${styles.animItem} ${styles.delay4}`}>
                                        {slide.ingredients.map((ing, i) => (
                                            <span key={i} className={styles.ingredientPill}>
                                                {ing}
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
