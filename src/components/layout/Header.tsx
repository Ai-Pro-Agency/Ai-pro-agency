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
      <header className="sticky top-0 z-40 border-b border-cream/10 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 sm:px-8">
        <Link href="/" aria-label="AI Pro Agency, retour à l'accueil">
          <Logo variant="light" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "font-script text-lg font-bold transition-colors hover:text-cream",
                pathname === link.href ? "text-cream" : "text-cream/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={CONTACT.phoneHref}
            className="font-script flex items-center gap-2 text-lg font-bold text-cream/60 hover:text-cream"
          >
            <Phone size={16} />
            {CONTACT.phone}
          </a>
          <Button
            href="/tarifs"
            variant="secondary"
            className="border border-cream !bg-cream px-5 py-2.5 !text-ink hover:!bg-transparent hover:!text-cream"
          >
            Voir le prix
          </Button>
        </div>

        <button
          aria-label="Ouvrir le menu"
          className="flex items-center justify-center rounded-full p-2 text-cream lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-cream/10 bg-ink lg:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "font-script rounded-lg px-3 py-3 text-xl font-bold",
                  pathname === link.href
                    ? "bg-cream/10 text-cream"
                    : "text-cream/60"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CONTACT.phoneHref}
              className="font-script mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-xl font-bold text-cream"
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
