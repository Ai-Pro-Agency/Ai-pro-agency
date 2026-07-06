import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { PosterCard } from "@/components/ui/PosterCard";
import { FloatingFlower } from "@/components/ui/FloatingFlower";
import { whatsappHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQ : délais, tarifs et fonctionnement en France",
  description:
    "Toutes les réponses sur les délais de livraison, les modifications incluses, le fonctionnement des abonnements, la zone d'intervention et le paiement.",
  alternates: { canonical: "/faq" },
};

const FAQ_ITEMS = [
  {
    question: "Quel est le délai de livraison d'un site ?",
    answer:
      "Cinq jours ouvrés à partir de la Découverte terrain, pour un site vitrine one-page. Les formats multi-pages et sur-mesure demandent un peu plus de temps, toujours annoncé clairement dès le premier échange.",
  },
  {
    question: "Quelles modifications sont incluses après la livraison ?",
    answer:
      "Ça dépend de votre formule d'abonnement. L'Essentiel couvre l'hébergement et la maintenance technique. Le Signature inclut jusqu'à deux modifications de contenu par mois. Le Prestige offre des modifications illimitées, dans un usage raisonnable.",
  },
  {
    question: "Comment fonctionnent les abonnements mensuels ?",
    answer:
      "L'abonnement prend le relais une fois le site en ligne : hébergement, nom de domaine, certificat SSL, sauvegardes et sécurité sont gérés en continu. Vous choisissez le niveau de suivi qui correspond à vos besoins, et vous pouvez changer de formule à tout moment.",
  },
  {
    question: "Dans quelle zone intervenez-vous ?",
    answer:
      "Partout en France. La Découverte terrain se fait en présentiel où que vous soyez, et le suivi se fait ensuite à distance, par téléphone, email ou WhatsApp.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer:
      "Pour la création du site : la moitié du montant avant de commencer, la moitié après avoir vu le site fini. Simple et équitable. Pour l'abonnement mensuel, le prélèvement démarre une fois le site en ligne.",
  },
  {
    question: "Le prix peut-il changer en cours de projet ?",
    answer:
      "Non. Le prix est fixe et écrit noir sur blanc dès le premier échange. Si vous ajoutez une option en cours de route, son prix est annoncé avant qu'elle soit intégrée, jamais après.",
  },
];

export default function FaqPage() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <GradientOrbs variant="earth" />
      <FloatingFlower className="right-10 top-8 hidden sm:block" size={42} duration={8} />
      <Container className="relative">
        <SectionHeading
          as="h1"
          eyebrow="FAQ"
          title="Les questions qu'on nous pose le plus souvent."
        />
        <div className="mt-10 max-w-3xl">
          <Accordion items={FAQ_ITEMS} />
        </div>

        <div className="mt-16 max-w-3xl">
          <PosterCard rotate={-1.5} blockColor="green" className="p-8 text-center">
            <p className="font-serif-display text-xl text-ink">
              Une autre question ?
            </p>
            <p className="mt-2 text-ink-soft">
              Écrivez, on répond. Vraiment, et vite.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={whatsappHref()} variant="secondary">
                Écrire sur WhatsApp
              </Button>
              <Button href="/contact" variant="ghost">
                Ouvrir le formulaire
              </Button>
            </div>
          </PosterCard>
        </div>
      </Container>
    </section>
  );
}
