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
        products: [
            {
                id: 'reset-balance',
                name: 'Reset Balance',
                tagline: 'Everyday',
                href: '/reset/balance',
                gradient: 'linear-gradient(145deg, #e8d5b7 0%, #c9b896 50%, #a89b7c 100%)',
                accentColor: '#e8d5b7',
            },
            {
                id: 'reset-intense',
                name: 'Reset Intense',
                tagline: 'Targeted',
                href: '/reset/intense',
                gradient: 'linear-gradient(145deg, #6b4e71 0%, #4a3550 50%, #2d1f30 100%)',
                accentColor: '#9b7a9e',
            },
        ],
    },
];

export default function ContentGrid() {
    return (
        <section className="content-grid-section">
            <div className="container">
                <div className="shelf-container">
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={category.id}
                            className="category-shelf"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {/* Category Header */}
                            <Link href={category.href} className="category-header">
                                <div className="category-info">
                                    <h3 className="category-name">{category.name}</h3>
                                    <span className="category-desc">{category.description}</span>
                                </div>
                                <div className="explore-link">
                                    Explore {category.name} <span className="arrow">→</span>
                                </div>
                            </Link>

                            {/* Products Row */}
                            <div className="products-grid">
                                {category.products.map((product, prodIndex) => (
                                    <Link key={product.id} href={product.href} className="product-card">
                                        <div
                                            className="product-visual"
                                            style={{ background: product.gradient }}
                                        >
                                            {/* Placeholder/Glow for product image */}
                                            <div className="product-glow" style={{ background: product.accentColor }} />
                                            <div className="product-shape" />
                                        </div>
                                        <div className="product-info">
                                            <span className="product-name">{product.name}</span>
                                            {'ageRange' in product && (
                                                <span className="product-meta">Age {product.ageRange}</span>
                                            )}
                                            {'tagline' in product && (
                                                <span className="product-meta">{product.tagline}</span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .content-grid-section {
                    padding: 6rem 0;
                    background-color: #fdfdfc;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .shelf-container {
                    display: flex;
                    flex-direction: column;
                    gap: 4rem;
                }

                .category-shelf {
                    background: white;
                    border-radius: 24px;
                    padding: 2.5rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                    border: 1px solid rgba(0,0,0,0.03);
                }

                .category-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 2rem;
                    text-decoration: none;
                    color: inherit;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    transition: opacity 0.2s;
                }
                .category-header:hover {
                    opacity: 0.7;
                }

                .category-name {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 0;
                    color: #1a1a1c;
                }

                .category-desc {
                    margin-top: 0.5rem;
                    display: block;
                    font-size: 1rem;
                    color: #666;
                }
                
                .explore-link {
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 2rem;
                }

                .product-card {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    text-decoration: none;
                    color: inherit;
                    transition: transform 0.3s ease;
                }

                .product-card:hover {
                    transform: translateY(-8px);
                }

                .product-visual {
                    aspect-ratio: 1;
                    border-radius: 20px;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
                }

                .product-glow {
                    position: absolute;
                    width: 70%;
                    height: 70%;
                    border-radius: 50%;
                    filter: blur(40px);
                    opacity: 0.6;
                }

                .product-shape {
                    width: 50%;
                    height: 60%;
                    background: rgba(255, 255, 255, 0.25);
                    border-radius: 12px;
                    position: relative;
                    z-index: 2;
                    backdrop-filter: blur(8px);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }

                .product-info {
                    text-align: center;
                }

                .product-name {
                    display: block;
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 0.25rem;
                    color: #1a1a1c;
                }

                .product-meta {
                    font-size: 0.9rem;
                    color: #888;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 500;
                }

                @media (max-width: 768px) {
                    .category-shelf {
                        padding: 1.5rem;
                    }
                    .products-grid {
                        grid-template-columns: 1fr;
                    }
                    .product-visual {
                        aspect-ratio: 16/9;
                    }
                }
            `}</style>
        </section>
    );
}
