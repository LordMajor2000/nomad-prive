"use client";

import { useRef, useState, useEffect } from "react";

interface TrailImage {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
  phase: "in" | "out";
}

interface ImageTrailProps {
  containerRef: React.RefObject<HTMLElement>;
}

const DESTINATION_IMAGES = [
  "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=300&q=75", // Sri Lanka
  "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=300&q=75", // Morocco
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300&q=75", // Santorini
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&q=75", // Kyoto
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=300&q=75", // Maldives
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=300&q=75", // Amalfi
];

const THROTTLE_MS = 100;
const MAX_IMAGES = 8;
const FADE_OUT_DELAY = 700;

let imageCounter = 0;

export default function ImageTrail({ containerRef }: ImageTrailProps) {
  const [trailImages, setTrailImages] = useState<TrailImage[]>([]);
  const lastAddedAt = useRef<number>(0);
  const imageIndexRef = useRef<number>(0);
  const timeoutsRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastAddedAt.current < THROTTLE_MS) return;
      lastAddedAt.current = now;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotation = (Math.random() * 16) - 8;
      const src = DESTINATION_IMAGES[imageIndexRef.current % DESTINATION_IMAGES.length];
      imageIndexRef.current += 1;

      const id = ++imageCounter;

      setTrailImages((prev) => {
        const updated = [...prev, { id, x, y, src, rotation, phase: "in" as const }];
        return updated.length > MAX_IMAGES ? updated.slice(updated.length - MAX_IMAGES) : updated;
      });

      const timeout = setTimeout(() => {
        setTrailImages((prev) => prev.filter((img) => img.id !== id));
        timeoutsRef.current.delete(id);
      }, FADE_OUT_DELAY + 300);

      timeoutsRef.current.set(id, timeout);
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current.clear();
    };
  }, [containerRef]);

  return (
    <>
      <style>{`
        @keyframes trailIn {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(var(--rot));
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(var(--rot));
          }
        }
        @keyframes trailOut {
          from {
            opacity: 1;
            transform: scale(1) rotate(var(--rot));
          }
          to {
            opacity: 0;
            transform: scale(0.92) rotate(var(--rot));
          }
        }
        .trail-image-enter {
          animation: trailIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                     trailOut 0.35s cubic-bezier(0.4, 0, 1, 1) ${FADE_OUT_DELAY}ms forwards;
        }
      `}</style>
      {trailImages.map((img) => (
        <img
          key={img.id}
          src={img.src}
          alt=""
          className="trail-image-enter"
          style={{
            position: "absolute",
            left: img.x,
            top: img.y,
            width: 120,
            height: 80,
            objectFit: "cover",
            transform: `translate(-50%, -50%) rotate(${img.rotation}deg)`,
            "--rot": `${img.rotation}deg`,
            zIndex: 10,
            pointerEvents: "none",
            borderRadius: 4,
            willChange: "opacity, transform",
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}
