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

export default function SignaturePage() {
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
    t("signature.includes.0"),
    t("signature.includes.1"),
    t("signature.includes.2"),
    t("signature.includes.3"),
  ];

  const steps = [
    { num: "01", title: t("step1Title"), body: t("step1Body") },
    { num: "02", title: t("step2Title"), body: t("step2Body") },
    { num: "03", title: t("step3Title"), body: t("step3Body") },
  ];

  return (
    <>
      <Navigation />
      <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

        {/* ── HERO IMAGE ── */}
        <div style={{ position: "relative", height: "100vh", minHeight: "600px", overflow: "hidden" }}>
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&q=80"
            alt="Luxury hotel"
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(6,6,6,0.95) 0%, rgba(6,6,6,0.4) 50%, rgba(6,6,6,0.2) 100%)",
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
              01
            </p>
            <h1 data-hero style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 700,
              color: "var(--cream)",
              letterSpacing: "0.12em",
              margin: "0 0 1rem 0",
              lineHeight: 1,
              opacity: 0,
            }}>
              SIGNATURE
            </h1>
            <p data-hero style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              fontStyle: "italic",
              color: "var(--gold-primary)",
              margin: 0,
              opacity: 0,
            }}>
              {t("signature.tagline")}
            </p>
          </div>
        </div>

        {/* ── DESCRIPTION + INCLUDES ── */}
        <section style={{ padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 8vw, 7rem)", alignItems: "start" }} className="pkg-split">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div style={{ width: "40px", height: "1px", background: "var(--gold-primary)", marginBottom: "2rem" }} />
              <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.9, color: "var(--muted)", fontWeight: 300, marginBottom: "2.5rem" }}>
                {t("signature.description")}
              </p>
              <div style={{ padding: "1rem 1.5rem", background: "rgba(201,169,110,0.05)", borderLeft: "2px solid var(--gold-primary)", marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-primary)", marginBottom: "0.4rem" }}>
                  {t("travelStyleLabel")}
                </div>
                <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "0.95rem", fontStyle: "italic", color: "var(--cream)", opacity: 0.85 }}>
                  {t("signature.travelStyle")}
                </div>
              </div>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  padding: "1rem 2.5rem",
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {includes.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      padding: "1.25rem 1.5rem",
                      background: "#0d0d0d",
                      borderLeft: "1px solid rgba(201,169,110,0.15)",
                    }}
                  >
                    <Check size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.9rem", color: "var(--cream)", opacity: 0.85, fontWeight: 300, lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <style>{`@media (max-width: 768px) { .pkg-split { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* ── FULL WIDTH IMAGE ── */}
        <div style={{ position: "relative", height: "clamp(300px, 40vw, 500px)", overflow: "hidden" }}>
          <Image
            src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1800&q=80"
            alt="Hotel room with view"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, var(--bg-primary) 0%, transparent 15%, transparent 85%, var(--bg-primary) 100%)" }} />
        </div>

        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", background: "#060606" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}
            >
              <div style={{ width: "40px", height: "1px", background: "var(--gold-primary)", marginBottom: "1rem" }} />
              <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--cream)", margin: 0 }}>
                {t("howItWorksHeading")}
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }} className="steps-grid">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  viewport={{ once: true }}
                  style={{ background: "var(--bg-primary)", padding: "2.5rem", position: "relative" }}
                >
                  <div style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "3rem",
                    fontWeight: 700,
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(201,169,110,0.15)",
                    lineHeight: 1,
                    marginBottom: "1.5rem",
                    userSelect: "none",
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--cream)", margin: "0 0 0.75rem" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "var(--muted)", margin: 0, fontWeight: 300 }}>
                    {step.body}
                  </p>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)" }} />
                </motion.div>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "var(--cream)", margin: "0 0 2.5rem" }}>
              {t("signature.tagline")}
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
