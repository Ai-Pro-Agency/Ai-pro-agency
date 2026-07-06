import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsGrid } from "@/components/realisations/ProjectsGrid";
import { GradientOrbs } from "@/components/ui/GradientOrbs";
import { FloatingFlower } from "@/components/ui/FloatingFlower";

export const metadata: Metadata = {
  title: "Réalisations : sites artisans, indépendants et TPE en France",
  description:
    "Nos réalisations client et quelques projets démonstration, pour montrer l'étendue de notre approche.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <GradientOrbs variant="earth" />
      <FloatingFlower className="right-10 top-8 hidden sm:block" size={42} duration={8} />
      <Container className="relative">
        <SectionHeading
          as="h1"
          eyebrow="Réalisations"
          title="Un aperçu de ce qu'on construit ensemble."
          description="Un vrai projet client, complété par quelques projets démonstration conçus pour montrer notre méthode et notre niveau d'exigence."
        />
        <div className="mt-10">
          <ProjectsGrid />
        </div>
      </Container>
    </section>
  );
}
