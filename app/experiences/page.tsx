"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const categories = ["All", "Gastronomy", "Adventure", "Culture", "Luxury"] as const;
type Category = (typeof categories)[number];

interface Experience {
  id: string;
  title: string;
  locations: string[];
  hook: string;
  description: string;
  categories: Category[];
  image: string;
  duration: string;
}

const experiences: Experience[] = [
  {
    id: "rum-cigar",
    title: "Rum & Cigar Circuit",
    locations: ["Panama", "Costa Rica"],
    hook: "Follow rum from cane field to glass — with a Cohiba burning the whole way.",
    description:
      "Panama City for the Canal and Panamanian rum culture, then north to Costa Rica's Guanacaste to visit private sugar estates. We arrange master blending sessions, private rolling rooms where your cigar is made to order, sunset tastings on a hacienda terrace, and a private gulet dinner on the Pacific.",
    categories: ["Gastronomy", "Culture"],
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&q=85",
    duration: "8–12 days",
  },
  {
    id: "supercar",
    title: "Supercar Coastal Drive",
    locations: ["Monaco", "Italian Riviera", "Tuscany"],
    hook: "Your Ferrari on the Côte d'Azur. A track day at Circuit Paul Ricard. Portofino by water taxi.",
    description:
      "We select and pre-position the car of your choice — Ferrari 488, Lamborghini Huracán, Porsche GT3 — in Monaco. You drive the Grande Corniche, the Stelvio Pass variant, or the roads to Portofino. We arrange the route, fuel stops, overnight at a cliff-side hotel in Eze, a private track session, and helicopter return. Zero logistics. Maximum drive.",
    categories: ["Adventure", "Luxury"],
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=85",
    duration: "5–7 days",
  },
  {
    id: "whisky",
    title: "Private Whisky Trail",
    locations: ["Scottish Highlands", "Speyside", "Islay"],
    hook: "After-hours access to distilleries that don't normally open their doors.",
    description:
      "A circuit through Scotland's whisky heartland: Glenfarclas, Springbank, Bruichladdich on Islay. We arrange distillery access during non-public hours, barrel selection sessions where you nose from the cask, private tastings led by the master distiller, and accommodation in converted estate farmhouses with peat fires. A case of your selections ships home.",
    categories: ["Gastronomy", "Culture"],
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=900&q=85",
    duration: "6–9 days",
  },
  {
    id: "safari",
    title: "Private Safari, Masai Mara",
    locations: ["Kenya", "Tanzania"],
    hook: "No other vehicles. Just you, a Masai guide, and the migration at dawn.",
    description:
      "A mobile camp that moves with the wildebeest migration. No fixed lodges, no shared game drives. Your guide is a third-generation Masai tracker who reads the grass, not a GPS. Fly into Nairobi, helicopter to the plains, five nights in a camp with eight guest tents maximum. Evenings around a fire with a blanket of Milky Way above.",
    categories: ["Adventure", "Culture"],
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=900&q=85",
    duration: "7–10 days",
  },
  {
    id: "harvest",
    title: "Harvest Week, Tuscany",
    locations: ["Chianti", "Montalcino", "Val d'Orcia"],
    hook: "Sleep in a 16th-century estate. Wake up to pick grapes with the family who owns it.",
    description:
      "October in Tuscany during the vendemmia. We place you in an estate that still operates as a working winery — not a hotel that used to be one. You join the harvest at dawn, attend a private bottling session in the cantina, take lunch with the winemaker's family, and spend evenings doing blind tastings of vintages going back 30 years. Cooking lessons with the estate's nonna on request.",
    categories: ["Gastronomy", "Culture"],
    image: "https://images.unsplash.com/photo-1518991669955-9c7e78ec80ca?w=900&q=85",
    duration: "6–8 days",
  },
  {
    id: "heli-ski",
    title: "Heli-skiing, Verbier",
    locations: ["Verbier", "Zermatt", "Switzerland"],
    hook: "A helicopter drops you on virgin powder. A private chalet and fondue wait below.",
    description:
      "Switzerland's most serious off-piste. A certified mountain guide pre-selects drops based on snow condition that week — this is not scripted tourism, it's genuine alpine exploration. Private helicopter, 4–6 drops per day, a chalet with a private chef and outdoor hot tub at altitude. Ski instructors available for warm-up days. Best: January through March.",
    categories: ["Adventure", "Luxury"],
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=900&q=85",
    duration: "5–7 days",
  },
  {
    id: "omakase",
    title: "Omakase Circuit, Tokyo",
    locations: ["Tokyo", "Kyoto", "Japan"],
    hook: "Three Michelin restaurants in four nights. Counter seats most people wait two years for.",
    description:
      "We use our Japanese connections to secure omakase counter seats at three-Michelin-starred restaurants that don't take international reservations directly. Sushi Yoshitake. Saito. Fujiya 1935 in Osaka for the road trip leg. Between meals: a private sake brewery in Nada, Tsukiji inner market at 5am with a retired tuna auctioneer, a 17th-century Kyoto ryokan where breakfast takes an hour.",
    categories: ["Gastronomy", "Culture"],
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&q=85",
    duration: "10–14 days",
  },
  {
    id: "sailing",
    title: "Sailing Week, Greek Islands",
    locations: ["Santorini", "Milos", "Folegandros"],
    hook: "A private gulet, seven hidden anchorages, and Santorini at sunset on day five.",
    description:
      "A private 24-metre gulet with a crew of four, sailing the less-visited Cyclades. Not Mykonos, not the tourist trail — we chart a course through Milos's lunar coastline, the clifftop villages of Folegandros, the thermal springs of Nisyros, and arrive in Oia for the final sunset. Daily snorkelling in water you'll have entirely to yourself. A chef who adjusts every meal to the catch of the morning.",
    categories: ["Luxury", "Adventure"],
    image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=900&q=85",
    duration: "7 days",
  },
  {
    id: "northern-lights",
    title: "Northern Lights Expedition",
    locations: ["Tromsø, Norway", "Svalbard"],
    hook: "A private wilderness lodge. A forecast chaser. A sky that defies description.",
    description:
      "Based in a private lodge outside Tromsø with floor-to-ceiling north-facing glass. A dedicated aurora guide monitors the Kp-index daily — when the conditions are right, you're woken at 2am and driven to a pre-selected dark sky location. Snowmobile safaris to find reindeer herds. Dog-sledding at 7am. Return by private charter, rested, with footage you won't stop watching for years.",
    categories: ["Adventure", "Culture"],
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=85",
    duration: "5–7 days",
  },
  {
    id: "coffee-ethiopia",
    title: "Coffee Origin Tour, Ethiopia",
    locations: ["Yirgacheffe", "Addis Ababa", "Kaffa"],
    hook: "In the birthplace of coffee, drink it from the farmers who grew it.",
    description:
      "Ethiopia invented coffee. We take you back to where it happened: the Kaffa forest in the south, the high-altitude farms of Yirgacheffe, a roasting ceremony in a farmhouse with no electricity. In Addis Ababa, a private session at a specialty roastery tracing each lot back to its origin. Then a full traditional buna ceremony conducted by the farmer's wife. This is not a coffee tour — it's a conversation with the source.",
    categories: ["Gastronomy", "Culture"],
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=85",
    duration: "8–10 days",
  },
  {
    id: "truffle",
    title: "Truffle Season, Périgord",
    locations: ["Périgord Noir", "Dordogne", "France"],
    hook: "A truffle dog leads you through oak forest. A two-star chef cooks what you find.",
    description:
      "November to February in the Dordogne — black truffle season. We arrange a hunt at dawn with a family who has worked this ground for four generations, followed by a full-day cooking session with a Michelin-starred chef who turns your harvest into a menu. Stay in a château with its own kitchen garden. Market morning in Sarlat where locals still come to trade.",
    categories: ["Gastronomy", "Culture"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85",
    duration: "4–6 days",
  },
  {
    id: "sake",
    title: "Sake Brewery Circuit, Japan",
    locations: ["Nada, Hyogo", "Fushimi, Kyoto"],
    hook: "Private brewery access, kimono fittings, and a 100-year-old tasting cellar.",
    description:
      "Japan's finest sake regions, approached from the inside. We arrange access to Hakutsuru and Gekkeikan during their quiet winter brewing season, with sessions led by the toji (master brewer) rather than a tour guide. A private sake sommelier joins you for evenings in Gion's old machiya townhouses. Optional extension: a two-day stay at a sake-pairing ryokan in the mountains above Kyoto.",
    categories: ["Gastronomy", "Culture"],
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&q=85",
    duration: "7–10 days",
  },
];

export default function ExperiencesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
    });
    return () => ctx.revert();
  }, []);

  const filtered = activeCategory === "All"
    ? experiences
    : experiences.filter((e) => e.categories.includes(activeCategory));

  return (
    <main style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navigation />

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        style={{ padding: "13rem clamp(1.5rem, 5vw, 4rem) 5rem", maxWidth: "1400px", margin: "0 auto", opacity: 0 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ width: "40px", height: "1px", background: "var(--gold-primary)" }} />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-primary)" }}>
            Special Experiences
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "var(--cream)", margin: "0 0 1.5rem", lineHeight: 1.1 }}>
          The Trips That{" "}
          <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>Can't Be Googled</em>
        </h1>
        <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", lineHeight: 1.8, color: "var(--muted)", maxWidth: "560px", fontWeight: 300 }}>
          These aren't packages you book. They're experiences we've designed from the inside — built on access, relationships, and a refusal to settle for what's available to everyone.
        </p>
      </div>

      {/* ── CATEGORY FILTER ── */}
      <div style={{ padding: "0 clamp(1.5rem, 5vw, 4rem) 3rem", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.5rem 1.25rem",
                background: activeCategory === cat ? "rgba(201,169,110,0.12)" : "transparent",
                border: `1px solid ${activeCategory === cat ? "rgba(201,169,110,0.5)" : "rgba(201,169,110,0.15)"}`,
                color: activeCategory === cat ? "var(--gold-primary)" : "var(--muted)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderRadius: "1px",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.35)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--cream)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,169,110,0.15)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── EXPERIENCES GRID ── */}
      <div style={{ padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)", maxWidth: "1400px", margin: "0 auto" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}
            className="exp-grid"
          >
            {filtered.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onMouseEnter={() => setHovered(exp.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: "var(--bg-surface)",
                  border: `1px solid ${hovered === exp.id ? "rgba(201,169,110,0.3)" : "rgba(201,169,110,0.08)"}`,
                  borderRadius: "2px",
                  overflow: "hidden",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                  transform: hovered === exp.id ? "translateY(-4px)" : "translateY(0)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.6s ease", transform: hovered === exp.id ? "scale(1.04)" : "scale(1)" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.1) 60%, transparent 100%)" }} />

                  {/* Category tags */}
                  <div style={{ position: "absolute", top: "1rem", left: "1rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {exp.categories.map((cat) => (
                      <span
                        key={cat}
                        style={{
                          fontSize: "0.55rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          background: "rgba(0,0,0,0.6)",
                          color: "var(--gold-primary)",
                          padding: "0.2rem 0.6rem",
                          border: "1px solid rgba(201,169,110,0.25)",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Duration badge */}
                  <div style={{ position: "absolute", bottom: "1rem", right: "1rem", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", background: "rgba(0,0,0,0.5)", padding: "0.25rem 0.6rem", backdropFilter: "blur(4px)" }}>
                    {exp.duration}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Locations */}
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                    {exp.locations.map((loc, j) => (
                      <span key={loc} style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-primary)", opacity: 0.7 }}>
                        {loc}{j < exp.locations.length - 1 ? " ·" : ""}
                      </span>
                    ))}
                  </div>

                  <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--cream)", margin: "0 0 0.75rem", lineHeight: 1.2 }}>
                    {exp.title}
                  </h2>

                  <p style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "0.88rem", fontStyle: "italic", color: "var(--gold-primary)", margin: "0 0 1rem", lineHeight: 1.5 }}>
                    {exp.hook}
                  </p>

                  <div style={{ width: "30px", height: "1px", background: "rgba(201,169,110,0.25)", margin: "0 0 1rem" }} />

                  <p style={{ fontSize: "0.83rem", lineHeight: 1.8, color: "var(--muted)", margin: "0 0 1.5rem", fontWeight: 300, flex: 1 }}>
                    {exp.description}
                  </p>

                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--gold-primary)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(201,169,110,0.3)",
                      paddingBottom: "2px",
                      width: "fit-content",
                      transition: "gap 0.2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "0.8rem"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "0.5rem"; }}
                  >
                    Ask about this experience →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── BESPOKE CTA ── */}
      <section style={{ background: "#060606", borderTop: "1px solid rgba(201,169,110,0.06)", padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold-primary)", marginBottom: "1.5rem", opacity: 0.7 }}>
            Don't see what you're looking for?
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "var(--cream)", margin: "0 0 1.25rem", lineHeight: 1.2 }}>
            We Build Experiences<br />
            <em style={{ color: "var(--gold-primary)", fontStyle: "italic" }}>From Scratch.</em>
          </h2>
          <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", lineHeight: 1.8, color: "var(--muted)", maxWidth: "500px", margin: "0 auto 2.5rem", fontWeight: 300 }}>
            Have a specific idea — a sport, a drink, an obsession, a place? Tell us, and we'll build an experience around it.
          </p>
          <Link
            href="/contact"
            style={{ display: "inline-block", padding: "1rem 3rem", background: "transparent", border: "1px solid rgba(201,169,110,0.5)", color: "var(--gold-primary)", textDecoration: "none", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,169,110,0.08)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gold-primary)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.5)"; }}
          >
            Tell Us Your Dream
          </Link>
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 500px) { .exp-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <Footer />
    </main>
  );
}
