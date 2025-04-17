"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { PhotoPreview } from "../molecules/PhotoPreview";

export default function ResultTemplate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const photo = searchParams.get("photo");

  if (!photo) {
    return <p className="p-6">No photo available.</p>;
  }

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Your Photo</h1>
      <PhotoPreview src={photo} alt="Captured photo" />
      <Button onClick={() => router.push("/frame-selection")}>
        Take Another
      </Button>
    </div>
  );
}
