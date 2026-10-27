import type { MetadataRoute } from "next";
import { INDEXABLE_ROUTES, ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((path) => ({
    url: `${SITE.url}${path === ROUTES.home ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === ROUTES.home ? 1 : 0.5,
  }));
}
