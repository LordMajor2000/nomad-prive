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
  title: "Nomad Privé — Bespoke Luxury Travel",
  description:
    "Hyper-personalized luxury travel experiences for the discerning traveler.",
  keywords: [
    "luxury travel",
    "bespoke travel",
    "private travel",
    "premium travel",
    "Nomad Privé",
  ],
  openGraph: {
    title: "Nomad Privé",
    description: "Every journey is a masterpiece.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
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
