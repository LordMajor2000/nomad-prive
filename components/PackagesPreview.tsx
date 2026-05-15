"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";

const packages = [
  {
    number: "01",
    name: "SIGNATURE",
    tagline: "Your journey, perfectly curated.",
    featured: false,
  },
  {
    number: "02",
    name: "PRIVÉ",
    tagline: "No limits. No compromises.",
    featured: true,
  },
  {
    number: "03",
    name: "GRAND PRIVÉ",
    tagline: "By referral only. For those who want the impossible.",
    featured: false,
  },
];

export default function PackagesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateSizes = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (trackRef.current) {
        const containerWidth = trackRef.current.parentElement?.clientWidth || window.innerWidth;
        setCardWidth(mobile ? containerWidth * 0.85 : containerWidth / 3);
      }
    };
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const snapToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(packages.length - 1, index));
    setActiveIndex(clamped);
    if (cardWidth > 0) {
      animate(x, -clamped * (cardWidth + 24), { type: "spring", stiffness: 300, damping: 30 });
    }
  };

  const handleDragEnd = () => {
    const current = x.get();
    const gap = cardWidth + 24;
    const nearest = Math.round(-current / gap);
    snapToIndex(nearest);
  };

  const dragConstraints = cardWidth > 0
    ? { left: -((packages.length - 1) * (cardWidth + 24)), right: 0 }
    : { left: 0, right: 0 };

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 12vw, 10rem) 0",
        background: "var(--bg-surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
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
                Packages
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
              The Experience{" "}
              <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
                Made for You
              </em>
            </h2>
          </div>

          <Link
            href="/packages"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderBottom: "1px solid rgba(201,169,110,0.3)",
              paddingBottom: "2px",
              whiteSpace: "nowrap",
            }}
          >
            Compare all packages →
          </Link>
        </div>
      </div>

      {/* Carousel track */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
          overflow: isMobile ? "hidden" : "visible",
        }}
      >
        <div ref={trackRef} style={{ overflow: "hidden" }}>
          <motion.div
            drag={isMobile ? "x" : false}
            dragConstraints={dragConstraints}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            style={{
              x,
              display: "flex",
              gap: "1.5rem",
              cursor: isMobile ? "grab" : "default",
              width: isMobile ? "max-content" : "100%",
            }}
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.name}
                whileHover={!isMobile ? { y: -4, transition: { duration: 0.3, ease: "easeOut" } } : {}}
                style={{
                  background: pkg.featured ? "var(--bg-surface-2)" : "var(--bg-primary)",
                  border: pkg.featured
                    ? "1px solid rgba(201,169,110,0.35)"
                    : "1px solid rgba(201,169,110,0.1)",
                  borderRadius: "2px",
                  padding: "2rem",
                  position: "relative",
                  flexShrink: 0,
                  width: cardWidth > 0 ? `${cardWidth}px` : "calc(33.333% - 1rem)",
                }}
              >
                {/* Top accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: pkg.featured
                      ? "linear-gradient(90deg, var(--gold-primary), var(--gold-light), var(--gold-primary))"
                      : "linear-gradient(90deg, transparent, var(--gold-primary), transparent)",
                  }}
                />

                <div
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    color: "var(--gold-primary)",
                    marginBottom: "1rem",
                    opacity: 0.6,
                  }}
                >
                  {pkg.number}
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "var(--cream)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  {pkg.name}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    color: "var(--gold-primary)",
                    margin: "0 0 1.5rem 0",
                    lineHeight: 1.5,
                  }}
                >
                  {pkg.tagline}
                </p>

                <div
                  style={{
                    width: "30px",
                    height: "1px",
                    background: "rgba(201,169,110,0.3)",
                    marginBottom: "1.5rem",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link
                    href="/packages"
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Learn more →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dots — mobile only */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.6rem",
            marginTop: "2rem",
          }}
        >
          {packages.map((_, i) => (
            <button
              key={i}
              onClick={() => snapToIndex(i)}
              style={{
                width: i === activeIndex ? "20px" : "8px",
                height: "8px",
                borderRadius: "4px",
                border: "none",
                background: i === activeIndex ? "var(--gold-primary)" : "rgba(201,169,110,0.3)",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
              }}
              aria-label={`Go to package ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
