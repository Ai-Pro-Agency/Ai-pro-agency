"use client";

import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface AccordionItemData {
  question: string;
  answer: ReactNode;
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      className="divide-y divide-ink/10 overflow-hidden rounded-[28px] border border-ink/10 bg-white"
      style={{
        boxShadow:
          "0 1px 2px rgba(23,20,15,0.05), 0 12px 24px -8px rgba(23,20,15,0.10), 0 32px 56px -20px rgba(23,20,15,0.14)",
      }}
    >
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.question}
            className={clsx("relative transition-colors", isOpen && "bg-accent/5")}
          >
            {isOpen && (
              <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden />
            )}
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span
                className={clsx(
                  "text-base font-medium transition-colors",
                  isOpen ? "text-ink" : "text-ink-soft"
                )}
              >
                {item.question}
              </span>
              <span
                className={clsx(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-180 border-accent bg-accent text-ink"
                    : "border-ink/15 text-ink-soft"
                )}
              >
                <ChevronDown size={16} />
              </span>
            </button>
            <div
              className={clsx(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 leading-relaxed text-ink-soft">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
