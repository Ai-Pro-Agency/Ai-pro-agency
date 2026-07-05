"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export function SwashUnderline({
  color = "var(--color-accent)",
  className,
  delay = 0,
}: {
  color?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 34"
      className={clsx("h-4 w-32 sm:h-5 sm:w-44", className)}
      fill="none"
    >
      <motion.path
        d="M4 6 C 40 26, 90 26, 120 10 C 138 0, 158 4, 168 16 C 174 23, 184 25, 196 18 C 204 13, 210 15, 214 22"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
