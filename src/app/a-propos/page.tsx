import type { Metadata } from "next";
import { Compass, Target, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { SwashUnderline } from "@/components/ui/SwashUnderline";
import { FounderPhoto } from "@/components/a-propos/FounderPhoto";
import { Method3DStep } from "@/components/a-propos/Method3DStep";
import { FloatingFlower } from "@/components/ui/FloatingFlower";
import { whatsappHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: "À propos de Jérôme, fondateur d'AI Pro Agency en France",
  description:
    "Jérôme, marketing d'abord, web ensuite. Découvrez la méthode derrière AI Pro Agency : Découverte terrain, alignement stratégique, accompagnement humain.",
  alternates: { canonical: "/a-propos" },
};

const METHODE = [
  {
    icon: Compass,
    title: "La Découverte terrain",
    description:
      "Je viens chez vous avant de toucher un clavier. Je vois votre atelier, votre boutique, vos clients. C'est là que je comprends ce qui vous rend différent.",
  },
  {
    icon: Target,
    title: "L'alignement stratégique",
    description:
      "Le marketing vient avant le design. Votre positionnement, votre ton, votre clientèle : tout ça façonne le site avant même la première maquette.",
  },
  {
    icon: HeartHandshake,
    title: "L'accompagnement humain",
    description:
      "Une fois le site en ligne, je reste. Conseils, ajustements, disponibilité réelle : le travail ne s'arrête pas à la livraison.",
  },
];

export default function AProposPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 py-16 sm:py-20">
        <GradientOrbs variant="hero" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal y={12}>
                <p className="text-sm font-semibold uppercase tracking-widest text-accent-dark">
                  À propos
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-retro-shadow mt-3 font-serif-display text-4xl leading-tight text-ink sm:text-5xl">
                  Jérôme, fondateur d&apos;AI Pro Agency.
                </h1>
                <SwashUnderline className="mt-2" />
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
                  J&apos;ai passé plusieurs années à faire du marketing avant de
                  me lancer dans le web. C&apos;est cette différence qui change
                  tout : je ne vends pas un site, je construis un outil qui parle
                  de vous, à votre façon.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <FounderPhoto />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <FloatingFlower className="right-6 top-4 hidden sm:block" size={34} duration={9} />
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif-display text-2xl text-ink sm:text-3xl">
              Mon parcours
            </h2>
            <SwashUnderline className="mx-auto mt-1" color="var(--color-rose-dark)" />
            <div className="mt-6 space-y-4 text-left leading-relaxed text-ink-soft">
              <p>
                Avant de créer des sites, j&apos;ai travaillé le
                positionnement de marque, l&apos;acquisition et la relation
                client pour des entreprises de toutes tailles. J&apos;ai vu
                trop de sites web magnifiques qui ne vendaient rien, et trop
                de belles entreprises avec un site qui ne leur ressemblait
                pas.
              </p>
              <p>
                AI Pro Agency est né de ce constat simple : un site
                performant commence par une vraie compréhension du métier,
                pas par un joli template. C&apos;est pour ça que je me
                déplace, que je prends les photos moi-même, et que je reste
                disponible après la mise en ligne.
              </p>
              <p>
                Aujourd&apos;hui, j&apos;accompagne des artisans, des
                indépendants et des TPE/PME partout en France, avec la même
                méthode et la même exigence à chaque projet.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Ma méthode — vitrine 3D pilotée par le scroll */}
      <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
        <GradientOrbs variant="dark" className="opacity-40" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-light">
              Ma méthode
            </p>
            <h2 className="mt-3 font-serif-display text-3xl text-cream sm:text-4xl">
              Trois étapes, aucun raccourci.
            </h2>
            <p className="mt-4 text-cream/70">
              Faites défiler pour découvrir comment chaque projet prend forme.
            </p>
          </Reveal>

          <div className="mt-20 space-y-16 sm:space-y-24">
            {METHODE.map((step, i) => (
              <Method3DStep
                key={step.title}
                index={i + 1}
                title={step.title}
                description={step.description}
                align={i % 2 === 0 ? "left" : "right"}
                icon={<step.icon size={26} />}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream-dark/40 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-12 text-center text-cream sm:px-16">
              <GradientOrbs variant="dark" className="opacity-50" />
              <div className="relative">
                <h2 className="font-serif-display text-3xl">
                  On discute de votre projet ?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-cream/75">
                  Un premier échange suffit pour savoir si on est faits pour
                  travailler ensemble.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button href={whatsappHref()} variant="secondary">
                    Écrire sur WhatsApp
                  </Button>
                  <Button
                    href="/contact"
                    variant="ghost"
                    className="!border-cream/30 !text-cream hover:!bg-cream/10"
                  >
                    Ouvrir le formulaire
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
