import type { FilterOperation, PhotoFilter } from "@/constants/filters";

/**
 * 3×4 affine color matrix in 0–255 space: out = M · [r, g, b, 1].
 * Coefficients follow the W3C Filter Effects spec, so exports match the CSS preview.
 */
type ColorMatrix = number[][];

const IDENTITY: ColorMatrix = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
];

const linear = (m: number[][]): ColorMatrix => m.map((row) => [...row, 0]);

const toMatrix = (op: FilterOperation): ColorMatrix => {
  switch (op.type) {
    case "grayscale": {
      const a = 1 - Math.min(op.amount, 1);
      return linear([
        [0.2126 + 0.7874 * a, 0.7152 - 0.7152 * a, 0.0722 - 0.0722 * a],
        [0.2126 - 0.2126 * a, 0.7152 + 0.2848 * a, 0.0722 - 0.0722 * a],
        [0.2126 - 0.2126 * a, 0.7152 - 0.7152 * a, 0.0722 + 0.9278 * a],
      ]);
    }
    case "sepia": {
      const a = 1 - Math.min(op.amount, 1);
      return linear([
        [0.393 + 0.607 * a, 0.769 - 0.769 * a, 0.189 - 0.189 * a],
        [0.349 - 0.349 * a, 0.686 + 0.314 * a, 0.168 - 0.168 * a],
        [0.272 - 0.272 * a, 0.534 - 0.534 * a, 0.131 + 0.869 * a],
      ]);
    }
    case "saturate": {
      const s = op.amount;
      return linear([
        [0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s],
        [0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s],
        [0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s],
      ]);
    }
    case "hue-rotate": {
      const rad = (op.degrees * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return linear([
        [0.213 + cos * 0.787 - sin * 0.213, 0.715 - cos * 0.715 - sin * 0.715, 0.072 - cos * 0.072 + sin * 0.928],
        [0.213 - cos * 0.213 + sin * 0.143, 0.715 + cos * 0.285 + sin * 0.14, 0.072 - cos * 0.072 - sin * 0.283],
        [0.213 - cos * 0.213 - sin * 0.787, 0.715 - cos * 0.715 + sin * 0.715, 0.072 + cos * 0.928 + sin * 0.072],
      ]);
    }
    case "brightness":
      return linear([
        [op.amount, 0, 0],
        [0, op.amount, 0],
        [0, 0, op.amount],
      ]);
    case "contrast": {
      const c = op.amount;
      const offset = 127.5 * (1 - c);
      return [
        [c, 0, 0, offset],
        [0, c, 0, offset],
        [0, 0, c, offset],
      ];
    }
  }
};

/** Returns `next ∘ prev`, i.e. applies `prev` first. */
const compose = (next: ColorMatrix, prev: ColorMatrix): ColorMatrix =>
  next.map((row) => [
    ...[0, 1, 2].map((col) =>
      row[0] * prev[0][col] + row[1] * prev[1][col] + row[2] * prev[2][col]
    ),
    row[0] * prev[0][3] + row[1] * prev[1][3] + row[2] * prev[2][3] + row[3],
  ]);

const toColorMatrix = (filter: PhotoFilter) =>
  filter.operations.reduce<ColorMatrix>(
    (matrix, op) => compose(toMatrix(op), matrix),
    IDENTITY
  );

/** Applies a filter to a canvas in place. A no-op for filters without operations. */
export function applyFilter(ctx: CanvasRenderingContext2D, filter: PhotoFilter) {
  if (filter.operations.length === 0) return;

  const { width, height } = ctx.canvas;
  const image = ctx.getImageData(0, 0, width, height);
  const data = image.data;
  const [[r0, r1, r2, r3], [g0, g1, g2, g3], [b0, b1, b2, b3]] =
    toColorMatrix(filter);

  // Uint8ClampedArray rounds and clamps to 0–255 on assignment.
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    data[i] = r0 * r + r1 * g + r2 * b + r3;
    data[i + 1] = g0 * r + g1 * g + g2 * b + g3;
    data[i + 2] = b0 * r + b1 * g + b2 * b + b3;
  }

  ctx.putImageData(image, 0, 0);
}
