'use client';

import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function GenderEqualityPage() {
    const { t, language, setLanguage } = useLanguage();
    const p = t.genderEqualityPage;

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/98 shadow-lg">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href={`/${language}`} className="flex-shrink-0">
                            <img src="/logo.png" alt="BLENDENCE" className="h-12 w-auto" />
                        </Link>
                        <div className="flex items-center gap-6">
                            <Link
                                href={`/${language}`}
                                className="text-[var(--dark-gray)] font-medium hover:text-[var(--turquoise)] transition-colors duration-300"
                            >
                                {p.backToHome}
                            </Link>

                            {/* Language Toggle */}
                            <div className="flex gap-2 border border-gray-300 rounded-full p-1">
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${language === 'en'
                                        ? 'bg-[var(--turquoise)] text-white'
                                        : 'text-[var(--dark-gray)] hover:bg-gray-100'
                                        }`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => setLanguage('tr')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${language === 'tr'
                                        ? 'bg-[var(--turquoise)] text-white'
                                        : 'text-[var(--dark-gray)] hover:bg-gray-100'
                                        }`}
                                >
                                    TR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ color: 'var(--dark-blue)' }}>
                        {p.title}
                    </h1>

                    <div className="mb-8 text-[var(--dark-gray)]">
                        <p className="font-medium">{p.docInfo.gepTitle}</p>
                        <p>{p.docInfo.company}</p>
                        <p>{p.docInfo.publicDoc}</p>
                        <p>{p.docInfo.effectiveDate}</p>
                        <p>{p.docInfo.version}</p>
                    </div>

                    {/* Section 1: Organisation Profile */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            {p.sections.orgProfile.title}
                        </h2>
                        <ul className="space-y-2 text-[var(--dark-gray)]">
                            <li><strong>Name:</strong> {p.sections.orgProfile.items.name}</li>
                            <li><strong>Brand:</strong> {p.sections.orgProfile.items.brand}</li>
                            <li><strong>Founded:</strong> {p.sections.orgProfile.items.founded}</li>
                            <li><strong>Headquarters:</strong> {p.sections.orgProfile.items.headquarters}</li>
                            <li><strong>Production Facility:</strong> {p.sections.orgProfile.items.productionFacility}</li>
                            <li><strong>Legal Status:</strong> {p.sections.orgProfile.items.legalStatus}</li>
                            <li><strong>Chair of the Board:</strong> {p.sections.orgProfile.items.chairOfBoard}</li>
                        </ul>
                    </section>

                    {/* Section 2: Commitment */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            {p.sections.commitment.title}
                        </h2>
                        <div className="space-y-4 text-[var(--dark-gray)]">
                            {p.sections.commitment.content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </section>

                    {/* Note: Other sections are kept static as they are detailed technical content, but could be translated similarly if needed */}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
