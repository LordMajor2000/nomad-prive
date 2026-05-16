"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const BRAND_TOP = "NOMAD";
const BRAND_BOTTOM = "PRIVÉ";

export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const botPanelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const topCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const botCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      // — counter ticks up 0 → 100
      const obj = { val: 0 };
      tl.to(obj, {
        val: 100,
        duration: 2.4,
        ease: "power1.inOut",
        onUpdate() {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(obj.val)).padStart(3, "0");
          }
        },
      }, 0);

      // — gold line draws from center outward
      tl.fromTo(lineRef.current,
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 1.0, ease: "expo.out" },
        0.15
      );

      // — eyebrow fades in
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.3
      );

      // — NOMAD chars clip up from below
      const topChars = topCharsRef.current.filter(Boolean);
      tl.fromTo(topChars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: { each: 0.055, from: "center" },
          ease: "power3.out",
        },
        0.45
      );

      // — PRIVÉ chars clip up from below (slight delay)
      const botChars = botCharsRef.current.filter(Boolean);
      tl.fromTo(botChars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: { each: 0.055, from: "center" },
          ease: "power3.out",
        },
        0.6
      );

      // — coordinate fades in
      tl.fromTo(coordRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        1.1
      );

      // — brief hold
      tl.to({}, { duration: 0.55 }, 2.3);

      // — curtain split: top panel slides up, bottom panel slides down
      tl.to(topPanelRef.current,
        { yPercent: -100, duration: 0.85, ease: "power3.inOut" },
        2.85
      );
      tl.to(botPanelRef.current,
        { yPercent: 100, duration: 0.85, ease: "power3.inOut" },
        2.85
      );
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {/* Top half panel */}
      <div
        ref={topPanelRef}
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "50%",
          background: "#080808",
          zIndex: 2,
          transformOrigin: "top center",
        }}
      />

      {/* Bottom half panel */}
      <div
        ref={botPanelRef}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "50%",
          background: "#080808",
          zIndex: 2,
          transformOrigin: "bottom center",
        }}
      />

      {/* Center content — sits between the panels */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        pointerEvents: "none",
      }}>

        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            fontSize: "0.52rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.55)",
            marginBottom: "1.4rem",
            opacity: 0,
          }}
        >
          Private Travel Curation
        </div>

        {/* NOMAD */}
        <div style={{
          overflow: "hidden",
          lineHeight: 1,
          marginBottom: "0.1rem",
        }}>
          {BRAND_TOP.split("").map((ch, i) => (
            <span
              key={i}
              ref={(el) => { topCharsRef.current[i] = el; }}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "0.45em",
                color: "var(--cream, #F5F0E8)",
                textTransform: "uppercase",
                opacity: 0,
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Gold divider line */}
        <div
          ref={lineRef}
          style={{
            width: "clamp(180px, 30vw, 320px)",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #C9A96E 30%, #E8D5AC 50%, #C9A96E 70%, transparent)",
            margin: "0.5rem 0",
            transformOrigin: "center",
            transform: "scaleX(0)",
          }}
        />

        {/* PRIVÉ */}
        <div style={{
          overflow: "hidden",
          lineHeight: 1,
          marginTop: "0.1rem",
        }}>
          {BRAND_BOTTOM.split("").map((ch, i) => (
            <span
              key={i}
              ref={(el) => { botCharsRef.current[i] = el; }}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                fontWeight: 700,
                fontStyle: "italic",
                letterSpacing: "0.35em",
                color: "var(--gold-primary, #C9A96E)",
                opacity: 0,
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Coordinates */}
        <div
          ref={coordRef}
          style={{
            marginTop: "1.8rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            opacity: 0,
          }}
        >
          <span style={{ width: "20px", height: "1px", background: "rgba(201,169,110,0.35)", display: "inline-block" }} />
          <span style={{
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
          }}>
            47°N · 19°E · Est. 2024
          </span>
          <span style={{ width: "20px", height: "1px", background: "rgba(201,169,110,0.35)", display: "inline-block" }} />
        </div>
      </div>

      {/* Loading counter — bottom right, over panels */}
      <div style={{
        position: "absolute",
        bottom: "2.5rem",
        right: "2.5rem",
        zIndex: 4,
        display: "flex",
        alignItems: "baseline",
        gap: "0.25rem",
      }}>
        <span
          ref={counterRef}
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "rgba(201,169,110,0.15)",
            fontVariant: "tabular-nums",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          000
        </span>
        <span style={{
          fontSize: "0.55rem",
          letterSpacing: "0.15em",
          color: "rgba(201,169,110,0.12)",
          paddingBottom: "0.3rem",
        }}>
          %
        </span>
      </div>

      {/* Top-left brand mark */}
      <div style={{
        position: "absolute",
        top: "2rem",
        left: "2.5rem",
        zIndex: 4,
        fontSize: "0.55rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "rgba(201,169,110,0.2)",
      }}>
        NP · {new Date().getFullYear()}
      </div>
    </div>
  );
}
