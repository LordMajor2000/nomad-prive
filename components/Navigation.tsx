"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePathname as useI18nPathname } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { Compass, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN", hu: "HU", de: "DE", it: "IT", fr: "FR", es: "ES", sk: "SK",
};

/* Magnetic hamburger line component */
function HamburgerLines({ open }: { open: boolean }) {
  return (
    <span style={{ display: "flex", flexDirection: "column", gap: "5px", pointerEvents: "none" }}>
      <span style={{
        display: "block", width: "20px", height: "1.5px",
        background: "#F5F0E8",
        transition: "transform 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.22s ease-out",
        transform: open ? "rotate(45deg) translate(4.5px, 5px)" : "none",
        transformOrigin: "center",
      }} />
      <span style={{
        display: "block", width: "13px", height: "1.5px",
        background: "#F5F0E8",
        opacity: open ? 0 : 0.55,
        transition: "opacity 0.22s ease-out",
      }} />
      <span style={{
        display: "block", width: "20px", height: "1.5px",
        background: "#F5F0E8",
        transition: "transform 0.38s cubic-bezier(0.16,1,0.3,1)",
        transform: open ? "rotate(-45deg) translate(4.5px, -5px)" : "none",
        transformOrigin: "center",
      }} />
    </span>
  );
}

export default function Navigation() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const currentLocale = useLocale();
  const router = useRouter();

  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]      = useState(false);
  const [hoveredIdx, setHoveredIdx]  = useState<number | null>(null);
  const [logoHidden, setLogoHidden]  = useState(false);

  /* i18n-stripped pathname — "/" on home, "/packages" on packages, etc. */
  const i18nPath = useI18nPathname();
  const isHome   = i18nPath === "/";

  /* full pathname for isActive */
  const fullPath = usePathname();

  const navLinks = [
    { label: t("packages"),    href: "/packages"    },
    { label: t("experiences"), href: "/experiences" },
    { label: t("journal"),     href: "/journal"     },
    { label: t("about"),       href: "/about"       },
    { label: t("contact"),     href: "/contact"     },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [i18nPath]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    i18nPath === href || i18nPath.startsWith(href + "/");

  const handleLocale = (locale: string) => {
    router.replace(i18nPath as "/", { locale });
  };

  return (
    <>
      {/* ── Fixed top bar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position:       "fixed",
          top: 0, left: 0, right: 0,
          zIndex:         100,
          padding:        scrolled ? "0.8rem 2rem" : "1.25rem 2rem",
          background:     scrolled ? "rgba(8,8,8,0.93)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom:   scrolled ? "1px solid rgba(201,169,110,0.07)" : "1px solid transparent",
          transition:     "background 0.35s ease-out, backdrop-filter 0.35s ease-out, padding 0.28s ease-out",
        }}
      >
        <div style={{
          maxWidth:       "1400px",
          margin:         "0 auto",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}>
          {/* Logo — only on non-home pages */}
          {!isHome && !logoHidden ? (
            <Link href="/" style={{ textDecoration: "none", zIndex: 110, position: "relative" }}>
              <Image
                src="/logo.png"
                alt="Nomad Privé"
                width={148}
                height={40}
                priority
                onError={() => setLogoHidden(true)}
                style={{ objectFit: "contain", opacity: scrolled ? 1 : 0.92 }}
              />
            </Link>
          ) : (
            /* Spacer so hamburger stays right-aligned even on home */
            <div />
          )}

          {/* Hamburger — minimal, no overflow wrapper */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background:     scrolled
                ? "transparent"
                : menuOpen
                  ? "transparent"
                  : "rgba(6,6,6,0.48)",
              backdropFilter: scrolled ? "none" : menuOpen ? "none" : "blur(18px)",
              border:         scrolled
                ? "1px solid rgba(201,169,110,0.18)"
                : "1px solid rgba(245,240,232,0.1)",
              borderRadius:   "2px",
              cursor:         "pointer",
              padding:        "0.7rem 0.85rem",
              display:        "flex",
              flexDirection:  "column",
              justifyContent: "center",
              zIndex:         110,
              position:       "relative",
              transition:     "background 0.25s ease-out, border-color 0.35s ease-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                scrolled ? "transparent" : menuOpen ? "transparent" : "rgba(6,6,6,0.48)";
            }}
          >
            <HamburgerLines open={menuOpen} />
          </button>
        </div>
      </motion.nav>

      {/* ── Full-screen overlay menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Curtain panel — clips from top, reveals downward */}
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{   clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{
                position:  "fixed",
                inset:     0,
                zIndex:    105,
                background: "#070707",
                display:   "flex",
                flexDirection: "column",
                overflow:  "hidden",
              }}
            >
              {/* Subtle center radial glow */}
              <div style={{
                position:      "absolute",
                top: "30%", left: "50%",
                transform:     "translate(-50%, -50%)",
                width:         "70vmax",
                height:        "70vmax",
                borderRadius:  "50%",
                background:    "radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 65%)",
                pointerEvents: "none",
              }} />

              {/* Large decorative background letter */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={hoveredIdx ?? -1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.03 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position:    "absolute",
                    right:       "-0.05em",
                    top:         "50%",
                    transform:   "translateY(-50%)",
                    fontFamily:  "var(--font-playfair), 'Playfair Display', serif",
                    fontSize:    "clamp(14rem, 30vw, 30rem)",
                    fontWeight:  700,
                    fontStyle:   "italic",
                    lineHeight:  1,
                    color:       "#C9A96E",
                    userSelect:  "none",
                    pointerEvents: "none",
                    letterSpacing: "-0.05em",
                  }}
                >
                  {hoveredIdx !== null
                    ? String(hoveredIdx + 1).padStart(2, "0")
                    : "N"}
                </motion.span>
              </AnimatePresence>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  position:       "absolute",
                  top:            "1.5rem",
                  right:          "2rem",
                  background:     "transparent",
                  border:         "1px solid rgba(201,169,110,0.15)",
                  borderRadius:   "2px",
                  cursor:         "pointer",
                  padding:        "0.5rem 0.9rem",
                  color:          "rgba(245,240,232,0.45)",
                  fontSize:       "0.58rem",
                  letterSpacing:  "0.2em",
                  textTransform:  "uppercase",
                  fontFamily:     "var(--font-inter), Inter, sans-serif",
                  transition:     "color 0.2s ease-out, border-color 0.2s ease-out",
                  zIndex:         2,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--gold-primary)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,232,0.45)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.15)";
                }}
              >
                ESC
              </motion.button>

              {/* ── Nav links — main content ── */}
              <div style={{
                flex:           1,
                display:        "flex",
                flexDirection:  "column",
                justifyContent: "center",
                padding:        "clamp(5rem, 10vw, 8rem) clamp(2rem, 8vw, 7rem)",
                position:       "relative",
                zIndex:         2,
              }}>
                <nav>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {navLinks.map((link, i) => {
                      const active = isActive(link.href);
                      return (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, x: -32 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{
                            delay:    i * 0.07 + 0.22,
                            duration: 0.5,
                            ease:     [0.16, 1, 0.3, 1],
                          }}
                          onMouseEnter={() => setHoveredIdx(i)}
                          onMouseLeave={() => setHoveredIdx(null)}
                          style={{
                            borderTop: i === 0
                              ? "1px solid rgba(201,169,110,0.08)"
                              : "none",
                            borderBottom: "1px solid rgba(201,169,110,0.08)",
                          }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                              display:    "flex",
                              alignItems: "center",
                              gap:        "clamp(1rem, 3vw, 2.5rem)",
                              padding:    "clamp(0.7rem, 1.5vw, 1.1rem) 0",
                              textDecoration: "none",
                              position:   "relative",
                            }}
                          >
                            {/* Index */}
                            <span style={{
                              fontSize:      "0.52rem",
                              letterSpacing: "0.18em",
                              color:         active
                                ? "rgba(201,169,110,0.7)"
                                : "rgba(201,169,110,0.25)",
                              fontFamily:    "var(--font-inter), Inter, sans-serif",
                              minWidth:      "22px",
                              transition:    "color 0.2s ease-out",
                            }}>
                              {String(i + 1).padStart(2, "0")}
                            </span>

                            {/* Accent line */}
                            <motion.div
                              animate={{ width: hoveredIdx === i || active ? "24px" : "8px" }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              style={{
                                height:     "1px",
                                background: active ? "#C9A96E" : "rgba(201,169,110,0.4)",
                                flexShrink: 0,
                              }}
                            />

                            {/* Link text */}
                            <motion.span
                              animate={{
                                color: active
                                  ? "#C9A96E"
                                  : hoveredIdx === i
                                    ? "rgba(245,240,232,0.65)"
                                    : "#F5F0E8",
                                x: hoveredIdx === i ? 4 : 0,
                              }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              style={{
                                fontFamily:    "var(--font-playfair), 'Playfair Display', serif",
                                fontSize:      "clamp(1.8rem, 3.5vw, 3rem)",
                                fontWeight:    700,
                                letterSpacing: "-0.01em",
                                lineHeight:    1,
                              }}
                            >
                              {link.label}
                            </motion.span>

                            {/* Active dot */}
                            {active && (
                              <motion.span
                                layoutId="activeDot"
                                style={{
                                  marginLeft:   "auto",
                                  width:        "6px",
                                  height:       "6px",
                                  borderRadius: "50%",
                                  background:   "#C9A96E",
                                  flexShrink:   0,
                                }}
                              />
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Quiz CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: navLinks.length * 0.07 + 0.3, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  <Link
                    href="/quiz"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display:        "inline-flex",
                      alignItems:     "center",
                      gap:            "0.75rem",
                      fontFamily:     "var(--font-playfair), 'Playfair Display', serif",
                      fontSize:       "clamp(0.9rem, 1.6vw, 1.1rem)",
                      fontWeight:     500,
                      fontStyle:      "italic",
                      color:          "rgba(201,169,110,0.7)",
                      textDecoration: "none",
                      transition:     "color 0.2s ease-out",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.7)";
                    }}
                  >
                    <Compass size={15} strokeWidth={1.5} />
                    {t("quiz")}
                    <span style={{ fontSize: "0.9em", opacity: 0.6 }}>→</span>
                  </Link>
                </motion.div>
              </div>

              {/* ── Footer strip ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{
                  padding:       "1.5rem clamp(2rem, 8vw, 7rem)",
                  borderTop:     "1px solid rgba(201,169,110,0.07)",
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent: "space-between",
                  flexWrap:      "wrap",
                  gap:           "1rem",
                  position:      "relative",
                  zIndex:        2,
                }}
              >
                {/* Inline language buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
                  {routing.locales.map((locale) => (
                    <button
                      key={locale}
                      onClick={() => handleLocale(locale)}
                      style={{
                        background:    locale === currentLocale
                          ? "rgba(201,169,110,0.12)"
                          : "transparent",
                        border:        locale === currentLocale
                          ? "1px solid rgba(201,169,110,0.3)"
                          : "1px solid rgba(255,255,255,0.07)",
                        borderRadius:  "2px",
                        color:         locale === currentLocale
                          ? "#C9A96E"
                          : "rgba(245,240,232,0.3)",
                        fontSize:      "0.58rem",
                        letterSpacing: "0.18em",
                        padding:       "0.35rem 0.6rem",
                        cursor:        "pointer",
                        fontFamily:    "var(--font-inter), Inter, sans-serif",
                        transition:    "all 0.18s ease-out",
                      }}
                      onMouseEnter={(e) => {
                        if (locale !== currentLocale) {
                          (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,232,0.65)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (locale !== currentLocale) {
                          (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,232,0.3)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
                        }
                      }}
                    >
                      {localeLabels[locale]}
                    </button>
                  ))}
                </div>

                {/* Right side: tagline + lock */}
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <p style={{
                    fontFamily:  "var(--font-playfair), 'Playfair Display', serif",
                    fontSize:    "0.75rem",
                    fontStyle:   "italic",
                    color:       "rgba(255,255,255,0.15)",
                    margin:      0,
                  }}>
                    {tFooter("tagline")}
                  </p>
                  <Link
                    href="/client/login"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display:        "flex",
                      alignItems:     "center",
                      gap:            "0.4rem",
                      fontSize:       "0.58rem",
                      letterSpacing:  "0.15em",
                      textTransform:  "uppercase",
                      color:          "rgba(255,255,255,0.18)",
                      textDecoration: "none",
                      transition:     "color 0.2s ease-out",
                      whiteSpace:     "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.18)";
                    }}
                  >
                    <Lock size={10} strokeWidth={1.5} />
                    {t("client")}
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Dim backdrop (for when menu is narrower, e.g. on large screens with side panel) */}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
