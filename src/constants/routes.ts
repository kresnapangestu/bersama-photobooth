export const ROUTES = {
  home: "/",
  about: "/about",
  privacy: "/privacy-policy",
  payment: "/payment-section",
  frameSelection: "/frame-selection",
  photoCapture: "/photo-capture",
  adjustment: "/adjustment-page",
  result: "/result",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  { label: "Privacy", href: ROUTES.privacy },
] as const;

/** Public, content pages worth indexing. The booth flow itself is per-session and stays out of search. */
export const INDEXABLE_ROUTES = [ROUTES.home, ROUTES.about, ROUTES.privacy];

export const PRIVATE_ROUTES = [
  ROUTES.payment,
  ROUTES.frameSelection,
  ROUTES.photoCapture,
  ROUTES.adjustment,
  ROUTES.result,
];
