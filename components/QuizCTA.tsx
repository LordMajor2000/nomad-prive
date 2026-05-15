"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function QuizCTA() {
  const t = useTranslations("quizCTA");

  return (
    <section
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(201,169,110,0.06)",
        borderBottom: "1px solid rgba(201,169,110,0.06)",
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <p
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold-primary)",
            marginBottom: "1.25rem",
            opacity: 0.7,
          }}
        >
          {t("eyebrow")}
        </p>

        <h2
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 700,
            color: "var(--cream)",
            margin: "0 0 2.5rem",
            lineHeight: 1.2,
          }}
        >
          {t("headingPre")}<br />
          <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>{t("headingEm")}</em>
        </h2>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Link
            href="/quiz"
            style={{
              display: "inline-block",
              padding: "1rem 3rem",
              background: "transparent",
              border: "1px solid rgba(201,169,110,0.5)",
              color: "var(--gold-primary)",
              textDecoration: "none",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              fontFamily: "var(--font-inter), Inter, sans-serif",
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
            {t("cta")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
