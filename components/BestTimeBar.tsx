"use client";

import { motion } from "framer-motion";

interface MonthData {
  month: string;
  rating: "best" | "good" | "shoulder" | "avoid";
}

interface Props {
  data: MonthData[];
}

const ratingConfig = {
  best: { color: "#C9A96E", height: 40, label: "Best" },
  good: { color: "rgba(201,169,110,0.5)", height: 28, label: "Good" },
  shoulder: { color: "rgba(201,169,110,0.2)", height: 18, label: "Shoulder" },
  avoid: { color: "rgba(255,255,255,0.06)", height: 10, label: "Avoid" },
};

export default function BestTimeBar({ data }: Props) {
  return (
    <div
      style={{
        background: "#0d0d0d",
        borderTop: "2px solid #C9A96E",
        padding: "2rem",
        marginTop: "3rem",
        borderRadius: "1px",
      }}
    >
      <div
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#C9A96E",
          marginBottom: "1.5rem",
          fontVariant: "small-caps",
        }}
      >
        Best Time to Visit
      </div>

      {/* Bars */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "0.5rem",
          marginBottom: "0.75rem",
        }}
      >
        {data.map((item, i) => {
          const config = ratingConfig[item.rating];
          return (
            <div
              key={item.month}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: config.height, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  width: "100%",
                  background: config.color,
                  borderRadius: "1px",
                  minWidth: "12px",
                }}
              />
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  whiteSpace: "nowrap",
                }}
              >
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          flexWrap: "wrap",
          marginTop: "1rem",
          paddingTop: "1rem",
          borderTop: "1px solid rgba(201,169,110,0.08)",
        }}
      >
        {(["best", "good", "shoulder", "avoid"] as const).map((rating) => {
          const config = ratingConfig[rating];
          return (
            <div
              key={rating}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: config.color,
                  borderRadius: "1px",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
