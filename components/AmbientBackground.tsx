"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Orb {
  size: number;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  opacity: number;
}

const orbs: Orb[] = [
  { size: 600, left: "-10%", bottom: "-5%", opacity: 0.04 },
  { size: 500, right: "-5%", top: "-10%", opacity: 0.03 },
  { size: 280, left: "30%", top: "20%", opacity: 0.05 },
  { size: 240, left: "60%", top: "60%", opacity: 0.04 },
  { size: 200, left: "10%", top: "50%", opacity: 0.03 },
  { size: 220, left: "75%", top: "35%", opacity: 0.05 },
];

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const orbEls = containerRef.current?.querySelectorAll(".ambient-orb");
      if (!orbEls) return;

      orbEls.forEach((orb, i) => {
        const xRange = 80 + i * 20;
        const yRange = 60 + i * 15;
        const duration = 22 + i * 5;

        gsap.to(orb, {
          x: (i % 2 === 0 ? 1 : -1) * xRange,
          y: (i % 3 === 0 ? 1 : -1) * yRange,
          duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 3.5,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="ambient-orb"
          style={{
            position: "absolute",
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            borderRadius: "50%",
            filter: "blur(80px)",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.6) 0%, rgba(180,130,60,0.2) 50%, transparent 70%)",
            opacity: orb.opacity,
            left: orb.left ?? "auto",
            right: orb.right ?? "auto",
            top: orb.top ?? "auto",
            bottom: orb.bottom ?? "auto",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
