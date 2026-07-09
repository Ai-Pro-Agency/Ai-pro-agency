import type { Metadata } from "next";
import { Inter, Fraunces, Lobster_Two } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SITE_URL } from "@/lib/constants";
import { localBusinessJsonLd } from "@/lib/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

const lobsterTwo = Lobster_Two({
  variable: "--font-lobster-two",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Pro Agency : sites web premium pour artisans et TPE en France",
    template: "%s | AI Pro Agency",
  },
  description:
    "L'agence web qui vient chez vous, qui répond en vrai, et qui tient ses prix. Sites vitrines premium pour artisans, indépendants et TPE/PME, livrés en 5 jours, partout en France.",
  keywords: [
    "création site internet artisan",
    "site vitrine TPE PME",
    "agence web France",
    "site web indépendant",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "AI Pro Agency",
    title: "AI Pro Agency : sites web premium pour artisans et TPE en France",
    description:
      "Un site pro, livré en 5 jours, à un prix clair dès le premier échange. On va à l'essentiel.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Pro Agency : sites web premium pour artisans et TPE en France",
    description:
      "Un site pro, livré en 5 jours, à un prix clair dès le premier échange.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${fraunces.variable} ${lobsterTwo.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <GrainOverlay />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
