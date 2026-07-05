import clsx from "clsx";
import { SwashUnderline } from "@/components/ui/SwashUnderline";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  swashColor = "var(--color-accent)",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  swashColor?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-dark">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <SwashUnderline
        color={swashColor}
        className={clsx("mt-2", align === "center" && "mx-auto")}
      />
      {description && (
        <p className="font-script mt-3 text-xl leading-relaxed text-ink-soft">
          {description}
        </p>
      )}
    </div>
  );
}
