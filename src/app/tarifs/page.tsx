import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { PricingTable } from "@/components/tarifs/PricingTable";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { SwashUnderline } from "@/components/ui/SwashUnderline";
import { FloatingFlower } from "@/components/ui/FloatingFlower";
import {
  PACKAGE_TIERS,
  PACKAGE_ROWS,
  PACKAGE_FOOTNOTE,
  SUBSCRIPTION_TIERS,
  SUBSCRIPTION_ROWS,
  SUBSCRIPTION_FOOTNOTE,
  OPTIONS_CATALOG,
} from "@/lib/pricing";
import { whatsappHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tarifs site internet artisan et TPE en France",
  description:
    "Des prix fixes, écrits noir sur blanc dès le premier échange : packages de création (1 600 € à partir de 4 000 €) et abonnements de maintenance (79 € à 299 €/mois).",
};

export default function TarifsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 py-16 sm:py-20">
        <GradientOrbs variant="hero" />
        <FloatingFlower className="right-10 top-8 hidden sm:block" size={42} duration={8} />
        <Container className="relative">
          <SectionHeading
            eyebrow="Tarifs"
            title="Le prix est clair. Toujours."
            description="Trois formules de création, trois formules d'accompagnement. Vous savez exactement ce que vous payez, et pourquoi."
          />
        </Container>
      </section>

      {/* Packages */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <h2 className="font-serif-display text-2xl text-ink sm:text-3xl">
              Packages : création du site
            </h2>
            <SwashUnderline className="mt-1" color="var(--color-rose-dark)" />
            <p className="mt-3 text-ink-soft">
              Paiement unique. La moitié avant, la moitié après avoir vu le
              site.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <PricingTable
              tiers={PACKAGE_TIERS}
              rows={PACKAGE_ROWS}
              footnote={PACKAGE_FOOTNOTE}
            />
          </Reveal>
        </Container>
      </section>

      {/* Abonnements */}
      <section className="bg-cream-dark/40 py-16 sm:py-20">
        <Container>
          <Reveal>
            <h2 className="font-serif-display text-2xl text-ink sm:text-3xl">
              Abonnements mensuels : après la mise en ligne
            </h2>
            <SwashUnderline className="mt-1" color="var(--color-green-dark)" />
            <p className="mt-3 text-ink-soft">
              L&apos;accompagnement qui garde votre site vivant, sans jamais
              vous laisser seul.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <PricingTable
              tiers={SUBSCRIPTION_TIERS}
              rows={SUBSCRIPTION_ROWS}
              footnote={SUBSCRIPTION_FOOTNOTE}
            />
          </Reveal>
        </Container>
      </section>

      {/* Options à la carte */}
      <section className="bg-cream-dark/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="À la carte"
            title="Des options pour aller exactement où vous voulez."
          />
          <div className="mt-10 space-y-4">
            <Accordion
              items={OPTIONS_CATALOG.map((cat) => ({
                question: cat.category,
                answer: (
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between gap-4"
                      >
                        <span>{item.name}</span>
                        <span className="font-semibold text-accent-dark">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                ),
              }))}
            />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-12 text-center text-cream sm:px-16">
              <GradientOrbs variant="dark" className="opacity-50" />
              <div className="relative">
                <h2 className="font-serif-display text-3xl">
                  Un prix vous parle ? Parlons-en, vraiment.
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-cream/75">
                  Un échange rapide suffit pour cadrer votre projet et vous
                  donner un prix ferme.
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
