"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import type { ScrollVideoPanel } from "./ScrollVideoHero";

const OFFSETS: Record<string, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function ScrollVideoHeroVideo({
  src,
  posterSrc,
  scrollVh = 640,
  panels,
  children,
}: {
  src: string;
  posterSrc?: string;
  scrollVh?: number;
  panels: ScrollVideoPanel[];
  children?: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!track || !scene || !canvas || !video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.style.height = reduceMotion ? "auto" : scrollVh + "vh";

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      if (!canvas || !scene || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = scene!.clientWidth * dpr;
      canvas.height = scene!.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingQuality = "high";
    }

    function drawVideoFrame() {
      if (!canvas || !scene || !ctx || !video!.videoWidth) return;
      const cw = scene.clientWidth;
      const ch = scene.clientHeight;
      const ir = video!.videoWidth / video!.videoHeight;
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
      ctx.drawImage(video!, dx, dy, dw, dh);
    }

    // Sous mouvement réduit : pas de scrubbing, on affiche directement la
    // dernière image de la vidéo (état final), conformément à la règle du
    // site sur les animations pilotées au scroll.
    if (reduceMotion) {
      resizeCanvas();
      const showLastFrame = () => {
        video!.currentTime = Math.max(0, video!.duration - 0.05);
      };
      if (video.readyState >= 1) showLastFrame();
      else video.addEventListener("loadedmetadata", showLastFrame, { once: true });
      video.addEventListener("seeked", drawVideoFrame);
      panels.forEach((p) => {
        const el = panelRefs.current[p.key];
        if (el) el.style.opacity = "1";
      });
      if (scrollCueRef.current) scrollCueRef.current.style.display = "none";
      return () => video!.removeEventListener("seeked", drawVideoFrame);
    }

    let cancelled = false;
    const cleanupFns: Array<() => void> = [];
    const state = { progress: 0 };

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

    // The video is a single ~4MB file (one request) instead of hundreds of
    // separate frame images — seeking is bound by local decode speed, not by
    // how much of a large sequence a real connection managed to download
    // during the scroll, which is what made the old image-sequence hero
    // choppy on real connections regardless of file count/size tuning.
    let seeking = false;
    let pendingTarget: number | null = null;
    function seekTo(t: number) {
      if (seeking) {
        pendingTarget = t;
        return;
      }
      seeking = true;
      video!.currentTime = t;
    }
    function onSeeked() {
      drawVideoFrame();
      seeking = false;
      if (pendingTarget !== null) {
        const t = pendingTarget;
        pendingTarget = null;
        seekTo(t);
      }
    }
    video.addEventListener("seeked", onSeeked);
    cleanupFns.push(() => video!.removeEventListener("seeked", onSeeked));

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

      resizeCanvas();
      // A single readyState check here can race loadedmetadata on some
      // browsers (videoWidth isn't guaranteed populated at the exact instant
      // it fires), leaving the canvas blank until the first scroll-driven
      // draw — seen on real Chrome even though Playwright's bundled
      // Chromium didn't reproduce it. Retry on every relevant readiness
      // event instead of a one-shot check; drawVideoFrame() is idempotent.
      const tryInitialDraw = () => {
        if (video!.videoWidth) drawVideoFrame();
      };
      video!.addEventListener("loadedmetadata", tryInitialDraw);
      video!.addEventListener("loadeddata", tryInitialDraw);
      video!.addEventListener("canplay", tryInitialDraw);
      cleanupFns.push(() => {
        video!.removeEventListener("loadedmetadata", tryInitialDraw);
        video!.removeEventListener("loadeddata", tryInitialDraw);
        video!.removeEventListener("canplay", tryInitialDraw);
      });
      tryInitialDraw();

      const onResize = () => {
        resizeCanvas();
        drawVideoFrame();
      };
      window.addEventListener("resize", onResize);
      cleanupFns.push(() => window.removeEventListener("resize", onResize));

      // See ScrollVideoHero.tsx for why Lenis is destroyed/recreated (rather
      // than stop()/start()) once scrolled past the hero, and why the toggle
      // lives inside the same onUpdate tick that feeds Lenis rather than in
      // separate onLeave/onEnterBack callbacks.
      let lenis: InstanceType<typeof Lenis> | null = null;
      let tickerFn: ((time: number) => void) | null = null;

      function teardownLenis() {
        if (tickerFn) gsap.ticker.remove(tickerFn);
        lenis?.destroy();
        lenis = null;
        tickerFn = null;
      }

      function setupLenis() {
        if (lenis) return;
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        tickerFn = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(tickerFn);
      }

      setupLenis();
      gsap.ticker.lagSmoothing(0);

      const tween = gsap.to(state, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const duration = video!.duration || 0;
            if (duration) seekTo(self.progress * duration);
            updatePanels(self.progress);
            updateScrollCue(self.progress);
            if (self.progress >= 1 && lenis) teardownLenis();
            else if (self.progress < 0.98 && !lenis) setupLenis();
          },
        },
      });
      cleanupFns.push(() => tween.scrollTrigger?.kill());
      cleanupFns.push(() => tween.kill());

      updatePanels(0);
      updateScrollCue(0);
      ScrollTrigger.refresh();

      cleanupFns.push(teardownLenis);
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
        <video
          ref={videoRef}
          src={src}
          poster={posterSrc}
          muted
          playsInline
          preload="auto"
          className="hidden"
        />
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
