import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et de protection des données d'AI Pro Agency, conforme au RGPD.",
  robots: { index: true, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-serif-display text-3xl text-ink sm:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mt-3 text-sm text-ink-soft/70">
          Contenu générique fourni à titre indicatif — à faire valider par un
          professionnel du droit avant mise en ligne définitive.
        </p>

        <div className="mt-8 space-y-8 leading-relaxed text-ink-soft">
          <div>
            <h2 className="text-lg font-semibold text-ink">
              1. Responsable du traitement
            </h2>
            <p className="mt-2">
              AI Pro Agency, représentée par Jérôme, est responsable du
              traitement des données collectées via ce site. Contact :{" "}
              {CONTACT.email}.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">
              2. Données collectées
            </h2>
            <p className="mt-2">
              Via le formulaire de contact : nom, email, téléphone, type de
              projet et message. Via la navigation : données de mesure
              d&apos;audience, sous réserve de votre consentement au bandeau
              cookies.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">
              3. Finalité du traitement
            </h2>
            <p className="mt-2">
              Ces données sont utilisées uniquement pour répondre à vos
              demandes de devis ou de contact, et pour améliorer
              l&apos;expérience de navigation sur le site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">
              4. Durée de conservation
            </h2>
            <p className="mt-2">
              Les données issues du formulaire de contact sont conservées le
              temps nécessaire au traitement de votre demande, puis pendant 3
              ans maximum à des fins de suivi commercial, sauf demande de
              suppression de votre part.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">
              5. Vos droits (RGPD)
            </h2>
            <p className="mt-2">
              Conformément au Règlement Général sur la Protection des
              Données, vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement et d&apos;opposition
              concernant vos données personnelles. Pour exercer ces droits,
              écrivez à {CONTACT.email}.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">6. Cookies</h2>
            <p className="mt-2">
              Ce site utilise des cookies de mesure d&apos;audience. Vous
              pouvez accepter ou refuser leur dépôt via le bandeau affiché
              lors de votre première visite, et modifier votre choix à tout
              moment en effaçant les données de navigation de votre
              navigateur.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">
              7. Destinataires des données
            </h2>
            <p className="mt-2">
              Les données collectées sont destinées uniquement à AI Pro
              Agency et à ses prestataires techniques (hébergement, envoi
              d&apos;emails), dans le seul cadre du traitement de votre
              demande.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
