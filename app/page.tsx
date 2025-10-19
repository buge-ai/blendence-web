'use client';

import { useEffect, useState, useMemo } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer for product box animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach((box) => observer.observe(box));

    return () => {
      productBoxes.forEach((box) => observer.unobserve(box));
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/98 shadow-lg' : 'bg-white/95 shadow-md'}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0">
              <img src="/logo.png" alt="BLENDENCE" className="h-12 w-auto" />
            </div>
            <ul className="hidden md:flex gap-8">
              {['Home', 'About', 'Products', 'Technology', 'Quality', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-[var(--dark-gray)] font-medium hover:text-[var(--turquoise)] transition-colors duration-300 relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--turquoise)] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-start pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-blue)] via-[var(--dark-blue-alt)] to-[var(--turquoise)]"></div>

        {/* Image Carousel - Full Background */}
        <div className="absolute inset-0">
          <ImageCarousel />
        </div>

        <div className="relative z-10 w-full h-full">
          <div className="w-full px-8 sm:px-12 lg:px-16">
            {/* Content - Left side, using full left area */}
            <div className="text-white animate-[fadeInUp_1s_ease]">
              <p className="text-base md:text-lg lg:text-xl mb-4 opacity-60 font-light max-w-3xl">
                Turkey's First 100% Freeze-Dried Nutritional Mix Brand
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-6" style={{ color: 'white' }}>
                Naturally Powerful, Perfectly Balanced
              </h1>
              <div className="flex gap-2 md:gap-3 mb-8">
                {['100% Natural', '100% Vegan', 'No Added Sugar'].map((badge) => (
                  <span key={badge} className="px-3 py-2 md:px-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
                    {badge}
                  </span>
                ))}
              </div>
              <p className="text-base md:text-lg mb-8 opacity-80 font-light max-w-2xl leading-relaxed">
                Dedicated to providing natural, functional, and safe products for consumers of all ages. Our mission is to deliver wholesome nutrition, ensuring that everyone can enjoy the health benefits of high-quality ingredients without any additives or preservatives.
              </p>
              <a
                href="#products"
                className="inline-block px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: 'var(--yellow)', color: 'var(--dark-blue)' }}
              >
                Discover Our Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Innovating Natural Nutrition */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>Innovating Natural Nutrition</h2>
            <p className="text-xl text-[var(--dark-gray-alt)] font-light max-w-2xl mx-auto">BUGE GIDA A.Ş. - Leading the freeze-dried revolution</p>
          </div>

          {/* 2x2 Grid with Images */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Left - Text on right side with fade from right to left */}
            <div className="relative h-80 rounded-2xl overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/innovate/founded.png')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/70 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-end p-8 md:p-12">
                <div className="text-right md:text-right max-w-md">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-white">Founded 2024</h3>
                  <p className="text-base md:text-lg opacity-95 drop-shadow-md text-white">Located in Trakya Teknopark, Edirne, with state-of-the-art production facilities</p>
                </div>
              </div>
            </div>

            {/* Top Right - Text on left side with fade from left to right */}
            <div className="relative h-80 rounded-2xl overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/innovate/expert-team.jpg')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-start p-8 md:p-12">
                <div className="text-left max-w-md">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-white">Expert Team</h3>
                  <p className="text-base md:text-lg opacity-95 drop-shadow-md text-white">Founded by 2 food engineers (1 Assoc. Prof., 1 PhD) and 1 control automation engineer</p>
                </div>
              </div>
            </div>

            {/* Bottom Left - Text on right side with fade from right to left */}
            <div className="relative h-80 rounded-2xl overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/innovate/production-capacity.png')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/70 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-end p-8 md:p-12">
                <div className="text-right md:text-right max-w-md">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-white">Production Capacity</h3>
                  <p className="text-base md:text-lg opacity-95 drop-shadow-md text-white">2,000-2,200 sachets daily with advanced freeze-drying technology</p>
                </div>
              </div>
            </div>

            {/* Bottom Right - Text on left side with fade from left to right */}
            <div className="relative h-80 rounded-2xl overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/innovate/global-vision.jpg')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-start p-8 md:p-12">
                <div className="text-left max-w-md">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-white">Global Vision</h3>
                  <p className="text-base md:text-lg opacity-95 drop-shadow-md text-white">Expanding to 3 new EU markets with EUREKA Innowwide feasibility project</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section - Why BLENDENCE? */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>Why BLENDENCE?</h2>
            <p className="text-xl text-[var(--dark-gray-alt)] font-light max-w-2xl mx-auto">Our competitive edge in the market</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Market Leader', desc: "Turkey's only brand in the 100% freeze-dried mix segment" },
              { title: 'Advanced Technology', desc: 'State-of-the-art freeze drying infrastructure with R&D capabilities' },
              { title: 'Industrial Scale', desc: '2,000+ sachets daily production capacity for B2C and B2B markets' },
              { title: 'Quality Assurance', desc: 'International certifications and dedicated quality laboratory' },
              { title: 'Natural & Safe', desc: '100% natural, functional products with no additives or preservatives' },
              { title: 'Sustainability Focus', desc: 'Innovation-driven approach with environmental responsibility' }
            ].map((adv) => (
              <div key={adv.title} className="bg-white rounded-lg p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--dark-blue)' }}>{adv.title}</h4>
                <p className="text-sm text-[var(--dark-gray-alt)] font-light leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>Our Product Range</h2>
            <p className="text-xl text-[var(--dark-gray-alt)] font-light max-w-2xl mx-auto">Scientifically formulated for optimal health benefits</p>
          </div>

          {/* Adult Products */}
          <div className="mb-24">
            <h3 className="text-4xl md:text-5xl font-light mb-20 text-center" style={{ color: 'var(--dark-blue)' }}>Adult Mix Series</h3>

            {/* Green Mix */}
            <div className="product-box relative mb-20 overflow-hidden">
              {/* Green gradient background - darker, more visible */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 via-green-100 to-lime-100"></div>

              <div className="relative grid md:grid-cols-4 gap-0 p-12 items-start">
                {/* Title */}
                <div className="md:col-span-1 pr-8">
                  <h4 className="text-5xl font-light mb-4" style={{ color: 'var(--dark-blue)' }}>Green Mix</h4>
                  <p className="text-lg text-[var(--dark-gray-alt)] font-light mb-4">Natural Detox Boost</p>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Natural immunity support with no sugar and no additives. Powerful detox effect with natural vitamin C.
                  </p>
                </div>

                {/* Benefits */}
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-4 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Benefits</h5>
                  <div className="space-y-2">
                    {[
                      'Detox effect with edema reduction',
                      'Natural vitamin C for immunity',
                      'Fiber for digestive support',
                      'Low calorie, antioxidant-rich'
                    ].map((benefit) => (
                      <div key={benefit} className="flex gap-2 text-xs text-[var(--dark-gray-alt)]">
                        <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--dark-blue)' }}></span>
                        <span className="font-light">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ingredients */}
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Ingredients</h5>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Green Apple • Spinach • Lemon • Ginger • Cucumber • Parsley • Natural Plant Fiber
                  </p>
                </div>

                {/* Usage */}
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Usage</h5>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Mix 15g sachet with 250ml hot or cold water
                  </p>
                </div>
              </div>
            </div>

            {/* Red Mix */}
            <div className="product-box relative overflow-hidden">
              {/* Pink/fuchsia gradient background - darker, more visible */}
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-200 via-pink-100 to-rose-100"></div>

              <div className="relative grid md:grid-cols-4 gap-0 p-12 items-start">
                {/* Title */}
                <div className="md:col-span-1 pr-8">
                  <h4 className="text-5xl font-light mb-4" style={{ color: 'var(--dark-blue)' }}>Red Mix</h4>
                  <p className="text-lg text-[var(--dark-gray-alt)] font-light mb-4">Immunity Powerhouse</p>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Powerful antioxidant blend to strengthen the immune system with naturally freeze-dried ingredients.
                  </p>
                </div>

                {/* Benefits */}
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-4 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Benefits</h5>
                  <div className="space-y-2">
                    {[
                      'Rich in antioxidants',
                      'Strengthens immune system',
                      'Natural vitamin and mineral source',
                      'Supports cardiovascular health'
                    ].map((benefit) => (
                      <div key={benefit} className="flex gap-2 text-xs text-[var(--dark-gray-alt)]">
                        <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--dark-blue)' }}></span>
                        <span className="font-light">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ingredients */}
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Ingredients</h5>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Beet • Carrot • Apple • Pomegranate
                  </p>
                </div>

                {/* Usage */}
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Usage</h5>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Weekly box (7 sachets)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Children's Products */}
          <div className="mb-20">
            <h3 className="text-4xl md:text-5xl font-light mb-6 text-center" style={{ color: 'var(--dark-blue)' }}>Age-Specific Children's Mix Series</h3>
            <p className="text-center text-[var(--dark-gray-alt)] font-light max-w-3xl mx-auto mb-16">
              Designed based on nutritional needs of each age group and which plants contain these nutrients. While we target specific age groups, everyone can use all products.
            </p>
            {/* Children's Mix (Ages 4-7) */}
            <div className="product-box relative mb-16 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-amber-100 to-orange-100"></div>
              <div className="relative grid md:grid-cols-4 gap-0 p-12 items-start">
                <div className="md:col-span-1 pr-8">
                  <h4 className="text-5xl font-light mb-4" style={{ color: 'var(--dark-blue)' }}>Children's Mix</h4>
                  <p className="text-lg text-[var(--dark-gray-alt)] font-light mb-2">Ages 4-7</p>
                  <p className="text-base text-[var(--dark-gray-alt)] font-light mb-4">Growth & Immunity Focus</p>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Appeals to young children's preference for sweet flavors. Fruits like grape, orange, peach, and banana offer both delicious taste and energy-providing carbohydrates.
                  </p>
                </div>
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-4 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Benefits</h5>
                  <div className="space-y-2">
                    {[
                      'Essential vitamins (C, A) and minerals (potassium)',
                      'Digestive support with fiber',
                      'Energy support for preschool activities',
                      'Sweet profile increases acceptance'
                    ].map((benefit) => (
                      <div key={benefit} className="flex gap-2 text-xs text-[var(--dark-gray-alt)]">
                        <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--dark-blue)' }}></span>
                        <span className="font-light">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Ingredients</h5>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Grape • Orange • Peach • Banana • Orange Peel
                  </p>
                </div>
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Usage</h5>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Mix sachet with water or add to yogurt
                  </p>
                </div>
              </div>
            </div>

            {/* Junior Mix (Ages 8-12) */}
            <div className="product-box relative mb-16 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 via-teal-100 to-blue-100"></div>
              <div className="relative grid md:grid-cols-4 gap-0 p-12 items-start">
                <div className="md:col-span-1 pr-8">
                  <h4 className="text-5xl font-light mb-4" style={{ color: 'var(--dark-blue)' }}>Junior Mix</h4>
                  <p className="text-lg text-[var(--dark-gray-alt)] font-light mb-2">Ages 8-12</p>
                  <p className="text-base text-[var(--dark-gray-alt)] font-light mb-4">Mental Development & School Performance</p>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Targets the transition from early childhood to pre-teen. Apple and banana maintain sweetness, while carrot and lemon strengthen immunity.
                  </p>
                </div>
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-4 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Benefits</h5>
                  <div className="space-y-2">
                    {[
                      'Energy for rapid growth (carbohydrates)',
                      'Vitamins (C, A) supporting school performance',
                      'Develops palate with slightly acidic tastes',
                      'More complex profile for dietary diversity'
                    ].map((benefit) => (
                      <div key={benefit} className="flex gap-2 text-xs text-[var(--dark-gray-alt)]">
                        <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--dark-blue)' }}></span>
                        <span className="font-light">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Ingredients</h5>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Apple • Banana • Carrot • Lemon • Orange Peel
                  </p>
                </div>
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Usage</h5>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Mix sachet with water or add to smoothies
                  </p>
                </div>
              </div>
            </div>

            {/* Youth Mix (Ages 13-18) */}
            <div className="product-box relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 via-purple-100 to-violet-100"></div>
              <div className="relative grid md:grid-cols-4 gap-0 p-12 items-start">
                <div className="md:col-span-1 pr-8">
                  <h4 className="text-5xl font-light mb-4" style={{ color: 'var(--dark-blue)' }}>Youth Mix</h4>
                  <p className="text-lg text-[var(--dark-gray-alt)] font-light mb-2">Ages 13-18</p>
                  <p className="text-base text-[var(--dark-gray-alt)] font-light mb-4">Energy, Concentration & Active Life Support</p>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Intensive nutritional profile suitable for adolescence. Strawberry and grape support memory with antioxidants.
                  </p>
                </div>
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-4 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Benefits</h5>
                  <div className="space-y-2">
                    {[
                      'Focus-enhancing antioxidants (flavonoids)',
                      'Cognitive support with omega-3',
                      'Long-lasting energy',
                      'Balanced mix for independent nutrition habits'
                    ].map((benefit) => (
                      <div key={benefit} className="flex gap-2 text-xs text-[var(--dark-gray-alt)]">
                        <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--dark-blue)' }}></span>
                        <span className="font-light">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Ingredients</h5>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Strawberry • Grape • Kiwi • Lemon • Banana • Flaxseed
                  </p>
                </div>
                <div className="p-8 border-l border-gray-200">
                  <h5 className="text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Usage</h5>
                  <p className="text-sm text-[var(--dark-gray)] font-light leading-relaxed">
                    Mix sachet with water or sports drinks
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Products */}
          <div>
            <h3 className="text-4xl md:text-5xl font-light mb-16 text-center" style={{ color: 'var(--dark-blue)' }}>Additional Product Lines</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-[var(--light-gray)] rounded-lg p-10 border border-gray-100 transition-all duration-300 hover:shadow-lg">
                <h4 className="text-2xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>Freeze-Dried Fruit Slices</h4>
                <p className="text-base text-[var(--dark-gray)] font-light leading-relaxed">
                  Healthy snack alternatives in convenient sachets. Classic freeze-dried fruit slices offering a nutritious and practical snacking option.
                </p>
              </div>
              <div className="bg-[var(--light-gray)] rounded-lg p-10 border border-gray-100 transition-all duration-300 hover:shadow-lg">
                <h4 className="text-2xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>Natural Fruit Powders for Food Industry</h4>
                <p className="text-base text-[var(--dark-gray)] font-light leading-relaxed">
                  Premium ingredients for the food industry. A natural, healthy alternative instead of chemical or synthetic flavors and colorings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section - Freeze Drying Technology */}
      <section id="technology" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>Freeze Drying Technology</h2>
            <p className="text-xl text-[var(--dark-gray-alt)] font-light max-w-2xl mx-auto">Preserving nature's power through innovation</p>
          </div>

          {/* Main Process Card */}
          <div className="bg-white rounded-3xl p-12 mb-12 shadow-sm border border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-light mb-8 text-center" style={{ color: 'var(--dark-blue)' }}>Lyophilization Process</h3>
              <p className="text-lg text-[var(--dark-gray-alt)] leading-relaxed text-center mb-12">
                Products are frozen and dehydrated under vacuum through sublimation, ensuring maximum nutrient retention and quality preservation without the need for additives or preservatives.
              </p>

              {/* Process Steps */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--turquoise)]/10 flex items-center justify-center">
                    <span className="text-2xl font-light" style={{ color: 'var(--turquoise)' }}>01</span>
                  </div>
                  <h4 className="text-lg font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>Freezing</h4>
                  <p className="text-sm text-[var(--dark-gray-alt)] font-light">Products frozen to ultra-low temperatures</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--turquoise)]/10 flex items-center justify-center">
                    <span className="text-2xl font-light" style={{ color: 'var(--turquoise)' }}>02</span>
                  </div>
                  <h4 className="text-lg font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>Vacuum</h4>
                  <p className="text-sm text-[var(--dark-gray-alt)] font-light">Pressure reduced in controlled chamber</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--turquoise)]/10 flex items-center justify-center">
                    <span className="text-2xl font-light" style={{ color: 'var(--turquoise)' }}>03</span>
                  </div>
                  <h4 className="text-lg font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>Sublimation</h4>
                  <p className="text-sm text-[var(--dark-gray-alt)] font-light">Ice transforms directly to vapor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Advantages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Nutrient Preservation', desc: 'Retains vitamins, minerals, amino acids, and color compounds' },
              { title: 'Minimal Loss', desc: 'Less than 5% nutrient loss vs. 40-60% in traditional drying methods' },
              { title: 'No Heat Damage', desc: 'Drying without high-temperature exposure' },
              { title: 'Extended Shelf Life', desc: 'No preservatives needed, minimizes microbial growth risk' },
              { title: 'No Cold Chain Required', desc: 'Simple and economical distribution and storage' },
              { title: 'Superior Quality', desc: 'Maintains original structure, flavor, and nutritional value' }
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <h4 className="text-lg font-medium mb-3" style={{ color: 'var(--dark-blue)' }}>{item.title}</h4>
                <p className="text-sm text-[var(--dark-gray-alt)] font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality/Certifications Section */}
      <section id="quality" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>Quality & Certifications</h2>
          </div>

          {/* Current Certifications */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-xs font-light uppercase tracking-wider mb-3 opacity-50" style={{ color: 'var(--dark-gray)' }}>CURRENT CERTIFICATIONS</h3>
            <p className="text-base font-light" style={{ color: 'var(--dark-blue)' }}>ISO 9001 • ISO 22000 • HACCP</p>
          </div>

          {/* Coming Soon */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-xs font-light uppercase tracking-wider mb-3 opacity-50" style={{ color: 'var(--dark-gray)' }}>COMING SOON</h3>
            <p className="text-base font-light" style={{ color: 'var(--dark-blue)' }}>FSSC 22000 certification expected December (highly prestigious in global markets)</p>
          </div>

          {/* Future Plans */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-xs font-light uppercase tracking-wider mb-3 opacity-50" style={{ color: 'var(--dark-gray)' }}>FUTURE PLANS</h3>
            <p className="text-base font-light" style={{ color: 'var(--dark-blue)' }}>BRC certification (For UK market entry) to follow FSSC</p>
          </div>

          {/* Laboratory */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-xs font-light uppercase tracking-wider mb-3 opacity-50" style={{ color: 'var(--dark-gray)' }}>LABORATORY</h3>
            <p className="text-base font-light" style={{ color: 'var(--dark-blue)' }}>In addition to production, we operate 2 associate professor-level food engineering laboratory ensuring the highest quality standards</p>
          </div>

          {/* Backed By */}
          <div>
            <h3 className="text-xs font-light uppercase tracking-wider mb-3 opacity-50" style={{ color: 'var(--dark-gray)' }}>BACKED BY</h3>
            <p className="text-base font-light" style={{ color: 'var(--dark-blue)' }}>TÜBİTAK • Trakya Development Agency • Private Investor Support</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-[var(--dark-blue)] to-[var(--turquoise)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light mb-6 text-white">Get in Touch</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="mb-4">
                <h4 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: 'var(--yellow)' }}>HEADQUARTERS</h4>
                <p className="text-base font-light leading-relaxed text-white/90">Trakya Teknopark<br />Trakya University Technology Development Zone<br />Edirne, Turkey</p>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <h4 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: 'var(--yellow)' }}>PRODUCTION FACILITY</h4>
                <p className="text-base font-light leading-relaxed text-white/90">Hasan Pehlivan Cd. No:1/D<br />Havsa / Edirne</p>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <h4 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: 'var(--yellow)' }}>CONTACT</h4>
                <p className="text-base font-light leading-relaxed text-white/90">contact@bugefoods.com<br />+90 540 022 3922<br />www.bugefoods.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-16">
            <div className="text-center mb-8">
              <h3 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: 'var(--yellow)' }}>Investment Opportunities</h3>
              <p className="text-lg font-light text-white/90 max-w-3xl mx-auto mb-12">We're expanding into European markets and seeking strategic partners and investors to accelerate our growth.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Proven technology and production capabilities',
                'First-mover advantage in freeze-dried mix segment',
                'Strong B2C and B2B revenue streams',
                'International expansion ready'
              ].map((item) => (
                <div key={item} className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm font-light leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[var(--dark-blue)] text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-2">BLENDENCE</h3>
          <p className="mb-1 opacity-90">Naturally Powerful, Perfectly Balanced</p>
          <p className="text-sm opacity-70 mb-6">BUGE GIDA A.Ş.</p>
          <p className="opacity-80 mb-2">100% Natural • 100% Vegan • No Added Sugar</p>
          <p className="text-sm opacity-60">&copy; 2024 BUGE GIDA A.Ş. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}

// Product Card Component
function ProductCard({ title, tagline, description, ingredients, benefits, usage, borderColor, bgGradient }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl border-4" style={{ borderColor }}>
      <div className="p-6 rounded-2xl mb-6 text-white text-center" style={{ background: bgGradient }}>
        <h4 className="text-2xl font-semibold mb-1">{title}</h4>
        <p className="text-sm opacity-95">{tagline}</p>
      </div>
      <p className="text-[var(--dark-gray)] mb-6 leading-relaxed">{description}</p>
      <div className="bg-[var(--light-gray)] p-4 rounded-xl mb-6">
        <h5 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Ingredients</h5>
        <p className="text-sm text-[var(--dark-gray-alt)]">{ingredients}</p>
      </div>
      <ul className="space-y-2 mb-6">
        {benefits.map((benefit: string) => (
          <li key={benefit} className="flex gap-2 text-sm text-[var(--dark-gray-alt)]">
            <span className="font-bold flex-shrink-0" style={{ color: 'var(--green)' }}>✓</span>
            {benefit}
          </li>
        ))}
      </ul>
      <div className="bg-[var(--light-gray)] p-4 rounded-xl text-sm">
        <strong style={{ color: 'var(--dark-blue)' }}>Usage:</strong> <span className="text-[var(--dark-gray-alt)]">{usage}</span>
      </div>
    </div>
  );
}

// Kid Product Card Component
function KidProductCard({ icon, title, tagline, description, ingredients, benefits, borderColor, bgGradient }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl border-4" style={{ borderColor }}>
      <div className="text-5xl text-center mb-4">{icon}</div>
      <div className="p-6 rounded-2xl mb-6 text-white text-center" style={{ background: bgGradient }}>
        <h4 className="text-xl font-semibold mb-1">{title}</h4>
        <p className="text-sm opacity-95">{tagline}</p>
      </div>
      <p className="text-sm text-[var(--dark-gray)] mb-6 leading-relaxed">{description}</p>
      <div className="bg-[var(--light-gray)] p-4 rounded-xl mb-6">
        <h5 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--dark-blue)' }}>Key Ingredients</h5>
        <p className="text-sm text-[var(--dark-gray-alt)]">{ingredients}</p>
      </div>
      <ul className="space-y-2">
        {benefits.map((benefit: string) => (
          <li key={benefit} className="flex gap-2 text-sm text-[var(--dark-gray-alt)]">
            <span className="font-bold flex-shrink-0" style={{ color: 'var(--green)' }}>✓</span>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Image Carousel Component - Single Layer from Right
function ImageCarousel() {
  const backgroundImages = [
    '/background/apple.jpg',
    '/background/banana.jpg',
    '/background/beet.jpg',
    '/background/carrot.jpg',
    '/background/cucumber.jpg',
    '/background/fig.jpg',
    '/background/flaxseeds.jpg',
    '/background/ginger.jpg',
    '/background/greenapple.jpg',
    '/background/kiwi.jpg',
    '/background/lemon.jpg',
    '/background/orange.jpg',
    '/background/parsley.jpg',
    '/background/peach.jpg',
    '/background/pomogranete.jpg',
    '/background/spinach.jpg',
    '/background/strawberry.jpg',
  ];

  const thumbnails = useMemo(() => {
    const thumbnailCount = 80; // 20 columns x 4 rows = 80 images

    return Array.from({ length: thumbnailCount }, (_, thumbnailIndex) => {
      const imageIndex = thumbnailIndex % backgroundImages.length;
      return (
        <div
          key={thumbnailIndex}
          className="netflix-thumbnail"
          style={{
            backgroundImage: `url(${backgroundImages[imageIndex]})`
          }}
        />
      );
    });
  }, []);

  return (
    <div className="netflix-container-single">
      <div className="netflix-container-perspective-single">
        <div className="netflix-container-background-single">
          {thumbnails}
        </div>
      </div>
    </div>
  );
}

// Scroll to Top Component
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-14 h-14 rounded-full text-white text-2xl transition-all duration-300 shadow-lg z-50 ${
        visible ? 'opacity-100 visible' : 'opacity-0 invisible'
      } hover:scale-110 hover:shadow-2xl`}
      style={{ background: 'linear-gradient(135deg, var(--turquoise), var(--turquoise-alt))' }}
    >
      ↑
    </button>
  );
}
