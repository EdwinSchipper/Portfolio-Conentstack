import type { MetadataRoute } from "next";

/**
 * Next.js Dynamic Robots.txt configuration
 * Automatically serves /robots.txt for search engine crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.edwinschipper.nl";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/skills/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
