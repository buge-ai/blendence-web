import type { Metadata } from 'next';
import NotFoundContent from '@/app/components/NotFoundContent';

export const metadata: Metadata = {
  title: '404 | BLENDENCE',
};

// Rendered inside app/[locale]/layout.tsx, so the LanguageProvider (and the
// cookie banner) are already there and the page is server-rendered in the
// visitor's language.
export default function LocaleNotFound() {
  return <NotFoundContent />;
}
