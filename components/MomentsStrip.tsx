"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PREVIEW_QUOTES = [
  { quote: "Három nap után abbahagytam az e-mailek ellenőrzését.", name: "K. Anna", destination: "Maldív-szigetek", num: "01" },
  { quote: "A repülő leszállásán már azt terveztem, mikor jövök vissza.", name: "M. Péter", destination: "Kyoto", num: "02" },
  { quote: "Az egész úton egyetlen döntést sem kellett meghoznom. Csak léteztem.", name: "V. Márton", destination: "Santorini", num: "03" },
];

export default function MomentsStrip() {
  return (
    <section style={{
      background: "#060606",
      borderTop: "1px solid rgba(201,169,110,0.06)",
      padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* Header — asymmetric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "flex-end",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
            gap: "2rem",
          }}
        >
          <div>
            <p style={{
              fontSize: "0.58rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              marginBottom: "0.85rem",
              opacity: 0.7,
            }}>
              Visszatérve
            </p>
            <h2 style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)",
              fontWeight: 700,
              color: "var(--cream)",
              margin: 0,
              lineHeight: 1.15,
            }}>
              Milyen voltál,{" "}
              <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>mikor visszajöttél?</em>
            </h2>
          </div>
          <Link
            href="/moments"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.5)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              paddingBottom: "0.2rem",
              borderBottom: "1px solid rgba(201,169,110,0.15)",
              transition: "color 0.2s ease-out, border-color 0.2s ease-out",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "var(--gold-primary)";
              el.style.borderColor = "rgba(201,169,110,0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "rgba(201,169,110,0.5)";
              el.style.borderColor = "rgba(201,169,110,0.15)";
            }}
          >
            Mind →
          </Link>
        </motion.div>

        {/* Quotes — horizontal rows with dividers */}
        <div>
          {PREVIEW_QUOTES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: "-40px" }}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr auto",
                alignItems: "start",
                gap: "2rem",
                padding: "2rem 0",
                borderBottom: "1px solid rgba(201,169,110,0.06)",
              }}
            >
              {/* Number */}
              <span style={{
                fontSize: "0.52rem",
                letterSpacing: "0.15em",
                color: "rgba(201,169,110,0.25)",
                paddingTop: "0.3rem",
                fontVariant: "tabular-nums",
              }}>
                {m.num}
              </span>

              {/* Quote */}
              <div>
                <div style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontStyle: "italic",
                  color: "rgba(245,240,232,0.82)",
                  lineHeight: 1.55,
                  marginBottom: "1rem",
                }}>
                  &ldquo;{m.quote}&rdquo;
                </div>
              </div>

              {/* Attribution */}
              <div style={{
                textAlign: "right",
                paddingTop: "0.2rem",
                flexShrink: 0,
              }}>
                <p style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold-primary)",
                  opacity: 0.55,
                  margin: "0 0 0.25rem",
                  whiteSpace: "nowrap",
                }}>
                  {m.name}
                </p>
                <p style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.2)",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}>
                  {m.destination}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .moments-row { grid-template-columns: 32px 1fr !important; }
          .moments-attribution { display: none; }
        }
      `}</style>
    </section>
  );
}
