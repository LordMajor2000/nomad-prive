"use client";

import { useState } from "react";
import Link from "next/link";

const featured = [
  { name: "Sri Lanka", slug: "sri-lanka", x: 72.5, y: 57.8, tagline: "The exotic adventure Bali used to be." },
  { name: "Bali & Lombok", slug: "bali-vs-lombok", x: 79.5, y: 60.2, tagline: "Beautiful. Less crowded. More real." },
  { name: "Morocco", slug: "morocco", x: 46.5, y: 40.5, tagline: "Taghazout surf & Marrakesh medina." },
  { name: "Miami", slug: "miami", x: 22.2, y: 43.5, tagline: "Hidden gems, Key West, open roads." },
  { name: "Mykonos", slug: "mykonos", x: 54.1, y: 35.5, tagline: "Unapologetic luxury." },
  { name: "Amalfi Coast", slug: "amalfi-coast", x: 52.0, y: 33.8, tagline: "Where the road ends, the dream begins." },
  { name: "Dubrovnik", slug: "dubrovnik", x: 52.8, y: 32.0, tagline: "The city tourists never see." },
];

const visited = [
  { name: "Dubai", x: 63.5, y: 43.5 },
  { name: "Moscow", x: 57.6, y: 22.2 },
  { name: "St. Petersburg", x: 56.4, y: 19.5 },
  { name: "Goa, India", x: 68.3, y: 47.5 },
  { name: "Malaga", x: 46.0, y: 37.0 },
  { name: "Fuerteventura", x: 43.6, y: 42.2 },
  { name: "Tenerife", x: 43.0, y: 42.8 },
  { name: "Tarifa", x: 45.8, y: 37.5 },
  { name: "Paris", x: 49.3, y: 28.0 },
  { name: "London", x: 48.3, y: 24.5 },
  { name: "Rome", x: 52.5, y: 33.0 },
  { name: "Berlin", x: 52.3, y: 23.5 },
  { name: "Vienna", x: 53.4, y: 25.5 },
  { name: "Marbella", x: 46.2, y: 37.2 },
  { name: "Madeira", x: 42.8, y: 40.5 },
  { name: "Gibraltar", x: 45.9, y: 37.6 },
];

export default function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredVisited, setHoveredVisited] = useState<string | null>(null);

  return (
    <section style={{ background: "#080808", padding: "clamp(4rem, 8vw, 7rem) 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 2rem" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-primary)", marginBottom: "1rem", opacity: 0.7 }}>
          Our footprint
        </div>
        <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, color: "var(--cream)", margin: "0 0 0.75rem", lineHeight: 1.2 }}>
          {"We've stood here. "}
          <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>We know the way.</em>
        </h2>
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", opacity: 0.5 }}>
          23 destinations across 4 continents
        </p>
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <svg viewBox="0 0 100 55" style={{ width: "100%", height: "auto", display: "block" }} preserveAspectRatio="xMidYMid meet">
          {[10, 20, 30, 40, 50].map(y => (
            <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y} stroke="rgba(201,169,110,0.04)" strokeWidth="0.15" />
          ))}
          {[20, 40, 60, 80].map(x => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="55" stroke="rgba(201,169,110,0.04)" strokeWidth="0.15" />
          ))}
          <path d="M8,12 L22,10 L28,14 L30,20 L28,28 L24,32 L20,30 L14,34 L10,30 L8,22 Z" fill="rgba(201,169,110,0.07)" stroke="rgba(201,169,110,0.15)" strokeWidth="0.2" />
          <path d="M20,34 L28,32 L32,38 L30,48 L26,52 L22,50 L18,44 L18,38 Z" fill="rgba(201,169,110,0.07)" stroke="rgba(201,169,110,0.15)" strokeWidth="0.2" />
          <path d="M44,18 L54,16 L58,20 L56,26 L50,28 L44,26 L42,22 Z" fill="rgba(201,169,110,0.07)" stroke="rgba(201,169,110,0.15)" strokeWidth="0.2" />
          <path d="M44,28 L54,26 L58,30 L56,44 L50,50 L44,46 L40,38 L40,32 Z" fill="rgba(201,169,110,0.07)" stroke="rgba(201,169,110,0.15)" strokeWidth="0.2" />
          <path d="M56,12 L82,10 L88,16 L86,26 L78,30 L66,28 L58,24 L54,18 Z" fill="rgba(201,169,110,0.07)" stroke="rgba(201,169,110,0.15)" strokeWidth="0.2" />
          <path d="M76,38 L88,36 L92,42 L88,48 L78,48 L74,44 Z" fill="rgba(201,169,110,0.07)" stroke="rgba(201,169,110,0.15)" strokeWidth="0.2" />

          {visited.map((dest) => (
            <g key={dest.name} onMouseEnter={() => setHoveredVisited(dest.name)} onMouseLeave={() => setHoveredVisited(null)}>
              <circle cx={dest.x} cy={dest.y} r="0.5" fill="rgba(201,169,110,0.35)" />
              {hoveredVisited === dest.name && (
                <text x={dest.x} y={dest.y - 1.5} textAnchor="middle" fill="rgba(201,169,110,0.8)" fontSize="1.4" fontFamily="Inter, sans-serif">
                  {dest.name}
                </text>
              )}
            </g>
          ))}

          {featured.map((dest) => (
            <g key={dest.slug} onMouseEnter={() => setHovered(dest.slug)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
              <circle cx={dest.x} cy={dest.y} r="1.8" fill="none" stroke="rgba(201,169,110,0.2)" strokeWidth="0.3">
                <animate attributeName="r" values="1.2;2.5;1.2" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx={dest.x} cy={dest.y} r="0.9" fill={hovered === dest.slug ? "#E8D5B0" : "#C9A96E"} />
            </g>
          ))}
        </svg>

        {featured.map((dest) => hovered === dest.slug && (
          <div
            key={dest.slug}
            style={{
              position: "absolute",
              left: `clamp(10px, calc(${dest.x}% - 90px), calc(100% - 190px))`,
              top: `calc(${dest.y}% - 95px)`,
              width: "180px",
              background: "#111111",
              border: "1px solid rgba(201,169,110,0.3)",
              borderRadius: "3px",
              padding: "12px 14px",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cream)", marginBottom: "4px", fontFamily: "var(--font-playfair), serif" }}>
              {dest.name}
            </div>
            <div style={{ fontSize: "0.65rem", color: "var(--gold-primary)", fontStyle: "italic", marginBottom: "8px", lineHeight: 1.4 }}>
              {dest.tagline}
            </div>
            <Link href={`/journal/${dest.slug}`} style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-primary)", textDecoration: "none" }}>
              Explore →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
