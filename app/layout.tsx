import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BLENDENCE - Naturally Powerful, Perfectly Balanced | BUGE GIDA A.Ş.",
  description: "100% freeze-dried nutritional mix brand. Natural, vegan supplements with advanced freeze-drying technology. Green Mix, Red Mix, and age-specific children's nutrition.",
  keywords: "freeze dried, natural supplements, organic nutrition, vegan, BLENDENCE, BUGE GIDA, healthy nutrition, children vitamins",
  authors: [{ name: "BUGE GIDA A.Ş." }],
  openGraph: {
    title: "BLENDENCE - Naturally Powerful, Perfectly Balanced",
    description: "100% freeze-dried nutritional mix brand",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${montserrat.variable} ${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
