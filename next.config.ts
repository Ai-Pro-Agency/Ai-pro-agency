import type { NextConfig } from "next";

// Set by scripts/build.mjs when building the static package for IONOS
// Deploy Now, which has no Node.js runtime and can't run headers()/API routes.
const isStaticExport = process.env.STATIC_EXPORT === "1";

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
        ];
      },
    };

export default nextConfig;
