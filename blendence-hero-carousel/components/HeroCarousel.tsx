import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES, AUTO_PLAY_INTERVAL } from '../constants';
import { MorphImageLayer } from './MorphImageLayer';
import { ContentLayer } from './ContentLayer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Cycle to next slide
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  // Cycle to prev slide
  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <div 
      className="relative w-full h-screen min-h-[700px] bg-gray-50 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Background Image Morph Layer */}
      <MorphImageLayer slides={SLIDES} activeIndex={activeIndex} />

      {/* 2. Content Overlay Layer (Text) */}
      {SLIDES.map((slide, index) => (
        <ContentLayer 
          key={slide.id} 
          slide={slide} 
          isActive={index === activeIndex} 
        />
      ))}

      {/* 3. Navigation Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-30 px-6 md:px-12 lg:px-24 flex items-center justify-between pointer-events-none">
        
        {/* Progress Indicators */}
        <div className="flex gap-3 pointer-events-auto">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === activeIndex ? 'w-12 bg-gray-800' : 'w-4 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 hover:bg-white/40 transition-colors shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 hover:bg-white/40 transition-colors shadow-sm"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      {/* Decorative Branding Elements */}
      <div className="absolute top-8 left-6 md:left-12 lg:left-24 z-30 pointer-events-auto">
         <span className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-lg">B</div>
            BLENDENCE
         </span>
      </div>
    </div>
  );
};