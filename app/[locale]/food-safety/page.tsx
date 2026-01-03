'use client';

import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function FoodSafetyPage() {
    const { t, language, setLanguage } = useLanguage();
    const p = t.foodSafetyPage;

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
                    <p className="text-xl text-[var(--turquoise)] font-medium mb-12">
                        {p.policyTitle}
                    </p>

                    <div className="space-y-8 text-[var(--dark-gray)] leading-relaxed">
                        {p.paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}

                        <p className="text-[var(--dark-blue)] font-medium mt-12 pt-6 border-t border-gray-200">
                            {p.signature}
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
