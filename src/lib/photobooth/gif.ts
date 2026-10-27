import { GIFEncoder, applyPalette, quantize } from "gifenc";
import type { PhotoFilter } from "@/constants/filters";
import { GIF_FRAME_DELAY_MS, GIF_WIDTH } from "@/constants/photobooth";
import { renderFilteredPhoto } from "./canvas";

const MAX_COLORS = 256;

/** Loops the captured shots as an animated GIF. Import lazily — only the result page needs it. */
export async function encodeGif(shots: Blob[], filter: PhotoFilter, aspect: number) {
  const size = { width: GIF_WIDTH, height: Math.round(GIF_WIDTH / aspect) };
  const encoder = GIFEncoder();

  for (const shot of shots) {
    const bitmap = await createImageBitmap(shot);
    const { ctx } = renderFilteredPhoto(bitmap, size, filter);
    bitmap.close();

    const { data } = ctx.getImageData(0, 0, size.width, size.height);
    const palette = quantize(data, MAX_COLORS);
    encoder.writeFrame(applyPalette(data, palette), size.width, size.height, {
      palette,
      delay: GIF_FRAME_DELAY_MS,
    });
  }

  encoder.finish();
  return new Blob([encoder.bytes()], { type: "image/gif" });
}
