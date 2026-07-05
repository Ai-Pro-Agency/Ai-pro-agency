import { SVGProps } from "react";

interface EiffelTowerIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function EiffelTowerIcon({ size = 24, ...props }: EiffelTowerIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2 L10 9 M12 2 L14 9" />
      <path d="M9 9 L15 9" />
      <path d="M10 9 L7 15 M14 9 L17 15" />
      <path d="M6 15 L18 15" />
      <path d="M7 15 L4 21 M17 15 L20 21" />
      <path d="M2 21 L22 21" />
    </svg>
  );
}
