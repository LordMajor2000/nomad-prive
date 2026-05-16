"use client";

import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import ServicesStrip from "@/components/ServicesStrip";
import AboutSection from "@/components/AboutSection";
import PackagesPreview from "@/components/PackagesPreview";
import MomentsStrip from "@/components/MomentsStrip";
import DestinationsPreview from "@/components/DestinationsPreview";
import PressStrip from "@/components/PressStrip";
import WorldMapSection from "@/components/WorldMapSection";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import FloatingShapes from "@/components/FloatingShapes";
import ScrollProgress from "@/components/ScrollProgress";
import ImageTrail from "@/components/ImageTrail";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <ScrollProgress />
      <AmbientBackground />
      <FloatingShapes />
      <main style={{ visibility: isLoading ? "hidden" : "visible", position: "relative", zIndex: 1 }}>
        <Navigation />
        <div ref={heroRef as React.RefObject<HTMLDivElement>} style={{ position: "relative" }}>
          <HeroSection />
          <ImageTrail containerRef={heroRef as React.RefObject<HTMLElement>} />
        </div>
        <PressStrip />
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
