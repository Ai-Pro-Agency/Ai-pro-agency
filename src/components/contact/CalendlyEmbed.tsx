const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/ai-pro-agency/decouverte";

export function CalendlyEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
      <iframe
        src={CALENDLY_URL}
        title="Réserver un appel découverte gratuit"
        className="h-[700px] w-full"
        loading="lazy"
      />
    </div>
  );
}
