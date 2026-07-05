import { Check, Minus } from "lucide-react";
import { PackageRow, Tier } from "@/lib/pricing";
import clsx from "clsx";

function renderValue(value: string) {
  if (value === "Inclus") {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-ink">
        <Check size={16} className="shrink-0 text-green-dark" />
        Inclus
      </span>
    );
  }
  if (value === "—") {
    return <Minus size={14} className="text-ink-soft/30" />;
  }
  return value;
}

export function PricingTable({
  tiers,
  rows,
  footnote,
  highlightTier = "signature",
}: {
  tiers: Record<Tier, { name: string; price: string }>;
  rows: PackageRow[];
  footnote?: string;
  highlightTier?: Tier;
}) {
  const order: Tier[] = ["essentiel", "signature", "prestige"];

  return (
    <div
      className="relative overflow-x-auto rounded-[28px] border border-ink/10 bg-white"
      style={{
        boxShadow:
          "0 1px 2px rgba(23,20,15,0.05), 0 12px 24px -8px rgba(23,20,15,0.10), 0 32px 56px -20px rgba(23,20,15,0.14)",
      }}
    >
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-1/4 border-b border-ink/10 px-5 py-6 text-left align-bottom">
              <span className="sr-only">Caractéristique</span>
            </th>
            {order.map((tier) => (
              <th
                key={tier}
                className={clsx(
                  "relative border-b px-5 py-6 text-left align-bottom",
                  tier === highlightTier
                    ? "border-b-accent/30 bg-gradient-to-b from-accent/10 to-transparent"
                    : "border-ink/10"
                )}
              >
                {tier === highlightTier && (
                  <span className="absolute -top-3.5 left-5 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-cream">
                    Recommandé
                  </span>
                )}
                <p className="font-serif-display text-xl text-ink">
                  {tiers[tier].name}
                </p>
                <p className="mt-1 text-lg font-semibold text-accent-dark">
                  {tiers[tier].price}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={clsx(
                "transition-colors hover:bg-ink/[0.025]",
                i % 2 === 1 && "bg-cream/50"
              )}
            >
              <td className="px-5 py-4 font-medium text-ink">{row.label}</td>
              {order.map((tier) => (
                <td
                  key={tier}
                  className={clsx(
                    "px-5 py-4 text-ink-soft",
                    tier === highlightTier && "bg-accent/5"
                  )}
                >
                  {renderValue(row.values[tier])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {footnote && (
        <p className="border-t border-ink/10 px-5 py-4 text-sm text-ink-soft/80">
          {footnote}
        </p>
      )}
    </div>
  );
}
