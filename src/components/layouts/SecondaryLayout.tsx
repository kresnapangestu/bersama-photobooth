import type { ReactNode } from "react";
import clsx from "clsx";
import {
  DecorativeImage,
  type DecorativeImageProps,
} from "../atoms/DecorativeImage";
import { Footer } from "../molecules/Footer";

type LayoutHeight = "screen" | "fit";

interface SecondaryLayoutProps {
  children: ReactNode;
  /** "screen" pins ornaments to the viewport; "fit" scatters them down a long page. */
  height?: LayoutHeight;
}

const DECORATIONS: Record<LayoutHeight, DecorativeImageProps[]> = {
  screen: [
    {
      src: "/images/background_item_1.webp",
      width: 600,
      height: 120,
      className: "fixed bottom-[-5em] right-[-3em]",
    },
    {
      src: "/images/background_item_5.webp",
      width: 400,
      height: 120,
      className: "fixed top-20 left-0",
    },
  ],
  fit: [
    {
      src: "/images/background_item_1.webp",
      width: 600,
      height: 120,
      className: "absolute top-[500px] right-[-3em]",
    },
    {
      src: "/images/background_item_5.webp",
      width: 400,
      height: 120,
      className: "absolute top-30 left-0",
    },
    {
      src: "/images/background_item_3.webp",
      width: 400,
      height: 120,
      className: "absolute top-[1000px] left-[-5em]",
    },
    {
      src: "/images/background_item_2.webp",
      width: 400,
      height: 120,
      className: "absolute top-[90rem] right-[-5em]",
    },
    {
      src: "/images/background_item_6.webp",
      width: 300,
      height: 120,
      className: "absolute top-[115rem] left-[-5em]",
    },
    {
      src: "/images/background_item_8.webp",
      width: 150,
      height: 50,
      className: "absolute top-[125rem] right-[-1em]",
    },
    {
      src: "/images/background_item_7.webp",
      width: 400,
      height: 120,
      className: "absolute top-[155rem] left-[-4em]",
    },
    {
      src: "/images/background_item_4.webp",
      width: 350,
      height: 50,
      className: "absolute top-[180rem] right-0",
    },
  ],
};

/** Shell for content pages (About, Privacy, 404). */
export default function SecondaryLayout({
  children,
  height = "fit",
}: SecondaryLayoutProps) {
  return (
    <div className="relative mt-[50px] flex flex-col">
      <div
        className={clsx(
          "pointer-events-none inset-0 z-0",
          height === "screen" && "absolute"
        )}
      >
        {DECORATIONS[height].map((decoration) => (
          <DecorativeImage key={decoration.src} {...decoration} />
        ))}
      </div>
      <div className="relative z-10 mb-5 flex-1 px-4 pt-6">{children}</div>
      <Footer className="px-4 text-center" />
    </div>
  );
}
