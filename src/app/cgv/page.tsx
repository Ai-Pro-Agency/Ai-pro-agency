import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente d'AI Pro Agency.",
  robots: { index: true, follow: true },
};

export default function CgvPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-serif-display text-3xl text-ink sm:text-4xl">
          Conditions générales de vente
        </h1>
        <p className="mt-3 text-sm text-ink-soft/70">
          Contenu générique fourni à titre indicatif — à faire valider par un
          professionnel du droit avant mise en ligne définitive.
        </p>

        <div className="mt-8 space-y-8 leading-relaxed text-ink-soft">
          <div>
            <h2 className="text-lg font-semibold text-ink">1. Objet</h2>
            <p className="mt-2">
              Les présentes conditions générales de vente régissent les
              prestations de création de sites internet, de refonte et de
              maintenance proposées par AI Pro Agency à ses clients,
              particuliers ou professionnels, partout en France.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">2. Devis et tarifs</h2>
            <p className="mt-2">
              Chaque prestation fait l&apos;objet d&apos;un prix fixe,
              communiqué dès le premier échange. Ce prix ne varie pas en
              cours de projet, sauf ajout d&apos;options expressément validées
              par le client avant leur réalisation.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">3. Modalités de paiement</h2>
            <p className="mt-2">
              Pour les prestations de création (packages), le paiement
              s&apos;effectue en deux temps : 50 % à la commande, 50 % à la
              livraison du site validé par le client. Les abonnements de
              maintenance sont facturés mensuellement, à partir de la mise en
              ligne du site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">4. Délais</h2>
            <p className="mt-2">
              Les délais annoncés (par exemple 5 jours ouvrés pour un site
              vitrine one-page) courent à compter de la Découverte terrain et
              de la réception de l&apos;ensemble des éléments nécessaires
              (textes, accès, validations). Un retard dans la transmission
              de ces éléments peut décaler la livraison d&apos;autant.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">5. Prestations non incluses</h2>
            <p className="mt-2">
              Sauf mention contraire, ne sont pas incluses dans les
              formules : la refonte complète d&apos;un site déjà livré, les
              campagnes publicitaires payantes, et la rédaction de contenu
              volumineux de type blog récurrent. Ces prestations font l&apos;objet
              d&apos;un devis distinct.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">6. Résiliation des abonnements</h2>
            <p className="mt-2">
              Les abonnements mensuels sont sans engagement de durée et
              peuvent être résiliés à tout moment, avec un préavis d&apos;un
              mois, par simple message écrit.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">7. Propriété du site livré</h2>
            <p className="mt-2">
              Une fois le solde réglé, le client dispose d&apos;un droit
              d&apos;usage plein sur le site livré. Le code source reste la
              propriété d&apos;AI Pro Agency sauf accord contraire écrit.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink">8. Contact et litiges</h2>
            <p className="mt-2">
              Pour toute question relative à ces conditions, contactez{" "}
              {CONTACT.email}. En cas de litige, une solution amiable sera
              recherchée en priorité.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
