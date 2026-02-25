'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';

interface Product {
    id: string;
    image: string;
    link: string;
    ageRange: string;
}

const products: Product[] = [
    {
        id: 'kidgrow',
        image: blob('products/kid-grow.png'),
        link: '/stages/kidgrow',
        ageRange: '4-7',
    },
    {
        id: 'kidrise',
        image: blob('products/kid-rise.png'),
        link: '/stages/kidrise',
        ageRange: '8-12',
    },
    {
        id: 'teenfocus',
        image: blob('products/teen-focus.png'),
        link: '/stages/teenfocus',
        ageRange: '13-16',
    },
];

export default function StagesCategoryPage() {
    const { t, language } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
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

    return (
        <div className="stages-page">
            <Navigation />

            <main>
                {/* Hero Section with Logo */}
                <section className="category-hero">
                    <div className="container">
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
                        <p className="tagline">{t.products.stages.tagline}</p>
                        <p className="description">{t.products.stages.description}</p>
                    </div>
                </section>

                {/* Product Carousel Section */}
                <section className="carousel-section">
                    <div className="container">
                        <h2 className="section-title">
                            {t.categoryPages.ourProducts}
                        </h2>

                        <div className="carousel-wrapper" ref={carouselRef}>
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
                                <div className="product-display">
                                    <Link href={`/${language}${currentProduct.link}`} className="product-image-link">
                                        <div className="product-image-container">
                                            <Image
                                                src={currentProduct.image}
                                                alt={productData.title}
                                                width={350}
                                                height={500}
                                                className="product-image"
                                                priority
                                            />
                                        </div>
                                    </Link>

                                    <div className="product-info">
                                        <div className="age-badge">
                                            <span className="age-label">{t.categoryPages.ages}</span>
                                            <span className="age-range">{currentProduct.ageRange}</span>
                                        </div>
                                        <span className="product-tag">{productData.tag}</span>
                                        <h3 className="product-title">{productData.title}</h3>
                                        <p className="product-subtitle">{productData.subtitle}</p>
                                        <p className="product-description">{productData.description}</p>
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
                                </div>
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

                        {/* Dots indicator */}
                        <div className="carousel-dots">
                            {products.map((product, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to ${product.id}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Age Stages Overview */}
                <section className="stages-overview">
                    <div className="container">
                        <span className="section-label">
                            {t.categoryPages.lifeStages}
                        </span>
                        <h2 className="overview-title">
                            {t.categoryPages.specializedNutrition}
                        </h2>

                        <div className="stages-grid">
                            <div className="stage-card" onClick={() => goToSlide(0)}>
                                <div className="stage-age">4-7</div>
                                <h3>{t.categoryPages.earlyGrowth}</h3>
                                <p>{t.categoryPages.earlyGrowthDesc}</p>
                            </div>

                            <div className="stage-card" onClick={() => goToSlide(1)}>
                                <div className="stage-age">8-12</div>
                                <h3>{t.categoryPages.activeSchooling}</h3>
                                <p>{t.categoryPages.activeSchoolingDesc}</p>
                            </div>

                            <div className="stage-card" onClick={() => goToSlide(2)}>
                                <div className="stage-age">13-16</div>
                                <h3>{t.categoryPages.mentalFocus}</h3>
                                <p>{t.categoryPages.mentalFocusDesc}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section className="philosophy-section">
                    <div className="container">
                        <div className="philosophy-content">
                            <span className="philosophy-label">
                                {t.categoryPages.philosophy}
                            </span>
                            <h2>
                                {t.categoryPages.stagesPhilosophyTitle}
                            </h2>
                            <p>
                                {t.categoryPages.stagesPhilosophyDesc}
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .stages-page {
                    background: #ffffff;
                    color: #1a1a1a;
                    min-height: 100vh;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                /* Hero Section */
                .category-hero {
                    padding: 10rem 0 5rem;
                    text-align: center;
                    background: linear-gradient(180deg, #fdf8f3 0%, #ffffff 100%);
                }

                .logo-wrapper {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 2rem;
                }

                .category-hero :global(.category-logo) {
                    height: auto;
                    max-width: 320px;
                }

                .tagline {
                    font-size: 1.25rem;
                    color: #d4915d;
                    font-weight: 500;
                    margin-bottom: 1.5rem;
                    letter-spacing: 0.02em;
                }

                .description {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #666;
                    max-width: 700px;
                    margin: 0 auto;
                }

                /* Carousel Section */
                .carousel-section {
                    padding: 5rem 0;
                    background: #ffffff;
                }

                .section-title {
                    text-align: center;
                    font-size: 2rem;
                    font-weight: 600;
                    color: #1A4D5C;
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
                    border-radius: 50%;
                    border: 1px solid #e0e0e0;
                    background: #ffffff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    color: #666;
                    flex-shrink: 0;
                }

                .carousel-nav:hover {
                    background: #fdf8f3;
                    border-color: #d4915d;
                    color: #d4915d;
                }

                .carousel-content {
                    flex: 1;
                    overflow: hidden;
                }

                .product-display {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                }

                .product-image-link {
                    text-decoration: none;
                }

                .product-image-container {
                    background: linear-gradient(135deg, #fdf8f3 0%, #f5ebe0 100%);
                    border-radius: 24px;
                    padding: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .product-image-container:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(212, 145, 93, 0.12);
                }

                .product-display :global(.product-image) {
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
                    background: linear-gradient(135deg, #d4915d 0%, #c17c4a 100%);
                    color: white;
                    border-radius: 100px;
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
                    background: #fdf5ef;
                    color: #d4915d;
                    border-radius: 100px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    margin-bottom: 1rem;
                    margin-left: 0.5rem;
                }

                .product-title {
                    font-size: 2.5rem;
                    font-weight: 600;
                    color: #1A4D5C;
                    margin-bottom: 1rem;
                    letter-spacing: -0.02em;
                }

                .product-subtitle {
                    font-size: 1.1rem;
                    color: #d4915d;
                    margin-bottom: 1rem;
                    font-weight: 500;
                }

                .product-description {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: #666;
                    margin-bottom: 2rem;
                }

                .product-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.875rem 1.5rem;
                    background: linear-gradient(135deg, #d4915d 0%, #c17c4a 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 100px;
                    font-weight: 500;
                    font-size: 0.95rem;
                    transition: all 0.2s ease;
                }

                .product-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(212, 145, 93, 0.35);
                }

                .carousel-dots {
                    display: flex;
                    justify-content: center;
                    gap: 0.75rem;
                    margin-top: 3rem;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    border: none;
                    background: #e0e0e0;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .dot.active {
                    background: #d4915d;
                    transform: scale(1.2);
                }

                .dot:hover:not(.active) {
                    background: #c0c0c0;
                }

                /* Stages Overview Section */
                .stages-overview {
                    padding: 6rem 0;
                    background: #fdf8f3;
                    text-align: center;
                }

                .section-label {
                    display: inline-block;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: #d4915d;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .overview-title {
                    font-size: 2.25rem;
                    font-weight: 600;
                    color: #1A4D5C;
                    margin-bottom: 3rem;
                    letter-spacing: -0.02em;
                }

                .stages-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .stage-card {
                    background: white;
                    border-radius: 20px;
                    padding: 2.5rem 2rem;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 1px solid transparent;
                }

                .stage-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 32px rgba(212, 145, 93, 0.12);
                    border-color: #d4915d;
                }

                .stage-age {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 64px;
                    height: 64px;
                    background: linear-gradient(135deg, #d4915d 0%, #c17c4a 100%);
                    color: white;
                    border-radius: 50%;
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                }

                .stage-card h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #1A4D5C;
                    margin-bottom: 0.75rem;
                }

                .stage-card p {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #666;
                }

                /* Philosophy Section */
                .philosophy-section {
                    padding: 6rem 0;
                    background: #ffffff;
                }

                .philosophy-content {
                    max-width: 700px;
                    margin: 0 auto;
                    text-align: center;
                }

                .philosophy-label {
                    display: inline-block;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: #d4915d;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }

                .philosophy-content h2 {
                    font-size: 2.25rem;
                    font-weight: 600;
                    color: #1A4D5C;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.02em;
                    line-height: 1.3;
                }

                .philosophy-content p {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #666;
                }

                @media (max-width: 900px) {
                    .product-display {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                        text-align: center;
                    }

                    .product-info {
                        order: 2;
                    }

                    .carousel-nav {
                        display: none;
                    }

                    .stages-grid {
                        grid-template-columns: 1fr;
                        max-width: 400px;
                    }
                }

                @media (max-width: 768px) {
                    .category-hero {
                        padding: 8rem 0 4rem;
                    }

                    .category-hero :global(.category-logo) {
                        max-width: 220px;
                    }

                    .tagline {
                        font-size: 1.1rem;
                    }

                    .description {
                        font-size: 1rem;
                    }

                    .section-title,
                    .overview-title {
                        font-size: 1.75rem;
                    }

                    .product-title {
                        font-size: 2rem;
                    }

                    .philosophy-content h2 {
                        font-size: 1.75rem;
                    }

                    .age-badge,
                    .product-tag {
                        display: block;
                        margin-left: 0;
                        width: fit-content;
                        margin-left: auto;
                        margin-right: auto;
                    }
                }
            `}</style>
        </div>
    );
}
