// Meta (Facebook/Instagram) Pixel loader.
//
// Deliberately NOT in the root layout: fbevents.js is only downloaded after the
// visitor accepts the cookie banner (see components/MetaPixel.tsx), so nothing
// reaches Meta — not even an IP address — before consent. Purchase-funnel
// events happen on shop.blendence.com and are handled there by Ticimax
// (Pixel + Conversions API); this site sends PageView on every route.
//
// The Pixel ID is public (it is visible in any page source). The Conversions
// API access token is a secret and must never be placed in this repo.
const PIXEL_ID = '2530787657403270';
const FBEVENTS_SRC = 'https://connect.facebook.net/en_US/fbevents.js';

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let bootstrapped = false;

// Meta's standard snippet, unrolled. `arguments` (not rest args) is intentional:
// fbevents.js reads queued entries as array-likes.
function bootstrap() {
  if (window.fbq) return;
  const fbq = function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (fbq.callMethod) fbq.callMethod.apply(fbq, args as unknown as unknown[]);
    else fbq.queue.push(args);
  } as unknown as Fbq;
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  const script = document.createElement('script');
  script.async = true;
  script.src = FBEVENTS_SRC;
  document.head.appendChild(script);

  // Meta's default automatic configuration (button-click events, page
  // metadata, and whatever Automatic Advanced Matching is set to in Events
  // Manager) is intentionally left ON — owner's decision, 2026-10-22. We
  // briefly shipped `fbq('set', 'autoConfig', false, ...)` here; it is removed.
  fbq('init', PIXEL_ID);
}

/** Load (first time) or re-grant (after a revoke) the Pixel. Call only after consent. */
export function enableMetaPixel() {
  if (typeof window === 'undefined') return;
  if (!bootstrapped) {
    bootstrapped = true;
    bootstrap();
  } else {
    window.fbq?.('consent', 'grant');
  }
}

/** Stop the Pixel for the rest of this page view (consent withdrawn). No-op if never loaded. */
export function disableMetaPixel() {
  if (typeof window === 'undefined' || !bootstrapped) return;
  window.fbq?.('consent', 'revoke');
}

export function trackMetaPageView() {
  window.fbq?.('track', 'PageView');
}
