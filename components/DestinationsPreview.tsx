"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

const featured = [
  {
    slug: "sri-lanka",
    location: "Sri Lanka",
    region: "South Asia",
    tagline: "The exotic adventure Bali used to be.",
    detail: "Temple trails, surf breaks, and colonial hill towns — all in one island.",
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=900&q=85",
    num: "01",
  },
  {
    slug: "morocco",
    location: "Morocco",
    region: "North Africa",
    tagline: "Two countries in one — surf and medina.",
    detail: "Atlantic coast breaks meet ancient souks and private riad rooftops.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=900&q=85",
    num: "02",
  },
  {
    slug: "miami",
    location: "Miami",
    region: "United States",
    tagline: "The city you think you know.",
    detail: "Art Deco facades, private beach clubs, and an after-dark scene without equal.",
    image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=900&q=85",
    num: "03",
  },
];

export default function DestinationsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg-primary)",
        position: "relative",
      }}
    >
      <style>{`
        .dest-row {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          align-items: center;
          gap: 2rem;
          padding: 2.25rem 0;
          border-bottom: 1px solid rgba(201,169,110,0.07);
          cursor: pointer;
          transition: background 0.2s ease-out;
          position: relative;
          text-decoration: none;
        }
        .dest-row:first-child { border-top: 1px solid rgba(201,169,110,0.07); }
        .dest-row-image {
          /* use max-width so the fill image never escapes its container */
          width: 96px;
          max-width: 0;
          height: 64px;
          overflow: hidden;
          border-radius: 2px;
          flex-shrink: 0;
          position: relative;
          transition: max-width 0.48s cubic-bezier(0.16,1,0.3,1);
        }
        .dest-row:hover .dest-row-image,
        .dest-row-active .dest-row-image {
          max-width: 96px;
        }
        .dest-row-location {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(1.5rem, 2.8vw, 2.2rem);
          font-weight: 700;
          color: var(--cream);
          transition: color 0.2s ease-out;
          letter-spacing: -0.01em;
        }
        .dest-row:hover .dest-row-location { color: var(--gold-primary); }
        .dest-row-tagline {
          font-size: 0.82rem;
          color: rgba(255,255,255,0);
          font-style: italic;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          transition: color 0.3s ease-out, max-height 0.3s ease-out;
          overflow: hidden;
          max-height: 0;
        }
        .dest-row:hover .dest-row-tagline,
        .dest-row-active .dest-row-tagline {
          color: rgba(255,255,255,0.45);
          max-height: 40px;
        }
        .dest-row-arrow {
          font-size: 1.1rem;
          color: rgba(201,169,110,0.3);
          transition: color 0.22s ease-out, transform 0.32s cubic-bezier(0.16,1,0.3,1);
          flex-shrink: 0;
          display: inline-block;
        }
        .dest-row:hover .dest-row-arrow,
        .dest-row-active .dest-row-arrow {
          color: var(--gold-primary);
          transform: translate(3px, -3px);
        }
        /* ── Mobile overrides ── */
        @media (max-width: 640px) {
          .dest-row {
            grid-template-columns: 28px 1fr 20px !important;
            gap: 0.75rem !important;
            padding: 1.4rem 0 !important;
          }
          .dest-row-image { display: none !important; }
          .dest-row-location { font-size: 1.35rem !important; }
          .dest-row-tagline {
            color: rgba(255,255,255,0.38) !important;
            max-height: 50px !important;
          }
        }
        /* Touch devices: always show tagline, hide expanding image */
        @media (hover: none) {
          .dest-row-image { display: none !important; }
          .dest-row-tagline {
            color: rgba(255,255,255,0.38) !important;
            max-height: 50px !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header — asymmetric */}
        <style>{`
          @media (max-width: 640px) {
            .dest-header {
              grid-template-columns: 1fr !important;
            }
            .dest-header-link {
              padding-top: 0 !important;
            }
          }
        `}</style>
        <div
          ref={headingRef}
          className="dest-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "flex-end",
            gap: "1.5rem 2rem",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            opacity: 0,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: "28px", height: "1px", background: "var(--gold-primary)" }} />
              <span style={{
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold-primary)",
                opacity: 0.8,
              }}>
                Destinations
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 700,
              color: "var(--cream)",
              margin: 0,
              lineHeight: 1.1,
            }}>
              Featured{" "}
              <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
                Destinations
              </em>
            </h2>
          </div>

          <Link
            href="/journal"
            className="dest-header-link"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.5)",
              textDecoration: "none",
              whiteSpace: "nowrap",
              paddingBottom: "0.25rem",
              transition: "color 0.2s ease-out",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-primary)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.5)"; }}
          >
            All destinations →
          </Link>
        </div>

        {/* Accordion rows */}
        <div>
          {featured.map((dest, i) => (
            <Link
              key={dest.slug}
              href={`/journal/${dest.slug}`}
              className={`dest-row${hovered === i ? " dest-row-active" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Number */}
              <span style={{
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                color: hovered === i ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.15)",
                fontVariant: "tabular-nums",
                transition: "color 0.2s ease-out",
                userSelect: "none",
              }}>
                {dest.num}
              </span>

              {/* Main content */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", minWidth: 0 }}>
                {/* Expanding thumbnail */}
                <div className="dest-row-image">
                  <Image
                    src={dest.image}
                    alt={dest.location}
                    fill
                    sizes="96px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ minWidth: 0 }}>
                  <div className="dest-row-location">{dest.location}</div>
                  <div style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.4)",
                    marginBottom: "0.3rem",
                  }}>
                    {dest.region}
                  </div>
                  <div className="dest-row-tagline">{dest.tagline}</div>
                </div>
              </div>

              {/* Arrow */}
              <span className="dest-row-arrow">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
