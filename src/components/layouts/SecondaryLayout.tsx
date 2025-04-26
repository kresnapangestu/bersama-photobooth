"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface SecondaryLayoutProps {
  children: ReactNode;
  height?: string;
}

export default function SecondaryLayout({
  children,
  height,
}: SecondaryLayoutProps) {
  return (
    <div className="flex flex-col mt-[50px] relative">
      <div
        className={`${
          height !== "screen" ? "" : "absolute"
        } inset-0 z-0 pointer-events-none`}
      >
        <Image
          src={`/images/background_item_1.webp`}
          width={600}
          height={120}
          alt={`background_image_1`}
          className={`${
            height === "screen" ? "fixed bottom-[-5em]" : "absolute top-[500px]"
          }  right-[-3em] `}
        />
        <Image
          src={`/images/background_item_5.webp`}
          width={400}
          height={120}
          alt={`background_image_5`}
          className={`${
            height === "screen" ? "fixed top-20 " : "absolute top-30 "
          }  left-0`}
        />
        {height !== "screen" && (
          <>
            <div>
              <Image
                src={`/images/background_item_3.webp`}
                width={400}
                height={120}
                alt={`background_image_3`}
                className="absolute  top-[1000px] left-[-5em]"
              />
            </div>
            <div>
              <Image
                src={`/images/background_item_2.webp`}
                width={400}
                height={120}
                alt={`background_image_2`}
                className="absolute  top-[90rem] right-[-5em]"
              />
            </div>
            <div>
              <Image
                src={`/images/background_item_6.webp`}
                width={300}
                height={120}
                alt={`background_image_6`}
                className="absolute top-[115rem] left-[-5em]"
              />
            </div>
            <div>
              <Image
                src={`/images/background_item_8.webp`}
                width={150}
                height={50}
                alt={`background_image_8`}
                className="absolute top-[125rem] right-[-1em]"
              />
            </div>
            <div>
              <Image
                src={`/images/background_item_7.webp`}
                width={400}
                height={120}
                alt={`background_image_7`}
                className="absolute top-[155rem] left-[-4em]"
              />
            </div>
            <div>
              <Image
                src={`/images/background_item_4.webp`}
                width={350}
                height={50}
                alt={`background_image_4`}
                className="absolute top-[180rem] right-0"
              />
            </div>
          </>
        )}
      </div>
      <div className="relative z-10 flex-1 px-4 pt-6 mb-5">{children}</div>
      <footer className="relative z-10 text-center text-xs px-4">
        All frames and designs on this website are the intellectual property of
        Sama Bandung © 2025. All rights reserved.
      </footer>
    </div>
  );
}
