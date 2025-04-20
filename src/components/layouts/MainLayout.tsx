"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-[92vh] flex flex-col mt-[50px] relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={`/images/background_item_1.webp`}
          width={550}
          height={120}
          alt={`background_image_1`}
          className="fixed right-[-3em] top-10"
        />
        <Image
          src={`/images/background_item_2.webp`}
          width={380}
          height={120}
          alt={`background_image_2`}
          className="fixed right-0 bottom-[-10em]"
        />
        <Image
          src={`/images/background_item_3.webp`}
          width={350}
          height={120}
          alt={`background_image_3`}
          className="fixed  bottom-0 left-[-2rem]"
        />
      </div>
      <div className="relative z-10 flex-1 px-4 pt-6">{children}</div>
      <footer className="relative z-10 text-center text-xs px-4">
        All frames and designs on this website are the intellectual property of
        Sama Bandung © 2025. All rights reserved.
      </footer>
    </div>
  );
}
