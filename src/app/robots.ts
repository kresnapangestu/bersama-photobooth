import type { MetadataRoute } from "next";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: PRIVATE_ROUTES },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
