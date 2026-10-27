"use client";

import clsx from "clsx";
import { Headline } from "../molecules/Headline";
import { EmptyState } from "../molecules/EmptyState";
import { StripPreview } from "../molecules/StripPreview";
import { ButtonLink } from "../atoms/Button";
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
    <div className="flex flex-col items-center gap-6 p-6">
      <Headline
        caption="Polish the Magic, Perfect the Moment!"
        subcaption="Your magical photo is ready to shine — now let’s add the final sparkle! Tweak or glam it up, just the way you like. ✨🎀🪄"
      />
      <div className="mt-3 flex gap-15">
        <StripPreview strip={strip} aspectRatio={frame.width / frame.height} />
        <DecorativeImage src="/images/divider.webp" width={70} height={20} />
        <section aria-labelledby="filter-heading" className="text-center">
          <h2 id="filter-heading" className="text-lg font-bold">
            Choose Filter
          </h2>
          <ul className="mt-2 flex h-[55vh] max-h-[55vh] w-fit flex-col items-center gap-5 overflow-y-auto px-2 py-1">
            {FILTERS.map((option) => {
              const isSelected = option.id === filter.id;
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => setFilter(option.id)}
                    aria-pressed={isSelected}
                    className="group flex cursor-pointer flex-col items-center gap-1 focus-visible:outline-none"
                  >
                    {sampleShot && (
                      <ObjectUrlImage
                        src={sampleShot.url}
                        alt=""
                        width={150}
                        height={120}
                        style={{ filter: toCssFilter(option) }}
                        className={clsx(
                          "h-[120px] w-[150px] rounded object-cover ring-offset-2 transition group-hover:opacity-90 group-focus-visible:ring-2 group-focus-visible:ring-primaryDarker",
                          isSelected && "ring-3 ring-primaryDarker"
                        )}
                      />
                    )}
                    <span className={clsx(isSelected && "font-bold")}>
                      {option.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <ButtonLink href={ROUTES.result} className="mt-4">
        To destiny and beyond!💨
      </ButtonLink>
    </div>
  );
}
