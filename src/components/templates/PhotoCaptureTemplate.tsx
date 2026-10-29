"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button, ButtonLink } from "@/components/atoms/Button";
import { AspectFit } from "@/components/atoms/AspectFit";
import { ObjectUrlImage } from "@/components/atoms/ObjectUrlImage";
import { Headline } from "../molecules/Headline";
import { usePhotoSession } from "@/context/PhotoSessionContext";
import { useCamera, type CameraStatus } from "@/hooks/useCamera";
import { useCountdown } from "@/hooks/useCountdown";
import { captureVideoFrame } from "@/lib/photobooth/canvas";
import { getFrame, getShotAspect } from "@/constants/frames";
import { COUNTDOWN_SECONDS, MIRROR_CAPTURE } from "@/constants/photobooth";
import { ROUTES } from "@/constants/routes";

const CAMERA_MESSAGES: Partial<Record<CameraStatus, string>> = {
  loading: "Waking up the camera…",
  denied: "Camera access was blocked. Allow it in your browser settings, then reload the page.",
  unavailable: "We couldn't find a camera. Make sure one is connected and the site is opened over HTTPS.",
};

const FLASH_MS = 250;

interface PhotoCaptureTemplateProps {
  frameId: string;
}

export default function PhotoCaptureTemplate({ frameId }: PhotoCaptureTemplateProps) {
  const {
    shots,
    shotCount,
    nextShotIndex,
    isComplete,
    startSession,
    addShot,
    removeShot,
  } = usePhotoSession();
  const { videoRef, status } = useCamera();
  const [isFlashing, setIsFlashing] = useState(false);
  const [captureError, setCaptureError] = useState(false);

  useEffect(() => {
    startSession(frameId);
  }, [frameId, startSession]);

  const capture = async () => {
    const video = videoRef.current;
    if (!video) return;

    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), FLASH_MS);
    try {
      addShot(await captureVideoFrame(video, MIRROR_CAPTURE));
      setCaptureError(false);
    } catch (error) {
      console.error("Failed to capture photo:", error);
      setCaptureError(true);
    }
  };

  const countdown = useCountdown(capture);

  // Read straight from the config so the preview is framed before the session syncs.
  const frame = getFrame(frameId);
  const previewAspect = frame
    ? getShotAspect(frame, Math.max(nextShotIndex, 0))
    : 4 / 3;
  const canSnap = status === "ready" && !isComplete && !countdown.isRunning;
  const cameraMessage = CAMERA_MESSAGES[status];

  // Stacked: headline, camera, controls. wide: camera | headline + controls.
  // The side column is `contents` when stacked so its children slot around the camera.
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center gap-flow wide:grid wide:grid-cols-[minmax(0,1.7fr)_minmax(15rem,1fr)] wide:grid-rows-[minmax(0,1fr)] wide:gap-x-[clamp(1.5rem,4vw,4rem)]">
      {/* Cropped to the frame window's ratio so what you see is what gets printed. */}
      <AspectFit
        ratio={previewAspect}
        mobileHeight="50svh"
        className="order-2 wide:order-first wide:h-full wide:justify-end"
        boxClassName="overflow-hidden rounded-lg bg-[#d9d9d9]"
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          aria-label="Camera preview"
          className={clsx(
            "h-full w-full object-cover",
            MIRROR_CAPTURE && "-scale-x-100"
          )}
        />
        {cameraMessage && (
          <p
            role={status === "loading" ? "status" : "alert"}
            className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm"
          >
            {cameraMessage}
          </p>
        )}
        {countdown.remaining !== null && countdown.remaining > 0 && (
          <span
            key={countdown.remaining}
            aria-live="assertive"
            className="absolute inset-0 flex animate-[ping_1s_ease-out_reverse] items-center justify-center text-8xl font-extrabold text-white drop-shadow-lg motion-reduce:animate-none"
          >
            {countdown.remaining}
          </span>
        )}
        <div
          aria-hidden="true"
          className={clsx(
            "pointer-events-none absolute inset-0 bg-white transition-opacity duration-200 motion-reduce:transition-none",
            isFlashing ? "opacity-80" : "opacity-0"
          )}
        />
      </AspectFit>

      <div className="contents wide:flex wide:max-w-sm wide:flex-col wide:justify-center wide:gap-flow">
        <Headline
          caption="In three counts, the magic captures you..."
          subcaption="A spellbinding moment is just one click away, Smile before the spell is sealed forever! 💫"
          className="order-1 wide:items-start wide:text-left"
        />

        <div className="order-3 flex w-full max-w-md shrink-0 flex-col items-center gap-flow wide:items-stretch">
          <Button
            onClick={() => countdown.start(COUNTDOWN_SECONDS)}
            disabled={!canSnap}
            className="w-full max-w-xs wide:max-w-none"
          >
            {isComplete ? "All shots taken!" : countdown.isRunning ? "Smile!" : "Snap!"}
          </Button>

          {captureError && (
            <p role="alert" className="text-sm text-red-500">
              That shot didn&apos;t come through. Please try again.
            </p>
          )}

          <ol
            className="grid w-full gap-2"
            style={{ gridTemplateColumns: `repeat(${shotCount}, minmax(0, 1fr))` }}
            aria-label="Your shots"
          >
            {shots.map((shot, index) => (
              <li
                key={index}
                aria-label={shot ? undefined : `Shot ${index + 1} of ${shotCount}, not taken yet`}
                style={{ aspectRatio: frame ? getShotAspect(frame, index) : 4 / 3 }}
                className={clsx(
                  "relative self-start overflow-hidden rounded bg-[#d9d9d9]",
                  index === nextShotIndex && "ring-2 ring-primaryDarker"
                )}
              >
                {shot && (
                  <>
                    <ObjectUrlImage
                      src={shot.url}
                      alt={`Shot ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeShot(shot.id)}
                      disabled={countdown.isRunning}
                      aria-label={`Retake shot ${index + 1}`}
                      className="absolute top-1 right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/80 text-sm leading-none transition hover:bg-white focus-visible:outline-2 focus-visible:outline-primaryDarker"
                    >
                      ✕
                    </button>
                  </>
                )}
              </li>
            ))}
          </ol>

          {isComplete ? (
            <ButtonLink href={ROUTES.adjustment} className="text-center">
              Time for the final touch!
            </ButtonLink>
          ) : (
            <Button disabled>Time for the final touch!</Button>
          )}
        </div>
      </div>
    </div>
  );
}
