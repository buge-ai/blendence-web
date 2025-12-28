import React, { useEffect, useState } from 'react';
import { ArrowRight, ShoppingBag, Leaf } from 'lucide-react';
import { ProductSlide } from '../types';

interface ContentLayerProps {
  slide: ProductSlide;
  isActive: boolean;
}

export const ContentLayer: React.FC<ContentLayerProps> = ({ slide, isActive }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isActive) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isActive]);

  return (
    <div 
      className={`absolute inset-0 flex items-center transition-opacity duration-500 ${
        isActive ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-10 pointer-events-none'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-xl space-y-6">
          
          {/* Subtitle / Badge */}
          <div 
            className={`flex items-center space-x-2 overflow-hidden transition-all duration-700 delay-100 transform ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className={`px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-white shadow-sm border border-gray-100 ${slide.themeColor}`}>
              {slide.subtitle}
            </span>
            <span className="text-gray-500 text-xs font-medium tracking-wide uppercase flex items-center gap-1">
              <Leaf size={12} /> 100% Natural
            </span>
          </div>

          {/* Main Title */}
          <h1 
            className={`text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 transition-all duration-700 delay-200 transform ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="block">Blendence</span>
            <span className={`block ${slide.themeColor}`}>
              {slide.title}
            </span>
          </h1>

          {/* Description */}
          <p 
            className={`text-lg md:text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-300 transform ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {slide.description}
          </p>

          {/* Ingredients Pills */}
          <div 
            className={`flex flex-wrap gap-2 transition-all duration-700 delay-400 transform ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {slide.ingredients.map((ing, i) => (
              <span key={i} className="px-3 py-1.5 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-md text-sm font-medium text-gray-700 shadow-sm">
                {ing}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div 
            className={`pt-4 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 transform ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <button className={`flex items-center justify-center gap-2 px-8 py-4 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-sm tracking-wide ${slide.accentColor}`}>
              <ShoppingBag size={18} />
              SHOP NOW
            </button>
            
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full shadow-md hover:shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 font-bold text-sm tracking-wide group">
              VIEW NUTRITION
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};