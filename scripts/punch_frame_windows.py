"""Turn a numbered frame layout (frameN.png) into its overlay (frameN-template.png).

- Slot fills (palette colors) become fully transparent.
- Placeholder numbers (black glyphs enclosed by a slot) are removed.
- Anything else overlapping a slot (stickers, logos) is kept.
- Anti-aliased slot edges are un-blended from the fill color, so the window
  edge keeps the artwork's own color with a smooth alpha ramp.

Usage (needs Pillow):
  python3 scripts/punch_frame_windows.py public/frames/frameN.png public/frames/frameN-template.png
  # a design whose slot "4" isn't the standard pink:
  python3 scripts/punch_frame_windows.py ... --fill 241,115,141:4
Prints the detected windows as JSON (shot index from the fill color), ready to
copy into src/constants/frames.ts.

Inputs narrower than 1200px are upscaled (Lanczos + sharpening) so they don't
look blurry in the 1200px strip. That recovers crispness, not lost detail: a
real high-resolution export still looks better. Pure Python, so very large
inputs (10x) take a while.
"""
import argparse
import json
import math
from collections import deque
from PIL import Image, ImageFilter

# Fill color -> shot index (0-based), as used in the Ber-sama layout guides.
PALETTE = {
    (206, 255, 244): 0,  # mint   "1"
    (220, 206, 255): 1,  # lilac  "2"
    (241, 255, 206): 2,  # yellow "3"
    (255, 193, 193): 3,  # pink   "4"
}
FILL_TOLERANCE = 3  # slot fills are flat; anything further is an anti-aliased edge
MIN_SLOT_AREA = 0.005  # of the image; ignores stray pastel pixels in the artwork
NUMBER_RESIDUAL = 18  # max distance from the black→fill blend line
MIN_EDGE_CONTRAST = 12  # below this, edge alpha can't be recovered reliably
MIN_OUTPUT_WIDTH = 1200  # matches STRIP_EXPORT_WIDTH in src/constants/photobooth.ts
EDGE_STEEPNESS = 1.6  # >1 tightens the upscaled window edge ramp


def upscale(image, factor):
    """Lanczos upscale tuned for flat artwork.

    Resampled in premultiplied alpha so transparent windows don't bleed a dark
    fringe; unsharp mask only on fully opaque areas so window edges stay clean;
    the alpha ramp is steepened so edges read crisp instead of soft.
    """
    size = (image.width * factor, image.height * factor)
    big = image.convert("RGBa").resize(size, Image.LANCZOS).convert("RGBA")
    rgb, alpha = big.convert("RGB"), big.getchannel("A")

    alpha = alpha.point(lambda v: max(0, min(255, round((v - 127.5) * EDGE_STEEPNESS + 127.5))))
    sharp = rgb.filter(ImageFilter.UnsharpMask(radius=factor * 0.6, percent=90, threshold=2))
    solid = alpha.point(lambda v: 255 if v == 255 else 0).filter(ImageFilter.MinFilter(factor * 2 + 1))
    rgb = Image.composite(sharp, rgb, solid)

    result = rgb.convert("RGBA")
    result.putalpha(alpha)
    return result


parser = argparse.ArgumentParser(description="Punch transparent photo windows into a frame layout.")
parser.add_argument("src", help="numbered layout, e.g. public/frames/frameN.png")
parser.add_argument("dst", help="overlay to write, e.g. public/frames/frameN-template.png")
parser.add_argument(
    "--fill",
    action="append",
    default=[],
    metavar="R,G,B:N",
    help="window color for the slot numbered N when a design doesn't use the standard "
    "palette (e.g. 241,115,141:4). Replaces that number's default color.",
)
args = parser.parse_args()

for spec in args.fill:
    color, number = spec.split(":")
    shot = int(number) - 1
    PALETTE = {c: s for c, s in PALETTE.items() if s != shot}
    PALETTE[tuple(int(v) for v in color.split(","))] = shot

src, dst = args.src, args.dst
im = Image.open(src).convert("RGBA")
W, H = im.size
px = im.load()
MIN_SLOT_PIXELS = W * H * MIN_SLOT_AREA


def dist(a, b):
    return sum((x - y) ** 2 for x, y in zip(a, b)) ** 0.5


def fill_label(p):
    for color, shot in PALETTE.items():
        if dist(p[:3], color) <= FILL_TOLERANCE:
            return color
    return None


label = [[fill_label(px[x, y]) for x in range(W)] for y in range(H)]
NEIGHBORS = ((1, 0), (-1, 0), (0, 1), (0, -1))

# 1. Connected regions of each fill color = candidate windows.
seen = [[False] * W for _ in range(H)]
slots = []
for y in range(H):
    for x in range(W):
        color = label[y][x]
        if color is None or seen[y][x]:
            continue
        queue, pixels = deque([(x, y)]), []
        seen[y][x] = True
        while queue:
            cx, cy = queue.popleft()
            pixels.append((cx, cy))
            for dx, dy in NEIGHBORS:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < W and 0 <= ny < H and not seen[ny][nx] and label[ny][nx] == color:
                    seen[ny][nx] = True
                    queue.append((nx, ny))
        if len(pixels) >= MIN_SLOT_PIXELS:
            xs = [p[0] for p in pixels]
            ys = [p[1] for p in pixels]
            slots.append({
                "color": color,
                "pixels": set(pixels),
                "box": (min(xs), min(ys), max(xs), max(ys)),
            })

# Stickers crossing a window can cut off slivers of its fill (beside a "{",
# inside the loops of an "&"). Too small to count as windows on their own, they
# still belong to the window they sit in.
SLIVER_MARGIN = max(4, W // 100)
for slot in slots:
    x0, y0, x1, y1 = slot["box"]
    for y in range(max(0, y0 - SLIVER_MARGIN), min(H, y1 + SLIVER_MARGIN + 1)):
        for x in range(max(0, x0 - SLIVER_MARGIN), min(W, x1 + SLIVER_MARGIN + 1)):
            if label[y][x] == slot["color"]:
                slot["pixels"].add((x, y))
    xs = [p[0] for p in slot["pixels"]]
    ys = [p[1] for p in slot["pixels"]]
    slot["box"] = (min(xs), min(ys), max(xs), max(ys))


def is_black_blend(p, fill):
    """True if p lies on the line between black and the fill (a glyph pixel or its AA)."""
    dot_pf = sum(a * b for a, b in zip(p, fill))
    dot_ff = sum(b * b for b in fill)
    t = max(0.0, min(1.0, dot_pf / dot_ff))
    return dist(p, [t * c for c in fill]) <= NUMBER_RESIDUAL


out = im.copy()
op = out.load()
clear = set()  # pixels to make fully transparent
windows = []

for slot in slots:
    fill = slot["color"]
    x0, y0, x1, y1 = slot["box"]
    inside = slot["pixels"]
    clear |= inside

    # 2. Holes: non-fill pixels in the box not reachable from the box edge.
    #    Stickers crossing the window edge reach the border; enclosed glyphs don't.
    outside = set()
    queue = deque()
    for x in range(x0, x1 + 1):
        for y in (y0, y1):
            if (x, y) not in inside:
                queue.append((x, y))
    for y in range(y0, y1 + 1):
        for x in (x0, x1):
            if (x, y) not in inside:
                queue.append((x, y))
    outside.update(queue)
    while queue:
        cx, cy = queue.popleft()
        for dx, dy in NEIGHBORS:
            nx, ny = cx + dx, cy + dy
            if x0 <= nx <= x1 and y0 <= ny <= y1 and (nx, ny) not in inside and (nx, ny) not in outside:
                outside.add((nx, ny))
                queue.append((nx, ny))

    holes = [
        (x, y)
        for y in range(y0, y1 + 1)
        for x in range(x0, x1 + 1)
        if (x, y) not in inside and (x, y) not in outside
    ]
    # Group holes and only remove the ones that are black glyphs (the numbers).
    hole_set, done = set(holes), set()
    for start in holes:
        if start in done:
            continue
        group, queue = [], deque([start])
        done.add(start)
        while queue:
            cx, cy = queue.popleft()
            group.append((cx, cy))
            for dx, dy in NEIGHBORS:
                n = (cx + dx, cy + dy)
                if n in hole_set and n not in done:
                    done.add(n)
                    queue.append(n)
        glyph_like = sum(is_black_blend(px[x, y][:3], fill) for x, y in group)
        if glyph_like >= 0.9 * len(group):
            clear.update(group)

    windows.append({"shot": PALETTE[fill], "x": x0, "y": y0, "width": x1 - x0 + 1, "height": y1 - y0 + 1})

for x, y in clear:
    op[x, y] = (0, 0, 0, 0)

# 3. Un-blend the anti-aliased ring around each window so its edge is clean.
#    An edge pixel p = a·C + (1-a)·F, with C the artwork color just outside.
fill_at = {}
for slot in slots:
    for p in slot["pixels"]:
        fill_at[p] = slot["color"]


def nearest_fill(x, y):
    for r in (1, 2):
        for dy in range(-r, r + 1):
            for dx in range(-r, r + 1):
                f = fill_at.get((x + dx, y + dy))
                if f:
                    return f
    return None


def outside_color(x, y):
    """Closest pixel at 2–3px that is neither cleared nor next to a window."""
    best = None
    for r in (2, 3):
        for dy in range(-r, r + 1):
            for dx in range(-r, r + 1):
                nx, ny = x + dx, y + dy
                if not (0 <= nx < W and 0 <= ny < H) or (nx, ny) in clear:
                    continue
                if nearest_fill(nx, ny) is not None:
                    continue
                d = dx * dx + dy * dy
                if best is None or d < best[0]:
                    best = (d, px[nx, ny][:3])
        if best:
            return best[1]
    return None


for y in range(H):
    for x in range(W):
        if (x, y) in clear:
            continue
        fill = nearest_fill(x, y)
        if fill is None:
            continue
        p = px[x, y][:3]
        c = outside_color(x, y)
        if c is None or dist(c, fill) < MIN_EDGE_CONTRAST:
            continue  # low contrast: leave the pixel as drawn
        cf = [a - b for a, b in zip(c, fill)]
        pf = [a - b for a, b in zip(p, fill)]
        a = sum(i * j for i, j in zip(pf, cf)) / sum(i * i for i in cf)
        a = max(0.0, min(1.0, a))
        if a >= 0.98:
            continue
        if a <= 0.02:
            op[x, y] = (0, 0, 0, 0)
            continue
        color = tuple(max(0, min(255, round((pc - (1 - a) * fc) / a))) for pc, fc in zip(p, fill))
        op[x, y] = (*color, round(a * 255))

# 4. Small exports get upscaled so the browser never stretches them at print size.
factor = math.ceil(MIN_OUTPUT_WIDTH / W) if W < MIN_OUTPUT_WIDTH else 1
if factor > 1:
    out = upscale(out, factor)
    for window in windows:
        for key in ("x", "y", "width", "height"):
            window[key] *= factor

# 5. Grow each window to every see-through pixel around it (edge ramps, noisy
#    textured edges), so the photo underneath covers all of them.
alpha = out.getchannel("A")
margin = 4 * factor + 4
for window in windows:
    left = max(0, window["x"] - margin)
    top = max(0, window["y"] - margin)
    right = min(out.width, window["x"] + window["width"] + margin)
    bottom = min(out.height, window["y"] + window["height"] + margin)
    see_through = alpha.crop((left, top, right, bottom)).point(lambda v: 255 if v < 255 else 0)
    box = see_through.getbbox()
    if box:
        window.update(x=left + box[0], y=top + box[1], width=box[2] - box[0], height=box[3] - box[1])

out.save(dst, optimize=True)
windows.sort(key=lambda w: (w["x"] > out.width / 2, w["y"]))
print(json.dumps({"width": out.width, "height": out.height, "upscale": factor, "windows": windows}))
