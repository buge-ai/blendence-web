'use client';

import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function PrivacyPage() {
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

      {/* Content */}
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light mb-8" style={{ color: 'var(--dark-blue)' }}>
            {t.privacy.title}
          </h1>

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-lg text-[var(--dark-gray)] leading-relaxed">
              {t.privacy.intro}
            </p>
          </div>

          {/* Company Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              {t.privacy.companyInfo.title}
            </h2>
            <div className="space-y-2 text-[var(--dark-gray)]">
              <p>{t.privacy.companyInfo.trade}</p>
              <p>{t.privacy.companyInfo.mersis}</p>
              <p>{t.privacy.companyInfo.registry}</p>
              <p>{t.privacy.companyInfo.business}</p>
              <p>{t.privacy.companyInfo.headquarters}</p>
              <p>{t.privacy.companyInfo.facility}</p>
              <p>{t.privacy.companyInfo.email}</p>
              <p>{t.privacy.companyInfo.web}</p>
            </div>
          </section>

          {/* Collected Data */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              {t.privacy.collected.title}
            </h2>
            <p className="text-[var(--dark-gray)] mb-3">{t.privacy.collected.intro}</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--dark-gray)] ml-4">
              {t.privacy.collected.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-[var(--dark-gray)] mt-3">{t.privacy.collected.outro}</p>
          </section>

          {/* Processing Purposes */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              {t.privacy.purposes.title}
            </h2>
            <p className="text-[var(--dark-gray)] mb-3">{t.privacy.purposes.intro}</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--dark-gray)] ml-4">
              {t.privacy.purposes.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-[var(--dark-gray)] mt-3">{t.privacy.purposes.outro}</p>
          </section>

          {/* Data Transfer */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              {t.privacy.transfer.title}
            </h2>
            <p className="text-[var(--dark-gray)] mb-3">{t.privacy.transfer.intro}</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--dark-gray)] ml-4">
              {t.privacy.transfer.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-[var(--dark-gray)] mt-3">{t.privacy.transfer.outro}</p>
          </section>

          {/* Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              {t.privacy.rights.title}
            </h2>
            <p className="text-[var(--dark-gray)] mb-3">{t.privacy.rights.intro}</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--dark-gray)] ml-4">
              {t.privacy.rights.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-[var(--dark-gray)] mt-4 font-medium">{t.privacy.rights.contact}</p>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              {t.privacy.cookies.title}
            </h2>
            <p className="text-[var(--dark-gray)]">{t.privacy.cookies.text}</p>
          </section>

          {/* Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              {t.privacy.retention.title}
            </h2>
            <p className="text-[var(--dark-gray)] mb-3">{t.privacy.retention.intro}</p>
            <ul className="list-disc list-inside space-y-2 text-[var(--dark-gray)] ml-4">
              {t.privacy.retention.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-[var(--dark-gray)] mt-3">{t.privacy.retention.outro}</p>
          </section>

          {/* Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              {t.privacy.security.title}
            </h2>
            <p className="text-[var(--dark-gray)]">{t.privacy.security.text}</p>
          </section>

          {/* Updates */}
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
              {t.privacy.updates.title}
            </h2>
            <p className="text-[var(--dark-gray)]">{t.privacy.updates.text}</p>
          </section>
        </div>
      </main>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
}
