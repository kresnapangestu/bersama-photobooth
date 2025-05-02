"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { Headline } from "../molecules/Headline";
import Image from "next/image";

export default function ResultTemplate() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="p-6 flex flex-col items-center gap-6 text-center">
      <Headline
        caption="✨ With a sprinkle of stardust… voilà!"
        subcaption="And Ta-da!—the magic’s done! No doubt—this result is pure magic! Tag Ber-sama whenever this magic touches the social media timeline!
        Thank you very much for using our service! 🎀🫶🏻💓"
      />
      <Image
        src={`/frames/frame1.png`}
        width={300}
        height={200}
        alt={`result`}
        className="shadow-lg"
      />
      <div className="flex gap-10">
        <Button
          onClick={() => router.push("/result")}
          className="mt-4"
          type="Secondary"
        >
          Download Result!🔮
        </Button>
        <Button
          onClick={() => router.push("/result")}
          className="mt-4"
          type="Secondary"
        >
          Download GIF! 🎞️
        </Button>
        <Button
          onClick={() => router.push("/result")}
          className="mt-4"
          type="Secondary"
        >
          Download Picture! 🖼️
        </Button>
      </div>
      <Button onClick={() => router.push("/payment-section")} className="mt-4">
        Add another sparkle to your gallery! 📸
      </Button>
    </div>
  );
}
