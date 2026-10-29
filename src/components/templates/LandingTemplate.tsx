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
}

/**
 * Seamless loop: the track holds two identical copies and slides exactly one
 * copy width (-50%), so the end frame matches the start frame with no jump.
 */
const MarqueeRow = ({ words, boldIndex, direction }: MarqueeRowProps) => {
  const copy = Array.from({ length: PHRASES_PER_COPY }, (_, i) => (
    <Fragment key={i}>
      {words.map((word, wordIndex) => (
        <span
          key={word}
          className={clsx(
            "pr-[0.25em]",
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
    <div className="overflow-hidden">
      <div
        className={clsx(
          "flex w-max whitespace-nowrap text-primary will-change-transform motion-reduce:animate-none",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
      >
        <div className="flex shrink-0">{copy}</div>
        <div className="flex shrink-0">{copy}</div>
      </div>
    </div>
  );
};

/**
 * split: copy on the left, photo on the right, marquee running across both.
 * Stacked: marquee, copy, photo, footer; on fit screens the photo takes what's
 * left. --marquee is one row's height; it shrinks with the viewport height too,
 * so the hero still fits on short screens.
 */
export default function LandingTemplate() {
  return (
    <div className="relative grid min-h-0 flex-1 grid-cols-1 overflow-hidden [--marquee:clamp(3.5rem,min(12.5vw,21dvh),11rem)] short:[--marquee:clamp(2.5rem,min(12.5vw,16dvh),11rem)] fit:grid-rows-[auto_minmax(0,1fr)_auto] split:grid-cols-[minmax(0,1fr)_40%] split:grid-rows-[minmax(0,1fr)_auto]">
      <h1 className="sr-only">{SITE.title}</h1>

      {/* Decorative brand marquee; the real heading is the sr-only <h1> above. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-(--nav-h) z-20 text-(length:--marquee) leading-none"
      >
        <MarqueeRow words={["Ber-sama", "Photo Booth"]} boldIndex={0} direction="left" />
        <MarqueeRow words={["Ber-sama", "Photo Booth"]} boldIndex={1} direction="right" />
      </div>

      <div className="relative z-10 flex flex-col justify-center px-gutter pt-[calc(var(--nav-h)+var(--marquee)*2+1.5rem)] pb-flow split:col-start-1 split:row-start-1">
        <Hero href={ROUTES.payment} />
      </div>

      <div className="relative z-10 h-[min(125vw,75svh)] fit:h-auto split:col-start-2 split:row-span-2 split:row-start-1 split:h-full">
        <Image
          src="/images/landingpageimage.webp"
          alt="A hand holding a Ber-sama photo strip with four smiling portraits"
          fill
          priority
          sizes="(min-width: 40rem) 40vw, 100vw"
          className="object-cover"
        />
      </div>

      <Footer className="px-gutter py-3 split:col-start-1 split:row-start-2" />

      <DecorativeImage
        src="/images/background_item_4.webp"
        width={721}
        height={327}
        className="absolute right-[38%] bottom-0 z-0 hidden h-auto w-[clamp(16rem,40vw,44rem)] split:block"
      />
    </div>
  );
}
