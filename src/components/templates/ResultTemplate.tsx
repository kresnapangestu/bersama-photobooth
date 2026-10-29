"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/atoms/Button";
import { AspectFit } from "@/components/atoms/AspectFit";
import { Headline } from "../molecules/Headline";
import { EmptyState } from "../molecules/EmptyState";
import { StripPreview } from "../molecules/StripPreview";
import { takenShots, usePhotoSession } from "@/context/PhotoSessionContext";
import { useComposedStrip } from "@/hooks/useComposedStrip";
import { downloadBlob } from "@/lib/download";
import { canvasToBlob, renderFilteredPhoto } from "@/lib/photobooth/canvas";
import { getShotAspect } from "@/constants/frames";
import { DOWNLOAD_PREFIX } from "@/constants/photobooth";
import { ROUTES } from "@/constants/routes";

type DownloadKind = "strip" | "gif" | "pictures";

export default function ResultTemplate() {
  const { frame, shots, filter, isComplete } = usePhotoSession();
  const strip = useComposedStrip();
  const [pending, setPending] = useState<DownloadKind | null>(null);
  const [failed, setFailed] = useState(false);

  if (!frame || !isComplete) {
    return (
      <EmptyState
        title="Your strip has floated away"
        description="Photos only live in this tab, so they're gone after a refresh. Start a new session to make another strip."
        action={{ label: "Start again", href: ROUTES.frameSelection }}
      />
    );
  }

  const blobs = takenShots(shots).map((shot) => shot.blob);

  const run = (kind: DownloadKind, task: () => Promise<void>) => async () => {
    setPending(kind);
    setFailed(false);
    try {
      await task();
    } catch (error) {
      console.error(`Download (${kind}) failed:`, error);
      setFailed(true);
    } finally {
      setPending(null);
    }
  };

  const downloadStrip = run("strip", async () => {
    if (strip.status !== "ready") return;
    downloadBlob(strip.blob, `${DOWNLOAD_PREFIX}-strip.png`);
  });

  const downloadGif = run("gif", async () => {
    // gifenc is only needed here, so keep it out of the main bundle.
    const { encodeGif } = await import("@/lib/photobooth/gif");
    const gif = await encodeGif(blobs, filter, getShotAspect(frame, 0));
    downloadBlob(gif, `${DOWNLOAD_PREFIX}.gif`);
  });

  const downloadPictures = run("pictures", async () => {
    for (const [index, blob] of blobs.entries()) {
      const bitmap = await createImageBitmap(blob);
      const { canvas } = renderFilteredPhoto(bitmap, bitmap, filter);
      bitmap.close();
      downloadBlob(await canvasToBlob(canvas), `${DOWNLOAD_PREFIX}-${index + 1}.jpg`);
    }
  });

  const isBusy = pending !== null;

  // Landscape: copy | strip | actions, with equal side columns so
  // the strip sits dead centre. Everything else: one centred column.
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center gap-flow wide:grid wide:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] wide:grid-rows-[minmax(0,1fr)] wide:items-center wide:gap-10">
      <Headline
        caption="✨ With a sprinkle of stardust… voilà!"
        subcaption="And Ta-da!—the magic’s done! No doubt—this result is pure magic! Tag Ber-sama whenever this magic touches the social media timeline! Thank you very much for using our service! 🎀🫶🏻💓"
        className="wide:items-start wide:text-left"
      />
      <AspectFit
        ratio={frame.width / frame.height}
        mobileHeight="70svh"
        className="wide:h-full"
      >
        <StripPreview strip={strip} />
      </AspectFit>
      <div className="flex w-full max-w-xs shrink-0 flex-col items-stretch gap-3 text-center sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center wide:max-w-xs wide:flex-col wide:justify-self-start">
        <Button
          variant="secondary"
          onClick={downloadStrip}
          disabled={isBusy || strip.status !== "ready"}
        >
          {pending === "strip" ? "Saving…" : "Download Result!🔮"}
        </Button>
        <Button variant="secondary" onClick={downloadGif} disabled={isBusy}>
          {pending === "gif" ? "Animating…" : "Download GIF! 🎞️"}
        </Button>
        <Button variant="secondary" onClick={downloadPictures} disabled={isBusy}>
          {pending === "pictures" ? "Saving…" : "Download Picture! 🖼️"}
        </Button>
        {failed && (
          <p role="alert" className="basis-full text-sm text-red-500">
            Something went wrong while saving. Please try again.
          </p>
        )}
        <ButtonLink href={ROUTES.payment} className="basis-full sm:basis-auto">
          Add another sparkle to your gallery! 📸
        </ButtonLink>
      </div>
    </div>
  );
}
