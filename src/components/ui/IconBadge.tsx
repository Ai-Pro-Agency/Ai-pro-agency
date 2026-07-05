import { LucideIcon } from "lucide-react";
import clsx from "clsx";

export type BadgeColor = "beige" | "brown" | "rose" | "green" | "accent";

export function IconBadge({
  icon: Icon,
  size = 24,
  className,
}: {
  icon: LucideIcon;
  /** @deprecated no longer varies the badge's tone — kept so existing call sites keep compiling. */
  color?: BadgeColor;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-ink/[0.04] p-3.5 text-accent ring-1 ring-inset ring-accent/40 transition-transform duration-300",
        className
      )}
      style={{ boxShadow: "0 1px 2px rgba(23,20,15,0.08)" }}
    >
      <Icon size={size} className="relative" />
    </span>
  );
}
