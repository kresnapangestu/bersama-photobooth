import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { FrameLayout } from "@/constants/frames";
import { useAutoplay } from "../atoms/CarouselAutoPlay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../atoms/CarouselArrowButtons";

type PropType = {
  slides: FrameLayout[];
  options?: EmblaOptionsType;
  onSelect: (frameId: string) => void;
};

const Carousel: React.FC<PropType> = (props) => {
  const autoplay = useRef(
    Autoplay({ playOnInit: true, delay: 2200, stopOnInteraction: false })
  );
  const { slides, options, onSelect } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { onAutoplayButtonClick } = useAutoplay(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;

    const syncSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    syncSelectedIndex();
    emblaApi.on("select", syncSelectedIndex);
    return () => {
      emblaApi.off("select", syncSelectedIndex);
    };
  }, [emblaApi]);

  // Landscape fit screens size slides from the carousel's own height (cqh);
  // portrait screens from the viewport, leaving room for the text and controls.
  return (
    <div className="embla flex min-h-0 w-full flex-1 flex-col items-center justify-center [--slide-h:min(55svh,100svh_-_21rem)] [--slide-max-w:62vw] fit:landscape:[--slide-h:86cqh] fit:landscape:[--slide-max-w:34cqw]">
      <div
        className="embla__viewport min-h-0 w-full py-3 fit:landscape:flex-1 fit:landscape:[container-type:size]"
        ref={emblaRef}
      >
        <div className="embla__container h-full items-center">
          {slides.map((frame, index) => {
            const distance = Math.abs(index - selectedIndex);
            let opacity = "opacity-50";

            if (distance === 0) {
              opacity = "opacity-100 scale-105";
            } else if (distance === 1) {
              opacity = "opacity-50";
            }

            return (
              <div
                className="embla__slide flex items-center justify-center"
                style={{ "--slide-ratio": frame.width / frame.height } as CSSProperties}
                key={frame.id}
              >
                <button
                  type="button"
                  aria-label={`Use ${frame.name}`}
                  className={`embla__slide__number ${opacity} cursor-pointer rounded-lg duration-300 ease-in-out hover:scale-108 hover:!opacity-100 focus-visible:!opacity-100 focus-visible:outline-2 focus-visible:outline-primaryDarker`}
                  onClick={() => onSelect(frame.id)}
                  onMouseEnter={() => autoplay.current?.stop()}
                  onMouseLeave={() => autoplay.current?.play()}
                  onFocus={() => autoplay.current?.stop()}
                  onBlur={() => autoplay.current?.play()}
                >
                  <Image
                    src={frame.preview}
                    width={frame.width}
                    height={frame.height}
                    sizes="(max-width: 40rem) 60vw, 25vw"
                    alt={`${frame.name} photo strip design`}
                    className="block h-auto w-full rounded-lg shadow-lg"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
