"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        scaleX,
        transformOrigin: "left",
        background: "linear-gradient(90deg, var(--gold-primary), var(--gold-light), var(--gold-primary))",
        zIndex: 9998,
        pointerEvents: "none",
      }}
    />
  );
}
