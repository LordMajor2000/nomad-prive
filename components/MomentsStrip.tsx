"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PREVIEW_QUOTES = [
  { quote: "Három nap után abbahagytam az e-mailek ellenőrzését.", name: "K. Anna", destination: "Maldív-szigetek" },
  { quote: "A repülő leszállásán már azt terveztem, mikor jövök vissza.", name: "M. Péter", destination: "Kyoto" },
  { quote: "Az egész úton egyetlen döntést sem kellett meghoznom. Csak léteztem.", name: "V. Márton", destination: "Santorini" },
];

export default function MomentsStrip() {
  return (
    <section style={{
      background: "#060606",
      borderTop: "1px solid rgba(201,169,110,0.06)",
      padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header row */}
        <div style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-primary)", marginBottom: "0.75rem", opacity: 0.7 }}>
              Visszatérve
            </p>
            <h2 style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "var(--cream)",
              margin: 0,
              lineHeight: 1.2,
            }}>
              Milyen voltál,{" "}
              <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>mikor visszajöttél?</em>
            </h2>
          </div>
          <Link
            href="/moments"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              textDecoration: "none",
              opacity: 0.7,
              borderBottom: "1px solid rgba(201,169,110,0.3)",
              paddingBottom: "2px",
              transition: "opacity 0.3s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
          >
            Mind a tíz →
          </Link>
        </div>

        {/* Quotes grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1px",
        }}>
          {PREVIEW_QUOTES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: "var(--bg-primary)",
                padding: "2.5rem 2rem",
                position: "relative",
              }}
            >
              {/* Gold top accent on first */}
              {i === 0 && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                  background: "linear-gradient(90deg, var(--gold-primary), var(--gold-light), var(--gold-primary))",
                }} />
              )}
              <div style={{
                fontSize: "2rem",
                color: "var(--gold-primary)",
                opacity: 0.2,
                fontFamily: "Georgia, serif",
                lineHeight: 1,
                marginBottom: "1rem",
              }}>
                &ldquo;
              </div>
              <blockquote style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                fontStyle: "italic",
                color: "var(--cream)",
                opacity: 0.85,
                margin: "0 0 1.5rem",
                lineHeight: 1.6,
              }}>
                {m.quote}
              </blockquote>
              <p style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold-primary)",
                opacity: 0.5,
                margin: 0,
              }}>
                {m.name} — {m.destination}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
