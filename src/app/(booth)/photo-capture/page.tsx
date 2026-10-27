import { redirect } from "next/navigation";
import MainLayout from "@/components/layouts/MainLayout";
import PhotoCaptureTemplate from "@/components/templates/PhotoCaptureTemplate";
import { createPageMetadata } from "@/lib/metadata";
import { isAvailableFrame } from "@/constants/frames";
import { ROUTES } from "@/constants/routes";

export const metadata = createPageMetadata({
  title: "Take Your Photos",
  description: "Smile! Capture four shots for your Ber-sama photo strip.",
  path: ROUTES.photoCapture,
  noIndex: true,
});

interface PhotoCapturePageProps {
  searchParams: Promise<{ frame?: string | string[] }>;
}

export default async function PhotoCapturePage({
  searchParams,
}: PhotoCapturePageProps) {
  const { frame } = await searchParams;

  // Only allow known frame ids; the id picks which artwork gets loaded.
  if (typeof frame !== "string" || !isAvailableFrame(frame)) {
    redirect(ROUTES.frameSelection);
  }

  return (
    <MainLayout>
      <PhotoCaptureTemplate frameId={frame} />
    </MainLayout>
  );
}
