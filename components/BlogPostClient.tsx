"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import BestTimeBar from "@/components/BestTimeBar";
import type { BlogPost } from "@/data/blog-posts";

interface Props {
  post: BlogPost;
}

export default function BlogPostClient({ post }: Props) {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (heroImageRef.current && heroSectionRef.current) {
        gsap.to(heroImageRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Parallax Hero */}
      <div
        ref={heroSectionRef}
        style={{
          background: post.gradient,
          paddingTop: "8rem",
          paddingBottom: "5rem",
          paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
          paddingRight: "clamp(1.5rem, 5vw, 4rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Parallax image wrapper */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
          }}
        >
          <div
            ref={heroImageRef}
            style={{
              position: "absolute",
              inset: "-10% 0",
              transform: "scale(1.15)",
            }}
          >
            <Image
              src={post.image}
              alt={post.location}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", opacity: 0.35 }}
            />
          </div>
        </div>

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(to bottom, transparent, var(--bg-primary))",
            zIndex: 1,
          }}
        />

        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Back link */}
          <a
            href="/journal"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              textDecoration: "none",
              marginBottom: "2.5rem",
              opacity: 0.75,
              transition: "opacity 0.3s ease",
            }}
          >
            ← Back to Journal
          </a>

          {/* Location */}
          <div
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              marginBottom: "1rem",
            }}
          >
            {post.location} · {post.country}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
              fontWeight: 700,
              color: "var(--cream)",
              margin: "0 0 1.5rem 0",
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Best Time Bar — rendered here if data exists */}
      {post.bestTime && post.bestTime.length > 0 && (
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "0 clamp(1rem, 5vw, 4rem)",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <BestTimeBar data={post.bestTime} />
        </div>
      )}
    </>
  );
}
