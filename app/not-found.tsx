import type { Metadata } from 'next';
import { LanguageProvider } from '@/lib/LanguageContext';
import NotFoundContent from './components/NotFoundContent';
import CookieConsent from './components/CookieConsent';

export const metadata: Metadata = {
  title: '404 | BLENDENCE',
};

// Fallback for URLs that never reach a locale (e.g. paths with a dot such as
// /foo.php, which the middleware skips). Everything under /en or /tr is
// caught by app/[locale]/[...rest] and rendered by app/[locale]/not-found.tsx
// in the visitor's language. This one is statically prerendered, so it is
// English only.
export default function NotFound() {
  return (
    <LanguageProvider initialLocale="en">
      <NotFoundContent />
      {/* the footer's cookie-settings button needs the banner mounted */}
      <CookieConsent />
    </LanguageProvider>
  );
}
