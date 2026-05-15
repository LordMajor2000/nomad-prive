"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog-posts";
import { useTranslations } from "next-intl";

export default function DestinationsPage() {
  const t = useTranslations("destinationsPage");
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
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
            delay: (i % 3) * 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navigation />

      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          padding: "10rem clamp(1.5rem, 5vw, 4rem) 5rem",
          maxWidth: "1400px",
          margin: "0 auto",
          opacity: 0,
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
          <div style={{ width: "40px", height: "1px", background: "var(--gold-primary)" }} />
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
            }}
          >
            {t("heroLabel")}
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            color: "var(--cream)",
            margin: "0 0 1.5rem 0",
            lineHeight: 1.1,
          }}
        >
          {t("heroHeadingPre")}{" "}
          <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
            {t("heroHeadingEm")}
          </em>
        </h1>
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            lineHeight: 1.8,
            color: "var(--muted)",
            maxWidth: "540px",
            fontWeight: 300,
          }}
        >
          {t("heroSubheading")}
        </p>
      </div>

      {/* Destinations grid */}
      <div
        style={{
          padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              ref={(el) => { cardsRef.current[i] = el; }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{ opacity: 0 }}
            >
              <Link href={`/journal/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid rgba(201,169,110,0.08)",
                    borderRadius: "2px",
                    overflow: "hidden",
                    height: "100%",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  {/* Image area */}
                  <div
                    style={{
                      aspectRatio: "4 / 3",
                      background: post.gradient,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          "linear-gradient(rgba(201,169,110,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.05) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                        opacity: 0.6,
                      }}
                    />
                    {/* Glow */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "20%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "60%",
                        height: "30%",
                        background: "rgba(201,169,110,0.12)",
                        filter: "blur(25px)",
                        borderRadius: "50%",
                      }}
                    />

                    {post.featured && (
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          fontSize: "0.55rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          background: "rgba(201,169,110,0.15)",
                          color: "var(--gold-primary)",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "1px",
                          border: "1px solid rgba(201,169,110,0.2)",
                        }}
                      >
                        {t("featuredLabel")}
                      </div>
                    )}

                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "2rem 1.5rem 1.25rem",
                        background: "linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 100%)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.6rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "var(--gold-primary)",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {post.country}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                          fontSize: "1.15rem",
                          fontWeight: 600,
                          color: "var(--cream)",
                        }}
                      >
                        {post.location}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.5rem" }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "var(--cream)",
                        margin: "0 0 0.6rem 0",
                        lineHeight: 1.4,
                        opacity: 0.9,
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        lineHeight: 1.7,
                        color: "var(--muted)",
                        margin: "0 0 1rem 0",
                        fontWeight: 300,
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                      }}
                    >
                      <span>{post.date} · {post.readTime}</span>
                      <span style={{ color: "var(--gold-primary)" }}>{t("readLabel")}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
