'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function TermsPage() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/98 shadow-lg">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex-shrink-0">
              <img src="/logo.png" alt="BLENDENCE" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-[var(--dark-gray)] font-medium hover:text-[var(--turquoise)] transition-colors duration-300"
              >
                {language === 'en' ? 'Back to Home' : 'Ana Sayfaya Dön'}
              </Link>
              {/* Language Toggle */}
              <div className="flex gap-2 border border-gray-300 rounded-full p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-[var(--turquoise)] text-white'
                      : 'text-[var(--dark-gray)] hover:bg-gray-100'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    language === 'tr'
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

      {/* Content */}
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light mb-12" style={{ color: 'var(--dark-blue)' }}>
            {t.terms.title}
          </h1>

          {/* Definitions */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              1. {t.terms.definitions.title}
            </h2>
            <p className="text-[var(--dark-gray)] leading-relaxed whitespace-pre-line">
              {t.terms.definitions.text}
            </p>
          </section>

          {/* Acceptance */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              2. {t.terms.acceptance.title}
            </h2>
            <p className="text-[var(--dark-gray)] leading-relaxed whitespace-pre-line">
              {t.terms.acceptance.text}
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              3. {t.terms.ip.title}
            </h2>
            <p className="text-[var(--dark-gray)] leading-relaxed whitespace-pre-line">
              {t.terms.ip.text}
            </p>
          </section>

          {/* Responsibility */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              4. {t.terms.responsibility.title}
            </h2>
            <p className="text-[var(--dark-gray)] leading-relaxed whitespace-pre-line">
              {t.terms.responsibility.text}
            </p>
          </section>

          {/* Accuracy */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              5. {t.terms.accuracy.title}
            </h2>
            <p className="text-[var(--dark-gray)] leading-relaxed whitespace-pre-line">
              {t.terms.accuracy.text}
            </p>
          </section>

          {/* Third Party */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              6. {t.terms.thirdParty.title}
            </h2>
            <p className="text-[var(--dark-gray)] leading-relaxed whitespace-pre-line">
              {t.terms.thirdParty.text}
            </p>
          </section>

          {/* Enforcement */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              7. {t.terms.enforcement.title}
            </h2>
            <p className="text-[var(--dark-gray)] leading-relaxed whitespace-pre-line">
              {t.terms.enforcement.text}
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-16 bg-[var(--dark-blue)] text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-2">{t.footer.brand}</h3>
          <p className="mb-1 opacity-90">{t.footer.tagline}</p>
          <p className="text-sm opacity-70 mb-6">{t.footer.company}</p>
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/privacy" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
              {t.footer.terms}
            </Link>
          </div>
          <p className="text-sm opacity-60">{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
