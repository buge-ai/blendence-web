'use client';

import { useEffect, useState, useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

import Modal from './components/Modal';
import ProductCarousel from './components/ProductCarousel';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<{ title: string; description: string } | null>(null);

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
            <div className="flex items-center gap-6">
              <ul className="hidden md:flex gap-8">
                {[
                  { key: 'home', label: t.nav.home },
                  { key: 'about', label: t.nav.about },
                  { key: 'products', label: t.nav.products },
                  { key: 'technology', label: t.nav.technology },
                  { key: 'quality', label: t.nav.quality },
                  { key: 'contact', label: t.nav.contact }
                ].map((item) => (
                  <li key={item.key}>
                    <a
                      href={`#${item.key}`}
                      className="text-[var(--dark-gray)] font-medium hover:text-[var(--turquoise)] transition-colors duration-300 relative group"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--turquoise)] group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Language Toggle */}
              <div className="flex gap-2 border border-gray-300 rounded-full p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${language === 'en'
                    ? 'bg-[var(--turquoise)] text-white'
                    : 'text-[var(--dark-gray)] hover:bg-gray-100'
                    }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${language === 'tr'
                    ? 'bg-[var(--turquoise)] text-white'
                    : 'text-[var(--dark-gray)] hover:bg-gray-100'
                    }`}
                >
                  TR
                </button>
              </div>
            </div>
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
                {t.hero.subtitle}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-6" style={{ color: 'white' }}>
                {t.hero.title}
              </h1>
              <div className="flex gap-2 md:gap-3 mb-8">
                {[t.hero.natural, t.hero.vegan, t.hero.noSugar].map((badge) => (
                  <span key={badge} className="px-3 py-2 md:px-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
                    {badge}
                  </span>
                ))}
              </div>
              <p className="text-base md:text-lg mb-8 opacity-80 font-light max-w-2xl leading-relaxed">
                {t.hero.description}
              </p>
              <a
                href="#products"
                className="inline-block px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: 'var(--yellow)', color: 'var(--dark-blue)' }}
              >
                {t.hero.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Innovating Natural Nutrition */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>{t.about.title}</h2>
            <p className="text-lg text-[var(--dark-gray-alt)] font-light max-w-6xl mx-auto whitespace-pre-line">{t.about.subtitle}</p>
          </div>

          {/* 2x2 Grid with Images */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Top Left - Text on right side with fade from right to left on desktop, left to right on mobile */}
            <div className="relative h-80 rounded-2xl overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/innovate/founded.png')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-l from-black/90 via-black/70 to-transparent"></div>
              <div className="absolute inset-0 flex items-center md:justify-end justify-start p-8 md:p-12">
                <div className="text-left md:text-right max-w-md">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-white">{t.about.founded}</h3>
                  <p className="text-base md:text-lg opacity-95 drop-shadow-md text-white">{t.about.foundedDesc}</p>
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
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-white">{t.about.team}</h3>
                  <p className="text-base md:text-lg opacity-95 drop-shadow-md text-white">{t.about.teamDesc}</p>
                </div>
              </div>
            </div>

            {/* Bottom Left - Text on right side with fade from right to left on desktop, left to right on mobile */}
            <div className="relative h-80 rounded-2xl overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('/innovate/production-capacity.png')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r md:bg-gradient-to-l from-black/90 via-black/70 to-transparent"></div>
              <div className="absolute inset-0 flex items-center md:justify-end justify-start p-8 md:p-12">
                <div className="text-left md:text-right max-w-md">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-white">{t.about.capacity}</h3>
                  <p className="text-base md:text-lg opacity-95 drop-shadow-md text-white">{t.about.capacityDesc}</p>
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
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-white">{t.about.vision}</h3>
                  <p className="text-base md:text-lg opacity-95 drop-shadow-md text-white">{t.about.visionDesc}</p>
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
            <h2 className="text-5xl md:text-6xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>{t.why.title}</h2>
            <p className="text-xl text-[var(--dark-gray-alt)] font-light max-w-2xl mx-auto">{t.why.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t.why.marketLeader, desc: t.why.marketLeaderDesc },
              { title: t.why.advancedTech, desc: t.why.advancedTechDesc },
              { title: t.why.industrialScale, desc: t.why.industrialScaleDesc },
              { title: t.why.qualityAssurance, desc: t.why.qualityAssuranceDesc },
              { title: t.why.naturalSafe, desc: t.why.naturalSafeDesc },
              { title: t.why.sustainability, desc: t.why.sustainabilityDesc }
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
          {/* New Categories: STAGES, RESET, SHIELD */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>Product Categories</h3>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* STAGES */}
              <div className="group relative overflow-hidden rounded-3xl min-h-[400px] transition-all duration-500 hover:shadow-2xl border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 transition-transform duration-700 group-hover:scale-105"></div>

                <div className="relative h-full p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-4xl font-light mb-3 tracking-wide" style={{ color: 'var(--dark-blue)' }}>{t.products.stages.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-emerald-800/60">{t.products.stages.tagline}</p>
                    <p className="text-lg text-[var(--dark-gray)] font-light leading-relaxed opacity-90 line-clamp-2">
                      {t.products.stages.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-end mt-8">
                    <button
                      onClick={() => setSelectedCategory({ title: t.products.stages.title, description: t.products.stages.description })}
                      className="text-sm font-medium uppercase tracking-wider text-emerald-800 hover:text-emerald-950 transition-colors border-b border-emerald-800/30 hover:border-emerald-800 pb-1"
                    >
                      Read More
                    </button>
                    <div className="w-16 h-16 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/60 shadow-sm">
                      <span className="text-2xl opacity-80">🌱</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RESET */}
              <div className="group relative overflow-hidden rounded-3xl min-h-[400px] transition-all duration-500 hover:shadow-2xl border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-100 transition-transform duration-700 group-hover:scale-105"></div>

                <div className="relative h-full p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-4xl font-light mb-3 tracking-wide" style={{ color: 'var(--dark-blue)' }}>{t.products.reset.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-cyan-800/60">{t.products.reset.tagline}</p>
                    <p className="text-lg text-[var(--dark-gray)] font-light leading-relaxed opacity-90 line-clamp-2">
                      {t.products.reset.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-end mt-8">
                    <button
                      onClick={() => setSelectedCategory({ title: t.products.reset.title, description: t.products.reset.description })}
                      className="text-sm font-medium uppercase tracking-wider text-cyan-800 hover:text-cyan-950 transition-colors border-b border-cyan-800/30 hover:border-cyan-800 pb-1"
                    >
                      Read More
                    </button>
                    <div className="w-16 h-16 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/60 shadow-sm">
                      <span className="text-2xl opacity-80">💧</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SHIELD */}
              <div className="group relative overflow-hidden rounded-3xl min-h-[400px] transition-all duration-500 hover:shadow-2xl border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-red-100 transition-transform duration-700 group-hover:scale-105"></div>

                <div className="relative h-full p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-4xl font-light mb-3 tracking-wide" style={{ color: 'var(--dark-blue)' }}>{t.products.shield.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-orange-800/60">{t.products.shield.tagline}</p>
                    <p className="text-lg text-[var(--dark-gray)] font-light leading-relaxed opacity-90 line-clamp-2">
                      {t.products.shield.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-end mt-8">
                    <button
                      onClick={() => setSelectedCategory({ title: t.products.shield.title, description: t.products.shield.description })}
                      className="text-sm font-medium uppercase tracking-wider text-orange-800 hover:text-orange-950 transition-colors border-b border-orange-800/30 hover:border-orange-800 pb-1"
                    >
                      Read More
                    </button>
                    <div className="w-16 h-16 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/60 shadow-sm">
                      <span className="text-2xl opacity-80">🛡️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <Modal
            isOpen={!!selectedCategory}
            onClose={() => setSelectedCategory(null)}
            title={selectedCategory?.title || ''}
          >
            <p className="text-lg text-[var(--dark-gray)] font-light leading-relaxed whitespace-pre-wrap">
              {selectedCategory?.description}
            </p>
          </Modal>


          {/* Product Images Carousel */}
          <div className="my-32">
            <ProductCarousel
              images={[
                '/product/kutu-saşe-mockup1.jpg',
                '/product/on.jpg',
                '/product/sachet_mockup_design4.jpg'
              ]}
              autoPlayInterval={4000}
            />
          </div>

          {/* Additional Products */}
          <div>
            <h3 className="text-4xl md:text-5xl font-light mb-16 text-center" style={{ color: 'var(--dark-blue)' }}>{t.products.additionalTitle}</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-[var(--light-gray)] rounded-lg p-10 border border-gray-100 transition-all duration-300 hover:shadow-lg">
                <h4 className="text-2xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>{t.products.fruitSlices.title}</h4>
                <p className="text-base text-[var(--dark-gray)] font-light leading-relaxed">
                  {t.products.fruitSlices.description}
                </p>
              </div>
              <div className="bg-[var(--light-gray)] rounded-lg p-10 border border-gray-100 transition-all duration-300 hover:shadow-lg">
                <h4 className="text-2xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>{t.products.fruitPowders.title}</h4>
                <p className="text-base text-[var(--dark-gray)] font-light leading-relaxed">
                  {t.products.fruitPowders.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Technology Section - Freeze Drying Technology */}
      < section id="technology" className="py-32 bg-white" >
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
      </section >

      {/* Quality/Certifications Section */}
      < section id="quality" className="py-16 bg-white" >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-light mb-6" style={{ color: 'var(--dark-blue)' }}>{t.quality.title}</h2>
            <p className="text-xl text-[var(--dark-gray-alt)] font-light max-w-2xl mx-auto">{t.quality.subtitle}</p>
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
      </section >

      {/* Contact Section */}
      < section id="contact" className="py-32 bg-gradient-to-br from-[var(--dark-blue)] to-[var(--turquoise)] text-white" >
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
      </section >

      {/* Footer */}
      < footer className="py-16 bg-[var(--dark-blue)] text-white text-center" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-2">{t.footer.brand}</h3>
          <p className="mb-1 opacity-90">{t.footer.tagline}</p>
          <p className="text-sm opacity-70 mb-6">{t.footer.company}</p>
          <p className="opacity-80 mb-4">{t.footer.badges}</p>
          <div className="flex justify-center gap-6 mb-4">
            <a href="/privacy" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
              {t.footer.privacy}
            </a>
            <a href="/terms" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
              {t.footer.terms}
            </a>
          </div>
          <p className="text-sm opacity-60">{t.footer.copyright}</p>
        </div>
      </footer >

      {/* Scroll to Top Button */}
      < ScrollToTop />
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
      className={`fixed bottom-8 right-8 w-14 h-14 rounded-full text-white text-2xl transition-all duration-300 shadow-lg z-50 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'
        } hover:scale-110 hover:shadow-2xl`}
      style={{ background: 'linear-gradient(135deg, var(--turquoise), var(--turquoise-alt))' }}
    >
      ↑
    </button>
  );
}
