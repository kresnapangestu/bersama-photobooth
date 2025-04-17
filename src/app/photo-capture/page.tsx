"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import PhotoCaptureTemplate from "@/components/templates/PhotoCaptureTemplate";

export default function PhotoCapturePage() {
  const searchParams = useSearchParams();
  const frame = searchParams.get("frame");
  if (!frame) return <p className="p-6">No frame selected.</p>;
  return <PhotoCaptureTemplate frame={frame} />;
}
