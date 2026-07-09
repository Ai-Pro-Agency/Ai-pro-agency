import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT } from "@/lib/constants";
import { corsHeaders, isRateLimited, clientIp } from "@/lib/api-security";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const NAME_MAX = 100;
const PHONE_MAX = 30;
const PROJECT_TYPE_MAX = 60;
const MESSAGE_MAX = 4000;

function isValidPayload(data: unknown): data is ContactPayload {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    d.name.trim().length > 0 &&
    d.name.length <= NAME_MAX &&
    typeof d.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
    typeof d.phone === "string" &&
    d.phone.length <= PHONE_MAX &&
    typeof d.projectType === "string" &&
    d.projectType.length <= PROJECT_TYPE_MAX &&
    typeof d.message === "string" &&
    d.message.trim().length > 0 &&
    d.message.length <= MESSAGE_MAX
  );
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  const headers = corsHeaders(request);

  if (isRateLimited(`contact:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers }
    );
  }

  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Merci de vérifier les champs du formulaire." },
      { status: 400, headers }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY manquante : impossible d'envoyer l'email de contact."
    );
    return NextResponse.json(
      { error: "Le service d'envoi n'est pas encore configuré." },
      { status: 500, headers }
    );
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "AI Pro Agency <onboarding@resend.dev>",
      to: CONTACT.email,
      replyTo: body.email,
      subject: `Nouveau message de ${body.name} (${body.projectType})`,
      text: [
        `Nom : ${body.name}`,
        `Email : ${body.email}`,
        `Téléphone : ${body.phone}`,
        `Type de projet : ${body.projectType}`,
        "",
        body.message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true }, { headers });
  } catch (error) {
    console.error("Erreur d'envoi Resend :", error);
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez ou contactez-nous directement." },
      { status: 500, headers }
    );
  }
}
