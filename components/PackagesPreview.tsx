"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

const packageDefs = [
  { number: "01", name: "SIGNATURE", taglineKey: "tagline1" as const, featured: false },
  { number: "02", name: "PRIVÉ", taglineKey: "tagline2" as const, featured: true },
  { number: "03", name: "GRAND PRIVÉ", taglineKey: "tagline3" as const, featured: false },
];

export default function PackagesPreview() {
  const t = useTranslations("packages");
  const packages = packageDefs.map((p) => ({ ...p, tagline: t(p.taglineKey) }));
  const sectionRef = useRef<HTMLElement>(null);
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
    }, sectionRef);

    return () => ctx.revert();
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 12vw, 10rem) 0",
        background: "var(--bg-surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
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
                {t("label")}
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
              {t("headingPre")}{" "}
              <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
                {t("headingEm")}
              </em>
            </h2>
          </div>

          <Link
            href="/packages"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderBottom: "1px solid rgba(201,169,110,0.3)",
              paddingBottom: "2px",
              whiteSpace: "nowrap",
            }}
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>

      {/* Cards grid */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {packages.map((pkg) => (
            <Link key={pkg.name} href="/packages" style={{ textDecoration: "none", display: "block" }}>
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
              style={{
                background: pkg.featured ? "var(--bg-surface-2)" : "var(--bg-primary)",
                border: pkg.featured
                  ? "1px solid rgba(201,169,110,0.35)"
                  : "1px solid rgba(201,169,110,0.1)",
                borderRadius: "2px",
                padding: "2rem",
                position: "relative",
                cursor: "pointer",
                height: "100%",
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

                <div
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    color: "var(--gold-primary)",
                    marginBottom: "1rem",
                    opacity: 0.6,
                  }}
                >
                  {pkg.number}
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "var(--cream)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  {pkg.name}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    color: "var(--gold-primary)",
                    margin: "0 0 1.5rem 0",
                    lineHeight: 1.5,
                  }}
                >
                  {pkg.tagline}
                </p>

                <div
                  style={{
                    width: "30px",
                    height: "1px",
                    background: "rgba(201,169,110,0.3)",
                    marginBottom: "1.5rem",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
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
    </section>
  );
}
