import { SVGProps, useId } from "react";

export function SparkleFlower(props: SVGProps<SVGSVGElement>) {
  const gradientId = `sparkle-flower-gradient-${useId()}`;

  return (
    <svg viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-rose-light)" />
          <stop offset="100%" stopColor="var(--color-accent-dark)" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradientId})`}>
        <path d="M12,2 C15.2,6.2 15.2,8.8 12,12 C8.8,8.8 8.8,6.2 12,2 Z" />
        <path
          d="M12,2 C15.2,6.2 15.2,8.8 12,12 C8.8,8.8 8.8,6.2 12,2 Z"
          transform="rotate(90 12 12)"
        />
        <path
          d="M12,2 C15.2,6.2 15.2,8.8 12,12 C8.8,8.8 8.8,6.2 12,2 Z"
          transform="rotate(180 12 12)"
        />
        <path
          d="M12,2 C15.2,6.2 15.2,8.8 12,12 C8.8,8.8 8.8,6.2 12,2 Z"
          transform="rotate(270 12 12)"
        />
      </g>
      <circle cx="12" cy="12" r="1.3" fill="var(--color-accent-dark)" />
    </svg>
  );
}
