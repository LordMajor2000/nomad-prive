"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PackagesPage() {
  const t = useTranslations("packagesPage");
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const packages = [
    {
      number: "01",
      name: "SIGNATURE",
      tagline: t("signature.tagline"),
      description: t("signature.description"),
      href: "/packages/signature",
      featured: false,
    },
    {
      number: "02",
      name: "PRIVÉ",
      tagline: t("prive.tagline"),
      description: t("prive.description"),
      href: "/packages/prive",
      featured: true,
    },
    {
      number: "03",
      name: "GRAND PRIVÉ",
      tagline: t("grandPrive.tagline"),
      description: t("grandPrive.description"),
      href: "/packages/grand-prive",
      featured: false,
    },
  ];

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
          padding: "14rem clamp(1.5rem, 5vw, 4rem) 5rem",
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
            {t("heroLabel")}
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
          {t("heroHeadingPre")}{" "}
          <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
            {t("heroHeadingEm")}
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
          {t("heroSubheading")}
        </p>
      </div>

      {/* Packages grid */}
      <div
        style={{
          padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(6rem, 12vw, 10rem)",
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
            <Link
              key={pkg.name}
              href={pkg.href}
              style={{ textDecoration: "none", display: "block", height: "100%" }}
            >
              <motion.div
                ref={(el) => { cardsRef.current[i] = el; }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                style={{
                  background: pkg.featured ? "var(--bg-surface-2)" : "var(--bg-surface)",
                  border: pkg.featured
                    ? "1px solid rgba(201,169,110,0.35)"
                    : "1px solid rgba(201,169,110,0.1)",
                  borderRadius: "2px",
                  padding: "clamp(2.5rem, 4vw, 3.5rem)",
                  position: "relative",
                  opacity: 0,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  cursor: "pointer",
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
                    opacity: 0.5,
                  }}
                >
                  {pkg.number}
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.1rem)",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "var(--cream)",
                    margin: "0 0 0.6rem 0",
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
                    margin: "0 0 2rem 0",
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
                    margin: "0",
                    fontWeight: 300,
                    flex: 1,
                  }}
                >
                  {pkg.description}
                </p>

                {/* CTA row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    borderTop: "1px solid rgba(201,169,110,0.1)",
                    paddingTop: "1.5rem",
                    marginTop: "2.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--gold-primary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {t("learnMore")}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
