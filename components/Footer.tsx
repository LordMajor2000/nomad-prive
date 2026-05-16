"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const DESTINATIONS = [
  "Paris", "Kyoto", "Marrakesh", "Santorini", "Maldives",
  "Amalfi", "Capri", "Verbier", "Bali", "Positano",
  "Ibiza", "Seychelles", "Buenos Aires", "Istanbul", "Lisbon",
  "Monaco", "Portofino", "Zanzibar", "Sri Lanka", "Oman",
];

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();
  const [logoExists, setLogoExists] = useState(false);

  const navLinks = [
    { label: tNav("packages"), href: "/packages" },
    { label: tNav("experiences"), href: "/experiences" },
    { label: tNav("journal"), href: "/journal" },
    { label: tNav("about"), href: "/about" },
    { label: tNav("contact"), href: "/contact" },
    { label: "Visszatérve", href: "/moments" },
  ];

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLogoExists(true);
    img.onerror = () => setLogoExists(false);
    img.src = "/logo.png";
  }, []);

  const strip = [...DESTINATIONS, ...DESTINATIONS];

  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(201,169,110,0.06)" }}>

      {/* ── Destination marquee ── */}
      <div style={{
        borderTop: "1px solid rgba(201,169,110,0.08)",
        borderBottom: "1px solid rgba(201,169,110,0.08)",
        overflow: "hidden",
        padding: "0.9rem 0",
        background: "rgba(201,169,110,0.02)",
      }}>
        <div
          style={{
            display: "flex",
            gap: "0",
            animation: "marquee 40s linear infinite",
            width: "max-content",
          }}
        >
          {strip.map((dest, i) => (
            <span key={i} style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.4)",
              padding: "0 2.5rem",
              flexShrink: 0,
            }}>
              {dest}
              <span style={{ marginLeft: "2.5rem", opacity: 0.3 }}>·</span>
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── CTA band ── */}
      <div style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "3rem",
        alignItems: "center",
        maxWidth: "1400px",
        margin: "0 auto",
      }} className="footer-cta-grid">
        <div>
          <p style={{
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold-primary)",
            marginBottom: "1.5rem",
            opacity: 0.6,
          }}>
            {t("byReferralOnly")}
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            fontWeight: 700,
            color: "var(--cream)",
            margin: "0 0 0.75rem",
            lineHeight: 1.15,
          }}>
            {t("cta")}
          </h2>
          <p style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            fontStyle: "italic",
            color: "var(--gold-primary)",
            margin: 0,
            opacity: 0.7,
          }}>
            {t("tagline")}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} style={{ flexShrink: 0 }}>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "1.1rem 2.5rem",
              background: "transparent",
              border: "1px solid rgba(201,169,110,0.5)",
              color: "var(--gold-primary)",
              textDecoration: "none",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
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

      {/* ── Thin divider ── */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
      }}>
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.15) 30%, rgba(201,169,110,0.15) 70%, transparent)",
        }} />
      </div>

      {/* ── Main body ── */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 5vw, 4rem)",
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr 1fr",
          gap: "clamp(2rem, 5vw, 5rem)",
        }}
        className="footer-grid"
      >
        {/* Col 1 — Brand */}
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
            <div style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              color: "var(--gold-primary)",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}>
              Nomad Privé
            </div>
          )}

          <p style={{
            fontSize: "0.82rem",
            lineHeight: 1.85,
            color: "var(--muted)",
            margin: "0 0 2rem",
            maxWidth: "300px",
            fontWeight: 300,
          }}>
            {t("description")}
          </p>

          {/* Social */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem" }}>
            {[
              {
                label: "Instagram",
                href: "#",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                aria-label={s.label}
                style={{
                  color: "rgba(201,169,110,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "1px solid rgba(201,169,110,0.12)",
                  borderRadius: "2px",
                  transition: "border-color 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-primary)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.12)";
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          <p style={{ fontSize: "0.65rem", color: "rgba(201,169,110,0.35)", letterSpacing: "0.12em", fontStyle: "italic", margin: 0 }}>
            Budapest · Worldwide
          </p>
        </div>

        {/* Col 2 — Navigate */}
        <div>
          <div style={{
            fontSize: "0.55rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold-primary)",
            marginBottom: "1.75rem",
            opacity: 0.5,
          }}>
            {t("navigate")}
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  transition: "color 0.3s ease",
                  fontWeight: 300,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <div style={{
            fontSize: "0.55rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold-primary)",
            marginBottom: "1.75rem",
            opacity: 0.5,
          }}>
            {t("contact")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <a
              href="mailto:hello@nomadprive.com"
              style={{
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                fontWeight: 300,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"; }}
            >
              hello@nomadprive.com
            </a>
            <p style={{
              fontSize: "0.75rem",
              color: "var(--muted)",
              margin: 0,
              lineHeight: 1.7,
              fontWeight: 300,
              opacity: 0.45,
              fontStyle: "italic",
            }}>
              {t("referral")}
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        borderTop: "1px solid rgba(201,169,110,0.05)",
        padding: "1.25rem clamp(1.5rem, 5vw, 4rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        maxWidth: "1400px",
        margin: "0 auto",
      }}>
        <p style={{ fontSize: "0.6rem", color: "var(--muted)", margin: 0, opacity: 0.3, letterSpacing: "0.05em" }}>
          © {currentYear} Nomad Privé. {t("rights")}
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[t("privacy"), t("terms")].map((label) => (
            <a
              key={label}
              href="#"
              style={{
                fontSize: "0.6rem",
                color: "var(--muted)",
                textDecoration: "none",
                opacity: 0.3,
                letterSpacing: "0.05em",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.3"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
