"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PHASES = [
  {
    num: "01",
    label: "Az álom",
    title: "Valahol",
    titleEm: "vár egy hely",
    sub: "Még csak kép az elmédben — de mi tudjuk, hogyan tedd valóra. A legváratlanabb helyek szólítanak a leghangosabban.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
    accent: "#C9A96E",
  },
  {
    num: "02",
    label: "A terv",
    title: "Minden részlet",
    titleEm: "helyére kerül",
    sub: "Nem sablon, nem csomag — minden egyes nap a te ritmusodra szabva. Szállodák, sofőrök, asztalok: mind ott vannak, mire szükséged van rájuk.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80",
    accent: "#C9A96E",
  },
  {
    num: "03",
    label: "Az indulás",
    title: "Az utazás",
    titleEm: "itt kezdődik",
    sub: "A reptéren valaki már vár rád. Az első pillanattól fogva csak egy dolgod van: jelen lenni. Minden más a mi dolgunk.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80",
    accent: "#C9A96E",
  },
  {
    num: "04",
    label: "Az élmény",
    title: "Az idő",
    titleEm: "megáll",
    sub: "Nincs email-ellenőrzés. Nincs döntéskényszer. Csak a látvány, az íz, a levegő — és az az érzés, hogy valóban ott vagy.",
    image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=900&q=80",
    accent: "#C9A96E",
  },
  {
    num: "05",
    label: "A visszatérés",
    title: "Megváltozva",
    titleEm: "hazaérsz",
    sub: "Nem ugyanolyan ember vagy, aki elment. Valami megmaradt belőled ott, és valami eljött veled. Ez az igazi luxus.",
    image: "https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=900&q=80",
    accent: "#C9A96E",
  },
];

export default function JourneySection() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".journey-slide");
      const totalWidth = (slides.length - 1) * 100; // vw units

      const tween = gsap.to(trackRef.current, {
        x: () => `-${totalWidth}vw`,
        ease: "none",
        scrollTrigger: {
          trigger:   wrapRef.current,
          pin:       true,
          scrub:     2.2,
          /* Each slide gets ~2× viewport height of scrolling room */
          end:       () => `+=${window.innerHeight * 2.2 * (PHASES.length - 1)}`,
          invalidateOnRefresh: true,
        },
      });

      /* Staggered text reveals per slide */
      slides.forEach((slide, i) => {
        const heading = slide.querySelector(".js-phase-title");
        const sub     = slide.querySelector(".js-phase-sub");
        const label   = slide.querySelector(".js-phase-label");

        const trigger = {
          trigger:           slide,
          containerAnimation: tween,
          start:             "left 65%",
          toggleActions:     "play none none reverse",
        };

        if (label) gsap.fromTo(label,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", scrollTrigger: trigger }
        );
        if (heading) gsap.fromTo(heading,
          { opacity: 0, y: 28, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out", scrollTrigger: { ...trigger, start: "left 60%" } }
        );
        if (sub) gsap.fromTo(sub,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { ...trigger, start: "left 55%" } }
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      style={{
        position:   "relative",
        width:      "100%",
        height:     "100vh",
        overflow:   "hidden",
        background: "#050505",
      }}
    >
      {/* Section eyebrow — top left, always visible */}
      <div style={{
        position:      "absolute",
        top:           "clamp(1.8rem, 4vw, 3rem)",
        left:          "clamp(1.5rem, 5vw, 4rem)",
        zIndex:        10,
        display:       "flex",
        alignItems:    "center",
        gap:           "1rem",
        pointerEvents: "none",
      }}>
        <div style={{ width: "24px", height: "1px", background: "var(--gold-primary)" }} />
        <span style={{
          fontSize:      "0.55rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color:         "var(--gold-primary)",
          opacity:       0.7,
          fontFamily:    "var(--font-inter), Inter, sans-serif",
        }}>
          Az utazás ívei
        </span>
      </div>

      {/* Scroll hint */}
      <div style={{
        position:      "absolute",
        bottom:        "clamp(1.5rem, 3vw, 2.5rem)",
        right:         "clamp(1.5rem, 5vw, 4rem)",
        zIndex:        10,
        display:       "flex",
        alignItems:    "center",
        gap:           "0.6rem",
        opacity:       0.35,
        pointerEvents: "none",
      }}>
        <span style={{
          fontSize:      "0.5rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         "var(--cream)",
          fontFamily:    "var(--font-inter), Inter, sans-serif",
        }}>
          Görgess
        </span>
        <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
          <path d="M0 4h22M18 1l4 3-4 3" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Progress bar */}
      <div style={{
        position: "absolute",
        bottom:   0,
        left:     0,
        right:    0,
        height:   "2px",
        background: "rgba(201,169,110,0.06)",
        zIndex:   10,
      }}>
        <div
          className="journey-progress"
          style={{
            height:     "100%",
            background: "var(--gold-primary)",
            width:      "20%", /* updated via GSAP below */
            transformOrigin: "left",
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* Scrolling track */}
      <div
        ref={trackRef}
        style={{
          display:    "flex",
          height:     "100%",
          willChange: "transform",
        }}
      >
        {PHASES.map((phase, i) => (
          <div
            key={i}
            className="journey-slide"
            style={{
              position:     "relative",
              minWidth:     "100vw",
              height:       "100vh",
              overflow:     "hidden",
              display:      "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {/* Image side */}
            <div style={{
              position:   "relative",
              overflow:   "hidden",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={phase.image}
                alt={phase.label}
                loading={i === 0 ? "eager" : "lazy"}
                style={{
                  width:      "100%",
                  height:     "100%",
                  objectFit:  "cover",
                  filter:     "brightness(0.55)",
                  transform:  "scale(1.04)",
                  transition: "transform 8s ease-out",
                }}
              />
              {/* Image overlay */}
              <div style={{
                position:   "absolute",
                inset:      0,
                background: "linear-gradient(90deg, rgba(5,5,5,0) 60%, rgba(5,5,5,0.85) 100%), linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0) 40%)",
              }} />
            </div>

            {/* Content side */}
            <div style={{
              display:        "flex",
              flexDirection:  "column",
              justifyContent: "center",
              padding:        "clamp(2.5rem, 6vw, 5rem) clamp(2rem, 5vw, 4.5rem)",
              position:       "relative",
            }}>
              {/* Huge background number */}
              <span style={{
                position:      "absolute",
                top:           "50%",
                right:         "-0.05em",
                transform:     "translateY(-50%)",
                fontFamily:    "var(--font-playfair), 'Playfair Display', serif",
                fontSize:      "clamp(12rem, 22vw, 22rem)",
                fontWeight:    700,
                color:         "rgba(201,169,110,0.035)",
                lineHeight:    1,
                pointerEvents: "none",
                userSelect:    "none",
                letterSpacing: "-0.04em",
              }}>
                {phase.num}
              </span>

              {/* Phase label */}
              <div
                className="js-phase-label"
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", opacity: 0 }}
              >
                <span style={{
                  fontSize:      "0.52rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color:         "rgba(201,169,110,0.5)",
                  fontFamily:    "var(--font-inter), Inter, sans-serif",
                }}>
                  {phase.num}
                </span>
                <div style={{ width: "28px", height: "1px", background: "rgba(201,169,110,0.3)" }} />
                <span style={{
                  fontSize:      "0.6rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color:         "var(--gold-primary)",
                  fontFamily:    "var(--font-inter), Inter, sans-serif",
                }}>
                  {phase.label}
                </span>
              </div>

              {/* Title */}
              <h2
                className="js-phase-title"
                style={{
                  fontFamily:    "var(--font-playfair), 'Playfair Display', serif",
                  fontSize:      "clamp(2rem, 3.8vw, 3.2rem)",
                  fontWeight:    700,
                  color:         "var(--cream)",
                  lineHeight:    1.12,
                  margin:        "0 0 1.25rem",
                  opacity:       0,
                  position:      "relative",
                  zIndex:        1,
                }}
              >
                {phase.title}
                <br />
                <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
                  {phase.titleEm}
                </em>
              </h2>

              {/* Sub */}
              <p
                className="js-phase-sub"
                style={{
                  fontFamily:  "var(--font-inter), Inter, sans-serif",
                  fontSize:    "clamp(0.82rem, 1.1vw, 0.95rem)",
                  lineHeight:  1.72,
                  color:       "rgba(245,240,232,0.48)",
                  maxWidth:    "38ch",
                  margin:      0,
                  opacity:     0,
                  position:    "relative",
                  zIndex:      1,
                }}
              >
                {phase.sub}
              </p>

              {/* Progress dots */}
              <div style={{
                position: "absolute",
                bottom:   "clamp(1.5rem, 3vw, 2.5rem)",
                left:     "clamp(2rem, 5vw, 4.5rem)",
                display:  "flex",
                gap:      "0.4rem",
              }}>
                {PHASES.map((_, idx) => (
                  <span key={idx} style={{
                    width:        idx === i ? "20px" : "4px",
                    height:       "4px",
                    borderRadius: "100px",
                    background:   idx === i ? "var(--gold-primary)" : "rgba(201,169,110,0.18)",
                    transition:   "width 0.3s ease-out",
                  }} />
                ))}
              </div>
            </div>

            {/* Vertical divider */}
            <div style={{
              position:   "absolute",
              top:        "12%",
              bottom:     "12%",
              left:       "50%",
              width:      "1px",
              background: "rgba(201,169,110,0.07)",
              pointerEvents: "none",
            }} />
          </div>
        ))}
      </div>

      {/* Mobile fallback: hide on small screens, show stacked instead */}
      <style>{`
        @media (max-width: 768px) {
          .journey-slide {
            grid-template-columns: 1fr !important;
          }
          .journey-slide > div:first-child {
            height: 45vw !important;
            min-height: 200px;
          }
        }
      `}</style>
    </section>
  );
}
