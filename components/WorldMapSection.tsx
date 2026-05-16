"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface Destination {
  name: string;
  tagline: string;
  x: number;
  y: number;
}

const DESTINATIONS: Destination[] = [
  { name: "Sri Lanka", tagline: "Untouched paradise", x: 680, y: 270 },
  { name: "Morocco", tagline: "Colors of the medina", x: 430, y: 230 },
  { name: "Miami", tagline: "Sun, art, open roads", x: 230, y: 240 },
  { name: "Kyoto", tagline: "Ancient Japan, alive", x: 760, y: 210 },
  { name: "Maldives", tagline: "Where sky meets sea", x: 660, y: 295 },
  { name: "Santorini", tagline: "Light above the Aegean", x: 510, y: 215 },
  { name: "Amalfi", tagline: "Where the road ends", x: 490, y: 205 },
];

// Simplified world continent outlines in SVG path format (viewBox 0 0 1000 500)
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

export default function WorldMapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)",
        background: "#060606",
        borderTop: "1px solid rgba(201,169,110,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.7)",
            marginBottom: "0.75rem",
          }}
        >
          Our Destinations
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif, Georgia, serif)",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 300,
            color: "#F5F0E8",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Minden hely,{" "}
          <em style={{ color: "#C9A96E", fontStyle: "italic" }}>ahol voltunk</em>
        </h2>
      </motion.div>

      {/* SVG World Map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        style={{ position: "relative", width: "100%", maxWidth: 1000, margin: "0 auto" }}
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
              fill="transparent"
              stroke="rgba(201,169,110,0.12)"
              strokeWidth="0.5"
            />
          ))}

          {/* Destination pins */}
          {DESTINATIONS.map((dest, i) => (
            <g
              key={dest.name}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoveredPin(dest.name)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* Pulsing ring */}
              <motion.circle
                cx={dest.x}
                cy={dest.y}
                r={4}
                fill="none"
                stroke="rgba(201,169,110,0.5)"
                strokeWidth="1"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={
                  isInView
                    ? {
                        scale: [1, 2.2, 1],
                        opacity: [0.6, 0, 0.6],
                      }
                    : { scale: 1, opacity: 0 }
                }
                transition={{
                  duration: 2,
                  ease: "easeOut",
                  repeat: Infinity,
                  delay: i * 0.25 + 0.5,
                }}
                style={{ transformOrigin: `${dest.x}px ${dest.y}px` }}
              />

              {/* Gold dot */}
              <motion.circle
                cx={dest.x}
                cy={dest.y}
                r={4}
                fill="#C9A96E"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1 + 0.4,
                }}
                style={{ transformOrigin: `${dest.x}px ${dest.y}px` }}
              />

              {/* Tooltip — rendered in foreignObject for HTML styling */}
              <AnimatePresence>
                {hoveredPin === dest.name && (
                  <foreignObject
                    x={dest.x - 70}
                    y={dest.y - 70}
                    width={140}
                    height={60}
                    style={{ overflow: "visible", pointerEvents: "none" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        background: "rgba(8,8,8,0.95)",
                        border: "1px solid rgba(201,169,110,0.2)",
                        borderRadius: 6,
                        padding: "0.5rem 0.75rem",
                        minWidth: 120,
                        width: "max-content",
                        pointerEvents: "none",
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          color: "#C9A96E",
                          letterSpacing: "0.04em",
                          fontFamily: "var(--font-sans, sans-serif)",
                        }}
                      >
                        {dest.name}
                      </p>
                      <p
                        style={{
                          margin: "0.15rem 0 0",
                          fontSize: "0.65rem",
                          color: "rgba(245,240,232,0.55)",
                          fontFamily: "var(--font-sans, sans-serif)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {dest.tagline}
                      </p>
                    </motion.div>
                  </foreignObject>
                )}
              </AnimatePresence>
            </g>
          ))}
        </svg>
      </motion.div>
    </section>
  );
}
