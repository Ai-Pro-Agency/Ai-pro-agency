import type { NextConfig } from "next";

// Set by scripts/build.mjs when building the static package for IONOS
// Deploy Now, which has no Node.js runtime and can't run headers()/API routes.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://calendly.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      images: { unoptimized: true },
    }
  : {
      async headers() {
        return [
          {
            source: "/hero-frames/:path*",
            headers: [
              { key: "Cache-Control", value: "public, max-age=604800" },
            ],
          },
          {
            source: "/:path*",
            headers: SECURITY_HEADERS,
          },
        ];
      },
    };

export default nextConfig;
