import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

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
  description: "100% freeze-dried nutritional mix brand. Natural, vegan supplements with advanced freeze-drying technology. Green Mix, Red Mix, and age-specific children's nutrition.",
  keywords: "freeze dried, natural supplements, organic nutrition, vegan, BLENDENCE, BUGE GIDA, healthy nutrition, children vitamins",
  authors: [{ name: "BUGE GIDA A.Ş." }],
  openGraph: {
    title: "BLENDENCE - Naturally Powerful, Perfectly Balanced",
    description: "100% freeze-dried nutritional mix brand",
    siteName: "BLENDENCE",
    type: "website",
    locale: "en_US",
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
      </body>
    </html>
  );
}
