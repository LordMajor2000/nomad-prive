"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

const destinationChipsBase = ["Sri Lanka", "Morocco", "Miami", "Mykonos", "Bali", "Amalfi", "Dubrovnik"];

type Rating = "best" | "good" | "avoid" | "shoulder";

interface FormData {
  destination: string;
  destinationChips: string[];
  timing: string;
  adults: number;
  children: number;
  groupType: "couple" | "group";
  name: string;
  email: string;
  phone: string;
  message: string;
  referral: string;
}

const initialForm: FormData = {
  destination: "",
  destinationChips: [],
  timing: "",
  adults: 2,
  children: 0,
  groupType: "couple",
  name: "",
  email: "",
  phone: "",
  message: "",
  referral: "",
};

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -100 : 100,
    opacity: 0,
  }),
};

const stepTransition = { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] };

export default function PlanningForm() {
  const t = useTranslations("form");
  const destinationChips = [...destinationChipsBase, t("surpriseMe")];
  const timingOptions = [t("timing1"), t("timing2"), t("timing3"), t("timing4")];
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const toggleChip = (chip: string) => {
    setFormData((prev) => ({
      ...prev,
      destinationChips: prev.destinationChips.includes(chip)
        ? prev.destinationChips.filter((c) => c !== chip)
        : [...prev.destinationChips, chip],
    }));
  };

  const step1Valid =
    formData.destination.trim().length > 0 ||
    formData.destinationChips.length > 0;
  const step2Valid = formData.timing.length > 0;
  const step4Valid = formData.name.trim().length > 0 && formData.email.trim().length > 0;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(201,169,110,0.3)",
    padding: "0.75rem 0",
    color: "var(--cream)",
    fontSize: "0.95rem",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.65rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "rgba(201,169,110,0.7)",
    display: "block",
    marginBottom: "0.25rem",
  };

  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Step dots */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "2.5rem",
          justifyContent: "center",
        }}
      >
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background:
                s === step
                  ? "#C9A96E"
                  : s < step
                  ? "transparent"
                  : "rgba(255,255,255,0.1)",
              border:
                s < step
                  ? "1px solid #C9A96E"
                  : s === step
                  ? "none"
                  : "1px solid rgba(255,255,255,0.15)",
              transition: "background 0.3s ease-out, border-color 0.3s ease-out",
            }}
          />
        ))}
      </div>

      {/* Steps */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "320px" }}>
        <AnimatePresence custom={direction} mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
            >
              <h3
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                  fontWeight: 600,
                  color: "var(--cream)",
                  marginBottom: "1.75rem",
                }}
              >
                {t("step1Heading")}
              </h3>

              <input
                type="text"
                placeholder={t("step1Placeholder")}
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
                style={{ ...inputStyle, marginBottom: "1.75rem", fontSize: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.6rem",
                  marginBottom: "0.5rem",
                }}
              >
                {destinationChips.map((chip) => {
                  const selected = formData.destinationChips.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleChip(chip)}
                      style={{
                        padding: "0.45rem 1rem",
                        border: `1px solid ${selected ? "#C9A96E" : "rgba(201,169,110,0.2)"}`,
                        background: selected ? "rgba(201,169,110,0.12)" : "transparent",
                        color: selected ? "#C9A96E" : "rgba(255,255,255,0.55)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                        borderRadius: "1px",
                        transition: "background 0.2s ease-out, border-color 0.2s ease-out, color 0.2s ease-out",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                      }}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
            >
              <h3
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                  fontWeight: 600,
                  color: "var(--cream)",
                  marginBottom: "1.75rem",
                }}
              >
                {t("step2Heading")}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "0.75rem",
                }}
              >
                {timingOptions.map((opt) => {
                  const selected = formData.timing === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, timing: opt })}
                      style={{
                        padding: "1.1rem 1rem",
                        border: `1px solid ${selected ? "#C9A96E" : "rgba(201,169,110,0.15)"}`,
                        background: selected ? "rgba(201,169,110,0.1)" : "#111",
                        color: selected ? "#C9A96E" : "rgba(255,255,255,0.6)",
                        fontSize: "0.8rem",
                        letterSpacing: "0.05em",
                        cursor: "pointer",
                        borderRadius: "1px",
                        transition: "background 0.2s ease-out, border-color 0.2s ease-out, color 0.2s ease-out",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
            >
              <h3
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                  fontWeight: 600,
                  color: "var(--cream)",
                  marginBottom: "1.75rem",
                }}
              >
                {t("step3Heading")}
              </h3>

              {/* Adults stepper */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.1rem 0",
                  borderBottom: "1px solid rgba(201,169,110,0.12)",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ color: "var(--cream)", fontSize: "0.95rem" }}>{t("adults")}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, adults: Math.max(1, p.adults - 1) }))
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "1px solid rgba(201,169,110,0.3)",
                      background: "transparent",
                      color: "#C9A96E",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "1px",
                    }}
                  >
                    −
                  </button>
                  <span style={{ color: "#C9A96E", fontSize: "1.1rem", minWidth: "24px", textAlign: "center" }}>
                    {formData.adults}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, adults: Math.min(20, p.adults + 1) }))
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "1px solid rgba(201,169,110,0.3)",
                      background: "transparent",
                      color: "#C9A96E",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "1px",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children stepper */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.1rem 0",
                  borderBottom: "1px solid rgba(201,169,110,0.12)",
                  marginBottom: "1.5rem",
                }}
              >
                <span style={{ color: "var(--cream)", fontSize: "0.95rem" }}>{t("children")}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, children: Math.max(0, p.children - 1) }))
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "1px solid rgba(201,169,110,0.3)",
                      background: "transparent",
                      color: "#C9A96E",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "1px",
                    }}
                  >
                    −
                  </button>
                  <span style={{ color: "#C9A96E", fontSize: "1.1rem", minWidth: "24px", textAlign: "center" }}>
                    {formData.children}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, children: Math.min(10, p.children + 1) }))
                    }
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "1px solid rgba(201,169,110,0.3)",
                      background: "transparent",
                      color: "#C9A96E",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "1px",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Group type toggle */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {(["couple", "group"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, groupType: type })}
                    style={{
                      flex: 1,
                      padding: "0.9rem",
                      border: `1px solid ${formData.groupType === type ? "#C9A96E" : "rgba(201,169,110,0.15)"}`,
                      background: formData.groupType === type ? "rgba(201,169,110,0.1)" : "transparent",
                      color: formData.groupType === type ? "#C9A96E" : "rgba(255,255,255,0.5)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      borderRadius: "1px",
                      transition: "background 0.2s ease-out, border-color 0.2s ease-out, color 0.2s ease-out",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                    }}
                  >
                    {type === "couple" ? t("couple") : t("group")}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4 */}
          {step === 4 && !submitted && (
            <motion.div
              key="step4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
            >
              <h3
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                  fontWeight: 600,
                  color: "var(--cream)",
                  marginBottom: "1.75rem",
                }}
              >
                How can we reach you?
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={labelStyle}>{t("labelName")}</label>
                  <input
                    type="text"
                    placeholder={t("placeholderName")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t("labelEmail")}</label>
                  <input
                    type="email"
                    placeholder={t("placeholderEmail")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t("labelPhone")}</label>
                  <input
                    type="tel"
                    placeholder={t("placeholderPhone")}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t("labelReferral")}</label>
                  <input
                    type="text"
                    placeholder={t("placeholderReferral")}
                    value={formData.referral}
                    onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>{t("labelMessage")}</label>
                  <textarea
                    rows={4}
                    placeholder={t("placeholderMessage")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      ...inputStyle,
                      borderBottom: "none",
                      border: "1px solid rgba(201,169,110,0.2)",
                      padding: "0.75rem",
                      resize: "vertical",
                      minHeight: "100px",
                      lineHeight: 1.7,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* SUCCESS */}
          {submitted && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                textAlign: "center",
                padding: "3rem 1rem",
              }}
            >
              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "56px",
                  height: "56px",
                  border: "1px solid #C9A96E",
                  borderRadius: "50%",
                  margin: "0 auto 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                  <motion.path
                    d="M1 8L8 15L21 1"
                    stroke="#C9A96E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                  />
                </svg>
              </motion.div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontStyle: "italic",
                  color: "#C9A96E",
                  marginBottom: "0.75rem",
                }}
              >
                {t("successTitle")}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                {t("successBody")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {!submitted && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: step > 1 ? "space-between" : "flex-end",
            marginTop: "2rem",
          }}
        >
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(201,169,110,0.6)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "0.5rem 0",
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              {t("back")}
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={
                (step === 1 && !step1Valid) ||
                (step === 2 && !step2Valid)
              }
              style={{
                background: "transparent",
                border: "1px solid #C9A96E",
                color: "#C9A96E",
                padding: "0.75rem 2rem",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor:
                  (step === 1 && !step1Valid) || (step === 2 && !step2Valid)
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  (step === 1 && !step1Valid) || (step === 2 && !step2Valid) ? 0.35 : 1,
                transition: "background 0.2s ease-out, border-color 0.2s ease-out, opacity 0.2s ease-out",
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              {t("next")}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (step4Valid) setSubmitted(true);
              }}
              disabled={!step4Valid}
              style={{
                background: "transparent",
                border: "1px solid #C9A96E",
                color: "#C9A96E",
                padding: "0.9rem 2.5rem",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: step4Valid ? "pointer" : "not-allowed",
                opacity: step4Valid ? 1 : 0.35,
                transition: "background 0.2s ease-out, opacity 0.2s ease-out",
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              {t("send")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Suppress unused import warning — Rating type used in blog-posts.ts
export type { Rating };
