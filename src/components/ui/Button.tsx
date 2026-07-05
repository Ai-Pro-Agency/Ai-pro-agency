"use client";

import { ReactNode, CSSProperties, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-accent hover:text-ink",
  secondary: "bg-accent text-ink hover:bg-accent-dark hover:text-cream",
  ghost:
    "bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink/5",
};

const variantLipStyle: Record<Variant, CSSProperties | undefined> = {
  primary: { boxShadow: "0 4px 0 0 var(--color-brown-dark)" },
  secondary: { boxShadow: "0 4px 0 0 var(--color-accent-dark)" },
  ghost: undefined,
};

const MAGNET_STRENGTH = 0.3;
const MAGNET_MAX = 10;

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  onClick?: never;
  target?: string;
  rel?: string;
}

interface ClickButtonProps extends BaseProps {
  href?: never;
  onClick: () => void;
  type?: "button" | "submit";
}

export function Button(props: LinkButtonProps | ClickButtonProps) {
  const { children, variant = "primary", className } = props;
  const ref = useRef<HTMLElement>(null);

  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const springX = useSpring(magX, { stiffness: 200, damping: 15 });
  const springY = useSpring(magY, { stiffness: 200, damping: 15 });

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    magX.set(Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, relX * MAGNET_STRENGTH)));
    magY.set(Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, relY * MAGNET_STRENGTH)));
  }

  function handleMouseLeave() {
    magX.set(0);
    magY.set(0);
  }

  const classes = clsx(
    "font-script inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-lg font-bold transition-colors duration-200",
    variantClasses[variant],
    className
  );

  const motionProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
    style: { ...variantLipStyle[variant], x: springX, y: springY },
  };

  if ("href" in props && props.href) {
    return (
      <MotionLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={props.href}
        className={classes}
        target={props.target}
        rel={props.rel}
        {...motionProps}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={"type" in props ? props.type ?? "button" : "button"}
      onClick={"onClick" in props ? props.onClick : undefined}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
