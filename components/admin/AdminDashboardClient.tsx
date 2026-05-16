"use client"

import { useState, useMemo } from "react"
import Link from "next/link"

type User = { id: string; email: string; name: string | null; referral_code: string | null; referred_by: string | null; created_at: string }
type Trip = { id: string; user_id: string; status: string; created_at: string; data: Record<string, string> | null }

const STATUS_COLORS: Record<string, { bg: string; border: string; color: string; label: string }> = {
  planned:   { bg: "rgba(99,179,237,0.1)",   border: "rgba(99,179,237,0.35)",   color: "#63B3ED", label: "Tervezett" },
  active:    { bg: "rgba(72,187,120,0.1)",   border: "rgba(72,187,120,0.35)",   color: "#48BB78", label: "Aktív" },
  completed: { bg: "rgba(201,169,110,0.1)",  border: "rgba(201,169,110,0.35)",  color: "#C9A96E", label: "Befejezett" },
  cancelled: { bg: "rgba(252,129,74,0.1)",   border: "rgba(252,129,74,0.35)",   color: "#FC814A", label: "Törölve" },
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status] ?? STATUS_COLORS.planned
  return (
    <span style={{ display: "inline-block", padding: "0.2rem 0.65rem", background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "2px", whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  )
}

function StatCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div style={{ background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", padding: "1.25rem 1.5rem" }}>
      <div style={{ fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,169,110,0.5)", marginBottom: "0.5rem" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#F5F0E8", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", marginTop: "0.3rem" }}>{sub}</div>}
    </div>
  )
}

export default function AdminDashboardClient({ users, trips }: { users: User[]; trips: Trip[] }) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [view, setView] = useState<"cards" | "table">("cards")

  const activeTrips = trips.filter(t => t.status === "active").length
  const plannedTrips = trips.filter(t => t.status === "planned").length

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase()
    return users.filter(u =>
      !q || u.name?.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.referral_code?.toLowerCase().includes(q)
    )
  }, [users, search])

  const filteredTrips = useMemo(() => {
    return trips.filter(t => statusFilter === "all" || t.status === statusFilter)
  }, [trips, statusFilter])

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.6, margin: "0 0 0.4rem" }}>Admin panel</p>
          <h1 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#F5F0E8", margin: 0 }}>Áttekintés</h1>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <AdminBtn href="/admin/clients/new">+ Új kliens</AdminBtn>
          <AdminBtn href="/admin/trips/new" primary>+ Új utazás</AdminBtn>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2.5rem" }} className="admin-stats">
        <StatCard label="Összes kliens" value={users.length} />
        <StatCard label="Aktív utazás" value={activeTrips} sub="folyamatban" />
        <StatCard label="Tervezett" value={plannedTrips} sub="közelgő" />
        <StatCard label="Összes utazás" value={trips.length} />
      </div>

      {/* Kliensek */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.7 }}>Kliensek</span>
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)" }}>{filteredUsers.length}</span>
          </div>
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            {/* Keresés */}
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Keresés…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  background: "#111", border: "1px solid rgba(201,169,110,0.12)", color: "#F5F0E8",
                  padding: "0.45rem 0.9rem 0.45rem 2rem", fontSize: "0.72rem", borderRadius: "2px",
                  outline: "none", width: "180px",
                }}
              />
              <svg style={{ position: "absolute", left: "0.6rem", top: "50%", transform: "translateY(-50%)", opacity: 0.35 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </div>
            {/* View toggle */}
            <div style={{ display: "flex", border: "1px solid rgba(201,169,110,0.12)", borderRadius: "2px", overflow: "hidden" }}>
              {(["cards", "table"] as const).map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: "0.4rem 0.7rem", background: view === v ? "rgba(201,169,110,0.1)" : "transparent",
                  border: "none", color: view === v ? "#C9A96E" : "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "0.6rem", letterSpacing: "0.1em",
                }}>
                  {v === "cards" ? "⊞" : "≡"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {view === "cards" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {filteredUsers.map(u => {
              const userTrips = trips.filter(t => t.user_id === u.id)
              const activeTrip = userTrips.find(t => t.status === "active" || t.status === "planned")
              return (
                <Link key={u.id} href={`/admin/clients/${u.id}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px",
                    padding: "1.25rem 1.5rem", transition: "border-color 0.2s, background 0.2s", cursor: "pointer",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.3)"; (e.currentTarget as HTMLDivElement).style.background = "#161616"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.1)"; (e.currentTarget as HTMLDivElement).style.background = "#111"; }}
                  >
                    {/* Avatar + név */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                      <div style={{
                        width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
                        background: "linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.05))",
                        border: "1px solid rgba(201,169,110,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-playfair), serif", fontSize: "0.85rem", color: "#C9A96E", fontWeight: 700,
                      }}>
                        {(u.name ?? u.email).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.1rem" }}>{u.name ?? "—"}</div>
                        <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>{u.email}</div>
                      </div>
                    </div>
                    {/* Referral kód */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <span style={{ fontSize: "0.58rem", letterSpacing: "0.15em", color: "rgba(201,169,110,0.6)", fontFamily: "monospace" }}>
                        {u.referral_code ?? "—"}
                      </span>
                      <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.2)" }}>
                        {new Date(u.created_at).toLocaleDateString("hu-HU")}
                      </span>
                    </div>
                    {/* Aktív utazás */}
                    {activeTrip ? (
                      <div style={{ borderTop: "1px solid rgba(201,169,110,0.07)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.5)" }}>
                          {(activeTrip.data as Record<string, string>)?.destination ?? "Utazás"}
                        </span>
                        <StatusBadge status={activeTrip.status} />
                      </div>
                    ) : (
                      <div style={{ borderTop: "1px solid rgba(201,169,110,0.07)", paddingTop: "0.75rem" }}>
                        <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.18)", fontStyle: "italic" }}>
                          {userTrips.length === 0 ? "Még nincs utazás" : `${userTrips.length} befejezett utazás`}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
            {filteredUsers.length === 0 && (
              <div style={{ gridColumn: "1/-1", padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.85rem" }}>
                Nincs találat
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Név", "Email", "Referral kód", "Meghívó", "Regisztráció", "Utazások"].map(h => (
                    <th key={h} style={{ padding: "0.75rem 1.5rem", textAlign: "left", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,169,110,0.5)", fontWeight: 400, whiteSpace: "nowrap", borderBottom: "1px solid rgba(201,169,110,0.08)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} style={{ borderBottom: "1px solid rgba(201,169,110,0.05)", cursor: "pointer" }}
                    onClick={() => window.location.href = `/admin/clients/${u.id}`}
                    onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = "rgba(201,169,110,0.03)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                  >
                    <td style={{ padding: "0.85rem 1.5rem", fontSize: "0.8rem", color: "#F5F0E8", fontWeight: 500 }}>{u.name ?? "—"}</td>
                    <td style={{ padding: "0.85rem 1.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>{u.email}</td>
                    <td style={{ padding: "0.85rem 1.5rem", fontSize: "0.75rem", color: "#C9A96E", fontFamily: "monospace" }}>{u.referral_code ?? "—"}</td>
                    <td style={{ padding: "0.85rem 1.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>{u.referred_by ?? "—"}</td>
                    <td style={{ padding: "0.85rem 1.5rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>{new Date(u.created_at).toLocaleDateString("hu-HU")}</td>
                    <td style={{ padding: "0.85rem 1.5rem" }}>
                      <span style={{ padding: "0.15rem 0.55rem", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)", color: "#C9A96E", fontSize: "0.62rem", borderRadius: "1px" }}>
                        {trips.filter(t => t.user_id === u.id).length}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Utazások */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.7 }}>Utazások</span>
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)" }}>{filteredTrips.length}</span>
          </div>
          {/* Státusz filter */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {["all", "planned", "active", "completed", "cancelled"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{
                padding: "0.3rem 0.75rem", borderRadius: "2px", border: "1px solid",
                borderColor: statusFilter === s ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.08)",
                background: statusFilter === s ? "rgba(201,169,110,0.08)" : "transparent",
                color: statusFilter === s ? "#C9A96E" : "rgba(255,255,255,0.3)",
                fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              }}>
                {s === "all" ? "Mind" : STATUS_COLORS[s]?.label ?? s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Kliens", "Úticél", "Dátum", "Státusz", "Létrehozva", ""].map((h, i) => (
                  <th key={i} style={{ padding: "0.75rem 1.5rem", textAlign: "left", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,169,110,0.5)", fontWeight: 400, whiteSpace: "nowrap", borderBottom: "1px solid rgba(201,169,110,0.08)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map(trip => {
                const user = users.find(u => u.id === trip.user_id)
                const data = trip.data as Record<string, string> | null
                return (
                  <tr key={trip.id} style={{ borderBottom: "1px solid rgba(201,169,110,0.05)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = "rgba(201,169,110,0.03)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                  >
                    <td style={{ padding: "0.85rem 1.5rem", fontSize: "0.8rem", color: "#F5F0E8", fontWeight: 500 }}>{user?.name ?? user?.email ?? "—"}</td>
                    <td style={{ padding: "0.85rem 1.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>{data?.destination ?? "—"}</td>
                    <td style={{ padding: "0.85rem 1.5rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>{data?.dates ?? "—"}</td>
                    <td style={{ padding: "0.85rem 1.5rem" }}><StatusBadge status={trip.status} /></td>
                    <td style={{ padding: "0.85rem 1.5rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>{new Date(trip.created_at).toLocaleDateString("hu-HU")}</td>
                    <td style={{ padding: "0.85rem 1.5rem" }}>
                      <Link href={`/admin/trips/${trip.id}/edit`} style={{ fontSize: "0.6rem", color: "rgba(201,169,110,0.5)", textDecoration: "none", letterSpacing: "0.1em", border: "1px solid rgba(201,169,110,0.15)", padding: "0.2rem 0.6rem", borderRadius: "2px", transition: "color 0.2s ease-out, border-color 0.2s ease-out" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.4)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.5)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.15)"; }}
                      >
                        Szerkesztés
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {filteredTrips.length === 0 && (
                <tr><td colSpan={6} style={{ padding: "2.5rem", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.85rem" }}>Nincs utazás</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .admin-stats { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .admin-stats { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </div>
  )
}

function AdminBtn({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <Link href={href} style={{
      display: "inline-block", padding: "0.55rem 1.2rem",
      background: primary ? "rgba(201,169,110,0.1)" : "transparent",
      border: `1px solid ${primary ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.1)"}`,
      color: primary ? "#C9A96E" : "rgba(255,255,255,0.45)",
      fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px",
    }}>
      {children}
    </Link>
  )
}
