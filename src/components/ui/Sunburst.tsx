import clsx from "clsx";

const RAYS = 16;

export function Sunburst({
  color = "var(--color-rose)",
  className,
}: {
  color?: string;
  className?: string;
}) {
  const rays = Array.from({ length: RAYS });

  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className={clsx("animate-sunburst pointer-events-none", className)}
    >
      {rays.map((_, i) => {
        const angle = (360 / RAYS) * i;
        return (
          <rect
            key={i}
            x="196"
            y="0"
            width="8"
            height="200"
            fill={color}
            opacity={i % 2 === 0 ? 0.5 : 0.25}
            transform={`rotate(${angle} 200 200)`}
          />
        );
      })}
    </svg>
  );
}
