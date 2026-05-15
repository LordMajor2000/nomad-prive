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

const visitedOnly = [
  { name: "Dubai", coordinates: [55.3, 25.2] as [number, number] },
  { name: "Moscow", coordinates: [37.6, 55.8] as [number, number] },
  { name: "St. Petersburg", coordinates: [30.3, 59.9] as [number, number] },
  { name: "Goa, India", coordinates: [73.8, 15.5] as [number, number] },
  { name: "Malaga", coordinates: [-4.4, 36.7] as [number, number] },
  { name: "Fuerteventura", coordinates: [-13.9, 28.4] as [number, number] },
  { name: "Tenerife", coordinates: [-16.6, 28.3] as [number, number] },
  { name: "Tarifa", coordinates: [-5.6, 36.0] as [number, number] },
  { name: "Gibraltar", coordinates: [-5.4, 36.1] as [number, number] },
  { name: "Paris", coordinates: [2.3, 48.9] as [number, number] },
  { name: "London", coordinates: [-0.1, 51.5] as [number, number] },
  { name: "Rome", coordinates: [12.5, 41.9] as [number, number] },
  { name: "Berlin", coordinates: [13.4, 52.5] as [number, number] },
  { name: "Vienna", coordinates: [16.4, 48.2] as [number, number] },
  { name: "Marbella", coordinates: [-4.9, 36.5] as [number, number] },
  { name: "Madeira", coordinates: [-16.9, 32.7] as [number, number] },
];

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
  const [activeVisited, setActiveVisited] = useState<string | null>(null);

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
            23 destinations across 4 continents
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
          {"We’ve stood here.\nWe know the way."}
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

          {visitedOnly.map((place) => (
            <Marker
              key={place.name}
              coordinates={place.coordinates}
              onMouseEnter={() => setActiveVisited(place.name)}
              onMouseLeave={() => setActiveVisited(null)}
            >
              <circle
                cx={0}
                cy={0}
                r={3}
                fill="rgba(201,169,110,0.35)"
                style={{ cursor: "default" }}
              />
              {activeVisited === place.name && (
                <foreignObject
                  x={-50}
                  y={-36}
                  width={100}
                  height={28}
                  style={{ overflow: "visible", pointerEvents: "none" }}
                >
                  <div
                    style={{
                      background: "rgba(17,17,17,0.92)",
                      border: "1px solid rgba(201,169,110,0.2)",
                      borderRadius: "2px",
                      padding: "4px 8px",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: "rgba(201,169,110,0.8)",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {place.name}
                    </span>
                  </div>
                </foreignObject>
              )}
            </Marker>
          ))}

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
