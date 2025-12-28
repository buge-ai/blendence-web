import React from 'react';
import { HeroCarousel } from './components/HeroCarousel';

const App: React.FC = () => {
  return (
    <main className="w-full min-h-screen">
      <HeroCarousel />
      
      {/* Placeholder for subsequent sections */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Naturally Engineered Nutrition</h2>
          <p className="text-gray-600 leading-relaxed">
            Our stages are carefully crafted to provide the exact nutrients your child needs at every step of their development. From toddler steps to teenage focus, Blendence grows with them.
          </p>
        </div>
      </section>
    </main>
  );
};

export default App;