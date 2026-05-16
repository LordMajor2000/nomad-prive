"use client";

import { useState, useEffect } from "react";

const DEFAULT_WISHES = [
  "Kyoto · Japán",
  "Maldív-szigetek",
  "Seychelles",
  "Santorini · Görögország",
  "Marokkó · Marrakesh",
];

export default function WishList() {
  const [items, setItems] = useState<string[]>(DEFAULT_WISHES);
  const [newItem, setNewItem] = useState("");
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nomad-wishlist");
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch {}
    }
  }, []);

  const save = (next: string[]) => {
    setItems(next);
    localStorage.setItem("nomad-wishlist", JSON.stringify(next));
  };

  const add = () => {
    if (!newItem.trim()) return;
    save([...items, newItem.trim()]);
    setNewItem("");
  };

  const remove = (i: number) => save(items.filter((_, idx) => idx !== i));

  const onDragStart = (i: number) => setDragIdx(i);
  const onDragOver = (e: React.DragEvent, i: number) => { e.preventDefault(); setOverIdx(i); };
  const onDrop = (i: number) => {
    if (dragIdx === null || dragIdx === i) return;
    const next = [...items];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(i, 0, moved);
    save(next);
    setDragIdx(null);
    setOverIdx(null);
  };
  const onDragEnd = () => { setDragIdx(null); setOverIdx(null); };

  return (
    <div style={{ background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", padding: "2.5rem" }}>
      <DashLabel>Egyszer el akarom menni…</DashLabel>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem" }}>
        {items.map((item, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => onDragStart(i)}
            onDragOver={(e) => onDragOver(e, i)}
            onDrop={() => onDrop(i)}
            onDragEnd={onDragEnd}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.8rem 1rem",
              background: overIdx === i ? "rgba(201,169,110,0.06)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${overIdx === i ? "rgba(201,169,110,0.25)" : "rgba(201,169,110,0.07)"}`,
              borderRadius: "2px",
              cursor: "grab",
              transition: "all 0.15s ease",
              opacity: dragIdx === i ? 0.35 : 1,
            }}
          >
            <span style={{ color: "rgba(201,169,110,0.25)", fontSize: "0.75rem", flexShrink: 0, userSelect: "none", letterSpacing: "0.05em" }}>
              ⠿
            </span>
            <span style={{ flex: 1, fontSize: "0.88rem", color: "#F5F0E8", fontWeight: 300 }}>{item}</span>
            <button
              onClick={() => remove(i)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.18)",
                cursor: "pointer",
                fontSize: "1rem",
                padding: "0",
                lineHeight: 1,
                transition: "color 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(201,169,110,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.18)"; }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Új célpont hozzáadása…"
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(201,169,110,0.15)",
            color: "#F5F0E8",
            padding: "0.7rem 1rem",
            fontSize: "0.85rem",
            outline: "none",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            borderRadius: "2px",
          }}
        />
        <button
          onClick={add}
          style={{
            padding: "0.7rem 1.25rem",
            background: "transparent",
            border: "1px solid rgba(201,169,110,0.35)",
            color: "#C9A96E",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            borderRadius: "2px",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.08)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
        >
          + Hozzáad
        </button>
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
