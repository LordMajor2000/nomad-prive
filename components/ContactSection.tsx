"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const formFields = [
  { name: "nev", label: "Name", type: "text", placeholder: "Anna Smith" },
  { name: "email", label: "Email", type: "email", placeholder: "anna@example.com" },
  { name: "telefon", label: "Phone", type: "tel", placeholder: "+1 212 555 0100" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nev: "",
    email: "",
    telefon: "",
    alomutazas: "",
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = (fieldName: string): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === fieldName ? "var(--gold-primary)" : "rgba(201,169,110,0.2)"}`,
    padding: "0.75rem 0",
    color: "var(--cream)",
    fontSize: "0.95rem",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    outline: "none",
    transition: "border-color 0.3s ease",
  });

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section
      id="kapcsolat"
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)",
        background: "var(--bg-surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Section label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "2rem",
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
            Contact
          </span>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            fontWeight: 700,
            color: "var(--cream)",
            lineHeight: 1.15,
            margin: "0 0 3rem 0",
            opacity: 0,
          }}
        >
          Begin Your{" "}
          <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>
            Dream Journey
          </em>
        </h2>

        {!submitted ? (
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* Input fields */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              {formFields.map((field, i) => (
                <motion.div
                  key={field.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fieldVariants}
                  style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
                >
                  <label
                    htmlFor={field.name}
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color:
                        focused === field.name
                          ? "var(--gold-primary)"
                          : "var(--muted)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    required
                    style={inputStyle(field.name)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Textarea */}
            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fieldVariants}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginBottom: "3rem",
              }}
            >
              <label
                htmlFor="alomutazas"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color:
                    focused === "alomutazas" ? "var(--gold-primary)" : "var(--muted)",
                  transition: "color 0.3s ease",
                }}
              >
                Tell us your dream
              </label>
              <textarea
                id="alomutazas"
                name="alomutazas"
                rows={5}
                placeholder="Where do you dream of going? What would you carry with you for a lifetime?..."
                value={formData.alomutazas}
                onChange={(e) =>
                  setFormData({ ...formData, alomutazas: e.target.value })
                }
                onFocus={() => setFocused("alomutazas")}
                onBlur={() => setFocused(null)}
                required
                style={{
                  ...inputStyle("alomutazas"),
                  resize: "vertical",
                  minHeight: "120px",
                  borderBottom: "none",
                  border: `1px solid ${focused === "alomutazas" ? "var(--gold-primary)" : "rgba(201,169,110,0.2)"}`,
                  padding: "1rem",
                  borderRadius: "2px",
                  lineHeight: 1.7,
                }}
              />
            </motion.div>

            {/* Submit */}
            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fieldVariants}
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: "var(--gold-primary)",
                  color: "#080808",
                  border: "none",
                  padding: "1.1rem 3rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  cursor: "pointer",
                  borderRadius: "1px",
                  transition: "background 0.3s ease",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--gold-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--gold-primary)";
                }}
              >
                GET IN TOUCH
              </motion.button>
            </motion.div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              border: "1px solid rgba(201,169,110,0.2)",
              borderRadius: "2px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "1px",
                background: "var(--gold-primary)",
                margin: "0 auto 2rem",
              }}
            />
            <h3
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontSize: "1.8rem",
                fontWeight: 700,
                fontStyle: "italic",
                color: "var(--gold-primary)",
                margin: "0 0 1rem 0",
              }}
            >
              Thank you for reaching out
            </h3>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                margin: 0,
                fontWeight: 300,
              }}
            >
              We will be in touch shortly to begin crafting the journey of your dreams.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
