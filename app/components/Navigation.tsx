'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav-wrapper ${scrolled ? 'glass-header' : ''}`}>
      <div className="container nav-container">
        <Link href="/v2" className="nav-logo">
          Blendence
        </Link>

        <div className="nav-links">
          <div className="nav-group">
            <span className="nav-label">Stages</span>
            <div className="nav-dropdown">
              <Link href="/stages/kidgrow">KidGrow (4-7)</Link>
              <Link href="/stages/kidrise">KidRise (8-12)</Link>
              <Link href="/stages/teenfocus">TeenFocus (13-16)</Link>
            </div>
          </div>

          <div className="nav-group">
            <span className="nav-label">Reset</span>
            <div className="nav-dropdown">
              <Link href="/reset/balance">Balance</Link>
              <Link href="/reset/intense">Intense</Link>
            </div>
          </div>

          <Link href="/our-approach" className="nav-link">Our Approach</Link>
        </div>

        {/* Shop Now button removed as per user request */}
      </div>

      <style jsx>{`
        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 1.5rem 0;
        }

        .nav-wrapper.glass-header {
          padding: 1rem 0;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--c-primary-dark);
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }

        .nav-link, .nav-label {
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          position: relative;
        }

        .btn-sm {
          padding: 0.6rem 1.4rem;
          font-size: 0.9rem;
        }
        
        /* Dropdown logic roughly simulated with hover */
        .nav-group {
          position: relative;
          padding: 1rem 0; 
        }

        .nav-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: white;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: var(--shadow-lg);
          min-width: 180px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-group:hover .nav-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .nav-dropdown a {
          font-size: 0.9rem;
          color: var(--c-neutral-800);
          padding: 0.5rem;
          border-radius: 6px;
        }

        .nav-dropdown a:hover {
          background: var(--c-neutral-100);
          color: var(--c-primary);
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
        }
      `}</style>
    </nav>
  );
}
