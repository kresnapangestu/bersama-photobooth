"use client";
import { useRouter } from "next/navigation";
import { Headline } from "../molecules/Headline";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";

export default function PaymentTemplate() {
  const router = useRouter();

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <Headline
        caption="Make It Officially Magical"
        subcaption="Scan the QR code & sprinkle Rp 10.000 to 
 complete the magic ritual and enter the realm of glittering memories — a world of frames, fun, and flair awaits 🌟"
      />
      <div className="flex flex-col gap-5 items-center">
        <Image
          src={`/images/qris_logo.webp`}
          width={250}
          height={120}
          alt={`QRIS Logo`}
        />
        <span className="text-xl font-bold">SAMA BANDUNG</span>
        <Image
          src={`/images/QRCODE.webp`}
          width={300}
          height={120}
          alt={`QRIS CODE`}
          className="mt-[-30px]"
        />
      </div>
      <div className="flex gap-5 flex-col text-center">
        <span className="text-base">
          Already paid but not redirected ?{" "}
          <Link
            href={"/frame-selection"}
            passHref
            className="underline text-primaryDarker hover:text-primaryHover active:text-primaryActive"
          >
            click here
          </Link>
        </span>
        <span className="text-base">
          Or are you already have a magic key? Enter it below to ignite your
          moment!
        </span>
        <div className="flex gap-2 self-center">
          <Input maxInput={6} />
          <Link href={"/frame-selection"} passHref>
            <Button>Open the Portal!</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
