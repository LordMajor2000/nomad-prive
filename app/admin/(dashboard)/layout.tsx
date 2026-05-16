import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createHmac } from "node:crypto"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  const expected = createHmac("sha256", process.env.AUTH_SECRET!)
    .update("nomad-admin-session")
    .digest("hex")

  if (!session || session.value !== expected) {
    redirect("/admin/login")
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      fontFamily: "var(--font-inter), Inter, sans-serif",
      color: "#F5F0E8",
    }}>
      {/* Admin nav */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid rgba(201,169,110,0.1)",
        background: "rgba(8,8,8,0.95)",
        backdropFilter: "blur(8px)",
        padding: "0 clamp(1.5rem, 4vw, 3rem)",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", opacity: 0.8 }}>
              Nomad Privé · Admin
            </span>
            <nav style={{ display: "flex", gap: "1.5rem" }}>
              {[
                { label: "Kliensek", href: "/admin" },
                { label: "Új kliens", href: "/admin/clients/new" },
                { label: "Új utazás", href: "/admin/trips/new" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <a
            href="/"
            style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "0.05em" }}
          >
            ← Főoldal
          </a>
        </div>
      </div>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem clamp(1.5rem, 4vw, 3rem) 6rem" }}>
        {children}
      </main>
    </div>
  )
}
