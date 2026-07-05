import { LucideIcon } from "lucide-react";
import clsx from "clsx";

export type BadgeColor = "beige" | "brown" | "rose" | "green" | "accent";

const BG_CLASSES: Record<BadgeColor, string> = {
  beige: "bg-beige text-brown-dark",
  brown: "bg-brown text-cream",
  rose: "bg-rose text-brown-dark",
  green: "bg-green text-cream",
  accent: "bg-accent text-ink",
};

export function IconBadge({
  icon: Icon,
  color = "accent",
  size = 24,
  className,
}: {
  icon: LucideIcon;
  color?: BadgeColor;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "relative inline-flex items-center justify-center overflow-hidden rounded-2xl p-3.5 ring-1 ring-inset ring-white/20 transition-transform duration-300",
        BG_CLASSES[color],
        className
      )}
      style={{
        boxShadow:
          "0 1px 1px rgba(23,20,15,0.08), 0 6px 10px -4px rgba(23,20,15,0.16), 0 16px 28px -12px rgba(23,20,15,0.20)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 28% 22%, rgba(255,255,255,0.5), transparent 60%)",
        }}
      />
      <Icon size={size} className="relative" />
    </span>
  );
}
