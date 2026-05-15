"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  const titleText = "NOMAD PRIVÉ";

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
              each: 0.06,
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
      {/* Background gradient (simulating cinematic landscape) */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          background: `
            radial-gradient(ellipse at 50% 70%, rgba(201,169,110,0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 50%, rgba(10,30,60,0.8) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(5,15,30,0.9) 0%, transparent 50%),
            linear-gradient(
              to bottom,
              #030508 0%,
              #05090F 20%,
              #080D14 40%,
              #0A0E12 60%,
              #060A0F 75%,
              rgba(201,169,110,0.15) 85%,
              rgba(100,70,20,0.4) 90%,
              #080808 100%
            )
          `,
          zIndex: 1,
        }}
      >
        {/* Star field effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(circle, rgba(245,240,232,0.6) 1px, transparent 1px),
              radial-gradient(circle, rgba(245,240,232,0.3) 1px, transparent 1px),
              radial-gradient(circle, rgba(201,169,110,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "300px 300px, 200px 200px, 400px 400px",
            backgroundPosition: "0 0, 100px 50px, 200px 150px",
            opacity: 0.4,
          }}
        />
        {/* Horizon glow */}
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,110,0.6), rgba(232,213,176,0.8), rgba(201,169,110,0.6), transparent)",
            boxShadow: "0 0 60px 20px rgba(201,169,110,0.15)",
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(8,8,8,0.4)",
          zIndex: 2,
        }}
      />

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
          {titleText.split("").map((char, i) => (
            <span
              key={i}
              className="letter"
              style={{
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : "normal",
                opacity: 0,
              }}
            >
              {char === " " ? " " : char}
            </span>
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
          Every journey is a masterpiece.
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
