"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import ServicesStrip from "@/components/ServicesStrip";
import AboutSection from "@/components/AboutSection";
import PackagesPreview from "@/components/PackagesPreview";
import MomentsStrip from "@/components/MomentsStrip";
import DestinationsPreview from "@/components/DestinationsPreview";
import WorldMapSection from "@/components/WorldMapSection";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import FloatingShapes from "@/components/FloatingShapes";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <ScrollProgress />
      <AmbientBackground />
      <FloatingShapes />
      <main style={{ visibility: isLoading ? "hidden" : "visible", position: "relative", zIndex: 1 }}>
        <Navigation />
        <HeroSection />
        <ServicesStrip />
        <AboutSection />
        <PackagesPreview />
        <DestinationsPreview />
        <WorldMapSection />
        <MomentsStrip />
        <Footer />
      </main>
    </>
  );
}
