"use client";
import Image from "next/image";
import { Hero } from "../molecules/Hero";
import { Fragment } from "react";

export default function LandingTemplate() {
  return (
    <div className="h-screen w-screen max-w-screen flex">
      <div className="flex flex-col flex-1 px-[70px] py-[30px]">
        <div className="absolute top-120">
          <Hero url="/payment-section" />
        </div>
        <Image
          src={"/images/background_item_4.png"}
          width={700}
          height={100}
          alt="image_backround"
          className="absolute bottom-0 z-0 right-5/14"
        />
        <div className="mt-auto">
          <a
            className="flex text-sm gap-2 hover:underline hover:underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            All frames and designs on this website are the intellectual property
            of Sama Bandung © 2025. All rights reserved.
          </a>
        </div>
      </div>
      <div className="overflow-hidden absolute w-full top-18 z-20">
        <div className="animate-scroll-left whitespace-nowrap text-[175px] text-[#DCCEFF] leading-none">
          {[...Array(20)].map((_, i) => (
            <Fragment key={i}>
              <span className="text-[#C2B8FF] mr-10 font-extrabold leading-none">
                Ber-sama
              </span>
              <span className="mr-10 font-light opacity-40 leading-none">
                Photo Booth
              </span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="overflow-hidden absolute w-full top-45 z-20">
        <div className="animate-scroll-right whitespace-nowrap text-[175px] text-[#DCCEFF]">
          {[...Array(20)].map((_, i) => (
            <Fragment key={i}>
              <span className="mr-10 font-light opacity-40">Ber-sama</span>
              <span className="text-[#C2B8FF] mr-10 font-extrabold">
                Photo Booth
              </span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="relative w-2/5 h-full z-10">
        <Image
          src="/images/landingpageimage.webp"
          layout="fill"
          objectFit="cover"
          alt="Picture of the author"
        />
      </div>
    </div>
  );
}
