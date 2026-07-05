import Image from "next/image";
import { TiltCard } from "@/components/ui/TiltCard";
import clsx from "clsx";

type Size = "header" | "large" | "hero";
type Variant = "dark" | "light";

const SIZE_CLASSES: Record<Size, string> = {
  header: "h-14 w-auto sm:h-[4.5rem]",
  large: "h-24 w-auto sm:h-32",
  hero: "h-36 w-auto sm:h-48",
};

const VARIANT_SRC: Record<Variant, string> = {
  dark: "/logo.png",
  light: "/logo-light.png",
};

const VARIANT_SHADOW: Record<Variant, string> = {
  dark: "drop-shadow-[0_10px_18px_rgba(23,20,15,0.18)]",
  light: "drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]",
};

export function Logo({
  className,
  size = "header",
  variant = "dark",
  priority = true,
}: {
  className?: string;
  size?: Size;
  variant?: Variant;
  priority?: boolean;
}) {
  return (
    <TiltCard className={className}>
      <Image
        src={VARIANT_SRC[variant]}
        alt="AI Pro Agency"
        width={300}
        height={204}
        priority={priority}
        className={clsx("block", VARIANT_SHADOW[variant], SIZE_CLASSES[size])}
      />
    </TiltCard>
  );
}
