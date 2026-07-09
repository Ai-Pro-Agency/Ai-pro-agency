"use client";

import { ReactNode } from "react";
import { LazyMotion, domMax } from "framer-motion";

// framer-motion's full `motion` component bundles every feature (drag,
// layout animations, pan...) synchronously whether a page uses them or not.
// ProjectsGrid's sector-filter pill relies on layout animations, which
// need the domMax feature set specifically (domAnimation excludes them).
// LazyMotion + the `m` component (used everywhere instead of `motion`)
// still loads this as a separate async chunk instead of bundling it
// eagerly into the main JS.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
