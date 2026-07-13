import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createMetadata, seoConfig } from "@/lib/seo";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  applicationName: seoConfig.siteName,
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: seoConfig.iconImage,
        type: "image/png",
      },
    ],
    shortcut: seoConfig.iconImage,
    apple: [
      {
        url: seoConfig.iconImage,
        type: "image/png",
      },
    ],
  },
  ...createMetadata({
    title: "Chance & Elysee Wedding — 30 August 2026",
    description:
      "Join Chance & Elysee for their wedding celebration on 30 August 2026 at Jalia Hall, Rusororo, Kigali, Rwanda.",
  }),
};

export const viewport: Viewport = {
  themeColor: "#fdfaf3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
