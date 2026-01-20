'use client';

import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="privacy-page">
      <Navigation />

      {/* Content */}
      <main className="content-wrapper">
        <div className="container">
          <h1 className="page-title">{t.privacy.title}</h1>

          {/* Introduction */}
          <div className="intro-text">
            <p>{t.privacy.intro}</p>
          </div>

          {/* Company Information */}
          <section className="content-section">
            <h2 className="section-title">{t.privacy.companyInfo.title}</h2>
            <div className="info-list">
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
          <section className="content-section">
            <h2 className="section-title">{t.privacy.collected.title}</h2>
            <p className="section-intro">{t.privacy.collected.intro}</p>
            <ul className="bullet-list">
              {t.privacy.collected.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="section-outro">{t.privacy.collected.outro}</p>
          </section>

          {/* Processing Purposes */}
          <section className="content-section">
            <h2 className="section-title">{t.privacy.purposes.title}</h2>
            <p className="section-intro">{t.privacy.purposes.intro}</p>
            <ul className="bullet-list">
              {t.privacy.purposes.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="section-outro">{t.privacy.purposes.outro}</p>
          </section>

          {/* Data Transfer */}
          <section className="content-section">
            <h2 className="section-title">{t.privacy.transfer.title}</h2>
            <p className="section-intro">{t.privacy.transfer.intro}</p>
            <ul className="bullet-list">
              {t.privacy.transfer.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="section-outro">{t.privacy.transfer.outro}</p>
          </section>

          {/* Rights */}
          <section className="content-section">
            <h2 className="section-title">{t.privacy.rights.title}</h2>
            <p className="section-intro">{t.privacy.rights.intro}</p>
            <ul className="bullet-list">
              {t.privacy.rights.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="section-contact">{t.privacy.rights.contact}</p>
          </section>

          {/* Cookies */}
          <section className="content-section">
            <h2 className="section-title">{t.privacy.cookies.title}</h2>
            <p>{t.privacy.cookies.text}</p>
          </section>

          {/* Retention */}
          <section className="content-section">
            <h2 className="section-title">{t.privacy.retention.title}</h2>
            <p className="section-intro">{t.privacy.retention.intro}</p>
            <ul className="bullet-list">
              {t.privacy.retention.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="section-outro">{t.privacy.retention.outro}</p>
          </section>

          {/* Security */}
          <section className="content-section">
            <h2 className="section-title">{t.privacy.security.title}</h2>
            <p>{t.privacy.security.text}</p>
          </section>

          {/* Updates */}
          <section className="content-section">
            <h2 className="section-title">{t.privacy.updates.title}</h2>
            <p>{t.privacy.updates.text}</p>
          </section>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .privacy-page {
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
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }

        .intro-text {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #444;
          margin-bottom: 3rem;
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

        .section-intro,
        .section-outro {
          font-size: 1rem;
          line-height: 1.7;
          color: #444;
          margin-bottom: 1rem;
        }

        .section-contact {
          font-size: 1rem;
          line-height: 1.7;
          color: #1A4D5C;
          font-weight: 500;
          margin-top: 1rem;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: #444;
          font-size: 1rem;
          line-height: 1.6;
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
