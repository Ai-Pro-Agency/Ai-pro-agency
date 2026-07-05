import clsx from "clsx";

type Variant = "hero" | "dark" | "subtle" | "earth";

const PALETTES: Record<Variant, [string, string, string?]> = {
  hero: ["var(--color-accent)", "var(--color-accent-rose)"],
  dark: ["var(--color-accent)", "var(--color-accent-light)"],
  subtle: ["var(--color-accent-light)", "var(--color-accent-rose)"],
  earth: ["var(--color-rose)", "var(--color-green)", "var(--color-beige-dark)"],
};

export function GradientOrbs({
  variant = "hero",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const [colorA, colorB, colorC] = PALETTES[variant];

  return (
    <div
      aria-hidden
      className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="animate-blob absolute -top-24 right-[-8%] h-[26rem] w-[26rem] rounded-full opacity-30 blur-3xl"
        style={{
          backgroundImage: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.5), transparent 55%), radial-gradient(circle, ${colorA}, transparent 70%)`,
        }}
      />
      <div
        className="animate-blob absolute bottom-[-15%] left-[-10%] h-[22rem] w-[22rem] rounded-full opacity-25 blur-3xl"
        style={{
          backgroundImage: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.4), transparent 55%), radial-gradient(circle, ${colorB}, transparent 70%)`,
          animationDelay: "-7s",
        }}
      />
      {colorC && (
        <div
          className="animate-blob absolute right-[8%] top-[45%] h-[16rem] w-[16rem] rounded-full opacity-20 blur-3xl"
          style={{
            backgroundImage: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.4), transparent 55%), radial-gradient(circle, ${colorC}, transparent 70%)`,
            animationDelay: "-4s",
          }}
        />
      )}
    </div>
  );
}
