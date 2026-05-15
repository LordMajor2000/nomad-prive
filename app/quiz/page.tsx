"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Compass, Sun, UtensilsCrossed, Music, Check } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import Navigation from "@/components/Navigation";

const questions = [
  {
    question: "What kind of escape are you looking for?",
    options: [
      { label: "Adventure & Discovery", icon: <Compass size={22} /> },
      { label: "Pure Relaxation", icon: <Sun size={22} /> },
      { label: "Culture & Gastronomy", icon: <UtensilsCrossed size={22} /> },
      { label: "Party & Nightlife", icon: <Music size={22} /> },
    ],
  },
  {
    question: "What's your ideal landscape?",
    options: [
      { label: "Tropical beach & jungle", icon: null },
      { label: "Mediterranean coast", icon: null },
      { label: "Desert & ancient medina", icon: null },
      { label: "City energy & architecture", icon: null },
    ],
  },
  {
    question: "How do you prefer to travel?",
    options: [
      { label: "Just us two — completely private", icon: null },
      { label: "Small group of close friends", icon: null },
      { label: "Family with children", icon: null },
      { label: "Solo, fully independent", icon: null },
    ],
  },
  {
    question: "What matters most?",
    options: [
      { label: "Undiscovered, authentic", icon: null },
      { label: "Luxury comfort above all", icon: null },
      { label: "The best food & wine", icon: null },
      { label: "Non-stop sun & warm sea", icon: null },
    ],
  },
];

const destinationNames: Record<string, string> = {
  "sri-lanka": "Sri Lanka",
  "bali-vs-lombok": "Bali & Lombok",
  morocco: "Morocco",
  miami: "Miami",
  mykonos: "Mykonos",
  "amalfi-coast": "Amalfi Coast",
  dubrovnik: "Dubrovnik",
};

function getResult(answers: number[]): string {
  const [q1, q2, , q4] = answers;
  if (q1 === 0 && q2 === 0) return q4 === 0 ? "sri-lanka" : "bali-vs-lombok";
  if (q1 === 1 && q2 === 1) return q4 === 1 ? "mykonos" : "amalfi-coast";
  if (q1 === 2 && q2 === 2) return "morocco";
  if (q1 === 3) return q2 === 3 ? "miami" : "mykonos";
  if (q2 === 1 && q4 === 1) return "amalfi-coast";
  if (q4 === 0 && q2 === 0) return "sri-lanka";
  if (q1 === 2 && q2 === 3) return "dubrovnik";
  const byLandscape = ["sri-lanka", "amalfi-coast", "morocco", "miami"];
  return byLandscape[q2] || "morocco";
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

const transition = { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] };

export default function QuizPage() {
  const [step, setStep] = useState(0); // 0–3 = questions, 4 = result
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const totalSteps = questions.length;
  const progress = step < totalSteps ? (step / totalSteps) * 100 : 100;

  const result = step === totalSteps ? getResult(answers) : null;
  const resultPost = result ? blogPosts.find((p) => p.slug === result) : null;
  const resultName = result ? destinationNames[result] ?? result : "";

  const handleSelect = (idx: number) => {
    setSelected(idx);
    // Auto-advance after brief delay
    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[step] = idx;
      setAnswers(newAnswers);
      setDirection(1);
      setStep((s) => s + 1);
      setSelected(null);
    }, 320);
  };

  const handleRetake = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setDirection(-1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "var(--cream)",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}
    >
      <Navigation />

      {/* Progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(201,169,110,0.12)",
          zIndex: 200,
        }}
      >
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #C9A96E, #E8D5B0)",
          }}
        />
      </div>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "6rem 1.5rem 4rem",
        }}
      >
        <AnimatePresence custom={direction} mode="wait">
          {/* Questions */}
          {step < totalSteps && (
            <motion.div
              key={`q${step}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              style={{ width: "100%", maxWidth: "680px" }}
            >
              {/* Step indicator */}
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  marginBottom: "1.5rem",
                  opacity: 0.7,
                  textAlign: "center",
                }}
              >
                Question {step + 1} of {totalSteps}
              </p>

              <h1
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  textAlign: "center",
                  marginBottom: "3rem",
                  lineHeight: 1.2,
                }}
              >
                {questions[step].question}
              </h1>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem",
                }}
                className="quiz-grid"
              >
                {questions[step].options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      style={{
                        position: "relative",
                        padding: "1.5rem 1.25rem",
                        background: isSelected ? "rgba(201,169,110,0.1)" : "#111",
                        border: `1px solid ${isSelected ? "#C9A96E" : "rgba(201,169,110,0.15)"}`,
                        borderRadius: "2px",
                        color: isSelected ? "#C9A96E" : "rgba(255,255,255,0.7)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A96E";
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.15)";
                          (e.currentTarget as HTMLButtonElement).style.background = "#111";
                        }
                      }}
                    >
                      {opt.icon && (
                        <span style={{ opacity: isSelected ? 1 : 0.6, flexShrink: 0 }}>
                          {opt.icon}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: "0.9rem",
                          letterSpacing: "0.03em",
                          lineHeight: 1.4,
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                        }}
                      >
                        {opt.label}
                      </span>
                      {isSelected && (
                        <span
                          style={{
                            position: "absolute",
                            top: "0.75rem",
                            right: "0.75rem",
                            color: "#C9A96E",
                          }}
                        >
                          <Check size={14} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {step === totalSteps && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "100%",
                maxWidth: "720px",
                textAlign: "center",
              }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  marginBottom: "1.5rem",
                  opacity: 0.7,
                }}
              >
                Your Perfect Journey
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  fontWeight: 700,
                  color: "#C9A96E",
                  marginBottom: "2rem",
                  lineHeight: 1.1,
                }}
              >
                {resultName}
              </motion.h1>

              {resultPost?.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    marginBottom: "2.5rem",
                    borderRadius: "2px",
                    overflow: "hidden",
                    border: "1px solid rgba(201,169,110,0.15)",
                  }}
                >
                  <Image
                    src={resultPost.image}
                    alt={resultName}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 60%)",
                    }}
                  />
                </motion.div>
              )}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.65)",
                  marginBottom: "3rem",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                Based on your answers, this is your perfect journey.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: "2.5rem",
                }}
              >
                <Link
                  href={`/journal/${result}`}
                  style={{
                    display: "inline-block",
                    padding: "0.9rem 2.5rem",
                    border: "1px solid #C9A96E",
                    color: "#C9A96E",
                    textDecoration: "none",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,169,110,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                >
                  Read about {resultName} →
                </Link>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-block",
                    padding: "0.9rem 2.5rem",
                    border: "1px solid rgba(201,169,110,0.35)",
                    color: "rgba(201,169,110,0.7)",
                    textDecoration: "none",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#C9A96E";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.35)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.7)";
                  }}
                >
                  Start Planning
                </Link>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={handleRetake}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)";
                }}
              >
                Retake quiz
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 540px) {
          .quiz-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
