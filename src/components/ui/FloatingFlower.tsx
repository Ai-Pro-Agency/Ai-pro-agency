"use client";

import { m, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { SparkleFlower } from "@/components/icons/SparkleFlower";

export function FloatingFlower({
  className,
  size = 40,
  duration = 8,
  delay = 0,
  opacity = 0.7,
}: {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  opacity?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      aria-hidden
      className={clsx("pointer-events-none absolute", className)}
      style={{ opacity }}
      animate={reduceMotion ? undefined : { y: [0, -14, 0], rotate: [0, 14, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <SparkleFlower style={{ width: size, height: size }} />
    </m.div>
  );
}
