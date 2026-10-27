import MainLayout from "@/components/layouts/MainLayout";
import AdjustmentTemplate from "@/components/templates/AdjustmentTemplate";
import { createPageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata = createPageMetadata({
  title: "Choose a Filter",
  description: "Add the final sparkle to your Ber-sama photo strip with a filter.",
  path: ROUTES.adjustment,
  noIndex: true,
});

export default function AdjustmentPage() {
  return (
    <MainLayout>
      <AdjustmentTemplate />
    </MainLayout>
  );
}
