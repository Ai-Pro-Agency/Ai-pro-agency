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
      className={clsx("pointer-events-none w-full overflow-hidden leading-none", flip && "rotate-180", className)}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="h-10 w-full sm:h-14"
      >
        <path
          d="M0,30 C150,60 350,0 600,20 C850,40 1050,0 1200,25 L1200,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
