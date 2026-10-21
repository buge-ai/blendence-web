'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { CONSENT_CHANGED_EVENT, readStoredConsent } from '@/lib/consent';
import { disableMetaPixel, enableMetaPixel, trackMetaPageView } from '@/lib/metaPixel';

// Consent-gated Meta Pixel. Renders nothing; reacts to the cookie banner:
//  - stored "granted" on load, or "Kabul Et" clicked → load Pixel + PageView
//  - "Reddet" / withdrawn later → revoke (and the script never loads if it never was)
//  - client-side route changes → one PageView per new path (the App Router
//    doesn't reload the page, so the Pixel's own load-time PageView isn't enough)
export default function MetaPixel() {
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  const granted = useRef(false);
  const trackedPath = useRef<string | null>(null);

  const trackCurrentPath = () => {
    if (!granted.current || trackedPath.current === pathRef.current) return;
    trackedPath.current = pathRef.current;
    trackMetaPageView();
  };

  useEffect(() => {
    pathRef.current = pathname;
    trackCurrentPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const apply = (isGranted: boolean) => {
      granted.current = isGranted;
      if (isGranted) {
        enableMetaPixel();
        trackCurrentPath();
      } else {
        disableMetaPixel();
        trackedPath.current = null;
      }
    };

    apply(readStoredConsent() === 'granted');

    const onChange = (e: Event) => apply(Boolean((e as CustomEvent<{ granted: boolean }>).detail?.granted));
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
