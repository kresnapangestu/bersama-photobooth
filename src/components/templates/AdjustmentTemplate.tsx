"use client";

import clsx from "clsx";
import { Headline } from "../molecules/Headline";
import { EmptyState } from "../molecules/EmptyState";
import { StripPreview } from "../molecules/StripPreview";
import { ButtonLink } from "../atoms/Button";
import { AspectFit } from "../atoms/AspectFit";
import { DecorativeImage } from "../atoms/DecorativeImage";
import { ObjectUrlImage } from "../atoms/ObjectUrlImage";
import { usePhotoSession } from "@/context/PhotoSessionContext";
import { useComposedStrip } from "@/hooks/useComposedStrip";
import { FILTERS, toCssFilter } from "@/constants/filters";
import { ROUTES } from "@/constants/routes";

export default function AdjustmentTemplate() {
  const { frame, shots, filter, setFilter, isComplete } = usePhotoSession();
  const strip = useComposedStrip();

  if (!frame || !isComplete) {
    return (
      <EmptyState
        title="No photos to polish yet"
        description="Your session has ended or isn't finished. Pick a frame and take your shots to continue."
        action={{ label: "Pick a frame", href: ROUTES.frameSelection }}
      />
    );
  }

  const sampleShot = shots[0];

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center gap-flow">
      <Headline
        caption="Polish the Magic, Perfect the Moment!"
        subcaption="Your magical photo is ready to shine — now let’s add the final sparkle! Tweak or glam it up, just the way you like. ✨🎀🪄"
      />
      {/* wide: strip | divider | filters, equal side columns keep the divider centred. */}
      <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-flow wide:grid wide:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] wide:grid-rows-[minmax(0,1fr)] wide:gap-x-[clamp(1.5rem,4vw,3.5rem)]">
        <AspectFit
          ratio={frame.width / frame.height}
          mobileHeight="55svh"
          className="wide:h-full wide:justify-end"
        >
          <StripPreview strip={strip} />
        </AspectFit>
        <DecorativeImage
          src="/images/divider.webp"
          width={256}
          height={1880}
          className="hidden h-full w-[clamp(2.5rem,4vw,4.5rem)] object-contain wide:block"
        />
        <section
          aria-labelledby="filter-heading"
          className="flex min-h-0 w-full shrink-0 flex-col gap-3 wide:h-full wide:max-w-md wide:justify-center wide:justify-self-start"
        >
          <h2
            id="filter-heading"
            className="text-center text-lg font-bold wide:text-left"
          >
            Choose Filter
          </h2>
          {/* Phones: one swipeable row. wide: a grid that scrolls only if it must. */}
          <ul className="-mx-gutter flex snap-x scroll-px-gutter gap-4 overflow-x-auto px-gutter py-1 wide:mx-0 wide:grid wide:min-h-0 wide:grid-cols-2 wide:overflow-x-visible wide:overflow-y-auto wide:p-1 wide:lg:grid-cols-3">
            {FILTERS.map((option) => {
              const isSelected = option.id === filter.id;
              return (
                <li key={option.id} className="w-24 shrink-0 snap-start wide:w-auto">
                  <button
                    type="button"
                    onClick={() => setFilter(option.id)}
                    aria-pressed={isSelected}
                    className="group flex w-full cursor-pointer flex-col items-center gap-1 focus-visible:outline-none"
                  >
                    {sampleShot && (
                      <ObjectUrlImage
                        src={sampleShot.url}
                        alt=""
                        style={{ filter: toCssFilter(option) }}
                        className={clsx(
                          "aspect-[5/4] w-full rounded object-cover ring-offset-2 transition group-hover:opacity-90 group-focus-visible:ring-2 group-focus-visible:ring-primaryDarker",
                          isSelected && "ring-3 ring-primaryDarker"
                        )}
                      />
                    )}
                    <span className={clsx("text-sm sm:text-base", isSelected && "font-bold")}>
                      {option.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <ButtonLink href={ROUTES.result} className="shrink-0">
        To destiny and beyond!💨
      </ButtonLink>
    </div>
  );
}
