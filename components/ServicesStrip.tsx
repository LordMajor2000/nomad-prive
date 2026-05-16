"use client";

import { Plane, Anchor, Car, Home, Map, Helicopter, Ship, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";

const serviceIcons = [
  { icon: Plane,      key: "privateJet" },
  { icon: Anchor,     key: "yacht" },
  { icon: Car,        key: "sportsCar" },
  { icon: Home,       key: "villas" },
  { icon: Map,        key: "itineraries" },
  { icon: Helicopter, key: "helicopter" },
  { icon: Ship,       key: "cruise" },
  { icon: Briefcase,  key: "vehicleTransport" },
] as const;

export default function ServicesStrip() {
  const t = useTranslations("services");
  const services = serviceIcons.map((s) => ({ ...s, label: t(s.key) }));
  const row1 = [...services, ...services, ...services];
  const row2 = [...services, ...services, ...services];

  return (
    <>
      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-rtl {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .strip-track-fwd {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee-ltr 40s linear infinite;
        }
        .strip-track-rev {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee-rtl 55s linear infinite;
        }
        .strip-row:hover .strip-track-fwd,
        .strip-row:hover .strip-track-rev {
          animation-play-state: paused;
        }
        .strip-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          flex-shrink: 0;
          padding: 0 1.75rem;
        }
        .strip-item-icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          opacity: 0.75;
          transition: opacity 0.2s ease-out;
        }
        .strip-item:hover .strip-item-icon { opacity: 1; }
        .strip-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(201,169,110,0.2);
          flex-shrink: 0;
          margin: 0 0.25rem;
        }
      `}</style>

      <div style={{
        background: "#090909",
        borderTop: "1px solid rgba(201,169,110,0.07)",
        borderBottom: "1px solid rgba(201,169,110,0.07)",
        padding: "0",
        overflow: "hidden",
      }}>
        {/* Row 1 — forward, icons + labels */}
        <div
          className="strip-row"
          style={{
            overflow: "hidden",
            padding: "1.5rem 0",
            borderBottom: "1px solid rgba(201,169,110,0.04)",
          }}
        >
          <div className="strip-track-fwd">
            {row1.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="strip-item">
                  <div className="strip-item-icon">
                    <Icon size={16} strokeWidth={1.5} color="#C9A96E" />
                  </div>
                  <span style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.7)",
                    whiteSpace: "nowrap",
                    fontWeight: 400,
                  }}>
                    {s.label}
                  </span>
                  <div className="strip-dot" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 — reverse, text only, dimmed */}
        <div
          className="strip-row"
          style={{ overflow: "hidden", padding: "1.25rem 0" }}
        >
          <div className="strip-track-rev">
            {row2.map((s, i) => (
              <div key={i} className="strip-item" style={{ opacity: 0.3 }}>
                <span style={{
                  fontSize: "0.52rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.9)",
                  whiteSpace: "nowrap",
                  fontWeight: 300,
                }}>
                  {s.label}
                </span>
                <div className="strip-dot" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
