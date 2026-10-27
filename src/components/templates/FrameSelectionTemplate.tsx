"use client";

import { useRouter } from "next/navigation";
import { FrameSelector } from "../molecules/FrameSelector";
import { Headline } from "../molecules/Headline";
import { usePhotoSession } from "@/context/PhotoSessionContext";
import { FRAMES } from "@/constants/frames";
import { ROUTES } from "@/constants/routes";

export default function FrameSelectionTemplate() {
  const router = useRouter();
  const { reset } = usePhotoSession();

  const handleSelect = (frameId: string) => {
    // Picking a frame always starts a fresh session, even if it's the same frame again.
    reset();
    router.push(`${ROUTES.photoCapture}?frame=${encodeURIComponent(frameId)}`);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Headline
        caption="Ready to shine? Pick a frame!"
        subcaption="✨A click, a smile, a dash of flair — choose your enchanted frame and let the magic begin!  📸"
      />
      <FrameSelector frames={FRAMES} onSelect={handleSelect} />
    </div>
  );
}
