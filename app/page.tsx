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

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/98 shadow-lg' : 'bg-white/95 shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold tracking-wide" style={{ color: 'var(--dark-blue)' }}>
              BLENDENCE
            </div>
            <ul className="hidden md:flex gap-8">
              {['Home', 'About', 'Technology', 'Products', 'Quality', 'Contact'].map((item) => (
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
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-blue)] via-[var(--dark-blue-alt)] to-[var(--turquoise)]"></div>

        {/* Image Carousel - Full Background */}
        <div className="absolute inset-0 hidden lg:block">
          <ImageCarousel />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 lg:h-64 z-20">
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="relative z-10 w-full h-full flex items-center">
          <div className="w-full px-8 sm:px-12 lg:px-16">
            {/* Content - Left side, using full left area */}
            <div className="text-white animate-[fadeInUp_1s_ease]">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6" style={{ color: 'white' }}>
                Naturally Powerful,<br />Perfectly Balanced
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-95 font-light max-w-3xl">
                Turkey's First 100% Freeze-Dried Nutritional Mix Brand
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                {['100% Natural', '100% Vegan', 'No Added Sugar'].map((badge) => (
                  <span key={badge} className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-sm font-medium">
                    {badge}
                  </span>
                ))}
              </div>
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

      {/* About Section */}
      <section id="about" className="py-24 bg-[var(--light-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>Innovating Natural Nutrition</h2>
            <p className="text-lg text-[var(--dark-gray-alt)] font-light">BUGE GIDA A.Ş. - Leading the freeze-dried revolution</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🏢', title: 'Founded 2024', desc: 'Located in Trakya Teknopark, Edirne, with state-of-the-art production facilities' },
              { icon: '👨‍🔬', title: 'Expert Team', desc: 'Founded by 2 food engineers (1 Assoc. Prof., 1 PhD) and 1 control automation engineer' },
              { icon: '🌍', title: 'Global Vision', desc: 'Expanding to 3 new EU markets with EUREKA Innowwide feasibility project' },
              { icon: '🏭', title: 'Production Capacity', desc: '2,000-2,200 sachets daily with advanced freeze-drying technology' }
            ].map((card) => (
              <div key={card.title} className="bg-white p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-xl">
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--dark-blue)' }}>{card.title}</h3>
                <p className="text-sm text-[var(--dark-gray-alt)]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 bg-gradient-to-br from-[var(--purple-gray)] to-[var(--light-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>Freeze Drying Technology</h2>
            <p className="text-lg text-[var(--dark-gray-alt)] font-light">Preserving nature's power through innovation</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="bg-white p-10 rounded-2xl text-center shadow-xl">
              <div className="text-6xl mb-4">❄️</div>
              <h3 className="text-2xl font-semibold mb-3" style={{ color: 'var(--turquoise)' }}>Lyophilization Process</h3>
              <p className="text-[var(--dark-gray-alt)]">Products are frozen and dehydrated under vacuum through sublimation</p>
            </div>
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--dark-blue)' }}>Superior Advantages</h3>
              <ul className="space-y-6">
                {[
                  { title: 'Nutrient Preservation', desc: 'Retains vitamins, minerals, amino acids, and color compounds' },
                  { title: 'Minimal Loss', desc: 'Less than 5% nutrient loss vs. 40-60% in traditional drying methods' },
                  { title: 'No Heat Damage', desc: 'Drying without high-temperature exposure' },
                  { title: 'Extended Shelf Life', desc: 'No preservatives needed, minimizes microbial growth risk' },
                  { title: 'No Cold Chain Required', desc: 'Simple and economical distribution and storage' }
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="text-2xl font-bold flex-shrink-0" style={{ color: 'var(--green)' }}>✓</span>
                    <div>
                      <strong className="block mb-1" style={{ color: 'var(--dark-blue)' }}>{item.title}</strong>
                      <p className="text-sm text-[var(--dark-gray-alt)]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>Our Product Range</h2>
            <p className="text-lg text-[var(--dark-gray-alt)] font-light">Scientifically formulated for optimal health benefits</p>
          </div>

          {/* Adult Products */}
          <div className="mb-20">
            <h3 className="text-3xl font-semibold text-center mb-10" style={{ color: 'var(--dark-blue)' }}>Adult Mix Series</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <ProductCard
                title="Green Mix"
                tagline="Natural Detox Boost"
                description="Natural immunity support with no sugar and no additives. Powerful detox effect with natural vitamin C."
                ingredients="Green Apple • Spinach • Lemon • Ginger • Cucumber • Parsley • Natural Plant Fiber"
                benefits={[
                  'Detox effect with edema reduction',
                  'Natural vitamin C for immunity',
                  'Fiber for digestive support',
                  'Low calorie, antioxidant-rich'
                ]}
                usage="Mix 15g sachet with 250ml hot or cold water"
                borderColor="var(--green)"
                bgGradient="linear-gradient(135deg, var(--green), var(--green-alt))"
              />
              <ProductCard
                title="Red Mix"
                tagline="Immunity Powerhouse"
                description="Powerful antioxidant blend to strengthen the immune system with naturally freeze-dried ingredients."
                ingredients="Beet • Carrot • Apple • Pomegranate"
                benefits={[
                  'Rich in antioxidants',
                  'Strengthens immune system',
                  'Natural vitamin and mineral source',
                  'Supports cardiovascular health'
                ]}
                usage="Weekly box (7 sachets)"
                borderColor="var(--red)"
                bgGradient="linear-gradient(135deg, var(--red), var(--red-alt))"
              />
            </div>
          </div>

          {/* Children's Products */}
          <div className="mb-20">
            <h3 className="text-3xl font-semibold text-center mb-4" style={{ color: 'var(--dark-blue)' }}>Age-Specific Children's Mix Series</h3>
            <p className="text-center text-[var(--dark-gray-alt)] max-w-3xl mx-auto mb-10">
              Designed based on nutritional needs of each age group and which plants contain these nutrients. While we target specific age groups, everyone can use all products.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <KidProductCard
                icon="🍌"
                title="Children's Mix (Ages 4-7)"
                tagline="Growth & Immunity Focus"
                description="Appeals to young children's preference for sweet flavors. Fruits like grape, orange, peach, and banana offer both delicious taste and energy-providing carbohydrates."
                ingredients="Grape • Orange • Peach • Banana • Orange Peel"
                benefits={[
                  'Essential vitamins (C, A) and minerals (potassium)',
                  'Digestive support with fiber',
                  'Energy support for preschool activities',
                  'Sweet profile increases acceptance'
                ]}
                borderColor="var(--yellow)"
                bgGradient="linear-gradient(135deg, var(--yellow), var(--yellow-alt))"
              />
              <KidProductCard
                icon="🍎"
                title="Junior Mix (Ages 8-12)"
                tagline="Mental Development & School Performance"
                description="Targets the transition from early childhood to pre-teen. Apple and banana maintain sweetness, while carrot and lemon strengthen immunity."
                ingredients="Apple • Banana • Carrot • Lemon • Orange Peel"
                benefits={[
                  'Energy for rapid growth (carbohydrates)',
                  'Vitamins (C, A) supporting school performance',
                  'Develops palate with slightly acidic tastes',
                  'More complex profile for dietary diversity'
                ]}
                borderColor="var(--turquoise)"
                bgGradient="linear-gradient(135deg, var(--turquoise), var(--turquoise-alt))"
              />
              <KidProductCard
                icon="🧠"
                title="Youth Mix (Ages 13-18)"
                tagline="Energy, Concentration & Active Life Support"
                description="Intensive nutritional profile suitable for adolescence. Strawberry and grape support memory with antioxidants."
                ingredients="Strawberry • Grape • Kiwi • Lemon • Banana • Flaxseed"
                benefits={[
                  'Focus-enhancing antioxidants (flavonoids)',
                  'Cognitive support with omega-3',
                  'Long-lasting energy',
                  'Balanced mix for independent nutrition habits'
                ]}
                borderColor="var(--dark-blue)"
                bgGradient="linear-gradient(135deg, var(--dark-blue), var(--dark-blue-alt))"
              />
            </div>
          </div>

          {/* Additional Products */}
          <div>
            <h3 className="text-3xl font-semibold text-center mb-10" style={{ color: 'var(--dark-blue)' }}>Additional Product Lines</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border-4 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl" style={{ borderColor: 'var(--purple-gray-alt)' }}>
                <div className="text-5xl text-center mb-4">🥤</div>
                <h4 className="text-xl font-semibold mb-4 text-center" style={{ color: 'var(--dark-blue)' }}>Freeze-Dried Fruit Slices</h4>
                <p className="text-[var(--dark-gray-alt)]">Healthy snack alternatives in convenient sachets. Classic freeze-dried fruit slices offering a nutritious and practical snacking option.</p>
              </div>
              <div className="bg-white border-4 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl" style={{ borderColor: 'var(--purple-gray-alt)' }}>
                <div className="text-5xl text-center mb-4">🏭</div>
                <h4 className="text-xl font-semibold mb-4 text-center" style={{ color: 'var(--dark-blue)' }}>Natural Fruit Powders for Food Industry</h4>
                <p className="text-[var(--dark-gray-alt)]">Premium ingredients for the food industry. A natural, healthy alternative instead of chemical or synthetic flavors and colorings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality/Certifications Section */}
      <section id="quality" className="py-24 bg-gradient-to-br from-[var(--light-gray)] to-[var(--purple-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>Quality & Certifications</h2>
            <p className="text-lg text-[var(--dark-gray-alt)] font-light">Meeting the highest international standards</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
              <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--dark-blue)' }}>Current Certifications</h3>
              <div className="space-y-4">
                {['ISO 9001', 'ISO 22000', 'HACCP'].map((cert) => (
                  <div key={cert} className="px-6 py-4 rounded-xl text-white font-semibold text-lg shadow-md" style={{ background: 'linear-gradient(135deg, var(--turquoise), var(--turquoise-alt))' }}>
                    {cert}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
              <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--dark-blue)' }}>Coming Soon</h3>
              <div className="px-6 py-4 rounded-xl text-white font-semibold text-lg shadow-md" style={{ background: 'linear-gradient(135deg, var(--yellow), var(--yellow-alt))' }}>
                <div>FSSC 22000</div>
                <div className="text-sm font-normal mt-1 opacity-90">Expected December</div>
                <div className="text-xs font-normal mt-1 opacity-75">(Highly prestigious in global markets)</div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
              <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--dark-blue)' }}>Future Plans</h3>
              <div className="px-6 py-4 rounded-xl text-white font-semibold text-lg shadow-md" style={{ background: 'linear-gradient(135deg, var(--dark-blue), var(--dark-blue-alt))' }}>
                <div>BRC</div>
                <div className="text-sm font-normal mt-1 opacity-90">(For UK market entry)</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl text-center shadow-lg mb-8">
            <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--dark-blue)' }}>🔬 Dedicated Laboratory</h3>
            <p className="text-[var(--dark-gray-alt)]">In addition to production, we operate a specialized laboratory with 2 associate professor-level food engineers ensuring the highest quality standards.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl text-center shadow-lg">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--dark-blue)' }}>Backed By</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['TÜBİTAK', 'Trakya Development Agency', 'Private Investor Support'].map((backer) => (
                <span key={backer} className="px-6 py-2 bg-[var(--light-gray)] rounded-full font-medium text-sm" style={{ color: 'var(--dark-blue)' }}>
                  {backer}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>Why BLENDENCE?</h2>
            <p className="text-lg text-[var(--dark-gray-alt)] font-light">Our competitive edge in the market</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Market Leader', desc: "Turkey's only brand in the 100% freeze-dried mix segment" },
              { num: '02', title: 'Advanced Technology', desc: 'State-of-the-art freeze drying infrastructure with R&D capabilities' },
              { num: '03', title: 'Industrial Scale', desc: '2,000+ sachets daily production capacity for B2C and B2B markets' },
              { num: '04', title: 'Quality Assurance', desc: 'International certifications and dedicated quality laboratory' },
              { num: '05', title: 'Natural & Safe', desc: '100% natural, functional products with no additives or preservatives' },
              { num: '06', title: 'Sustainability Focus', desc: 'Innovation-driven approach with environmental responsibility' }
            ].map((adv) => (
              <div key={adv.num} className="bg-gradient-to-br from-white to-[var(--light-gray)] p-8 rounded-2xl border-l-4 transition-all duration-300 hover:translate-x-3 hover:shadow-xl" style={{ borderColor: 'var(--turquoise)' }}>
                <div className="text-4xl font-bold mb-4 opacity-30" style={{ color: 'var(--turquoise)' }}>{adv.num}</div>
                <h4 className="text-xl font-semibold mb-3" style={{ color: 'var(--dark-blue)' }}>{adv.title}</h4>
                <p className="text-sm text-[var(--dark-gray-alt)]">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-[var(--dark-blue)] to-[var(--turquoise)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get in Touch</h2>
            <p className="text-lg font-light opacity-95">Let's discuss partnership and investment opportunities</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { title: 'Headquarters', content: 'Trakya Teknopark\nTrakya University Technology Development Zone\nEdirne, Turkey' },
                { title: 'Production Facility', content: 'Hasan Pehlivan Cd. No:1/D\nHavsa / Edirne' },
                { title: 'Contact', content: 'Email: contact@bugefoods.com\nPhone: +90 540 022 3922\nWeb: www.bugefoods.com' }
              ].map((item) => (
                <div key={item.title} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                  <h4 className="text-xl font-semibold mb-3" style={{ color: 'var(--yellow)' }}>{item.title}</h4>
                  <p className="whitespace-pre-line leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--yellow)' }}>Investment Opportunities</h3>
              <p className="mb-6 leading-relaxed">We're expanding into European markets and seeking strategic partners and investors to accelerate our growth.</p>
              <ul className="space-y-3">
                {[
                  'Proven technology and production capabilities',
                  'First-mover advantage in freeze-dried mix segment',
                  'Strong B2C and B2B revenue streams',
                  'International expansion ready'
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="font-bold flex-shrink-0" style={{ color: 'var(--yellow)' }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
    '/background/banana.jpg',
    '/background/strawberry.jpg',
    '/background/kiwi.jpg',
    '/background/orange.jpg',
    '/background/peach.jpg',
    '/background/spinach.jpg',
    '/background/flaxseeds.jpg',
    '/background/fig.jpg',
  ];

  const thumbnails = useMemo(() => {
    const thumbnailCount = 20;

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
