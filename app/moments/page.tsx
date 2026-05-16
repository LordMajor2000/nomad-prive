"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Moment {
  quote: string;
  name: string;
  destination: string;
  index: number;
}

const moments: Moment[] = [
  {
    quote: "Három nap után abbahagytam az e-mailek ellenőrzését.",
    name: "K. Anna",
    destination: "Maldív-szigetek",
    index: 1,
  },
  {
    quote: "A repülő leszállásán már azt terveztem, mikor jövök vissza.",
    name: "M. Péter",
    destination: "Kyoto",
    index: 2,
  },
  {
    quote: "Soha nem hittem volna, hogy egy szálloda ennyit számíthat.",
    name: "L. Borbála",
    destination: "Marrakesh",
    index: 3,
  },
  {
    quote: "Az egész úton egyetlen döntést sem kellett meghoznom. Csak léteztem.",
    name: "V. Márton",
    destination: "Santorini",
    index: 4,
  },
  {
    quote: "Hazaérve vettem észre, hogy négy napja nem néztem a telefonomba.",
    name: "Sz. Réka",
    destination: "Seychelles",
    index: 5,
  },
  {
    quote: "Azt hittem, luxusutazást foglalok. Kiderült, hogy magamat foglaltam vissza.",
    name: "F. Gábor",
    destination: "Amalfi-part",
    index: 6,
  },
  {
    quote: "A gyerekeimnek nem képeslapot küldtem — felhívtam őket, hogy meséljem el.",
    name: "H. Katalin",
    destination: "Japán",
    index: 7,
  },
  {
    quote: "Öt éve nem aludtam ennyit. Azt se gondoltam, hogy még tudok.",
    name: "B. Tamás",
    destination: "Bali",
    index: 8,
  },
  {
    quote: "Egy étteremben sem volt angol menü. Rájöttem, hogy ez volt a legjobb vacsora.",
    name: "N. Zsófia",
    destination: "Marokkó",
    index: 9,
  },
  {
    quote: "Azt kértem, hogy ne legyen terv. Minden nap volt valami, amire nem számítottam.",
    name: "D. Kristóf",
    destination: "Sri Lanka",
    index: 10,
  },
];

export default function MomentsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const els = heroRef.current.querySelectorAll("[data-hero]");
        gsap.fromTo(els, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15, delay: 0.2,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{
          padding: "clamp(10rem, 18vw, 14rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6rem)",
          maxWidth: "1000px",
          margin: "0 auto",
        }}>
          <div ref={heroRef}>
            <p data-hero style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-primary)", marginBottom: "2rem", opacity: 0 }}>
              Visszatérve
            </p>
            <h1 data-hero style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              fontWeight: 700,
              color: "var(--cream)",
              margin: "0 0 1.5rem",
              lineHeight: 1.1,
              opacity: 0,
            }}>
              Milyen voltál,<br />
              <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>mikor visszajöttél?</em>
            </h1>
            <p data-hero style={{
              fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
              lineHeight: 1.8,
              color: "var(--muted)",
              maxWidth: "560px",
              fontWeight: 300,
              opacity: 0,
            }}>
              Nem értékelések. Nem csillagok. Csak egy mondat — azt, amit az emberek mondanak, mikor visszatérnek.
            </p>
          </div>
        </section>

        {/* Gold divider */}
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.2) 30%, rgba(201,169,110,0.2) 70%, transparent)" }} />
        </div>

        {/* Moments list */}
        <section style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0" }}>
            {moments.map((m, i) => (
              <motion.div
                key={m.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.04 }}
                viewport={{ once: true, margin: "-40px" }}
                onMouseEnter={() => setActive(m.index)}
                onMouseLeave={() => setActive(null)}
                style={{
                  padding: "clamp(2rem, 4vw, 3rem) 0",
                  borderBottom: "1px solid rgba(201,169,110,0.07)",
                  cursor: "default",
                  transition: "padding-left 0.4s ease",
                  paddingLeft: active === m.index ? "1.5rem" : "0",
                  borderLeft: active === m.index ? "2px solid var(--gold-primary)" : "2px solid transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
                  {/* Index number */}
                  <span style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "0.65rem",
                    color: "var(--gold-primary)",
                    opacity: active === m.index ? 1 : 0.25,
                    letterSpacing: "0.15em",
                    flexShrink: 0,
                    marginTop: "0.4rem",
                    transition: "opacity 0.3s ease",
                    minWidth: "2rem",
                  }}>
                    {String(m.index).padStart(2, "0")}
                  </span>

                  <div style={{ flex: 1 }}>
                    <blockquote style={{
                      fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                      fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: active === m.index ? "var(--cream)" : "rgba(245,240,232,0.75)",
                      margin: "0 0 1rem",
                      lineHeight: 1.5,
                      transition: "color 0.3s ease",
                    }}>
                      &ldquo;{m.quote}&rdquo;
                    </blockquote>
                    <p style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--gold-primary)",
                      opacity: active === m.index ? 0.8 : 0.4,
                      margin: 0,
                      transition: "opacity 0.3s ease",
                    }}>
                      {m.name} — {m.destination}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)", textAlign: "center", background: "#060606" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1rem, 2vw, 1.3rem)", fontStyle: "italic", color: "var(--muted)", marginBottom: "2rem", fontWeight: 300 }}>
              Mi lesz a te mondatod?
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                padding: "1rem 3rem",
                border: "1px solid rgba(201,169,110,0.5)",
                color: "var(--gold-primary)",
                textDecoration: "none",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,169,110,0.08)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.5)";
              }}
            >
              Tervezd meg az utadat →
            </a>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
