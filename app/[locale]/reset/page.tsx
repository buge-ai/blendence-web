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
}

const products: Product[] = [
    {
        id: 'balance',
        image: blob('products/balance_front.png'),
        link: '/reset/balance',
    },
    {
        id: 'intense',
        image: blob('products/intense_front.png'),
        link: '/reset/intense',
    },
];

export default function ResetCategoryPage() {
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
    const productData = currentProduct.id === 'balance'
        ? t.productPages.resetBalance
        : t.productPages.resetIntense;

    return (
        <div className="reset-page">
            <Navigation />

            <main>
                {/* Hero Section with Logo */}
                <section className="category-hero">
                    <div className="container">
                        <div className="logo-wrapper">
                            <Image
                                src={blob('logos/reset_stage_logo_reset_org_color.png')}
                                alt="Reset Logo"
                                width={280}
                                height={100}
                                className="category-logo"
                                priority
                            />
                        </div>
                        <p className="tagline">{t.products.reset.tagline}</p>
                        <p className="description">{t.products.reset.description}</p>
                    </div>
                </section>

                {/* Product Carousel Section */}
                <section className="carousel-section">
                    <div className="container">
                        <h2 className="section-title">
                            {language === 'tr' ? 'Ürünlerimiz' : 'Our Products'}
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
                                                width={400}
                                                height={520}
                                                className="product-image"
                                                priority
                                            />
                                        </div>
                                    </Link>

                                    <div className="product-info">
                                        <span className="product-tag">{productData.tag}</span>
                                        <h3 className="product-title">{productData.title}</h3>
                                        <p className="product-subtitle">{productData.subtitle}</p>
                                        <p className="product-description">{productData.description}</p>
                                        <Link
                                            href={`/${language}${currentProduct.link}`}
                                            className="product-cta"
                                        >
                                            {language === 'tr' ? 'Detayları Gör' : 'View Details'}
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
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to product ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section className="philosophy-section">
                    <div className="container">
                        <div className="philosophy-content">
                            <span className="philosophy-label">
                                {language === 'tr' ? 'Felsefe' : 'Philosophy'}
                            </span>
                            <h2>
                                {language === 'tr'
                                    ? 'Denge anları için tasarlandı.'
                                    : 'Designed for moments of balance.'}
                            </h2>
                            <p>
                                {language === 'tr'
                                    ? 'Reset, vücudun normalden daha ağır hissedildiği anlar için tasarlandı. Bitki bazlı, lif destekli formülasyonu sindirim hafifliğini ve denge hissini desteklemek için tasarlandı.'
                                    : 'Reset is designed for moments when the body feels heavier than usual. Its plant-based, fiber-supported formulation is designed to support digestive lightness and a sense of balance.'}
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .reset-page {
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
                    background: linear-gradient(180deg, #f8fdf8 0%, #ffffff 100%);
                }

                .logo-wrapper {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 2rem;
                }

                .category-hero :global(.category-logo) {
                    height: auto;
                    max-width: 280px;
                }

                .tagline {
                    font-size: 1.25rem;
                    color: #4a9c6d;
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
                    background: #f8fdf8;
                    border-color: #4a9c6d;
                    color: #4a9c6d;
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
                    background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e8 100%);
                    border-radius: 24px;
                    padding: 2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .product-image-container:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 40px rgba(74, 156, 109, 0.1);
                }

                .product-display :global(.product-image) {
                    max-width: 100%;
                    height: auto;
                    object-fit: contain;
                }

                .product-info {
                    padding: 1rem 0;
                }

                .product-tag {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: #f0f9f3;
                    color: #4a9c6d;
                    border-radius: 100px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    margin-bottom: 1.5rem;
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
                    color: #4a9c6d;
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
                    background: linear-gradient(135deg, #4a9c6d 0%, #3d8a5e 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 100px;
                    font-weight: 500;
                    font-size: 0.95rem;
                    transition: all 0.2s ease;
                }

                .product-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(74, 156, 109, 0.3);
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
                    background: #4a9c6d;
                    transform: scale(1.2);
                }

                .dot:hover:not(.active) {
                    background: #c0c0c0;
                }

                /* Philosophy Section */
                .philosophy-section {
                    padding: 6rem 0;
                    background: #f8fdf8;
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
                    color: #4a9c6d;
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
                }

                @media (max-width: 768px) {
                    .category-hero {
                        padding: 8rem 0 4rem;
                    }

                    .category-hero :global(.category-logo) {
                        max-width: 200px;
                    }

                    .tagline {
                        font-size: 1.1rem;
                    }

                    .description {
                        font-size: 1rem;
                    }

                    .section-title {
                        font-size: 1.75rem;
                    }

                    .product-title {
                        font-size: 2rem;
                    }

                    .philosophy-content h2 {
                        font-size: 1.75rem;
                    }
                }
            `}</style>
        </div>
    );
}
