import Image from "next/image";
import { Fragment } from "react";
import clsx from "clsx";
import { Hero } from "../molecules/Hero";
import { Footer } from "../molecules/Footer";
import { DecorativeImage } from "../atoms/DecorativeImage";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

/** Phrase repeats per copy; one copy must be wider than the widest viewport. */
const PHRASES_PER_COPY = 3;

interface MarqueeRowProps {
  words: [string, string];
  /** Index of the word rendered bold; the other one is light. */
  boldIndex: 0 | 1;
  direction: "left" | "right";
  className?: string;
}

/**
 * Seamless loop: the track holds two identical copies and slides exactly one
 * copy width (-50%), so the end frame matches the start frame with no jump.
 */
const MarqueeRow = ({ words, boldIndex, direction, className }: MarqueeRowProps) => {
  const copy = Array.from({ length: PHRASES_PER_COPY }, (_, i) => (
    <Fragment key={i}>
      {words.map((word, wordIndex) => (
        <span
          key={word}
          className={clsx(
            "pr-10",
            wordIndex === boldIndex
              ? "font-extrabold text-accent"
              : "font-light opacity-40"
          )}
        >
          {word}
        </span>
      ))}
    </Fragment>
  ));

  return (
    <div className={clsx("absolute inset-x-0 z-20 overflow-hidden", className)}>
      <div
        className={clsx(
          "flex w-max whitespace-nowrap text-[175px] text-primary will-change-transform motion-reduce:animate-none",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
      >
        <div className="flex shrink-0">{copy}</div>
        <div className="flex shrink-0">{copy}</div>
      </div>
    </div>
  );
};

export default function LandingTemplate() {
  return (
    <div className="flex h-screen w-screen max-w-screen">
      <h1 className="sr-only">{SITE.title}</h1>
      <div className="flex flex-1 flex-col px-[70px] py-[30px]">
        <div className="absolute top-120">
          <Hero href={ROUTES.payment} />
        </div>
        <DecorativeImage
          src="/images/background_item_4.webp"
          width={700}
          height={100}
          className="absolute bottom-0 z-0 right-5/14"
        />
        <Footer className="mt-auto text-sm" />
      </div>

      {/* Decorative brand marquee; the real heading is the sr-only <h1> above. */}
      <div aria-hidden="true">
        <MarqueeRow
          words={["Ber-sama", "Photo Booth"]}
          boldIndex={0}
          direction="left"
          className="top-18 leading-none"
        />
        <MarqueeRow
          words={["Ber-sama", "Photo Booth"]}
          boldIndex={1}
          direction="right"
          className="top-45"
        />
      </div>

      <div className="relative z-10 h-full w-2/5">
        <Image
          src="/images/landingpageimage.webp"
          alt="A hand holding a Ber-sama photo strip with four smiling portraits"
          fill
          priority
          sizes="40vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
