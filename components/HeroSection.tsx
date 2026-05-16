"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HeroSection() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const tQuiz = useTranslations("quizCTA");
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Image slides in from right
      tl.fromTo(imageRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "expo.out" },
        0
      );

      // Divider line draws
      tl.fromTo(dividerRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 1.2, ease: "expo.out" },
        0.2
      );

      // Eyebrow
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.4
      );

      // Title line 1
      tl.fromTo(line1Ref.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        0.55
      );

      // Title line 2
      tl.fromTo(line2Ref.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        0.7
      );

      // Tagline
      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.9
      );

      // CTA
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.05
      );

      // Coords
      tl.fromTo(coordsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        1.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-grid"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        background: "#080808",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-text-col { padding: 7rem 1.5rem 4rem !important; justify-content: flex-start !important; }
          .hero-image-col { height: 55vw !important; min-height: 260px; order: -1; }
          .hero-divider { display: none !important; }
          .hero-coords { display: none !important; }
        }
        @keyframes kenburns-hero {
          0%   { transform: scale(1.06) translate(0%, 0%); }
          100% { transform: scale(1) translate(-1.5%, -1%); }
        }
      `}</style>

      {/* LEFT — Text column */}
      <div
        className="hero-text-col"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "8rem 4rem 6rem clamp(1.5rem, 5vw, 5rem)",
          zIndex: 2,
        }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
            opacity: 0,
          }}
        >
          <div style={{ width: "32px", height: "1px", background: "var(--gold-primary)" }} />
          <span style={{
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold-primary)",
            opacity: 0.85,
          }}>
            Private Travel Curation
          </span>
        </div>

        {/* Title */}
        <h1 style={{ margin: "0 0 1.5rem", padding: 0 }}>
          <div
            ref={line1Ref}
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              fontWeight: 700,
              color: "var(--cream)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              opacity: 0,
            }}
          >
            {t("title1")}
          </div>
          <div
            ref={line2Ref}
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "var(--gold-primary)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              opacity: 0,
            }}
          >
            {t("title2")}
          </div>
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "rgba(245,240,232,0.55)",
            lineHeight: 1.7,
            margin: "0 0 2.5rem",
            maxWidth: "38ch",
            opacity: 0,
          }}
        >
          {t("tagline")}
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ display: "flex", alignItems: "center", gap: "1.5rem", opacity: 0 }}>
          <Link
            href="/quiz"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0",
              padding: "0.9rem 2rem",
              background: "var(--gold-primary)",
              color: "#080808",
              textDecoration: "none",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 600,
              overflow: "hidden",
              position: "relative",
              transition: "transform 0.15s ease-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(0.97)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
          >
            {tQuiz("cta")} &nbsp;→
          </Link>
          <Link
            href="/packages"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.6)",
              textDecoration: "none",
              transition: "color 0.2s ease-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.6)";
            }}
          >
            {tNav("packages")}
          </Link>
        </div>

        {/* Bottom coordinates */}
        <div
          ref={coordsRef}
          className="hero-coords"
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "clamp(1.5rem, 5vw, 5rem)",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            opacity: 0,
          }}
        >
          <span style={{
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            fontVariant: "tabular-nums",
          }}>
            47°N · 19°E
          </span>
          <div style={{ width: "1px", height: "16px", background: "rgba(201,169,110,0.2)" }} />
          <span style={{
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
          }}>
            Est. 2024
          </span>
        </div>
      </div>

      {/* Vertical divider */}
      <div
        ref={dividerRef}
        className="hero-divider"
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(201,169,110,0.25) 30%, rgba(201,169,110,0.15) 70%, transparent 100%)",
          zIndex: 3,
          transform: "scaleY(0)",
        }}
      />

      {/* RIGHT — Image column */}
      <div
        ref={imageRef}
        className="hero-image-col"
        style={{
          position: "relative",
          overflow: "hidden",
          clipPath: "inset(0 100% 0 0)",
        }}
      >
        {/* Ken Burns image */}
        <div style={{
          position: "absolute",
          inset: "-8%",
          backgroundImage: "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "kenburns-hero 22s ease-in-out infinite alternate",
        }} />

        {/* Video overlay */}
        <video
          autoPlay muted loop playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient: left edge bleeds into bg */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.15) 35%, rgba(8,8,8,0.05) 100%)",
          zIndex: 1,
        }} />

        {/* Bottom gradient */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "40%",
          background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 100%)",
          zIndex: 1,
        }} />

        {/* Floating badge — bottom right */}
        <div style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "2rem",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.4rem",
        }}>
          <div style={{
            width: "32px",
            height: "1px",
            background: "rgba(201,169,110,0.5)",
            alignSelf: "flex-end",
          }} />
          <span style={{
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.5)",
          }}>
            Curated Journeys
          </span>
        </div>
      </div>
    </section>
  );
}
