import clsx from "clsx";

type ShapeColor = "beige" | "brown" | "rose" | "green" | "accent";

const COLOR_CLASSES: Record<ShapeColor, string> = {
  beige: "bg-beige",
  brown: "bg-brown",
  rose: "bg-rose",
  green: "bg-green",
  accent: "bg-accent",
};

interface ShapeConfig {
  color: ShapeColor;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: number;
  radius: string;
  delay: number;
}

const HERO_SHAPES: ShapeConfig[] = [
  { color: "rose", size: 64, top: "8%", right: "18%", rotate: -8, radius: "rounded-[38%_62%_63%_37%/41%_44%_56%_59%]", delay: 0 },
  { color: "green", size: 44, top: "38%", right: "4%", rotate: 12, radius: "rounded-full", delay: 1.2 },
  { color: "beige", size: 80, bottom: "6%", right: "22%", rotate: 6, radius: "rounded-3xl", delay: 0.6 },
  { color: "brown", size: 36, bottom: "18%", right: "8%", rotate: -14, radius: "rounded-full", delay: 1.8 },
];

export function FloatingShapes({
  variant = "hero",
  className,
}: {
  variant?: "hero";
  className?: string;
}) {
  const shapes = variant === "hero" ? HERO_SHAPES : HERO_SHAPES;

  return (
    <div aria-hidden className={clsx("pointer-events-none absolute inset-0 hidden overflow-hidden lg:block", className)}>
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={clsx(
            "shadow-3d animate-shape-float absolute opacity-90",
            COLOR_CLASSES[shape.color],
            shape.radius
          )}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            bottom: shape.bottom,
            left: shape.left,
            right: shape.right,
            animationDelay: `${shape.delay}s`,
            ["--shape-rotate" as string]: `${shape.rotate}deg`,
            transform: `rotate(${shape.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
