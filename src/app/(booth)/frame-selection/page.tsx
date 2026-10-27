import MainLayout from "@/components/layouts/MainLayout";
import FrameSelectionTemplate from "@/components/templates/FrameSelectionTemplate";
import { createPageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata = createPageMetadata({
  title: "Pick a Frame",
  description: "Choose the photo strip frame for your Ber-sama session.",
  path: ROUTES.frameSelection,
  noIndex: true,
});

export default function FrameSelectionPage() {
  return (
    <MainLayout>
      <FrameSelectionTemplate />
    </MainLayout>
  );
}
