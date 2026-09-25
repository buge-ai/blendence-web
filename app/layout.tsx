import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-RX67E6T3YB";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Absolute base for OG/icon URLs. Social scrapers (WhatsApp, iMessage,
// Twitter) require absolute image URLs — without metadataBase Next falls
// back to localhost and the preview image silently fails to load.
// Resolves to the Vercel production domain automatically; override with
// NEXT_PUBLIC_SITE_URL once a custom domain is attached.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3199");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "BLENDENCE - Naturally Powerful, Perfectly Balanced | BUGE GIDA A.Ş.",
  description: "100% freeze-dried nutrition mixes made from natural fruits and vegetables, designed to fit real life. Stages nutrition for every age and Reset blends for balance.",
  keywords: "freeze dried, liyofilize, natural nutrition, freeze-dried mixes, BLENDENCE, BUGE Foods, Stages, Reset, KidGrow, KidRise, TeenFocus",
  authors: [{ name: "BUGE GIDA A.Ş." }],
  openGraph: {
    title: "BLENDENCE - Naturally Powerful, Perfectly Balanced",
    description: "100% freeze-dried nutrition mixes made from natural fruits and vegetables.",
    siteName: "BLENDENCE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLENDENCE - Naturally Powerful, Perfectly Balanced",
    description: "100% freeze-dried nutritional mix brand",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} ${montserrat.className} antialiased`}>
        {children}
        {/* Google Consent Mode v2 default state — must run before gtag.js
            itself so the very first hit already carries a consent signal.
            Denied by default; CookieConsent.tsx flips this to granted (or
            re-confirms denied) once the visitor picks, and re-applies a
            stored choice on repeat visits so returning "accepted" users
            aren't reset to denied on every page load. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            var storedConsent;
            try { storedConsent = localStorage.getItem('blendence_cookie_consent'); } catch (e) {}
            var state = storedConsent === 'granted' ? 'granted' : 'denied';
            gtag('consent', 'default', {
              ad_storage: state,
              ad_user_data: state,
              ad_personalization: state,
              analytics_storage: state,
              wait_for_update: 500
            });
          `}
        </Script>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
