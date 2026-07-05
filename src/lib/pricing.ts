export type Tier = "essentiel" | "signature" | "prestige";

export interface PackageRow {
  label: string;
  values: Record<Tier, string>;
}

export const PACKAGE_TIERS: Record<Tier, { name: string; price: string }> = {
  essentiel: { name: "Essentiel", price: "1 600 €" },
  signature: { name: "Signature", price: "2 600 €" },
  prestige: { name: "Prestige", price: "à partir de 4 000 €" },
};

export const PACKAGE_ROWS: PackageRow[] = [
  {
    label: "Format",
    values: {
      essentiel: "Site one-page",
      signature: "Site multi-pages (5-6 pages)",
      prestige: "Site sur-mesure, fonctionnalités avancées",
    },
  },
  {
    label: "Découverte terrain + shooting photo",
    values: { essentiel: "Inclus", signature: "Inclus", prestige: "Inclus" },
  },
  {
    label: "SEO de lancement",
    values: {
      essentiel: "Basique",
      signature: "Structuré par page",
      prestige: "Optimisé + recommandations de contenu",
    },
  },
  {
    label: "Animations au scroll",
    values: {
      essentiel: "En option (250 €)",
      signature: "Inclus",
      prestige: "Inclus",
    },
  },
  {
    label: "Micro-interactions sur-mesure",
    values: { essentiel: "—", signature: "—", prestige: "Inclus" },
  },
  {
    label: "Vidéo de présentation",
    values: {
      essentiel: "—",
      signature: "En option (900 €)",
      prestige: "Inclus",
    },
  },
  {
    label: "Signature sonore",
    values: {
      essentiel: "En option (200 €)",
      signature: "En option (200 €)",
      prestige: "Inclus",
    },
  },
  {
    label: "Fonctionnalité avancée au choix*",
    values: { essentiel: "En option", signature: "Inclus", prestige: "Inclus" },
  },
  {
    label: "Fiche Google Business Profile optimisée",
    values: {
      essentiel: "En option (300 €)",
      signature: "Inclus",
      prestige: "Inclus",
    },
  },
];

export const PACKAGE_FOOTNOTE =
  "*Au choix : prise de rendez-vous en ligne, configurateur de devis, ou espace client privé.";

export const SUBSCRIPTION_TIERS: Record<Tier, { name: string; price: string }> = {
  essentiel: { name: "Essentiel", price: "79 €/mois" },
  signature: { name: "Signature", price: "149 €/mois" },
  prestige: { name: "Prestige", price: "299 €/mois" },
};

export const SUBSCRIPTION_ROWS: PackageRow[] = [
  {
    label: "Hébergement + nom de domaine",
    values: { essentiel: "Inclus", signature: "Inclus", prestige: "Inclus" },
  },
  {
    label: "Certificat SSL",
    values: { essentiel: "Inclus", signature: "Inclus", prestige: "Inclus" },
  },
  {
    label: "Sauvegardes automatiques mensuelles",
    values: { essentiel: "Inclus", signature: "Inclus", prestige: "Inclus" },
  },
  {
    label: "Maintenance technique et sécurité",
    values: { essentiel: "Inclus", signature: "Inclus", prestige: "Inclus" },
  },
  {
    label: "Support email (48h)",
    values: { essentiel: "Inclus", signature: "Inclus", prestige: "Inclus" },
  },
  {
    label: "Modifications de contenu",
    values: {
      essentiel: "—",
      signature: "Jusqu'à 2/mois",
      prestige: "Illimitées (usage raisonnable)",
    },
  },
  {
    label: "Support prioritaire WhatsApp",
    values: {
      essentiel: "—",
      signature: "Réponse sous 24h",
      prestige: "Réponse sous quelques heures",
    },
  },
  {
    label: "Rapport mensuel",
    values: { essentiel: "—", signature: "Simple", prestige: "Détaillé" },
  },
  {
    label: "Optimisation SEO continue",
    values: {
      essentiel: "—",
      signature: "Ajustements légers",
      prestige: "Proactive, mensuelle",
    },
  },
  {
    label: "Conseil stratégique mensuel (visio)",
    values: { essentiel: "—", signature: "—", prestige: "Inclus" },
  },
  {
    label: "Nouvelle séance photo",
    values: { essentiel: "—", signature: "—", prestige: "1x par an" },
  },
];

export const SUBSCRIPTION_FOOTNOTE =
  "Un seul niveau d'exigence, trois profondeurs de suivi. Jamais inclus, sur devis à part : refonte complète, campagnes publicitaires payantes, rédaction de contenu volumineux type blog récurrent.";

export interface OptionItem {
  name: string;
  price: string;
}

export interface OptionCategory {
  category: string;
  items: OptionItem[];
}

export const OPTIONS_CATALOG: OptionCategory[] = [
  {
    category: "Fonctionnalités",
    items: [
      { name: "Prise de RDV en ligne", price: "300 €" },
      { name: "Configurateur de devis", price: "600 €" },
      { name: "Boutique en ligne", price: "à partir de 1 200 €" },
      { name: "Espace client", price: "à partir de 900 €" },
    ],
  },
  {
    category: "Identité de marque",
    items: [
      { name: "Logo", price: "600 €" },
      { name: "Charte graphique", price: "900 €" },
      { name: "Kit réseaux sociaux", price: "400 €" },
    ],
  },
  {
    category: "Contenu et visibilité",
    items: [
      { name: "Articles SEO x3", price: "450 €" },
      { name: "Traduction par langue", price: "500 €" },
      { name: "Fiche Google Business Profile", price: "300 €" },
      { name: "Campagne de teasing", price: "400 €" },
    ],
  },
];
