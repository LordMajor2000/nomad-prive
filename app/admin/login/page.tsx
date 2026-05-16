"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-inter), Inter, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: "380px", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.7, marginBottom: "0.75rem" }}>
            Nomad Privé
          </p>
          <h1 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "#F5F0E8",
            margin: 0,
          }}>
            Admin
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin jelszó"
            autoFocus
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${error ? "rgba(220,80,80,0.5)" : "rgba(201,169,110,0.2)"}`,
              color: "#F5F0E8",
              padding: "0.85rem 1.1rem",
              fontSize: "0.9rem",
              outline: "none",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              borderRadius: "2px",
            }}
          />
          {error && (
            <p style={{ fontSize: "0.75rem", color: "rgba(220,80,80,0.8)", margin: 0 }}>
              Hibás jelszó.
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.85rem",
              background: "transparent",
              border: "1px solid rgba(201,169,110,0.4)",
              color: "#C9A96E",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              borderRadius: "2px",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "..." : "Belépés"}
          </button>
        </form>
      </div>
    </div>
  );
}
