'use client';

import Link from 'next/link';
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconArrowRight
} from '@tabler/icons-react';
import { useLanguage } from '@/lib/LanguageContext';
import { blob } from '@/lib/blob';
import WaveDivider from './WaveDivider';
import { Stagger, StaggerItem, WordReveal } from '@/lib/motion';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="footer-v2">
      {/* Signature wave — drawn on white, strands flow down into the petrol block. */}
      <div className="footer-wave">
        <WaveDivider tone="brand" flip />
      </div>

      <div className="footer-v2-inner">
        <div className="footer-v2-container">
          {/* Brand statement */}
          <WordReveal
            as="p"
            text={t.footer.description}
            className="footer-statement"
          />

          {/* TOP SECTION: Brand & Newsletter */}
          <Stagger className="footer-v2-grid">
            <StaggerItem className="footer-v2-main">
              <Link href={`/${language}`} className="footer-v2-logo">
                <img src={blob('logos/logo.png')} alt="Blendence" />
              </Link>
              <div className="footer-v2-socials">
                <a href="#" aria-label="Instagram"><IconBrandInstagram size={20} /></a>
                <a href="#" aria-label="LinkedIn"><IconBrandLinkedin size={20} /></a>
                <a href="#" aria-label="Facebook"><IconBrandFacebook size={20} /></a>
              </div>
            </StaggerItem>

            <StaggerItem className="footer-v2-col">
              <h4 className="footer-v2-heading">{t.footer.stages}</h4>
              <nav className="footer-v2-nav">
                <Link href={`/${language}/stages/kidgrow`}>{t.nav.kidGrow}</Link>
                <Link href={`/${language}/stages/kidrise`}>{t.nav.kidRise}</Link>
                <Link href={`/${language}/stages/teenfocus`}>{t.nav.teenFocus}</Link>
              </nav>
            </StaggerItem>

            <StaggerItem className="footer-v2-col">
              <h4 className="footer-v2-heading">{t.footer.reset}</h4>
              <nav className="footer-v2-nav">
                <Link href={`/${language}/reset/balance`}>{t.nav.balance}</Link>
                <Link href={`/${language}/reset/intense`}>{t.nav.intense}</Link>
              </nav>
            </StaggerItem>

            <StaggerItem className="footer-v2-col">
              <h4 className="footer-v2-heading">{t.footer.company}</h4>
              <nav className="footer-v2-nav">
                <Link href={`/${language}/approach`}>{t.footer.ourApproach}</Link>
                <Link href={`/${language}/about`}>{t.footer.aboutUs}</Link>
                <Link href={`/${language}/contact`}>{t.footer.contact}</Link>
              </nav>
            </StaggerItem>

            <StaggerItem className="footer-v2-col newsletter-col">
              <h4 className="footer-v2-heading">{t.footer.newsletter}</h4>
              <p className="newsletter-text">{t.footer.newsletterText}</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder={t.footer.emailPlaceholder} className="newsletter-input" required />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <IconArrowRight size={18} />
                </button>
              </form>
            </StaggerItem>
          </Stagger>

          {/* BOTTOM SECTION: Legal & Copyright */}
          <div className="footer-v2-bottom">
            <div className="footer-v2-legal">
              <Link href={`/${language}/privacy`}>{t.footer.privacyPolicy}</Link>
              <Link href={`/${language}/terms`}>{t.footer.termsOfUse}</Link>
              <Link href={`/${language}/food-safety`}>{t.footer.foodSafety}</Link>
              <Link href={`/${language}/gender-equality`}>{t.footer.genderEquality}</Link>
            </div>
            <p className="footer-v2-copyright" dangerouslySetInnerHTML={{ __html: `&copy; ${new Date().getFullYear()} ${t.footer.copyright}` }} />
          </div>
        </div>
      </div>

      <style jsx>{`
                .footer-v2 {
                    background-color: var(--petrol-deep);
                    color: var(--text-on-dark);
                    position: relative;
                    overflow: hidden;
                }

                /* Wave sits on white so the strands read, then meet the petrol block. */
                .footer-wave {
                    background: var(--surface);
                    width: 100%;
                    line-height: 0;
                }

                .footer-v2-inner {
                    position: relative;
                    padding: clamp(3.5rem, 7vw, 6rem) 0 3rem;
                }

                .footer-v2-inner::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 55%;
                    height: 60%;
                    background: radial-gradient(circle at top right, rgba(0, 188, 212, 0.06) 0%, transparent 68%);
                    pointer-events: none;
                }

                .footer-v2-container {
                    position: relative;
                    max-width: var(--container);
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                /* NOTE: styled-jsx only hashes plain DOM elements written in
                   this file. Classes passed to imported components (WordReveal,
                   Stagger, StaggerItem) and anchors rendered by next/link get
                   NO scope hash — target them as descendant :global() rules
                   under a scoped DOM parent. */
                .footer-v2-container :global(.footer-statement) {
                    font-family: var(--font-display-family);
                    font-weight: 500;
                    font-size: clamp(1.8rem, 4vw, 3rem);
                    line-height: 1.12;
                    letter-spacing: -0.015em;
                    color: #fff;
                    max-width: 900px;
                    margin-bottom: clamp(3rem, 6vw, 5rem);
                }

                .footer-v2-container :global(.footer-v2-grid) {
                    display: grid;
                    grid-template-columns: 1.8fr 1fr 1fr 1fr 1.5fr;
                    gap: 3rem;
                    margin-bottom: clamp(3rem, 6vw, 5rem);
                }

                .footer-v2-container :global(.footer-v2-main) {
                    display: flex;
                    flex-direction: column;
                    gap: 1.75rem;
                }

                .footer-v2-container :global(.footer-v2-logo img) {
                    height: 3.25rem;
                    width: auto;
                    filter: brightness(0) invert(1);
                }

                .footer-v2-socials {
                    display: flex;
                    gap: 0.85rem;
                }

                .footer-v2-socials a {
                    width: 44px;
                    height: 44px;
                    border-radius: var(--radius-pill);
                    background: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: transform var(--dur-fast) var(--ease),
                        background var(--dur-fast) var(--ease),
                        color var(--dur-fast) var(--ease),
                        border-color var(--dur-fast) var(--ease),
                        box-shadow var(--dur-fast) var(--ease);
                }

                .footer-v2-socials a:hover {
                    background: #fff;
                    color: var(--petrol);
                    border-color: #fff;
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-lift);
                }

                .footer-v2-heading {
                    color: #fff;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.14em;
                    margin-bottom: 1.75rem;
                }

                .footer-v2-nav {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.9rem;
                }

                /* Animated underline — grows from the left on hover.
                   Anchors come from next/link → :global under scoped nav. */
                .footer-v2-nav :global(a) {
                    font-size: 0.95rem;
                    color: rgba(234, 242, 243, 0.72);
                    text-decoration: none;
                    width: fit-content;
                    padding-bottom: 2px;
                    background-image: linear-gradient(currentColor, currentColor);
                    background-position: 0 100%;
                    background-repeat: no-repeat;
                    background-size: 0% 1px;
                    transition: background-size var(--dur-fast) var(--ease),
                        color var(--dur-fast) var(--ease);
                }

                .footer-v2-nav :global(a:hover) {
                    color: #fff;
                    background-size: 100% 1px;
                }

                .newsletter-text {
                    font-size: 0.9rem;
                    color: rgba(234, 242, 243, 0.72);
                    margin-bottom: 1.5rem;
                    line-height: 1.55;
                }

                .newsletter-form {
                    position: relative;
                    display: flex;
                }

                .newsletter-input {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.16);
                    padding: 0.9rem 3.6rem 0.9rem 1.25rem;
                    border-radius: var(--radius-pill);
                    color: #fff;
                    font-family: inherit;
                    font-size: 0.9rem;
                    outline: none;
                    transition: border-color var(--dur-fast) var(--ease),
                        background var(--dur-fast) var(--ease),
                        box-shadow var(--dur-fast) var(--ease);
                }

                .newsletter-input::placeholder {
                    color: rgba(234, 242, 243, 0.5);
                }

                .newsletter-input:focus {
                    border-color: var(--turquoise);
                    background: rgba(255, 255, 255, 0.1);
                    box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.28);
                }

                .newsletter-btn {
                    position: absolute;
                    right: 6px;
                    top: 6px;
                    bottom: 6px;
                    width: 42px;
                    background: #fff;
                    color: var(--petrol);
                    border: none;
                    border-radius: var(--radius-pill);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: transform var(--dur-fast) var(--ease),
                        background var(--dur-fast) var(--ease);
                }

                .newsletter-btn:hover {
                    background: var(--surface-mist);
                    transform: scale(1.05);
                }

                .footer-v2-bottom {
                    padding-top: 2.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.12);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                }

                .footer-v2-legal {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 2rem;
                }

                .footer-v2-legal :global(a) {
                    font-size: 0.85rem;
                    color: rgba(234, 242, 243, 0.6);
                    text-decoration: none;
                    transition: color var(--dur-fast) var(--ease);
                }

                .footer-v2-legal :global(a:hover) {
                    color: #fff;
                }

                .footer-v2-copyright {
                    font-size: 0.85rem;
                    color: rgba(234, 242, 243, 0.5);
                }

                .footer-v2-copyright :global(a) {
                    color: rgba(234, 242, 243, 0.78);
                    text-decoration: none;
                    transition: color var(--dur-fast) var(--ease);
                }

                .footer-v2-copyright :global(a:hover) {
                    color: #fff;
                }

                @media (max-width: 1024px) {
                    .footer-v2-container :global(.footer-v2-grid) {
                        grid-template-columns: 1fr 1fr;
                        gap: 3rem;
                    }
                    .footer-v2-container :global(.newsletter-col) {
                        grid-column: 1 / -1;
                    }
                }

                @media (max-width: 640px) {
                    .footer-v2-container :global(.footer-v2-grid) {
                        grid-template-columns: 1fr;
                        gap: 2.5rem;
                    }
                    .footer-v2-bottom {
                        flex-direction: column;
                        align-items: flex-start;
                        text-align: left;
                    }
                    .footer-v2-legal {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
            `}</style>
    </footer>
  );
}
