import type { Metadata } from "next";
import SecondaryLayout from "@/components/layouts/SecondaryLayout";
import { ButtonLink } from "@/components/atoms/Button";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SecondaryLayout height="screen">
      <section className="flex h-[80vh] flex-col items-center justify-center gap-6 p-6 text-center">
        <h1 className="text-[50px] font-semibold">Lost in the magic?</h1>
        <p className="text-xl">This page vanished in a puff of glitter.</p>
        <ButtonLink href={ROUTES.home}>Back to home</ButtonLink>
      </section>
    </SecondaryLayout>
  );
}
