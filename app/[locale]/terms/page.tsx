'use client';

import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export default function TermsPage() {
  return (
    <div className="policy-page">
      <Navigation />

      <main className="content-wrapper">
        <div className="container">
          <h1 className="page-title">Terms of Use</h1>
          <p className="last-updated">Last updated: 05.01.2026</p>

          <section className="content-section">
            <h2 className="section-title">1. Acceptance of Terms</h2>
            <p>By accessing and using the Blendence website ("Website"), you agree to be bound by these Terms of Use.</p>
            <p>If you do not agree with these terms, please do not use the Website.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">2. Use of the Website</h2>
            <p>The Website is provided for informational purposes only.</p>
            <p>You may use the Website for personal, non-commercial use, provided that you do not violate these Terms or applicable laws.</p>
            <p>You agree not to:</p>
            <ul className="bullet-list">
              <li>Misuse or interfere with the Website's operation</li>
              <li>Attempt to gain unauthorized access to any part of the Website</li>
              <li>Use the content for unlawful or misleading purposes</li>
            </ul>
          </section>

          <section className="content-section">
            <h2 className="section-title">3. Content Disclaimer</h2>
            <p>The information provided on this Website is not intended as medical advice, diagnosis, or treatment.</p>
            <p>Blendence products are food products and are not medicines.</p>
            <p>Always consult a qualified professional for individual dietary or health-related questions.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">4. Intellectual Property</h2>
            <p>All content on this Website, including text, visuals, logos, and design elements, is the property of Blendence or its licensors and is protected by applicable intellectual property laws.</p>
            <p>You may not reproduce, distribute, or modify any content without prior written permission.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">5. Third-Party Links</h2>
            <p>The Website may contain links to third-party websites for informational purposes.</p>
            <p>Blendence is not responsible for the content, accuracy, or practices of such third-party websites.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">6. Limitation of Liability</h2>
            <p>Blendence shall not be liable for any direct or indirect damages arising from the use of, or inability to use, the Website or its content.</p>
            <p>Use of the Website is at your own risk.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">7. Changes to These Terms</h2>
            <p>Blendence reserves the right to update or modify these Terms of Use at any time.</p>
            <p>Changes will become effective upon publication on the Website.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">8. Governing Law</h2>
            <p>These Terms of Use shall be governed by and construed in accordance with the laws of the Republic of Türkiye, without regard to conflict of law principles.</p>
          </section>

          <section className="content-section">
            <h2 className="section-title">9. Contact</h2>
            <p>For questions regarding these Terms of Use, please contact us at:</p>
            <p className="contact-email">contact@bugefoods.com</p>
          </section>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .policy-page {
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
