"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN",
  hu: "HU",
  de: "DE",
  it: "IT",
  fr: "FR",
  es: "ES",
  sk: "SK",
};

const localeNames: Record<string, string> = {
  en: "English",
  hu: "Magyar",
  de: "Deutsch",
  it: "Italiano",
  fr: "Français",
  es: "Español",
  sk: "Slovenčina",
};

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (locale: string) => {
    setOpen(false);
    router.replace(pathname, { locale });
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.4rem 0.5rem",
          color: "#C9A96E",
          fontSize: "0.65rem",
          fontVariant: "small-caps",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "var(--font-inter), Inter, sans-serif",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          opacity: 0.85,
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
        aria-label="Change language"
      >
        {localeLabels[currentLocale] || "EN"}
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <path d="M1 1L4 4L7 1" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "rgba(10,10,10,0.97)",
            border: "1px solid rgba(201,169,110,0.15)",
            borderRadius: "2px",
            minWidth: "140px",
            zIndex: 200,
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "0.65rem 1rem",
                background: locale === currentLocale ? "rgba(201,169,110,0.08)" : "transparent",
                border: "none",
                borderBottom: "1px solid rgba(201,169,110,0.05)",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s ease",
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
              onMouseEnter={(e) => {
                if (locale !== currentLocale) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (locale !== currentLocale) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  color: locale === currentLocale ? "#C9A96E" : "rgba(255,255,255,0.6)",
                  fontWeight: locale === currentLocale ? 500 : 400,
                }}
              >
                {localeNames[locale]}
              </span>
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: locale === currentLocale ? "#C9A96E" : "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  fontVariant: "small-caps",
                }}
              >
                {localeLabels[locale]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
