'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h3 className="footer-logo">Blendence</h3>
                        <p className="footer-tagline">Naturally powerful, perfectly balanced.</p>
                    </div>

                    <div className="footer-nav">
                        <div className="footer-col">
                            <h4>Explore</h4>
                            <Link href="/stages">Stages</Link>
                            <Link href="/reset">Reset</Link>
                            <Link href="/our-approach">Our Approach</Link>
                        </div>

                        <div className="footer-col">
                            <h4>Legal & Policies</h4>
                            <Link href="#">Food Safety Policy (FSSC 22000)</Link>
                            <Link href="#">Gender Equality Statement</Link>
                            <Link href="#">Privacy Policy</Link>
                            <Link href="#">Cookies Policy</Link>
                            <Link href="#">Terms of Use</Link>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Blendence. All rights reserved.</p>
                </div>
            </div>

            <style>{`
        .footer {
          background-color: var(--c-primary-dark);
          color: var(--c-neutral-200);
          padding: 4rem 0 2rem;
          margin-top: auto;
        }
        
        .footer-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        
        .footer-top {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 3rem;
        }
        
        .footer-brand {
          max-width: 300px;
        }
        
        .footer-logo {
          color: white;
          margin-bottom: 0.5rem;
        }
        
        .footer-tagline {
          opacity: 0.7;
          font-size: 1.1rem;
        }
        
        .footer-nav {
          display: flex;
          gap: 4rem;
          flex-wrap: wrap;
        }
        
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        
        .footer-col h4 {
          color: white;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .footer-col a {
          color: var(--c-neutral-200);
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        .footer-col a:hover {
          opacity: 1;
          color: var(--c-accent-gold);
        }
        
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 2rem;
          text-align: center;
          font-size: 0.8rem;
          opacity: 0.5;
        }
      `}</style>
        </footer>
    );
}
