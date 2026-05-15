"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import ServicesStrip from "@/components/ServicesStrip";
import PackagesPreview from "@/components/PackagesPreview";
import AboutSection from "@/components/AboutSection";
import QuizCTA from "@/components/QuizCTA";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";

export default function LocaleHome() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <AmbientBackground />
      <main style={{ visibility: isLoading ? "hidden" : "visible", position: "relative", zIndex: 1 }}>
        <Navigation />
        <HeroSection />
        <ServicesStrip />
        <PackagesPreview />
        <AboutSection />
        <QuizCTA />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
