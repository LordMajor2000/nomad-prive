"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
        referred_by: form.get("referred_by") || null,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Hiba történt.");
      setLoading(false);
    } else {
      setSuccess(`Kliens létrehozva. Referral kód: ${data.referralCode}`);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "560px" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.6, marginBottom: "0.5rem" }}>
          Admin · Kliensek
        </p>
        <h1 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#F5F0E8", margin: 0 }}>
          Új kliens hozzáadása
        </h1>
      </div>

      {success ? (
        <div style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "2px", padding: "1.5rem" }}>
          <p style={{ color: "#C9A96E", fontSize: "0.9rem", margin: "0 0 1rem" }}>{success}</p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => { setSuccess(""); }} style={btnStyle(false)}>Új kliens</button>
            <button onClick={() => router.push("/admin/trips/new")} style={btnStyle(true)}>Utazást hozzáad →</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <Field label="Teljes név" name="name" placeholder="pl. Kovács János" required />
          <Field label="Email cím" name="email" type="email" placeholder="pl. kovacs@email.com" required />
          <Field label="Jelszó" name="password" type="password" placeholder="Min. 8 karakter" required />
          <Field label="Referral kód (ki hívta meg?)" name="referred_by" placeholder="pl. NP-SMITH-4X2K — elhagyható" />

          {error && <p style={{ fontSize: "0.8rem", color: "rgba(220,80,80,0.8)", margin: 0 }}>{error}</p>}

          <button type="submit" disabled={loading} style={btnStyle(true)}>
            {loading ? "Létrehozás..." : "Kliens létrehozása →"}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, required }: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)", marginBottom: "0.5rem" }}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(201,169,110,0.15)",
          color: "#F5F0E8",
          padding: "0.8rem 1rem",
          fontSize: "0.88rem",
          outline: "none",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          borderRadius: "2px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function btnStyle(primary: boolean): React.CSSProperties {
  return {
    padding: "0.85rem 1.75rem",
    background: primary ? "transparent" : "transparent",
    border: `1px solid ${primary ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.12)"}`,
    color: primary ? "#C9A96E" : "rgba(255,255,255,0.5)",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    borderRadius: "2px",
    transition: "all 0.2s ease",
  };
}
