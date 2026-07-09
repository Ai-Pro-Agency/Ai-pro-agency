"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ExternalLink } from "lucide-react";
import clsx from "clsx";
import { DEMO_PROJECTS, SECTORS } from "@/lib/projects";
import { PosterCard, BlockColor } from "@/components/ui/PosterCard";

const GRADIENT_ENDS = ["var(--color-rose)", "var(--color-green)", "var(--color-brown)"];
const BLOCKS: BlockColor[] = ["green", "brown", "rose"];
const ROTATIONS = [1.5, -2, 2];

export function ProjectsGrid() {
  const [sector, setSector] = useState<string>("Tous");

  const filtered =
    sector === "Tous"
      ? DEMO_PROJECTS
      : DEMO_PROJECTS.filter((p) => p.sector === sector);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {SECTORS.map((s) => (
          <button
            key={s}
            onClick={() => setSector(s)}
            className={clsx(
              "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              sector === s
                ? "text-cream"
                : "bg-white text-ink-soft border border-ink/10 hover:border-ink/30"
            )}
          >
            {sector === s && (
              <m.span
                layoutId="sector-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative">{s}</span>
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <m.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <PosterCard
                  rotate={ROTATIONS[i % ROTATIONS.length]}
                  blockColor={BLOCKS[i % BLOCKS.length]}
                  className="overflow-hidden"
                >
                  {project.image ? (
                    <div className="relative h-64 w-full overflow-hidden sm:h-80">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-64 w-full sm:h-80"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}, ${GRADIENT_ENDS[i % GRADIENT_ENDS.length]})`,
                      }}
                    />
                  )}
                  <div className="p-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent-dark">
                      {project.isDemo ? "Projet démonstration" : "Client réel"} · {project.sector}
                    </p>
                    <p className="mt-2 font-serif-display text-2xl text-ink">
                      {project.name}
                    </p>
                    <p className="mt-3 text-lg leading-relaxed text-ink-soft">
                      {project.description}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-1.5 text-base font-semibold text-accent-dark hover:underline"
                      >
                        Voir le site
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </PosterCard>
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 rounded-2xl border border-dashed border-ink/20 bg-white/60 px-8 py-16 text-center"
        >
          <p className="font-serif-display text-xl text-ink">
            Pas encore de projet dans ce secteur.
          </p>
          <p className="mt-2 text-ink-soft">
            Le vôtre pourrait bien être le premier.
          </p>
        </m.div>
      )}
    </div>
  );
}
