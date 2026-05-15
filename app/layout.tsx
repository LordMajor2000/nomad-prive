import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

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
  title: "Aurum Voyages — Személyre Szabott Élményutazások",
  description:
    "Nem utazást szervezünk. Emlékeket tervezünk. Hyper-perszonalizált luxusutazások a világ legkülönlegesebb helyszíneire.",
  keywords: [
    "luxus utazás",
    "személyre szabott utazás",
    "élményutazás",
    "prémium travel",
    "Aurum Voyages",
  ],
  openGraph: {
    title: "Aurum Voyages",
    description: "Minden utazás egy életmű.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className={`${playfair.variable} ${inter.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
        }}
      >
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
