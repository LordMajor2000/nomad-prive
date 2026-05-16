"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export default function QuizCTA() {
  const t = useTranslations("quizCTA");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ position: "relative", height: "clamp(420px, 55vw, 580px)", overflow: "hidden" }}
    >
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
          linear-gradient(to bottom, rgba(6,6,6,0.72) 0%, rgba(6,6,6,0.35) 40%, rgba(6,6,6,0.7) 100%),
          linear-gradient(to right, rgba(6,6,6,0.75) 0%, transparent 55%)
        `,
      }} />

      {/* Feather into sections */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "130px", background: "linear-gradient(to bottom, var(--bg-primary), transparent)", zIndex: 2 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "130px", background: "linear-gradient(to top, var(--bg-primary), transparent)", zIndex: 2 }} />

      {/* Content — left aligned */}
      <div style={{
        position: "relative",
        zIndex: 3,
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 clamp(1.5rem, 5vw, 5rem)",
      }}>
        <motion.div
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "520px" }}
        >
          <p style={{
            fontSize: "0.58rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "var(--gold-primary)",
            marginBottom: "1.25rem",
            opacity: 0.85,
          }}>
            {t("eyebrow")}
          </p>

          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 700,
            color: "var(--cream)",
            margin: "0 0 2rem",
            lineHeight: 1.15,
          }}>
            {t("headingPre")}{" "}
            <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>{t("headingEm")}</em>
          </h2>

          {/* Magnetic-feel CTA */}
          <DirectionalButton href="/quiz" label={t("cta")} />
        </motion.div>
      </div>
    </section>
  );
}

function DirectionalButton({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);

    el.style.setProperty("--hover-x", `${x}px`);
    el.style.setProperty("--hover-y", `${y}px`);
    el.classList.add("dir-hover");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.classList.remove("dir-hover");
  };

  return (
    <>
      <style>{`
        .dir-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2.5rem;
          background: transparent;
          border: 1px solid rgba(201,169,110,0.45);
          color: var(--gold-primary);
          text-decoration: none;
          font-size: 0.68rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s ease-out, gap 0.25s cubic-bezier(0.16,1,0.3,1), transform 0.15s ease-out;
        }
        .dir-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(201,169,110,0.1);
          opacity: 0;
          transition: opacity 0.25s ease-out;
        }
        .dir-btn.dir-hover::before { opacity: 1; }
        .dir-btn.dir-hover { border-color: var(--gold-primary); gap: 1.1rem; }
        .dir-btn:active { transform: scale(0.97); }
      `}</style>
      <a
        ref={ref}
        href={href}
        className="dir-btn"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {label}
        <span style={{ fontSize: "1rem", transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)" }}>→</span>
      </a>
    </>
  );
}
