"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
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
  const scrollCueRef = useRef<HTMLDivElement>(null);

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
      // No locked scroll-jack under reduced motion — the page just flows
      // normally below, so the "scroll to continue" cue would be noise.
      if (scrollCueRef.current) scrollCueRef.current.style.display = "none";
      return;
    }

    let cancelled = false;
    const cleanupFns: Array<() => void> = [];

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

    // On a real connection, hundreds of frames can't finish downloading as
    // fast as a visitor can scroll past them — see loadOrder() below. If the
    // exact frame isn't ready yet, search outward for the closest one that
    // is, so the picture stays roughly in sync with the scrollbar instead of
    // visibly freezing until the exact frame arrives.
    const FRAME_SEARCH_RADIUS = 30;
    function nearestLoadedFrame(target: number) {
      const exact = images[target];
      if (exact && exact.complete && exact.naturalWidth > 0) return exact;
      for (let d = 1; d <= FRAME_SEARCH_RADIUS; d++) {
        const before = images[target - d];
        if (before && before.complete && before.naturalWidth > 0) return before;
        const after = images[target + d];
        if (after && after.complete && after.naturalWidth > 0) return after;
      }
      return null;
    }

    function drawFrame(index: number) {
      if (!canvas || !scene || !ctx) return;
      const target = Math.max(0, Math.min(frameCount - 1, Math.round(index)));
      const img = nearestLoadedFrame(target);
      if (!img) return;
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

    function updateScrollCue(progress: number) {
      const el = scrollCueRef.current;
      if (!el) return;
      const fadeEnd = 0.06;
      const opacity = Math.max(0, 1 - progress / fadeEnd);
      el.style.opacity = String(opacity);
      el.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
    }

    function loadOne(i: number) {
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        images[i] = img;
        img.onload = img.onerror = () => resolve();
        img.src = frameUrl(i);
      });
    }

    // Visits every index in [lo, hi] via binary subdivision (middle first,
    // then the middle of each half, and so on) instead of lo->hi order. A
    // real connection can only download a fraction of a large sequence
    // before the visitor has already scrolled past it, so whatever fraction
    // *has* landed needs to be spread across the whole timeline — not
    // clustered at the start — for nearestLoadedFrame() to have something
    // close by no matter where the scroll position is.
    function spreadOrder(lo: number, hi: number): number[] {
      if (lo > hi) return [];
      const mid = Math.floor((lo + hi) / 2);
      return [mid, ...spreadOrder(lo, mid - 1), ...spreadOrder(mid + 1, hi)];
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

    async function run() {
      const [[{ default: gsapMod }, stModule, lenisModule]] = await Promise.all([
        Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]),
        loadOne(0),
      ]);
      if (cancelled) return;

      const gsap = gsapMod;
      const ScrollTrigger = stModule.ScrollTrigger;
      const Lenis = lenisModule.default;

      gsap.registerPlugin(ScrollTrigger);

      resizeCanvas();
      drawFrame(0);

      // Nothing blocks reveal — the page is interactive immediately, and the
      // rest load in the background in spread order (see spreadOrder) so
      // that whatever has landed at any moment is distributed across the
      // whole sequence rather than clustered at the start.
      const restIndices = spreadOrder(1, frameCount - 1);
      loadQueue(restIndices, 12);

      const onResize = () => {
        resizeCanvas();
        drawFrame(state.frame);
      };
      window.addEventListener("resize", onResize);
      cleanupFns.push(() => window.removeEventListener("resize", onResize));

      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

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
            updateScrollCue(self.progress);
          },
          // Lenis's smoothing only earns its keep while scrubbing the hero —
          // left running for the whole page, it intercepts every scroll
          // below the fold too and makes the rest of the site feel laggy
          // for no benefit. Stop it once past the hero, restart if the
          // visitor scrolls back up into it.
          onLeave: () => lenis.stop(),
          onEnterBack: () => lenis.start(),
        },
      });
      cleanupFns.push(() => tween.scrollTrigger?.kill());
      cleanupFns.push(() => tween.kill());

      updatePanels(0);
      updateScrollCue(0);
      ScrollTrigger.refresh();

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

        <div
          ref={scrollCueRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[5vh] flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent-light/80">
            Scroll
          </span>
          <ChevronDown size={20} className="animate-scroll-cue text-accent-light/80" />
        </div>

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
