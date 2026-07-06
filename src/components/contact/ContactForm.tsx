"use client";

import { FormEvent, useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { API_BASE } from "@/lib/constants";

const PROJECT_TYPES = [
  "Site vitrine",
  "Refonte",
  "Maintenance",
  "Autre / je ne sais pas encore",
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement)
        .value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Une erreur est survenue.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Une erreur est survenue."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-white p-8 text-center">
        <CheckCircle2 size={40} className="text-accent-dark" />
        <p className="font-serif-display text-xl text-ink">
          Message envoyé, merci !
        </p>
        <p className="text-ink-soft">
          Je reviens vers vous rapidement, en général sous quelques heures.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-accent-dark"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-accent-dark"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-accent-dark"
          />
        </div>
        <div>
          <label
            htmlFor="projectType"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            Type de projet
          </label>
          <select
            id="projectType"
            name="projectType"
            className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-accent-dark"
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-accent-dark"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={18} className="shrink-0" />
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-accent hover:text-ink disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        Envoyer le message
      </button>
    </form>
  );
}
