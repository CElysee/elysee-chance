import type { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo";

const publicRoutes = ["/", "/rsvp", "/gallery", "/guestbook"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: `${seoConfig.siteUrl}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/rsvp" ? 0.9 : 0.6,
    images:
      route === "/"
        ? [`${seoConfig.siteUrl}${seoConfig.defaultImage}`]
        : undefined,
    alternates: {
      languages: {
        en: `${seoConfig.siteUrl}${route === "/" ? "" : route}`,
      },
    },
  }));
}
