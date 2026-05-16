"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";


export default function AboutSection() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image: clip-path reveal from bottom
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)", opacity: 1 },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Text lines — blur + y stagger
      if (textBlockRef.current) {
        const lines = textBlockRef.current.querySelectorAll("[data-reveal]");
        lines.forEach((line, i) => {
          gsap.fromTo(
            line,
            { opacity: 0, y: 28, filter: "blur(5px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.65,
              ease: "power3.out",
              delay: i * 0.09,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section number watermark */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          fontSize: "clamp(6rem, 15vw, 12rem)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: "1px rgba(201,169,110,0.1)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        02
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Decorative line */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "var(--gold-primary)",
            marginBottom: "2rem",
          }}
        />

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left — image */}
          <div
            ref={imageRef}
            style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
              border: "1px solid rgba(201,169,110,0.12)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=90"
              alt="Travel landscape"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.5) 100%)",
              }}
            />
          </div>

          {/* Right — text */}
          <div ref={textBlockRef}>
            <div data-reveal>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  margin: "0 0 0.5rem",
                  lineHeight: 1.2,
                }}
              >
                {t("heading")}
              </h2>
            </div>
            <div data-reveal>
              <p
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  fontStyle: "italic",
                  color: "var(--gold-primary)",
                  margin: "0 0 2rem",
                }}
              >
                {t("subheading")}
              </p>
            </div>

            {(["body1", "body2", "body3"] as const).map((key) => (
              <div key={key} data-reveal>
                <p
                  style={{
                    fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                    lineHeight: 1.85,
                    color: "var(--muted)",
                    margin: "0 0 1.2rem",
                    fontWeight: 300,
                  }}
                >
                  {t(key)}
                </p>
              </div>
            ))}
            <div data-reveal>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                  lineHeight: 1.85,
                  color: "var(--muted)",
                  margin: "0 0 2rem",
                  fontWeight: 300,
                }}
              >
                {t("body4")}
              </p>
            </div>

            <div data-reveal>
              <Link
                href="/about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "var(--gold-primary)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid rgba(201,169,110,0.4)",
                  paddingBottom: "2px",
                  transition: "gap 0.3s ease",
                  marginBottom: "3rem",
                }}
              >
                {t("readMore")}
              </Link>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
