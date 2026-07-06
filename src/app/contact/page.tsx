import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { CalendlyEmbed } from "@/components/contact/CalendlyEmbed";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { SwashUnderline } from "@/components/ui/SwashUnderline";
import { FloatingFlower } from "@/components/ui/FloatingFlower";
import { CONTACT, whatsappHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact : devis site internet artisan et TPE en France",
  description:
    "Écrivez, on répond. Vraiment, et vite. Formulaire de contact, WhatsApp, téléphone, ou réservation directe d'un appel découverte gratuit.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <GradientOrbs variant="hero" />
      <FloatingFlower className="right-10 top-8 hidden sm:block" size={42} duration={8} />
      <Container className="relative">
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Écrivez, on répond. Vraiment, et vite."
          description="Choisissez le canal qui vous convient : WhatsApp pour aller vite, le formulaire pour poser les bases, ou un appel découverte gratuit pour en discuter de vive voix."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal>
            <div className="space-y-6">
              <Button href={whatsappHref()} variant="secondary" className="w-full">
                <MessageCircle size={18} />
                Écrire sur WhatsApp
              </Button>

              <ul className="shadow-3d space-y-4 rounded-[28px] border border-ink/10 bg-white p-6">
                <li>
                  <a
                    href={CONTACT.phoneHref}
                    className="flex items-center gap-3 text-ink hover:text-accent-dark"
                  >
                    <Phone size={20} className="text-accent-dark" />
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-3 text-ink hover:text-accent-dark"
                  >
                    <Mail size={20} className="text-accent-dark" />
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-ink-soft">
                  <MapPin size={20} className="text-accent-dark" />
                  {CONTACT.zone}
                </li>
              </ul>

              <div>
                <h2 className="font-serif-display text-xl text-ink">
                  Réserver un appel découverte gratuit
                </h2>
                <SwashUnderline className="mt-1 h-3 w-24" color="var(--color-rose-dark)" />
                <p className="mt-2 text-ink-soft">
                  15 minutes pour parler de votre projet et savoir si on
                  avance ensemble.
                </p>
                <div className="mt-4">
                  <CalendlyEmbed />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="shadow-3d rounded-[28px] border border-ink/10 bg-white p-6 sm:p-8">
              <h2 className="font-serif-display text-xl text-ink">
                Ou décrivez votre projet ici
              </h2>
              <SwashUnderline className="mt-1 h-3 w-24" color="var(--color-green-dark)" />
              <p className="mt-2 text-ink-soft">
                Quelques lignes suffisent, on affine ensemble par la suite.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
