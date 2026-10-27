export const SITE = {
  name: "Ber-sama",
  title: "Ber-sama Photo Booth",
  description:
    "Snap, smile, repeat — Ber-sama Photo Booth turns fleeting moments into lasting memories. Pick a frame, take four shots, add a filter, and download your photo strip.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bersamaphoto.netlify.app").replace(
    /\/$/,
    ""
  ),
  locale: "en_US",
  owner: "Sama Bandung",
  email: "contact@bersama.com",
  logo: "/images/logo-bersama.png",
  themeColor: "#fbf9fe",
  keywords: [
    "photo booth",
    "online photo booth",
    "photobooth Bandung",
    "photo strip",
    "Ber-sama",
    "Sama Bandung",
  ],
} as const;

/** Served by src/app/opengraph-image.tsx. */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE.title} — snap, smile, repeat`,
};

export const COPYRIGHT_NOTICE = `All frames and designs on this website are the intellectual property of ${SITE.owner} © 2025. All rights reserved.`;
