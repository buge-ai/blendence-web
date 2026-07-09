'use client';

import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

type PolicySection = {
  title: string;
  subheading?: string;
  content: string[];
  bullets?: string[];
  contentAfter?: string[];
  email?: string;
};

export default function TermsPage() {
  const { t } = useLanguage();
  const p = t.termsPage;

  return (
    <div className="policy-page">
      <Navigation />

      <main className="content-wrapper">
        <div className="container">
          <h1 className="page-title">{p.title}</h1>
          <p className="last-updated">{p.lastUpdated}</p>

          {(p.sections as PolicySection[]).map((section, i) => (
            <div key={i}>
              {section.subheading && (
                <>
                  <div className="divider" />
                  <h2 className="page-subtitle">{section.subheading}</h2>
                </>
              )}
              <section className="content-section">
                <h2 className="section-title">{section.title}</h2>
                {section.content.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
                {section.bullets && (
                  <ul className="bullet-list">
                    {section.bullets.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.contentAfter?.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
                {section.email && <p className="contact-email">{section.email}</p>}
              </section>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .policy-page {
          background-color: #ffffff;
          color: #111;
          font-family: var(--font-montserrat), 'Montserrat', sans-serif;
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
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .last-updated {
          font-size: 0.95rem;
          color: #666;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #eee;
        }

        .content-section {
          margin-bottom: 2.5rem;
        }

        .section-title {
          font-size: 1.35rem;
          font-weight: 600;
          color: #1A4D5C;
          margin-bottom: 1rem;
        }

        .content-section p {
          font-size: 1rem;
          line-height: 1.8;
          color: #444;
          margin-bottom: 0.75rem;
        }

        .bullet-list {
          list-style: disc;
          padding-left: 1.5rem;
          margin: 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .bullet-list li {
          font-size: 1rem;
          line-height: 1.6;
          color: #444;
        }

        .contact-email {
          font-weight: 600;
          color: #1A4D5C;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 6rem 1rem 4rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </div>
  );
}
