import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/chat-context";
import { corsHeaders, isRateLimited, clientIp } from "@/lib/api-security";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MESSAGE_CONTENT_MAX = 2000;
const MESSAGES_ARRAY_MAX = 40;

function isValidMessages(data: unknown): data is ChatMessage[] {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.length <= MESSAGES_ARRAY_MAX &&
    data.every(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0 &&
        m.content.length <= MESSAGE_CONTENT_MAX
    )
  );
}

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  const cors = corsHeaders(request);

  if (isRateLimited(`chat:${clientIp(request)}`, 20, 10 * 60 * 1000)) {
    return new Response(JSON.stringify({ error: "Trop de messages. Réessayez dans quelques minutes." }), {
      status: 429,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY manquante : chatbot indisponible.");
    return new Response(
      JSON.stringify({ error: "Le chatbot n'est pas encore configuré." }),
      { status: 500, headers: { "Content-Type": "application/json", ...cors } }
    );
  }

  const body = await request.json().catch(() => null);
  const messages = body?.messages;

  if (!isValidMessages(messages)) {
    return new Response(JSON.stringify({ error: "Message invalide." }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...cors },
    });
  }

  // Keep recent history only: bounds latency and cost for a support widget.
  const trimmed = messages.slice(-12);

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model: "claude-haiku-4-5",
          max_tokens: 500,
          system: buildSystemPrompt(),
          messages: trimmed.map((m) => ({ role: m.role, content: m.content })),
        });

        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (error) {
        console.error("Erreur de streaming Claude :", error);
        controller.enqueue(
          encoder.encode(
            "\n\nDésolé, une erreur est survenue. Écrivez-nous sur WhatsApp, on répond vite !"
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      ...cors,
    },
  });
}
