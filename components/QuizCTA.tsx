"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function QuizCTA() {
  const t = useTranslations("quizCTA");

  return (
    <section style={{ position: "relative", height: "clamp(420px, 55vw, 600px)", overflow: "hidden" }}>
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&q=80"
        alt="Above the clouds"
        fill
        style={{ objectFit: "cover", objectPosition: "center 60%" }}
        sizes="100vw"
      />

      {/* Gradient overlays */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          linear-gradient(to bottom, rgba(6,6,6,0.7) 0%, rgba(6,6,6,0.4) 40%, rgba(6,6,6,0.65) 100%),
          linear-gradient(to right, rgba(6,6,6,0.6) 0%, transparent 60%)
        `,
      }} />

      {/* Feather into surrounding sections */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "120px",
        background: "linear-gradient(to bottom, var(--bg-primary), transparent)",
        zIndex: 2,
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
        background: "linear-gradient(to top, var(--bg-primary), transparent)",
        zIndex: 2,
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 3,
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
      }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ maxWidth: "560px" }}
        >
          <p style={{
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold-primary)",
            marginBottom: "1.25rem",
            opacity: 0.85,
          }}>
            {t("eyebrow")}
          </p>

          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--cream)",
            margin: "0 0 2.5rem",
            lineHeight: 1.15,
          }}>
            {t("headingPre")}{" "}
            <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>{t("headingEm")}</em>
          </h2>

          <Link
            href="/quiz"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 2.5rem",
              background: "transparent",
              border: "1px solid rgba(201,169,110,0.55)",
              color: "var(--gold-primary)",
              textDecoration: "none",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,169,110,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold-primary)";
              (e.currentTarget as HTMLAnchorElement).style.gap = "1.1rem";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.55)";
              (e.currentTarget as HTMLAnchorElement).style.gap = "0.75rem";
            }}
          >
            {t("cta")}
            <span style={{ fontSize: "1rem" }}>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
