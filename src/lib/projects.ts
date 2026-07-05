export interface DemoProject {
  slug: string;
  name: string;
  sector: string;
  description: string;
  color: string;
  image?: string;
  url?: string;
  isDemo: boolean;
}

// Les projets marqués isDemo: false sont de vraies réalisations client.
// Les autres sont des projets démonstration, à remplacer au fil des livraisons.
export const DEMO_PROJECTS: DemoProject[] = [
  {
    slug: "kmb-location",
    name: "KMB Location",
    sector: "Location de véhicules premium",
    description:
      "Site vitrine one-page avec vidéo héro, catalogue de véhicules et formulaire de demande relié à WhatsApp.",
    color: "#17140f",
    image: "/realisations/kmb-location.jpg",
    url: "https://kmb-location.fr",
    isDemo: false,
  },
  {
    slug: "new-optic",
    name: "New Optic",
    sector: "Opticien",
    description:
      "Site vitrine avec prise de rendez-vous Cal.com par motif de visite, et chatbot d'accueil relié à WhatsApp.",
    color: "#17140f",
    image: "/realisations/new-optic.jpg",
    url: "https://new-optic.fr",
    isDemo: false,
  },
  {
    slug: "atelier-du-bois-vivant",
    name: "Atelier du Bois Vivant",
    sector: "Artisan menuisier",
    description:
      "Site multi-pages avec galerie de réalisations et prise de rendez-vous en ligne.",
    color: "#3A352C",
    isDemo: true,
  },
  {
    slug: "maison-fleurie",
    name: "Maison Fleurie",
    sector: "Fleuriste",
    description:
      "Site sur-mesure avec configurateur de devis pour les compositions florales.",
    color: "#B85E21",
    isDemo: true,
  },
];

export const SECTORS = ["Tous", ...new Set(DEMO_PROJECTS.map((p) => p.sector))];
