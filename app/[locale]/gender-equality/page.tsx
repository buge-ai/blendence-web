'use client';

import Link from 'next/link';

export default function GenderEqualityPage() {
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
                        Gender Equality Plan
                    </h1>

                    <div className="mb-8 text-[var(--dark-gray)]">
                        <p className="font-medium">Gender Equality Plan (GEP)</p>
                        <p>BUGE GIDA ARGE DANIŞMANLIK SANAYİ TİCARET A.Ş. (BUGE Foods | Blendence)</p>
                        <p>Public Document</p>
                        <p>Effective Date: October 2025</p>
                        <p>Version: 1.1</p>
                    </div>

                    {/* Section 1: Organisation Profile */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            1. Organisation Profile
                        </h2>
                        <ul className="space-y-2 text-[var(--dark-gray)]">
                            <li><strong>Name:</strong> BUGE GIDA ARGE DANIŞMANLIK SANAYİ TİCARET A.Ş.</li>
                            <li><strong>Brand:</strong> Blendence</li>
                            <li><strong>Founded:</strong> 2024</li>
                            <li><strong>Headquarters:</strong> Trakya Teknopark, Trakya University Technology Development Zone, 22000 Edirne, Türkiye</li>
                            <li><strong>Production Facility:</strong> Hasan Pehlivan Cd. 1/D, 22500 Havsa, Edirne, Türkiye</li>
                            <li><strong>Legal Status:</strong> Privately held SME (Small and Medium-sized Enterprise)</li>
                            <li><strong>Chair of the Board:</strong> Assoc. Prof. Dr. Buket Aşkın</li>
                        </ul>
                    </section>

                    {/* Section 2: Commitment */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            2. Commitment to Gender Equality
                        </h2>
                        <div className="space-y-4 text-[var(--dark-gray)]">
                            <p>
                                BUGE Foods is committed to promoting gender equality, non-discrimination, and equal opportunities in all aspects of its activities. The company aligns with the EU Charter of Fundamental Rights, Commission Recommendation 2003/361/EC for SMEs, and the Horizon Europe Gender Equality Guidelines.
                            </p>
                            <p>
                                We uphold zero tolerance toward discrimination, harassment, or bias based on gender, ethnicity, religion, age, or any other identity. This Gender Equality Plan (GEP) is a public document, signed by the company's top management, and will be published on our official website.
                            </p>
                        </div>
                    </section>

                    {/* Section 3: Gender Equality Officer */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            3. Gender Equality Officer & Dedicated Resources
                        </h2>
                        <div className="space-y-4 text-[var(--dark-gray)]">
                            <p>To ensure implementation and follow-up, BUGE Foods has appointed:</p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium">Gender Equality Officer:</p>
                                <p>Assoc. Prof. Dr. Buket Aşkın</p>
                                <p>Chair of the Board, BUGE Foods</p>
                                <p>Vice Chair of the TOBB Women Entrepreneurs Executive Board</p>
                                <p>Lecturer at Kırklareli University</p>
                            </div>
                            <p>
                                Dr. Aşkın has served for over 10 years in the TOBB Women Entrepreneurs Board, participated in 8 national-level projects aimed at empowering women in business, and led 3 of them as a project director. She is actively involved in mentoring programs to support educated women entering the workforce and promoting equal opportunities.
                            </p>
                            <p>
                                The company allocates administrative time and internal resources to maintain gender equality actions, awareness activities, and monitoring.
                            </p>
                        </div>
                    </section>

                    {/* Section 4: Current Gender Balance */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            4. Current Gender Balance
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-[var(--dark-gray)]">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-200 px-4 py-2 text-left">Category</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-200 px-4 py-2">Headcount</td>
                                        <td className="border border-gray-200 px-4 py-2">50% female</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 px-4 py-2">Board Members / Shareholders</td>
                                        <td className="border border-gray-200 px-4 py-2">4 total (1 female scientist)</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 px-4 py-2">Leadership</td>
                                        <td className="border border-gray-200 px-4 py-2">Female-led: Chair of the Board is a woman (Assoc. Prof. Dr. Buket Aşkın)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-[var(--dark-gray)]">
                            Gender equality is integrated into BUGE Foods' governance, decision-making, and company culture.
                        </p>
                    </section>

                    {/* Section 5: Policy Areas */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            5. Policy Areas
                        </h2>

                        <h3 className="text-xl font-medium mt-6 mb-3" style={{ color: 'var(--dark-blue)' }}>
                            5.1 Work–Life Balance and Organisational Culture
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-[var(--dark-gray)] ml-4">
                            <li>Flexible working conditions where feasible</li>
                            <li>Supportive attitude toward parental leave, breastfeeding, and family needs</li>
                            <li>Equal respect for professional and personal responsibilities</li>
                        </ul>

                        <h3 className="text-xl font-medium mt-6 mb-3" style={{ color: 'var(--dark-blue)' }}>
                            5.2 Gender Balance in Decision-Making
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-[var(--dark-gray)] ml-4">
                            <li>Equal representation in management</li>
                            <li>Commitment to women's leadership roles within the company</li>
                        </ul>

                        <h3 className="text-xl font-medium mt-6 mb-3" style={{ color: 'var(--dark-blue)' }}>
                            5.3 Gender Equality in Recruitment and Career Development
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-[var(--dark-gray)] ml-4">
                            <li>All recruitment and promotion based strictly on qualifications and skills</li>
                            <li>Transparent evaluation criteria</li>
                            <li>Equal access to training and development programs</li>
                        </ul>

                        <h3 className="text-xl font-medium mt-6 mb-3" style={{ color: 'var(--dark-blue)' }}>
                            5.4 Equal Pay for Equal Work
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-[var(--dark-gray)] ml-4">
                            <li>Salaries and benefits are determined solely by position and experience</li>
                            <li>Periodic review to ensure fairness</li>
                        </ul>

                        <h3 className="text-xl font-medium mt-6 mb-3" style={{ color: 'var(--dark-blue)' }}>
                            5.5 Measures Against Gender-Based Violence and Harassment
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-[var(--dark-gray)] ml-4">
                            <li>Zero-tolerance policy against harassment, including sexual or psychological harassment</li>
                            <li>A clear internal reporting procedure (see Section 6)</li>
                        </ul>
                    </section>

                    {/* Section 6: Harassment Reporting */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            6. Harassment Reporting Procedure
                        </h2>
                        <div className="space-y-4 text-[var(--dark-gray)]">
                            <p>
                                BUGE Foods provides a confidential and fair mechanism for reporting any form of harassment or discrimination.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium mb-2">Reporting Channels:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Directly to the Gender Equality Officer</li>
                                    <li>Confidential email: <a href="mailto:contact@bugefoods.com" className="text-[var(--turquoise)] hover:underline">contact@bugefoods.com</a></li>
                                    <li>In-person or written communication</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-medium mb-2">Procedure:</p>
                                <ol className="list-decimal list-inside space-y-1 ml-4">
                                    <li>Reports can be submitted verbally or in writing.</li>
                                    <li>All reports remain confidential.</li>
                                    <li>The case is reviewed by management within 10 working days.</li>
                                    <li>External advisors or legal authorities may be consulted if needed.</li>
                                    <li>No retaliation is tolerated against individuals reporting in good faith.</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* Section 7: Data Collection */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            7. Data Collection and Monitoring
                        </h2>
                        <div className="space-y-4 text-[var(--dark-gray)]">
                            <p>BUGE Foods collects and maintains sex-disaggregated data on employees annually.</p>
                            <p className="font-medium">Indicators monitored:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Gender ratio among employees and management</li>
                                <li>Salary equity</li>
                                <li>Participation in trainings and projects</li>
                                <li>Reported cases of harassment or bias (if any)</li>
                            </ul>
                            <p>
                                Results will be discussed annually by the management board, with updates to the GEP every two years or upon major organisational change.
                            </p>
                        </div>
                    </section>

                    {/* Section 8: Training */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            8. Training and Awareness
                        </h2>
                        <div className="space-y-4 text-[var(--dark-gray)]">
                            <p>
                                BUGE Foods recognises the importance of continuous awareness on gender equality and unconscious bias. The company commits to:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Organising its first internal awareness and unconscious bias training session in the second quarter of 2026, followed by annual sessions.</li>
                                <li>Engaging external experts or collaborating with institutions when necessary.</li>
                                <li>Recording attendance and feedback for future improvements.</li>
                            </ul>
                            <div className="bg-gray-50 p-4 rounded-lg mt-4">
                                <p className="font-medium">Past Initiatives:</p>
                                <p>In 2023, Assoc. Prof. Dr. Buket Aşkın participated in the "Gender Equality and Women's Economic Participation" training organised by the Edirne Commodity Exchange, reflecting the company's proactive stance toward gender awareness.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 9: Publication */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            9. Publication and Accessibility
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-[var(--dark-gray)] ml-4">
                            <li>This document is a public document.</li>
                            <li>It will be published on the official website and made available to all employees and partners.</li>
                            <li>Hard copies are stored at both company sites (HQ and production facility).</li>
                        </ul>
                    </section>

                    {/* Section 10: Signature */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            10. Signature and Approval
                        </h2>
                        <p className="text-[var(--dark-gray)] mb-4">Signed on behalf of BUGE GIDA ARGE DANIŞMANLIK SANAYİ TİCARET A.Ş.</p>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-[var(--dark-gray)]">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Title</th>
                                        <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-200 px-4 py-2">Assoc. Prof. Dr. Buket Aşkın</td>
                                        <td className="border border-gray-200 px-4 py-2">Chair of the Board & Gender Equality Officer</td>
                                        <td className="border border-gray-200 px-4 py-2">20.10.2025</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section 11: Annex */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--dark-blue)' }}>
                            11. Annex / Appendix – Gender Equality Action Plan & KPIs
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-[var(--dark-gray)] text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-200 px-3 py-2 text-left">Objective</th>
                                        <th className="border border-gray-200 px-3 py-2 text-left">Action / Measure</th>
                                        <th className="border border-gray-200 px-3 py-2 text-left">Indicator (KPI)</th>
                                        <th className="border border-gray-200 px-3 py-2 text-left">Timeline</th>
                                        <th className="border border-gray-200 px-3 py-2 text-left">Responsible</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-200 px-3 py-2">Formalise and publish the GEP</td>
                                        <td className="border border-gray-200 px-3 py-2">Upload signed GEP to company website as a public document</td>
                                        <td className="border border-gray-200 px-3 py-2">Public link available online</td>
                                        <td className="border border-gray-200 px-3 py-2">By Q4 2025</td>
                                        <td className="border border-gray-200 px-3 py-2">Gender Equality Officer</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 px-3 py-2">Assign responsibility & resources</td>
                                        <td className="border border-gray-200 px-3 py-2">Appoint Assoc. Prof. Dr. Buket Aşkın as Gender Equality Officer</td>
                                        <td className="border border-gray-200 px-3 py-2">Official appointment announced</td>
                                        <td className="border border-gray-200 px-3 py-2">By Q4 2025</td>
                                        <td className="border border-gray-200 px-3 py-2">Board of Directors</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 px-3 py-2">Start data collection & monitoring</td>
                                        <td className="border border-gray-200 px-3 py-2">Record and store sex-disaggregated employee data</td>
                                        <td className="border border-gray-200 px-3 py-2">First internal gender data record completed</td>
                                        <td className="border border-gray-200 px-3 py-2">By Q4 2025</td>
                                        <td className="border border-gray-200 px-3 py-2">HR / Admin</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 px-3 py-2">Awareness & unconscious bias training</td>
                                        <td className="border border-gray-200 px-3 py-2">First training session on gender equality & bias</td>
                                        <td className="border border-gray-200 px-3 py-2">1 training delivered</td>
                                        <td className="border border-gray-200 px-3 py-2">Q2 2026</td>
                                        <td className="border border-gray-200 px-3 py-2">Gender Equality Officer</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 px-3 py-2">Harassment reporting mechanism</td>
                                        <td className="border border-gray-200 px-3 py-2">Create email/form for confidential reporting</td>
                                        <td className="border border-gray-200 px-3 py-2">Reporting channel active and shared with employees</td>
                                        <td className="border border-gray-200 px-3 py-2">By Q4 2025</td>
                                        <td className="border border-gray-200 px-3 py-2">HR + Legal</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 px-3 py-2">Promote women's leadership visibility</td>
                                        <td className="border border-gray-200 px-3 py-2">Publish annual communication on female leadership or mentoring</td>
                                        <td className="border border-gray-200 px-3 py-2">1 update per year (website or LinkedIn)</td>
                                        <td className="border border-gray-200 px-3 py-2">From Q4 2025 onward</td>
                                        <td className="border border-gray-200 px-3 py-2">Communications</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 px-3 py-2">Annual monitoring & update of GEP</td>
                                        <td className="border border-gray-200 px-3 py-2">Review implementation progress and update if necessary</td>
                                        <td className="border border-gray-200 px-3 py-2">Annual review conducted</td>
                                        <td className="border border-gray-200 px-3 py-2">Every Q4 starting 2025</td>
                                        <td className="border border-gray-200 px-3 py-2">Gender Equality Officer & Board</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-16 bg-[var(--dark-blue)] text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold mb-2">BLENDENCE</h3>
                    <p className="mb-1 opacity-90">Nutrition that adapts.</p>
                    <p className="text-sm opacity-70 mb-6">by BUGE GIDA A.Ş.</p>
                    <div className="flex justify-center gap-6 mb-4 flex-wrap">
                        <Link href="/privacy" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                            Terms of Use
                        </Link>
                        <Link href="/food-safety" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                            Food Safety
                        </Link>
                        <Link href="/gender-equality" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                            Gender Equality
                        </Link>
                    </div>
                    <p className="text-sm opacity-60">© {new Date().getFullYear()} BLENDENCE. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
