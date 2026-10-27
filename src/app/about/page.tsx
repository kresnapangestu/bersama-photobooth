import SecondaryLayout from "@/components/layouts/SecondaryLayout";
import AboutTemplate from "@/components/templates/AboutTemplate";
import { createPageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/constants/routes";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Ber-sama is for the dreamers and explorers who want to capture spontaneous moments and create magical memories that last forever.",
  path: ROUTES.about,
});

export default function AboutPage() {
  return (
    <SecondaryLayout height="screen">
      <AboutTemplate />
    </SecondaryLayout>
  );
}
