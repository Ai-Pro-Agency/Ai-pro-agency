"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { m } from "framer-motion";

const SESSION_KEY = "aipro-intro-seen";
const LOAD_DURATION = 1100;
const HOLD = 250;
const EXIT_DURATION = 900;

const easeCurtain = [0.76, 0, 0.24, 1] as const;

export function IntroOverlay() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY)) return;

    // Deferred to the client: sessionStorage isn't available during server render,
    // so whether to show the intro can only be decided post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / LOAD_DURATION) * 100));
      setPercent(pct);
      if (elapsed < LOAD_DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setExiting(true), HOLD);
      }
    }
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    if (!exiting) return;
    const timeout = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      window.sessionStorage.setItem(SESSION_KEY, "1");
    }, EXIT_DURATION);
    return () => clearTimeout(timeout);
  }, [exiting]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden>
      <m.div
        className="absolute inset-x-0 top-0 h-1/2 bg-ink"
        animate={exiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: EXIT_DURATION / 1000, ease: easeCurtain }}
      />
      <m.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
        animate={exiting ? { y: "100%" } : { y: 0 }}
        transition={{ duration: EXIT_DURATION / 1000, ease: easeCurtain }}
      />

      <m.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5"
        animate={exiting ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeIn" }}
      >
        <m.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/logo-light.png"
            alt="AI Pro Agency"
            width={300}
            height={204}
            priority
            className="block h-36 w-auto drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)] sm:h-56"
          />
        </m.div>

        <div className="flex flex-col items-center gap-3">
          <p className="font-sans text-sm tabular-nums tracking-[0.3em] text-accent-light">
            {percent}%
          </p>
          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-cream/15 sm:w-56">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-light transition-[width] duration-100 ease-linear"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </m.div>
    </div>
  );
}
