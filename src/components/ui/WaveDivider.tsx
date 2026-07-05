import clsx from "clsx";

export function WaveDivider({
  color = "var(--color-cream)",
  flip = false,
  className,
}: {
  color?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={clsx("pointer-events-none relative w-full leading-none", flip && "rotate-180", className)}
    >
      <div className="h-px w-full" style={{ backgroundColor: color, opacity: 0.4 }} />
      <svg
        viewBox="0 0 160 12"
        className="absolute left-1/2 top-1/2 h-3 w-28 -translate-x-1/2 -translate-y-1/2 sm:h-3.5 sm:w-36"
        fill="none"
      >
        <rect
          x="76"
          y="2"
          width="8"
          height="8"
          transform="rotate(45 80 6)"
          fill="var(--color-accent-light)"
        />
      </svg>
    </div>
  );
}
