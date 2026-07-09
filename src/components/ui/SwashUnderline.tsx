"use client";

import { m } from "framer-motion";
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
      viewBox="0 0 160 12"
      className={clsx("h-3 w-28 sm:h-3.5 sm:w-36", className)}
      fill="none"
    >
      <m.line
        x1="0"
        y1="6"
        x2="66"
        y2="6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <m.rect
        x="76"
        y="2"
        width="8"
        height="8"
        transform="rotate(45 80 6)"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.5 }}
      />
      <m.line
        x1="94"
        y1="6"
        x2="160"
        y2="6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
