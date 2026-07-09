"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { TiltCard } from "@/components/ui/TiltCard";
import { SparkleFlower } from "@/components/icons/SparkleFlower";
import { FloatIcon } from "@/components/ui/FloatIcon";

export function FounderPhoto() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Depth parallax as the frame travels through the viewport: it swings in
  // 3D on its way past rather than just sliding, on top of the existing
  // cursor tilt from TiltCard.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [-14, 0, 14]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [-40, 0, -40]);

  return (
    <div ref={wrapRef} className="relative mx-auto max-w-xs sm:max-w-sm" style={{ perspective: 1600 }}>
      {/* Confetti flottant autour du cadre, apparaît après que la photo se soit posée */}
      <FloatIcon delay={0}>
        <m.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.05, type: "spring", stiffness: 260, damping: 16 }}
          className="absolute -left-6 -top-6 block h-9 w-9 sm:h-11 sm:w-11"
        >
          <SparkleFlower className="h-full w-full drop-shadow-[0_0_6px_rgba(219,163,160,0.5)]" />
        </m.span>
      </FloatIcon>
      <FloatIcon delay={1}>
        <m.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 16 }}
          className="absolute -right-4 top-10 block h-5 w-5 rounded-full bg-green shadow-3d sm:h-6 sm:w-6"
        />
      </FloatIcon>
      <FloatIcon delay={1.8}>
        <m.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.35, type: "spring", stiffness: 260, damping: 16 }}
          className="absolute -left-4 bottom-16 block h-4 w-4 rounded-full bg-beige-dark shadow-3d"
        />
      </FloatIcon>

      {/* Éclat doré qui pulse une fois derrière le cadre à l'apparition */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,163,92,0.55), transparent 65%)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={reduceMotion ? { opacity: 0 } : { opacity: [0, 0.9, 0], scale: [0.5, 1.35, 1.5] }}
        transition={{ duration: 1.1, ease: "easeOut", times: [0, 0.35, 1] }}
      />

      <m.div
        initial={{ opacity: 0, scale: 0.55, rotate: reduceMotion ? -4 : -55 }}
        animate={{ opacity: 1, scale: 1, rotate: -4 }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 170, damping: 18, delay: reduceMotion ? 0 : 0.05 }}
        style={{ rotateY, z: translateZ, transformPerspective: 1600 }}
      >
        <TiltCard className="shadow-3d rounded-lg bg-white p-3 pb-9">
          <div className="relative overflow-hidden rounded-sm bg-ink">
            <m.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/jerome-portrait.jpg"
                alt="Jérôme, fondateur d'AI Pro Agency"
                width={464}
                height={572}
                className="h-auto w-full object-cover"
                priority
              />
            </m.div>
            {/* Reflet lumineux qui balaie la photo une fois qu'elle est révélée */}
            {!reduceMotion && (
              <m.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.55) 50%, transparent 58%)",
                }}
                initial={{ x: "-130%" }}
                animate={{ x: "130%" }}
                transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </div>
          <p className="mt-3 text-center font-serif-display text-sm text-ink-soft">
            Jérôme, fondateur
          </p>
        </TiltCard>
      </m.div>

      <m.div
        initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 18 }}
        className="absolute -bottom-5 -right-5"
      >
        <div className="relative">
          <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-full bg-green" />
          <div className="relative whitespace-nowrap rounded-full border-2 border-ink bg-rose px-4 py-2 text-sm font-bold text-ink">
            👋 Fondateur
          </div>
        </div>
      </m.div>
    </div>
  );
}
