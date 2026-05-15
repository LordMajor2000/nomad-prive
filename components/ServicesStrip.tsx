"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  { icon: "✈", label: "Private Jet Charters" },
  { icon: "⛵", label: "Yacht & Sailing" },
  { icon: "🏎", label: "Sports Car Experiences" },
  { icon: "🏨", label: "Exclusive Villas" },
  { icon: "🗺", label: "Bespoke Itineraries" },
  { icon: "🚁", label: "Helicopter Transfers" },
  { icon: "🚢", label: "Cruise & Expedition" },
  { icon: "🚗", label: "Vehicle Transport" },
];

export default function ServicesStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.07,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(201,169,110,0.1)",
        borderBottom: "1px solid rgba(201,169,110,0.1)",
        padding: "3rem clamp(1.5rem, 5vw, 4rem)",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "0",
          minWidth: "max-content",
        }}
      >
        {services.map((service, i) => (
          <div
            key={service.label}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              ref={(el) => { itemsRef.current[i] = el; }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0 clamp(1.5rem, 3vw, 2.5rem)",
                cursor: "default",
                opacity: 0,
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  fontSize: "1.4rem",
                  filter: "sepia(1) saturate(2) hue-rotate(10deg)",
                  display: "block",
                  lineHeight: 1,
                }}
              >
                {service.icon}
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  whiteSpace: "nowrap",
                  fontWeight: 400,
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.color = "var(--gold-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.color = "var(--muted)";
                }}
              >
                {service.label}
              </span>
            </div>

            {/* Separator */}
            {i < services.length - 1 && (
              <div
                style={{
                  width: "1px",
                  height: "40px",
                  background: "rgba(201,169,110,0.12)",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
