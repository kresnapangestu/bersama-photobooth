// components/templates/PhotoBooth.tsx
import { useState, useRef, useEffect } from "react";
import { PhotoPreview } from "../molecules/PhotoPreview";
import { Timer } from "../atoms/Timer";
import { CaptureControls } from "../molecules/CaptureControls";
import { FrameSelector } from "../molecules/FrameSelector";

interface PhotoBoothProps {
  frames: string[];
}

export const PhotoBooth = ({ frames }: PhotoBoothProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  const startCountdown = () => {
    if (photos.length < 4 && selectedFrame) {
      setCountdown(3);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || !selectedFrame) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = `/frames/${selectedFrame}`;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setPhotos([...photos, dataUrl]);
    };
  };

  useEffect(() => {
    if (countdown === 0) {
      capturePhoto();
    } else if (countdown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded shadow w-full max-w-md"
      />
      <canvas ref={canvasRef} className="hidden" />

      <Timer countdown={countdown} />

      <CaptureControls
        onStart={startCountdown}
        onStop={() => setCountdown(null)}
        disabled={photos.length >= 4}
      />

      <div className="grid grid-cols-2 gap-2 w-full max-w-md">
        {photos.map((src, i) => (
          <PhotoPreview key={i} src={src} alt={`Photo ${i + 1}`} />
        ))}
      </div>

      <FrameSelector frames={frames} onSelect={setSelectedFrame} />
    </div>
  );
};
