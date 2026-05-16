"use client";

interface Contact {
  role: string;
  name: string;
  phone: string;
  available: string;
}

export default function EmergencyCard({
  contacts,
  destination,
  hotel,
  dates,
}: {
  contacts: Contact[];
  destination: string;
  hotel: string;
  dates: string;
}) {
  const print = () => window.print();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
        <button
          onClick={print}
          style={{
            padding: "0.55rem 1.25rem",
            background: "transparent",
            border: "1px solid rgba(201,169,110,0.25)",
            color: "rgba(201,169,110,0.6)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            borderRadius: "2px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.5)";
            (e.currentTarget as HTMLButtonElement).style.color = "#C9A96E";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.25)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(201,169,110,0.6)";
          }}
        >
          ⎙ Nyomtatás / PDF
        </button>
      </div>

      {/* Print-only card */}
      <style>{`
        @media print {
          body > *:not(#emergency-print-card) { display: none !important; }
          #emergency-print-card {
            display: block !important;
            position: fixed;
            inset: 0;
            padding: 40px;
            background: white;
            color: black;
            font-family: Georgia, serif;
            z-index: 9999;
          }
        }
        @media screen {
          #emergency-print-card { display: none; }
        }
      `}</style>

      <div id="emergency-print-card">
        <div style={{ borderBottom: "2px solid #C9A96E", paddingBottom: "16px", marginBottom: "24px" }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "6px" }}>
            Nomad Privé · Vészhelyzeti Kártya
          </div>
          <div style={{ fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>{destination}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{hotel} · {dates}</div>
        </div>

        {contacts.map((c, i) => (
          <div key={i} style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #eee" }}>
            <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "4px" }}>
              {c.role}
            </div>
            <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>{c.name}</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#C9A96E", marginBottom: "2px" }}>{c.phone}</div>
            <div style={{ fontSize: "11px", color: "#888" }}>{c.available}</div>
          </div>
        ))}

        <div style={{ marginTop: "24px", padding: "12px", background: "#f9f7f3", border: "1px solid #e8d5b0" }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "4px" }}>
            Helyi segélyhívók
          </div>
          <div style={{ fontSize: "13px" }}>Olaszország segélyhívó: <strong>112</strong></div>
          <div style={{ fontSize: "13px" }}>Rendőrség: <strong>113</strong> · Tűzoltóság: <strong>115</strong></div>
        </div>
      </div>
    </>
  );
}
