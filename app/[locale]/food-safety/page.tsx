'use client';

import Link from 'next/link';

export default function FoodSafetyPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/98 shadow-lg">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="flex-shrink-0">
                            <img src="/logo.png" alt="BLENDENCE" className="h-12 w-auto" />
                        </Link>
                        <div className="flex items-center gap-6">
                            <Link
                                href="/"
                                className="text-[var(--dark-gray)] font-medium hover:text-[var(--turquoise)] transition-colors duration-300"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Food Safety and Quality Policy
                    </h1>
                    <p className="text-xl text-[var(--turquoise)] font-medium mb-12">
                        FSSC 22000 FOOD SAFETY AND QUALITY POLICY
                    </p>

                    <div className="space-y-8 text-[var(--dark-gray)] leading-relaxed">
                        <p>
                            As Buge Gıda Ar-Ge Danışmanlık San. Tic. A.Ş. (Buge Foods), we are committed to producing freeze-dried fruit and vegetable products in full compliance with the Turkish Food Codex, applicable legal regulations, and FSSC 22000 / ISO 22000 standards.
                        </p>

                        <p>
                            We prioritize food safety, consumer health, and consistent quality at every stage of our operations, aiming to deliver safe and reliable products to consumers.
                        </p>

                        <p>
                            In order to meet customer expectations and maintain the highest level of satisfaction, we continuously improve our production processes, increase efficiency, and ensure consistent product quality.
                        </p>

                        <p>
                            We control food safety risks throughout the entire production chain, ensure full traceability, and maintain a transparent and honest production approach.
                        </p>

                        <p>
                            We establish relationships with our suppliers based on mutual trust and a shared commitment to quality, preserve product authenticity from raw material sourcing onward, and implement necessary measures to prevent fraud and adulteration.
                        </p>

                        <p>
                            We promote a strong food safety culture across the organization by providing continuous training to increase employees' knowledge, awareness, and sense of responsibility.
                        </p>

                        <p>
                            We conduct all activities with an environmentally responsible, ethical, and sustainable approach, use natural resources efficiently, and act with a strong sense of social responsibility.
                        </p>

                        <p>
                            By continuously improving our quality and food safety management system, and striving to be a reliable, innovative, and exemplary organization within the sector, this policy constitutes the foundation of Buge Foods' FSSC 22000 Food Safety and Quality Policy.
                        </p>

                        <p className="text-[var(--dark-blue)] font-medium mt-12 pt-6 border-t border-gray-200">
                            General Manager – Buge Foods
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-16 bg-[var(--dark-blue)] text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold mb-2">BLENDENCE</h3>
                    <p className="mb-1 opacity-90">Nutrition that adapts.</p>
                    <p className="text-sm opacity-70 mb-6">by BUGE GIDA A.Ş.</p>
                    <div className="flex justify-center gap-6 mb-4">
                        <Link href="/privacy" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                            Terms of Use
                        </Link>
                        <Link href="/food-safety" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                            Food Safety
                        </Link>
                    </div>
                    <p className="text-sm opacity-60">© {new Date().getFullYear()} BLENDENCE. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
