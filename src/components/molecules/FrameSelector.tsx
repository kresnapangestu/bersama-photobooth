import type { EmblaOptionsType } from "embla-carousel";
import Carousel from "./Carousel";
import type { FrameLayout } from "@/constants/frames";
import "../../app/carousel.css";

interface FrameSelectorProps {
  frames: FrameLayout[];
  onSelect: (frameId: string) => void;
}

const OPTIONS: EmblaOptionsType = { loop: true };

export const FrameSelector = ({ frames, onSelect }: FrameSelectorProps) => (
  <div className="flex w-[80vw]">
    <Carousel slides={frames} options={OPTIONS} onSelect={onSelect} />
  </div>
);
