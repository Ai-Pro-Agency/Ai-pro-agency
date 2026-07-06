import { SITE_URL, CONTACT } from "@/lib/constants";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AI Pro Agency",
    description:
      "Agence web créant des sites premium pour artisans, indépendants et TPE/PME partout en France.",
    url: SITE_URL,
    image: `${SITE_URL}/logo-light.png`,
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    email: CONTACT.email,
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    priceRange: "€€",
  };
}
