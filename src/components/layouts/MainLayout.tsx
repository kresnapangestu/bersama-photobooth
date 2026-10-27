import type { ReactNode } from "react";
import {
  DecorativeImage,
  type DecorativeImageProps,
} from "../atoms/DecorativeImage";
import { Footer } from "../molecules/Footer";

const DECORATIONS: DecorativeImageProps[] = [
  {
    src: "/images/background_item_1.webp",
    width: 550,
    height: 120,
    className: "fixed right-[-3em] top-10",
  },
  {
    src: "/images/background_item_2.webp",
    width: 380,
    height: 120,
    className: "fixed right-0 bottom-[-10em]",
  },
  {
    src: "/images/background_item_3.webp",
    width: 350,
    height: 120,
    className: "fixed bottom-0 left-[-2rem]",
  },
];

/** Shell for the booth flow: fixed ornaments and a footer pinned under the content. */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-[50px] flex h-[92vh] flex-col">
      <div className="pointer-events-none absolute inset-0 z-0">
        {DECORATIONS.map((decoration) => (
          <DecorativeImage key={decoration.src} {...decoration} />
        ))}
      </div>
      <div className="relative z-10 flex-1 px-4 pt-6">{children}</div>
      <Footer className="px-4 text-center" />
    </div>
  );
}
