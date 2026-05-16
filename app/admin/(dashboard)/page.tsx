import { supabaseAdmin } from "@/lib/supabase"
import Link from "next/link"

export default async function AdminDashboard() {
  const { data: users } = await supabaseAdmin
    .from("users")
    .select("id, email, name, referral_code, referred_by, created_at")
    .order("created_at", { ascending: false })

  const { data: trips } = await supabaseAdmin
    .from("trips")
    .select("id, user_id, status, created_at, data")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.6, marginBottom: "0.5rem" }}>
            Admin panel
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#F5F0E8", margin: 0 }}>
            Kliensek &amp; Utazások
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <AdminBtn href="/admin/clients/new">+ Új kliens</AdminBtn>
          <AdminBtn href="/admin/trips/new" primary>+ Új utazás</AdminBtn>
        </div>
      </div>

      {/* Users table */}
      <Section title="Regisztrált kliensek" count={users?.length ?? 0}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Név", "Email", "Referral kód", "Meghívó", "Regisztráció", "Utazások"].map((h) => (
                <Th key={h}>{h}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => {
              const userTrips = trips?.filter((t) => t.user_id === u.id) ?? []
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid rgba(201,169,110,0.06)" }}>
                  <Td bold>{u.name ?? "—"}</Td>
                  <Td>{u.email}</Td>
                  <Td gold>{u.referral_code ?? "—"}</Td>
                  <Td muted>{u.referred_by ?? "—"}</Td>
                  <Td muted>{new Date(u.created_at).toLocaleDateString("hu-HU")}</Td>
                  <Td>
                    <span style={{
                      display: "inline-block",
                      padding: "0.15rem 0.6rem",
                      background: userTrips.length > 0 ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${userTrips.length > 0 ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.08)"}`,
                      color: userTrips.length > 0 ? "#C9A96E" : "rgba(255,255,255,0.3)",
                      fontSize: "0.65rem",
                      borderRadius: "1px",
                      letterSpacing: "0.1em",
                    }}>
                      {userTrips.length}
                    </span>
                  </Td>
                </tr>
              )
            })}
            {(!users || users.length === 0) && (
              <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "0.85rem" }}>Még nincs kliens</td></tr>
            )}
          </tbody>
        </table>
      </Section>

      {/* Trips table */}
      <Section title="Utazások" count={trips?.length ?? 0}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Kliens", "Úticél", "Dátum", "Státusz", "Létrehozva"].map((h) => (
                <Th key={h}>{h}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trips?.map((trip) => {
              const user = users?.find((u) => u.id === trip.user_id)
              const data = trip.data as Record<string, string> | null
              return (
                <tr key={trip.id} style={{ borderBottom: "1px solid rgba(201,169,110,0.06)" }}>
                  <Td bold>{user?.name ?? user?.email ?? "—"}</Td>
                  <Td>{data?.destination ?? "—"}</Td>
                  <Td muted>{data?.dates ?? "—"}</Td>
                  <Td gold>{trip.status}</Td>
                  <Td muted>{new Date(trip.created_at).toLocaleDateString("hu-HU")}</Td>
                </tr>
              )
            })}
            {(!trips || trips.length === 0) && (
              <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "0.85rem" }}>Még nincs utazás</td></tr>
            )}
          </tbody>
        </table>
      </Section>
    </div>
  )
}

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "3rem", background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", overflow: "hidden" }}>
      <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid rgba(201,169,110,0.08)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.7 }}>{title}</span>
        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>{count}</span>
      </div>
      <div style={{ overflowX: "auto" }}>{children}</div>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: "0.75rem 1.75rem", textAlign: "left", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,169,110,0.5)", fontWeight: 400, whiteSpace: "nowrap" }}>
      {children}
    </th>
  )
}

function Td({ children, bold, gold, muted }: { children: React.ReactNode; bold?: boolean; gold?: boolean; muted?: boolean }) {
  return (
    <td style={{
      padding: "0.9rem 1.75rem",
      fontSize: "0.82rem",
      color: bold ? "#F5F0E8" : gold ? "#C9A96E" : muted ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.7)",
      fontWeight: bold ? 500 : 300,
      whiteSpace: "nowrap",
    }}>
      {children}
    </td>
  )
}

function AdminBtn({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "0.6rem 1.25rem",
        background: primary ? "rgba(201,169,110,0.1)" : "transparent",
        border: `1px solid ${primary ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.12)"}`,
        color: primary ? "#C9A96E" : "rgba(255,255,255,0.5)",
        fontSize: "0.65rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        textDecoration: "none",
        borderRadius: "2px",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </Link>
  )
}
