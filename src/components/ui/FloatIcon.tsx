"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export function FloatIcon({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      className="inline-flex"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
