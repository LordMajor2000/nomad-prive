"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const packages = [
  {
    number: "01",
    name: "SIGNATURE",
    tagline: "The experience, as it should be.",
    description:
      "A fully curated experience. Every detail arranged, every moment considered. We take care of everything — you simply arrive.",
    price: "Custom quote",
    features: ["Flights & transfers", "Premium accommodation", "Private tours", "24/7 concierge"],
  },
  {
    number: "02",
    name: "BESPOKE",
    tagline: "Your vision, our expertise.",
    description:
      "We craft your journey together. Your vision, our local knowledge and connections. The result: a completely unique, never-repeated journey.",
    price: "Custom quote",
    features: ["Tailored itinerary", "Private experiences", "Local insider access", "Personal planner"],
    featured: true,
  },
  {
    number: "03",
    name: "PRIVATE COLLECTION",
    tagline: "For the select few.",
    description:
      "By referral only. Limited availability. The most exclusive experiences — places and moments inaccessible to the public.",
    price: "By referral only",
    features: ["Exclusive access", "Ultra-private venues", "Personal escort", "Limited bookings"],
  },
];

export default function PackagesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="csomagok"
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg-surface)",
        position: "relative",
      }}
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
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
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "var(--gold-primary)",
            }}
          />
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
        <h2
          ref={headingRef}
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--cream)",
            margin: 0,
            opacity: 0,
          }}
        >
          Choose the experience{" "}
          <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
            made for you
          </em>
        </h2>
      </div>

      {/* Cards grid */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            ref={(el) => { cardsRef.current[i] = el; }}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
            style={{
              background: pkg.featured ? "var(--bg-surface-2)" : "var(--bg-primary)",
              border: pkg.featured
                ? "1px solid rgba(201,169,110,0.35)"
                : "1px solid rgba(201,169,110,0.1)",
              borderRadius: "2px",
              padding: "clamp(2rem, 4vw, 3rem)",
              position: "relative",
              cursor: "pointer",
              opacity: 0,
            }}
          >
            {/* Gold top accent */}
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

            {/* Featured glow */}
            {pkg.featured && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 70%)",
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

            {/* Package name */}
            <h3
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--cream)",
                margin: "0 0 0.5rem 0",
              }}
            >
              {pkg.name}
            </h3>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "0.9rem",
                fontStyle: "italic",
                color: "var(--gold-primary)",
                margin: "0 0 1.5rem 0",
              }}
            >
              {pkg.tagline}
            </p>

            {/* Divider */}
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "rgba(201,169,110,0.3)",
                marginBottom: "1.5rem",
              }}
            />

            {/* Description */}
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.8,
                color: "var(--muted)",
                margin: "0 0 2rem 0",
                fontWeight: 300,
              }}
            >
              {pkg.description}
            </p>

            {/* Features */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 2.5rem 0",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {pkg.features.map((feature) => (
                <li
                  key={feature}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontSize: "0.8rem",
                    color: "var(--cream)",
                    opacity: 0.7,
                    letterSpacing: "0.05em",
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "var(--gold-primary)",
                      flexShrink: 0,
                    }}
                  />
                  {feature}
                </li>
              ))}
            </ul>

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
              <span
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gold-primary)",
                  fontWeight: 500,
                }}
              >
                {pkg.price}
              </span>
              <motion.a
                href="#kapcsolat"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#kapcsolat")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
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
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--gold-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--cream)";
                }}
              >
                Enquire
                <span>→</span>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
