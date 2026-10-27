/**
 * Filters are stored as structured operations rather than CSS strings so the
 * same definition drives both the CSS preview and the pixel-level export
 * (canvas `ctx.filter` is not available in every Safari version).
 */
export type FilterOperation =
  | { type: "grayscale"; amount: number }
  | { type: "sepia"; amount: number }
  | { type: "saturate"; amount: number }
  | { type: "brightness"; amount: number }
  | { type: "contrast"; amount: number }
  | { type: "hue-rotate"; degrees: number };

export interface PhotoFilter {
  id: string;
  name: string;
  operations: FilterOperation[];
}

export const FILTERS: PhotoFilter[] = [
  { id: "natural", name: "Natural", operations: [] },
  {
    id: "grayscale",
    name: "Grayscale",
    operations: [{ type: "grayscale", amount: 1 }],
  },
  {
    id: "vivid",
    name: "Vivid",
    operations: [
      { type: "brightness", amount: 1.1 },
      { type: "contrast", amount: 1.15 },
      { type: "saturate", amount: 1.2 },
    ],
  },
  { id: "vintage", name: "Vintage", operations: [{ type: "sepia", amount: 1 }] },
  {
    id: "sepia",
    name: "Sepia",
    operations: [
      { type: "sepia", amount: 1 },
      { type: "contrast", amount: 0.75 },
      { type: "brightness", amount: 0.9 },
      { type: "saturate", amount: 1.2 },
      { type: "hue-rotate", degrees: 15 },
    ],
  },
];

export const DEFAULT_FILTER = FILTERS[0];

export const getFilter = (id: string) =>
  FILTERS.find((filter) => filter.id === id) ?? DEFAULT_FILTER;

export const toCssFilter = ({ operations }: PhotoFilter) =>
  operations.length === 0
    ? "none"
    : operations
        .map((op) =>
          op.type === "hue-rotate"
            ? `hue-rotate(${op.degrees}deg)`
            : `${op.type}(${op.amount})`
        )
        .join(" ");
