import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACT, NAV_LINKS, FOOTER_LEGAL_LINKS, whatsappHref } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-cream">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo size="large" variant="light" priority={false} className="mb-5" />
            <p className="text-sm leading-relaxed text-cream/70">
              L&apos;agence web qui vient chez vous, qui répond en vrai, et qui
              tient ses prix.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cream/50">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/80 hover:text-accent-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cream/50">
              Contact
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-2 text-sm text-cream/80 hover:text-accent-light"
                >
                  <Phone size={16} /> {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 text-sm text-cream/80 hover:text-accent-light"
                >
                  <Mail size={16} /> {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-cream/80 hover:text-accent-light"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-cream/80">
                <MapPin size={16} /> {CONTACT.zone}
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cream/50">
              Légal
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/80 hover:text-accent-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 text-xs text-cream/50">
          © {new Date().getFullYear()} AI Pro Agency. Tous droits réservés.
        </div>
      </Container>
    </footer>
  );
}
