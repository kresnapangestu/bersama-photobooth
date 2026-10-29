import clsx from "clsx";
import { ObjectUrlImage } from "../atoms/ObjectUrlImage";
import type { StripState } from "@/hooks/useComposedStrip";

interface StripPreviewProps {
  strip: StripState;
}

/**
 * Shows the exact PNG that gets downloaded, so the preview can't drift from the
 * export. Fills its parent; size it with AspectFit.
 */
export const StripPreview = ({ strip }: StripPreviewProps) => (
  <div className="size-full shadow-lg" aria-busy={strip.status === "loading"}>
    {strip.status === "ready" ? (
      <ObjectUrlImage
        src={strip.url}
        alt="Your Ber-sama photo strip"
        className="block size-full"
      />
    ) : (
      <div
        className={clsx(
          "flex size-full items-center justify-center bg-primaryDisabled p-4 text-center text-sm",
          strip.status === "loading" && "animate-pulse motion-reduce:animate-none"
        )}
      >
        {strip.status === "error"
          ? "We couldn't build your strip. Please go back and try again."
          : "Developing your photos…"}
      </div>
    )}
  </div>
);
