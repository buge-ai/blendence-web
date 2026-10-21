'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_STORAGE_KEY,
  OPEN_COOKIE_SETTINGS_EVENT,
  readStoredConsent,
} from '@/lib/consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Consent Mode v2 banner. Analytics is denied by default (see the
// consent-default script in the root layout); this only flips it to
// granted/denied once the visitor actually chooses. Reject stays denied
// (already the default) but we still call `update` so the choice is
// recorded and any queued hit resolves immediately instead of waiting for
// the `wait_for_update` timeout.
export default function CookieConsent() {
  const { t, language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // No stored choice (or storage unavailable) → show the banner rather than
    // silently skipping consent.
    if (!readStoredConsent()) setVisible(true);

    // The footer's "Çerez Tercihleri" link re-opens the banner so a choice can
    // be changed or withdrawn at any time.
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, granted ? 'granted' : 'denied');
    } catch {
      // best-effort; the consent update below still applies for this visit
    }
    window.gtag?.('consent', 'update', {
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
      analytics_storage: granted ? 'granted' : 'denied',
    });
    // Tell the other consent-gated tools (Meta Pixel) about the choice.
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: { granted } }));
    setVisible(false);
  };

  if (!visible) return null;

  const b = t.cookieBanner;

  return (
    <div className="cookie-banner" role="dialog" aria-label={b.title} aria-live="polite">
      <p>
        {b.message}{' '}
        <Link href={`/${language}/privacy`}>{b.policyLinkLabel}</Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn reject" onClick={() => choose(false)}>
          {b.rejectLabel}
        </button>
        <button type="button" className="cookie-btn accept" onClick={() => choose(true)}>
          {b.acceptLabel}
        </button>
      </div>

      <style jsx>{`
        .cookie-banner {
          position: fixed;
          left: 1.5rem;
          right: 1.5rem;
          bottom: 1.5rem;
          z-index: 9999;
          max-width: 640px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem 1.5rem;
          font-family: var(--font-montserrat), 'Montserrat', sans-serif;
        }

        .cookie-banner p {
          flex: 1 1 320px;
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.6;
          color: #444;
        }

        .cookie-banner :global(a) {
          color: #1a4d5c;
          text-decoration: underline;
        }

        .cookie-actions {
          display: flex;
          gap: 0.75rem;
          flex: 0 0 auto;
        }

        .cookie-btn {
          padding: 0.65rem 1.4rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          border: 1.5px solid #1a4d5c;
          font-family: inherit;
        }

        .cookie-btn.reject {
          background: transparent;
          color: #1a4d5c;
        }

        .cookie-btn.accept {
          background: #1a4d5c;
          color: #fff;
        }

        @media (max-width: 640px) {
          .cookie-banner {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
            flex-direction: column;
            align-items: stretch;
          }

          /* In row layout, "flex: 1 1 320px" sets a min-width. Once the
             container switches to column above, that same basis applies to
             height instead and stretches the paragraph into a tall empty
             box — reset it back to auto here. */
          .cookie-banner p {
            flex: 1 1 auto;
          }

          .cookie-actions {
            justify-content: stretch;
          }

          .cookie-btn {
            flex: 1;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
