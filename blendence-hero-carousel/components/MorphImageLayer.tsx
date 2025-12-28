import React from 'react';
import { ProductSlide } from '../types';

interface MorphImageLayerProps {
  slides: ProductSlide[];
  activeIndex: number;
}

export const MorphImageLayer: React.FC<MorphImageLayerProps> = ({ slides, activeIndex }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-[1500ms] ease-in-out transform will-change-transform ${
              isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle Gradient Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent sm:from-white/95 sm:via-white/20 sm:to-transparent" />
            </div>
          </div>
        );
      })}
    </div>
  );
};