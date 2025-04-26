"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Headline } from "../molecules/Headline";

interface Props {
  frame: string;
}

export default function PhotoCaptureTemplate({ frame }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (!frame) return;

    const getMediaStream = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(userStream);
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    getMediaStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [frame]);

  useEffect(() => {
    if (countdown === 0) {
      capturePhoto();
    } else if (countdown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const startCountdown = () => {
    if (photos.length < 4) {
      setCountdown(3);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frameImage = new Image();
    frameImage.src = `/frames/${frame}`;
    frameImage.onload = () => {
      ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setPhotos((prev) => [...prev, dataUrl]);
    };
  };

  return (
    <div className="p-4 flex flex-col items-center gap-6">
      <Headline
        caption="In three counts, the magic captures you..."
        subcaption="A spellbinding moment is just one click away, Smile before the spell is sealed forever! 💫"
      />
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded shadow w-full max-w-md"
      />
      <canvas ref={canvasRef} className="hidden" />

      {countdown !== null ? (
        <div className="text-4xl font-bold text-red-500">{countdown}</div>
      ) : (
        <Button onClick={startCountdown} disabled={photos.length >= 4}>
          {photos.length >= 4 ? "Max photos taken" : "Snap"}
        </Button>
      )}

      <div className="flex gap-2 w-full items-center text-right justify-center">
        {photos.length < 1 ? (
          <div className="flex gap-10 h-[100px]">
            <div className="bg-primary w-50 rounded"></div>
            <div className="bg-primary w-50 rounded"></div>
            <div className="bg-primary w-50 rounded"></div>
            <div className="bg-primary w-50 rounded"></div>
          </div>
        ) : (
          photos.map((src, i) => (
            <img
              key={i}
              src={src}
              className="rounded border shadow"
              alt={`Photo ${i + 1}`}
            />
          ))
        )}
      </div>
      <Button onClick={startCountdown} disabled={photos.length >= 4}>
        Time for the final touch!
      </Button>
    </div>
  );
}
