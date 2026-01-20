'use client';

import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function FoodSafetyPage() {
    const { t } = useLanguage();
    const p = t.foodSafetyPage;

    return (
        <div className="food-safety-page">
            <Navigation />

            {/* Content */}
            <main className="content-wrapper">
                <div className="container">
                    <h1 className="page-title">{p.title}</h1>
                    <p className="policy-subtitle">{p.policyTitle}</p>

                    <div className="content-body">
                        {p.paragraphs.map((paragraph: string, index: number) => (
                            <p key={index} className="paragraph">{paragraph}</p>
                        ))}

                        <p className="signature">{p.signature}</p>
                    </div>
                </div>
            </main>

            <Footer />

            <style jsx>{`
        .food-safety-page {
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

        .policy-subtitle {
          font-size: 1.25rem;
          font-weight: 500;
          color: #5ba679;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #eee;
        }

        .content-body {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .paragraph {
          font-size: 1rem;
          line-height: 1.8;
          color: #444;
        }

        .signature {
          font-size: 1rem;
          font-weight: 600;
          color: #1A4D5C;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #eee;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 6rem 1rem 4rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .policy-subtitle {
            font-size: 1.125rem;
          }
        }
      `}</style>
        </div>
    );
}
