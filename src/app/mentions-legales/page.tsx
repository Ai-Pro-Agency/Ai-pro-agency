import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site AI Pro Agency.",
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-serif-display text-3xl text-ink sm:text-4xl">
          Mentions légales
        </h1>
        <div className="prose-legal mt-8 space-y-8 leading-relaxed text-ink-soft">
          <div>
            <h2 className="text-lg font-semibold text-ink">Éditeur du site</h2>
            <p className="mt-2">
              Le site AI Pro Agency est édité par Jérôme, entrepreneur
              individuel.
              <br />
              Contact : {CONTACT.email} / {CONTACT.phone}
              <br />
              Zone d&apos;intervention : {CONTACT.zone}
              <br />
              [Forme juridique, numéro SIRET et adresse du siège à compléter
              avant mise en ligne définitive.]
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">Directeur de la publication</h2>
            <p className="mt-2">Jérôme, fondateur d&apos;AI Pro Agency.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">Hébergement</h2>
            <p className="mt-2">
              Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, États-Unis.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">Propriété intellectuelle</h2>
            <p className="mt-2">
              L&apos;ensemble des contenus présents sur ce site (textes,
              images, logos, mises en page) est protégé par le droit
              d&apos;auteur. Toute reproduction, même partielle, est soumise à
              autorisation préalable.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">Limitation de responsabilité</h2>
            <p className="mt-2">
              AI Pro Agency s&apos;efforce d&apos;assurer l&apos;exactitude
              des informations diffusées sur ce site, sans garantie
              d&apos;exhaustivité. L&apos;éditeur ne saurait être tenu
              responsable des erreurs, omissions ou de l&apos;indisponibilité
              temporaire du site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">Contact</h2>
            <p className="mt-2">
              Pour toute question relative au site, contactez-nous à{" "}
              {CONTACT.email} ou au {CONTACT.phone}.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
