"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

/* ─────────────────────────────────────────────
   Destination pins — 26 locations
───────────────────────────────────────────── */
interface Destination {
  name: string;
  tagline: string;
  x: number;
  y: number;
}

const DESTINATIONS: Destination[] = [
  // Europe
  { name: "Santorini",        tagline: "Light above the Aegean",     x: 510, y: 196 },
  { name: "Amalfi Coast",     tagline: "Where the road ends",        x: 478, y: 179 },
  { name: "Tuscany",          tagline: "Wine, light, no hurry",      x: 463, y: 171 },
  { name: "Dubrovnik",        tagline: "Pearl of the Adriatic",      x: 493, y: 183 },
  { name: "Lisbon",           tagline: "Golden hour, forever",       x: 415, y: 192 },
  { name: "Norwegian Fjords", tagline: "Silence carved in stone",    x: 457, y: 104 },
  { name: "Iceland",          tagline: "Fire, ice, and silence",     x: 395, y: 92  },
  // Middle East & Central Asia
  { name: "Cappadocia",       tagline: "Float above the valleys",    x: 538, y: 187 },
  { name: "Petra",            tagline: "Rose city, carved in rock",  x: 534, y: 216 },
  { name: "Dubai",            tagline: "Desert meets skyline",       x: 580, y: 234 },
  { name: "Oman",             tagline: "Ancient roads, open desert", x: 602, y: 248 },
  // Africa
  { name: "Morocco",          tagline: "Colors of the medina",       x: 428, y: 213 },
  { name: "Zanzibar",         tagline: "Spice island at dusk",       x: 548, y: 335 },
  { name: "Seychelles",       tagline: "Eden without edges",         x: 590, y: 356 },
  { name: "Cape Town",        tagline: "Mountain meets ocean",       x: 484, y: 430 },
  // South & Southeast Asia
  { name: "Maldives",         tagline: "Where sky meets sea",        x: 628, y: 312 },
  { name: "Sri Lanka",        tagline: "Untouched paradise",         x: 672, y: 268 },
  { name: "Bhutan",           tagline: "Kingdom of clouds",          x: 666, y: 226 },
  { name: "Phuket",           tagline: "Limestone and open sea",     x: 702, y: 295 },
  { name: "Bali",             tagline: "Gods, rice fields, ritual",  x: 732, y: 320 },
  // East Asia
  { name: "Kyoto",            tagline: "Ancient Japan, alive",       x: 768, y: 197 },
  { name: "Tokyo",            tagline: "Neon meets centuries",       x: 784, y: 189 },
  // Oceania
  { name: "New Zealand",      tagline: "Edge of the known world",    x: 868, y: 440 },
  // Americas
  { name: "New York",         tagline: "The city that never dims",   x: 248, y: 180 },
  { name: "Miami",            tagline: "Sun, art, open roads",       x: 237, y: 235 },
  { name: "Buenos Aires",     tagline: "Tango at midnight",          x: 282, y: 418 },
];

// Simplified continent outlines — viewBox 0 0 1000 500
const CONTINENT_PATHS = [
  // North America
  "M 155 80 L 230 75 L 270 90 L 280 120 L 265 155 L 250 180 L 230 210 L 210 240 L 195 265 L 175 280 L 160 270 L 148 250 L 140 220 L 130 195 L 125 170 L 120 145 L 125 115 L 135 95 Z",
  // South America
  "M 210 275 L 240 270 L 260 285 L 270 310 L 268 340 L 255 370 L 240 400 L 220 415 L 205 400 L 195 375 L 190 345 L 193 315 L 200 290 Z",
  // Europe
  "M 455 80 L 500 75 L 530 80 L 545 100 L 540 120 L 520 130 L 505 125 L 490 130 L 475 125 L 460 115 L 450 100 Z",
  // Africa
  "M 455 165 L 500 160 L 540 170 L 555 200 L 555 240 L 545 280 L 530 320 L 510 355 L 490 365 L 470 355 L 450 320 L 440 280 L 435 240 L 440 200 Z",
  // Asia
  "M 540 75 L 650 65 L 760 70 L 830 80 L 870 100 L 880 130 L 860 160 L 820 175 L 780 180 L 740 175 L 700 180 L 660 185 L 620 180 L 580 170 L 550 155 L 535 130 L 535 105 Z",
  // Australia
  "M 750 300 L 800 290 L 845 295 L 865 315 L 865 345 L 845 365 L 810 375 L 775 370 L 750 350 L 740 325 Z",
];

/* ─────────────────────────────────────────────
   Image trail — inline (CSS-only, no Framer Motion)
───────────────────────────────────────────── */
const TRAIL_IMAGES = [
  "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=300&q=75",  // Sri Lanka
  "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=300&q=75",  // Morocco
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300&q=75",  // Santorini
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&q=75",  // Kyoto
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=300&q=75",  // Maldives
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=300&q=75",  // Amalfi
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=75",  // Bali
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=75",  // Dubai
];

interface TrailImg {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
}

let trailCounter = 0;
const THROTTLE_MS = 110;
const MAX_TRAIL = 8;
const FADE_DELAY = 720;

function MapImageTrail({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
  const [images, setImages] = useState<TrailImg[]>([]);
  const lastAt = useRef(0);
  const imgIdx = useRef(0);
  const timeouts = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastAt.current < THROTTLE_MS) return;
    lastAt.current = now;

    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotation = Math.random() * 18 - 9;
    const src = TRAIL_IMAGES[imgIdx.current % TRAIL_IMAGES.length];
    imgIdx.current += 1;
    const id = ++trailCounter;

    setImages((prev) => {
      const next = [...prev, { id, x, y, src, rotation }];
      return next.length > MAX_TRAIL ? next.slice(next.length - MAX_TRAIL) : next;
    });

    const t = setTimeout(() => {
      setImages((prev) => prev.filter((i) => i.id !== id));
      timeouts.current.delete(id);
    }, FADE_DELAY + 320);

    timeouts.current.set(id, t);
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      timeouts.current.forEach(clearTimeout);
      timeouts.current.clear();
    };
  }, [containerRef, handleMouseMove]);

  return (
    <>
      <style>{`
        @keyframes mapTrailIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.78) rotate(var(--tr)); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1)    rotate(var(--tr)); }
        }
        @keyframes mapTrailOut {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1)    rotate(var(--tr)); }
          to   { opacity: 0; transform: translate(-50%, -50%) scale(0.93) rotate(var(--tr)); }
        }
        .map-trail-img {
          animation:
            mapTrailIn  0.2s cubic-bezier(0.16,1,0.3,1) forwards,
            mapTrailOut 0.38s cubic-bezier(0.4,0,1,1) ${FADE_DELAY}ms forwards;
        }
      `}</style>
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          alt=""
          className="map-trail-img"
          style={{
            position: "absolute",
            left: img.x,
            top:  img.y,
            width: 130,
            height: 88,
            objectFit: "cover",
            "--tr": `${img.rotation}deg`,
            zIndex: 20,
            pointerEvents: "none",
            borderRadius: 3,
            border: "1px solid rgba(201,169,110,0.18)",
            willChange: "opacity, transform",
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export default function WorldMapSection() {
  const t = useTranslations("worldMap");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        padding:    "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)",
        background: "#060606",
        borderTop:  "1px solid rgba(201,169,110,0.06)",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* Image trail — desktop only (pointer:fine) */}
      <style>{`
        @media (hover: none), (pointer: coarse) {
          .map-trail-img { display: none !important; }
        }
        @media (max-width: 640px) {
          .map-tooltip { display: none !important; }
        }
      `}</style>
      <MapImageTrail containerRef={sectionRef as React.RefObject<HTMLElement>} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: "1000px",
          margin: "0 auto clamp(2.5rem, 5vw, 4rem)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
          marginBottom: "1rem",
        }}>
          <div style={{ width: "28px", height: "1px", background: "rgba(201,169,110,0.5)", flexShrink: 0 }} />
          <p style={{
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.6)",
            margin: 0,
          }}>
            {t("label")}
          </p>
        </div>
        <h2 style={{
          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 700,
          color: "#F5F0E8",
          lineHeight: 1.15,
          margin: 0,
        }}>
          {t("headingPre")}{" "}
          <em style={{ color: "#C9A96E", fontStyle: "italic" }}>{t("headingEm")}</em>
        </h2>
      </motion.div>

      {/* SVG World Map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        style={{ position: "relative", width: "100%", maxWidth: 1000, margin: "0 auto", zIndex: 2 }}
      >
        <svg
          viewBox="0 0 1000 500"
          style={{ width: "100%", height: "auto", display: "block" }}
          aria-hidden="true"
        >
          {/* Continent outlines */}
          {CONTINENT_PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="rgba(201,169,110,0.03)"
              stroke="rgba(201,169,110,0.14)"
              strokeWidth="0.75"
            />
          ))}

          {/* Connection lines (dotted) between nearby hubs */}
          <g opacity={0.08} stroke="rgba(201,169,110,1)" strokeWidth="0.5" strokeDasharray="3 5" fill="none">
            <line x1="478" y1="179" x2="510" y2="196" />
            <line x1="478" y1="179" x2="463" y2="171" />
            <line x1="510" y1="196" x2="538" y2="187" />
            <line x1="672" y1="268" x2="628" y2="312" />
            <line x1="702" y1="295" x2="732" y2="320" />
            <line x1="768" y1="197" x2="784" y2="189" />
          </g>

          {/* Destination pins */}
          {DESTINATIONS.map((dest, i) => (
            <g
              key={dest.name}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoveredPin(dest.name)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* Outer pulsing ring */}
              <motion.circle
                cx={dest.x}
                cy={dest.y}
                r={5}
                fill="none"
                stroke="rgba(201,169,110,0.45)"
                strokeWidth="0.75"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={isInView
                  ? { scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }
                  : { scale: 1, opacity: 0 }
                }
                transition={{
                  duration: 2.4,
                  ease: "easeOut",
                  repeat: Infinity,
                  delay: i * 0.18 + 0.5,
                }}
                style={{ transformOrigin: `${dest.x}px ${dest.y}px` }}
              />

              {/* Gold dot */}
              <motion.circle
                cx={dest.x}
                cy={dest.y}
                r={hoveredPin === dest.name ? 5 : 3.5}
                fill={hoveredPin === dest.name ? "#E8C97A" : "#C9A96E"}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 + 0.4 }}
                style={{
                  transformOrigin: `${dest.x}px ${dest.y}px`,
                  transition: "r 0.2s ease-out, fill 0.2s ease-out",
                }}
              />

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredPin === dest.name && (
                  <foreignObject className="map-tooltip"
                    x={dest.x - 75}
                    y={dest.y - 74}
                    width={150}
                    height={64}
                    style={{ overflow: "visible", pointerEvents: "none" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 3, scale: 0.94 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        background: "rgba(6,6,6,0.96)",
                        border: "1px solid rgba(201,169,110,0.22)",
                        borderRadius: 4,
                        padding: "0.45rem 0.7rem",
                        width: "max-content",
                        minWidth: 100,
                        pointerEvents: "none",
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        whiteSpace: "nowrap",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                      }}
                    >
                      <p style={{
                        margin: 0,
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "#C9A96E",
                        letterSpacing: "0.06em",
                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                      }}>
                        {dest.name}
                      </p>
                      <p style={{
                        margin: "0.1rem 0 0",
                        fontSize: "0.6rem",
                        color: "rgba(245,240,232,0.5)",
                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                        fontStyle: "italic",
                        letterSpacing: "0.02em",
                      }}>
                        {dest.tagline}
                      </p>
                    </motion.div>
                  </foreignObject>
                )}
              </AnimatePresence>
            </g>
          ))}
        </svg>

        {/* Destination count badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            position: "absolute",
            bottom: "1rem",
            right: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <span style={{
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.35)",
          }}>
            {DESTINATIONS.length} {t("destinations")}
          </span>
          <div style={{ width: "24px", height: "1px", background: "rgba(201,169,110,0.2)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
