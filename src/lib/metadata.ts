import type { Metadata } from "next";
import { OG_IMAGE, SITE } from "@/constants/site";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  /** Keep session-only steps (payment, capture, result) out of search results. */
  noIndex?: boolean;
}

// Next.js shallow-merges metadata, so a page that sets `openGraph` replaces the
// root one entirely — including the file-based og:image. Building the full
// object here keeps every page complete.
export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.title,
      locale: SITE.locale,
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
