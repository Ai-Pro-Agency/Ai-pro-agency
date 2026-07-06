import type { Metadata } from "next";
import { Layout, RefreshCcw, Wrench, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { FloatIcon } from "@/components/ui/FloatIcon";
import { IconBadge, BadgeColor } from "@/components/ui/IconBadge";
import { SwashUnderline } from "@/components/ui/SwashUnderline";
import { FloatingFlower } from "@/components/ui/FloatingFlower";

export const metadata: Metadata = {
  title: "Services : création de site, refonte, maintenance en France",
  description:
    "Trois offres claires pour artisans et TPE/PME en France : site vitrine, refonte de site existant, et maintenance mensuelle à 79 €/mois.",
  alternates: { canonical: "/services" },
};

const OFFERS: {
  icon: typeof Layout;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  cta: string;
  color: BadgeColor;
}[] = [
  {
    icon: Layout,
    title: "Site vitrine",
    color: "beige",
    tagline: "Le site que vous auriez dû avoir il y a trois ans.",
    description:
      "Un site pensé pour votre métier, construit à partir d'une vraie visite sur le terrain. Vos photos, votre ton, vos mots. Le genre de site qui donne envie de décrocher le téléphone.",
    features: [
      "Découverte terrain et shooting photo inclus",
      "Rédaction des textes alignée sur votre positionnement",
      "SEO de lancement pour être trouvé sur Google",
      "Site livré en 5 jours ouvrés",
      "Formation rapide pour gérer les petites mises à jour",
    ],
    cta: "Voir les formules Site vitrine",
  },
  {
    icon: RefreshCcw,
    title: "Refonte",
    color: "rose",
    tagline: "Votre site actuel mérite mieux. On lui redonne de l'allure.",
    description:
      "Votre activité a évolué, votre site non. On reprend ce qui fonctionne, on corrige ce qui freine, et on livre un site à la hauteur de ce que vous faites vraiment aujourd'hui.",
    features: [
      "Audit complet du site existant et de son référencement",
      "Nouvelle direction artistique alignée sur votre image actuelle",
      "Reprise du contenu utile, réécriture du reste",
      "Migration en douceur, sans coupure pour vos clients",
      "Suivi des performances après la mise en ligne",
    ],
    cta: "Voir les formules Refonte",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    color: "green",
    tagline: "79 €/mois, et votre site reste vivant tout seul.",
    description:
      "Un site, ça se fait vivre. Hébergement, sécurité, sauvegardes, petites modifications : on garde tout à jour pendant que vous vous occupez de votre métier.",
    features: [
      "Hébergement, nom de domaine et certificat SSL inclus",
      "Sauvegardes automatiques mensuelles",
      "Maintenance technique et sécurité continue",
      "Support par email sous 48h",
      "Trois niveaux d'accompagnement selon vos besoins",
    ],
    cta: "Voir les formules Maintenance",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 py-16 sm:py-20">
        <GradientOrbs variant="hero" />
        <FloatingFlower className="right-10 top-8 hidden sm:block" size={42} duration={8} />
        <Container className="relative">
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="Trois offres. Un seul niveau d'exigence."
            description="Que vous partiez de zéro, que vous vouliez rafraîchir l'existant, ou que vous cherchiez un partenaire sur la durée, il y a une offre pensée pour vous."
          />
        </Container>
      </section>

      {OFFERS.map((offer, i) => (
        <section
          key={offer.title}
          className={i % 2 === 1 ? "bg-cream-dark/40 py-16 sm:py-20" : "py-16 sm:py-20"}
        >
          <Container>
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                <div>
                  <FloatIcon>
                    <IconBadge icon={offer.icon} color={offer.color} size={30} />
                  </FloatIcon>
                  <h2 className="mt-4 font-serif-display text-3xl text-ink sm:text-4xl">
                    {offer.title}
                  </h2>
                  <SwashUnderline className="mt-1" />
                  <p className="mt-3 text-xl font-medium text-ink-soft">
                    {offer.tagline}
                  </p>
                  <p className="mt-5 leading-relaxed text-ink-soft">
                    {offer.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button href="/tarifs" variant="primary">
                      {offer.cta}
                    </Button>
                    <Button href="/contact" variant="ghost">
                      Poser une question
                    </Button>
                  </div>
                </div>
                <RevealGroup className="space-y-4 self-center">
                  {offer.features.map((feature) => (
                    <RevealItem key={feature} className="flex items-start gap-3">
                      <Check
                        size={20}
                        className="mt-0.5 shrink-0 text-accent-dark"
                      />
                      <span className="text-ink-soft">{feature}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </Reveal>
          </Container>
        </section>
      ))}
    </>
  );
}
