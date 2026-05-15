"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(201,169,110,0.08)",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Top section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Logo & tagline */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "var(--gold-primary)",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Aurum Voyages
            </div>
            <p
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "0.85rem",
                fontStyle: "italic",
                color: "var(--muted)",
                margin: 0,
                maxWidth: "280px",
                lineHeight: 1.7,
              }}
            >
              Kizárólag személyes referencia alapján fogadunk új ügyfeleket.
            </p>
          </div>

          {/* Social icons */}
          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              alignItems: "center",
            }}
          >
            <motion.a
              href="#"
              whileHover={{ y: -2, color: "var(--gold-primary)" }}
              transition={{ duration: 0.2 }}
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
              aria-label="Instagram"
            >
              {/* Instagram icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              Instagram
            </motion.a>

            <div
              style={{
                width: "1px",
                height: "16px",
                background: "rgba(201,169,110,0.2)",
              }}
            />

            <motion.a
              href="#"
              whileHover={{ y: -2, color: "var(--gold-primary)" }}
              transition={{ duration: 0.2 }}
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
              aria-label="Facebook"
            >
              {/* Facebook icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              Facebook
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,110,0.15), transparent)",
            marginBottom: "2rem",
          }}
        />

        {/* Bottom section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              color: "var(--muted)",
              margin: 0,
              letterSpacing: "0.05em",
              opacity: 0.6,
            }}
          >
            © {currentYear} Aurum Voyages. Minden jog fenntartva.
          </p>
          <div
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <a
              href="#"
              style={{
                fontSize: "0.7rem",
                color: "var(--muted)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                opacity: 0.5,
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.opacity = "0.5";
              }}
            >
              Adatvédelem
            </a>
            <a
              href="#"
              style={{
                fontSize: "0.7rem",
                color: "var(--muted)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                opacity: 0.5,
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.opacity = "0.5";
              }}
            >
              ÁSZF
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
