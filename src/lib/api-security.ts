// Shared CORS + rate-limiting helpers for the public API routes. The site
// is served from Vercel, but the contact form and chat widget also run on
// the static IONOS export, which calls these routes cross-origin — so a
// real allowlisted CORS response is required, not just same-origin defaults.

const ALLOWED_ORIGINS = new Set([
  "https://ai-pro-agency.fr",
  "https://www.ai-pro-agency.fr",
  "https://www.ai-pro-agency.com",
  "https://ai-pro-agency-iota.vercel.app",
]);

if (process.env.NODE_ENV !== "production") {
  ALLOWED_ORIGINS.add("http://localhost:3000");
}

export function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin");
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

// Best-effort in-memory sliding window: resets whenever the serverless
// instance recycles, and isn't shared across regions/instances, so it
// won't stop a determined/distributed attacker — but it does blunt the
// common case (a script or bot hammering the endpoint from one place),
// which is the realistic threat for a small business site.
const buckets = new Map<string, number[]>();
const MAX_BUCKETS = 5000;

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (timestamps.length >= limit) {
    buckets.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  buckets.set(key, timestamps);

  if (buckets.size > MAX_BUCKETS) {
    const oldestKey = buckets.keys().next().value;
    if (oldestKey !== undefined) buckets.delete(oldestKey);
  }

  return false;
}

export function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
