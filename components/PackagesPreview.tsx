"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

/* ─────────────────────────────────────────────
   Package definitions
───────────────────────────────────────────── */
const packageDefs = [
  { number: "01", name: "SIGNATURE",   taglineKey: "tagline1" as const, featured: false },
  { number: "02", name: "PRIVÉ",       taglineKey: "tagline2" as const, featured: true  },
  { number: "03", name: "GRAND PRIVÉ", taglineKey: "tagline3" as const, featured: false },
];

/* ─────────────────────────────────────────────
   Single package card
   All MotionValues are passed in from the parent
   so that hooks are never called inside loops.
───────────────────────────────────────────── */
interface CardProps {
  pkg: (typeof packageDefs)[number] & { tagline: string };
  scrollRX: MotionValue<number>;
  scrollRY: MotionValue<number>;
  shimmerX: MotionValue<string>;
  learnMore: string;
}

function PackageCard({ pkg, scrollRX, scrollRY, shimmerX, learnMore }: CardProps) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    setTilt({ rx: -dy * 8, ry: dx * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setHovered(false);
  }, []);

  return (
    /* perspective wrapper — entrance variant lives on this element */
    <div style={{ perspective: "1200px", height: "100%" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        /* combine scroll tilt (MotionValue) + mouse tilt (animate) */
        style={{
          rotateX: scrollRX,
          rotateY: scrollRY,
          transformStyle: "preserve-3d",
          background:   pkg.featured ? "var(--bg-surface-2)" : "var(--bg-primary)",
          border:       pkg.featured
            ? "1px solid rgba(201,169,110,0.35)"
            : "1px solid rgba(201,169,110,0.1)",
          borderRadius: "2px",
          padding:      "2rem",
          position:     "relative",
          cursor:       "pointer",
          height:       "100%",
          willChange:   "transform",
          boxShadow:    pkg.featured
            ? "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,169,110,0.08)"
            : "0 8px 32px rgba(0,0,0,0.25)",
        }}
        animate={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          scale:   hovered ? 1.025 : 1,
          y:       hovered ? -6    : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* ── Top accent / shimmer bar ── */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            overflow: "hidden",
            background: pkg.featured
              ? "linear-gradient(90deg, var(--gold-primary), var(--gold-light), var(--gold-primary))"
              : "linear-gradient(90deg, transparent, var(--gold-primary), transparent)",
          }}
        >
          {pkg.featured && (
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                x: shimmerX,
                width: "60%",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,220,0.9) 50%, transparent 100%)",
              }}
            />
          )}
        </div>

        {/* ── Radial inner glow (featured only) ── */}
        {pkg.featured && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "2px",
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.07) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* ── Card number ── */}
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

        {/* ── Package name ── */}
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

        {/* ── Tagline ── */}
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

        {/* ── Divider ── */}
        <div
          style={{
            width: "30px",
            height: "1px",
            background: "rgba(201,169,110,0.3)",
            marginBottom: "1.5rem",
          }}
        />

        {/* ── CTA ── */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {learnMore}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function PackagesPreview() {
  const t = useTranslations("packages");
  const packages = packageDefs.map((p) => ({ ...p, tagline: t(p.taglineKey) }));

  /* ── Scroll tracking ── */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  /* ── Per-card scroll tilt ──
     Outer cards tilt more; center card stays nearly flat on Y.
     All hooks called unconditionally at the top level. */
  const rx0 = useTransform(smooth, [0, 0.5, 1], [ 6,  0, -6]);
  const rx1 = useTransform(smooth, [0, 0.5, 1], [ 3,  0, -3]);
  const rx2 = useTransform(smooth, [0, 0.5, 1], [ 6,  0, -6]);

  const ry0 = useTransform(smooth, [0, 0.5, 1], [-5,  0,  5]);
  const ry1 = useTransform(smooth, [0, 0.5, 1], [ 0,  0,  0]);
  const ry2 = useTransform(smooth, [0, 0.5, 1], [ 5,  0, -5]);

  /* ── Shimmer sweep for the featured (middle) card ── */
  const shimmerRaw = useTransform(smooth, [0.2, 0.8], [0, 1]);
  const shimmerX   = useTransform(shimmerRaw, [0, 1], ["-100%", "200%"]);

  const scrollProps = [
    { rx: rx0, ry: ry0 },
    { rx: rx1, ry: ry1 },
    { rx: rx2, ry: ry2 },
  ] as const;

  /* ── In-view for staggered card entrance ── */
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  /* ── In-view for heading ── */
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  /* ── Variants ── */
  const containerVariants = {
    hidden:   {},
    visible:  { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const cardVariants = {
    hidden:   { opacity: 0, y: 48 },
    visible:  { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      style={{
        padding:    "clamp(5rem, 12vw, 10rem) 0",
        background: "var(--bg-surface)",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* ── Header ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}>
        <div
          style={{
            display:        "flex",
            alignItems:     "flex-end",
            justifyContent: "space-between",
            marginBottom:   "clamp(3rem, 6vw, 5rem)",
            flexWrap:       "wrap",
            gap:            "1.5rem",
          }}
        >
          <div>
            <div
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ width: "40px", height: "1px", background: "var(--gold-primary)" }} />
              <span
                style={{
                  fontSize:      "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color:         "var(--gold-primary)",
                }}
              >
                {t("label")}
              </span>
            </div>

            <motion.h2
              ref={headingRef}
              initial={{ opacity: 0, y: 30 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize:   "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color:      "var(--cream)",
                margin:     0,
              }}
            >
              {t("headingPre")}{" "}
              <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
                {t("headingEm")}
              </em>
            </motion.h2>
          </div>

          <Link
            href="/packages"
            style={{
              fontSize:      "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color:         "var(--gold-primary)",
              textDecoration: "none",
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "0.5rem",
              borderBottom:  "1px solid rgba(201,169,110,0.3)",
              paddingBottom: "2px",
              whiteSpace:    "nowrap",
            }}
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div
        ref={gridRef}
        style={{
          maxWidth: "1400px",
          margin:   "0 auto",
          padding:  "0 clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          style={{
            display:               "grid",
            gridTemplateColumns:   "repeat(auto-fit, minmax(260px, 1fr))",
            gap:                   "1.5rem",
          }}
        >
          {packages.map((pkg, i) => (
            <motion.div key={pkg.name} variants={cardVariants} transition={{ duration: 0.75, ease: "easeOut" }}>
              <Link href="/packages" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <PackageCard
                  pkg={pkg}
                  scrollRX={scrollProps[i].rx}
                  scrollRY={scrollProps[i].ry}
                  shimmerX={shimmerX}
                  learnMore={t("learnMore")}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
