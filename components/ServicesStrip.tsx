"use client";

import { Plane, Anchor, Car, Home, Map, Helicopter, Ship, Truck } from "lucide-react";

const services = [
  { icon: <Plane size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Private Jet" },
  { icon: <Anchor size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Yacht & Sailing" },
  { icon: <Car size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Sports Car" },
  { icon: <Home size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Exclusive Villas" },
  { icon: <Map size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Bespoke Itineraries" },
  { icon: <Helicopter size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Helicopter Transfers" },
  { icon: <Ship size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Cruise & Expedition" },
  { icon: <Truck size={28} strokeWidth={1.2} color="#C9A96E" />, label: "Vehicle Transport" },
];

// Duplicate list so the seamless loop works (we show 2 copies, animate -50%)
const row1Items = [...services, ...services];
const row2Items = [...services, ...services];

export default function ServicesStrip() {
  return (
    <>
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          animation: marquee-left 35s linear infinite;
          display: flex;
          align-items: center;
          width: max-content;
        }
        .marquee-track-right {
          animation: marquee-right 50s linear infinite;
          display: flex;
          align-items: center;
          width: max-content;
        }
        .marquee-row:hover .marquee-track-left,
        .marquee-row:hover .marquee-track-right {
          animation-play-state: paused;
        }
      `}</style>

      <div
        style={{
          background: "#0a0a0a",
          borderTop: "1px solid rgba(201,169,110,0.1)",
          borderBottom: "1px solid rgba(201,169,110,0.1)",
          padding: "2.5rem 0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Row 1 — left scroll, icons + labels */}
        <div className="marquee-row" style={{ overflow: "hidden" }}>
          <div className="marquee-track-left">
            {row1Items.map((service, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  paddingRight: "0",
                  opacity: 1,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    flexShrink: 0,
                  }}
                >
                  {service.icon}
                </div>
                <span
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontVariant: "small-caps",
                    color: "#C9A96E",
                    whiteSpace: "nowrap",
                    fontWeight: 400,
                  }}
                >
                  {service.label}
                </span>
                {/* Diamond separator */}
                <span
                  style={{
                    color: "rgba(201,169,110,0.3)",
                    fontSize: "0.5rem",
                    margin: "0 1.5rem",
                    flexShrink: 0,
                  }}
                >
                  ◆
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — right scroll, labels only, no icons, reduced opacity */}
        <div className="marquee-row" style={{ overflow: "hidden" }}>
          <div className="marquee-track-right">
            {row2Items.map((service, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  opacity: 0.4,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "0.5rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontVariant: "small-caps",
                    color: "#C9A96E",
                    whiteSpace: "nowrap",
                    fontWeight: 300,
                  }}
                >
                  {service.label}
                </span>
                {/* Diamond separator */}
                <span
                  style={{
                    color: "rgba(201,169,110,0.25)",
                    fontSize: "0.4rem",
                    margin: "0 2rem",
                    flexShrink: 0,
                  }}
                >
                  ◆
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
