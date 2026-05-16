"use client";

import { motion } from "framer-motion";

const Cross = ({ size, opacity = 0.16 }: { size: number; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
    <line x1="12" y1="1" x2="12" y2="23" stroke={`rgba(201,169,110,${opacity})`} strokeWidth="0.7" />
    <line x1="1" y1="12" x2="23" y2="12" stroke={`rgba(201,169,110,${opacity})`} strokeWidth="0.7" />
  </svg>
);

const Circle = ({ size, opacity = 0.11 }: { size: number; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: "block" }}>
    <circle cx="20" cy="20" r="18" fill="none" stroke={`rgba(201,169,110,${opacity})`} strokeWidth="0.7" />
  </svg>
);

const Diamond = ({ size, opacity = 0.13 }: { size: number; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
    <rect x="5" y="5" width="14" height="14" fill="none" stroke={`rgba(201,169,110,${opacity})`} strokeWidth="0.7" transform="rotate(45 12 12)" />
  </svg>
);

/* Spread shapes across the full viewport — varied positions */
const shapes = [
  /* top zone */
  { Shape: Cross,   size: 30, x: "4%",  y: "8%",  delay: 0,   duration: 14, dy: 16, rotate: 12  },
  { Shape: Circle,  size: 50, x: "90%", y: "5%",  delay: 1.8, duration: 20, dy: 12, rotate: 0   },
  { Shape: Diamond, size: 20, x: "55%", y: "12%", delay: 0.5, duration: 13, dy: 14, rotate: 22  },
  /* mid-top zone */
  { Shape: Cross,   size: 18, x: "78%", y: "28%", delay: 2.2, duration: 16, dy: 10, rotate: 8   },
  { Shape: Circle,  size: 34, x: "15%", y: "32%", delay: 0.9, duration: 18, dy: 16, rotate: 0   },
  { Shape: Diamond, size: 15, x: "40%", y: "38%", delay: 3.1, duration: 11, dy: 8,  rotate: 18  },
  /* mid zone */
  { Shape: Cross,   size: 24, x: "6%",  y: "52%", delay: 1.4, duration: 15, dy: 18, rotate: 20  },
  { Shape: Circle,  size: 44, x: "86%", y: "48%", delay: 0.3, duration: 22, dy: 10, rotate: 0   },
  { Shape: Diamond, size: 18, x: "62%", y: "56%", delay: 2.7, duration: 14, dy: 12, rotate: 30  },
  /* mid-low zone */
  { Shape: Cross,   size: 14, x: "30%", y: "65%", delay: 3.5, duration: 12, dy: 8,  rotate: 6   },
  { Shape: Circle,  size: 28, x: "48%", y: "70%", delay: 1.1, duration: 19, dy: 14, rotate: 0   },
  { Shape: Diamond, size: 12, x: "8%",  y: "78%", delay: 4.0, duration: 10, dy: 6,  rotate: 15  },
  /* bottom zone */
  { Shape: Cross,   size: 20, x: "70%", y: "84%", delay: 2.0, duration: 17, dy: 12, rotate: 10  },
  { Shape: Circle,  size: 38, x: "22%", y: "88%", delay: 0.6, duration: 21, dy: 10, rotate: 0   },
  { Shape: Diamond, size: 16, x: "93%", y: "78%", delay: 3.3, duration: 13, dy: 8,  rotate: 25  },
];

export default function FloatingShapes() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      overflow: "hidden",
      zIndex: 1,
    }} aria-hidden="true">
      {shapes.map(({ Shape, size, x, y, delay, duration, dy, rotate }, i) => (
        <motion.div
          key={i}
          style={{ position: "absolute", left: x, top: y, willChange: "transform" }}
          animate={{
            y: [0, -dy, 0],
            rotate: [0, rotate, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shape size={size} />
        </motion.div>
      ))}
    </div>
  );
}
