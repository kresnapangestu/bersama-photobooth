# Ber-sama Photobooth

A browser photobooth. Pick a frame, take photos with your webcam, choose a filter, and download a print-ready photo strip (PNG) or an animated GIF. Nothing gets uploaded: photos stay in memory in your browser tab.

**Live:** https://bersamaphoto.netlify.app

## Flow

```
/ → /payment-section → /frame-selection → /photo-capture → /adjustment-page → /result
```

1. **Payment.** Shows a QRIS code. The "magic key" input isn't verified yet; the link below it continues the flow.
2. **Frame selection.** Choose one of 7 frames. The frame decides how many shots you take (3 or 4).
3. **Photo capture.** Each shot gets a 3-second countdown. The live preview is cropped to the frame window's aspect ratio, and you can retake any shot.
4. **Adjustment.** Pick a filter (Natural, Grayscale, Vivid, …). The strip re-renders so you see the final output.
5. **Result.** Download the strip as a 1200px PNG or the shots as a GIF.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with `@theme` tokens in `globals.css`
- [Embla Carousel](https://www.embla-carousel.com) for the frame picker
- [gifenc](https://github.com/mattdesl/gifenc) for GIF export (loaded on demand)
- Deployed on [Netlify](https://www.netlify.com)

## Getting started

Requires Node.js 18.18 or newer.

```bash
git clone https://github.com/kresnapangestu/bersama-photobooth.git
cd bersama-photobooth
npm install
npm run dev
```

Open http://localhost:3000. Browsers only allow camera access on `localhost` or HTTPS.

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Project structure

```
src/
├── app/
│   ├── (booth)/            # booth flow; its layout holds PhotoSessionProvider
│   ├── about/, privacy-policy/
│   ├── sitemap.ts, robots.ts, opengraph-image.tsx, twitter-image.tsx
│   └── layout.tsx          # root metadata, fonts, JSON-LD
├── components/             # atoms → molecules → templates (atomic design)
├── constants/              # frames, filters, routes, site config, booth settings
├── context/                # PhotoSessionContext: frame, shots, filter
├── hooks/                  # useCamera, useCountdown, useComposedStrip
└── lib/
    ├── photobooth/         # canvas, compose, colorMatrix, gif
    ├── metadata.ts         # per-page SEO helper
    └── download.ts
scripts/
└── punch_frame_windows.py  # turns a frame design into a transparent overlay
public/frames/              # frameN.png + frameN-template.png
```

## How the strip is built

`composeStrip` in `src/lib/photobooth/compose.ts` draws the strip on a canvas at `STRIP_EXPORT_WIDTH` (1200px):

1. **Photos.** Each shot is cropped like `object-fit: cover` to its window and drawn behind the frame. Photos are never stretched. They're cropped straight from the full-resolution camera capture, so sharpness doesn't depend on the frame artwork's size.
2. **Filter.** Applied per pixel through a color matrix (`colorMatrix.ts`) rather than `ctx.filter`, because Safari doesn't support `ctx.filter`. The same filter definitions drive the CSS preview, so the preview and the export match.
3. **Frame.** The frame overlay (`frameN-template.png`) has transparent windows and is drawn last, so stickers and logos can sit on top of the photos.

Photos run a few pixels under the overlay so anti-aliased window edges never let the empty canvas show through.

## Adding a frame

Frames live in `public/frames` as a pair:

| File | Purpose |
|---|---|
| `frameN.png` | Design hand-off: the artwork with numbered pastel windows |
| `frameN-template.png` | Generated overlay with transparent windows, used by the app |

Window colors set the shot order:

| Color | RGB | Shot |
|---|---|---|
| Mint | `206,255,244` | 1 |
| Lilac | `220,206,255` | 2 |
| Yellow | `241,255,206` | 3 |
| Pink | `255,193,193` | 4 |

1. Save the design as `public/frames/frameN.png`. Each window should be a flat fill in one of the colors above, with a black number on it.
2. Generate the overlay. This needs Python 3 and Pillow (`pip install pillow`):

   ```bash
   python3 scripts/punch_frame_windows.py public/frames/frameN.png public/frames/frameN-template.png
   ```

   The script:
   - makes the windows transparent and removes the numbers;
   - keeps stickers that overlap a window;
   - cleans up the anti-aliased edges;
   - upscales designs narrower than 1200px so they stay crisp.

   Upscaling makes edges crisp but can't add detail, so a high-resolution export (1448px or wider) still looks best.

   If a window uses a non-standard color, override it with `--fill R,G,B:N`, for example `--fill 241,115,141:4`.
3. Copy the printed `width`, `height` and `windows` into `FRAMES` in `src/constants/frames.ts`:

   ```ts
   frame(8, "My Frame", { width: 1448, height: 2268 }, [
     { shot: 0, x: 75, y: 239, width: 574, height: 562 },
     // …
   ]),
   ```

   The frame shows up in the picker automatically. `shot` is zero-based; one shot can fill several windows (for example, a 2-up strip).

## Configuration

| File | Contents |
|---|---|
| `src/constants/site.ts` | Domain, name, owner, OG image. Update this if the domain changes. |
| `src/constants/photobooth.ts` | Countdown, export width, camera constraints, mirroring, JPEG quality, GIF settings |
| `src/constants/filters.ts` | Filters as structured operations |
| `src/constants/routes.ts` | Routes, plus which routes are indexed for SEO and which are private |

## SEO

- Per-page metadata through `createPageMetadata` in `src/lib/metadata.ts`: canonical URL, Open Graph, Twitter cards.
- `sitemap.xml` and `robots.txt` are generated from `INDEXABLE_ROUTES`. Booth pages are `noindex`.
- Generated OG/Twitter images and JSON-LD structured data.

## Privacy

The camera stream and every capture stay in the browser tab. Captured photos live in React state and are gone when the session resets or the tab closes. There's no backend and no upload.
