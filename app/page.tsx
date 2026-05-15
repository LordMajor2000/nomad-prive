"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import ServicesStrip from "@/components/ServicesStrip";
import AboutSection from "@/components/AboutSection";
import DestinationsPreview from "@/components/DestinationsPreview";
import PackagesPreview from "@/components/PackagesPreview";
import BlogPreview from "@/components/BlogPreview";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <main style={{ visibility: isLoading ? "hidden" : "visible" }}>
        <Navigation />
        <HeroSection />
        <ServicesStrip />
        <AboutSection />
        <DestinationsPreview />
        <PackagesPreview />
        <BlogPreview />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
