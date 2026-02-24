'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { IconChevronLeft, IconChevronRight, IconLeaf } from '@tabler/icons-react';
import styles from './LiquidHero.module.css';
import { useLanguage } from '@/lib/LanguageContext';

const AUTO_PLAY_INTERVAL = 5000;

interface LiquidHeroProps {
    backgrounds: string[];
    products?: string[];
    activeIndex: number;
    direction?: number;
    onSlideChange?: (index: number) => void;
    onNext?: () => void;
    onPrev?: () => void;
}

const SLIDE_COLORS = [
    "#D67030", // KidGrow
    "#C89010", // KidRise
    "#4A9C8C"  // TeenFocus
];

export default function LiquidHero({ backgrounds, activeIndex, onSlideChange, onNext, onPrev }: LiquidHeroProps) {
    const [isPaused, setIsPaused] = useState(false);
    const { t } = useLanguage();

    const slideKeys = ['kidgrow', 'kidrise', 'teenfocus'] as const;
    const slides = slideKeys.map((key, index) => ({
        id: index,
        title: t.mainPage.hero.slides[key].title,
        subtitle: t.mainPage.hero.slides[key].subtitle,
        description: t.mainPage.hero.slides[key].description,
        badges: t.mainPage.hero.slides[key].badges,
        themeColor: SLIDE_COLORS[index],
        bg: backgrounds[index],
    }));

    const handleNext = useCallback(() => {
        if (onNext) onNext();
    }, [onNext]);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(handleNext, AUTO_PLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [isPaused, handleNext]);

    return (
        <div
            className={styles.wrapper}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Track that slides horizontally */}
            <div className={styles.track}>
                <div
                    className={styles.trackInner}
                    style={{
                        '--active': activeIndex,
                    } as React.CSSProperties}
                >
                    {slides.map((slide, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div
                                key={slide.id}
                                className={`${styles.card} ${isActive ? styles.cardActive : styles.cardInactive}`}
                                onClick={() => !isActive && onSlideChange?.(index)}
                            >
                                {/* Background image */}
                                <img
                                    src={slide.bg}
                                    alt={slide.title}
                                    className={styles.cardImage}
                                />
                                <div className={styles.cardGradient} />

                                {/* Card content */}
                                <div className={styles.cardContent}>
                                    <span className={styles.badge} style={{ color: slide.themeColor }}>
                                        {slide.subtitle}
                                    </span>
                                    <h3 className={styles.cardTitle} style={{ color: slide.themeColor }}>
                                        {slide.title}
                                    </h3>
                                    <p className={styles.cardDesc}>{slide.description}</p>
                                    <div className={styles.badges}>
                                        {slide.badges.map((badge: string, i: number) => (
                                            <span key={i} className={styles.pill}>
                                                <IconLeaf size={13} /> {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation */}
            <div className={styles.nav}>
                <div className={styles.dots}>
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => onSlideChange?.(idx)}
                            className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ''}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
                <div className={styles.arrows}>
                    <button className={styles.arrowBtn} onClick={onPrev} aria-label="Previous">
                        <IconChevronLeft size={20} />
                    </button>
                    <button className={styles.arrowBtn} onClick={onNext} aria-label="Next">
                        <IconChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
