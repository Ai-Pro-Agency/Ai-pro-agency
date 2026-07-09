"use client";

import { ReactNode } from "react";
import { m } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export function Reveal({ children, delay = 0, className, y = 24 }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y, scale: 0.94, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </m.div>
  );
}

const groupContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const groupItem = {
  hidden: { opacity: 0, y: 36, scale: 0.9, rotate: -1.5, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={groupContainer}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div variants={groupItem} className={className}>
      {children}
    </m.div>
  );
}
