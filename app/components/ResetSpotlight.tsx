'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import styles from './ResetSpotlight.module.css';
import { Reveal, EASE } from '@/lib/motion';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

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
    accent: string;
    tint: string;
}

// Static product data — canonical product tokens (globals.css)
const PRODUCT_DATA = [
    {
        id: 'balance',
        productImage: '/images/boxes/reset-balance-box.png',
        lifestyleImage: '/images/glasses/reset-balance-glass-v2.jpg',
        accent: 'var(--balance)',
        tint: 'var(--balance-tint)'
    },
    {
        id: 'intense',
        productImage: '/images/boxes/reset-intense-box.png',
        lifestyleImage: '/images/glasses/reset-intense-glass-v2.jpg',
        accent: 'var(--intense)',
        tint: 'var(--intense-tint)'
    }
];

const AUTOPLAY_MS = 6000;

export default function ResetSpotlight() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const reduce = useReducedMotion();
    const { t, language } = useLanguage();

    // Combine static data with translations
    const productKeys = ['balance', 'intense'] as const;
    const resetProducts: ResetProduct[] = PRODUCT_DATA.map((product, index) => {
        const key = productKeys[index];
        const translations = t.mainPage.resetSpotlight.products[key];
        return {
            ...product,
            href: `/${language}/reset/${product.id}`,
            title: translations.title,
            tagline: translations.tagline,
            desc: translations.desc,
            fullDesc: translations.fullDesc,
            whyBlend: translations.whyBlend
        };
    });

    const goToNext = useCallback(() => {
        setDirection('next');
        setActiveIndex((prev) => (prev + 1) % PRODUCT_DATA.length);
    }, []);

    const goToSlide = useCallback((index: number) => {
        setActiveIndex((current) => {
            if (index === current) return current;
            setDirection(index > current ? 'next' : 'prev');
            return index;
        });
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(goToNext, AUTOPLAY_MS);
        return () => clearInterval(interval);
    }, [isPaused, goToNext]);

    const currentProduct = resetProducts[activeIndex];

    const slideVariants: Variants = reduce
        ? {
            enter: { opacity: 0 },
            center: { opacity: 1 },
            exit: { opacity: 0 },
        }
        : {
            enter: (dir: 'next' | 'prev') => ({ opacity: 0, x: dir === 'next' ? 24 : -24 }),
            center: { opacity: 1, x: 0 },
            exit: (dir: 'next' | 'prev') => ({ opacity: 0, x: dir === 'next' ? -24 : 24 }),
        };

    return (
        <section id="reset-section" className={styles.resetSection}>
            <div className={styles.container}>
                {/* Section Header */}
                <Reveal className={styles.sectionHeader}>
                    <div className={styles.logoWrapper}>
                        <Image
                            src={blob('logos/reset_stage_logo_reset_org_color.png')}
                            alt="Reset"
                            width={400}
                            height={140}
                            style={{ objectFit: 'contain', height: 'auto' }}
                        />
                    </div>
                    <p className={styles.subheading}>
                        {t.mainPage.resetSpotlight.subheading}
                    </p>
                </Reveal>

                {/* Bento Grid Layout */}
                <Reveal className={styles.bentoViewport} delay={0.1}>
                    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                        <motion.div
                            key={activeIndex}
                            className={styles.bentoGrid}
                            style={{
                                '--accent': currentProduct.accent,
                                '--tint': currentProduct.tint
                            } as React.CSSProperties}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: EASE }}
                        >
                            {/* Left Column */}
                            <div className={styles.leftColumn}>
                                {/* Top Left - Title Box */}
                                <div className={styles.titleBox}>
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
                                    <div className={styles.productBox}>
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
                                    <div className={styles.ingredientsBox}>
                                        <div className={styles.ingredientsHeader}>
                                            <span className={styles.ingredientsLabel}>{t.mainPage.resetSpotlight.whyBlendLabel}</span>
                                        </div>
                                        <div className={styles.whyBlendContent}>
                                            {currentProduct.whyBlend.map((paragraph: string, idx: number) => (
                                                <p key={idx} className={styles.whyBlendParagraph}>
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                        <Link href={currentProduct.href} className={styles.learnMore}>
                                            {t.mainPage.resetSpotlight.learnMore}
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Lifestyle Image */}
                            <div className={styles.lifestyleBox}>
                                <div className={styles.lifestyleImageWrapper}>
                                    <Image
                                        src={currentProduct.lifestyleImage}
                                        alt={`${currentProduct.title}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        priority
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </Reveal>

                {/* Carousel Controls */}
                <div className={styles.carouselControls}>
                    <button
                        className={styles.playBtn}
                        onClick={() => setIsPaused(!isPaused)}
                        aria-label={isPaused ? 'Play' : 'Pause'}
                    >
                        {isPaused ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                        )}
                    </button>

                    <div className={styles.progressBar}>
                        {resetProducts.map((product, idx) => (
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
                                        background: idx === activeIndex ? product.accent : undefined
                                    }}
                                />
                            </button>
                        ))}
                    </div>

                    <Link href={`/${language}${t.mainPage.resetSpotlight.ctaLink}`} className={`btn-primary ${styles.ctaButton}`}>
                        {t.mainPage.resetSpotlight.cta}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
