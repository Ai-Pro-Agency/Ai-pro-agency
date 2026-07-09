"use client";

import { ReactNode, useRef, useState } from "react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import clsx from "clsx";

export type BlockColor = "beige" | "brown" | "rose" | "green" | "accent";

export function PosterCard({
  children,
  className,
}: {
  children: ReactNode;
  /** @deprecated kept for backward compatibility, no longer applies a static tilt */
  rotate?: number;
  /** @deprecated card border is now a single gold hairline regardless of color, for a restrained luxury line language */
  blockColor?: BlockColor;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
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

  return (
    <m.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ y: reduceMotion ? 0 : -10, scale: reduceMotion ? 1 : 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative h-full overflow-hidden rounded-[28px]"
    >
      <div
        className={clsx(
          "relative h-full overflow-hidden rounded-[28px] border bg-gradient-to-b from-white to-[#faf7f0] transition-colors duration-300",
          hovered ? "border-accent-light/80" : "border-accent-light/35",
          className
        )}
        style={{
          boxShadow:
            "0 2px 4px rgba(23,20,15,0.06), 0 16px 32px -10px rgba(23,20,15,0.16), 0 40px 72px -24px rgba(23,20,15,0.22)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 opacity-80"
          style={{ height: "2px", background: "linear-gradient(90deg, transparent, var(--color-accent-light), transparent)" }}
        />
        <m.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(380px circle at ${glowX} ${glowY}, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 65%)`,
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </m.div>
  );
}
