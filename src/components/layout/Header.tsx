"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import clsx from "clsx";
import { NAV_LINKS, CONTACT } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { TopBanner } from "@/components/layout/TopBanner";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <TopBanner />
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 sm:px-8">
        <Link href="/" aria-label="AI Pro Agency — retour à l'accueil">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "font-script text-lg font-bold transition-colors hover:text-accent-dark",
                pathname === link.href ? "text-accent-dark" : "text-ink-soft"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={CONTACT.phoneHref}
            className="font-script flex items-center gap-2 text-lg font-bold text-ink-soft hover:text-accent-dark"
          >
            <Phone size={16} />
            {CONTACT.phone}
          </a>
          <Button href="/tarifs" variant="secondary" className="px-5 py-2.5">
            Voir le prix
          </Button>
        </div>

        <button
          aria-label="Ouvrir le menu"
          className="flex items-center justify-center rounded-full p-2 text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-cream lg:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "font-script rounded-lg px-3 py-3 text-xl font-bold",
                  pathname === link.href
                    ? "bg-ink/5 text-accent-dark"
                    : "text-ink-soft"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CONTACT.phoneHref}
              className="font-script mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-xl font-bold text-ink"
            >
              <Phone size={18} />
              {CONTACT.phone}
            </a>
          </nav>
        </div>
      )}
      </header>
    </>
  );
}
