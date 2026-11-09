'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import Navigation from './Navigation';
import Footer from './Footer';

// Presentational 404 page. It reads the language from the surrounding
// LanguageProvider, so it renders in the right language on the SERVER:
//  - under /[locale]/… via app/[locale]/not-found.tsx (LocaleLayout provides it)
//  - for URLs outside any locale via app/not-found.tsx (English provider)
export default function NotFoundContent() {
  const { t, language } = useLanguage();
  const p = t.notFoundPage;

  return (
    <div className="nf-page">
      <Navigation />

      <main className="nf-main">
        <div className="nf-box">
          <p className="nf-code" aria-hidden="true">{p.code}</p>
          <h1 className="nf-title font-display">{p.title}</h1>
          <p className="nf-text">{p.text}</p>
          <Link href={`/${language}`} className="btn-primary">
            {p.button}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .nf-page {
          background-color: var(--surface);
          color: var(--text-body);
          font-family: var(--font-body-family);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .nf-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 9rem 1.5rem 6rem;
          text-align: center;
        }

        .nf-code {
          margin: 0;
          font-size: clamp(5rem, 16vw, 9rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--petrol);
          opacity: 0.14;
        }

        .nf-title {
          margin: 0.25rem 0 1rem;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: var(--text-heading);
        }

        .nf-text {
          max-width: 30em;
          margin: 0 auto 2rem;
          font-size: 1.1rem;
          line-height: 1.7;
        }
      `}</style>
    </div>
  );
}
