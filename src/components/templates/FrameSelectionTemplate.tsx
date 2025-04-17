"use client";
import { useRouter } from "next/navigation";
import { FrameSelector } from "../molecules/FrameSelector";
import { availableFrames } from "@/constants/frames";

export default function FrameSelectionTemplate() {
  const router = useRouter();

  const handleSelect = (frame: string) => {
    router.push(`/photo-capture?frame=${frame}`);
  };

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Choose Your Frame</h1>
      <FrameSelector frames={availableFrames} onSelect={handleSelect} />
    </div>
  );
}
