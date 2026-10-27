"use client";

import { useEffect, useRef, useState } from "react";
import { CAMERA_CONSTRAINTS } from "@/constants/photobooth";

export type CameraStatus = "loading" | "ready" | "denied" | "unavailable";

/** Streams the user's camera into the returned video ref and stops it on unmount. */
export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<CameraStatus>("loading");

  useEffect(() => {
    // Missing on insecure origins (plain http) and very old browsers.
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("unavailable");
      return;
    }

    let stream: MediaStream | null = null;
    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia(CAMERA_CONSTRAINTS)
      .then((userStream) => {
        // Permission can resolve after the user has already left the page.
        if (cancelled) {
          userStream.getTracks().forEach((track) => track.stop());
          return;
        }
        stream = userStream;
        if (videoRef.current) videoRef.current.srcObject = userStream;
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const denied =
          error instanceof DOMException && error.name === "NotAllowedError";
        setStatus(denied ? "denied" : "unavailable");
      });

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return { videoRef, status };
}
