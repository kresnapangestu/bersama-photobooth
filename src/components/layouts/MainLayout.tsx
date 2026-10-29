import type { ReactNode } from "react";
import type { DecorativeImageProps } from "../atoms/DecorativeImage";
import PageShell from "./PageShell";

const DECORATIONS: DecorativeImageProps[] = [
  {
    src: "/images/background_item_1.webp",
    width: 550,
    height: 498,
    className: "absolute -right-12 top-10 h-auto w-[clamp(10rem,36vw,34rem)]",
  },
  {
    src: "/images/background_item_2.webp",
    width: 380,
    height: 441,
    className:
      "absolute right-0 -bottom-40 h-auto w-[clamp(8rem,25vw,24rem)]",
  },
  {
    src: "/images/background_item_3.webp",
    width: 350,
    height: 622,
    className: "absolute -left-8 bottom-0 h-auto w-[clamp(7rem,23vw,22rem)]",
  },
];

/** Shell for the booth flow. */
export default function MainLayout({ children }: { children: ReactNode }) {
  return <PageShell decorations={DECORATIONS}>{children}</PageShell>;
}
