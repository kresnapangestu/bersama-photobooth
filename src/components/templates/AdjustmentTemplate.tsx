"use client";
import { useRouter } from "next/navigation";
import { Headline } from "../molecules/Headline";
import Image from "next/image";
import { filterList } from "@/constants/filters";
import { Button } from "../atoms/Button";

export default function AdjustmentTemplate() {
  const router = useRouter();

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <Headline
        caption="Polish the Magic, Perfect the Moment!"
        subcaption="Your magical photo is ready to shine — now let’s add the final sparkle! Tweak or glam it up, just the way you like. ✨🎀🪄"
      />
      <div className="flex gap-15 mt-3">
        <Image
          src={`/frames/frame1.png`}
          width={340}
          height={420}
          alt={`result`}
          className="shadow-lg"
        />
        <Image
          src={`/images/divider.webp`}
          width={70}
          height={20}
          alt={`divider`}
        />
        <div className="text-center">
          <span className="font-bold text-lg ">Choose Filter</span>
          <div className="flex flex-col items-center text-center h-[55vh] max-h-[55vh] overflow-y-auto space-y-5 w-fit mt-2">
            {filterList.map((filter, index) => (
              <div
                key={"filter" + index}
                className="flex flex-col items-center justify-between cursor-pointer"
              >
                <Image
                  src="/images/adjustment-template.webp"
                  width={200}
                  height={150}
                  alt={`Filter preview: ${index}`}
                  className={filter.class}
                />
                <span className="text-base">{filter.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={() => router.push("/result")} className="mt-4">
        To destiny and beyond!💨
      </Button>
    </div>
  );
}
