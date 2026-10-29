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
  <div className="-mx-gutter flex min-h-0 flex-1 flex-col self-stretch">
    <Carousel slides={frames} options={OPTIONS} onSelect={onSelect} />
  </div>
);
