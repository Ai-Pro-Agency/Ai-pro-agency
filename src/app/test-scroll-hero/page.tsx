import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { ArrowRight, Camera, Compass, MessageCircle, Layout, RefreshCcw, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { Marquee } from "@/components/ui/Marquee";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { IconBadge, BadgeColor } from "@/components/ui/IconBadge";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { PosterCard, BlockColor } from "@/components/ui/PosterCard";
import { FloatingFlower } from "@/components/ui/FloatingFlower";
import { CONTACT, whatsappHref } from "@/lib/constants";
import { DEMO_PROJECTS } from "@/lib/projects";
import { ScrollVideoHero, ScrollVideoPanel } from "@/components/ui/ScrollVideoHero";

// Page de test isolée : reprend le corps réel de la page d'accueil, avec la
// Hero remplacée par le moteur scroll-driven video. N'est liée nulle part
// dans la navigation, uniquement accessible via son URL directe en local.

const PROMISES = [
  "Ici, le service client, c'est moi. Je réponds vite.",
  "Ma seule stratégie, c'est un site qui donne envie d'appeler.",
  "Le prix est fixe, écrit noir sur blanc dès le premier échange.",
  "Vous payez la moitié avant, la moitié après avoir vu le site. Simple et équitable.",
];

const PROMISE_COLORS: BlockColor[] = ["rose", "green", "beige", "brown"];
const DARK_BADGES: BlockColor[] = ["brown", "green"];
const ROTATIONS = [-2, 1.5, -1.5, 2];

const SERVICES: { icon: typeof Layout; title: string; description: string; color: BadgeColor }[] = [
  { icon: Layout, title: "Site vitrine", description: "Le site que vous auriez dû avoir il y a trois ans.", color: "beige" },
  { icon: RefreshCcw, title: "Refonte", description: "Votre site actuel mérite mieux. On lui redonne de l'allure.", color: "rose" },
  { icon: Wrench, title: "Maintenance", description: "79 €/mois, et votre site reste vivant tout seul.", color: "green" },
];

const SERVICE_ROTATIONS = [-2, 2, -2];
const SERVICE_BLOCKS: BlockColor[] = ["rose", "green", "brown"];

const PROJECT_GRADIENT_ENDS = ["var(--color-rose)", "var(--color-green)", "var(--color-brown)"];
const PROJECT_BLOCKS: BlockColor[] = ["green", "brown", "rose"];
const PROJECT_ROTATIONS = [1.5, -2, 2];

const STATS = [
  { value: 5, suffix: " jours", label: "Délai de livraison moyen" },
  { value: 100, suffix: "%", label: "Prix fixe, annoncé à l'avance" },
  { value: 50, suffix: "/50", label: "Paiement avant/après livraison" },
  { value: 0, suffix: " jargon", label: "Juste un site qui vous ressemble" },
];

export const metadata: Metadata = {
  title: "Test scroll-driven video",
  robots: { index: false, follow: false },
};

const HERO_FRAME_COUNT = 237;

const PANELS: ScrollVideoPanel[] = [
  {
    key: "intro",
    eyebrow: "AI Pro Agency",
    title: (
      <>
        L&apos;agence qui vient{" "}
        <em className="font-serif-hero-accent text-accent-light">chez vous</em>.
      </>
    ),
    lede: "Sites web premium pour artisans et TPE, partout en France.",
    revealStart: 0,
    revealEnd: 0.18,
    revealFrom: "up",
    position: { vertical: "bottom", horizontal: "mid" },
  },
  {
    key: "promesse",
    eyebrow: "La promesse",
    title: (
      <>
        Ici, le service client,{" "}
        <em className="font-serif-hero-accent text-accent-light">c&apos;est moi</em>.
      </>
    ),
    lede: "Je réponds vite, en vrai, sans standard téléphonique.",
    revealStart: 0.22,
    revealEnd: 0.45,
    revealFrom: "right",
    position: { vertical: "bottom", horizontal: "right" },
  },
  {
    key: "prix",
    eyebrow: "Le prix",
    title: (
      <>
        Fixe, écrit noir sur blanc,{" "}
        <em className="font-serif-hero-accent text-accent-light">dès le premier échange</em>.
      </>
    ),
    lede: "Vous payez la moitié avant, la moitié après avoir vu le site.",
    revealStart: 0.47,
    revealEnd: 0.78,
    revealFrom: "left",
    position: { vertical: "center", horizontal: "right" },
  },
  {
    key: "delai",
    eyebrow: "Le délai",
    title: (
      <>
        Cinq jours pour un site{" "}
        <em className="font-serif-hero-accent text-accent-light">vitrine</em>.
      </>
    ),
    lede: "Découverte terrain, shooting photo, mise en ligne.",
    revealStart: 0.8,
    revealEnd: 0.9,
    revealFrom: "down",
    position: { vertical: "top", horizontal: "right" },
  },
  {
    key: "final",
    eyebrow: "AI Pro Agency",
    title: (
      <>
        Un site qui vous ressemble,{" "}
        <em className="font-serif-hero-accent text-accent-light">vraiment</em>.
      </>
    ),
    lede: "Défilez encore pour découvrir notre approche.",
    revealStart: 0.9,
    revealEnd: 1,
    revealFrom: "up",
    position: { vertical: "bottom", horizontal: "mid" },
  },
];

export default function TestScrollHeroPage() {
  return (
    <>
      {/* Hero scroll-driven video (test) */}
      <ScrollVideoHero
        framesPath="/hero-frames/"
        frameCount={HERO_FRAME_COUNT}
        padSize={3}
        ext="jpg"
        scrollVh={640}
        panels={PANELS}
      />

      <Marquee
        items={[
          { value: "5 jours", label: "Délai de livraison" },
          { value: "100%", label: "Prix fixe garanti" },
          { value: "50/50", label: "Paiement équitable" },
          { label: "Partout en France" },
          { label: "Réponse en direct" },
          { label: "Sites sur-mesure" },
        ]}
      />

      {/* Chiffres clés */}
      <section className="py-16 sm:py-20">
        <Container>
          <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat) => (
              <RevealItem key={stat.label} className="text-center lg:text-left">
                <p className="font-serif-display text-4xl text-accent-dark sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-ink-soft">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* La promesse */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <FloatingFlower className="right-8 top-6 hidden sm:block" size={44} duration={7} />
        <Container>
          <SectionHeading
            eyebrow="La promesse"
            title="Quatre engagements, aucune surprise."
            swashColor="var(--color-rose-dark)"
          />
          <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2">
            {PROMISES.map((text, i) => (
              <RevealItem key={text}>
                <PosterCard rotate={ROTATIONS[i]} blockColor={PROMISE_COLORS[i]} className="p-6">
                  <span
                    className={clsx(
                      "mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink text-sm font-bold",
                      DARK_BADGES.includes(PROMISE_COLORS[i]) ? "text-cream" : "text-ink"
                    )}
                    style={{ backgroundColor: `var(--color-${PROMISE_COLORS[i]})` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-medium leading-relaxed text-ink">{text}</p>
                </PosterCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <WaveDivider color="var(--color-ink)" className="relative z-10 -mb-1" />

      {/* La Découverte */}
      <section className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
        <GradientOrbs variant="dark" className="opacity-60" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <IconBadge icon={Compass} color="rose" size={20} />
                <p className="text-sm font-semibold uppercase tracking-widest text-accent-light">La Découverte</p>
              </div>
              <p className="mt-6 text-2xl font-serif-display leading-snug sm:text-3xl">
                Je viens sur place, dans votre boutique, votre atelier, votre vitrine, et je prends les photos moi-même.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-cream/75">
                Opticien, artisan, commerçant : la façade, les produits, l&apos;ambiance, en vrai.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex items-center gap-3">
                <IconBadge icon={Camera} color="green" size={20} />
                <p className="text-sm font-semibold uppercase tracking-widest text-accent-light">Aligné avec vous</p>
              </div>
              <p className="mt-6 text-2xl font-serif-display leading-snug sm:text-3xl">
                Avant d&apos;ouvrir mon ordinateur, j&apos;ai fait du marketing.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-cream/75">
                Votre site est aligné avec votre positionnement, votre ton, ce qui vous rend différent. Et une fois en ligne, je reste là pour vous conseiller.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <WaveDivider color="var(--color-cream)" flip className="relative z-10 -mt-1" />

      {/* Nos services */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <FloatingFlower className="left-6 top-10 hidden sm:block" size={36} duration={9} delay={0.5} />
        <Container>
          <SectionHeading
            eyebrow="Nos services"
            title="Trois façons de faire avancer votre site."
            swashColor="var(--color-green-dark)"
          />
          <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, description, color }, i) => (
              <RevealItem key={title} className={i === 1 ? "lg:mt-10" : i === 2 ? "lg:mt-4" : undefined}>
                <PosterCard rotate={SERVICE_ROTATIONS[i]} blockColor={SERVICE_BLOCKS[i]} className="h-full">
                  <Link href="/services" className="group flex h-full flex-col p-7">
                    <IconBadge
                      icon={Icon}
                      color={color}
                      className="w-fit transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    />
                    <p className="mt-5 font-serif-display text-xl text-ink">{title}</p>
                    <p className="mt-2 flex-1 text-ink-soft">{description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark">
                      En savoir plus
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </PosterCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Réalisations */}
      <section className="relative overflow-hidden bg-cream-dark/40 py-24 sm:py-32">
        <FloatingFlower className="right-10 top-16 hidden sm:block" size={40} duration={8} delay={1} />
        <Container>
          <SectionHeading
            eyebrow="Réalisations"
            title="Un aperçu de ce qu'on construit ensemble."
            description="Un vrai projet client, et quelques exemples démonstration pour montrer l'étendue de notre approche."
            swashColor="var(--color-brown)"
          />
          <RevealGroup className="mt-14 grid gap-10 lg:grid-cols-2">
            {DEMO_PROJECTS.slice(0, 2).map((project, i) => (
              <RevealItem key={project.slug}>
                <PosterCard rotate={PROJECT_ROTATIONS[i]} blockColor={PROJECT_BLOCKS[i]} className="overflow-hidden">
                  {project.image ? (
                    <div className="relative h-64 w-full overflow-hidden sm:h-80">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-64 w-full sm:h-80"
                      style={{ background: `linear-gradient(135deg, ${project.color}, ${PROJECT_GRADIENT_ENDS[i % PROJECT_GRADIENT_ENDS.length]})` }}
                    />
                  )}
                  <div className="p-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent-dark">
                      {project.isDemo ? "Projet démonstration" : "Client réel"} · {project.sector}
                    </p>
                    <p className="mt-2 font-serif-display text-2xl text-ink">{project.name}</p>
                    <p className="mt-3 text-lg leading-relaxed text-ink-soft">{project.description}</p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-1.5 text-base font-semibold text-accent-dark hover:underline"
                      >
                        Voir le site
                        <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                </PosterCard>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-14 text-center">
            <Button href="/realisations" variant="ghost">
              Voir toutes les réalisations
              <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>

      {/* Bloc contact final */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-center text-cream sm:px-16">
              <GradientOrbs variant="dark" className="opacity-50" />
              <FloatingFlower className="right-10 top-8 hidden sm:block" size={36} duration={7} />
              <div className="relative">
                <h2 className="font-serif-display text-3xl sm:text-4xl">Écrivez, on répond. Vraiment, et vite.</h2>
                <p className="mx-auto mt-4 max-w-lg text-lg text-cream/75">
                  Téléphone, WhatsApp, email : choisissez le canal qui vous convient.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a href={CONTACT.phoneHref} className="text-lg font-semibold text-cream hover:text-accent-light">
                    {CONTACT.phone}
                  </a>
                  <span className="hidden text-cream/30 sm:inline">·</span>
                  <a href={`mailto:${CONTACT.email}`} className="text-lg font-semibold text-cream hover:text-accent-light">
                    {CONTACT.email}
                  </a>
                </div>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button href={whatsappHref()} variant="secondary">
                    <MessageCircle size={18} />
                    Écrire sur WhatsApp
                  </Button>
                  <Button href="/contact" variant="ghost" className="!border-cream/30 !text-cream hover:!bg-cream/10">
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
