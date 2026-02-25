'use client';

import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="policy-page">
      <Navigation />

      <main className="content-wrapper">
        <div className="container">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="last-updated">Last updated: 13.01.2026</p>

          <section className="content-section">
            <h2 className="section-title">1. Introduction</h2>
            <p>This Privacy Policy explains how Blendence ("we", "our", or "us") collects, uses, and protects personal data when you visit our website.</p>
            <p>We are committed to handling personal data responsibly and in accordance with applicable data protection laws, including the GDPR and Turkish data protection regulations (KVKK).</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">2. Information We Collect</h2>
            <p>When you use our website, we may collect limited personal information, including:</p>
            <ul className="bullet-list">
              <li>Basic technical data (such as IP address, browser type, and device information)</li>
              <li>Information you voluntarily provide through contact forms or inquiries</li>
            </ul>
            <p>We do not intentionally collect sensitive personal data.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">3. How We Use Your Information</h2>
            <p>Collected information may be used to:</p>
            <ul className="bullet-list">
              <li>Respond to inquiries or messages</li>
              <li>Improve website functionality and user experience</li>
              <li>Ensure website security and performance</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>Personal data is not used for automated decision-making or profiling.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">4. Data Sharing</h2>
            <p>We do not sell or rent personal data to third parties.</p>
            <p>Personal data may be shared only when necessary:</p>
            <ul className="bullet-list">
              <li>With service providers supporting website functionality</li>
              <li>To comply with legal or regulatory requirements</li>
            </ul>
            <p>All such parties are required to handle data securely and confidentially.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">5. Data Retention</h2>
            <p>Personal data is retained only for as long as necessary to fulfill the purposes outlined in this policy or as required by applicable laws.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">6. Your Rights</h2>
            <p>Depending on applicable law, you may have the right to:</p>
            <ul className="bullet-list">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Object to certain processing activities</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p>Requests can be made by contacting us using the details below.</p>
          </section>

          <div className="divider"></div>

          <h2 className="page-subtitle">Cookies Policy</h2>

          <section className="content-section">
            <h2 className="section-title">7. Use of Cookies</h2>
            <p>Our website uses cookies and similar technologies to ensure basic functionality and improve user experience.</p>
            <p>Cookies may be used to:</p>
            <ul className="bullet-list">
              <li>Remember user preferences</li>
              <li>Analyze website usage in an aggregated and anonymous manner</li>
              <li>Ensure website security</li>
            </ul>
            <p>We do not use cookies for intrusive advertising or tracking across external websites.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">8. Managing Cookies</h2>
            <p>You can control or disable cookies through your browser settings.</p>
            <p>Please note that disabling certain cookies may affect website functionality.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">9. Updates to This Policy</h2>
            <p>We may update this Privacy Policy from time to time.</p>
            <p>Any changes will be published on this page with an updated revision date.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">10. Contact</h2>
            <p>If you have questions about this Privacy Policy or how your data is handled, please contact us at:</p>
            <p className="contact-email">contact@bugefoods.com</p>
          </section>
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

        .page-subtitle {
          font-size: 2rem;
          font-weight: 600;
          color: #1A4D5C;
          margin-bottom: 2rem;
        }

        .divider {
          height: 1px;
          background: #eee;
          margin: 3rem 0;
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

          .page-subtitle {
            font-size: 1.5rem;
          }

          .section-title {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </div>
  );
}
