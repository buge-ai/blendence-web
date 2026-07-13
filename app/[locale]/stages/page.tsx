'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import WaveDivider from '@/app/components/WaveDivider';
import CategoryHeroMedia from '@/app/components/CategoryHeroMedia';
import { Reveal, Stagger, StaggerItem, WordReveal, ImageReveal, Parallax, EASE } from '@/lib/motion';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

interface Product {
    id: string;
    image: string;
    link: string;
    ageRange: string;
}

// Composed client renders — carton with its sachets standing beside it
const products: Product[] = [
    {
        id: 'kidgrow',
        image: '/images/boxes/kidgrow-box.png',
        link: '/stages/kidgrow',
        ageRange: '4-7',
    },
    {
        id: 'kidrise',
        image: '/images/boxes/kidrise-box.png',
        link: '/stages/kidrise',
        ageRange: '8-12',
    },
    {
        id: 'teenfocus',
        image: '/images/boxes/teenfocus-box.png',
        link: '/stages/teenfocus',
        ageRange: '13-16',
    },
];

export default function StagesCategoryPage() {
    const { t, language } = useLanguage();
    const reduce = useReducedMotion();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Auto-play carousel — paused on hover
    useEffect(() => {
        if (!isAutoPlaying || isHovered) return;
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % products.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, isHovered]);

    const pauseAutoplay = () => {
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        pauseAutoplay();
    };

    const goToPrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
        pauseAutoplay();
    };

    const goToNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % products.length);
        pauseAutoplay();
    };

    const slideVariants = {
        enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir > 0 ? 24 : -24 }),
        center: { opacity: 1, x: 0 },
        exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir > 0 ? -24 : 24 }),
    };

    const currentProduct = products[currentIndex];
    const getProductData = (id: string) => {
        switch (id) {
            case 'kidgrow':
                return t.productPages.kidgrow;
            case 'kidrise':
                return t.productPages.kidrise;
            case 'teenfocus':
                return t.productPages.teenfocus;
            default:
                return t.productPages.kidgrow;
        }
    };
    const productData = getProductData(currentProduct.id);
    const stageCards = t.products.stages.cards as Record<string, { lines: string[] }>;
    const cardLines = stageCards[currentProduct.id]?.lines ?? [];

    return (
        <div className="stages-page">
            <Navigation />

            <main>
                {/* Hero Section with Logo — living powder-dune field */}
                <section className="category-hero">
                    <CategoryHeroMedia
                        video="/videos/stages-hero.mp4"
                        poster="/images/main/stages-hero-poster.jpg"
                    />
                    <div className="container">
                        <Reveal>
                            <span className="eyebrow" style={{ '--eyebrow-accent': 'var(--stages-accent)' } as React.CSSProperties}>
                                {t.nav.products}
                            </span>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <div className="logo-wrapper">
                                <Image
                                    src={blob('logos/reset_stage_logo_stages_org_color.png')}
                                    alt="Stages Logo"
                                    width={320}
                                    height={120}
                                    className="category-logo"
                                    priority
                                />
                            </div>
                        </Reveal>
                        <WordReveal
                            as="h1"
                            className="font-display hero-title"
                            text={t.products.stages.tagline}
                            delay={0.12}
                        />
                        <Reveal delay={0.2}>
                            <p className="description">{t.products.stages.description}</p>
                        </Reveal>
                    </div>
                </section>

                {/* Product Carousel Section */}
                <section className="carousel-section">
                    <div className="container">
                        <Reveal>
                            <h2 className="section-title">{t.categoryPages.ourProducts}</h2>
                        </Reveal>

                        <div
                            className="carousel-wrapper"
                            ref={carouselRef}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <button
                                className="carousel-nav prev"
                                onClick={goToPrev}
                                aria-label="Previous product"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            <div className="carousel-content">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={currentIndex}
                                        className="product-display"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.55, ease: EASE }}
                                    >
                                        <Link href={`/${language}${currentProduct.link}`} className="product-image-link">
                                            <motion.div
                                                className="product-image-settle"
                                                initial={reduce ? false : { scale: 1.06 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.9, ease: EASE }}
                                            >
                                                <div className="product-image-container">
                                                    <Image
                                                        src={currentProduct.image}
                                                        alt={productData.title}
                                                        width={800}
                                                        height={556}
                                                        className="product-image"
                                                        priority
                                                    />
                                                </div>
                                            </motion.div>
                                        </Link>

                                        <div className="product-info">
                                            <div className="age-badge">
                                                <span className="age-label">{t.categoryPages.ages}</span>
                                                <span className="age-range">{currentProduct.ageRange}</span>
                                            </div>
                                            <span className="product-tag">{productData.tag}</span>
                                            <h3 className="product-title">{productData.title}</h3>
                                            <ul className="product-points">
                                                {cardLines.map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                            <Link
                                                href={`/${language}${currentProduct.link}`}
                                                className="product-cta"
                                            >
                                                {t.categoryPages.viewDetails}
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <button
                                className="carousel-nav next"
                                onClick={goToNext}
                                aria-label="Next product"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>

                        {/* Pill indicators */}
                        <div className="carousel-dots">
                            {products.map((product, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to ${product.id}`}
                                >
                                    {index === currentIndex && (
                                        <motion.span
                                            className="dot-fill"
                                            key={currentIndex}
                                            initial={{ scaleX: reduce ? 1 : 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 0.55, ease: EASE }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Age Stages Overview */}
                <section className="stages-overview">
                    <div className="container">
                        <Reveal>
                            <span className="eyebrow overview-eyebrow" style={{ '--eyebrow-accent': 'var(--stages-accent)' } as React.CSSProperties}>
                                {t.categoryPages.lifeStages}
                            </span>
                        </Reveal>
                        <WordReveal
                            as="h2"
                            className="overview-title"
                            text={t.categoryPages.specializedNutrition}
                            delay={0.08}
                        />

                        <Stagger className="stages-grid" delay={0.1}>
                            <StaggerItem>
                                <div className="stage-card" onClick={() => goToSlide(0)}>
                                    <div className="stage-icon">
                                        <Image src="/images/stages/stage-sprout.png" alt="" width={72} height={72} className="stage-icon-img" />
                                    </div>
                                    <div className="stage-age">4-7</div>
                                    <h3>{t.categoryPages.earlyGrowth}</h3>
                                    <p>{t.categoryPages.earlyGrowthDesc}</p>
                                </div>
                            </StaggerItem>

                            <StaggerItem>
                                <div className="stage-card" onClick={() => goToSlide(1)}>
                                    <div className="stage-icon">
                                        <Image src="/images/stages/stage-sapling.png" alt="" width={72} height={72} className="stage-icon-img" />
                                    </div>
                                    <div className="stage-age">8-12</div>
                                    <h3>{t.categoryPages.activeSchooling}</h3>
                                    <p>{t.categoryPages.activeSchoolingDesc}</p>
                                </div>
                            </StaggerItem>

                            <StaggerItem>
                                <div className="stage-card" onClick={() => goToSlide(2)}>
                                    <div className="stage-icon">
                                        <Image src="/images/stages/stage-branch.png" alt="" width={72} height={72} className="stage-icon-img" />
                                    </div>
                                    <div className="stage-age">13-16</div>
                                    <h3>{t.categoryPages.mentalFocus}</h3>
                                    <p>{t.categoryPages.mentalFocusDesc}</p>
                                </div>
                            </StaggerItem>
                        </Stagger>
                    </div>
                </section>

                <WaveDivider tone="stages" />

                {/* Philosophy Section — editorial close */}
                <section className="philosophy-section">
                    <div className="container">
                        <div className="philosophy-grid">
                            <Parallax distance={20} className="philosophy-media">
                                <ImageReveal className="philosophy-frame">
                                    <div className="philosophy-img philosophy-img-stages" />
                                </ImageReveal>
                            </Parallax>
                            <div className="philosophy-content">
                                <Reveal>
                                    <span className="eyebrow philosophy-eyebrow" style={{ '--eyebrow-accent': 'var(--stages-accent)' } as React.CSSProperties}>
                                        {t.categoryPages.philosophy}
                                    </span>
                                </Reveal>
                                <WordReveal
                                    as="h2"
                                    className="font-display philosophy-title"
                                    text={t.categoryPages.stagesPhilosophyTitle}
                                    delay={0.08}
                                />
                                <Reveal delay={0.16}>
                                    <p className="philosophy-desc">{t.categoryPages.stagesPhilosophyDesc}</p>
                                </Reveal>
                                <Reveal delay={0.24}>
                                    <Link href={`/${language}/approach`} className="btn-primary philosophy-cta">
                                        {t.common.learnMore}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .stages-page {
                    background: var(--surface);
                    color: var(--text-body);
                    min-height: 100vh;
                }

                .container {
                    max-width: var(--container);
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                /* Hero Section — media layer behind, content above */
                .category-hero {
                    position: relative;
                    isolation: isolate;
                    overflow: hidden;
                    padding: 11rem 0 6.5rem;
                    text-align: center;
                    background: linear-gradient(180deg, var(--stages-tint) 0%, var(--surface) 100%);
                }

                .category-hero .container {
                    position: relative;
                    z-index: 1;
                }

                .category-hero .eyebrow {
                    margin-bottom: 1.5rem;
                }

                .logo-wrapper {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 1.75rem;
                }

                .category-hero :global(.category-logo) {
                    height: auto;
                    max-width: 320px;
                }

                .category-hero :global(.hero-title) {
                    font-size: clamp(2.6rem, 5vw, 4.2rem);
                    margin-bottom: 1.5rem;
                }

                .description {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: var(--text-body);
                    max-width: 700px;
                    margin: 0 auto;
                }

                /* Carousel Section */
                .carousel-section {
                    padding: var(--section-pad) 0;
                    background: var(--surface);
                }

                .section-title {
                    text-align: center;
                    font-size: 2rem;
                    font-weight: 600;
                    color: var(--text-heading);
                    margin-bottom: 3rem;
                    letter-spacing: -0.02em;
                }

                .carousel-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    position: relative;
                }

                .carousel-nav {
                    width: 48px;
                    height: 48px;
                    border-radius: var(--radius-pill);
                    border: 1px solid var(--hairline);
                    background: var(--surface);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform var(--dur-fast) var(--ease),
                        background var(--dur-fast) var(--ease),
                        border-color var(--dur-fast) var(--ease),
                        color var(--dur-fast) var(--ease);
                    color: var(--text-muted);
                    flex-shrink: 0;
                }

                .carousel-nav:hover {
                    background: var(--stages-tint);
                    border-color: var(--stages-accent);
                    color: var(--stages-accent-deep);
                }

                .carousel-content {
                    flex: 1;
                    overflow: hidden;
                }

                .carousel-content :global(.product-display) {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                }

                .carousel-content :global(.product-image-link) {
                    text-decoration: none;
                }

                .product-image-container {
                    background: linear-gradient(160deg, var(--stages-tint) 0%, var(--surface) 100%);
                    border: 1px solid var(--hairline);
                    border-radius: var(--radius-lg);
                    padding: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: transform var(--dur-fast) var(--ease),
                        box-shadow var(--dur-fast) var(--ease);
                }

                .product-image-container:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lift);
                }

                .carousel-content :global(.product-image) {
                    max-width: 100%;
                    height: auto;
                    object-fit: contain;
                }

                .product-info {
                    padding: 1rem 0;
                }

                .age-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: var(--stages-accent);
                    color: #fff;
                    border-radius: var(--radius-pill);
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .age-label {
                    opacity: 0.9;
                    font-weight: 400;
                }

                .age-range {
                    font-weight: 700;
                }

                .product-tag {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: var(--stages-tint);
                    color: var(--stages-accent-deep);
                    border-radius: var(--radius-pill);
                    font-size: 0.85rem;
                    font-weight: 500;
                    margin-bottom: 1rem;
                    margin-left: 0.5rem;
                }

                .product-title {
                    font-size: 2.5rem;
                    font-weight: 600;
                    color: var(--text-heading);
                    margin-bottom: 1rem;
                    letter-spacing: -0.02em;
                }

                .product-subtitle {
                    font-size: 1.1rem;
                    color: var(--stages-accent-deep);
                    margin-bottom: 1rem;
                    font-weight: 500;
                }

                .product-description {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: var(--text-body);
                    margin-bottom: 2rem;
                }

                .product-points {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .product-points li {
                    position: relative;
                    padding-left: 1.4rem;
                    font-size: 1.02rem;
                    line-height: 1.6;
                    color: var(--text-body);
                }

                .product-points li::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0.62em;
                    width: 12px;
                    height: 2px;
                    border-radius: 2px;
                    background: var(--stages-accent);
                }

                .product-info :global(.product-cta) {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.85rem 1.75rem;
                    background: var(--stages-accent);
                    color: #fff;
                    text-decoration: none;
                    border-radius: var(--radius-pill);
                    font-weight: 600;
                    font-size: 0.9rem;
                    letter-spacing: 0.02em;
                    box-shadow: var(--shadow-soft);
                    transition: transform var(--dur-fast) var(--ease),
                        box-shadow var(--dur-fast) var(--ease),
                        background var(--dur-fast) var(--ease);
                }

                .product-info :global(.product-cta:hover) {
                    background: var(--stages-accent-deep);
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-lift);
                }

                .product-info :global(.product-cta svg) {
                    transition: transform var(--dur-fast) var(--ease);
                }

                .product-info :global(.product-cta:hover svg) {
                    transform: translateX(3px);
                }

                .carousel-dots {
                    display: flex;
                    justify-content: center;
                    gap: 0.6rem;
                    margin-top: 3rem;
                }

                .dot {
                    width: 30px;
                    height: 4px;
                    border-radius: var(--radius-pill);
                    border: none;
                    padding: 0;
                    background: var(--hairline);
                    cursor: pointer;
                    overflow: hidden;
                    transition: background var(--dur-fast) var(--ease);
                }

                .dot:hover:not(.active) {
                    background: rgba(16, 51, 61, 0.2);
                }

                .dot :global(.dot-fill) {
                    display: block;
                    width: 100%;
                    height: 100%;
                    background: var(--stages-accent);
                    border-radius: var(--radius-pill);
                    transform-origin: left center;
                }

                /* Stages Overview Section */
                .stages-overview {
                    padding: var(--section-pad) 0;
                    background: var(--stages-tint);
                    text-align: center;
                }

                .overview-eyebrow {
                    margin-bottom: 1rem;
                }

                .stages-overview :global(.overview-title) {
                    font-size: 2.25rem;
                    font-weight: 600;
                    color: var(--text-heading);
                    margin-bottom: 3rem;
                    letter-spacing: -0.02em;
                }

                .stages-overview :global(.stages-grid) {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .stage-card {
                    background: var(--surface);
                    border-radius: var(--radius-lg);
                    padding: 2.5rem 2rem;
                    text-align: center;
                    cursor: pointer;
                    height: 100%;
                    transition: transform var(--dur-fast) var(--ease),
                        box-shadow var(--dur-fast) var(--ease),
                        border-color var(--dur-fast) var(--ease);
                    border: 1px solid var(--hairline);
                }

                .stage-card:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lift);
                    border-color: var(--stages-accent);
                }

                .stage-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 96px;
                    height: 96px;
                    border-radius: var(--radius-pill);
                    background: var(--stages-tint);
                    margin-bottom: 1.25rem;
                }

                .stage-icon :global(.stage-icon-img) {
                    width: 72px;
                    height: 72px;
                    object-fit: contain;
                }

                .stage-age {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.35rem 1rem;
                    background: var(--stages-accent);
                    color: #fff;
                    border-radius: var(--radius-pill);
                    font-size: 0.95rem;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    margin-bottom: 1.25rem;
                }

                .stage-card h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--text-heading);
                    margin-bottom: 0.75rem;
                }

                .stage-card p {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: var(--text-body);
                }

                /* Philosophy Section — split editorial layout.
                   Parallax/ImageReveal are imported components, so their
                   classes are styled as :global() descendants of the
                   scoped .philosophy-grid parent. */
                .philosophy-section {
                    padding: var(--section-pad) 0;
                    background: var(--surface);
                }

                .philosophy-grid {
                    display: grid;
                    grid-template-columns: 5fr 6fr;
                    gap: clamp(2.5rem, 6vw, 5rem);
                    align-items: center;
                    max-width: 1080px;
                    margin: 0 auto;
                }

                .philosophy-grid :global(.philosophy-media) {
                    position: relative;
                }

                .philosophy-grid :global(.philosophy-frame) {
                    aspect-ratio: 4 / 5;
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-soft);
                    background: var(--stages-tint);
                }

                .philosophy-img {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                }

                .philosophy-img-stages {
                    background-image: url('/images/main/stages-philosophy.jpg');
                }

                .philosophy-content {
                    text-align: left;
                }

                .philosophy-eyebrow {
                    margin-bottom: 1.5rem;
                }

                .philosophy-content :global(.philosophy-title) {
                    font-size: clamp(2rem, 4vw, 2.75rem);
                    margin-bottom: 1.5rem;
                }

                .philosophy-desc {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: var(--text-body);
                    margin-bottom: 2.25rem;
                }

                @media (max-width: 900px) {
                    .carousel-content :global(.product-display) {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                        text-align: center;
                    }

                    .product-info {
                        order: 2;
                    }

                    .product-points {
                        text-align: left;
                        max-width: 22rem;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .carousel-nav {
                        display: none;
                    }

                    .stages-overview :global(.stages-grid) {
                        grid-template-columns: 1fr;
                        max-width: 400px;
                    }

                    .philosophy-grid {
                        grid-template-columns: 1fr;
                        gap: 2.5rem;
                    }

                    .philosophy-grid :global(.philosophy-media) {
                        max-width: 420px;
                        margin: 0 auto;
                        width: 100%;
                    }

                    .philosophy-content {
                        text-align: center;
                    }

                    .philosophy-content :global(.philosophy-cta) {
                        margin: 0 auto;
                    }
                }

                @media (max-width: 768px) {
                    .category-hero {
                        padding: 8rem 0 4rem;
                    }

                    .category-hero :global(.category-logo) {
                        max-width: 220px;
                    }

                    .description {
                        font-size: 1rem;
                    }

                    .section-title,
                    .stages-overview :global(.overview-title) {
                        font-size: 1.75rem;
                    }

                    .product-title {
                        font-size: 2rem;
                    }

                    .age-badge,
                    .product-tag {
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        width: fit-content;
                    }
                }
            `}</style>
        </div>
    );
}
