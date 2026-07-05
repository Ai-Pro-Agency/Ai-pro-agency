import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT } from "@/lib/constants";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

function isValidPayload(data: unknown): data is ContactPayload {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    d.name.trim().length > 0 &&
    typeof d.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
    typeof d.phone === "string" &&
    typeof d.projectType === "string" &&
    typeof d.message === "string" &&
    d.message.trim().length > 0
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Merci de vérifier les champs du formulaire." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY manquante : impossible d'envoyer l'email de contact."
    );
    return NextResponse.json(
      { error: "Le service d'envoi n'est pas encore configuré." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "AI Pro Agency <onboarding@resend.dev>",
      to: CONTACT.email,
      replyTo: body.email,
      subject: `Nouveau message de ${body.name} — ${body.projectType}`,
      text: [
        `Nom : ${body.name}`,
        `Email : ${body.email}`,
        `Téléphone : ${body.phone}`,
        `Type de projet : ${body.projectType}`,
        "",
        body.message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur d'envoi Resend :", error);
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez ou contactez-nous directement." },
      { status: 500 }
    );
  }
}
