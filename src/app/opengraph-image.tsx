import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#15120d",
          color: "#f8f6f0",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c9a35c",
            marginBottom: 28,
          }}
        >
          AI Pro Agency
        </div>
        <div
          style={{
            width: 220,
            height: 2,
            background: "linear-gradient(90deg, transparent, #c9a35c, transparent)",
            marginBottom: 28,
          }}
        />
        <div
          style={{
            fontSize: 56,
            fontWeight: 600,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          Sites web premium pour artisans et TPE, partout en France
        </div>
        <div style={{ fontSize: 26, color: "#c9a35c", marginTop: 32 }}>
          Livré en 5 jours · Prix fixe dès le premier échange
        </div>
      </div>
    ),
    { ...size }
  );
}
