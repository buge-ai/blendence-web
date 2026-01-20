'use client';

import React, { useState } from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import {
    IconMapPin,
    IconBuildingFactory2,
    IconBrandWhatsapp,
    IconMail,
    IconSend,
    IconCheck,
    IconAlertCircle
} from '@tabler/icons-react';

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
                    <div className="container">
                        <h1>{p.title}</h1>
                        <p className="subtitle">{p.subtitle}</p>
                    </div>
                </section>

                <section className="contact-content">
                    <div className="container">
                        <div className="contact-grid">
                            {/* Left Column: Contact Info */}
                            <div className="contact-info">
                                <div className="info-card">
                                    <div className="info-icon">
                                        <IconMapPin size={24} />
                                    </div>
                                    <div className="info-content">
                                        <h3>{p.headquarters.label}</h3>
                                        <p>{p.headquarters.address}</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon">
                                        <IconBuildingFactory2 size={24} />
                                    </div>
                                    <div className="info-content">
                                        <h3>{p.production.label}</h3>
                                        <p>{p.production.address}</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon whatsapp">
                                        <IconBrandWhatsapp size={24} />
                                    </div>
                                    <div className="info-content">
                                        <h3>{p.phone.label}</h3>
                                        <a href={`https://wa.me/${p.phone.number.replace(/\s/g, '').replace('+', '')}`} className="info-link">
                                            {p.phone.number}
                                        </a>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon email">
                                        <IconMail size={24} />
                                    </div>
                                    <div className="info-content">
                                        <h3>{p.email.label}</h3>
                                        <a href={`mailto:${p.email.address}`} className="info-link">
                                            {p.email.address}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Contact Form */}
                            <div className="contact-form-wrapper">
                                <h2>{p.form.title}</h2>
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

                                    <button type="submit" className="submit-btn">
                                        <IconSend size={18} />
                                        {p.form.submit}
                                    </button>

                                    {status === 'success' && (
                                        <div className="form-status success">
                                            <IconCheck size={18} />
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
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="map-section">
                            <h2>{p.map.title}</h2>
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d26.57508!3d41.66797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQwJzA0LjciTiAyNsKwMzQnMzAuMyJF!5e0!3m2!1sen!2str!4v1705693647000!5m2!1sen!2str"
                                    width="100%"
                                    height="400"
                                    style={{ border: 0, borderRadius: '16px' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Buge Foods Location"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .contact-page {
                    background: #fff;
                    color: #111;
                    min-height: 100vh;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                .contact-hero {
                    padding: 12rem 0 4rem;
                    background: linear-gradient(180deg, #f9f9fa 0%, #fff 100%);
                    text-align: center;
                }
                h1 {
                    font-size: 4rem;
                    font-weight: 300;
                    letter-spacing: -0.02em;
                    color: #111;
                    margin-bottom: 1rem;
                }
                .subtitle {
                    font-size: 1.25rem;
                    color: #666;
                    max-width: 500px;
                    margin: 0 auto;
                }
                .contact-content {
                    padding: 4rem 0 8rem;
                }
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 4rem;
                    margin-bottom: 6rem;
                }
                
                /* Contact Info Cards */
                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .info-card {
                    display: flex;
                    gap: 1.25rem;
                    padding: 1.5rem;
                    background: #f9f9fa;
                    border-radius: 16px;
                    transition: all 0.3s ease;
                }
                .info-card:hover {
                    background: #f5f5f5;
                    transform: translateY(-2px);
                }
                .info-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    background: #1A4D5C;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .info-icon.whatsapp {
                    background: #25D366;
                }
                .info-icon.email {
                    background: #EA4335;
                }
                .info-content h3 {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #666;
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .info-content p {
                    font-size: 1rem;
                    color: #111;
                    line-height: 1.5;
                }
                .info-link {
                    font-size: 1rem;
                    color: #1A4D5C;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s ease;
                }
                .info-link:hover {
                    color: #2C5F6F;
                }

                /* Contact Form */
                .contact-form-wrapper {
                    background: #f9f9fa;
                    padding: 2.5rem;
                    border-radius: 24px;
                }
                .contact-form-wrapper h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #111;
                    margin-bottom: 2rem;
                }
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-group label {
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #333;
                }
                .form-group input,
                .form-group textarea {
                    padding: 1rem 1.25rem;
                    border: 1px solid #e0e0e0;
                    border-radius: 12px;
                    font-size: 1rem;
                    font-family: inherit;
                    background: white;
                    transition: all 0.2s ease;
                    outline: none;
                }
                .form-group input:focus,
                .form-group textarea:focus {
                    border-color: #1A4D5C;
                    box-shadow: 0 0 0 3px rgba(26, 77, 92, 0.1);
                }
                .form-group textarea {
                    resize: vertical;
                    min-height: 120px;
                }
                .submit-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 1rem 2rem;
                    background: #1A4D5C;
                    color: white;
                    border: none;
                    border-radius: 50px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 0.5rem;
                }
                .submit-btn:hover {
                    background: #2C5F6F;
                    transform: translateY(-2px);
                }
                .form-status {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1rem 1.25rem;
                    border-radius: 12px;
                    font-size: 0.95rem;
                }
                .form-status.success {
                    background: #E8F5E9;
                    color: #2E7D32;
                }
                .form-status.error {
                    background: #FFEBEE;
                    color: #C62828;
                }

                /* Map Section */
                .map-section {
                    margin-top: 2rem;
                }
                .map-section h2 {
                    font-size: 1.75rem;
                    font-weight: 500;
                    color: #111;
                    margin-bottom: 1.5rem;
                    text-align: center;
                }
                .map-container {
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
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
                        padding: 8rem 0 3rem;
                    }
                    h1 {
                        font-size: 2.5rem;
                    }
                    .subtitle {
                        font-size: 1.1rem;
                    }
                    .contact-form-wrapper {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
