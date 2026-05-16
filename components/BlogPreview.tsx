"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const posts = blogPosts.slice(0, 3);

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
            duration: 0.55,
            ease: "power3.out",
            delay: i * 0.1,
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
      ref={sectionRef}
      id="blog"
      style={{
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg-primary)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
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

          <Link
            href="/journal"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderBottom: "1px solid rgba(201,169,110,0.3)",
              paddingBottom: "2px",
              whiteSpace: "nowrap",
            }}
          >
            Read the journal →
          </Link>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {posts.map((post, i) => (
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
              <Link href={`/journal/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                {/* Image area */}
                <div
                  style={{
                    aspectRatio: "4 / 3",
                    position: "relative",
                    overflow: "hidden",
                    background: post.gradient,
                  }}
                >
                  <Image
                    src={post.image}
                    alt={`${post.location}, ${post.country}`}
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
                      padding: "2rem 1.5rem 1.25rem",
                      background: "linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 100%)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--gold-primary)",
                        display: "block",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {post.date}
                    </span>
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

                {/* Content */}
                <div style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                      fontSize: "1.05rem",
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
                  <span
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--gold-primary)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(201,169,110,0.3)",
                      paddingBottom: "2px",
                    }}
                  >
                    Read more →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
