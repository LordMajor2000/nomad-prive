"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Compass } from "lucide-react";
import { useTranslations } from "next-intl";

export default function StickyCtaPill() {
  const t = useTranslations("nav");
  const [visible,   setVisible]   = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* Track scroll position */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 340);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Watch body data-menu attribute set by Navigation */
  useEffect(() => {
    const sync = () => setMenuOpen(document.body.hasAttribute("data-menu"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-menu"] });
    return () => observer.disconnect();
  }, []);

  const show = visible && !menuOpen;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="sticky-cta"
          initial={{ opacity: 0, y: 18, scale: 0.88 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 18, scale: 0.88 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          style={{
            position: "fixed",
            bottom:   "clamp(1.5rem, 4vw, 2.25rem)",
            right:    "clamp(1rem, 3vw, 2rem)",
            zIndex:   95,
          }}
        >
          <Link
            href="/quiz"
            style={{
              display:        "flex",
              alignItems:     "center",
              gap:            "0.55rem",
              padding:        "0.75rem 1.25rem",
              borderRadius:   "100px",
              background:     "rgba(201,169,110,0.92)",
              color:          "#080808",
              textDecoration: "none",
              fontSize:       "0.6rem",
              fontFamily:     "var(--font-inter), Inter, sans-serif",
              fontWeight:     600,
              letterSpacing:  "0.18em",
              textTransform:  "uppercase",
              boxShadow:      "0 8px 32px rgba(201,169,110,0.35), 0 2px 8px rgba(0,0,0,0.4)",
              transition:     "background 0.18s ease-out, transform 0.15s ease-out, box-shadow 0.18s ease-out",
              whiteSpace:     "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#E8D5AC";
              el.style.boxShadow  = "0 10px 40px rgba(201,169,110,0.45), 0 2px 8px rgba(0,0,0,0.4)";
              el.style.transform  = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(201,169,110,0.92)";
              el.style.boxShadow  = "0 8px 32px rgba(201,169,110,0.35), 0 2px 8px rgba(0,0,0,0.4)";
              el.style.transform  = "translateY(0)";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0) scale(0.97)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px) scale(1)";
            }}
          >
            <Compass size={13} strokeWidth={2} />
            {t("quiz")}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
