'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ProductCarouselProps {
    images: string[];
    autoPlayInterval?: number;
}

export default function ProductCarousel({ images, autoPlayInterval = 4000 }: ProductCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }, [images.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    // Auto-play functionality
    useEffect(() => {
        if (!isHovered && autoPlayInterval > 0) {
            const interval = setInterval(goToNext, autoPlayInterval);
            return () => clearInterval(interval);
        }
    }, [isHovered, autoPlayInterval, goToNext]);

    return (
        <div
            className="relative w-full max-w-5xl mx-auto group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main carousel container */}
            <div className="relative overflow-hidden rounded-3xl aspect-[16/9] bg-gray-100">
                {/* Images */}
                <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="min-w-full h-full relative">
                            <Image
                                src={image}
                                alt={`Product ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Previous button */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm text-gray-800 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
                    aria-label="Previous image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                {/* Next button */}
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm text-gray-800 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
                    aria-label="Next image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-3 mt-6">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentIndex
                            ? 'w-8 h-3 bg-[var(--dark-blue)]'
                            : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentIndex}
                    />
                ))}
            </div>
        </div>
    );
}
