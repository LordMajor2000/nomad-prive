import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Nomad Privé Journal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.body.split("\n\n").filter(Boolean);

  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navigation />

      {/* Hero */}
      <div
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
        {/* Hero background image */}
        <Image
          src={post.image}
          alt={post.location}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.35 }}
        />
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(to bottom, transparent, var(--bg-primary))",
          }}
        />

        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Back link */}
          <Link
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
          </Link>

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

      {/* Body */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "4rem clamp(1.5rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)",
        }}
      >
        {/* Divider */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "var(--gold-primary)",
            marginBottom: "3rem",
          }}
        />

        {/* Excerpt callout */}
        <p
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontStyle: "italic",
            color: "var(--gold-light)",
            lineHeight: 1.8,
            margin: "0 0 3rem 0",
            paddingLeft: "1.5rem",
            borderLeft: "2px solid rgba(201,169,110,0.4)",
          }}
        >
          {post.excerpt}
        </p>

        {/* Paragraphs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
          }}
        >
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                lineHeight: 1.9,
                color: "var(--muted)",
                margin: 0,
                fontWeight: 300,
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(201,169,110,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "var(--cream)",
                margin: "0 0 0.5rem 0",
              }}
            >
              Ready to go?
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                margin: 0,
                fontWeight: 300,
              }}
            >
              Let us arrange your journey to {post.location}.
            </p>
          </div>
          <Link
            href="/contact"
            style={{
              background: "var(--gold-primary)",
              color: "#080808",
              padding: "0.9rem 2rem",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "1px",
              display: "inline-block",
            }}
          >
            Start Planning
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div
          style={{
            background: "var(--bg-surface)",
            borderTop: "1px solid rgba(201,169,110,0.08)",
            padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "2.5rem",
              }}
            >
              <div style={{ width: "30px", height: "1px", background: "var(--gold-primary)" }} />
              <span
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--gold-primary)",
                }}
              >
                Continue Reading
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {related.map((relPost) => (
                <Link
                  key={relPost.slug}
                  href={`/journal/${relPost.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px solid rgba(201,169,110,0.08)",
                      borderRadius: "2px",
                      overflow: "hidden",
                      transition: "border-color 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "16 / 9",
                        background: relPost.gradient,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={relPost.image}
                        alt={relPost.location}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <div
                        style={{
                          fontSize: "0.6rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "var(--gold-primary)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {relPost.location} · {relPost.date}
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "var(--cream)",
                          margin: "0 0 0.5rem 0",
                          lineHeight: 1.4,
                        }}
                      >
                        {relPost.title}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--gold-primary)",
                          opacity: 0.7,
                        }}
                      >
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
