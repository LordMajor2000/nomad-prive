"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  totalDays: number;
}

function getRingDashArray(value: number, max: number, r: number): string {
  const circ = 2 * Math.PI * r;
  const filled = Math.min(value / max, 1) * circ;
  return `${filled} ${circ}`;
}

interface RingProps {
  value: number;
  max: number;
  label: string;
  size?: number;
  strokeWidth?: number;
}

function Ring({ value, max, label, size = 96, strokeWidth = 3 }: RingProps) {
  const r = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const dashArray = getRingDashArray(value, max, r);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div style={{ position: "relative", width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ transform: "rotate(-90deg)", display: "block" }}
        >
          {/* Track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(201,169,110,0.12)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#C9A96E"
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={0}
            strokeLinecap="round"
            style={{
              transition: "stroke-dasharray 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
          {/* Glow dot at progress end */}
          {value > 0 && (
            <circle
              cx={cx + r * Math.cos((2 * Math.PI * value) / max - Math.PI / 2)}
              cy={cy + r * Math.sin((2 * Math.PI * value) / max - Math.PI / 2)}
              r={strokeWidth * 1.2}
              fill="#E8D5AC"
            />
          )}
        </svg>
        {/* Center value */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: size >= 96 ? "1.75rem" : "1.25rem",
              fontWeight: 700,
              color: "#F5F0E8",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span
        style={{
          fontSize: "0.55rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.5)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({
  targetDate,
  destination,
}: {
  targetDate: string;
  destination: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diffMs = target.getTime() - now.getTime();

      if (diffMs <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, totalDays: 0 });
        return;
      }

      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      setTimeLeft({
        days: totalDays,
        hours: totalHours % 24,
        minutes: totalMinutes % 60,
        totalDays,
      });
    };

    calc();
    const id = setInterval(calc, 30000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (timeLeft === null) return null;

  const isDeparture = timeLeft.totalDays === 0 && timeLeft.hours === 0;

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid rgba(201,169,110,0.12)",
        borderRadius: "2px",
        padding: "clamp(1.75rem, 4vw, 3rem)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 110%, rgba(201,169,110,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Top gold hairline */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />

      {/* Eyebrow */}
      <div
        style={{
          fontSize: "0.55rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.55)",
          marginBottom: "2rem",
        }}
      >
        Countdown · {destination}
      </div>

      {isDeparture ? (
        /* Departure day state */
        <div
          style={{
            fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "#C9A96E",
            letterSpacing: "0.04em",
            padding: "1.5rem 0",
          }}
        >
          The journey begins today.
        </div>
      ) : (
        /* Ring cluster */
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(1rem, 4vw, 2.5rem)",
          }}
        >
          <Ring value={timeLeft.days} max={Math.max(timeLeft.totalDays, 365)} label="Days" size={104} strokeWidth={3} />

          {/* Separator */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              paddingBottom: "28px",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "rgba(201,169,110,0.3)",
              }}
            />
            <div
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "rgba(201,169,110,0.3)",
              }}
            />
          </div>

          <Ring value={timeLeft.hours} max={24} label="Hours" size={80} strokeWidth={2.5} />

          {/* Separator */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              paddingBottom: "28px",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "rgba(201,169,110,0.3)",
              }}
            />
            <div
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "rgba(201,169,110,0.3)",
              }}
            />
          </div>

          <Ring value={timeLeft.minutes} max={60} label="Minutes" size={64} strokeWidth={2} />
        </div>
      )}

      {/* Bottom label */}
      {!isDeparture && (
        <div
          style={{
            marginTop: "1.75rem",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            fontStyle: "italic",
            color: "rgba(245,240,232,0.2)",
          }}
        >
          until departure
        </div>
      )}
    </div>
  );
}
