export const SITE_URL = "https://www.ai-pro-agency.com";
export const SITE_NAME = "AI Pro Agency";

// Empty by default (relative fetch, works on Vercel where the API routes are
// co-hosted). Overridden at build time for the static export package, whose
// API routes have no server to run on.
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export const CONTACT = {
  phone: "06 46 01 00 04",
  phoneHref: "tel:+33646010004",
  email: "contact@ai-pro-agency.com",
  whatsappNumber: "33646010004",
  whatsappMessage: "Bonjour, je souhaite un devis pour un site.",
  zone: "Toute la France",
};

export function whatsappHref(message: string = CONTACT.whatsappMessage) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
];

// Business hours used by the chat widget to decide whether to show
// the "hors horaires" message or the standard greeting.
export const BUSINESS_HOURS = {
  start: 9,
  end: 19,
  days: [1, 2, 3, 4, 5], // Monday-Friday
};
