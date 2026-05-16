"use client";

import { useState } from "react";

interface Book { title: string; author: string; note: string; }
interface Film { title: string; year: string; note: string; }
interface ReadingsData {
  books: Book[];
  films: Film[];
  playlistName: string;
  playlist: string;
}

type Tab = "books" | "films" | "playlist";

export default function Readings({ readings }: { readings: ReadingsData }) {
  const [tab, setTab] = useState<Tab>("books");

  return (
    <div style={{ background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", padding: "2.5rem" }}>
      <DashLabel>Olvasnivalók & Nézni való</DashLabel>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0", marginBottom: "2rem", borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
        {(["books", "films", "playlist"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "0.65rem 1.5rem",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${tab === t ? "#C9A96E" : "transparent"}`,
              color: tab === t ? "#C9A96E" : "rgba(255,255,255,0.3)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              transition: "all 0.2s ease",
              marginBottom: "-1px",
            }}
          >
            {t === "books" ? "Könyvek" : t === "films" ? "Filmek" : "Playlist"}
          </button>
        ))}
      </div>

      {/* Books */}
      {tab === "books" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {readings.books.map((book, i) => (
            <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              <div style={{
                width: "32px",
                height: "44px",
                background: "linear-gradient(135deg, rgba(201,169,110,0.15), rgba(201,169,110,0.05))",
                border: "1px solid rgba(201,169,110,0.15)",
                borderRadius: "2px",
                flexShrink: 0,
              }} />
              <div>
                <p style={{ fontSize: "0.9rem", color: "#F5F0E8", margin: "0 0 0.2rem", fontWeight: 500 }}>{book.title}</p>
                <p style={{ fontSize: "0.7rem", color: "#C9A96E", opacity: 0.6, margin: "0 0 0.4rem", letterSpacing: "0.05em" }}>{book.author}</p>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>{book.note}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Films */}
      {tab === "films" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {readings.films.map((film, i) => (
            <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              <div style={{
                width: "32px",
                height: "44px",
                background: "linear-gradient(135deg, rgba(201,169,110,0.1), rgba(201,169,110,0.03))",
                border: "1px solid rgba(201,169,110,0.12)",
                borderRadius: "2px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ fontSize: "0.9rem", opacity: 0.5 }}>▶</span>
              </div>
              <div>
                <p style={{ fontSize: "0.9rem", color: "#F5F0E8", margin: "0 0 0.2rem", fontWeight: 500 }}>{film.title}</p>
                <p style={{ fontSize: "0.7rem", color: "#C9A96E", opacity: 0.6, margin: "0 0 0.4rem", letterSpacing: "0.05em" }}>{film.year}</p>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>{film.note}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Playlist */}
      {tab === "playlist" && (
        <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem", opacity: 0.4 }}>♫</div>
          <p style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "1.2rem",
            fontStyle: "italic",
            color: "#F5F0E8",
            margin: "0 0 0.75rem",
          }}>
            {readings.playlistName}
          </p>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", margin: "0 0 2rem", lineHeight: 1.6 }}>
            Az utazásra hangolva — nyissuk meg Spotify-on.
          </p>
          <a
            href={readings.playlist}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "0.8rem 2rem",
              background: "transparent",
              border: "1px solid rgba(201,169,110,0.35)",
              color: "#C9A96E",
              textDecoration: "none",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,169,110,0.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            Megnyitás Spotify-on →
          </a>
        </div>
      )}
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
