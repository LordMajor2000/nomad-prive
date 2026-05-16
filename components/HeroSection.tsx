"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  const titleLines = [t("title1"), t("title2")];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Phase 1: Golden line draws from center outward
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 1.5, ease: "expo.out" }
      );

      // Phase 2: Title letters reveal from center
      const letters = titleRef.current?.querySelectorAll(".letter");
      if (letters && letters.length > 0) {
        tl.fromTo(
          Array.from(letters),
          { opacity: 0, y: 20, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: {
              each: 0.05,
              from: "center",
            },
            ease: "power3.out",
          },
          "+=0"
        );
      }

      // Phase 3: Tagline fades in
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "+=0.1"
      );

      // Phase 4: Background image fades in
      tl.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.inOut" },
        "-=0.5"
      );

      // Phase 5: Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "+=0.2"
      );

      // Infinite scroll line animation
      tl.to(
        scrollLineRef.current,
        {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 0.5,
          yoyo: false,
          onRepeat: () => {
            gsap.set(scrollLineRef.current, { scaleY: 1, transformOrigin: "bottom center" });
          },
        },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#080808",
      }}
    >
      {/* Video background */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          zIndex: 1,
        }}
      >
        {/* Replace /videos/hero.mp4 with your own footage for production */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          {/* Fallback: Pexels aerial ocean — replace with owned footage */}
          <source src="https://videos.pexels.com/video-files/3795405/3795405-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        {/* Cinematic gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(to bottom,
                rgba(6,6,6,0.55) 0%,
                rgba(6,6,6,0.25) 40%,
                rgba(6,6,6,0.4) 70%,
                rgba(6,6,6,0.85) 100%
              ),
              linear-gradient(to right, rgba(6,6,6,0.3) 0%, transparent 50%, rgba(6,6,6,0.2) 100%)
            `,
          }}
        />
        {/* Gold horizon glow */}
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), rgba(232,213,176,0.6), rgba(201,169,110,0.4), transparent)",
            boxShadow: "0 0 40px 12px rgba(201,169,110,0.08)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          padding: "0 2rem",
        }}
      >
        {/* Horizontal golden line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div
            ref={lineRef}
            style={{
              width: "200px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, var(--gold-primary), var(--gold-light), var(--gold-primary), transparent)",
              transformOrigin: "center",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 700,
            color: "var(--cream)",
            letterSpacing: "0.3em",
            margin: "0 0 1.5rem 0",
            lineHeight: 1.1,
            textTransform: "uppercase",
          }}
        >
          {titleLines.map((line, lineIndex) => (
            <div key={lineIndex} style={{ display: "block" }}>
              {line.split("").map((char, charIndex) => (
                <span
                  key={`${lineIndex}-${charIndex}`}
                  className="letter"
                  style={{
                    display: "inline-block",
                    whiteSpace: char === " " ? "pre" : "normal",
                    opacity: 0,
                  }}
                >
                  {char === " " ? " " : char}
                </span>
              ))}
            </div>
          ))}
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "var(--gold-light)",
            letterSpacing: "0.1em",
            margin: 0,
            opacity: 0,
          }}
        >
          {t("tagline")}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          opacity: 0,
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold-primary)",
            fontWeight: 400,
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "50px",
            background: "rgba(201,169,110,0.3)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            ref={scrollLineRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, var(--gold-primary), var(--gold-light))",
              transformOrigin: "bottom center",
            }}
          />
        </div>
      </div>
    </section>
  );
}
