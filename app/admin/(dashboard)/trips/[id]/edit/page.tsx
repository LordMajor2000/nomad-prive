"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

const STATUSES = [
  { value: "planned",   label: "Tervezett" },
  { value: "active",    label: "Aktív" },
  { value: "completed", label: "Befejezett" },
  { value: "cancelled", label: "Törölve" },
]

const STEPS = ["Alapadatok", "Hotel", "Transzfer", "Élmények", "Kapcsolatok", "Olvasnivalók"]

export default function TripEditPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [status, setStatus] = useState("planned")
  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState("")
  const [tripStartDate, setTripStartDate] = useState("")
  const [pkg, setPkg] = useState("")
  const [hotel, setHotel] = useState({ name: "", checkIn: "", checkOut: "", roomType: "", confirmationNumber: "", address: "" })
  const [transfers, setTransfers] = useState("[]")
  const [experiences, setExperiences] = useState("[]")
  const [contacts, setContacts] = useState("[]")
  const [readings, setReadings] = useState("{}")
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch(`/api/admin/trips/${id}`).then(r => r.json()).then(trip => {
      if (!trip) return
      setStatus(trip.status ?? "planned")
      const d = trip.data ?? {}
      setDestination(d.destination ?? "")
      setDates(d.dates ?? "")
      setTripStartDate(d.tripStartDate ?? "")
      setPkg(d.package ?? "")
      setHotel(d.hotel ?? { name: "", checkIn: "", checkOut: "", roomType: "", confirmationNumber: "", address: "" })
      setTransfers(JSON.stringify(d.transfers ?? [], null, 2))
      setExperiences(JSON.stringify(d.experiences ?? [], null, 2))
      setContacts(JSON.stringify(d.contacts ?? [], null, 2))
      setReadings(JSON.stringify(d.readings ?? {}, null, 2))
      setLoading(false)
    })
  }, [id])

  const validateJson = (key: string, val: string) => {
    try { JSON.parse(val); setJsonErrors(p => { const n = { ...p }; delete n[key]; return n }) }
    catch { setJsonErrors(p => ({ ...p, [key]: "Érvénytelen JSON" })) }
  }

  const handleSave = async () => {
    if (Object.keys(jsonErrors).length > 0) { setError("Javítsd a JSON hibákat mentés előtt."); return }
    setSaving(true); setError("")
    try {
      const data = {
        destination, dates, tripStartDate, package: pkg,
        hotel,
        transfers: JSON.parse(transfers),
        experiences: JSON.parse(experiences),
        contacts: JSON.parse(contacts),
        readings: JSON.parse(readings),
      }
      const res = await fetch(`/api/admin/trips/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, data }) })
      if (!res.ok) { const e = await res.json(); throw new Error(e.error) }
      setSuccess(true)
      setTimeout(() => { setSuccess(false); router.push("/admin") }, 1500)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>
      Betöltés…
    </div>
  )

  return (
    <div style={{ maxWidth: "760px" }}>
      <Link href="/admin" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "2rem" }}>
        ← Vissza
      </Link>

      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.6, margin: "0 0 0.4rem" }}>Utazás szerkesztése</p>
        <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.6rem", fontWeight: 700, color: "#F5F0E8", margin: 0 }}>
          {destination || "Cím nélkül"}
        </h1>
      </div>

      {/* Wizard lépések */}
      <div style={{ display: "flex", gap: "0", marginBottom: "2.5rem", background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", overflow: "hidden" }}>
        {STEPS.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            flex: 1, padding: "0.7rem 0.5rem", background: step === i ? "rgba(201,169,110,0.1)" : "transparent",
            border: "none", borderRight: i < STEPS.length - 1 ? "1px solid rgba(201,169,110,0.08)" : "none",
            color: step === i ? "#C9A96E" : "rgba(255,255,255,0.3)",
            fontSize: "0.52rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
            borderBottom: step === i ? "2px solid #C9A96E" : "2px solid transparent",
            transition: "all 0.2s",
          }}>
            <span style={{ display: "block", fontSize: "0.42rem", opacity: 0.5, marginBottom: "0.1rem" }}>{String(i + 1).padStart(2, "0")}</span>
            {s}
          </button>
        ))}
      </div>

      {/* Step 0 — Alapadatok */}
      {step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Státusz">
              <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </Field>
            <Field label="Csomag"><input style={inputStyle} value={pkg} onChange={e => setPkg(e.target.value)} placeholder="PRIVÉ" /></Field>
          </div>
          <Field label="Úticél"><input style={inputStyle} value={destination} onChange={e => setDestination(e.target.value)} placeholder="Santorini, Görögország" /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Dátumok (megjelenített)"><input style={inputStyle} value={dates} onChange={e => setDates(e.target.value)} placeholder="jún. 14–21." /></Field>
            <Field label="Indulás dátuma"><input style={inputStyle} type="date" value={tripStartDate} onChange={e => setTripStartDate(e.target.value)} /></Field>
          </div>
        </div>
      )}

      {/* Step 1 — Hotel */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Field label="Szálloda neve"><input style={inputStyle} value={hotel.name} onChange={e => setHotel(h => ({ ...h, name: e.target.value }))} placeholder="Canaves Oia Suites" /></Field>
          <Field label="Cím"><input style={inputStyle} value={hotel.address} onChange={e => setHotel(h => ({ ...h, address: e.target.value }))} /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Check-in"><input style={inputStyle} value={hotel.checkIn} onChange={e => setHotel(h => ({ ...h, checkIn: e.target.value }))} placeholder="jún. 14, 15:00" /></Field>
            <Field label="Check-out"><input style={inputStyle} value={hotel.checkOut} onChange={e => setHotel(h => ({ ...h, checkOut: e.target.value }))} placeholder="jún. 21, 11:00" /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Szobatípus"><input style={inputStyle} value={hotel.roomType} onChange={e => setHotel(h => ({ ...h, roomType: e.target.value }))} placeholder="Infinity Suite" /></Field>
            <Field label="Visszaigazolás száma"><input style={inputStyle} value={hotel.confirmationNumber} onChange={e => setHotel(h => ({ ...h, confirmationNumber: e.target.value }))} /></Field>
          </div>
        </div>
      )}

      {/* Step 2 — Transzfer */}
      {step === 2 && (
        <JsonField label="Transzfer" value={transfers} error={jsonErrors.transfers}
          onChange={v => { setTransfers(v); validateJson("transfers", v) }} />
      )}

      {/* Step 3 — Élmények */}
      {step === 3 && (
        <JsonField label="Élmények" value={experiences} error={jsonErrors.experiences}
          onChange={v => { setExperiences(v); validateJson("experiences", v) }} />
      )}

      {/* Step 4 — Kapcsolatok */}
      {step === 4 && (
        <JsonField label="Kapcsolatok" value={contacts} error={jsonErrors.contacts}
          onChange={v => { setContacts(v); validateJson("contacts", v) }} />
      )}

      {/* Step 5 — Olvasnivalók */}
      {step === 5 && (
        <JsonField label="Olvasnivalók" value={readings} error={jsonErrors.readings}
          onChange={v => { setReadings(v); validateJson("readings", v) }} />
      )}

      {/* Nav + mentés */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(201,169,110,0.08)" }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ ...btnStyle, opacity: step === 0 ? 0.3 : 1 }}>← Előző</button>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {error && <span style={{ fontSize: "0.65rem", color: "#FC814A" }}>{error}</span>}
          {success && <span style={{ fontSize: "0.65rem", color: "#48BB78" }}>✓ Mentve</span>}
          <button onClick={handleSave} disabled={saving} style={{ ...btnStyle, background: "rgba(201,169,110,0.12)", borderColor: "rgba(201,169,110,0.4)", color: "#C9A96E" }}>
            {saving ? "Mentés…" : "Mentés"}
          </button>
          {step < STEPS.length - 1 && (
            <button onClick={() => setStep(s => s + 1)} style={{ ...btnStyle, borderColor: "rgba(201,169,110,0.25)", color: "rgba(255,255,255,0.5)" }}>Következő →</button>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.52rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,169,110,0.5)", marginBottom: "0.4rem" }}>{label}</label>
      {children}
    </div>
  )
}

function JsonField({ label, value, onChange, error }: { label: string; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <Field label={label}>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={14}
        style={{ ...inputStyle, fontFamily: "monospace", fontSize: "0.72rem", resize: "vertical", width: "100%", boxSizing: "border-box", borderColor: error ? "rgba(252,129,74,0.5)" : undefined }} />
      {error && <p style={{ fontSize: "0.6rem", color: "#FC814A", margin: "0.3rem 0 0" }}>{error}</p>}
    </Field>
  )
}

const inputStyle: React.CSSProperties = {
  width: "100%", background: "#111", border: "1px solid rgba(201,169,110,0.15)",
  color: "#F5F0E8", padding: "0.6rem 0.85rem", fontSize: "0.82rem",
  borderRadius: "2px", outline: "none", boxSizing: "border-box",
}
const selectStyle: React.CSSProperties = { ...inputStyle, cursor: "pointer" }
const btnStyle: React.CSSProperties = {
  padding: "0.55rem 1.2rem", background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.4)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase",
  cursor: "pointer", borderRadius: "2px",
}
