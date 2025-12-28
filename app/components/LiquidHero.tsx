'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LiquidHero.module.css';

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

// Background enters from LEFT, exits to LEFT (opposite of product)
const backgroundVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '-100%' : '100%', // Enter from left when going forward
        opacity: 0,
        scale: 1.05,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    },
    exit: (direction: number) => ({
        x: direction < 0 ? '-100%' : '100%', // Exit to left when going forward
        opacity: 0,
        scale: 1.05,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    })
};

// Product enters from RIGHT, exits to RIGHT (opposite of background)
const productVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%', // Enter from right when going forward
        opacity: 0,
        scale: 0.9,
        rotate: direction > 0 ? 5 : -5,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
            delay: 0.1 // Slight delay for staggered effect
        }
    },
    exit: (direction: number) => ({
        x: direction < 0 ? '100%' : '-100%', // Exit to right when going forward
        opacity: 0,
        scale: 0.9,
        rotate: direction < 0 ? 5 : -5,
        transition: {
            duration: 0.6,
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
        <div className={styles.liquidHeroContainer}>
            {/* Mobile Static Background - Only visible on mobile */}
            <div className={styles.mobileBackground}>
                <img
                    src="/hero/v3/general-9-16-background.png"
                    alt=""
                    className={styles.backgroundImage}
                />
            </div>

            {/* Animated Background Slider - Hidden on mobile */}
            <div className={styles.backgroundSlider}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={`bg-${activeIndex}`}
                        custom={direction}
                        variants={backgroundVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className={styles.backgroundSlide}
                    >
                        <img
                            src={backgrounds[activeIndex]}
                            alt=""
                            className={styles.backgroundImage}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className={styles.heroGradientOverlay} />

            <motion.div
                className={styles.accentGlow}
                animate={{
                    background: `radial-gradient(circle at 50% 50%, ${currentSlide.accentGlow} 0%, transparent 60%)`
                }}
                transition={{ duration: 0.8 }}
            />

            {/* Product Carousel - Only render if products exist */}
            {products && products.length > 0 && (
                <div className={styles.productCarouselContainer}>
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={`product-${activeIndex}`}
                            custom={direction}
                            variants={productVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className={styles.carouselItem}
                        >
                            <div className={styles.productImageWrapper}>
                                <motion.img
                                    src={products[activeIndex]}
                                    alt={currentSlide.tag}
                                    className={styles.productImage}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            <div className={styles.particlesContainer}>
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={styles.particle}
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
            <div className={`${styles.contentLayer} ${styles.staticContent}`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className={styles.heroTitle}>
                        Designed nutrition<br />for everyday balance.
                    </h1>
                    <p className={styles.heroSubtitle}>Naturally powerful, perfectly balanced.</p>

                    <motion.a
                        href="/approach"
                        className={styles.heroCta}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore our approach &rarr;
                    </motion.a>
                </motion.div>
            </div>

            {/* Arrow Navigation */}
            <div className={styles.heroArrows}>
                <button className={`${styles.arrowBtn} ${styles.prevBtn}`} onClick={onPrev} aria-label="Previous slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className={`${styles.arrowBtn} ${styles.nextBtn}`} onClick={onNext} aria-label="Next slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Navigation Elements */}
            <div className={styles.productList}>
                {slideData.map((slide, index) => (
                    <motion.button
                        key={slide.id}
                        className={`${styles.productListItem} ${index === activeIndex ? styles.active : ''}`}
                        onClick={() => onSlideChange?.(index)}
                    >
                        <motion.span
                            className={styles.listIndicator}
                            animate={{
                                width: index === activeIndex ? 24 : 6,
                                backgroundColor: index === activeIndex ? slide.tagColor : 'rgba(255,255,255,0.3)'
                            }}
                        />
                        {slide.tag}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
