"use client";

import { ReactNode, useEffect, useRef } from "react";
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
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    if (!track || !scene || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vh = scrollVh || Math.round(frameCount * 2.7);
    track.style.height = reduceMotion ? "auto" : vh + "vh";

    // Sous mouvement réduit : on affiche la dernière image (le "état final"
    // de la séquence) sans scrubbing, conformément à la règle du site sur
    // les boucles/animations pilotées par le scroll.
    if (reduceMotion) {
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = `${framesPath}${pad(frameCount, padSize)}.${ext}`;
      img.onload = () => {
        if (!ctx) return;
        canvas.width = scene.clientWidth;
        canvas.height = scene.clientHeight;
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
      loaderRef.current?.remove();
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

    function preload() {
      let loaded = 0;
      const promises: Promise<void>[] = [];
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = frameUrl(i);
        images[i] = img;
        promises.push(
          new Promise((resolve) => {
            img.onload = img.onerror = () => {
              loaded++;
              if (barRef.current) barRef.current.style.width = Math.round((loaded / frameCount) * 100) + "%";
              resolve();
            };
          })
        );
      }
      return Promise.all(promises);
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

      loaderRef.current?.classList.add("is-loaded");
      setTimeout(() => loaderRef.current?.remove(), 700);

      resizeCanvas();
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

      drawFrame(0);
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
      <div
        ref={loaderRef}
        className="scroll-video-loader fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-ink transition-opacity duration-700"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-cream">Chargement</span>
        <div className="h-[2px] w-56 overflow-hidden bg-cream/15">
          <div ref={barRef} className="h-full w-0 bg-accent transition-[width] duration-150" />
        </div>
      </div>

      <div ref={sceneRef} className="scroll-video-scene sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(23,20,15,0.6), transparent 45%), linear-gradient(to bottom, rgba(23,20,15,0.4), transparent 35%)",
          }}
        />

        {panels.map((p) => (
          <div
            key={p.key}
            ref={(el) => {
              panelRefs.current[p.key] = el;
            }}
            className={clsx(
              "scroll-video-panel absolute w-[min(32rem,84vw)] px-[8vw] opacity-0",
              p.position.vertical === "top" && "top-[14vh]",
              p.position.vertical === "center" && "top-1/2 -translate-y-1/2",
              p.position.vertical === "bottom" && "bottom-[12vh]",
              p.position.horizontal === "left" && "left-0 text-left",
              p.position.horizontal === "mid" && "left-1/2 -translate-x-1/2 text-center",
              p.position.horizontal === "right" && "right-0 left-auto ml-auto text-right"
            )}
          >
            <div className="panel__inner rounded-[18px] border border-cream/10 bg-ink/35 px-8 py-7 backdrop-blur-md">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent-light">
                {p.eyebrow}
              </span>
              <h2 className="font-serif-hero text-cream text-[clamp(1.8rem,4vw,3rem)] leading-[1.1]">
                {p.title}
              </h2>
              <p className="mt-3 text-cream/80">{p.lede}</p>
            </div>
          </div>
        ))}

        {children}
      </div>
    </div>
  );
}
