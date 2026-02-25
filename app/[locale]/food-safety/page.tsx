'use client';

import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export default function FoodSafetyPage() {
  return (
    <div className="policy-page">
      <Navigation />

      <main className="content-wrapper">
        <div className="container">
          <h1 className="page-title">Food Safety and Quality Policy</h1>
          <p className="policy-badge">FSSC 22000 FOOD SAFETY AND QUALITY POLICY</p>

          <div className="content-body">
            <p>As Buge Gıda Ar-Ge Danışmanlık San. Tic. A.Ş. (Buge Foods), we are committed to producing freeze-dried fruit and vegetable products in full compliance with the Turkish Food Codex, applicable legal regulations, and FSSC 22000 / ISO 22000 standards.</p>

            <p>We prioritize food safety, consumer health, and consistent quality at every stage of our operations, aiming to deliver safe and reliable products to consumers.</p>

            <p>In order to meet customer expectations and maintain the highest level of satisfaction, we continuously improve our production processes, increase efficiency, and ensure consistent product quality.</p>

            <p>We control food safety risks throughout the entire production chain, ensure full traceability, and maintain a transparent and honest production approach.</p>

            <p>We establish relationships with our suppliers based on mutual trust and a shared commitment to quality, preserve product authenticity from raw material sourcing onward, and implement necessary measures to prevent fraud and adulteration.</p>

            <p>We promote a strong food safety culture across the organization by providing continuous training to increase employees' knowledge, awareness, and sense of responsibility.</p>

            <p>We conduct all activities with an environmentally responsible, ethical, and sustainable approach, use natural resources efficiently, and act with a strong sense of social responsibility.</p>

            <p>By continuously improving our quality and food safety management system, and striving to be a reliable, innovative, and exemplary organization within the sector, this policy constitutes the foundation of Buge Foods' FSSC 22000 Food Safety and Quality Policy.</p>
          </div>

          <p className="signature">General Manager – Buge Foods</p>
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
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .policy-badge {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #5ba679 0%, #4a9468 100%);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          margin-bottom: 3rem;
          letter-spacing: 0.02em;
        }

        .content-body {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }

        .content-body p {
          font-size: 1.05rem;
          line-height: 1.9;
          color: #444;
        }

        .signature {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1A4D5C;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #eee;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 6rem 1rem 4rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .content-body p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
