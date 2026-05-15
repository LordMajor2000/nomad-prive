"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();
  const [logoExists, setLogoExists] = useState(false);

  const navLinks = [
    { label: tNav("packages"), href: "/packages" },
    { label: tNav("journal"), href: "/journal" },
    { label: tNav("about"), href: "/about" },
    { label: tNav("contact"), href: "/contact" },
  ];

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLogoExists(true);
    img.onerror = () => setLogoExists(false);
    img.src = "/logo.png";
  }, []);

  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(201,169,110,0.08)" }}>

      {/* Top band — CTA */}
      <div
        style={{
          borderBottom: "1px solid rgba(201,169,110,0.08)",
          padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          textAlign: "center",
          background: "linear-gradient(180deg, rgba(201,169,110,0.03) 0%, transparent 100%)",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold-primary)",
            marginBottom: "1.5rem",
            opacity: 0.7,
          }}
        >
          {t("byReferralOnly")}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--cream)",
            margin: "0 0 2rem",
            lineHeight: 1.15,
          }}
        >
          {t("cta")}
        </h2>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <Link
            href="/contact"
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
            {t("getInTouch")}
          </Link>
        </motion.div>
      </div>

      {/* Main footer body */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gap: "clamp(2rem, 5vw, 5rem)",
        }}
        className="footer-grid"
      >
        {/* Column 1 — Logo + description */}
        <div>
          {logoExists ? (
            <Image
              src="/logo.png"
              alt="Nomad Privé"
              width={180}
              height={46}
              style={{ objectFit: "contain", marginBottom: "1.5rem" }}
            />
          ) : (
            <div
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "var(--gold-primary)",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Nomad Privé
            </div>
          )}
          <p
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.8,
              color: "var(--muted)",
              margin: "0 0 2rem",
              maxWidth: "280px",
              fontWeight: 300,
            }}
          >
            {t("description")}
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            {[
              {
                label: "Instagram",
                href: "#",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                ),
              },
              {
                label: "Facebook",
                href: "#",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                whileHover={{ y: -2, color: "var(--gold-primary)" }}
                transition={{ duration: 0.2 }}
                aria-label={s.label}
                style={{
                  color: "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  border: "1px solid rgba(201,169,110,0.15)",
                  borderRadius: "2px",
                  transition: "border-color 0.3s ease, color 0.3s ease",
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Column 2 — Navigation */}
        <div>
          <div
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              marginBottom: "1.5rem",
              opacity: 0.7,
            }}
          >
            {t("navigate")}
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  transition: "color 0.3s ease",
                  fontWeight: 300,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 3 — Contact */}
        <div>
          <div
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              marginBottom: "1.5rem",
              opacity: 0.7,
            }}
          >
            {t("contact")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a
              href="mailto:hello@nomadprive.com"
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                textDecoration: "none",
                fontWeight: 300,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; }}
            >
              hello@nomadprive.com
            </a>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                margin: 0,
                lineHeight: 1.7,
                fontWeight: 300,
                opacity: 0.7,
                fontStyle: "italic",
              }}
            >
              {t("referral")}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(201,169,110,0.06)",
          padding: "1.5rem clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <p style={{ fontSize: "0.65rem", color: "var(--muted)", margin: 0, opacity: 0.4, letterSpacing: "0.05em" }}>
          © {currentYear} Nomad Privé. {t("rights")}
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[t("privacy"), t("terms")].map((label) => (
            <a
              key={label}
              href="#"
              style={{
                fontSize: "0.65rem",
                color: "var(--muted)",
                textDecoration: "none",
                opacity: 0.4,
                letterSpacing: "0.05em",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.4"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
