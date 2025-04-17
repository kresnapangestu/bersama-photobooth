"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";

interface Props {
  frame: string;
}

export default function PhotoCaptureTemplate({ frame }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

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

    const img = new Image();
    img.src = `/frames/${frame}`;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setPhotos((prev) => [...prev, dataUrl]);
    };
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
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
          {photos.length >= 4 ? "Max photos taken" : "Capture Photo"}
        </Button>
      )}

      <div className="grid grid-cols-2 gap-2 w-full max-w-md">
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            className="rounded border shadow"
            alt={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
