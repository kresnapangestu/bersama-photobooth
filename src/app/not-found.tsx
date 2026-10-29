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
      <section className="flex flex-1 flex-col items-center justify-center gap-flow py-flow text-center">
        <h1 className="text-display font-semibold">Lost in the magic?</h1>
        <p className="text-lg sm:text-xl">This page vanished in a puff of glitter.</p>
        <ButtonLink href={ROUTES.home}>Back to home</ButtonLink>
      </section>
    </SecondaryLayout>
  );
}
