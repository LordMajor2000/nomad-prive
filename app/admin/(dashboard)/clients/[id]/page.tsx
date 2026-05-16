import { supabaseAdmin } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"

const STATUS_COLORS: Record<string, { bg: string; border: string; color: string; label: string }> = {
  planned:   { bg: "rgba(99,179,237,0.1)",  border: "rgba(99,179,237,0.35)",  color: "#63B3ED", label: "Tervezett" },
  active:    { bg: "rgba(72,187,120,0.1)",  border: "rgba(72,187,120,0.35)",  color: "#48BB78", label: "Aktív" },
  completed: { bg: "rgba(201,169,110,0.1)", border: "rgba(201,169,110,0.35)", color: "#C9A96E", label: "Befejezett" },
  cancelled: { bg: "rgba(252,129,74,0.1)",  border: "rgba(252,129,74,0.35)",  color: "#FC814A", label: "Törölve" },
}

export default async function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id, name, email, referral_code, referred_by, created_at")
    .eq("id", id)
    .single()

  if (!user) notFound()

  const { data: trips } = await supabaseAdmin
    .from("trips")
    .select("id, status, created_at, data")
    .eq("user_id", id)
    .order("created_at", { ascending: false })

  const initials = (user.name ?? user.email).slice(0, 2).toUpperCase()

  return (
    <div style={{ maxWidth: "900px" }}>
      {/* Back */}
      <Link href="/admin" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2rem" }}>
        ← Vissza
      </Link>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
        <div style={{
          width: "64px", height: "64px", borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, rgba(201,169,110,0.25), rgba(201,169,110,0.06))",
          border: "1px solid rgba(201,169,110,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-playfair), serif", fontSize: "1.4rem", color: "#C9A96E", fontWeight: 700,
        }}>
          {initials}
        </div>
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.6rem", fontWeight: 700, color: "#F5F0E8", margin: "0 0 0.25rem" }}>
            {user.name ?? "—"}
          </h1>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", margin: 0, fontWeight: 300 }}>{user.email}</p>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Link href={`/admin/trips/new?userId=${user.id}`} style={{
            display: "inline-block", padding: "0.55rem 1.2rem",
            background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.35)",
            color: "#C9A96E", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px",
          }}>
            + Új utazás
          </Link>
        </div>
      </div>

      {/* Info grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2.5rem" }} className="profile-grid">
        {[
          { label: "Referral kód", value: user.referral_code ?? "—", mono: true, gold: true },
          { label: "Meghívta", value: user.referred_by ?? "Organikus" },
          { label: "Regisztráció", value: new Date(user.created_at).toLocaleDateString("hu-HU", { year: "numeric", month: "long", day: "numeric" }) },
          { label: "Összes utazás", value: String(trips?.length ?? 0) },
        ].map(item => (
          <div key={item.label} style={{ background: "#111", border: "1px solid rgba(201,169,110,0.08)", borderRadius: "2px", padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,169,110,0.45)", marginBottom: "0.5rem" }}>{item.label}</div>
            <div style={{ fontSize: "0.85rem", color: item.gold ? "#C9A96E" : "#F5F0E8", fontFamily: item.mono ? "monospace" : "inherit", fontWeight: 400 }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Utazások */}
      <div>
        <div style={{ fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.6, marginBottom: "1rem" }}>
          Utazások
        </div>
        {trips && trips.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {trips.map(trip => {
              const data = trip.data as Record<string, string> | null
              const s = STATUS_COLORS[trip.status] ?? STATUS_COLORS.planned
              return (
                <div key={trip.id} style={{ background: "#111", border: "1px solid rgba(201,169,110,0.08)", borderRadius: "2px", padding: "1.1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "#F5F0E8", marginBottom: "0.2rem" }}>
                      {data?.destination ?? "Utazás"}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>
                      {data?.dates ?? "—"} · {new Date(trip.created_at).toLocaleDateString("hu-HU")}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ padding: "0.2rem 0.65rem", background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "2px" }}>
                      {s.label}
                    </span>
                    <Link href={`/admin/trips/${trip.id}/edit`} style={{ fontSize: "0.6rem", color: "rgba(201,169,110,0.5)", textDecoration: "none", letterSpacing: "0.1em", border: "1px solid rgba(201,169,110,0.15)", padding: "0.2rem 0.6rem", borderRadius: "2px" }}>
                      Szerkesztés
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ background: "#111", border: "1px solid rgba(201,169,110,0.08)", borderRadius: "2px", padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.85rem", fontStyle: "italic" }}>
            Még nincs utazás ehhez a klienshez
          </div>
        )}
      </div>

      <style>{`@media(max-width:600px){.profile-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}
