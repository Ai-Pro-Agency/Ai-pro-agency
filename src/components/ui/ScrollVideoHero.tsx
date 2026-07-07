"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export interface ScrollVideoPanel {
  key: string;
  eyebrow: string;
  title: ReactNode;
  lede: string;
  revealStart: number;
  revealEnd: number;
  revealFrom: "up" | "down" | "left" | "right";
  position: {
    vertical: "top" | "center" | "bottom";
    horizontal: "left" | "mid" | "right";
  };
  /** The panel carrying the page's real headline should pass "h1" — defaults to "h2". */
  titleAs?: "h1" | "h2";
}

const OFFSETS: Record<string, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

const LOGO_HOLD_MS = 1400;

type Phase = "loading" | "logo" | "ready";

function pad(num: number, size: number) {
  let s = String(num);
  while (s.length < size) s = "0" + s;
  return s;
}

export function ScrollVideoHero({
  framesPath,
  frameCount,
  padSize = 3,
  ext = "jpg",
  scrollVh,
  panels,
  children,
}: {
  framesPath: string;
  frameCount: number;
  padSize?: number;
  ext?: string;
  scrollVh?: number;
  panels: ScrollVideoPanel[];
  children?: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [phase, setPhase] = useState<Phase>("loading");
  const [loadPercent, setLoadPercent] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    if (!track || !scene || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vh = scrollVh || Math.round(frameCount * 2.7);
    track.style.height = reduceMotion ? "auto" : vh + "vh";

    // Sous mouvement réduit : pas de générique logo ni de scrubbing, on
    // affiche directement la dernière image de la séquence (état final),
    // conformément à la règle du site sur les animations pilotées au scroll.
    if (reduceMotion) {
      const ctx = canvas.getContext("2d");
      const img = new window.Image();
      img.src = `${framesPath}${pad(frameCount, padSize)}.${ext}`;
      img.onload = () => {
        if (!ctx) return;
        canvas.width = scene.clientWidth;
        canvas.height = scene.clientHeight;
        ctx.imageSmoothingQuality = "high";
        const ir = img.naturalWidth / img.naturalHeight;
        const cr = canvas.width / canvas.height;
        let dw, dh, dx, dy;
        if (ir > cr) {
          dh = canvas.height;
          dw = dh * ir;
          dx = (canvas.width - dw) / 2;
          dy = 0;
        } else {
          dw = canvas.width;
          dh = dw / ir;
          dx = 0;
          dy = (canvas.height - dh) / 2;
        }
        ctx.drawImage(img, dx, dy, dw, dh);
      };
      panels.forEach((p) => {
        const el = panelRefs.current[p.key];
        if (el) el.style.opacity = "1";
      });
      // Le résultat de matchMedia() n'est connu qu'après le montage côté
      // client : ce setState ne peut pas être déplacé hors de l'effet.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("ready");
      return;
    }

    document.body.style.overflow = "hidden";
    let cancelled = false;
    const cleanupFns: Array<() => void> = [() => (document.body.style.overflow = "")];

    const ctx = canvas.getContext("2d");
    const images: HTMLImageElement[] = new Array(frameCount);
    const state = { frame: 0 };

    function frameUrl(i: number) {
      return `${framesPath}${pad(i + 1, padSize)}.${ext}`;
    }

    function resizeCanvas() {
      if (!canvas || !scene || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = scene.clientWidth * dpr;
      canvas.height = scene.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingQuality = "high";
    }

    function drawFrame(index: number) {
      if (!canvas || !scene || !ctx) return;
      const img = images[Math.max(0, Math.min(frameCount - 1, Math.round(index)))];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = scene.clientWidth;
      const ch = scene.clientHeight;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw, dh, dx, dy;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        dw = cw;
        dh = cw / ir;
        dx = 0;
        dy = (ch - dh) / 2;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function updatePanels(progress: number) {
      panels.forEach((p) => {
        const el = panelRefs.current[p.key];
        if (!el) return;
        const inner = el.querySelector<HTMLElement>(".panel__inner") || el;
        const fadeWindow = 0.05;
        let opacity = 0;
        if (progress >= p.revealStart && progress <= p.revealEnd) {
          const inFactor = Math.min(1, (progress - p.revealStart) / fadeWindow);
          const outFactor = p.revealEnd >= 1 ? 1 : Math.min(1, (p.revealEnd - progress) / fadeWindow);
          opacity = Math.min(inFactor, outFactor);
        }
        const offset = OFFSETS[p.revealFrom] || OFFSETS.up;
        el.style.opacity = String(opacity);
        inner.style.transform = `translate(${offset.x * (1 - opacity)}px, ${offset.y * (1 - opacity)}px)`;
        el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
      });
    }

    function loadOne(i: number) {
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        images[i] = img;
        img.onload = img.onerror = () => {
          loaded++;
          setLoadPercent(Math.round((loaded / frameCount) * 100));
          resolve();
        };
        img.src = frameUrl(i);
      });
    }

    async function loadQueue(indices: number[], concurrency: number) {
      let cursor = 0;
      async function worker() {
        while (cursor < indices.length && !cancelled) {
          const i = indices[cursor++];
          await loadOne(i);
        }
      }
      await Promise.all(
        Array.from({ length: Math.min(concurrency, indices.length) }, worker)
      );
    }

    let loaded = 0;

    async function preload() {
      // Loading all frames at once saturates the connection and starves the
      // ones we actually need first, so cap concurrency: finish an early
      // slice fast (blocks reveal), then keep loading the rest at a gentler
      // pace in the background. drawFrame() already no-ops on a frame that
      // hasn't arrived yet, so a fast scroll just holds the last drawn frame
      // for an instant instead of erroring.
      const priorityCount = Math.min(frameCount, Math.max(24, Math.round(frameCount * 0.12)));
      const priorityIndices = Array.from({ length: priorityCount }, (_, i) => i);
      const restIndices = Array.from(
        { length: frameCount - priorityCount },
        (_, i) => i + priorityCount
      );

      await loadQueue(priorityIndices, 6);
      if (!cancelled) loadQueue(restIndices, 4);
    }

    async function run() {
      const [{ default: gsapMod }, stModule, lenisModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled) return;

      const gsap = gsapMod;
      const ScrollTrigger = stModule.ScrollTrigger;
      const Lenis = lenisModule.default;

      gsap.registerPlugin(ScrollTrigger);

      await preload();
      if (cancelled) return;

      resizeCanvas();
      drawFrame(0);

      // Chargement terminé : petit générique logo sur fond noir avant de
      // révéler la scène. Le scroll reste verrouillé jusqu'à la fin.
      setPhase("logo");
      await new Promise((resolve) => setTimeout(resolve, LOGO_HOLD_MS));
      if (cancelled) return;

      setPhase("ready");
      document.body.style.overflow = "";

      const onResize = () => {
        resizeCanvas();
        drawFrame(state.frame);
      };
      window.addEventListener("resize", onResize);
      cleanupFns.push(() => window.removeEventListener("resize", onResize));

      const tween = gsap.to(state, {
        frame: frameCount - 1,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            drawFrame(state.frame);
            updatePanels(self.progress);
          },
        },
      });
      cleanupFns.push(() => tween.scrollTrigger?.kill());
      cleanupFns.push(() => tween.kill());

      updatePanels(0);
      ScrollTrigger.refresh();

      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
      cleanupFns.push(() => gsap.ticker.remove(tickerFn));
      cleanupFns.push(() => lenis.destroy());
    }

    run();

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={trackRef} className="scroll-video-track relative w-full">
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-ink"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cream/50">
              AI Pro Agency
            </span>
            <div className="relative h-px w-64 overflow-hidden bg-cream/10">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-accent-light to-transparent"
                animate={{ width: `${loadPercent}%` }}
                transition={{ duration: 0.15, ease: "linear" }}
              />
            </div>
            <span className="font-serif-hero text-sm tabular-nums text-accent-light/80">{loadPercent}%</span>
          </motion.div>
        )}

        {phase === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-ink"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/logo-light.png"
                alt="AI Pro Agency"
                width={420}
                height={286}
                priority
                className="block h-40 w-auto drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)] sm:h-64"
              />
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-40 bg-gradient-to-r from-transparent via-accent-light to-transparent sm:w-56"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cream/50"
            >
              Sites web premium
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={sceneRef} className="scroll-video-scene sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(21,18,13,0.75), transparent 48%), linear-gradient(to bottom, rgba(21,18,13,0.55), transparent 38%), radial-gradient(120% 90% at 50% 100%, transparent 55%, rgba(21,18,13,0.45) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 min(18vw,220px) rgba(21,18,13,0.55)" }}
        />

        {panels.map((p) => (
          <div
            key={p.key}
            ref={(el) => {
              panelRefs.current[p.key] = el;
            }}
            className={clsx(
              "scroll-video-panel absolute w-[min(36rem,88vw)] opacity-0",
              p.position.vertical === "top" && "top-[14vh]",
              p.position.vertical === "center" && "top-1/2 -translate-y-1/2",
              p.position.vertical === "bottom" && "bottom-[12vh]",
              p.position.horizontal === "left" && "left-[6vw] text-left",
              p.position.horizontal === "mid" && "left-1/2 -translate-x-1/2 text-center",
              p.position.horizontal === "right" && "right-[6vw] left-auto ml-auto text-right"
            )}
          >
            <div className="panel__inner relative overflow-hidden rounded-[4px] border border-accent-light/25 bg-ink/40 px-7 py-6 backdrop-blur-lg sm:px-9 sm:py-8">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-light/70 to-transparent"
              />
              <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-light">
                <span className="h-px w-6 bg-accent-light/60" aria-hidden />
                {p.eyebrow}
              </span>
              {(() => {
                const TitleTag = p.titleAs ?? "h2";
                return (
                  <TitleTag className="font-serif-hero text-cream text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.15]">
                    {p.title}
                  </TitleTag>
                );
              })()}
              <p className="mt-3 text-cream/70">{p.lede}</p>
            </div>
          </div>
        ))}

        {children}
      </div>
    </div>
  );
}
