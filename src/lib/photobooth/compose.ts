import type { FrameLayout } from "@/constants/frames";
import type { PhotoFilter } from "@/constants/filters";
import { STRIP_EXPORT_WIDTH } from "@/constants/photobooth";
import { createCanvas, loadImage, renderFilteredPhoto } from "./canvas";

interface ComposeStripOptions {
  frame: FrameLayout;
  shots: Blob[];
  filter: PhotoFilter;
  width?: number;
}

/**
 * Builds the final photo strip on a canvas at print resolution.
 *
 * Photos are cropped straight from the full-resolution camera captures into each
 * window, so their sharpness never depends on the size of the frame artwork.
 */
export async function composeStrip({
  frame,
  shots,
  filter,
  width = STRIP_EXPORT_WIDTH,
}: ComposeStripOptions) {
  const scale = width / frame.width;
  const height = Math.round(frame.height * scale);

  const [artwork, ...photos] = await Promise.all([
    loadImage(frame.artwork.src),
    ...shots.map((shot) => createImageBitmap(shot)),
  ]);

  try {
    const { canvas, ctx } = createCanvas({ width, height });

    if (frame.artwork.layer === "under") {
      ctx.drawImage(artwork, 0, 0, width, height);
    }

    // Resampling the overlay smears its window edges (about one source pixel when
    // upscaling, one output pixel when downscaling), so photos reach that far
    // further under it or the strip ends up with see-through seams.
    const overlayBleed = frame.artwork.layer === "over" ? Math.ceil(scale) + 1 : 0;

    for (const slot of frame.slots) {
      const photo = photos[slot.shot];
      if (!photo) continue;

      // Round to whole pixels so adjacent edges don't blur or leave seams.
      const x = Math.round(slot.x * scale) - overlayBleed;
      const y = Math.round(slot.y * scale) - overlayBleed;
      const box = {
        x,
        y,
        width: Math.round((slot.x + slot.width) * scale) + overlayBleed - x,
        height: Math.round((slot.y + slot.height) * scale) + overlayBleed - y,
      };
      // Cropped (object-fit: cover) to the window's own ratio — never stretched.
      const filtered = renderFilteredPhoto(photo, box, filter);

      if (frame.artwork.layer === "over") {
        // The overlay's window edges define the shape; a full rect avoids corner gaps.
        ctx.drawImage(filtered.canvas, box.x, box.y);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(box.x, box.y, box.width, box.height, (slot.radius ?? 0) * scale);
      ctx.clip();
      ctx.drawImage(filtered.canvas, box.x, box.y);
      ctx.restore();
    }

    if (frame.artwork.layer === "over") {
      ctx.drawImage(artwork, 0, 0, width, height);
    }

    return canvas;
  } finally {
    photos.forEach((photo) => photo.close());
  }
}
