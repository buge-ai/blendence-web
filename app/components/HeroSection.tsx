'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Product categories and items
const categories = [
    {
        id: 'stages',
        name: 'Stages',
        href: '/stages',
        description: 'Nutrition designed for life stages',
        gradient: 'linear-gradient(135deg, #2d5016 0%, #4a7c23 50%, #7ed957 100%)',
        products: [
            {
                id: 'kidgrow',
                name: 'KidGrow',
                ageRange: '4-7',
                href: '/stages/kidgrow',
                gradient: 'linear-gradient(145deg, #7ed957 0%, #4caf50 50%, #2e7d32 100%)',
                accentColor: '#7ed957',
            },
            {
                id: 'kidrise',
                name: 'KidRise',
                ageRange: '8-12',
                href: '/stages/kidrise',
                gradient: 'linear-gradient(145deg, #ffb347 0%, #ff9800 50%, #e65100 100%)',
                accentColor: '#ffb347',
            },
            {
                id: 'teenfocus',
                name: 'TeenFocus',
                ageRange: '13-16',
                href: '/stages/teenfocus',
                gradient: 'linear-gradient(145deg, #87ceeb 0%, #42a5f5 50%, #1565c0 100%)',
                accentColor: '#87ceeb',
            },
        ],
    },
    {
        id: 'reset',
        name: 'Reset',
        href: '/reset',
        description: 'Moments of balance',
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        products: [
            {
                id: 'reset-balance',
                name: 'Balance',
                tagline: 'Everyday',
                href: '/reset/balance',
                gradient: 'linear-gradient(145deg, #e8d5b7 0%, #c9b896 50%, #a89b7c 100%)',
                accentColor: '#e8d5b7',
            },
            {
                id: 'reset-intense',
                name: 'Intense',
                tagline: 'Targeted',
                href: '/reset/intense',
                gradient: 'linear-gradient(145deg, #6b4e71 0%, #4a3550 50%, #2d1f30 100%)',
                accentColor: '#9b7a9e',
            },
        ],
    },
];

export default function HeroSection() {
    return (
        <div className="hero-container">
            {/* Left Side - Brand Message */}
            <motion.div
                className="brand-side"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className="brand-content">
                    <motion.span
                        className="brand-tagline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Naturally powerful, perfectly balanced.
                    </motion.span>

                    <motion.h1
                        className="brand-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                    >
                        DESIGNED<br />
                        NUTRITION<br />
                        FOR EVERYDAY<br />
                        <span className="highlight">BALANCE</span>
                    </motion.h1>

                    <motion.p
                        className="brand-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        At Blendence, nutrition doesn't happen by chance.<br />
                        Every blend is designed through a deliberate process.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    >
                        <Link href="/approach" className="cta-button">
                            Explore our approach
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side - Product Shelf Grid */}
            <motion.div
                className="products-side"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className="shelf-container">
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={category.id}
                            className="category-shelf"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + catIndex * 0.2, duration: 0.6 }}
                        >
                            {/* Category Header */}
                            <Link href={category.href} className="category-header">
                                <div className="category-info">
                                    <h3 className="category-name">{category.name}</h3>
                                    <span className="category-desc">{category.description}</span>
                                </div>
                                <svg className="category-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>

                            {/* Products Row */}
                            <div className="products-row">
                                {category.products.map((product, prodIndex) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6 + catIndex * 0.2 + prodIndex * 0.1, duration: 0.5 }}
                                    >
                                        <Link href={product.href} className="product-card">
                                            <div
                                                className="product-visual"
                                                style={{ background: product.gradient }}
                                            >
                                                {/* Placeholder for product image */}
                                                <div className="product-glow" style={{ background: product.accentColor }} />
                                                <div className="product-shape" />
                                            </div>
                                            <div className="product-info">
                                                <span className="product-name">{product.name}</span>
                                                {'ageRange' in product && (
                                                    <span className="product-age">{product.ageRange}</span>
                                                )}
                                                {'tagline' in product && (
                                                    <span className="product-tagline">{product.tagline}</span>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <style jsx>{`
                .hero-container {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%);
                    overflow: hidden;
                }

                /* Left Side - Brand */
                .brand-side {
                    display: flex;
                    align-items: center;
                    padding: 4rem 4rem 4rem 6rem;
                    background: linear-gradient(135deg, #1e5631 0%, #2d7a43 50%, #358c4e 100%);
                    position: relative;
                    overflow: hidden;
                }

                .brand-side::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.05) 0%, transparent 50%);
                    pointer-events: none;
                }

                .brand-content {
                    position: relative;
                    z-index: 2;
                    max-width: 500px;
                }

                .brand-tagline {
                    display: block;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.3em;
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 2rem;
                    font-weight: 500;
                }

                .brand-title {
                    font-family: var(--font-display, sans-serif);
                    font-size: clamp(2.5rem, 5vw, 4.5rem);
                    font-weight: 800;
                    line-height: 1.05;
                    color: rgba(255, 255, 255, 0.85);
                    margin-bottom: 2rem;
                    letter-spacing: -0.02em;
                }

                .brand-title .highlight {
                    color: #ffd93d;
                    text-shadow: 0 0 40px rgba(255, 217, 61, 0.4);
                }

                .brand-description {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 3rem;
                }

                .cta-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem 2rem;
                    background: white;
                    color: #1e5631;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }

                .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
                }

                .cta-button svg {
                    transition: transform 0.3s ease;
                }

                .cta-button:hover svg {
                    transform: translateX(4px);
                }

                /* Right Side - Products */
                .products-side {
                    display: flex;
                    align-items: center;
                    padding: 4rem;
                    position: relative;
                    background: linear-gradient(180deg, #0f1419 0%, #1a1f2e 100%);
                }

                .products-side::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: 
                        radial-gradient(circle at 80% 20%, rgba(126, 217, 87, 0.08) 0%, transparent 40%),
                        radial-gradient(circle at 20% 80%, rgba(135, 206, 235, 0.06) 0%, transparent 40%);
                    pointer-events: none;
                }

                .shelf-container {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                }

                .category-shelf {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 24px;
                    padding: 1.5rem;
                    backdrop-filter: blur(10px);
                }

                .category-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 0.5rem 1.25rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    margin-bottom: 1.5rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .category-header:hover {
                    opacity: 0.8;
                }

                .category-header:hover .category-arrow {
                    transform: translateX(4px);
                }

                .category-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                }

                .category-name {
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: white;
                    margin: 0;
                    letter-spacing: 0.02em;
                }

                .category-desc {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5);
                }

                .category-arrow {
                    color: rgba(255, 255, 255, 0.4);
                    transition: all 0.3s ease;
                }

                .products-row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 1rem;
                }

                .product-card {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border-radius: 16px;
                    padding: 0.5rem;
                }

                .product-card:hover {
                    transform: translateY(-4px);
                    background: rgba(255, 255, 255, 0.03);
                }

                .product-visual {
                    aspect-ratio: 1;
                    border-radius: 16px;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .product-glow {
                    position: absolute;
                    width: 80%;
                    height: 80%;
                    border-radius: 50%;
                    filter: blur(30px);
                    opacity: 0.3;
                    transition: opacity 0.3s ease;
                }

                .product-card:hover .product-glow {
                    opacity: 0.5;
                }

                .product-shape {
                    width: 60%;
                    height: 70%;
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 8px;
                    position: relative;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(4px);
                }

                .product-shape::before {
                    content: '';
                    position: absolute;
                    top: 10%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40%;
                    height: 15%;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 4px;
                }

                .product-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.25rem;
                    text-align: center;
                }

                .product-name {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: white;
                }

                .product-age,
                .product-tagline {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.5);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                /* Responsive */
                @media (max-width: 1200px) {
                    .hero-container {
                        grid-template-columns: 1fr 1fr;
                    }
                    
                    .brand-side {
                        padding: 3rem;
                    }
                    
                    .products-side {
                        padding: 3rem 2rem;
                    }
                }

                @media (max-width: 900px) {
                    .hero-container {
                        grid-template-columns: 1fr;
                        min-height: auto;
                    }
                    
                    .brand-side {
                        padding: 6rem 2rem 4rem;
                    }
                    
                    .brand-title {
                        font-size: clamp(2rem, 8vw, 3rem);
                    }
                    
                    .products-side {
                        padding: 3rem 1.5rem;
                    }
                    
                    .products-row {
                        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                        gap: 0.75rem;
                    }
                }

                @media (max-width: 480px) {
                    .brand-side {
                        padding: 5rem 1.5rem 3rem;
                    }
                    
                    .category-shelf {
                        padding: 1rem;
                    }
                    
                    .products-row {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
            `}</style>
        </div>
    );
}
