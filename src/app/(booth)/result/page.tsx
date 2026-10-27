import MainLayout from "@/components/layouts/MainLayout";
import ResultTemplate from "@/components/templates/ResultTemplate";
import { createPageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata = createPageMetadata({
  title: "Your Photo Strip",
  description: "Download your Ber-sama photo strip, GIF, and pictures.",
  path: ROUTES.result,
  noIndex: true,
});

export default function ResultPage() {
  return (
    <MainLayout>
      <ResultTemplate />
    </MainLayout>
  );
}
