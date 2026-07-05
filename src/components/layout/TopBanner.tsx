import { Phone, Camera } from "lucide-react";
import { EiffelTowerIcon } from "@/components/icons/EiffelTowerIcon";
import { FloatIcon } from "@/components/ui/FloatIcon";

const ITEMS = [
  { icon: EiffelTowerIcon, label: "Agence 100% parisienne", delay: 0 },
  { icon: Phone, label: "Je réponds en direct", delay: 0.6 },
  { icon: Camera, label: "Photos prises sur place", delay: 1.2 },
];

export function TopBanner() {
  return (
    <div className="border-b border-cream/10 bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-5 py-2 sm:justify-between sm:gap-0 sm:px-8">
        {ITEMS.map(({ icon: Icon, label, delay }) => (
          <div key={label} className="flex items-center gap-2">
            <FloatIcon delay={delay}>
              <Icon size={16} className="text-accent-light" strokeWidth={1.5} />
            </FloatIcon>
            <span className="font-script hidden text-base font-bold text-cream/90 sm:inline">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
