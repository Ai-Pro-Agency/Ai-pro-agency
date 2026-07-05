"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "ai-pro-agency-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Deferred to the client: localStorage isn't available during server render,
    // so the banner must decide visibility post-mount.
    const consent = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!consent) setVisible(true);
  }, []);

  function choose(value: "accepted" | "refused") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm leading-relaxed text-ink-soft">
          Ce site utilise des cookies pour mesurer son audience et améliorer
          votre expérience. Vous choisissez librement, à tout moment. En
          savoir plus dans notre{" "}
          <Link href="/confidentialite" className="underline hover:text-accent-dark">
            politique de confidentialité
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => choose("refused")}
            className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
          >
            Refuser
          </button>
          <button
            onClick={() => choose("accepted")}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream hover:bg-accent hover:text-ink"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
