"use client";

import { ReactNode, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import clsx from "clsx";

export type BlockColor = "beige" | "brown" | "rose" | "green" | "accent";

const ACCENT_VARS: Record<BlockColor, string> = {
  beige: "var(--color-beige-dark)",
  brown: "var(--color-brown)",
  rose: "var(--color-rose-dark)",
  green: "var(--color-green-dark)",
  accent: "var(--color-accent)",
};

const RING_GRADIENTS: Record<BlockColor, string> = {
  beige:
    "conic-gradient(from 0deg, var(--color-beige-dark), var(--color-accent), var(--color-brown), var(--color-rose), var(--color-beige-dark))",
  brown:
    "conic-gradient(from 0deg, var(--color-brown), var(--color-rose-dark), var(--color-accent), var(--color-beige-dark), var(--color-brown))",
  rose:
    "conic-gradient(from 0deg, var(--color-rose-dark), var(--color-accent), var(--color-green-dark), var(--color-beige), var(--color-rose-dark))",
  green:
    "conic-gradient(from 0deg, var(--color-green-dark), var(--color-beige-dark), var(--color-accent), var(--color-rose), var(--color-green-dark))",
  accent:
    "conic-gradient(from 0deg, var(--color-accent), var(--color-rose-dark), var(--color-green-dark), var(--color-beige-dark), var(--color-accent))",
};

export function PosterCard({
  children,
  blockColor = "accent",
  className,
}: {
  children: ReactNode;
  /** @deprecated kept for backward compatibility, no longer applies a static tilt */
  rotate?: number;
  blockColor?: BlockColor;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT_VARS[blockColor];
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 200, damping: 24 });
  const springY = useSpring(y, { stiffness: 200, damping: 24 });
  const rotateX = useTransform(springY, [0, 1], reduceMotion ? [0, 0] : [6, -6]);
  const rotateY = useTransform(springX, [0, 1], reduceMotion ? [0, 0] : [-6, 6]);
  const glowX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(y, [0, 1], ["0%", "100%"]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
    setHovered(false);
  }

  const ringSpinning = hovered && !reduceMotion;

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ y: reduceMotion ? 0 : -10, scale: reduceMotion ? 1 : 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative h-full overflow-hidden rounded-[28px] p-[1.5px]"
    >
      {/* Living gradient ring, spins continuously while hovered (static under reduced motion) */}
      <motion.div
        aria-hidden
        className="absolute inset-[-40%]"
        style={{ background: RING_GRADIENTS[blockColor] }}
        animate={{ rotate: ringSpinning ? 360 : 0 }}
        transition={
          ringSpinning
            ? { duration: 4, repeat: Infinity, ease: "linear" }
            : { duration: 0.5, ease: "easeOut" }
        }
      />

      <div
        className={clsx(
          "relative h-full overflow-hidden rounded-[26.5px] border border-ink/5 bg-white transition-shadow duration-300",
          className
        )}
        style={{
          boxShadow:
            "0 1px 2px rgba(23,20,15,0.05), 0 12px 24px -8px rgba(23,20,15,0.10), 0 32px 56px -20px rgba(23,20,15,0.14)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] opacity-60 transition-opacity duration-300 group-hover:opacity-0"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(380px circle at ${glowX} ${glowY}, color-mix(in srgb, ${accent} 18%, transparent), transparent 65%)`,
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </motion.div>
  );
}
