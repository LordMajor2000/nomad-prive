"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const questions = [
  {
    question: "When you imagine your ideal trip, what feeling comes first?",
    options: [
      "Freedom — open roads, no plan, just go",
      "Escape — total disconnection from everyday life",
      "Discovery — something I've never seen or felt before",
      "Indulgence — the best of everything, nothing ordinary",
    ],
  },
  {
    question: "Your perfect day abroad looks like:",
    options: [
      "Renting a car and driving somewhere with no destination",
      "A private beach, a good book, absolute silence",
      "Getting lost in a local market, eating something I can't name",
      "A rooftop dinner at a Michelin-starred restaurant, then a nightclub",
    ],
  },
  {
    question: "How do you feel about other tourists?",
    options: [
      "I avoid them — I want to feel like I discovered this place myself",
      "I don't mind, as long as my hotel is peaceful",
      "I embrace it — travel is social, I love meeting people",
      "I prefer a scene — being around people with taste and style",
    ],
  },
  {
    question: "What do you bring home?",
    options: [
      "Stories nobody believes",
      "A completely recharged mind and body",
      "A deeper understanding of how other people live",
      "Memories of the finest food, art, and experiences money can buy",
    ],
  },
  {
    question: "Travel for you is fundamentally about:",
    options: [
      "Testing your limits and finding new ones",
      "Recovering the version of yourself that got lost in routine",
      "Understanding the world is bigger and stranger than you thought",
      "Living at a level that everyday life doesn't allow",
    ],
  },
];

interface Alternative {
  name: string;
  why: string;
}

interface ResultType {
  type: string;
  description: string;
  destination: string;
  detail: string;
  image: string;
  slug: string | null;
  alternatives: Alternative[];
}

const results: Record<string, ResultType> = {
  "free-spirit": {
    type: "The Free Spirit",
    description:
      "You travel to escape structure, not to find it. The best trips you've had were the ones with no plan that somehow became the ones you still talk about years later.",
    destination: "Road Trip: Alentejo, Portugal",
    detail:
      "Empty roads, ancient cork forests, wine from the producer's terrace. No itinerary. No crowds. Just forward.",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    slug: null,
    alternatives: [
      { name: "Faroe Islands", why: "Raw, windswept, entirely your own" },
      { name: "Kyrgyzstan", why: "Nomadic routes through the Tian Shan mountains" },
      { name: "Transylvania, Romania", why: "Forgotten fortresses, empty forest roads" },
      { name: "Corsica, France", why: "Maquis-scented mountain passes and hidden coves" },
      { name: "Rila Mountains, Bulgaria", why: "Medieval monasteries with nobody around" },
      { name: "Oman", why: "Desert wadis, empty highways, zero crowds" },
    ],
  },
  "sanctuary-seeker": {
    type: "The Sanctuary Seeker",
    description:
      "You don't want activities. You want to stop. The best travel for you is the kind where you return home feeling like a different person — not because of what you saw, but because of how fully you rested.",
    destination: "Maldives or Seychelles",
    detail:
      "Overwater bungalow. No shoes. A horizon that's just water and sky. Completely private.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    slug: null,
    alternatives: [
      { name: "Bora Bora, French Polynesia", why: "The lagoon that defined the word paradise" },
      { name: "Palawan, Philippines", why: "Limestone cliffs, turquoise coves, total isolation" },
      { name: "Zanzibar, Tanzania", why: "Spice-scented air, white sand, barefoot luxury" },
      { name: "Turks & Caicos", why: "The clearest water in the Atlantic, period" },
      { name: "Tuscany, Italy", why: "A farmhouse, a pool, olive groves and silence" },
      { name: "Lake Bled, Slovenia", why: "Alpine calm without the Alpine crowds" },
    ],
  },
  "deep-explorer": {
    type: "The Deep Explorer",
    description:
      "Based on Plog's allocentric traveler profile: you seek novelty, cultural immersion and authentic contact with local life. You're most satisfied when you're the only foreigner in the room.",
    destination: "Sri Lanka or Morocco",
    detail:
      "Markets that haven't been sanitized for tourists. Temples that still hold meaning. Conversations that change your perspective.",
    image:
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=800&q=80",
    slug: "sri-lanka",
    alternatives: [
      { name: "Georgia (Caucasus)", why: "Ancient wine culture, wild mountains, zero tourism infrastructure" },
      { name: "Ethiopia", why: "Rock-hewn churches, coffee ceremony, one of the oldest civilisations on earth" },
      { name: "Uzbekistan", why: "Silk Road cities — Samarkand and Bukhara unchanged for centuries" },
      { name: "Jordan", why: "Petra at dawn before the crowds, Wadi Rum under the stars" },
      { name: "Nepal", why: "Himalayas, monastery trekking, cultures untouched by mass tourism" },
      { name: "Northern India (Rajasthan)", why: "Forts, desert camps, centuries of layered history" },
    ],
  },
  "luxury-hedonist": {
    type: "The Luxury Hedonist",
    description:
      "Booking.com's 2023 research identifies this as the fastest-growing travel profile: travelers who measure a trip's success entirely by the quality of its pleasures. You don't feel guilty about it — you just want the best.",
    destination: "Mykonos or St. Tropez",
    detail:
      "The beach club where the music is right. The restaurant that requires three months notice. The suite with a private pool.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    slug: "mykonos",
    alternatives: [
      { name: "Monte Carlo, Monaco", why: "The original luxury playground — yachts, casinos, Formula 1" },
      { name: "Portofino, Italy", why: "The Italian Riviera at its most cinematic" },
      { name: "Capri, Italy", why: "Faraglioni rocks, caviar on a speedboat, limoncello at midnight" },
      { name: "Marbella, Spain", why: "Puerto Banús, Michelin dining, Mediterranean warmth" },
      { name: "Dubai, UAE", why: "Skyline suites, private desert dinners, pure spectacle" },
      { name: "Cannes, France", why: "La Croisette, rosé, and the feeling that you belong here" },
    ],
  },
  "culture-hunter": {
    type: "The Culture Hunter",
    description:
      "Cohen's 'experiential tourist' type: you travel to collect meaning, not just sights. Food, art, architecture, and local ritual are your primary currency.",
    destination: "Kyoto, Japan or Lisbon, Portugal",
    detail:
      "A temple that's been there for 1,200 years. A restaurant with no English menu. A neighborhood the guidebooks missed.",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    slug: null,
    alternatives: [
      { name: "Istanbul, Turkey", why: "Two continents, 3,000 years, the finest food in the world" },
      { name: "Buenos Aires, Argentina", why: "Tango, steak, Borges, and a European city built in South America" },
      { name: "Oaxaca, Mexico", why: "Mezcal, mole negro, pre-Columbian ruins, living traditions" },
      { name: "Vienna, Austria", why: "Mozart, Klimt, Freud, coffeehouse culture that never left the 19th century" },
      { name: "Beirut, Lebanon", why: "Mediterranean food capital, layered history, extraordinary resilience" },
      { name: "Tbilisi, Georgia", why: "Polyphonic song, natural wine, architecture from six empires" },
    ],
  },
  "social-explorer": {
    type: "The Social Explorer",
    description:
      "Skyscanner's Horizon Report 2023 identifies 'social travel' as a key emerging trend — travelers who see destinations as backdrops for connection rather than the main event.",
    destination: "Ibiza or Mykonos",
    detail:
      "A sunset session at a world-class beach club. Dinners that start at 10pm. Friendships made on a rooftop at 3am.",
    image:
      "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&q=80",
    slug: null,
    alternatives: [
      { name: "Miami, USA", why: "Art Basel, Wynwood walls, rooftop pools, the best Latin food in the US" },
      { name: "Tulum, Mexico", why: "Jungle clubs, cenotes, and a scene that outgrew itself" },
      { name: "Bali, Indonesia", why: "Seminyak sunset cocktails, Canggu surf crowd, Ubud for balance" },
      { name: "Dubrovnik, Croatia", why: "Old city walls, island hopping, the Adriatic at its bluest" },
      { name: "Hvar, Croatia", why: "Lavender fields by day, fortress terraces by night" },
      { name: "Bodrum, Turkey", why: "Gulet charters, whitewashed harbour, understated Aegean cool" },
    ],
  },
  "conscious-wanderer": {
    type: "The Conscious Wanderer",
    description:
      "You travel thoughtfully. You want to contribute to places you visit, not extract from them. Booking.com's 2023 Sustainable Travel Report found 76% of travelers want to travel more sustainably — you're already there.",
    destination: "Costa Rica or Azores, Portugal",
    detail:
      "A lodge that runs on solar power, surrounded by cloud forest. Diving on a reef that's recovering. Leaving lighter than you arrived.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    slug: null,
    alternatives: [
      { name: "Iceland", why: "100% renewable energy, untouched glaciers, responsible wilderness travel" },
      { name: "New Zealand", why: "Maori culture with consent, conservation landscapes that dwarf Switzerland" },
      { name: "Bhutan", why: "Carbon-negative country, measured tourism, Buddhism woven into daily life" },
      { name: "Rwanda", why: "Gorilla trekking, extraordinary conservation success story" },
      { name: "Galápagos, Ecuador", why: "The living laboratory — wildlife that has no fear of humans" },
      { name: "Norway (Lofoten)", why: "Midnight sun, fishing villages, wild camping with full infrastructure" },
    ],
  },
  "romantic-escapist": {
    type: "The Romantic Escapist",
    description:
      "Travel for you is fundamentally about intimacy — with a person, with a place, with a moment. The trips that matter most are the ones where the world shrank to just two people.",
    destination: "Amalfi Coast or Santorini",
    detail:
      "A table for two at the edge of a cliff. A room with no television. The kind of evening that becomes a reference point for everything after.",
    image:
      "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=800&q=80",
    slug: "amalfi-coast",
    alternatives: [
      { name: "Positano, Italy", why: "Pastel houses tumbling to the sea, no cars, total immersion" },
      { name: "Lake Como, Italy", why: "Villa Balbianello, water taxis, Bellagio at dusk" },
      { name: "Cinque Terre, Italy", why: "Five cliffside villages connected by coastal trails" },
      { name: "Madeira, Portugal", why: "Levada walks, volcanic coastline, wine from the mountain" },
      { name: "Mauritius", why: "Secluded lagoon beaches, indo-french cuisine, warm Indian Ocean" },
      { name: "Ubud, Bali", why: "Rice terrace views, private villa, silence at 6am" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

function getResult(answers: number[]): string {
  const scores: Record<string, number> = {
    "free-spirit": 0,
    "sanctuary-seeker": 0,
    "deep-explorer": 0,
    "luxury-hedonist": 0,
    "culture-hunter": 0,
    "social-explorer": 0,
    "conscious-wanderer": 0,
    "romantic-escapist": 0,
  };

  // [type, points] per answer option (A=0,B=1,C=2,D=3)
  const matrix: Array<Array<[string, number]>> = [
    [["free-spirit", 2], ["sanctuary-seeker", 2], ["deep-explorer", 2], ["luxury-hedonist", 2]],
    [["free-spirit", 2], ["sanctuary-seeker", 2], ["culture-hunter", 2], ["luxury-hedonist", 2]],
    [["conscious-wanderer", 2], ["sanctuary-seeker", 1], ["social-explorer", 2], ["luxury-hedonist", 1]],
    [["free-spirit", 1], ["sanctuary-seeker", 2], ["culture-hunter", 2], ["luxury-hedonist", 2]],
    [["deep-explorer", 2], ["romantic-escapist", 2], ["conscious-wanderer", 2], ["luxury-hedonist", 2]],
  ];

  answers.forEach((ans, qi) => {
    const [type, pts] = matrix[qi][ans];
    scores[type] += pts;
  });

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

const transition = {
  duration: 0.35,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const totalSteps = questions.length;
  const progress = step < totalSteps ? (step / totalSteps) * 100 : 100;

  const resultKey = step === totalSteps ? getResult(answers) : null;
  const result = resultKey ? results[resultKey] : null;

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[step] = idx;
      setAnswers(newAnswers);
      setDirection(1);
      setStep((s) => s + 1);
      setSelected(null);
    }, 400);
  };

  const handleRetake = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setDirection(-1);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "var(--cream)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>

      {/* Top bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200 }}>
        <div style={{ height: "2px", background: "rgba(201,169,110,0.12)" }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ height: "100%", background: "linear-gradient(90deg, #C9A96E, #E8D5B0)" }}
          />
        </div>
        <div style={{ padding: "1rem 1.5rem" }}>
          <Link
            href="/"
            style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", textDecoration: "none", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,169,110,0.55)"; }}
          >
            ← Nomad Privé
          </Link>
        </div>
      </div>

      {/* Main */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "7rem 1.5rem 4rem" }}>
        <AnimatePresence custom={direction} mode="wait">

          {/* ── Questions ── */}
          {step < totalSteps && (
            <motion.div
              key={`q${step}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              style={{ width: "100%", maxWidth: "720px" }}
            >
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "1.5rem", opacity: 0.7, textAlign: "center" }}>
                Question {step + 1} of {totalSteps}
              </p>
              <h1 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, color: "var(--cream)", textAlign: "center", marginBottom: "2.5rem", lineHeight: 1.25 }}>
                {questions[step].question}
              </h1>

              <div className="quiz-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
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
                      <span style={{ display: "block", fontSize: "0.88rem", letterSpacing: "0.02em", lineHeight: 1.5, fontFamily: "var(--font-inter), Inter, sans-serif", paddingRight: isSelected ? "1.5rem" : "0" }}>
                        {opt}
                      </span>
                      {isSelected && (
                        <span style={{ position: "absolute", top: "0.75rem", right: "0.75rem", color: "#C9A96E" }}>
                          <Check size={14} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <p style={{ textAlign: "center", fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)", marginTop: "2.5rem" }}>
                Inspired by travel psychology research
              </p>
            </motion.div>
          )}

          {/* ── Result ── */}
          {step === totalSteps && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", maxWidth: "800px" }}
            >
              {/* Hero image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "3px", overflow: "hidden", marginBottom: "2.5rem", border: "1px solid rgba(201,169,110,0.15)" }}
              >
                <Image src={result.image} alt={result.destination} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.25) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A96E", margin: "0 0 0.3rem" }}>
                    You are:
                  </p>
                  <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2.4rem)", fontWeight: 700, color: "#C9A96E", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {result.type}
                  </h2>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: "2rem", fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontStyle: "italic" }}
              >
                {result.description}
              </motion.p>

              {/* Primary destination */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ background: "#0d0d0d", border: "1px solid #C9A96E", borderRadius: "3px", padding: "2rem", marginBottom: "2rem" }}
              >
                <p style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)", margin: "0 0 0.5rem" }}>
                  Your Perfect Match
                </p>
                <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 700, color: "#C9A96E", margin: "0 0 1rem", lineHeight: 1.2 }}>
                  {result.destination}
                </h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: "0 0 1.25rem", fontWeight: 300 }}>
                  {result.detail}
                </p>
                {result.slug && (
                  <Link
                    href={`/journal/${result.slug}`}
                    style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A96E", textDecoration: "none", borderBottom: "1px solid rgba(201,169,110,0.35)", paddingBottom: "2px" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#C9A96E"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.35)"; }}
                  >
                    Read our journal →
                  </Link>
                )}
              </motion.div>

              {/* Alternatives grid */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                <p style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,169,110,0.5)", marginBottom: "1rem" }}>
                  Also consider
                </p>
                <div
                  className="alt-grid"
                  style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "2.5rem" }}
                >
                  {result.alternatives.map((alt, i) => (
                    <motion.div
                      key={alt.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.07 }}
                      style={{
                        background: "#0d0d0d",
                        border: "1px solid rgba(201,169,110,0.12)",
                        borderRadius: "2px",
                        padding: "1.1rem 1rem",
                      }}
                    >
                      <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 700, color: "var(--cream)", marginBottom: "0.3rem" }}>
                        {alt.name}
                      </div>
                      <div style={{ fontSize: "0.72rem", lineHeight: 1.5, color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>
                        {alt.why}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}
              >
                <Link
                  href="/contact"
                  style={{ display: "inline-block", padding: "0.9rem 2.5rem", background: "transparent", border: "1px solid #C9A96E", color: "#C9A96E", textDecoration: "none", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,169,110,0.1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                >
                  Start Planning This Trip
                </Link>
                <button
                  onClick={handleRetake}
                  style={{ padding: "0.9rem 2rem", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
                >
                  Retake Quiz
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 580px) {
          .quiz-grid { grid-template-columns: 1fr !important; }
          .alt-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 360px) {
          .alt-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
