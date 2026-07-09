import type { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n-config';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  return pageMetadata(safe, 'approach');
}

export default function ApproachLayout({ children }: { children: React.ReactNode }) {
  return children;
}
