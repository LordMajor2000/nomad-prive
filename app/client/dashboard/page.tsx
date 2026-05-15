import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { demoTrip } from "@/data/demo-trip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/client/login");
  }

  const trip = demoTrip;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#F5F0E8",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
    >
      <Navigation />

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "8rem 1.5rem 6rem",
        }}
      >
        {/* Page header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#C9A96E",
                marginBottom: "0.75rem",
                opacity: 0.7,
              }}
            >
              Client Portal
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                color: "#F5F0E8",
                margin: "0 0 0.75rem",
                lineHeight: 1.15,
              }}
            >
              Welcome back, {trip.clientName}.
            </h1>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.5)",
                margin: "0 0 1rem",
              }}
            >
              {trip.destination} · {trip.dates}
            </p>
            <span
              style={{
                display: "inline-block",
                padding: "0.3rem 0.9rem",
                background: "rgba(201,169,110,0.1)",
                border: "1px solid rgba(201,169,110,0.35)",
                color: "#C9A96E",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                borderRadius: "1px",
              }}
            >
              {trip.status}
            </span>
          </div>

          {/* Sign out */}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/client/login" });
            }}
          >
            <button
              type="submit"
              style={{
                padding: "0.65rem 1.5rem",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                borderRadius: "2px",
                transition: "all 0.2s ease",
              }}
            >
              Sign Out
            </button>
          </form>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* SECTION 1 — Hotel */}
          <div
            style={{
              background: "#111",
              border: "1px solid rgba(201,169,110,0.1)",
              borderRadius: "2px",
              padding: "2.5rem",
            }}
          >
            <SectionLabel>Your Hotel</SectionLabel>
            <h2
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 700,
                color: "#F5F0E8",
                margin: "0 0 1.5rem",
              }}
            >
              {trip.hotel.name}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1.25rem",
              }}
            >
              <HotelDetail label="Check-in" value={trip.hotel.checkIn} />
              <HotelDetail label="Check-out" value={trip.hotel.checkOut} />
              <HotelDetail label="Room Type" value={trip.hotel.roomType} />
              <HotelDetail label="Confirmation" value={trip.hotel.confirmationNumber} />
              <HotelDetail label="Address" value={trip.hotel.address} />
            </div>
          </div>

          {/* SECTION 2 — Transfers */}
          <div
            style={{
              background: "#111",
              border: "1px solid rgba(201,169,110,0.1)",
              borderRadius: "2px",
              padding: "2.5rem",
            }}
          >
            <SectionLabel>Transfers &amp; Transport</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {trip.transfers.map((transfer, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    position: "relative",
                  }}
                >
                  {/* Timeline column */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexShrink: 0,
                      width: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#C9A96E",
                        marginTop: "4px",
                        flexShrink: 0,
                        zIndex: 1,
                      }}
                    />
                    {idx < trip.transfers.length - 1 && (
                      <div
                        style={{
                          width: "1px",
                          flex: 1,
                          background: "rgba(201,169,110,0.2)",
                          minHeight: "40px",
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, paddingBottom: idx < trip.transfers.length - 1 ? "1.75rem" : 0 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "0.4rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#C9A96E",
                          fontVariant: "small-caps",
                        }}
                      >
                        {transfer.date}
                      </span>
                      <span
                        style={{
                          fontSize: "0.6rem",
                          color: "rgba(255,255,255,0.4)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {transfer.time}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#F5F0E8",
                        margin: "0 0 0.25rem",
                        fontWeight: 500,
                      }}
                    >
                      {transfer.type}: {transfer.from} → {transfer.to}
                    </p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.45)",
                        margin: 0,
                      }}
                    >
                      {transfer.vehicle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3 — Itinerary */}
          <div
            style={{
              background: "#111",
              border: "1px solid rgba(201,169,110,0.1)",
              borderRadius: "2px",
              padding: "2.5rem",
            }}
          >
            <SectionLabel>Your Itinerary</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {trip.experiences.map((exp, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px 1fr",
                    gap: "1.5rem",
                    padding: "1.25rem 0",
                    borderBottom: idx < trip.experiences.length - 1 ? "1px solid rgba(201,169,110,0.06)" : "none",
                  }}
                  className="itinerary-row"
                >
                  <span
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#C9A96E",
                      fontVariant: "small-caps",
                      paddingTop: "2px",
                      lineHeight: 1.5,
                    }}
                  >
                    {exp.date}
                  </span>
                  <div>
                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "#F5F0E8",
                        margin: "0 0 0.3rem",
                        fontWeight: 500,
                      }}
                    >
                      {exp.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "rgba(255,255,255,0.45)",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {exp.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4 — Emergency Contacts */}
          <div
            style={{
              background: "#111",
              border: "1px solid rgba(201,169,110,0.1)",
              borderRadius: "2px",
              padding: "2.5rem",
            }}
          >
            <SectionLabel>Emergency Contacts</SectionLabel>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              {trip.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(201,169,110,0.08)",
                    borderRadius: "2px",
                    padding: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(201,169,110,0.6)",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    {contact.role}
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#F5F0E8",
                      margin: "0 0 0.4rem",
                      fontWeight: 500,
                      fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    }}
                  >
                    {contact.name}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#C9A96E",
                      margin: "0 0 0.3rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {contact.phone}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.35)",
                      margin: 0,
                    }}
                  >
                    {contact.available}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "1.25rem",
                background: "rgba(201,169,110,0.05)",
                border: "1px solid rgba(201,169,110,0.12)",
                borderRadius: "2px",
              }}
            >
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                  lineHeight: 1.7,
                  fontStyle: "italic",
                }}
              >
                {trip.emergencyNote}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 600px) {
          .itinerary-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
        }
      `}</style>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "1px",
            background: "#C9A96E",
          }}
        />
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C9A96E",
            opacity: 0.7,
          }}
        >
          {children}
        </span>
      </div>
    </div>
  );
}

function HotelDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        style={{
          fontSize: "0.58rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.5)",
          margin: "0 0 0.3rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "0.88rem",
          color: "#F5F0E8",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {value}
      </p>
    </div>
  );
}
