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

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="footer-v2">
      <div className="container footer-v2-container">
        {/* TOP SECTION: Brand & Newsletter */}
        <div className="footer-v2-grid">
          <div className="footer-v2-main">
            <Link href={`/${language}`} className="footer-v2-logo">
              <img src={blob('logos/logo.png')} alt="Blendence" />
            </Link>
            <p className="footer-v2-description">
              {t.footer.description}
            </p>
            <div className="footer-v2-socials">
              <a href="#" aria-label="Instagram"><IconBrandInstagram size={20} /></a>
              <a href="#" aria-label="LinkedIn"><IconBrandLinkedin size={20} /></a>
              <a href="#" aria-label="Facebook"><IconBrandFacebook size={20} /></a>
            </div>
          </div>

          <div className="footer-v2-col">
            <h4 className="footer-v2-heading">{t.footer.stages}</h4>
            <nav className="footer-v2-nav">
              <Link href={`/${language}/stages/kidgrow`}>{t.nav.kidGrow}</Link>
              <Link href={`/${language}/stages/kidrise`}>{t.nav.kidRise}</Link>
              <Link href={`/${language}/stages/teenfocus`}>{t.nav.teenFocus}</Link>
            </nav>
          </div>

          <div className="footer-v2-col">
            <h4 className="footer-v2-heading">{t.footer.reset}</h4>
            <nav className="footer-v2-nav">
              <Link href={`/${language}/reset/balance`}>{t.nav.balance}</Link>
              <Link href={`/${language}/reset/intense`}>{t.nav.intense}</Link>
            </nav>
          </div>

          <div className="footer-v2-col">
            <h4 className="footer-v2-heading">{t.footer.company}</h4>
            <nav className="footer-v2-nav">
              <Link href={`/${language}/approach`}>{t.footer.ourApproach}</Link>
              <Link href={`/${language}/about`}>{t.footer.aboutUs}</Link>
              <Link href={`/${language}/contact`}>{t.footer.contact}</Link>
            </nav>
          </div>

          <div className="footer-v2-col newsletter-col">
            <h4 className="footer-v2-heading">{t.footer.newsletter}</h4>
            <p className="newsletter-text">{t.footer.newsletterText}</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={t.footer.emailPlaceholder} className="newsletter-input" required />
              <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                <IconArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

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

      <style jsx>{`
                .footer-v2 {
                    background-color: #1A4D5C;
                    color: #A1A1AA;
                    padding: 8rem 0 4rem;
                    position: relative;
                    overflow: hidden;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .footer-v2::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 50%;
                    height: 50%;
                    background: radial-gradient(circle at top right, rgba(0, 188, 212, 0.03) 0%, transparent 70%);
                    pointer-events: none;
                }

                .footer-v2-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .footer-v2-grid {
                    display: grid;
                    grid-template-columns: 1.8fr 1fr 1fr 1fr 1.5fr;
                    gap: 3rem;
                    margin-bottom: 6rem;
                }

                .footer-v2-main {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .footer-v2-logo img {
                    height: 3.5rem;
                    width: auto;
                    filter: brightness(0) invert(1);
                    opacity: 1;
                }

                .footer-v2-description {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    max-width: 320px;
                }

                .footer-v2-socials {
                    display: flex;
                    gap: 1rem;
                    margin-top: 0.5rem;
                }

                .footer-v2-socials a {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.03);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .footer-v2-socials a:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                    border-color: rgba(255, 255, 255, 0.2);
                }

                .footer-v2-heading {
                    color: white;
                    font-size: 0.85rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 2rem;
                }

                .footer-v2-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .footer-v2-nav a {
                    font-size: 0.95rem;
                    color: #A1A1AA;
                    transition: color 0.2s ease;
                }

                .footer-v2-nav a:hover {
                    color: white;
                }

                .newsletter-text {
                    font-size: 0.9rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.5;
                }

                .newsletter-form {
                    position: relative;
                    display: flex;
                }

                .newsletter-input {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 0.8rem 3.5rem 0.8rem 1rem;
                    border-radius: 8px;
                    color: white;
                    font-size: 0.9rem;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .newsletter-input:focus {
                    border-color: rgba(0, 188, 212, 0.5);
                    background: rgba(255, 255, 255, 0.05);
                }

                .newsletter-btn {
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    bottom: 5px;
                    width: 34px;
                    background: white;
                    color: black;
                    border: none;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .newsletter-btn:hover {
                    background: #E4E4E7;
                    transform: scale(1.05);
                }

                .footer-v2-bottom {
                    padding-top: 3rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 2rem;
                }

                .footer-v2-legal {
                    display: flex;
                    gap: 2rem;
                }

                .footer-v2-legal a {
                    font-size: 0.85rem;
                    color: #71717A;
                    transition: color 0.2s ease;
                }

                .footer-v2-legal a:hover {
                    color: white;
                }

                .footer-v2-copyright {
                    font-size: 0.85rem;
                    color: #52525B;
                }

                .footer-v2-copyright a {
                    color: #A1A1AA;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .footer-v2-copyright a:hover {
                    color: white;
                }

                @media (max-width: 1024px) {
                    .footer-v2-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 3rem;
                    }
                }

                @media (max-width: 640px) {
                    .footer-v2 {
                        padding: 4rem 0 3rem;
                    }
                    .footer-v2-grid {
                        grid-template-columns: 1fr;
                        gap: 3rem;
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
