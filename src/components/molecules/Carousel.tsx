import React, { useEffect, useRef, useState } from "react";
import Image from "next/image"; // ✅ Add this
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "../atoms/CarouselAutoPlay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../atoms/CarouselArrowButtons";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
  onSelect: (frame: string) => void;
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

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // Initialize
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
                className="embla__slide flex items-center justify-center"
                key={index}
              >
                <div
                  key={index}
                  className={`embla__slide__number ${opacity} cursor-pointer duration-300 ease-in-out hover:scale-108 hover:!opacity-100`}
                  onClick={() => onSelect(frame)}
                  onMouseEnter={() => autoplay.current?.stop()}
                  onMouseLeave={() => autoplay.current?.play()}
                >
                  <Image
                    src={`/frames/${frame}`}
                    width={150}
                    height={90}
                    alt={`Frame${index + 1}`}
                    className="rounded-lg shadow-lg"
                  />
                </div>
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
