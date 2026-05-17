import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "@/messages/en.json";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nomad Privé — Bespoke Luxury Travel",
    template: "%s · Nomad Privé",
  },
  description:
    "Private, hyper-personalized luxury travel curated for the discerning traveler. Every detail arranged — from villa to chauffeur to table.",
  keywords: [
    "luxury travel", "bespoke travel", "private travel",
    "premium travel", "luxury vacation", "Nomad Privé",
    "private villa", "tailored itinerary",
  ],
  authors: [{ name: "Nomad Privé" }],
  creator: "Nomad Privé",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Nomad Privé — Bespoke Luxury Travel",
    description: "Private travel, perfected. Every journey is a masterpiece.",
    type: "website",
    siteName: "Nomad Privé",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nomad Privé — Bespoke Luxury Travel",
    description: "Private travel, perfected.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Preload LCP hero image */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85"
          fetchPriority="high"
        />
      </head>
      <body
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
        }}
      >
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
