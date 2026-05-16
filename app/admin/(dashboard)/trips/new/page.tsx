"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TRANSFERS_TEMPLATE = JSON.stringify([
  { type: "Érkezés", date: "jún. 14", time: "12:30", from: "Budapest (BUD)", to: "Hotel", vehicle: "Privát Mercedes V-Class" },
  { type: "Kirándulás", date: "jún. 17", time: "09:00", from: "Hotel", to: "Célpont", vehicle: "Privát csónak" },
  { type: "Indulás", date: "jún. 21", time: "09:00", from: "Hotel", to: "Budapest (BUD)", vehicle: "Privát Mercedes V-Class" },
], null, 2);

const EXPERIENCES_TEMPLATE = JSON.stringify([
  { date: "jún. 14 (este)", title: "Üdvözlő vacsora", detail: "Étterem neve, 20:00" },
  { date: "jún. 15", title: "Program neve", detail: "Részletek" },
  { date: "jún. 16", title: "Szabad nap", detail: "Strand klub foglalva" },
], null, 2);

const CONTACTS_TEMPLATE = JSON.stringify([
  { role: "Nomad Privé — Travel Designer", name: "Nomad Privé", phone: "+36 XX XXX XXXX", available: "24/7 WhatsApp" },
  { role: "Hotel Concierge", name: "Hotel neve", phone: "+XX XX XXX XXXX", available: "8:00–22:00" },
], null, 2);

const READINGS_TEMPLATE = JSON.stringify({
  books: [
    { title: "Könyv neve", author: "Szerző", note: "Miért ajánlott" },
  ],
  films: [
    { title: "Film neve", year: "2023", note: "Miért ajánlott" },
  ],
  playlistName: "Playlist neve",
  playlist: "https://open.spotify.com/playlist/...",
}, null, 2);

export default function NewTripPage() {
  const router = useRouter();
  const [users, setUsers] = useState<{ id: string; name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [transfers, setTransfers] = useState(TRANSFERS_TEMPLATE);
  const [experiences, setExperiences] = useState(EXPERIENCES_TEMPLATE);
  const [contacts, setContacts] = useState(CONTACTS_TEMPLATE);
  const [readings, setReadings] = useState(READINGS_TEMPLATE);

  useEffect(() => {
    fetch("/api/admin/users").then((r) => r.json()).then(setUsers);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    let parsedTransfers, parsedExperiences, parsedContacts, parsedReadings;
    try {
      parsedTransfers = JSON.parse(transfers);
      parsedExperiences = JSON.parse(experiences);
      parsedContacts = JSON.parse(contacts);
      parsedReadings = JSON.parse(readings);
    } catch {
      setError("JSON formátum hibás — ellenőrizd a mezőket.");
      setLoading(false);
      return;
    }

    const tripData = {
      destination: form.get("destination"),
      dates: form.get("dates"),
      tripStartDate: form.get("tripStartDate"),
      package: form.get("package"),
      hotel: {
        name: form.get("hotelName"),
        checkIn: form.get("checkIn"),
        checkOut: form.get("checkOut"),
        roomType: form.get("roomType"),
        confirmationNumber: form.get("confirmationNumber"),
        address: form.get("address"),
      },
      transfers: parsedTransfers,
      experiences: parsedExperiences,
      contacts: parsedContacts,
      readings: parsedReadings,
      emergencyNote: form.get("emergencyNote"),
    };

    const res = await fetch("/api/admin/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: form.get("userId"),
        status: form.get("status"),
        data: tripData,
      }),
    });

    if (res.ok) {
      setSuccess(true);
    } else {
      const d = await res.json();
      setError(d.error ?? "Hiba történt.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div style={{ maxWidth: "560px" }}>
        <div style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "2px", padding: "2rem" }}>
          <p style={{ color: "#C9A96E", fontSize: "1rem", margin: "0 0 1rem", fontFamily: "var(--font-playfair), serif", fontStyle: "italic" }}>
            Utazás sikeresen létrehozva.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => { setSuccess(false); }} style={btnStyle(false)}>Új utazás</button>
            <button onClick={() => router.push("/admin")} style={btnStyle(true)}>← Vissza a listához</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "760px" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.6, marginBottom: "0.5rem" }}>Admin · Utazások</p>
        <h1 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#F5F0E8", margin: 0 }}>
          Új utazás hozzáadása
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* Client + meta */}
        <FormSection title="Kliens &amp; alap adatok">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label>Kliens</Label>
              <select name="userId" required style={inputStyle}>
                <option value="">— válassz —</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>
            <Field label="Úticél" name="destination" placeholder="pl. Amalfi-part, Olaszország" required />
            <Field label="Dátumok" name="dates" placeholder="pl. jún. 14–21, 2026" required />
            <Field label="Indulás dátuma (ÉÉÉÉ-HH-NN)" name="tripStartDate" placeholder="2026-06-14" required />
            <div>
              <Label>Csomag</Label>
              <select name="package" style={inputStyle}>
                <option>SIGNATURE</option>
                <option>PRIVÉ</option>
                <option>GRAND PRIVÉ</option>
              </select>
            </div>
            <div>
              <Label>Státusz</Label>
              <select name="status" style={inputStyle}>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </FormSection>

        {/* Hotel */}
        <FormSection title="Hotel">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Hotel neve" name="hotelName" placeholder="pl. Il San Pietro di Positano" required />
            </div>
            <Field label="Check-in" name="checkIn" placeholder="jún. 14, 2026 — 15:00" required />
            <Field label="Check-out" name="checkOut" placeholder="jún. 21, 2026 — 11:00" required />
            <Field label="Szoba típusa" name="roomType" placeholder="pl. Junior Suite Sea View" required />
            <Field label="Foglalási szám" name="confirmationNumber" placeholder="pl. ISP-2026-0614-NP" />
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Cím" name="address" placeholder="pl. Via Laurito 2, Positano, SA 84017" />
            </div>
          </div>
        </FormSection>

        {/* JSON sections */}
        <JsonSection title="Transzferek (JSON)" value={transfers} onChange={setTransfers} />
        <JsonSection title="Programok / napló (JSON)" value={experiences} onChange={setExperiences} />
        <JsonSection title="Vészhelyzeti kapcsolatok (JSON)" value={contacts} onChange={setContacts} />
        <JsonSection title="Olvasnivalók (JSON)" value={readings} onChange={setReadings} />

        {/* Emergency note */}
        <FormSection title="Vészhelyzeti megjegyzés">
          <div>
            <textarea
              name="emergencyNote"
              rows={2}
              defaultValue="Sürgős esetben írj WhatsApp-on — perceken belül válaszolunk."
              style={{ ...inputStyle, resize: "vertical", width: "100%", boxSizing: "border-box" }}
            />
          </div>
        </FormSection>

        {error && <p style={{ fontSize: "0.8rem", color: "rgba(220,80,80,0.8)", margin: 0 }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ ...btnStyle(true), alignSelf: "flex-start" }}>
          {loading ? "Mentés..." : "Utazás létrehozása →"}
        </button>
      </form>
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", padding: "1.75rem" }}>
      <p style={{ fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.6, margin: "0 0 1.25rem" }}
        dangerouslySetInnerHTML={{ __html: title }} />
      {children}
    </div>
  );
}

function JsonSection({ title, value, onChange }: { title: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ background: "#111", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", padding: "1.75rem" }}>
      <p style={{ fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.6, margin: "0 0 1rem" }}>{title}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        style={{ ...inputStyle, width: "100%", resize: "vertical", fontFamily: "monospace", fontSize: "0.78rem", boxSizing: "border-box" }}
      />
    </div>
  );
}

function Field({ label, name, placeholder, required, type = "text" }: { label: string; name: string; placeholder?: string; required?: boolean; type?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input name={name} type={type} placeholder={placeholder} required={required} style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", marginBottom: "0.4rem" }}>{children}</label>;
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(201,169,110,0.15)",
  color: "#F5F0E8",
  padding: "0.75rem 0.9rem",
  fontSize: "0.85rem",
  outline: "none",
  fontFamily: "var(--font-inter), Inter, sans-serif",
  borderRadius: "2px",
};

function btnStyle(primary: boolean): React.CSSProperties {
  return {
    padding: "0.85rem 1.75rem",
    background: "transparent",
    border: `1px solid ${primary ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.12)"}`,
    color: primary ? "#C9A96E" : "rgba(255,255,255,0.5)",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    borderRadius: "2px",
  };
}
