"use client";

import { useState } from "react";

const QUESTIONS = [
  { key: "best", label: "Mi volt a legjobb pillanat az úton?" },
  { key: "improve", label: "Mi lehetett volna jobb?" },
  { key: "recommend", label: "Mondaná-e el ismerőseinek?" },
] as const;

type Key = (typeof QUESTIONS)[number]["key"];

export default function TripFeedback() {
  const [answers, setAnswers] = useState<Partial<Record<Key, string>>>({});
  const [recommend, setRecommend] = useState<"yes" | "no" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: Key, val: string) => setAnswers((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    if (!answers.best && !answers.improve && !recommend) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", padding: "2.5rem", textAlign: "center" }}>
        <DashLabel>Visszajelzés</DashLabel>
        <div style={{ padding: "2rem 0" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "1rem", opacity: 0.5 }}>✓</div>
          <p style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "#F5F0E8",
            margin: "0 0 0.5rem",
          }}>
            Köszönjük.
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>
            A véleményed segít, hogy a következő utazás még jobb legyen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", padding: "2.5rem" }}>
      <DashLabel>Post-trip visszajelzés</DashLabel>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {/* Q1 — best moment */}
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", color: "rgba(245,240,232,0.7)", marginBottom: "0.6rem", lineHeight: 1.5 }}>
            {QUESTIONS[0].label}
          </label>
          <textarea
            value={answers.best ?? ""}
            onChange={(e) => set("best", e.target.value)}
            rows={3}
            placeholder="Pl. a csütörtöki hajóút Li Galli körül..."
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(201,169,110,0.15)",
              color: "#F5F0E8",
              padding: "0.8rem 1rem",
              fontSize: "0.85rem",
              outline: "none",
              resize: "vertical",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              lineHeight: 1.6,
              borderRadius: "2px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Q2 — could be better */}
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", color: "rgba(245,240,232,0.7)", marginBottom: "0.6rem", lineHeight: 1.5 }}>
            {QUESTIONS[1].label}
          </label>
          <textarea
            value={answers.improve ?? ""}
            onChange={(e) => set("improve", e.target.value)}
            rows={3}
            placeholder="Bármilyen megjegyzés segít..."
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(201,169,110,0.15)",
              color: "#F5F0E8",
              padding: "0.8rem 1rem",
              fontSize: "0.85rem",
              outline: "none",
              resize: "vertical",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              lineHeight: 1.6,
              borderRadius: "2px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Q3 — recommend */}
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", color: "rgba(245,240,232,0.7)", marginBottom: "0.75rem" }}>
            {QUESTIONS[2].label}
          </label>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {(["yes", "no"] as const).map((val) => (
              <button
                key={val}
                onClick={() => setRecommend(val)}
                style={{
                  padding: "0.65rem 2rem",
                  background: recommend === val ? "rgba(201,169,110,0.12)" : "transparent",
                  border: `1px solid ${recommend === val ? "rgba(201,169,110,0.5)" : "rgba(201,169,110,0.15)"}`,
                  color: recommend === val ? "#C9A96E" : "rgba(255,255,255,0.4)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  borderRadius: "2px",
                  transition: "all 0.2s ease",
                }}
              >
                {val === "yes" ? "Igen" : "Nem"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "0.85rem 2.5rem",
            background: "transparent",
            border: "1px solid rgba(201,169,110,0.4)",
            color: "#C9A96E",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            borderRadius: "2px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.08)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
        >
          Visszajelzés küldése →
        </button>
      </div>
    </div>
  );
}

function DashLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "1rem" }}>
      <div style={{ width: "24px", height: "1px", background: "#C9A96E" }} />
      <span style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.7 }}>
        {children}
      </span>
    </div>
  );
}
