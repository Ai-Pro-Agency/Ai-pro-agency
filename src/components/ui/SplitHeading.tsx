"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045 },
  },
};

const word = {
  hidden: { opacity: 0, y: "0.6em", rotate: 1 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Wrap a phrase in <accent>...</accent> within `text` to render it in the
 * italic accent-color treatment instead of the plain heading style.
 */
function parseTokens(text: string) {
  const parts = text.split(/(<accent>.*?<\/accent>)/g).filter(Boolean);
  const tokens: { word: string; accent: boolean }[] = [];
  for (const part of parts) {
    const match = part.match(/^<accent>(.*)<\/accent>$/);
    const content = match ? match[1] : part;
    const isAccent = !!match;
    content
      .trim()
      .split(" ")
      .filter(Boolean)
      .forEach((w) => tokens.push({ word: w, accent: isAccent }));
  }
  return tokens;
}

export function SplitHeading({
  text,
  as: Tag = "h1",
  className,
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const tokens = parseTokens(text);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className={clsx("flex flex-wrap", className)}
    >
      <Tag className="sr-only">{text.replace(/<\/?accent>/g, "")}</Tag>
      <span aria-hidden className="flex flex-wrap items-baseline">
        {tokens.map((t, i) => (
          <motion.span
            key={`${t.word}-${i}`}
            variants={word}
            className={clsx(
              "mr-[0.28em] inline-block overflow-visible",
              t.accent && "font-serif-hero-accent text-accent-dark"
            )}
          >
            {t.word}
          </motion.span>
        ))}
      </span>
    </motion.div>
  );
}
