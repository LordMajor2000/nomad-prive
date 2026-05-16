"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Lock } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Navigation() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

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

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          right:          0,
          zIndex:         100,
          padding:        scrolled ? "0.85rem 2rem" : "1.3rem 2rem",
          background:     scrolled ? "rgba(8,8,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom:   scrolled ? "1px solid rgba(201,169,110,0.08)" : "1px solid transparent",
          transition:     "background 0.35s ease-out, backdrop-filter 0.35s ease-out, padding 0.3s ease-out, border-color 0.35s ease-out",
        }}
      >
        <div style={{
          maxWidth:        "1400px",
          margin:          "0 auto",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "flex-end",
        }}>
          {/* Controls — language + hamburger as individual pill buttons */}
          <div style={{
            display:    "flex",
            alignItems: "center",
            gap:        "0.4rem",
            zIndex:     110,
            position:   "relative",
          }}>
            {/* Language switcher wrapped in its own pill */}
            <div style={{
              background:     scrolled ? "transparent" : "rgba(6,6,6,0.5)",
              backdropFilter: scrolled ? "none" : "blur(18px)",
              border:         `1px solid ${scrolled ? "transparent" : "rgba(245,240,232,0.1)"}`,
              borderRadius:   "2px",
              transition:     "background 0.35s ease-out, border-color 0.35s ease-out",
              overflow:       "hidden",
            }}>
              <LanguageSwitcher />
            </div>

            {/* Hamburger pill */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{
                background:     scrolled ? "transparent" : "rgba(6,6,6,0.5)",
                backdropFilter: scrolled ? "none" : "blur(18px)",
                border:         `1px solid ${scrolled ? "rgba(201,169,110,0.15)" : "rgba(245,240,232,0.1)"}`,
                borderRadius:   "2px",
                cursor:         "pointer",
                padding:        "0.75rem 0.9rem",
                display:        "flex",
                flexDirection:  "column",
                justifyContent: "center",
                gap:            "5px",
                transition:     "background 0.2s ease-out, border-color 0.35s ease-out, backdrop-filter 0.35s ease-out",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  scrolled ? "transparent" : "rgba(6,6,6,0.5)";
              }}
            >
              <span style={{
                display:    "block",
                width:      "20px",
                height:     "1px",
                background: "#F5F0E8",
                transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease-out",
                transform:  menuOpen ? "rotate(45deg) translate(4px, 4.5px)" : "none",
              }} />
              <span style={{
                display:    "block",
                width:      "13px",
                height:     "1px",
                background: "#F5F0E8",
                transition: "opacity 0.2s ease-out",
                opacity:    menuOpen ? 0 : 0.6,
              }} />
              <span style={{
                display:    "block",
                width:      "20px",
                height:     "1px",
                background: "#F5F0E8",
                transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1)",
                transform:  menuOpen ? "rotate(-45deg) translate(4px, -4.5px)" : "none",
              }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen side drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.48, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position:       "fixed",
              top:            0,
              right:          0,
              bottom:         0,
              width:          "min(460px, 100%)",
              background:     "#0a0a0a",
              backdropFilter: "blur(30px)",
              zIndex:         105,
              display:        "flex",
              flexDirection:  "column",
              justifyContent: "center",
              padding:        "5rem 3.5rem",
              borderLeft:     "1px solid rgba(201,169,110,0.08)",
            }}
          >
            <nav>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ delay: i * 0.06 + 0.08, duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden", borderBottom: "1px solid rgba(201,169,110,0.06)" }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display:     "flex",
                          alignItems:  "baseline",
                          gap:         "1.25rem",
                          padding:     "1.1rem 0",
                          fontFamily:  "var(--font-playfair), 'Playfair Display', serif",
                          fontSize:    "clamp(1.6rem, 3vw, 2rem)",
                          fontWeight:  700,
                          color:       active ? "var(--gold-primary)" : "var(--cream)",
                          textDecoration: "none",
                          transition:  "color 0.2s ease-out",
                        }}
                        onMouseEnter={(e) => {
                          if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,232,0.5)";
                        }}
                        onMouseLeave={(e) => {
                          if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "var(--cream)";
                        }}
                      >
                        <span style={{
                          fontSize:   "0.55rem",
                          letterSpacing: "0.15em",
                          color:      "rgba(201,169,110,0.3)",
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                          fontWeight: 400,
                          alignSelf:  "center",
                          minWidth:   "24px",
                        }}>
                          0{i + 1}
                        </span>
                        {link.label}
                        {active && (
                          <span style={{
                            marginLeft:   "auto",
                            width:        "6px",
                            height:       "6px",
                            borderRadius: "50%",
                            background:   "var(--gold-primary)",
                            flexShrink:   0,
                          }} />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}

                {/* Quiz link */}
                <motion.li
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: navLinks.length * 0.06 + 0.08, duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <Link
                    href="/quiz"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display:        "flex",
                      alignItems:     "center",
                      gap:            "0.75rem",
                      padding:        "1.4rem 0 0.5rem",
                      fontFamily:     "var(--font-playfair), 'Playfair Display', serif",
                      fontSize:       "clamp(1rem, 1.8vw, 1.2rem)",
                      fontWeight:     600,
                      fontStyle:      "italic",
                      color:          "rgba(201,169,110,0.75)",
                      textDecoration: "none",
                      transition:     "color 0.2s ease-out",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.75)";
                    }}
                  >
                    <Compass size={16} strokeWidth={1.5} />
                    {t("quiz")}
                  </Link>
                </motion.li>
              </ul>
            </nav>

            {/* Bottom strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{
                marginTop:    "2.5rem",
                paddingTop:   "2rem",
                borderTop:    "1px solid rgba(201,169,110,0.08)",
                display:      "flex",
                justifyContent: "space-between",
                alignItems:   "center",
              }}
            >
              <p style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize:   "0.8rem",
                fontStyle:  "italic",
                color:      "rgba(255,255,255,0.18)",
                margin:     0,
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
                  fontSize:       "0.6rem",
                  letterSpacing:  "0.15em",
                  textTransform:  "uppercase",
                  color:          "rgba(255,255,255,0.18)",
                  textDecoration: "none",
                  transition:     "color 0.2s ease-out",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.18)";
                }}
              >
                <Lock size={11} strokeWidth={1.5} />
                {t("client")}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position:   "fixed",
              inset:      0,
              background: "rgba(0,0,0,0.6)",
              zIndex:     104,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
