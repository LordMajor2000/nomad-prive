"use client";

import Image from "next/image";

interface PastTrip {
  destination: string;
  date: string;
  image: string;
  package: string;
}

export default function PastTrips({ trips }: { trips: PastTrip[] }) {
  return (
    <div style={{ background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", padding: "2.5rem" }}>
      <DashLabel>Előző utak</DashLabel>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1rem",
      }}>
        {trips.map((trip, i) => (
          <div
            key={i}
            style={{
              borderRadius: "2px",
              overflow: "hidden",
              border: "1px solid rgba(201,169,110,0.08)",
              position: "relative",
              aspectRatio: "4/3",
              cursor: "default",
            }}
          >
            <Image
              src={trip.image}
              alt={trip.destination}
              fill
              style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
              sizes="(max-width: 768px) 100vw, 33vw"
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
            }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem 1rem 0.9rem" }}>
              <p style={{
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C9A96E",
                opacity: 0.7,
                margin: "0 0 0.3rem",
              }}>
                {trip.date} · {trip.package}
              </p>
              <p style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#F5F0E8",
                margin: 0,
                lineHeight: 1.3,
              }}>
                {trip.destination}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
      <div style={{ width: "24px", height: "1px", background: "#C9A96E" }} />
      <span style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.7 }}>
        {children}
      </span>
    </div>
  );
}
