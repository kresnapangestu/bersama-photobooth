import type { PhotoFilter } from "@/constants/filters";
import { SHOT_MIME_TYPE, SHOT_QUALITY } from "@/constants/photobooth";
import { applyFilter } from "./colorMatrix";

interface Size {
  width: number;
  height: number;
}

export function createCanvas({ width, height }: Size) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is not available");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  return { canvas, ctx };
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = SHOT_MIME_TYPE,
  quality = SHOT_QUALITY
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas export failed"))),
      type,
      quality
    );
  });
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    image.src = src;
  });
}

/** Draws `source` to fill the target box, center-cropping like CSS `object-fit: cover`. */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sourceSize: Size,
  target: Size & { x: number; y: number }
) {
  const scale = Math.max(
    target.width / sourceSize.width,
    target.height / sourceSize.height
  );
  const cropWidth = target.width / scale;
  const cropHeight = target.height / scale;

  ctx.drawImage(
    source,
    (sourceSize.width - cropWidth) / 2,
    (sourceSize.height - cropHeight) / 2,
    cropWidth,
    cropHeight,
    target.x,
    target.y,
    target.width,
    target.height
  );
}

/** Renders a photo cropped to `size` with the filter baked in. */
export function renderFilteredPhoto(
  source: ImageBitmap,
  { width, height }: Size,
  filter: PhotoFilter
) {
  const { canvas, ctx } = createCanvas({ width, height });
  drawCover(ctx, source, source, { x: 0, y: 0, width, height });
  applyFilter(ctx, filter);
  return { canvas, ctx };
}

/** Grabs the current video frame at full camera resolution. */
export function captureVideoFrame(video: HTMLVideoElement, mirror: boolean) {
  const { videoWidth: width, videoHeight: height } = video;
  if (width === 0 || height === 0) {
    throw new Error("Camera is not ready yet");
  }

  const { canvas, ctx } = createCanvas({ width, height });
  if (mirror) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(video, 0, 0, width, height);
  return canvasToBlob(canvas);
}
