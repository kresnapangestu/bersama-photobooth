/**
 * A photo window inside a frame, in the frame artwork's own pixel coordinates.
 * `shot` is the index of the captured photo that fills it, so one shot can
 * appear in several windows (e.g. a 2-up strip printed side by side).
 */
export interface FrameSlot {
  shot: number;
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
}

export interface FrameLayout {
  id: string;
  name: string;
  /** Native size of the artwork. Slots are measured against this. */
  width: number;
  height: number;
  /** Shown in the frame picker. */
  preview: string;
  artwork: {
    src: string;
    /**
     * "over": PNG with transparent windows, drawn on top of the photos (preferred —
     * stickers and logos can overlap the photos).
     * "under": opaque PNG drawn first, photos painted on top of its windows.
     */
    layer: "over" | "under";
  };
  slots: FrameSlot[];
}

type Window = Omit<FrameSlot, "radius">;

// Photos extend under the overlay so the window's anti-aliased edge never
// shows the empty canvas behind it.
const BLEED_PX = 2;
const withBleed = (window: Window): FrameSlot => ({
  ...window,
  x: window.x - BLEED_PX,
  y: window.y - BLEED_PX,
  width: window.width + BLEED_PX * 2,
  height: window.height + BLEED_PX * 2,
});

/**
 * Every frame lives in public/frames as a pair:
 * - frameN.png           layout source with numbered pastel windows (design hand-off)
 * - frameN-template.png  the same artwork with transparent windows, used by the app
 *
 * `scripts/punch_frame_windows.py frameN.png frameN-template.png` produces the
 * template and prints the windows below (shot = the number in the window − 1).
 */
const frame = (
  index: number,
  name: string,
  size: { width: number; height: number },
  windows: Window[]
): FrameLayout => {
  const template = `/frames/frame${index}-template.png`;
  return {
    id: `frame${index}`,
    name,
    ...size,
    preview: template,
    artwork: { src: template, layer: "over" },
    slots: windows.map(withBleed),
  };
};

export const FRAMES: FrameLayout[] = [
  frame(1, "Classic", { width: 1448, height: 2268 }, [
    { shot: 0, x: 75, y: 49, width: 574, height: 514 },
    { shot: 1, x: 75, y: 601, width: 574, height: 514 },
    { shot: 2, x: 75, y: 1153, width: 574, height: 514 },
    { shot: 3, x: 75, y: 1705, width: 574, height: 514 },
    { shot: 1, x: 799, y: 49, width: 574, height: 514 },
    { shot: 3, x: 799, y: 601, width: 574, height: 514 },
    { shot: 0, x: 799, y: 1153, width: 574, height: 514 },
    { shot: 2, x: 799, y: 1705, width: 574, height: 514 },
  ]),
  frame(2, "Gachi", { width: 1448, height: 2268 }, [
    { shot: 0, x: 68, y: 228, width: 589, height: 576 },
    { shot: 1, x: 69, y: 843, width: 588, height: 575 },
    { shot: 2, x: 75, y: 1461, width: 581, height: 573 },
    { shot: 1, x: 792, y: 227, width: 589, height: 582 },
    { shot: 0, x: 791, y: 843, width: 590, height: 581 },
    { shot: 2, x: 792, y: 1460, width: 582, height: 574 },
  ]),
  frame(3, "Pastel Sky", { width: 3620, height: 5670 }, [
    { shot: 0, x: 155, y: 100, width: 1500, height: 1150 },
    { shot: 1, x: 155, y: 1398, width: 1500, height: 1149 },
    { shot: 2, x: 155, y: 2696, width: 1500, height: 1149 },
    { shot: 3, x: 155, y: 3994, width: 1500, height: 1149 },
    { shot: 2, x: 1965, y: 100, width: 1500, height: 1150 },
    { shot: 3, x: 1965, y: 1398, width: 1500, height: 1149 },
    { shot: 0, x: 1965, y: 2696, width: 1500, height: 1149 },
    { shot: 1, x: 1965, y: 3994, width: 1500, height: 1149 },
  ]),
  frame(4, "Wildflower", { width: 1448, height: 2268 }, [
    { shot: 0, x: 95, y: 135, width: 582, height: 578 },
    { shot: 1, x: 95, y: 795, width: 586, height: 578 },
    { shot: 2, x: 95, y: 1455, width: 586, height: 578 },
    { shot: 2, x: 767, y: 136, width: 586, height: 577 },
    { shot: 0, x: 767, y: 795, width: 585, height: 578 },
    { shot: 1, x: 767, y: 1456, width: 586, height: 577 },
  ]),
  frame(5, "Blue Hour", { width: 1448, height: 2268 }, [
    { shot: 0, x: 75, y: 239, width: 574, height: 562 },
    { shot: 1, x: 75, y: 853, width: 574, height: 565 },
    { shot: 2, x: 75, y: 1467, width: 574, height: 562 },
    { shot: 1, x: 799, y: 239, width: 574, height: 562 },
    { shot: 2, x: 799, y: 853, width: 574, height: 562 },
    { shot: 0, x: 799, y: 1464, width: 575, height: 566 },
  ]),
  frame(6, "Roses", { width: 1448, height: 2268 }, [
    { shot: 0, x: 68, y: 237, width: 582, height: 570 },
    { shot: 1, x: 74, y: 850, width: 576, height: 567 },
    { shot: 2, x: 72, y: 1461, width: 581, height: 570 },
    { shot: 2, x: 798, y: 232, width: 576, height: 570 },
    { shot: 0, x: 799, y: 851, width: 575, height: 566 },
    { shot: 1, x: 798, y: 1466, width: 582, height: 563 },
  ]),
  // Slot "4" is a darker pink here (the background uses the standard one):
  // generated with --fill 241,115,141:4
  frame(7, "Doodle", { width: 1448, height: 2268 }, [
    { shot: 0, x: 60, y: 38, width: 603, height: 464 },
    { shot: 1, x: 62, y: 560, width: 601, height: 463 },
    { shot: 2, x: 62, y: 1081, width: 601, height: 463 },
    { shot: 3, x: 60, y: 1602, width: 604, height: 464 },
    { shot: 0, x: 784, y: 38, width: 604, height: 464 },
    { shot: 1, x: 785, y: 560, width: 603, height: 463 },
    { shot: 2, x: 784, y: 1081, width: 603, height: 463 },
    { shot: 3, x: 784, y: 1602, width: 604, height: 464 },
  ]),
];

export const getFrame = (id: string) => FRAMES.find((frame) => frame.id === id);

export const isAvailableFrame = (id: string) => getFrame(id) !== undefined;

export const getShotCount = (frame: FrameLayout) =>
  Math.max(...frame.slots.map((slot) => slot.shot)) + 1;

/** Aspect ratio (w/h) of the first window a shot lands in — used to frame the live preview. */
export const getShotAspect = (frame: FrameLayout, shot: number) => {
  const slot = frame.slots.find((s) => s.shot === shot) ?? frame.slots[0];
  return slot.width / slot.height;
};
