import SecondaryLayout from "@/components/layouts/SecondaryLayout";
import PrivacyTemplate from "@/components/templates/PrivacyTemplate";
import { createPageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Ber-sama collects, uses, shares, and protects your personal information when you use our online photo booth.",
  path: ROUTES.privacy,
});

export default function PrivacyPolicyPage() {
  return (
    <SecondaryLayout height="fit">
      <PrivacyTemplate />
    </SecondaryLayout>
  );
}
