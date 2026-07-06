'use client';

import React, { useState } from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, Stagger, StaggerItem, WordReveal, EASE } from '@/lib/motion';
import {
    IconMapPin,
    IconBuildingFactory2,
    IconBrandWhatsapp,
    IconMail,
    IconSend,
    IconAlertCircle
} from '@tabler/icons-react';

function SuccessCheck() {
    const reduce = useReducedMotion();
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <motion.path
                d="M4 12.5 L10 18.5 L20 6"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, ease: EASE }}
            />
        </svg>
    );
}

export default function ContactPage() {
    const { t } = useLanguage();
    const p = t.contactPage;

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just show success message
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <div className="contact-page">
            <Navigation />

            <main>
                <section className="contact-hero">
                    <div className="container hero-inner">
                        <Reveal y={18}>
                            <span className="eyebrow">{t.nav.contact}</span>
                        </Reveal>
                        <WordReveal as="h1" className="font-display hero-title" text={p.title} delay={0.1} />
                        <Reveal delay={0.2} y={18}>
                            <p className="subtitle">{p.subtitle}</p>
                        </Reveal>
                    </div>
                </section>

                <section className="contact-content">
                    <div className="container">
                        <div className="contact-grid">
                            {/* Left Column: Contact Info */}
                            <Stagger className="contact-info">
                                <StaggerItem className="info-card">
                                    <div className="info-icon">
                                        <IconMapPin size={24} />
                                    </div>
                                    <div className="info-content">
                                        <h3>{p.headquarters.label}</h3>
                                        <p>{p.headquarters.address}</p>
                                    </div>
                                </StaggerItem>

                                <StaggerItem className="info-card">
                                    <div className="info-icon">
                                        <IconBuildingFactory2 size={24} />
                                    </div>
                                    <div className="info-content">
                                        <h3>{p.production.label}</h3>
                                        <p>{p.production.address}</p>
                                    </div>
                                </StaggerItem>

                                <StaggerItem className="info-card">
                                    <div className="info-icon">
                                        <IconBrandWhatsapp size={24} />
                                    </div>
                                    <div className="info-content">
                                        <h3>{p.phone.label}</h3>
                                        <a href={`https://wa.me/${p.phone.number.replace(/\s/g, '').replace('+', '')}`} className="info-link">
                                            {p.phone.number}
                                        </a>
                                    </div>
                                </StaggerItem>

                                <StaggerItem className="info-card">
                                    <div className="info-icon">
                                        <IconMail size={24} />
                                    </div>
                                    <div className="info-content">
                                        <h3>{p.email.label}</h3>
                                        <a href={`mailto:${p.email.address}`} className="info-link">
                                            {p.email.address}
                                        </a>
                                    </div>
                                </StaggerItem>
                            </Stagger>

                            {/* Right Column: Contact Form */}
                            <Reveal className="contact-form-wrapper" delay={0.1} y={18}>
                                <div className="section-head">
                                    <span className="rule" />
                                    <h2>{p.form.title}</h2>
                                </div>
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <label htmlFor="name">{p.form.name}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            placeholder={p.form.namePlaceholder}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">{p.form.email}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            placeholder={p.form.emailPlaceholder}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subject">{p.form.subject}</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={formState.subject}
                                            onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                            placeholder={p.form.subjectPlaceholder}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">{p.form.message}</label>
                                        <textarea
                                            id="message"
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            placeholder={p.form.messagePlaceholder}
                                            rows={5}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn-primary submit-btn">
                                        <IconSend size={18} />
                                        {p.form.submit}
                                    </button>

                                    {status === 'success' && (
                                        <div className="form-status success">
                                            <SuccessCheck />
                                            {p.form.success}
                                        </div>
                                    )}

                                    {status === 'error' && (
                                        <div className="form-status error">
                                            <IconAlertCircle size={18} />
                                            {p.form.error}
                                        </div>
                                    )}
                                </form>
                            </Reveal>
                        </div>

                        {/* Map Section */}
                        <div className="map-section">
                            <Reveal y={18}>
                                <div className="section-head">
                                    <span className="rule" />
                                    <h2>{p.map.title}</h2>
                                </div>
                            </Reveal>
                            <Reveal delay={0.05} y={18}>
                                <div className="map-container">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d26.57508!3d41.66797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQwJzA0LjciTiAyNsKwMzQnMzAuMyJF!5e0!3m2!1sen!2str!4v1705693647000!5m2!1sen!2str"
                                        width="100%"
                                        height="400"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Buge Foods Location"
                                    />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .contact-page {
                    background: var(--surface);
                    color: var(--text-body);
                    min-height: 100vh;
                }
                .container {
                    max-width: var(--container);
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                .contact-hero {
                    padding: 12rem 0 4rem;
                    background: linear-gradient(180deg, var(--surface-mist) 0%, var(--surface) 100%);
                }
                .hero-inner {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .contact-hero :global(.hero-title) {
                    font-size: clamp(2.4rem, 4.5vw, 3.8rem);
                    margin: 1.25rem 0 1rem;
                }
                .subtitle {
                    font-size: 1.2rem;
                    line-height: 1.6;
                    color: var(--text-body);
                    max-width: 34ch;
                }

                .contact-content {
                    padding: var(--section-pad) 0;
                }
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 3.5rem;
                    margin-bottom: 5rem;
                }

                /* Shared H2 treatment */
                .section-head {
                    margin-bottom: 1.75rem;
                }
                .rule {
                    display: block;
                    width: 24px;
                    height: 2px;
                    border-radius: 2px;
                    background: var(--turquoise-deep);
                    margin-bottom: 1rem;
                }
                h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--text-heading);
                }

                /* Contact Info Cards */
                .contact-grid :global(.contact-info) {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }
                .contact-grid :global(.info-card) {
                    display: flex;
                    gap: 1.25rem;
                    padding: 1.5rem;
                    background: var(--surface);
                    border: 1px solid var(--hairline);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-soft);
                    transition: transform var(--dur-fast) var(--ease),
                        box-shadow var(--dur-fast) var(--ease);
                }
                .contact-grid :global(.info-card:hover) {
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lift);
                }
                .info-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: var(--radius-md);
                    background: var(--surface-mist);
                    color: var(--petrol);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .info-content h3 {
                    font-size: 0.78rem;
                    font-weight: 600;
                    color: var(--text-muted);
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                }
                .info-content p {
                    font-size: 1rem;
                    color: var(--text-heading);
                    line-height: 1.5;
                }
                .info-link {
                    font-size: 1rem;
                    color: var(--petrol);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color var(--dur-fast) var(--ease);
                }
                .info-link:hover {
                    color: var(--turquoise-deep);
                }

                /* Contact Form */
                .contact-grid :global(.contact-form-wrapper) {
                    background: var(--surface-mist);
                    padding: 2.5rem;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--hairline);
                }
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.35rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-group label {
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: var(--text-muted);
                    letter-spacing: 0.01em;
                }
                .form-group input,
                .form-group textarea {
                    padding: 0.9rem 1.1rem;
                    border: 1px solid var(--hairline);
                    border-radius: var(--radius-sm);
                    font-size: 1rem;
                    font-family: inherit;
                    color: var(--text-heading);
                    background: var(--surface);
                    transition: border-color var(--dur-fast) var(--ease),
                        box-shadow var(--dur-fast) var(--ease);
                    outline: none;
                }
                .form-group input:focus,
                .form-group textarea:focus {
                    border-color: var(--turquoise-deep);
                    box-shadow: 0 0 0 3px rgba(24, 151, 169, 0.18);
                }
                .form-group input::placeholder,
                .form-group textarea::placeholder {
                    color: var(--text-muted);
                }
                .form-group textarea {
                    resize: vertical;
                    min-height: 120px;
                }
                .submit-btn {
                    margin-top: 0.5rem;
                    align-self: flex-start;
                    justify-content: center;
                    border: none;
                }
                .form-status {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.9rem 1.1rem;
                    border-radius: var(--radius-sm);
                    font-size: 0.95rem;
                    font-weight: 500;
                }
                .form-status.success {
                    background: var(--reset-tint);
                    color: var(--green-deep);
                }
                .form-status.error {
                    background: rgba(229, 57, 53, 0.08);
                    color: var(--red);
                }

                /* Map Section */
                .map-section {
                    margin-top: 2rem;
                }
                .map-container {
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-soft);
                    border: 1px solid var(--hairline);
                }
                .map-container :global(iframe) {
                    display: block;
                    filter: grayscale(0.15);
                }

                /* Responsive */
                @media (max-width: 900px) {
                    .contact-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
                @media (max-width: 768px) {
                    .contact-hero {
                        padding: 9rem 0 3rem;
                    }
                    .subtitle {
                        font-size: 1.1rem;
                    }
                    .contact-grid :global(.contact-form-wrapper) {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
