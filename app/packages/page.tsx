"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const packages = [
  {
    number: "01",
    name: "SIGNATURE",
    tagline: "Your journey, perfectly curated.",
    description:
      "For travelers who want every detail arranged without lifting a finger. We handle hotels, transfers, dining reservations and local experiences — all hand-selected.",
    includes: [
      "Bespoke itinerary planning",
      "Hand-picked 5-star hotels & villas",
      "Private airport transfers",
      "Restaurant & experience reservations",
      "24/7 travel concierge",
      "On-trip support line",
    ],
    travelStyle: "Business class flights, private ground transfers",
    featured: false,
  },
  {
    number: "02",
    name: "PRIVÉ",
    tagline: "No limits. No compromises.",
    description:
      "Everything in Signature, elevated. Private jet options, yacht charters, exclusive villa estates and a dedicated travel designer who becomes your personal expert for every trip.",
    includes: [
      "Everything in Signature",
      "Private jet coordination",
      "Yacht & sailing charter options",
      "Exclusive villa & estate access",
      "Dedicated personal travel designer",
      "VIP destination experiences",
      "Sports car transport service*",
    ],
    travelStyle: "Private jet, yacht, helicopter transfers",
    note: "*We arrange transport of your own luxury vehicle to the destination",
    featured: true,
  },
  {
    number: "03",
    name: "GRAND PRIVÉ",
    tagline: "By referral only. For those who want the impossible.",
    description:
      "There are no packages at this level — only possibilities. Reserved for clients referred by existing members. If you have to ask the price, this isn't for you.",
    includes: [
      "Everything in Privé",
      "Island buyouts & private resort access",
      "Your own sports car on the Stelvio Pass",
      "Custom expedition design",
      "Multi-destination private jet itineraries",
      "Vetted security & logistics",
      "Zero digital footprint option",
    ],
    travelStyle: "Fully private, fully bespoke",
    featured: false,
  },
];

export default function PackagesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const calloutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      if (calloutRef.current) {
        gsap.fromTo(
          calloutRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: calloutRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navigation />

      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          padding: "10rem clamp(1.5rem, 5vw, 4rem) 5rem",
          maxWidth: "1400px",
          margin: "0 auto",
          opacity: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "var(--gold-primary)" }} />
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
            }}
          >
            Packages
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            color: "var(--cream)",
            margin: "0 0 1.5rem 0",
            lineHeight: 1.1,
          }}
        >
          Choose the Experience{" "}
          <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
            Made for You
          </em>
        </h1>
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            lineHeight: 1.8,
            color: "var(--muted)",
            maxWidth: "560px",
            fontWeight: 300,
          }}
        >
          Three levels of service. One standard of excellence. Each package is a complete service — we handle every detail so you never have to.
        </p>
      </div>

      {/* Packages grid */}
      <div
        style={{
          padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              style={{
                background: pkg.featured ? "var(--bg-surface-2)" : "var(--bg-surface)",
                border: pkg.featured
                  ? "1px solid rgba(201,169,110,0.35)"
                  : "1px solid rgba(201,169,110,0.1)",
                borderRadius: "2px",
                padding: "clamp(2rem, 4vw, 3rem)",
                position: "relative",
                opacity: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: pkg.featured
                    ? "linear-gradient(90deg, var(--gold-primary), var(--gold-light), var(--gold-primary))"
                    : "linear-gradient(90deg, transparent, var(--gold-primary), transparent)",
                }}
              />

              {pkg.featured && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 70%)",
                    pointerEvents: "none",
                    borderRadius: "2px",
                  }}
                />
              )}

              {/* Number */}
              <div
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  color: "var(--gold-primary)",
                  marginBottom: "1.5rem",
                  opacity: 0.6,
                }}
              >
                {pkg.number}
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--cream)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                {pkg.name}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  color: "var(--gold-primary)",
                  margin: "0 0 1.5rem 0",
                }}
              >
                {pkg.tagline}
              </p>

              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "rgba(201,169,110,0.3)",
                  marginBottom: "1.5rem",
                }}
              />

              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.85,
                  color: "var(--muted)",
                  margin: "0 0 2rem 0",
                  fontWeight: 300,
                }}
              >
                {pkg.description}
              </p>

              {/* Includes */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 2rem 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                  flex: 1,
                }}
              >
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      fontSize: "0.85rem",
                      color: "var(--cream)",
                      opacity: 0.8,
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--gold-primary)",
                        flexShrink: 0,
                        marginTop: "1px",
                        fontSize: "0.9rem",
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Travel style */}
              <div
                style={{
                  padding: "1rem 1.25rem",
                  background: "rgba(201,169,110,0.05)",
                  border: "1px solid rgba(201,169,110,0.1)",
                  borderRadius: "1px",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--gold-primary)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Travel Style
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--cream)",
                    opacity: 0.7,
                    fontStyle: "italic",
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  }}
                >
                  {pkg.travelStyle}
                </div>
              </div>

              {/* Note */}
              {pkg.note && (
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    margin: "0 0 1.5rem 0",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                  }}
                >
                  {pkg.note}
                </p>
              )}

              {/* Price & CTA */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(201,169,110,0.1)",
                  paddingTop: "1.5rem",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <Link
                  href="/contact"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--cream)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    opacity: 0.6,
                    transition: "opacity 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--cream)";
                  }}
                >
                  Enquire →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sports Car Callout */}
      <div
        style={{
          padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          ref={calloutRef}
          style={{
            background: "var(--bg-surface)",
            border: "1px solid rgba(201,169,110,0.3)",
            borderRadius: "2px",
            padding: "clamp(2.5rem, 5vw, 4rem)",
            position: "relative",
            overflow: "hidden",
            opacity: 0,
          }}
        >
          {/* Gold corner accents */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, var(--gold-primary), var(--gold-light), var(--gold-primary))",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.07) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
            className="block md:grid"
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>🏎</span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--gold-primary)",
                  }}
                >
                  Exclusive Feature
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  margin: "0 0 1rem 0",
                  lineHeight: 1.2,
                }}
              >
                Drive the Road You've Always Dreamed Of
              </h3>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                  lineHeight: 1.8,
                  color: "var(--muted)",
                  margin: 0,
                  maxWidth: "600px",
                  fontWeight: 300,
                }}
              >
                We ship your own luxury or sports car to any destination in Europe. Imagine your Ferrari on the Stelvio Pass. Your Porsche through the Swiss Alps. We handle the logistics — you handle the drive.
              </p>
            </div>
            <div className="hidden md:block">
              <div
                style={{
                  textAlign: "center",
                  padding: "1.5rem",
                  border: "1px solid rgba(201,169,110,0.15)",
                  borderRadius: "2px",
                  minWidth: "160px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                    filter: "sepia(1) saturate(2) hue-rotate(10deg)",
                  }}
                >
                  🏎
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gold-primary)",
                  }}
                >
                  Your car.<br />Any road.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
