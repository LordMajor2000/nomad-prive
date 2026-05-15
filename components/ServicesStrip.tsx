"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plane, Anchor, Car, Home, Map, Helicopter, Ship, Truck } from "lucide-react";

const services = [
  { icon: <Plane size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Private Jet" },
  { icon: <Anchor size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Yacht & Sailing" },
  { icon: <Car size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Sports Car" },
  { icon: <Home size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Exclusive Villas" },
  { icon: <Map size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Bespoke Itineraries" },
  { icon: <Helicopter size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Helicopter Transfers" },
  { icon: <Ship size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Cruise & Expedition" },
  { icon: <Truck size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Vehicle Transport" },
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
        padding: "3rem 0",
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
          justifyContent: "center",
          gap: "0",
          minWidth: "max-content",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
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
                  background: "rgba(201,169,110,0.15)",
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
