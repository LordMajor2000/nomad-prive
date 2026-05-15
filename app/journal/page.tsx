"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog-posts";
import { useTranslations } from "next-intl";

export default function JournalPage() {
  const t = useTranslations("journalPage");
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

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
            delay: (i % 4) * 0.1,
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

  const allPosts = [...featured, ...rest];

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
            maxWidth: "500px",
            fontWeight: 300,
          }}
        >
          {t("heroSubheading")}
        </p>
      </div>

      {/* Featured posts */}
      {featured.length > 0 && (
        <div
          style={{
            padding: "0 clamp(1.5rem, 5vw, 4rem) 3rem",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ width: "30px", height: "1px", background: "var(--gold-primary)" }} />
            {t("featuredLabel")}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {featured.map((post, i) => (
              <motion.div
                key={post.slug}
                ref={(el) => { cardsRef.current[i] = el; }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                style={{ opacity: 0 }}
              >
                <Link href={`/journal/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <div
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid rgba(201,169,110,0.12)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "16 / 9",
                        background: post.gradient,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={post.image}
                        alt={`${post.location}, ${post.country}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          left: "1.25rem",
                          fontSize: "0.6rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          background: "rgba(201,169,110,0.15)",
                          color: "var(--gold-primary)",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "1px",
                          border: "1px solid rgba(201,169,110,0.2)",
                        }}
                      >
                        {t("featuredLabel")}
                      </div>
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
                        <span
                          style={{
                            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            color: "var(--cream)",
                          }}
                        >
                          {post.location}, {post.country}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          marginBottom: "0.75rem",
                          fontSize: "0.65rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                        }}
                      >
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2
                        style={{
                          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          color: "var(--cream)",
                          margin: "0 0 0.75rem 0",
                          lineHeight: 1.4,
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: 1.75,
                          color: "var(--muted)",
                          margin: "0 0 1.25rem 0",
                          fontWeight: 300,
                        }}
                      >
                        {post.excerpt}
                      </p>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--gold-primary)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          borderBottom: "1px solid rgba(201,169,110,0.3)",
                          paddingBottom: "2px",
                        }}
                      >
                        {t("readMore")}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All posts */}
      {rest.length > 0 && (
        <div
          style={{
            padding: "3rem clamp(1.5rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ width: "30px", height: "1px", background: "var(--gold-primary)" }} />
            {t("allPostsLabel")}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                ref={(el) => { cardsRef.current[featured.length + i] = el; }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                style={{ opacity: 0 }}
              >
                <Link href={`/journal/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <div
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid rgba(201,169,110,0.08)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "4 / 3",
                        background: post.gradient,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={post.image}
                        alt={post.location}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: "1.5rem 1.25rem 1rem",
                          background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 100%)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "var(--cream)",
                          }}
                        >
                          {post.location}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: "1.25rem" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          marginBottom: "0.6rem",
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                        }}
                      >
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "var(--cream)",
                          margin: "0 0 0.6rem 0",
                          lineHeight: 1.4,
                        }}
                      >
                        {post.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          lineHeight: 1.7,
                          color: "var(--muted)",
                          margin: 0,
                          fontWeight: 300,
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
