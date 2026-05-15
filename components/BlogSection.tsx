"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog-posts";

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

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
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
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
      id="blog"
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg-primary)",
        position: "relative",
      }}
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
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
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "var(--gold-primary)",
            }}
          />
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
            }}
          >
            Journal
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
          Where We've{" "}
          <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
            Been
          </em>
        </h2>
      </div>

      {/* Blog cards */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.slug}
            ref={(el) => { cardsRef.current[i] = el; }}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
            style={{
              background: "var(--bg-surface)",
              border: "1px solid rgba(201,169,110,0.08)",
              borderRadius: "2px",
              overflow: "hidden",
              cursor: "pointer",
              opacity: 0,
            }}
          >
            {/* Image area */}
            <div
              style={{
                aspectRatio: "4 / 3",
                position: "relative",
                overflow: "hidden",
                background: post.gradient,
              }}
            >
              {/* Accent glow */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "70%",
                  height: "30%",
                  background: "rgba(201,169,110,0.15)",
                  filter: "blur(30px)",
                  borderRadius: "50%",
                }}
              />
              {/* Decorative grid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(rgba(201,169,110,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.05) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  opacity: 0.5,
                }}
              />
              {/* Location overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "2rem 1.5rem 1.25rem",
                  background:
                    "linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 100%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--gold-primary)",
                  }}
                >
                  {post.date}
                </span>
                <span
                  style={{
                    fontFamily:
                      "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--cream)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {post.location}, {post.country}
                </span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  fontFamily:
                    "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--cream)",
                  margin: "0 0 0.75rem 0",
                  lineHeight: 1.4,
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.75,
                  color: "var(--muted)",
                  margin: "0 0 1.5rem 0",
                  fontWeight: 300,
                }}
              >
                {post.excerpt}
              </p>

              <motion.a
                href="#"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gold-primary)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: 500,
                  borderBottom: "1px solid rgba(201,169,110,0.3)",
                  paddingBottom: "2px",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (
                    e.currentTarget as HTMLAnchorElement
                  ).style.borderColor = "var(--gold-primary)";
                }}
                onMouseLeave={(e) => {
                  (
                    e.currentTarget as HTMLAnchorElement
                  ).style.borderColor = "rgba(201,169,110,0.3)";
                }}
              >
                Read more <span>→</span>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
