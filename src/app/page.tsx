import type { Metadata } from "next";
import LandingTemplate from "@/components/templates/LandingTemplate";
import { SITE } from "@/constants/site";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: { absolute: SITE.title },
  alternates: { canonical: ROUTES.home },
};

export default function HomePage() {
  return <LandingTemplate />;
}
