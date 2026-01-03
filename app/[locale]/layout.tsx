import { Locale, locales } from '@/lib/i18n-config';
import { LanguageProvider } from '@/lib/LanguageContext';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
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
