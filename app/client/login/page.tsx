"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoExists, setLogoExists] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/client/dashboard");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: "2px",
    padding: "0.9rem 1rem",
    color: "var(--cream, #F5F0E8)",
    fontSize: "0.9rem",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s ease",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            {logoExists ? (
              <Image
                src="/logo.png"
                alt="Nomad Privé"
                width={180}
                height={46}
                style={{ objectFit: "contain" }}
                onError={() => setLogoExists(false)}
              />
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  color: "#C9A96E",
                  textTransform: "uppercase",
                }}
              >
                Nomad Privé
              </span>
            )}
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#111",
            border: "1px solid rgba(201,169,110,0.12)",
            borderRadius: "2px",
            padding: "3rem 2.5rem",
          }}
        >
          {/* Decorative line */}
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#C9A96E",
              marginBottom: "2rem",
            }}
          />

          <h1
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#F5F0E8",
              marginBottom: "0.5rem",
              lineHeight: 1.2,
            }}
          >
            Client Portal
          </h1>

          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.45)",
              marginBottom: "2.5rem",
              lineHeight: 1.6,
            }}
          >
            Enter your credentials to access your journey details.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.7)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = "#C9A96E";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(201,169,110,0.2)";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.7)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = "#C9A96E";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(201,169,110,0.2)";
                  }}
                />
              </div>

              {error && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(220, 100, 80, 0.9)",
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.95rem",
                  background: "transparent",
                  border: "1px solid #C9A96E",
                  color: "#C9A96E",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  transition: "all 0.2s ease",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>

        {/* Demo note */}
        <p
          style={{
            textAlign: "center",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.2)",
            marginTop: "1.5rem",
            lineHeight: 1.6,
          }}
        >
          Demo: client@nomadprive.com / nomad2024
        </p>
      </div>
    </div>
  );
}
