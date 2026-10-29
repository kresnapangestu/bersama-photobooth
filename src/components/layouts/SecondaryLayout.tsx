import type { ReactNode } from "react";
import type { DecorativeImageProps } from "../atoms/DecorativeImage";
import PageShell from "./PageShell";

type LayoutHeight = "screen" | "fit";

interface SecondaryLayoutProps {
  children: ReactNode;
  /** "screen": one-screen page. "fit": long page; ornaments are scattered down it. */
  height?: LayoutHeight;
}

const DECORATIONS: Record<LayoutHeight, DecorativeImageProps[]> = {
  screen: [
    {
      src: "/images/background_item_1.webp",
      width: 600,
      height: 543,
      className:
        "absolute -right-12 -bottom-20 h-auto w-[clamp(10rem,40vw,37.5rem)]",
    },
    {
      src: "/images/background_item_5.webp",
      width: 400,
      height: 632,
      className: "absolute top-20 left-0 h-auto w-[clamp(7rem,26vw,25rem)]",
    },
  ],
  fit: [
    {
      src: "/images/background_item_1.webp",
      width: 600,
      height: 543,
      className: "absolute top-[30rem] -right-12 h-auto w-[clamp(10rem,40vw,37.5rem)]",
    },
    {
      src: "/images/background_item_5.webp",
      width: 400,
      height: 632,
      className: "absolute top-8 left-0 h-auto w-[clamp(7rem,26vw,25rem)]",
    },
    {
      src: "/images/background_item_3.webp",
      width: 400,
      height: 711,
      className: "absolute top-[62rem] -left-20 h-auto w-[clamp(7rem,26vw,25rem)]",
    },
    {
      src: "/images/background_item_2.webp",
      width: 400,
      height: 464,
      className: "absolute top-[90rem] -right-20 h-auto w-[clamp(7rem,26vw,25rem)]",
    },
    {
      src: "/images/background_item_6.webp",
      width: 300,
      height: 465,
      className: "absolute top-[115rem] -left-20 h-auto w-[clamp(6rem,20vw,19rem)]",
    },
    {
      src: "/images/background_item_8.webp",
      width: 150,
      height: 494,
      className: "absolute top-[125rem] -right-4 h-auto w-[clamp(4rem,10vw,9.5rem)]",
    },
    {
      src: "/images/background_item_7.webp",
      width: 400,
      height: 378,
      className: "absolute top-[155rem] -left-16 h-auto w-[clamp(7rem,26vw,25rem)]",
    },
    {
      src: "/images/background_item_4.webp",
      width: 350,
      height: 159,
      className: "absolute top-[180rem] right-0 h-auto w-[clamp(7rem,23vw,22rem)]",
    },
  ],
};

/** Shell for content pages (About, Privacy, 404). */
export default function SecondaryLayout({
  children,
  height = "fit",
}: SecondaryLayoutProps) {
  return (
    <PageShell decorations={DECORATIONS[height]} scrollable={height === "fit"}>
      {children}
    </PageShell>
  );
}
