import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { FloatingFlower } from "@/components/ui/FloatingFlower";
import { whatsappHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-16">
      <FloatingFlower className="right-10 top-10 hidden sm:block" size={44} duration={7} />
      <FloatingFlower className="bottom-10 left-10 hidden sm:block" size={30} duration={9} delay={0.6} />
      <Container className="text-center">
        <div className="mb-6 flex justify-center">
          <Logo size="large" priority={false} />
        </div>
        <p className="font-serif-display text-7xl text-accent-dark sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-serif-display text-3xl text-ink sm:text-4xl">
          Cette page-là, on ne l&apos;a pas construite.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
          Mais on répond vite si vous cherchez quelque chose de précis.
          Retournez à l&apos;accueil, ou écrivez-nous directement.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/">Retour à l&apos;accueil</Button>
          <Button href={whatsappHref()} variant="secondary">
            Écrire sur WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
