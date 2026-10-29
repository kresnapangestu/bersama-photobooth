import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";

interface AspectFitProps {
  /** width / height */
  ratio: number;
  children: ReactNode;
  /**
   * Height cap when the page scrolls (phones, very high zoom). On fit viewports
   * the box fills whatever height its parent leaves instead.
   */
  mobileHeight?: string;
  maxWidth?: string;
  className?: string;
  boxClassName?: string;
}

/**
 * A box of a fixed aspect ratio, as large as fits its parent (like
 * object-fit: contain), so the main visual of a page takes the space left over
 * by the text around it. On fit viewports the wrapper is a size container and
 * the box is sized from its cqh; elsewhere it falls back to `mobileHeight`.
 */
export const AspectFit = ({
  ratio,
  children,
  mobileHeight = "60svh",
  maxWidth = "100%",
  className,
  boxClassName,
}: AspectFitProps) => (
  <div
    className={clsx(
      "flex min-h-0 w-full flex-1 items-center justify-center [--fit-h:var(--mobile-h)] fit:[--fit-h:100cqh] fit:[container-type:size]",
      className
    )}
    style={{ "--mobile-h": mobileHeight } as CSSProperties}
  >
    <div
      className={clsx("relative shrink-0", boxClassName)}
      style={{
        aspectRatio: ratio,
        width: `min(100%, ${maxWidth}, var(--fit-h) * ${ratio})`,
      }}
    >
      {children}
    </div>
  </div>
);
