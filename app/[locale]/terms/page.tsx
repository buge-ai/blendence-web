'use client';

import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="terms-page">
      <Navigation />

      {/* Content */}
      <main className="content-wrapper">
        <div className="container">
          <h1 className="page-title">{t.terms.title}</h1>

          {/* Definitions */}
          <section className="content-section">
            <h2 className="section-title">1. {t.terms.definitions.title}</h2>
            <p className="section-text">{t.terms.definitions.text}</p>
          </section>

          {/* Acceptance */}
          <section className="content-section">
            <h2 className="section-title">2. {t.terms.acceptance.title}</h2>
            <p className="section-text">{t.terms.acceptance.text}</p>
          </section>

          {/* Intellectual Property */}
          <section className="content-section">
            <h2 className="section-title">3. {t.terms.ip.title}</h2>
            <p className="section-text">{t.terms.ip.text}</p>
          </section>

          {/* Responsibility */}
          <section className="content-section">
            <h2 className="section-title">4. {t.terms.responsibility.title}</h2>
            <p className="section-text">{t.terms.responsibility.text}</p>
          </section>

          {/* Accuracy */}
          <section className="content-section">
            <h2 className="section-title">5. {t.terms.accuracy.title}</h2>
            <p className="section-text">{t.terms.accuracy.text}</p>
          </section>

          {/* Third Party */}
          <section className="content-section">
            <h2 className="section-title">6. {t.terms.thirdParty.title}</h2>
            <p className="section-text">{t.terms.thirdParty.text}</p>
          </section>

          {/* Enforcement */}
          <section className="content-section">
            <h2 className="section-title">7. {t.terms.enforcement.title}</h2>
            <p className="section-text">{t.terms.enforcement.text}</p>
          </section>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .terms-page {
          background-color: #ffffff;
          color: #111;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .content-wrapper {
          padding: 8rem 2rem 6rem;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 600;
          color: #1A4D5C;
          margin-bottom: 3rem;
          letter-spacing: -0.02em;
          padding-bottom: 2rem;
          border-bottom: 1px solid #eee;
        }

        .content-section {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1A4D5C;
          margin-bottom: 1rem;
        }

        .section-text {
          font-size: 1rem;
          line-height: 1.8;
          color: #444;
          white-space: pre-line;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 6rem 1rem 4rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
