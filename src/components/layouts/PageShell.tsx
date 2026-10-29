import type { ReactNode } from "react";
import clsx from "clsx";
import {
  DecorativeImage,
  type DecorativeImageProps,
} from "../atoms/DecorativeImage";
import { Footer } from "../molecules/Footer";

interface PageShellProps {
  children: ReactNode;
  decorations: DecorativeImageProps[];
  /**
   * For pages taller than a screen (e.g. Privacy). On fit viewports the content
   * scrolls between the navbar and the footer, and the ornaments scroll with it.
   */
  scrollable?: boolean;
}

/** Page frame under the navbar: ornaments, content and a footer pinned below it. */
export default function PageShell({
  children,
  decorations,
  scrollable = false,
}: PageShellProps) {
  const ornaments = decorations.map((decoration) => (
    <DecorativeImage key={decoration.src} {...decoration} />
  ));

  return (
    <div className="relative flex min-h-0 flex-1 flex-col pt-(--nav-h)">
      {!scrollable && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {ornaments}
        </div>
      )}
      <div
        className={clsx(
          "relative z-10 flex min-h-0 flex-1 flex-col px-gutter py-flow",
          scrollable && "fit:overflow-y-auto"
        )}
      >
        {scrollable && (
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {ornaments}
          </div>
        )}
        {children}
      </div>
      <Footer className="px-gutter pb-3 text-center" />
    </div>
  );
}
