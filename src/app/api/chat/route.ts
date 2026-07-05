import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/chat-context";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function isValidMessages(data: unknown): data is ChatMessage[] {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY manquante : chatbot indisponible.");
    return new Response(
      JSON.stringify({ error: "Le chatbot n'est pas encore configuré." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await request.json().catch(() => null);
  const messages = body?.messages;

  if (!isValidMessages(messages)) {
    return new Response(JSON.stringify({ error: "Message invalide." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
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
    },
  });
}
