"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const decorLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        numberRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
      );

      tl.fromTo(
        decorLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "expo.out" },
        "-=0.5"
      );

      tl.fromTo(
        line1Ref.current,
        { opacity: 0, y: 30, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.out" },
        "-=0.3"
      );

      tl.fromTo(
        line2Ref.current,
        { opacity: 0, y: 20, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.out" },
        "-=0.6"
      );

      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="rolunk"
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(201,169,110,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2.5fr)",
          gap: "clamp(2rem, 6vw, 6rem)",
          alignItems: "center",
        }}
        className="block md:grid"
      >
        {/* Left — Large number */}
        <div
          ref={numberRef}
          style={{
            opacity: 0,
          }}
          className="hidden md:block"
        >
          <span
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(6rem, 15vw, 12rem)",
              fontWeight: 700,
              color: "transparent",
              WebkitTextStroke: "1px rgba(201,169,110,0.2)",
              lineHeight: 1,
              display: "block",
              userSelect: "none",
            }}
          >
            01
          </span>
        </div>

        {/* Right — Text */}
        <div>
          <div
            ref={decorLineRef}
            style={{
              width: "60px",
              height: "1px",
              background: "var(--gold-primary)",
              marginBottom: "2rem",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />

          <div
            ref={line1Ref}
            style={{ overflow: "hidden", marginBottom: "0.5rem", opacity: 0 }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                fontWeight: 700,
                color: "var(--cream)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Nem utazást szervezünk.
            </h2>
          </div>

          <div
            ref={line2Ref}
            style={{ overflow: "hidden", marginBottom: "2rem", opacity: 0 }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                fontWeight: 700,
                fontStyle: "italic",
                color: "var(--gold-primary)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Emlékeket tervezünk.
            </h2>
          </div>

          <p
            ref={subtextRef}
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              lineHeight: 1.85,
              color: "var(--muted)",
              margin: 0,
              maxWidth: "540px",
              fontWeight: 300,
              opacity: 0,
            }}
          >
            Párommal együtt, saját tapasztalatainkra építve szervezünk személyre
            szabott élményutazásokat a világ legkülönlegesebb helyszíneire. Minden
            utazás egy különleges fejezet — tele gondosan válogatott élményekkel,
            érintetlen tájakkal és olyan pillanatokkal, amelyeket soha nem felejtünk el.
          </p>
        </div>
      </div>
    </section>
  );
}
