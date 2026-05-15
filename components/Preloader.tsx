"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<SVGSVGElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Globe lines draw in
      const latLines = globeRef.current?.querySelectorAll(".lat-line");
      const lonLines = globeRef.current?.querySelectorAll(".lon-line");

      if (latLines) {
        tl.fromTo(
          Array.from(latLines),
          { strokeDashoffset: 400, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
          },
          0
        );
      }

      if (lonLines) {
        tl.fromTo(
          Array.from(lonLines),
          { strokeDashoffset: 600, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
          },
          0.2
        );
      }

      // Plane traces arc around the globe
      tl.fromTo(
        planeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        0.4
      );

      // Animate plane along arc path manually
      tl.fromTo(
        planeRef.current,
        { motionPath: { path: "#flight-arc", align: "#flight-arc", alignOrigin: [0.5, 0.5], start: 0, end: 0 } },
        {
          motionPath: { path: "#flight-arc", align: "#flight-arc", alignOrigin: [0.5, 0.5], start: 0, end: 1 },
          duration: 1.5,
          ease: "power1.inOut",
        },
        0.5
      );

      // Text fades in
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        1.0
      );

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        1.4
      );

      // Hold then exit
      tl.to({}, { duration: 0.5 }, 2.2);

      // Overlay fades out upward
      tl.to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power3.inOut",
        },
        2.7
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      {/* Globe SVG */}
      <svg
        ref={globeRef}
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Outer circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="rgba(201,169,110,0.25)"
          strokeWidth="1"
          fill="rgba(8,8,8,0.9)"
          className="lat-line"
          style={{ strokeDasharray: 502, strokeDashoffset: 502 }}
        />

        {/* Latitude lines */}
        <ellipse cx="100" cy="70" rx="72" ry="22" stroke="rgba(201,169,110,0.25)" strokeWidth="0.8" fill="none" className="lat-line" style={{ strokeDasharray: 400, strokeDashoffset: 400 }} />
        <ellipse cx="100" cy="85" rx="79" ry="16" stroke="rgba(201,169,110,0.2)" strokeWidth="0.8" fill="none" className="lat-line" style={{ strokeDasharray: 400, strokeDashoffset: 400 }} />
        <ellipse cx="100" cy="100" rx="80" ry="10" stroke="rgba(201,169,110,0.3)" strokeWidth="1" fill="none" className="lat-line" style={{ strokeDasharray: 400, strokeDashoffset: 400 }} />
        <ellipse cx="100" cy="115" rx="79" ry="16" stroke="rgba(201,169,110,0.2)" strokeWidth="0.8" fill="none" className="lat-line" style={{ strokeDasharray: 400, strokeDashoffset: 400 }} />
        <ellipse cx="100" cy="130" rx="72" ry="22" stroke="rgba(201,169,110,0.25)" strokeWidth="0.8" fill="none" className="lat-line" style={{ strokeDasharray: 400, strokeDashoffset: 400 }} />

        {/* Longitude lines */}
        <ellipse cx="100" cy="100" rx="15" ry="80" stroke="rgba(201,169,110,0.2)" strokeWidth="0.8" fill="none" className="lon-line" style={{ strokeDasharray: 600, strokeDashoffset: 600 }} />
        <ellipse cx="100" cy="100" rx="40" ry="80" stroke="rgba(201,169,110,0.2)" strokeWidth="0.8" fill="none" className="lon-line" style={{ strokeDasharray: 600, strokeDashoffset: 600 }} />
        <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(201,169,110,0.3)" strokeWidth="0.8" className="lon-line" style={{ strokeDasharray: 600, strokeDashoffset: 600 }} />
        <ellipse cx="100" cy="100" rx="40" ry="80" stroke="rgba(201,169,110,0.2)" strokeWidth="0.8" fill="none" transform="rotate(60 100 100)" className="lon-line" style={{ strokeDasharray: 600, strokeDashoffset: 600 }} />
        <ellipse cx="100" cy="100" rx="40" ry="80" stroke="rgba(201,169,110,0.2)" strokeWidth="0.8" fill="none" transform="rotate(-60 100 100)" className="lon-line" style={{ strokeDasharray: 600, strokeDashoffset: 600 }} />

        {/* Equator highlight */}
        <ellipse cx="100" cy="100" rx="80" ry="8" stroke="rgba(201,169,110,0.4)" strokeWidth="1" fill="none" className="lon-line" style={{ strokeDasharray: 600, strokeDashoffset: 600 }} />

        {/* Flight arc path (hidden, used for motion) */}
        <path
          id="flight-arc"
          d="M 30 80 Q 100 10 170 80"
          stroke="rgba(201,169,110,0.15)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
        />

        {/* Plane icon group */}
        <g ref={planeRef} style={{ opacity: 0 }}>
          {/* Simple plane shape */}
          <g transform="translate(-8,-8)">
            <polygon
              points="8,0 16,14 8,10 0,14"
              fill="var(--gold-primary, #C9A96E)"
            />
          </g>
        </g>

        {/* Globe glow */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="rgba(201,169,110,0.08)"
          strokeWidth="20"
          filter="blur(8px)"
        />
      </svg>

      {/* Text */}
      <div
        ref={textRef}
        style={{
          textAlign: "center",
          opacity: 0,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
            fontWeight: 700,
            letterSpacing: "0.35em",
            color: "var(--cream, #F5F0E8)",
            textTransform: "uppercase",
          }}
        >
          Nomad Privé
        </div>
      </div>

      <p
        ref={taglineRef}
        style={{
          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          fontSize: "0.85rem",
          fontStyle: "italic",
          color: "var(--gold-primary, #C9A96E)",
          letterSpacing: "0.1em",
          margin: 0,
          opacity: 0,
        }}
      >
        Every journey is a masterpiece.
      </p>
    </div>
  );
}
