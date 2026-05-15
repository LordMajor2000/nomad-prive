"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

export default function GrandPrivePage() {
  const t = useTranslations("packagesPage");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const els = heroRef.current.querySelectorAll("[data-hero]");
        gsap.fromTo(els, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15, delay: 0.2,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const includes = [
    t("grandPrive.includes.0"),
    t("grandPrive.includes.1"),
    t("grandPrive.includes.2"),
    t("grandPrive.includes.3"),
    t("grandPrive.includes.4"),
    t("grandPrive.includes.5"),
    t("grandPrive.includes.6"),
  ];

  return (
    <>
      <Navigation />
      <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

        {/* ── HERO IMAGE ── */}
        <div style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden" }}>
          <Image
            src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1800&q=80"
            alt="Private island"
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(6,6,6,0.98) 0%, rgba(6,6,6,0.5) 50%, rgba(6,6,6,0.25) 100%)",
          }} />

          <div
            ref={heroRef}
            style={{
              position: "absolute",
              bottom: "clamp(4rem, 8vw, 7rem)",
              left: "clamp(1.5rem, 5vw, 4rem)",
              right: "clamp(1.5rem, 5vw, 4rem)",
              maxWidth: "900px",
            }}
          >
            <div data-hero style={{ opacity: 0 }}>
              <Link
                href="/packages"
                style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", textDecoration: "none", marginBottom: "1.5rem", display: "inline-block" }}
              >
                ← {t("heroLabel")}
              </Link>
            </div>
            <p data-hero style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-primary)", marginBottom: "1rem", opacity: 0 }}>
              03
            </p>
            <h1 data-hero style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              fontWeight: 700,
              color: "var(--cream)",
              letterSpacing: "0.1em",
              margin: "0 0 1rem 0",
              lineHeight: 1,
              opacity: 0,
            }}>
              GRAND PRIVÉ
            </h1>
            <p data-hero style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              fontStyle: "italic",
              color: "var(--gold-primary)",
              margin: 0,
              opacity: 0,
            }}>
              {t("grandPrive.tagline")}
            </p>
          </div>
        </div>

        {/* ── DESCRIPTION ── */}
        <section style={{ padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div style={{ width: "40px", height: "1px", background: "var(--gold-primary)", marginBottom: "2rem" }} />
              <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", lineHeight: 1.9, color: "var(--muted)", fontWeight: 300, marginBottom: "3rem", maxWidth: "680px" }}>
                {t("grandPrive.description")}
              </p>

              <div style={{ padding: "1rem 1.5rem", background: "rgba(201,169,110,0.05)", borderLeft: "2px solid var(--gold-primary)", marginBottom: "3rem", maxWidth: "400px" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-primary)", marginBottom: "0.4rem" }}>
                  {t("travelStyleLabel")}
                </div>
                <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "0.95rem", fontStyle: "italic", color: "var(--cream)", opacity: 0.85 }}>
                  {t("grandPrive.travelStyle")}
                </div>
              </div>
            </motion.div>

            {/* Includes */}
            <motion.ul
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              style={{ listStyle: "none", padding: 0, margin: "0 0 3rem 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}
            >
              {includes.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1.25rem 1.5rem",
                    background: "#0d0d0d",
                    border: "1px solid rgba(201,169,110,0.12)",
                  }}
                >
                  <Check size={15} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "0.85rem", color: "var(--cream)", opacity: 0.85, fontWeight: 300, lineHeight: 1.5 }}>
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* ── FULL WIDTH IMAGE ── */}
        <div style={{ position: "relative", height: "clamp(300px, 45vw, 560px)", overflow: "hidden" }}>
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80"
            alt="Exclusive mountain landscape"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, var(--bg-primary) 0%, transparent 15%, transparent 80%, var(--bg-primary) 100%)" }} />
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <blockquote style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              maxWidth: "600px",
              padding: "0 2rem",
              lineHeight: 1.5,
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            }}>
              &ldquo;{t("grandPrive.tagline")}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* ── CTA ── */}
        <section style={{ padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", textAlign: "center", background: "#060606" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-primary)", marginBottom: "1.5rem", opacity: 0.7 }}>
              {t("grandPrive.travelStyle")}
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "var(--cream)", margin: "0 0 2.5rem", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.3 }}>
              {t("grandPrive.description")}
            </h2>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "1.1rem 3.5rem",
                border: "1px solid rgba(201,169,110,0.5)",
                color: "var(--gold-primary)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,169,110,0.08)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.5)";
              }}
            >
              {t("enquire")}
            </Link>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
