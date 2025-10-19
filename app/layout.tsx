import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BLENDENCE - Naturally Powerful, Perfectly Balanced | BUGE GIDA A.Ş.",
  description: "Turkey's first 100% freeze-dried nutritional mix brand. Natural, vegan supplements with advanced freeze-drying technology. Green Mix, Red Mix, and age-specific children's nutrition.",
  keywords: "freeze dried, natural supplements, organic nutrition, vegan, BLENDENCE, BUGE GIDA, healthy nutrition, children vitamins",
  authors: [{ name: "BUGE GIDA A.Ş." }],
  openGraph: {
    title: "BLENDENCE - Naturally Powerful, Perfectly Balanced",
    description: "Turkey's first 100% freeze-dried nutritional mix brand",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
