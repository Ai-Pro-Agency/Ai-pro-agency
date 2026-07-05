import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const routes = [
  "",
  "/services",
  "/tarifs",
  "/realisations",
  "/a-propos",
  "/contact",
  "/faq",
  "/mentions-legales",
  "/cgv",
  "/confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
