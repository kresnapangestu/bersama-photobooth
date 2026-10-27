import clsx from "clsx";
import { ObjectUrlImage } from "../atoms/ObjectUrlImage";
import type { StripState } from "@/hooks/useComposedStrip";

const PREVIEW_WIDTH = 300;

interface StripPreviewProps {
  strip: StripState;
  aspectRatio: number;
}

/** Shows the exact PNG that gets downloaded, so the preview can't drift from the export. */
export const StripPreview = ({ strip, aspectRatio }: StripPreviewProps) => (
  // self-start: as a flex child it would otherwise stretch to the row height,
  // which overrides aspect-ratio and squashes the image.
  <div
    className="relative shrink-0 self-start shadow-lg"
    style={{ width: PREVIEW_WIDTH, aspectRatio }}
    aria-busy={strip.status === "loading"}
  >
    {strip.status === "ready" ? (
      <ObjectUrlImage
        src={strip.url}
        alt="Your Ber-sama photo strip"
        className="block h-auto w-full"
      />
    ) : (
      <div
        className={clsx(
          "flex h-full w-full items-center justify-center bg-primaryDisabled p-6 text-center text-sm",
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
