"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import Link from "next/link";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const destinations = [
  {
    name: "Sri Lanka",
    slug: "sri-lanka",
    coordinates: [80.7, 7.8] as [number, number],
    tagline: "The exotic adventure Bali used to be.",
  },
  {
    name: "Bali & Lombok",
    slug: "bali-vs-lombok",
    coordinates: [115.2, -8.4] as [number, number],
    tagline: "Beautiful. Less crowded. More real.",
  },
  {
    name: "Morocco",
    slug: "morocco",
    coordinates: [-7.1, 31.8] as [number, number],
    tagline: "Taghazout surf & Marrakesh medina.",
  },
  {
    name: "Miami",
    slug: "miami",
    coordinates: [-80.2, 25.8] as [number, number],
    tagline: "Hidden gems, Key West, open roads.",
  },
  {
    name: "Mykonos",
    slug: "mykonos",
    coordinates: [25.4, 37.4] as [number, number],
    tagline: "Unapologetic luxury.",
  },
  {
    name: "Amalfi Coast",
    slug: "amalfi-coast",
    coordinates: [14.6, 40.6] as [number, number],
    tagline: "Where the road ends, the dream begins.",
  },
  {
    name: "Dubrovnik",
    slug: "dubrovnik",
    coordinates: [18.1, 42.6] as [number, number],
    tagline: "The city tourists never see.",
  },
];

export default function WorldMap() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  return (
    <section
      style={{
        background: "#080808",
        padding: "clamp(4rem, 8vw, 7rem) 0 0 0",
        overflow: "hidden",
      }}
    >
      {/* Heading */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          marginBottom: "2.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#C9A96E",
            }}
          />
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontVariant: "small-caps",
              color: "#C9A96E",
            }}
          >
            Where We&apos;ve Taken Our Clients
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "var(--cream)",
            lineHeight: 1.15,
            margin: 0,
            whiteSpace: "pre-line",
          }}
        >
          {"The World,\nMapped."}
        </h2>
      </div>

      {/* Map container */}
      <div
        style={{
          width: "100%",
          height: "clamp(320px, 50vw, 500px)",
          background: "#080808",
          position: "relative",
        }}
      >
        <style>{`
          @keyframes markerPulse {
            0% { r: 6; opacity: 0.6; }
            100% { r: 14; opacity: 0; }
          }
          .pulse-ring {
            animation: markerPulse 2s ease-out infinite;
            transform-origin: center;
            transform-box: fill-box;
          }
        `}</style>

        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 130, center: [20, 20] }}
          style={{ width: "100%", height: "100%", background: "#080808" }}
        >
          <Geographies geography={GEO_URL}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {({ geographies }: any) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#0e0e0e",
                      stroke: "rgba(201,169,110,0.12)",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: "#0e0e0e",
                      stroke: "rgba(201,169,110,0.12)",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#0e0e0e",
                      stroke: "rgba(201,169,110,0.12)",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {destinations.map((dest) => (
            <Marker
              key={dest.slug}
              coordinates={dest.coordinates}
              onMouseEnter={() => setActiveMarker(dest.slug)}
              onMouseLeave={() => setActiveMarker(null)}
            >
              {/* Pulse ring */}
              <circle
                className="pulse-ring"
                cx={0}
                cy={0}
                r={6}
                fill="none"
                stroke="#C9A96E"
                strokeWidth={1}
                opacity={0.6}
              />
              {/* Inner solid dot */}
              <circle
                cx={0}
                cy={0}
                r={4}
                fill="#C9A96E"
                style={{ cursor: "pointer" }}
              />

              {/* Tooltip */}
              {activeMarker === dest.slug && (
                <foreignObject
                  x={-80}
                  y={-100}
                  width={180}
                  height={100}
                  style={{ overflow: "visible", pointerEvents: "none" }}
                >
                  <div
                    style={{
                      background: "#111",
                      border: "1px solid rgba(201,169,110,0.3)",
                      borderRadius: "2px",
                      padding: "12px 16px",
                      width: "180px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "#C9A96E",
                        marginBottom: "4px",
                      }}
                    >
                      {dest.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontStyle: "italic",
                        color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.4,
                        marginBottom: "8px",
                      }}
                    >
                      {dest.tagline}
                    </div>
                    <a
                      href={`/journal/${dest.slug}`}
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#C9A96E",
                        textDecoration: "none",
                        pointerEvents: "all",
                      }}
                    >
                      Explore →
                    </a>
                  </div>
                </foreignObject>
              )}
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </section>
  );
}
