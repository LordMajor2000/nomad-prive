"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname as useI18nPathname, useRouter } from "@/i18n/navigation";
import { Compass, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN", hu: "HU", de: "DE", it: "IT", fr: "FR", es: "ES", sk: "SK",
};

/* ─── Hamburger button — reused in bar and island ─── */
function HamburgerBtn({
  menuOpen,
  onClick,
  btnRef,
  scrolled,
  compact = false,
}: {
  menuOpen: boolean;
  onClick: () => void;
  btnRef: React.RefObject<HTMLButtonElement | null>;
  scrolled: boolean;
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:     menuOpen || hovered
          ? "rgba(201,169,110,0.1)"
          : compact
            ? "transparent"
            : scrolled
              ? "transparent"
              : "rgba(6,6,6,0.5)",
        backdropFilter: compact || scrolled || menuOpen ? "none" : "blur(18px)",
        WebkitBackdropFilter: compact || scrolled || menuOpen ? "none" : "blur(18px)",
        border:         `1px solid ${
          menuOpen
            ? "rgba(201,169,110,0.3)"
            : compact || scrolled
              ? "rgba(201,169,110,0.18)"
              : "rgba(245,240,232,0.1)"
        }`,
        borderRadius:   compact ? "100px" : "2px",
        cursor:         "pointer",
        padding:        compact ? "0.4rem 0.65rem" : "0.7rem 0.85rem",
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "center",
        gap:            compact ? "4px" : "5px",
        transition:     "background 0.22s ease-out, border-color 0.22s ease-out",
        flexShrink:     0,
      }}
    >
      <span style={{
        display:    "block",
        width:      compact ? "16px" : "20px",
        height:     "1.5px",
        background: "#F5F0E8",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s",
        transform:  menuOpen ? `rotate(45deg) translate(${compact ? "3px, 3.5px" : "4.5px, 5px"})` : "none",
      }} />
      <span style={{
        display:    "block",
        width:      compact ? "10px" : "13px",
        height:     "1.5px",
        background: "#F5F0E8",
        opacity:    menuOpen ? 0 : 0.55,
        transition: "opacity 0.2s ease-out",
      }} />
      <span style={{
        display:    "block",
        width:      compact ? "16px" : "20px",
        height:     "1.5px",
        background: "#F5F0E8",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform:  menuOpen ? `rotate(-45deg) translate(${compact ? "3px, -3.5px" : "4.5px, -5px"})` : "none",
      }} />
    </button>
  );
}

/* ─── Single nav link row ─── */
function NavRow({
  label, href, index, active, onClick, large = false,
}: {
  label: string; href: string; index: number; active: boolean;
  onClick: () => void; large?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        "flex",
        alignItems:     "center",
        gap:            large ? "1.25rem" : "1rem",
        padding:        large ? "1.1rem 2.5rem" : "1.05rem 1.6rem",
        textDecoration: "none",
        position:       "relative",
        borderBottom:   "1px solid rgba(201,169,110,0.05)",
        overflow:       "hidden",
        transition:     "background 0.18s ease-out",
        background:     hovered ? "rgba(201,169,110,0.04)" : "transparent",
      }}
    >
      <motion.div
        animate={{ scaleY: hovered || active ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position:        "absolute",
          left: 0, top: 0, bottom: 0,
          width:           "2px",
          background:      "var(--gold-primary)",
          transformOrigin: "bottom",
        }}
      />
      <span style={{
        fontSize: "0.5rem", letterSpacing: "0.15em",
        color:    active ? "rgba(201,169,110,0.7)" : "rgba(201,169,110,0.22)",
        fontFamily: "var(--font-inter), Inter, sans-serif",
        minWidth: "18px", transition: "color 0.18s ease-out",
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <motion.span
        animate={{ x: hovered ? 3 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          fontFamily:    "var(--font-playfair), 'Playfair Display', serif",
          fontSize:      large ? "1.75rem" : "1.35rem",
          fontWeight:    600,
          color:         active ? "var(--gold-primary)" : hovered ? "var(--cream)" : "rgba(245,240,232,0.8)",
          letterSpacing: "0.01em",
          transition:    "color 0.18s ease-out",
          flex:          1,
        }}
      >
        {label}
      </motion.span>
      {active && (
        <span style={{
          width: "4px", height: "4px", borderRadius: "50%",
          background: "var(--gold-primary)", flexShrink: 0,
        }} />
      )}
    </Link>
  );
}

/* ─── Main Navigation ─── */
export default function Navigation() {
  const t        = useTranslations("nav");
  const tFooter  = useTranslations("footer");
  const locale   = useLocale();
  const router   = useRouter();
  const i18nPath = useI18nPathname();
  const isHome   = i18nPath === "/";

  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);
  const [logoHidden, setLogoHidden] = useState(false);

  const btnRef   = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t("packages"),    href: "/packages"    },
    { label: t("experiences"), href: "/experiences" },
    { label: t("journal"),     href: "/journal"     },
    { label: t("about"),       href: "/about"       },
    { label: t("contact"),     href: "/contact"     },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setIsMobile(window.innerWidth < 700);
    onScroll(); onResize();
    window.addEventListener("scroll",  onScroll, { passive: true });
    window.addEventListener("resize",  onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll",  onScroll);
      window.removeEventListener("resize",  onResize);
    };
  }, []);

  useEffect(() => { setMenuOpen(false); }, [i18nPath]);

  useEffect(() => {
    if (isMobile) document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, isMobile]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        btnRef.current   && !btnRef.current.contains(e.target as Node)
      ) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const isActive    = (href: string) => i18nPath === href || i18nPath.startsWith(href + "/");
  const handleLocale = (l: string) => { router.replace(i18nPath as "/", { locale: l }); setMenuOpen(false); };

  const mobileIsland = isMobile && scrolled;

  return (
    <>
      {/* ──────────────────────────────────────────────────── */}
      {/* DESKTOP nav — full-width fixed bar                  */}
      {/* ──────────────────────────────────────────────────── */}
      {!isMobile && (
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
            WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
            borderBottom:   scrolled ? "1px solid rgba(201,169,110,0.07)" : "1px solid transparent",
            transition:     "background 0.35s ease-out, backdrop-filter 0.35s ease-out, padding 0.28s ease-out",
          }}
        >
          <div style={{
            maxWidth: "1400px", margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            {!isHome && !logoHidden ? (
              <Link href="/" style={{ textDecoration: "none", position: "relative", zIndex: 110 }}>
                <Image
                  src="/logo.png" alt="Nomad Privé"
                  width={148} height={40} priority
                  onError={() => setLogoHidden(true)}
                  style={{ objectFit: "contain" }}
                />
              </Link>
            ) : <div />}

            <HamburgerBtn
              menuOpen={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              btnRef={btnRef}
              scrolled={scrolled}
            />
          </div>
        </motion.nav>
      )}

      {/* ──────────────────────────────────────────────────── */}
      {/* MOBILE nav — full bar → floating island             */}
      {/* ──────────────────────────────────────────────────── */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position:      "fixed",
            top: 0, left: 0, right: 0,
            zIndex:        100,
            pointerEvents: "none",
            /* Height: enough room for either the full bar or the island pill */
            height:        "72px",
          }}
        >
          <AnimatePresence>
            {/* ─ State A: Full-width transparent bar ─ */}
            {!scrolled && (
              <motion.div
                key="mobile-bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.16, ease: "easeIn" } }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                style={{
                  position:       "absolute",
                  top: 0, left: 0, right: 0,
                  padding:        "1rem 1.25rem",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "space-between",
                  pointerEvents:  "auto",
                }}
              >
                {!isHome && !logoHidden ? (
                  <Link href="/" style={{ textDecoration: "none" }}>
                    <Image
                      src="/logo.png" alt="Nomad Privé"
                      width={120} height={32} priority
                      onError={() => setLogoHidden(true)}
                      style={{ objectFit: "contain" }}
                    />
                  </Link>
                ) : <div />}
                <HamburgerBtn
                  menuOpen={menuOpen}
                  onClick={() => setMenuOpen((o) => !o)}
                  btnRef={btnRef}
                  scrolled={false}
                />
              </motion.div>
            )}

            {/* ─ State B: Floating island pill ─ */}
            {scrolled && (
              <motion.div
                key="mobile-island"
                initial={{ opacity: 0, scale: 0.82, y: -18, x: "-50%" }}
                animate={{ opacity: 1, scale: 1,    y:   0, x: "-50%" }}
                exit={{    opacity: 0, scale: 0.82, y: -18, x: "-50%",
                  transition: { duration: 0.16, ease: "easeIn" } }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                style={{
                  position:            "absolute",
                  top:                 "0.6rem",
                  left:                "50%",
                  display:             "flex",
                  alignItems:          "center",
                  gap:                 "0.55rem",
                  padding:             "0.38rem 0.5rem 0.38rem 0.88rem",
                  borderRadius:        "100px",
                  background:          menuOpen
                    ? "rgba(12,10,7,0.95)"
                    : "rgba(7,7,7,0.88)",
                  backdropFilter:      "blur(28px)",
                  WebkitBackdropFilter:"blur(28px)",
                  boxShadow:           menuOpen
                    ? "0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.28)"
                    : "0 4px 28px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(201,169,110,0.16)",
                  pointerEvents:       "auto",
                  transition:          "background 0.22s ease-out, box-shadow 0.22s ease-out",
                }}
              >
                {/* Wordmark */}
                <span style={{
                  fontSize:      "0.42rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color:         "rgba(201,169,110,0.55)",
                  fontFamily:    "var(--font-inter), Inter, sans-serif",
                  whiteSpace:    "nowrap",
                  userSelect:    "none",
                }}>
                  NOMAD PRIVÉ
                </span>

                {/* Separator */}
                <div style={{
                  width:      "1px",
                  height:     "14px",
                  background: "rgba(201,169,110,0.14)",
                  flexShrink: 0,
                }} />

                <HamburgerBtn
                  menuOpen={menuOpen}
                  onClick={() => setMenuOpen((o) => !o)}
                  btnRef={btnRef}
                  scrolled={true}
                  compact
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ──────────────────────────────────────────────────── */}
      {/* DESKTOP — half-screen side panel                    */}
      {/* ──────────────────────────────────────────────────── */}
      {!isMobile && (
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "fixed", inset: 0,
                  background: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  zIndex: 104,
                }}
              />
              <motion.div
                ref={panelRef}
                initial={{ x: "100%" }} animate={{ x: "0%" }} exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
                style={{
                  position:       "fixed",
                  top: 0, right: 0, bottom: 0,
                  width:          "min(560px, 46vw)",
                  background:     "rgba(7,7,7,0.97)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  borderRadius:   "52px 0 0 36px",
                  boxShadow:      "-2px 0 0 rgba(201,169,110,0.1), -32px 0 80px rgba(0,0,0,0.5)",
                  zIndex:         105,
                  display:        "flex",
                  flexDirection:  "column",
                  overflowY:      "auto",
                }}
              >
                <div style={{
                  height: "1.5px", marginLeft: "52px",
                  background: "linear-gradient(90deg, rgba(201,169,110,0.3), rgba(201,169,110,0.55) 50%, rgba(201,169,110,0.1))",
                  flexShrink: 0,
                }} />

                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "3rem 0" }}>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.06 + 0.12, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <NavRow label={link.label} href={link.href} index={i} active={isActive(link.href)} onClick={() => setMenuOpen(false)} large />
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.48, duration: 0.35 }}
                    style={{ padding: "1rem 2.5rem 0" }}
                  >
                    <Link href="/quiz" onClick={() => setMenuOpen(false)} style={{
                      display: "inline-flex", alignItems: "center", gap: "0.5rem",
                      fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                      fontSize: "0.9rem", fontStyle: "italic",
                      color: "rgba(201,169,110,0.65)", textDecoration: "none",
                      transition: "color 0.18s ease-out",
                    }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.65)"; }}
                    >
                      <Compass size={14} strokeWidth={1.5} />
                      {t("quiz")} →
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.52, duration: 0.35 }}
                  style={{ flexShrink: 0, borderTop: "1px solid rgba(201,169,110,0.07)", padding: "1.5rem 2.5rem 2rem" }}
                >
                  <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                    {routing.locales.map((l) => (
                      <button key={l} onClick={() => handleLocale(l)} style={{
                        background:   l === locale ? "rgba(201,169,110,0.14)" : "transparent",
                        border:       `1px solid ${l === locale ? "rgba(201,169,110,0.32)" : "rgba(255,255,255,0.08)"}`,
                        borderRadius: "2px", color: l === locale ? "#C9A96E" : "rgba(245,240,232,0.3)",
                        fontSize: "0.55rem", letterSpacing: "0.16em",
                        padding: "0.3rem 0.55rem", cursor: "pointer",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        transition: "all 0.15s ease-out",
                      }}
                        onMouseEnter={(e) => {
                          if (l !== locale) {
                            (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,232,0.6)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (l !== locale) {
                            (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,232,0.3)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                          }
                        }}
                      >
                        {localeLabels[l]}
                      </button>
                    ))}
                  </div>
                  <Link href="/client/login" onClick={() => setMenuOpen(false)} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                    padding: "0.85rem 1rem", border: "1px solid rgba(201,169,110,0.28)", borderRadius: "2px",
                    color: "rgba(201,169,110,0.75)", textDecoration: "none", fontSize: "0.62rem",
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    background: "rgba(201,169,110,0.04)",
                    transition: "background 0.2s ease-out, border-color 0.2s ease-out, color 0.2s ease-out",
                  }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = "rgba(201,169,110,0.1)";
                      el.style.borderColor = "rgba(201,169,110,0.5)";
                      el.style.color = "#C9A96E";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = "rgba(201,169,110,0.04)";
                      el.style.borderColor = "rgba(201,169,110,0.28)";
                      el.style.color = "rgba(201,169,110,0.75)";
                    }}
                  >
                    <Lock size={12} strokeWidth={1.5} />
                    {t("client")}
                  </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      {/* ──────────────────────────────────────────────────── */}
      {/* MOBILE — bottom sheet panel                         */}
      {/* ──────────────────────────────────────────────────── */}
      {isMobile && (
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "fixed", inset: 0,
                  background: "rgba(0,0,0,0.62)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  zIndex: 104,
                }}
              />
              <motion.div
                ref={panelRef}
                initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 340, damping: 34 }}
                style={{
                  position:       "fixed",
                  bottom: 0, left: 0, right: 0,
                  background:     "rgba(7,7,7,0.96)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  borderTop:      "1px solid rgba(201,169,110,0.18)",
                  borderRadius:   "14px 14px 0 0",
                  zIndex:         105,
                  overflow:       "hidden",
                  paddingBottom:  "env(safe-area-inset-bottom, 0px)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", padding: "0.75rem 0 0" }}>
                  <div style={{ width: "36px", height: "3px", borderRadius: "100px", background: "rgba(201,169,110,0.2)" }} />
                </div>
                <PanelContent
                  navLinks={navLinks} isActive={isActive} locale={locale}
                  handleLocale={handleLocale} closeMenu={() => setMenuOpen(false)}
                  t={t} tFooter={tFooter}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </>
  );
}

/* ─── Shared mobile panel content ─── */
function PanelContent({
  navLinks, isActive, locale, handleLocale, closeMenu, t, tFooter,
}: {
  navLinks: { label: string; href: string }[];
  isActive: (href: string) => boolean;
  locale: string;
  handleLocale: (l: string) => void;
  closeMenu: () => void;
  t: ReturnType<typeof useTranslations>;
  tFooter: ReturnType<typeof useTranslations>;
}) {
  return (
    <div>
      <div style={{
        height: "1.5px",
        background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.55) 40%, rgba(201,169,110,0.55) 60%, transparent)",
      }} />
      <div>
        {navLinks.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 + 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <NavRow label={link.label} href={link.href} index={i} active={isActive(link.href)} onClick={closeMenu} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.38, duration: 0.3 }}
        style={{ padding: "0.6rem 1.6rem 0" }}
      >
        <Link href="/quiz" onClick={closeMenu} style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          fontSize: "0.85rem", fontStyle: "italic", fontWeight: 500,
          color: "rgba(201,169,110,0.65)", textDecoration: "none",
          padding: "0.45rem 0", transition: "color 0.18s ease-out",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.65)"; }}
        >
          <Compass size={13} strokeWidth={1.5} />
          {t("quiz")} →
        </Link>
      </motion.div>

      <div style={{ margin: "0.8rem 1.6rem 0", height: "1px", background: "rgba(201,169,110,0.07)" }} />

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.42, duration: 0.3 }}
        style={{ padding: "0.7rem 1.6rem 0", display: "flex", gap: "0.25rem", flexWrap: "wrap" }}
      >
        {routing.locales.map((l) => (
          <button key={l} onClick={() => handleLocale(l)} style={{
            background:   l === locale ? "rgba(201,169,110,0.14)" : "transparent",
            border:       `1px solid ${l === locale ? "rgba(201,169,110,0.32)" : "rgba(255,255,255,0.07)"}`,
            borderRadius: "2px", color: l === locale ? "#C9A96E" : "rgba(245,240,232,0.28)",
            fontSize: "0.52rem", letterSpacing: "0.16em",
            padding: "0.28rem 0.5rem", cursor: "pointer",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            transition: "all 0.15s ease-out",
          }}
            onMouseEnter={(e) => {
              if (l !== locale) {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,232,0.6)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.14)";
              }
            }}
            onMouseLeave={(e) => {
              if (l !== locale) {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,232,0.28)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
              }
            }}
          >
            {localeLabels[l]}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48, duration: 0.3 }}
        style={{ padding: "0.75rem 1.6rem 1.4rem" }}
      >
        <Link href="/client/login" onClick={closeMenu} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.55rem",
          width: "100%", padding: "0.75rem 1rem",
          border: "1px solid rgba(201,169,110,0.28)", borderRadius: "2px",
          color: "rgba(201,169,110,0.75)", textDecoration: "none", fontSize: "0.62rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          background: "rgba(201,169,110,0.04)",
          transition: "background 0.2s ease-out, border-color 0.2s ease-out, color 0.2s ease-out",
        }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "rgba(201,169,110,0.1)";
            el.style.borderColor = "rgba(201,169,110,0.5)";
            el.style.color = "#C9A96E";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "rgba(201,169,110,0.04)";
            el.style.borderColor = "rgba(201,169,110,0.28)";
            el.style.color = "rgba(201,169,110,0.75)";
          }}
        >
          <Lock size={11} strokeWidth={1.5} />
          {t("client")}
        </Link>
      </motion.div>
    </div>
  );
}
