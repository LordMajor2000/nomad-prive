"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

const BRAND_CHARS = "NOMAD PRIVÉ".split("");

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  const nav = [
    { label: tNav("packages"),    href: "/packages" },
    { label: tNav("experiences"), href: "/experiences" },
    { label: tNav("journal"),     href: "/journal" },
    { label: tNav("about"),       href: "/about" },
    { label: tNav("contact"),     href: "/contact" },
  ];

  return (
    <footer style={{ background: "#060606", position: "relative" }}>

      {/* ── animált shimmer tetővonal ── */}
      <div style={{ position: "relative", height: "1px", overflow: "hidden", background: "rgba(201,169,110,0.06)" }}>
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.55) 50%, transparent 100%)",
            width: "40%",
          }}
          animate={{ x: ["-40%", "250%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
        />
      </div>

      {/* ── fő test ── */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "clamp(2rem, 4vw, 4rem)",
        alignItems: "start",
      }} className="footer-main">

        {/* Bal — brandnév reveal + tagline */}
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "0.75rem" }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {BRAND_CHARS.map((ch, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "clamp(0.9rem, 2vw, 1.25rem)",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: ch === " " ? "transparent" : "rgba(201,169,110,0.55)",
                    display: "inline-block",
                    whiteSpace: ch === " " ? "pre" : "normal",
                    userSelect: "none",
                  }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </motion.div>
          </div>
          <p style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.18)",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.7,
            margin: 0,
            maxWidth: "220px",
          }}>
            {t("tagline")}
          </p>
        </div>

        {/* Közép — navigáció */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.65rem", paddingTop: "0.1rem" }}>
          {nav.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              viewport={{ once: true }}
            >
              <Link
                href={link.href}
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.22)",
                  textDecoration: "none",
                  fontWeight: 300,
                  transition: "color 0.2s",
                  display: "block",
                  textAlign: "center",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.8)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.22)"; }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Jobb — elérhetőség */}
        <div style={{ textAlign: "right" }}>
          <a
            href="mailto:hello@nomadprive.com"
            style={{
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.22)",
              textDecoration: "none",
              fontWeight: 300,
              display: "block",
              marginBottom: "0.6rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.8)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.22)"; }}
          >
            hello@nomadprive.com
          </a>
          <p style={{
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.1)",
            margin: 0,
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.6,
          }}>
            {t("referral")}
          </p>
        </div>
      </div>

      {/* ── aljsor ── */}
      <div style={{
        borderTop: "1px solid rgba(201,169,110,0.04)",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0.9rem clamp(1.5rem, 5vw, 4rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}>
        <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.12)", letterSpacing: "0.06em" }}>
          © {year} Nomad Privé. {t("rights")}
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[t("privacy"), t("terms")].map(label => (
            <a key={label} href="#"
              style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.12)", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.12)"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-main { grid-template-columns: 1fr 1fr !important; }
          .footer-main > *:last-child { text-align: left !important; grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-main { grid-template-columns: 1fr !important; }
          .footer-main nav { align-items: flex-start; }
          .footer-main nav a { text-align: left !important; }
        }
      `}</style>
    </footer>
  );
}
