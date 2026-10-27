import MainLayout from "@/components/layouts/MainLayout";
import PaymentTemplate from "@/components/templates/PaymentTemplate";
import { createPageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata = createPageMetadata({
  title: "Payment",
  description: "Scan the QRIS code or enter your magic key to start a Ber-sama photo session.",
  path: ROUTES.payment,
  noIndex: true,
});

export default function PaymentPage() {
  return (
    <MainLayout>
      <PaymentTemplate />
    </MainLayout>
  );
}
