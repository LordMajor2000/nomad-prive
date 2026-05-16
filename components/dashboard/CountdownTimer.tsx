"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer({ targetDate, destination }: { targetDate: string; destination: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      setDays(Math.max(0, diff));
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (days === null) return null;

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid rgba(201,169,110,0.15)",
        borderRadius: "2px",
        padding: "clamp(2rem, 5vw, 3.5rem)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 120%, rgba(201,169,110,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        fontSize: "0.58rem",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "#C9A96E",
        opacity: 0.6,
        marginBottom: "1.5rem",
      }}>
        Visszaszámlálás · {destination}
      </div>

      <div style={{
        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
        fontSize: "clamp(5rem, 18vw, 11rem)",
        fontWeight: 700,
        color: "#C9A96E",
        lineHeight: 1,
        letterSpacing: "-0.03em",
        marginBottom: "0.75rem",
      }}>
        {days}
      </div>

      <div style={{
        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
        fontSize: "clamp(0.95rem, 2vw, 1.3rem)",
        fontStyle: "italic",
        color: "rgba(245,240,232,0.45)",
        fontWeight: 300,
        letterSpacing: "0.02em",
      }}>
        {days === 0 ? "Ma indulsz. Jó utat." : days === 1 ? "nap van hátra" : "nap van hátra"}
      </div>
    </div>
  );
}
