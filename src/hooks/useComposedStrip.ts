"use client";

import { useEffect, useState } from "react";
import { takenShots, usePhotoSession } from "@/context/PhotoSessionContext";
import { composeStrip } from "@/lib/photobooth/compose";
import { canvasToBlob } from "@/lib/photobooth/canvas";

export type StripState =
  | { status: "idle" | "loading" | "error"; blob: null; url: null }
  | { status: "ready"; blob: Blob; url: string };

const IDLE: StripState = { status: "idle", blob: null, url: null };
const LOADING: StripState = { status: "loading", blob: null, url: null };
const ERROR: StripState = { status: "error", blob: null, url: null };

/**
 * Renders the session's photo strip as a print-resolution PNG and keeps it in
 * sync with the chosen filter. Preview and download use the same output.
 */
export function useComposedStrip() {
  const { frame, shots, filter, isComplete } = usePhotoSession();
  const [strip, setStrip] = useState<StripState>(IDLE);

  useEffect(() => {
    if (!frame || !isComplete) {
      setStrip(IDLE);
      return;
    }

    let cancelled = false;
    let url: string | null = null;
    // Keep the previous image visible while the next filter renders.
    setStrip((prev) => (prev.status === "ready" ? prev : LOADING));

    const blobs = takenShots(shots).map((shot) => shot.blob);
    composeStrip({ frame, shots: blobs, filter })
      .then((canvas) => canvasToBlob(canvas, "image/png"))
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        setStrip({ status: "ready", blob, url });
      })
      .catch((error: unknown) => {
        console.error("Failed to compose photo strip:", error);
        if (!cancelled) setStrip(ERROR);
      });

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [frame, shots, filter, isComplete]);

  return strip;
}
