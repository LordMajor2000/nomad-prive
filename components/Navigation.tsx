"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

/* ─── Single nav link row ─── */
function NavRow({
  label,
  href,
  index,
  active,
  onClick,
}: {
  label: string;
  href: string;
  index: number;
  active: boolean;
  onClick: () => void;
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
        gap:            "0.85rem",
        padding:        "0.9rem 1.5rem",
        textDecoration: "none",
        position:       "relative",
        borderBottom:   "1px solid rgba(201,169,110,0.05)",
        overflow:       "hidden",
        transition:     "background 0.18s ease-out",
        background:     hovered ? "rgba(201,169,110,0.04)" : "transparent",
      }}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ scaleY: hovered || active ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position:        "absolute",
          left:            0,
          top:             0,
          bottom:          0,
          width:           "2px",
          background:      "var(--gold-primary)",
          transformOrigin: "bottom",
        }}
      />

      {/* Index */}
      <span style={{
        fontSize:      "0.5rem",
        letterSpacing: "0.15em",
        color:         active ? "rgba(201,169,110,0.7)" : "rgba(201,169,110,0.22)",
        fontFamily:    "var(--font-inter), Inter, sans-serif",
        minWidth:      "18px",
        transition:    "color 0.18s ease-out",
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Label */}
      <motion.span
        animate={{ x: hovered ? 3 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          fontFamily:    "var(--font-playfair), 'Playfair Display', serif",
          fontSize:      "1.1rem",
          fontWeight:    600,
          color:         active ? "var(--gold-primary)" : hovered ? "var(--cream)" : "rgba(245,240,232,0.8)",
          letterSpacing: "0.01em",
          transition:    "color 0.18s ease-out",
          flex:          1,
        }}
      >
        {label}
      </motion.span>

      {/* Active dot */}
      {active && (
        <span style={{
          width:        "4px",
          height:       "4px",
          borderRadius: "50%",
          background:   "var(--gold-primary)",
          flexShrink:   0,
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

  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const [logoHidden,  setLogoHidden]  = useState(false);

  const btnRef     = useRef<HTMLButtonElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t("packages"),    href: "/packages"    },
    { label: t("experiences"), href: "/experiences" },
    { label: t("journal"),     href: "/journal"     },
    { label: t("about"),       href: "/about"       },
    { label: t("contact"),     href: "/contact"     },
  ];

  /* scroll + resize */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setIsMobile(window.innerWidth < 700);
    onScroll(); onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* close on route change */
  useEffect(() => { setMenuOpen(false); }, [i18nPath]);

  /* lock body scroll on mobile when open */
  useEffect(() => {
    if (isMobile) document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, isMobile]);

  /* click-outside to close */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        btnRef.current   && !btnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  /* keyboard ESC */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const isActive = (href: string) =>
    i18nPath === href || i18nPath.startsWith(href + "/");

  const handleLocale = (l: string) => {
    router.replace(i18nPath as "/", { locale: l });
    setMenuOpen(false);
  };

  /* Animation variants */
  const desktopVariants = {
    hidden:  { opacity: 0, scale: 0.88, y: -8 },
    visible: { opacity: 1, scale: 1,    y:  0 },
  };
  const mobileVariants = {
    hidden:  { y: "100%" },
    visible: { y: "0%"   },
  };

  return (
    <>
      {/* ─── Fixed top bar ─── */}
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
          {/* Logo — only non-home */}
          {!isHome && !logoHidden ? (
            <Link href="/" style={{ textDecoration: "none", position: "relative", zIndex: 110 }}>
              <Image
                src="/logo.png"
                alt="Nomad Privé"
                width={148}
                height={40}
                priority
                onError={() => setLogoHidden(true)}
                style={{ objectFit: "contain" }}
              />
            </Link>
          ) : (
            <div />
          )}

          {/* Hamburger — relative wrapper for dropdown anchor */}
          <div style={{ position: "relative" }}>
            <button
              ref={btnRef}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                background:     menuOpen
                  ? "rgba(201,169,110,0.1)"
                  : scrolled
                    ? "transparent"
                    : "rgba(6,6,6,0.5)",
                backdropFilter: scrolled || menuOpen ? "none" : "blur(18px)",
                border:         menuOpen
                  ? "1px solid rgba(201,169,110,0.3)"
                  : scrolled
                    ? "1px solid rgba(201,169,110,0.18)"
                    : "1px solid rgba(245,240,232,0.1)",
                borderRadius:   "2px",
                cursor:         "pointer",
                padding:        "0.7rem 0.85rem",
                display:        "flex",
                flexDirection:  "column",
                justifyContent: "center",
                gap:            "5px",
                zIndex:         110,
                position:       "relative",
                transition:     "background 0.22s ease-out, border-color 0.22s ease-out",
              }}
              onMouseEnter={(e) => {
                if (!menuOpen) (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.09)";
              }}
              onMouseLeave={(e) => {
                if (!menuOpen) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    scrolled ? "transparent" : "rgba(6,6,6,0.5)";
                }
              }}
            >
              {/* Lines */}
              <span style={{
                display: "block", width: "20px", height: "1.5px", background: "#F5F0E8",
                transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s",
                transform: menuOpen ? "rotate(45deg) translate(4.5px, 5px)" : "none",
              }} />
              <span style={{
                display: "block", width: "13px", height: "1.5px", background: "#F5F0E8",
                opacity: menuOpen ? 0 : 0.55,
                transition: "opacity 0.2s ease-out",
              }} />
              <span style={{
                display: "block", width: "20px", height: "1.5px", background: "#F5F0E8",
                transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                transform: menuOpen ? "rotate(-45deg) translate(4.5px, -5px)" : "none",
              }} />
            </button>

            {/* ─── Dropdown panel (desktop) ─── */}
            {!isMobile && (
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    ref={panelRef}
                    variants={desktopVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    style={{
                      position:       "absolute",
                      top:            "calc(100% + 10px)",
                      right:          0,
                      minWidth:       "320px",
                      background:     "rgba(7,7,7,0.92)",
                      backdropFilter: "blur(28px)",
                      border:         "1px solid rgba(201,169,110,0.18)",
                      borderRadius:   "4px",
                      overflow:       "hidden",
                      zIndex:         200,
                      transformOrigin: "top right",
                      boxShadow:      "0 24px 60px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(201,169,110,0.06)",
                    }}
                  >
                    <PanelContent
                      navLinks={navLinks}
                      isActive={isActive}
                      locale={locale}
                      handleLocale={handleLocale}
                      closeMenu={() => setMenuOpen(false)}
                      t={t}
                      tFooter={tFooter}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </motion.nav>

      {/* ─── Mobile bottom panel ─── */}
      {isMobile && (
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Scrim — blur + darken the page behind the panel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  position:       "fixed",
                  inset:          0,
                  background:     "rgba(0,0,0,0.62)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  zIndex:         104,
                }}
              />

              {/* Panel */}
              <motion.div
                ref={panelRef}
                variants={mobileVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ type: "spring", stiffness: 340, damping: 34 }}
                style={{
                  position:       "fixed",
                  bottom:         0,
                  left:           0,
                  right:          0,
                  background:     "rgba(7,7,7,0.96)",
                  backdropFilter: "blur(28px)",
                  borderTop:      "1px solid rgba(201,169,110,0.18)",
                  borderRadius:   "14px 14px 0 0",
                  zIndex:         105,
                  overflow:       "hidden",
                  paddingBottom:  "env(safe-area-inset-bottom, 0px)",
                }}
              >
                {/* Drag handle */}
                <div style={{
                  display:        "flex",
                  justifyContent: "center",
                  padding:        "0.75rem 0 0",
                }}>
                  <div style={{
                    width:        "36px",
                    height:       "3px",
                    borderRadius: "100px",
                    background:   "rgba(201,169,110,0.2)",
                  }} />
                </div>

                <PanelContent
                  navLinks={navLinks}
                  isActive={isActive}
                  locale={locale}
                  handleLocale={handleLocale}
                  closeMenu={() => setMenuOpen(false)}
                  t={t}
                  tFooter={tFooter}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </>
  );
}

/* ─── Shared panel content ─── */
function PanelContent({
  navLinks,
  isActive,
  locale,
  handleLocale,
  closeMenu,
  t,
  tFooter,
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
      {/* Gold top accent */}
      <div style={{
        height:     "1.5px",
        background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.55) 40%, rgba(201,169,110,0.55) 60%, transparent)",
      }} />

      {/* Nav links */}
      <div>
        {navLinks.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 + 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <NavRow
              label={link.label}
              href={link.href}
              index={i}
              active={isActive(link.href)}
              onClick={closeMenu}
            />
          </motion.div>
        ))}
      </div>

      {/* Quiz CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.38, duration: 0.3 }}
        style={{ padding: "0.6rem 1.5rem 0" }}
      >
        <Link
          href="/quiz"
          onClick={closeMenu}
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "0.5rem",
            fontFamily:     "var(--font-playfair), 'Playfair Display', serif",
            fontSize:       "0.82rem",
            fontStyle:      "italic",
            fontWeight:     500,
            color:          "rgba(201,169,110,0.65)",
            textDecoration: "none",
            padding:        "0.45rem 0",
            transition:     "color 0.18s ease-out",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.65)"; }}
        >
          <Compass size={13} strokeWidth={1.5} />
          {t("quiz")} →
        </Link>
      </motion.div>

      {/* Divider */}
      <div style={{
        margin:     "0.75rem 1.5rem 0",
        height:     "1px",
        background: "rgba(201,169,110,0.07)",
      }} />

      {/* Language + lock row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.44, duration: 0.3 }}
        style={{
          padding:        "0.75rem 1.5rem 1.1rem",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          gap:            "0.5rem",
          flexWrap:       "wrap",
        }}
      >
        {/* Locale pills */}
        <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => handleLocale(l)}
              style={{
                background:    l === locale ? "rgba(201,169,110,0.14)" : "transparent",
                border:        `1px solid ${l === locale ? "rgba(201,169,110,0.32)" : "rgba(255,255,255,0.07)"}`,
                borderRadius:  "2px",
                color:         l === locale ? "#C9A96E" : "rgba(245,240,232,0.28)",
                fontSize:      "0.52rem",
                letterSpacing: "0.16em",
                padding:       "0.28rem 0.5rem",
                cursor:        "pointer",
                fontFamily:    "var(--font-inter), Inter, sans-serif",
                transition:    "all 0.15s ease-out",
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
        </div>

        {/* Client login */}
        <Link
          href="/client/login"
          onClick={closeMenu}
          style={{
            display:        "flex",
            alignItems:     "center",
            gap:            "0.3rem",
            fontSize:       "0.52rem",
            letterSpacing:  "0.14em",
            textTransform:  "uppercase",
            color:          "rgba(255,255,255,0.18)",
            textDecoration: "none",
            transition:     "color 0.18s ease-out",
            whiteSpace:     "nowrap",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.5)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.18)"; }}
        >
          <Lock size={10} strokeWidth={1.5} />
          {t("client")}
        </Link>
      </motion.div>
    </div>
  );
}
