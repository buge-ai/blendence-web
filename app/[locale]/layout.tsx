import type { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n-config';
import { LanguageProvider } from '@/lib/LanguageContext';
import { pageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

// Locale-wide metadata: sets og:locale (tr_TR / en_US) + alternate for the
// whole subtree and provides the homepage title/description (the locale root
// page.tsx is a client component and cannot export its own metadata). Nested
// route layouts override title/description for their own pages.
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const safe: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
    return pageMetadata(safe, 'home');
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate that the incoming locale is supported
    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    return (
        <LanguageProvider initialLocale={locale as Locale}>
            {children}
        </LanguageProvider>
    );
}
