"use client"; // Add this line to mark the file as a client component

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PhotoCaptureTemplate from "@/components/templates/PhotoCaptureTemplate";

export default function PhotoCapturePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SearchParamsContent />
    </Suspense>
  );
}

const SearchParamsContent = () => {
  const searchParams = useSearchParams();
  const frame = searchParams.get("frame");

  if (!frame) return <p className="p-6">No frame selected.</p>;

  return <PhotoCaptureTemplate frame={frame} />;
};
