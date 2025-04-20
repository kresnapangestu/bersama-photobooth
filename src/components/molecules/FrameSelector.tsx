import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import Carousel from "./Carousel";
import "../../app/carousel.css";

// components/atoms/FrameSelector.tsx
interface FrameSelectorProps {
  frames: string[];
  onSelect: (frame: string) => void;
}
const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export const FrameSelector = ({ frames, onSelect }: FrameSelectorProps) => {
  return (
    <div className="flex w-[80vw]">
      <Carousel slides={frames} options={OPTIONS} onSelect={onSelect} />
    </div>
  );
};
