"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function FloatIcon({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="inline-flex"
      animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
