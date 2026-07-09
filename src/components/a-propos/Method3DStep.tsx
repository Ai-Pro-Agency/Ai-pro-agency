"use client";

import { ReactNode, useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import clsx from "clsx";

export function Method3DStep({
  index,
  title,
  description,
  icon,
  align = "left",
}: {
  index: number;
  title: string;
  description: string;
  icon: ReactNode;
  align?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [55, 0]);
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [70, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const shadowOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 0.28]);
  const boxShadow = useTransform(
    shadowOpacity,
    (v) => `0 ${24 + v * 40}px ${40 + v * 60}px -20px rgba(23,20,15,${v})`
  );

  return (
    <div
      ref={ref}
      className={clsx(
        "relative w-full max-w-xl",
        align === "right" ? "ml-auto" : "mr-auto"
      )}
      style={{ perspective: 1400 }}
    >
      <m.div
        style={{
          rotateX,
          y,
          opacity,
          transformPerspective: 1400,
          transformOrigin: "50% 100%",
          boxShadow,
        }}
        className="relative overflow-hidden rounded-[28px] border border-accent-light/25 bg-white p-8 sm:p-10"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px opacity-80"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-accent-light), transparent)",
          }}
        />
        <div className="flex items-start gap-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-accent-light ring-1 ring-inset ring-accent/40">
            {icon}
          </span>
          <div>
            <span className="font-serif-display text-5xl leading-none text-accent-light/40">
              {String(index).padStart(2, "0")}
            </span>
            <p className="mt-2 font-serif-display text-xl text-ink sm:text-2xl">{title}</p>
            <p className="mt-3 leading-relaxed text-ink-soft">{description}</p>
          </div>
        </div>
      </m.div>
    </div>
  );
}
