"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PRESS = [
  { name: "Condé Nast Traveller", abbr: "CNT" },
  { name: "Forbes", abbr: "Forbes" },
  { name: "Financial Times", abbr: "FT" },
  { name: "Vogue", abbr: "Vogue" },
  { name: "The Times", abbr: "Times" },
  { name: "Monocle", abbr: "Monocle" },
  { name: "Tatler", abbr: "Tatler" },
  { name: "Wall Street Journal", abbr: "WSJ" },
];

const ALL = [...PRESS, ...PRESS, ...PRESS];

export default function PressStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#070707",
        borderTop: "1px solid rgba(201,169,110,0.06)",
        borderBottom: "1px solid rgba(201,169,110,0.06)",
        padding: "3.5rem clamp(1.5rem, 5vw, 4rem)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes press-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .press-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: press-marquee 50s linear infinite;
        }
        .press-track:hover { animation-play-state: paused; }
      `}</style>

      <div style={{ maxWidth: "1400px", margin: "0 auto 2.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            marginBottom: "0",
          }}
        >
          <div style={{ width: "24px", height: "1px", background: "rgba(201,169,110,0.4)", flexShrink: 0 }} />
          <p style={{
            fontSize: "0.58rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.45)",
            margin: 0,
          }}>
            As featured in
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        {/* Fade edges */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "120px",
          background: "linear-gradient(to right, #070707, transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "120px",
          background: "linear-gradient(to left, #070707, transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />

        <div className="press-track">
          {ALL.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0",
                padding: "0 3.5rem",
                flexShrink: 0,
              }}
            >
              <span style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
                fontWeight: 700,
                fontStyle: i % 3 === 1 ? "italic" : "normal",
                letterSpacing: "0.08em",
                color: "rgba(245,240,232,0.12)",
                whiteSpace: "nowrap",
                userSelect: "none",
                transition: "color 0.2s ease-out",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(201,169,110,0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(245,240,232,0.12)"; }}
              >
                {item.name}
              </span>
              <span style={{
                color: "rgba(201,169,110,0.12)",
                fontSize: "0.4rem",
                margin: "0 0 0 3.5rem",
                flexShrink: 0,
              }}>
                ◆
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
