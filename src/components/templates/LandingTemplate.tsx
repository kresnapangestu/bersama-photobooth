"use client";
import Image from "next/image";
import { Navbar } from "../molecules/Navbar";
import { Hero } from "../molecules/Hero";
import { Fragment } from "react";

export default function LandingTemplate() {
  return (
    <div className="h-screen w-screen max-w-screen flex">
      <Navbar />
      <div className="flex flex-col flex-1 px-[70px] py-[30px]">
        <div className="absolute top-120">
          <Hero />
        </div>
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
        <div className="whitespace-nowrap animate-[scroll-left_10s_linear_infinite] text-[175px] text-[#DCCEFF] leading-none">
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
        <div className="whitespace-nowrap animate-[scroll-left_10s_linear_infinite] text-[175px] text-[#DCCEFF]">
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
          src="/images/landingpageimage.png"
          layout="fill"
          objectFit="cover"
          alt="Picture of the author"
        />
      </div>
    </div>
  );
}
