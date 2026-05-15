"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80",
    alt: "Morocco",
  },
  {
    src: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=600&q=80",
    alt: "Sri Lanka",
  },
  {
    src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
    alt: "Mykonos",
  },
  {
    src: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=600&q=80",
    alt: "Miami",
  },
  {
    src: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=600&q=80",
    alt: "Amalfi Coast",
  },
  {
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    alt: "Bali",
  },
];

const howWeWork = [
  {
    title: "We&apos;ve been there",
    body: "Every destination we recommend is one we&apos;ve personally experienced. We don&apos;t sell anywhere we haven&apos;t stood.",
  },
  {
    title: "We know people",
    body: "Our network is built trip by trip. The villa manager in Positano. The riad owner in Marrakesh. The charter captain in the Aegean. Real relationships, not commission agreements.",
  },
  {
    title: "We fix things",
    body: "Travel has variables. Weather, strikes, overbooked hotels, missed connections. We solve problems before you know they exist — because we&apos;ve already had them ourselves.",
  },
];

const stats = [
  { value: "8+", label: "Countries Explored" },
  { value: "100%", label: "Bespoke Itineraries" },
  { value: "24/7", label: "Concierge Support" },
  { value: "2", label: "Founders, 1 Vision" },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero text reveal
      if (heroRef.current) {
        const els = heroRef.current.querySelectorAll("[data-hero]");
        gsap.fromTo(
          els,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            delay: 0.3,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>

        {/* Section 1 — Hero */}
        <section
          ref={heroRef}
          style={{
            padding: "clamp(10rem, 18vw, 16rem) clamp(1.5rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)",
            background: "#060606",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 60% 40%, rgba(201,169,110,0.04) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div
              data-hero
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold-primary)",
                marginBottom: "2rem",
                opacity: 0,
              }}
            >
              About Nomad Privé
            </div>
            <h1
              data-hero
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: 700,
                color: "var(--cream)",
                margin: "0 0 1.5rem",
                lineHeight: 1.1,
                opacity: 0,
              }}
            >
              We Travel Because We Have To.
            </h1>
            <p
              data-hero
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                lineHeight: 1.8,
                color: "var(--muted)",
                maxWidth: "640px",
                fontWeight: 300,
                opacity: 0,
              }}
            >
              Nomad Privé is the answer to a question we kept asking: why doesn&apos;t a
              travel company exist that actually travels?
            </p>
          </div>
        </section>

        {/* Section 2 — Our Story */}
        <section
          ref={storyRef}
          style={{
            padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
            background: "var(--bg-primary)",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "clamp(3rem, 6vw, 6rem)",
              alignItems: "center",
            }}
            className="story-grid"
          >
            {/* Left — image */}
            <div
              style={{
                position: "relative",
                aspectRatio: "3/4",
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid rgba(201,169,110,0.2)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80"
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
            <div>
              <div
                style={{
                  width: "50px",
                  height: "1px",
                  background: "var(--gold-primary)",
                  marginBottom: "2rem",
                }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  margin: "0 0 2rem",
                  lineHeight: 1.2,
                }}
              >
                How It Started
              </h2>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                  lineHeight: 1.9,
                  color: "var(--muted)",
                  marginBottom: "1.5rem",
                  fontWeight: 300,
                }}
              >
                My partner built her expertise in lecture halls and five-star internships
                across Europe — learning the architecture of hospitality, the logistics of
                luxury, the language of service. I built mine differently: by going. By
                staying somewhere long enough to understand it.
              </p>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                  lineHeight: 1.9,
                  color: "var(--muted)",
                  marginBottom: "1.5rem",
                  fontWeight: 300,
                }}
              >
                We met. We traveled together. We started noticing the gap.
              </p>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                  lineHeight: 1.9,
                  color: "var(--muted)",
                  marginBottom: "1.5rem",
                  fontWeight: 300,
                }}
              >
                The travel industry offers two things: mass-market packages that treat you
                like a seat number, and so-called &quot;luxury&quot; agencies run by people who
                haven&apos;t left their desk in three years. Nobody was offering what we wanted:
                deeply personal, actually experienced, genuinely bespoke.
              </p>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                  lineHeight: 1.9,
                  color: "var(--muted)",
                  fontWeight: 300,
                }}
              >
                So we built it ourselves.
              </p>
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              .story-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* Section 3 — How We Work */}
        <section
          style={{
            padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
            background: "#060606",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div
              style={{
                width: "50px",
                height: "1px",
                background: "var(--gold-primary)",
                marginBottom: "1rem",
              }}
            />
            <h2
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--cream)",
                margin: "0 0 3rem",
              }}
            >
              How We Work
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
              }}
              className="cards-grid"
            >
              {howWeWork.map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: "#0d0d0d",
                    border: "1px solid rgba(201,169,110,0.1)",
                    borderTop: "2px solid var(--gold-primary)",
                    borderRadius: "4px",
                    padding: "2.5rem 2rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "var(--cream)",
                      margin: "0 0 1rem",
                    }}
                    dangerouslySetInnerHTML={{ __html: card.title }}
                  />
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.8,
                      color: "var(--muted)",
                      margin: 0,
                      fontWeight: 300,
                    }}
                    dangerouslySetInnerHTML={{ __html: card.body }}
                  />
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .cards-grid { grid-template-columns: 1fr !important; }
            }
            @media (min-width: 601px) and (max-width: 900px) {
              .cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
        </section>

        {/* Section 4 — Gallery */}
        <section
          style={{
            padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
            background: "var(--bg-primary)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  margin: "0 0 0.5rem",
                  display: "inline-block",
                  borderBottom: "2px solid var(--gold-primary)",
                  paddingBottom: "6px",
                }}
              >
                Where We&apos;ve Stood
              </h2>
            </div>
            <div
              style={{
                columns: "3 280px",
                gap: "1rem",
              }}
            >
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    breakInside: "avoid",
                    marginBottom: "1rem",
                    borderRadius: "4px",
                    overflow: "hidden",
                    position: "relative",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={i % 3 === 0 ? 700 : 450}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 — Stats bar */}
        <section
          style={{
            background: "#060606",
            padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
            borderTop: "1px solid rgba(201,169,110,0.08)",
            borderBottom: "1px solid rgba(201,169,110,0.08)",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              gap: "clamp(2rem, 8vw, 6rem)",
              flexWrap: "wrap",
              textAlign: "center",
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 700,
                    color: "var(--gold-primary)",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--cream)",
                    fontVariant: "small-caps",
                    opacity: 0.7,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 — CTA */}
        <section
          style={{
            padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
            background: "var(--bg-primary)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "var(--cream)",
              margin: "0 0 2.5rem",
              lineHeight: 1.2,
            }}
          >
            Ready to go somewhere extraordinary?
          </h2>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "1rem 3rem",
              background: "transparent",
              border: "1px solid var(--gold-primary)",
              color: "var(--gold-primary)",
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "0.85rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold-primary)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-primary)";
            }}
          >
            Start Planning
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
