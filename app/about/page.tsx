"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WorldMap from "@/components/WorldMap";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("aboutPage");
  const heroRef = useRef<HTMLElement>(null);

  const stats = [
    { number: "22+", label: t("stat1Label") },
    { number: "4", label: t("stat2Label") },
    { number: "100%", label: t("stat3Label") },
    { number: "0", label: t("stat4Label") },
  ];

  const howWeWork = [
    {
      number: "01",
      title: t("card1Title"),
      body: t("card1Body"),
    },
    {
      number: "02",
      title: t("card2Title"),
      body: t("card2Body"),
    },
    {
      number: "03",
      title: t("card3Title"),
      body: t("card3Body"),
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const els = heroRef.current.querySelectorAll("[data-hero]");
        gsap.fromTo(els, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15, delay: 0.3,
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          style={{
            padding: "clamp(10rem, 18vw, 16rem) clamp(1.5rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)",
            background: "#060606",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 40%, rgba(201,169,110,0.04) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div data-hero style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold-primary)", marginBottom: "2rem", opacity: 0 }}>
              {t("heroLabel")}
            </div>
            <h1 data-hero style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 700, color: "var(--cream)", margin: "0 0 1.5rem", lineHeight: 1.1, opacity: 0 }}>
              {t("heroHeadingPre")}<br />
              <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>{t("heroHeadingEm")}</em>
            </h1>
            <p data-hero style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.8, color: "var(--muted)", maxWidth: "640px", fontWeight: 300, opacity: 0 }}>
              {t("heroSubheading")}
            </p>
          </div>
        </section>

        {/* ── SPLIT: image left, story right ── */}
        <section style={{ background: "var(--bg-primary)", padding: "0" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "600px" }}
            className="split-grid"
          >
            {/* Left — full-bleed image */}
            <div style={{ position: "relative", minHeight: "500px", overflow: "hidden" }}>
              <Image
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=85"
                alt="Travelling"
                fill
                style={{ objectFit: "cover" }}
                sizes="50vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, var(--bg-primary) 100%)" }} />
            </div>

            {/* Right — text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(2rem, 5vw, 5rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <div style={{ width: "40px", height: "1px", background: "var(--gold-primary)", marginBottom: "2rem" }} />
              <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "var(--cream)", margin: "0 0 2rem", lineHeight: 1.2 }}>
                {t("storyHeading")}
              </h2>
              <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", lineHeight: 1.9, color: "var(--muted)", marginBottom: "1.5rem", fontWeight: 300 }}>
                {t("storyBody1")}
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", lineHeight: 1.9, color: "var(--muted)", marginBottom: "1.5rem", fontWeight: 300 }}>
                {t("storyBody2")}
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", lineHeight: 1.9, color: "var(--muted)", fontWeight: 300 }}>
                {t("storyBody3")}
              </p>
            </motion.div>
          </div>

          <style>{`@media (max-width: 768px) { .split-grid { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* ── STATS STRIP ── */}
        <section style={{ background: "#060606", borderTop: "1px solid rgba(201,169,110,0.08)", borderBottom: "1px solid rgba(201,169,110,0.08)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }} className="stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ textAlign: "center", padding: "1rem 0" }}
              >
                <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--gold-primary)", lineHeight: 1, marginBottom: "0.5rem" }}>
                  {s.number}
                </div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted)", opacity: 0.7 }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
          <style>{`@media (max-width: 600px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
        </section>

        {/* ── FULL-WIDTH IMAGE BREAK ── */}
        <div style={{ position: "relative", height: "clamp(280px, 40vw, 480px)", overflow: "hidden" }}>
          <Image
            src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1800&q=80"
            alt="Moroccan tiles"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #060606 0%, transparent 20%, transparent 80%, var(--bg-primary) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <blockquote style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.2rem, 3vw, 2rem)", fontStyle: "italic", color: "rgba(255,255,255,0.9)", textAlign: "center", maxWidth: "700px", padding: "0 2rem", lineHeight: 1.5, textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
              &ldquo;{t("quote")}&rdquo;
            </blockquote>
          </div>
        </div>

        {/* ── HOW WE WORK ── */}
        <section style={{ padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", background: "var(--bg-primary)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div style={{ width: "50px", height: "1px", background: "var(--gold-primary)", marginBottom: "1rem" }} />
              <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "var(--cream)", margin: "0 0 clamp(2.5rem, 5vw, 4rem)" }}>
                {t("howWeWorkHeading")}
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }} className="work-grid">
              {howWeWork.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  style={{
                    background: "#0d0d0d",
                    padding: "3rem 2.5rem",
                    position: "relative",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px rgba(201,169,110,0.15)", lineHeight: 1, marginBottom: "2rem", userSelect: "none" }}>
                    {card.number}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "var(--cream)", margin: "0 0 1rem" }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--muted)", margin: 0, fontWeight: 300 }}>
                    {card.body}
                  </p>
                  {/* bottom gold accent */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: i === 1 ? "linear-gradient(90deg, var(--gold-primary), var(--gold-light), var(--gold-primary))" : "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)" }} />
                </motion.div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) { .work-grid { grid-template-columns: 1fr !important; } }
            @media (min-width: 601px) and (max-width: 900px) { .work-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          `}</style>
        </section>

        {/* ── SECOND IMAGE: split reversed ── */}
        <section style={{ background: "#060606" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "500px" }} className="split-grid-2">
            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(2rem, 5vw, 5rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <div style={{ width: "40px", height: "1px", background: "var(--gold-primary)", marginBottom: "2rem" }} />
              <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "var(--cream)", margin: "0 0 2rem", lineHeight: 1.2 }}>
                {t("referralHeading")}
              </h2>
              <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", lineHeight: 1.9, color: "var(--muted)", marginBottom: "1.5rem", fontWeight: 300 }}>
                {t("referralBody1")}
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", lineHeight: 1.9, color: "var(--muted)", marginBottom: "2.5rem", fontWeight: 300 }}>
                {t("referralBody2")}
              </p>
              <Link
                href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--gold-primary)", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "1px solid rgba(201,169,110,0.4)", paddingBottom: "2px", width: "fit-content" }}
              >
                {t("getInTouch")}
              </Link>
            </motion.div>

            {/* Right — image */}
            <div style={{ position: "relative", minHeight: "400px", overflow: "hidden" }}>
              <Image
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85"
                alt="Clouds from above"
                fill
                style={{ objectFit: "cover" }}
                sizes="50vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, transparent 60%, #060606 100%)" }} />
            </div>
          </div>
          <style>{`@media (max-width: 768px) { .split-grid-2 { grid-template-columns: 1fr !important; } }`}</style>
        </section>

        {/* ── WORLD MAP ── */}
        <WorldMap />

        {/* ── CTA ── */}
        <section style={{ padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", background: "var(--bg-primary)", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold-primary)", marginBottom: "1.5rem", opacity: 0.7 }}>
              {t("ctaLabel")}
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 3rem)", fontWeight: 700, color: "var(--cream)", margin: "0 0 2.5rem", lineHeight: 1.2 }}>
              {t("ctaHeading")}
            </h2>
            <Link
              href="/contact"
              style={{ display: "inline-block", padding: "1rem 3rem", background: "transparent", border: "1px solid rgba(201,169,110,0.5)", color: "var(--gold-primary)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,169,110,0.08)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.5)"; }}
            >
              {t("ctaButton")}
            </Link>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
