import { Fragment } from "react";
import { SparkleFlower } from "@/components/icons/SparkleFlower";

export interface MarqueeItem {
  value?: string;
  label: string;
}

export function Marquee({ items }: { items: MarqueeItem[] }) {
  const track = [...items, ...items];

  return (
    <div className="group relative overflow-hidden border-y border-cream/10 bg-gradient-to-r from-ink via-brown-dark to-ink py-5">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap group-hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <Fragment key={`${item.label}-${i}`}>
            <span className="flex items-baseline gap-2">
              {item.value && (
                <span className="font-serif-display text-xl text-accent-light sm:text-2xl">
                  {item.value}
                </span>
              )}
              <span className="text-sm font-semibold uppercase tracking-widest text-cream/80">
                {item.label}
              </span>
            </span>
            <SparkleFlower
              className="h-5 w-5 shrink-0 drop-shadow-[0_0_6px_rgba(219,163,160,0.5)]"
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
