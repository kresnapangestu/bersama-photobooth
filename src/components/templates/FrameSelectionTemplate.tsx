"use client";
import { useRouter } from "next/navigation";
import { FrameSelector } from "../molecules/FrameSelector";
import { availableFrames } from "@/constants/frames";
import { Headline } from "../molecules/Headline";

export default function FrameSelectionTemplate() {
  const router = useRouter();

  const handleSelect = (frame: string) => {
    router.push(`/photo-capture?frame=${frame}`);
  };

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <Headline
        caption="Ready to shine? Pick a frame!"
        subcaption="✨A click, a smile, a dash of flair — choose your enchanted frame and let the magic begin!  📸"
      />
      <FrameSelector frames={availableFrames} onSelect={handleSelect} />
    </div>
  );
}
