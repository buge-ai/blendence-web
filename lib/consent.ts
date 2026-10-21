// Shared bits of the cookie-consent flow (banner, Meta Pixel, footer link).
//
// NOTE: the Consent Mode default script in app/layout.tsx is an inline string
// and cannot import this file, so it repeats the storage key as a literal.
// Keep the two in sync.
export const CONSENT_STORAGE_KEY = 'blendence_cookie_consent';

/** Fired on window by the banner whenever the visitor picks Accept/Reject. detail: { granted: boolean } */
export const CONSENT_CHANGED_EVENT = 'blendence:consent-changed';

/** Fired on window (e.g. by the footer link) to re-open the banner so a choice can be changed. */
export const OPEN_COOKIE_SETTINGS_EVENT = 'blendence:open-cookie-settings';

export type ConsentChoice = 'granted' | 'denied';

export function readStoredConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    // localStorage unavailable (private mode / blocked) — treat as "no choice yet"
    return null;
  }
}
