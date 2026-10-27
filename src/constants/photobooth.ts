export const COUNTDOWN_SECONDS = 3;

/** Export width of the photo strip in px. 1200px ≈ 4in at 300dpi, enough for print. */
export const STRIP_EXPORT_WIDTH = 1200;

export const CAMERA_CONSTRAINTS: MediaStreamConstraints = {
  audio: false,
  video: {
    facingMode: "user",
    width: { ideal: 1920 },
    height: { ideal: 1080 },
  },
};

/** Selfie cameras feel natural mirrored; captures match what the user saw. */
export const MIRROR_CAPTURE = true;

export const SHOT_MIME_TYPE = "image/jpeg";
export const SHOT_QUALITY = 0.95;

export const GIF_WIDTH = 480;
export const GIF_FRAME_DELAY_MS = 600;

export const DOWNLOAD_PREFIX = "ber-sama";
