"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const featured = [
  {
    slug: "sri-lanka",
    location: "Sri Lanka",
    country: "Sri Lanka",
    tagline: "The exotic adventure Bali used to be.",
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=800&q=80",
    gradient: "linear-gradient(135deg, #0a0800 0%, #1a1200 30%, rgba(201,169,110,0.15) 100%)",
  },
  {
    slug: "morocco",
    location: "Morocco",
    country: "Morocco",
    tagline: "Two countries in one — surf and medina.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80",
    gradient: "linear-gradient(135deg, #0d0500 0%, #1a0a00 30%, rgba(201,100,50,0.15) 100%)",
  },
  {
    slug: "miami",
    location: "Miami",
    country: "United States",
    tagline: "The city you think you know.",
    image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&q=80",
    gradient: "linear-gradient(135deg, #000510 0%, #000a1a 30%, rgba(100,150,220,0.2) 100%)",
  },
];

export default function DestinationsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg-primary)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ width: "40px", height: "1px", background: "var(--gold-primary)" }} />
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold-primary)",
              }}
            >
              Destinations
            </span>
          </div>
          <h2
            ref={headingRef}
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--cream)",
              margin: 0,
              opacity: 0,
            }}
          >
            Where We&apos;ve{" "}
            <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
              Been
            </em>
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {featured.map((dest, i) => (
            <motion.div
              key={dest.slug}
              ref={(el) => { cardsRef.current[i] = el; }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
              style={{ opacity: 0 }}
            >
              <Link
                href={`/journal/${dest.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid rgba(201,169,110,0.08)",
                    borderRadius: "2px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {/* Image area */}
                  <div
                    style={{
                      aspectRatio: "3 / 2",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={dest.image}
                      alt={dest.location}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "2rem 1.5rem 1.25rem",
                        background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 100%)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          color: "var(--cream)",
                        }}
                      >
                        {dest.location}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--gold-primary)",
                          marginTop: "0.25rem",
                        }}
                      >
                        {dest.country}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.25rem 1.5rem" }}>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: 1.7,
                        color: "var(--muted)",
                        margin: "0 0 1rem 0",
                        fontWeight: 300,
                        fontStyle: "italic",
                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                      }}
                    >
                      {dest.tagline}
                    </p>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--gold-primary)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        opacity: 0.8,
                      }}
                    >
                      Read the journal →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
