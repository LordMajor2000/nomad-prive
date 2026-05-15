"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Compass, Lock } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navLinks = [
  { label: "Packages", href: "/packages" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoExists, setLogoExists] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if logo.png exists
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLogoExists(true);
    img.onerror = () => setLogoExists(false);
    img.src = "/logo.png";
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1.5rem 2rem",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease",
          background: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,169,110,0.1)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            {logoExists ? (
              <Image
                src="/logo.png"
                alt="Nomad Privé"
                width={200}
                height={52}
                priority
                style={{ objectFit: "contain" }}
              />
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  color: "var(--gold-primary)",
                  textTransform: "uppercase",
                }}
              >
                Nomad Privé
              </span>
            )}
          </Link>

          {/* Language switcher + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LanguageSwitcher />

          {/* Hamburger icon — always visible */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              zIndex: 110,
              position: "relative",
            }}
            aria-label="Menu"
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1px",
                background: "var(--gold-primary)",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1px",
                background: "var(--gold-primary)",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1px",
                background: "var(--gold-primary)",
                transition: "transform 0.3s ease",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen overlay — slides in from RIGHT */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: "420px",
              background: "rgba(8,8,8,0.98)",
              backdropFilter: "blur(20px)",
              zIndex: 105,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "4rem 3rem",
              borderLeft: "1px solid rgba(201,169,110,0.1)",
            }}
          >
            {/* Decorative line */}
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "var(--gold-primary)",
                marginBottom: "3rem",
              }}
            />

            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "2rem" }}>
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        color: active ? "var(--gold-primary)" : "var(--cream)",
                        textDecoration: "none",
                        letterSpacing: "0.05em",
                        display: "block",
                        transition: "color 0.3s ease",
                        borderBottom: active ? "1px solid rgba(201,169,110,0.4)" : "none",
                        paddingBottom: active ? "4px" : "0",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}

              {/* Quiz link */}
              <motion.li
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.1, duration: 0.4 }}
              >
                <Link
                  href="/quiz"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: isActive("/quiz") ? "var(--gold-primary)" : "rgba(201,169,110,0.85)",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                    transition: "color 0.3s ease",
                  }}
                >
                  <Compass size={20} />
                  Find My Destination
                </Link>
              </motion.li>
            </ul>

            {/* Client login — subtle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.4 }}
              style={{ marginTop: "2rem" }}
            >
              <Link
                href="/client/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)";
                }}
              >
                <Lock size={13} />
                Client Login
              </Link>
            </motion.div>

            <div
              style={{
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(201,169,110,0.1)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                Every journey is a masterpiece.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 104,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
