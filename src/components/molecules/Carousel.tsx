import React, { useEffect, useRef, useState } from "react";
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

  return (
    <div className="embla w-full h-[32rem] justify-items-center">
      <div className="embla__viewport h-full w-full" ref={emblaRef}>
        <div className="embla__container items-center h-full">
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
                className="embla__slide flex items-center justify-center gap-1"
                key={frame.id}
              >
                <button
                  type="button"
                  aria-label={`Use ${frame.name}`}
                  className={`embla__slide__number ${opacity} cursor-pointer duration-300 ease-in-out hover:scale-108 hover:!opacity-100 focus-visible:!opacity-100 focus-visible:outline-2 focus-visible:outline-primaryDarker`}
                  onClick={() => onSelect(frame.id)}
                  onMouseEnter={() => autoplay.current?.stop()}
                  onMouseLeave={() => autoplay.current?.play()}
                  onFocus={() => autoplay.current?.stop()}
                  onBlur={() => autoplay.current?.play()}
                >
                  <Image
                    src={frame.preview}
                    width={400}
                    height={150}
                    alt={`${frame.name} photo strip design`}
                    className="rounded-lg shadow-lg"
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
