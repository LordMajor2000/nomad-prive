"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    label: "Private Jet",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 18l6-6 4 2 8-8 2 2-6 8 4 2-2 4-4-2-2 4-3-1 1-4-8-1z"/>
      </svg>
    ),
  },
  {
    label: "Yacht & Sailing",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4v18M16 4L6 22h20L16 4z"/>
        <path d="M4 26h24"/>
        <path d="M8 26c0 2 3 3 8 3s8-1 8-3"/>
      </svg>
    ),
  },
  {
    label: "Sports Car",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20h26v3H3z"/>
        <path d="M6 20l3-6h14l3 6"/>
        <path d="M9 14l2-4h10l2 4"/>
        <circle cx="9" cy="23" r="2.5"/>
        <circle cx="23" cy="23" r="2.5"/>
      </svg>
    ),
  },
  {
    label: "Exclusive Villas",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 28V14l12-10 12 10v14H4z"/>
        <path d="M12 28v-8h8v8"/>
        <path d="M4 14h24"/>
      </svg>
    ),
  },
  {
    label: "Bespoke Itineraries",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8l8 4 4-4 8 4v16l-8-4-4 4-8-4V8z"/>
        <path d="M14 12v16M18 8v16"/>
      </svg>
    ),
  },
  {
    label: "Helicopter Transfers",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 16h24"/>
        <path d="M14 10h6v12h-6z"/>
        <path d="M20 16l6 4"/>
        <path d="M14 16l-4 4"/>
        <path d="M17 10V6"/>
        <path d="M20 22v4"/>
      </svg>
    ),
  },
  {
    label: "Cruise & Expedition",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22l4-10h16l4 10H4z"/>
        <path d="M12 12V8h8v4"/>
        <path d="M16 8V4"/>
        <path d="M2 26s5 2 10 0 10 0 10 0"/>
      </svg>
    ),
  },
  {
    label: "Vehicle Transport",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h28v4H2z"/>
        <path d="M8 20l2-5h12l2 5"/>
        <circle cx="8" cy="25" r="2"/>
        <circle cx="24" cy="25" r="2"/>
        <path d="M2 20V14l4-4h8l4 4"/>
      </svg>
    ),
  },
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
        background: "#0f0f0f",
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  flexShrink: 0,
                }}
              >
                {service.icon}
              </div>
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  whiteSpace: "nowrap",
                  fontWeight: 400,
                  fontVariant: "small-caps",
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
                  background: "rgba(201,169,110,0.2)",
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
