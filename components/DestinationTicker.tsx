"use client";

const destinations =
  "Mykonos · Amalfi Coast · Sri Lanka · Marrakesh · Miami · Dubrovnik · Lombok · Santorini · Positano · Key West · Taghazout ·";

export default function DestinationTicker() {
  return (
    <div
      style={{
        background: "#0a0a0a",
        overflow: "hidden",
        padding: "1.25rem 0",
        borderTop: "1px solid rgba(201,169,110,0.06)",
        borderBottom: "1px solid rgba(201,169,110,0.06)",
      }}
    >
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 40s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="ticker-track">
        {[0, 1].map((idx) => (
          <span
            key={idx}
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontVariant: "small-caps",
              color: "#C9A96E",
              opacity: 0.4,
              whiteSpace: "nowrap",
              paddingRight: "4rem",
            }}
          >
            {destinations}
          </span>
        ))}
      </div>
    </div>
  );
}
