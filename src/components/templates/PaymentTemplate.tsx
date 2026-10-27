import Image from "next/image";
import Link from "next/link";
import { Headline } from "../molecules/Headline";
import { Input } from "../atoms/Input";
import { ButtonLink } from "../atoms/Button";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

const MAGIC_KEY_LENGTH = 6;

export default function PaymentTemplate() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Headline
        caption="Make It Officially Magical"
        subcaption="Scan the QR code & sprinkle Rp 10.000 to complete the magic ritual and enter the realm of glittering memories — a world of frames, fun, and flair awaits 🌟"
      />
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/images/qris_logo.webp"
          width={250}
          height={120}
          alt="QRIS — QR Code Standar Pembayaran Nasional"
        />
        <p className="text-xl font-bold uppercase">{SITE.owner}</p>
        <Image
          src="/images/QRCODE.webp"
          width={300}
          height={120}
          alt={`QRIS payment code for ${SITE.owner}`}
          className="mt-[-30px]"
        />
      </div>
      <div className="flex flex-col gap-5 text-center">
        <p>
          Already paid but not redirected?{" "}
          <Link
            href={ROUTES.frameSelection}
            className="text-primaryDarker underline hover:text-primaryHover active:text-primaryActive"
          >
            Click here
          </Link>
        </p>
        <label htmlFor="magic-key">
          Or do you already have a magic key? Enter it below to ignite your
          moment!
        </label>
        <div className="flex gap-2 self-center">
          <Input
            id="magic-key"
            name="magicKey"
            maxInput={MAGIC_KEY_LENGTH}
            autoComplete="off"
          />
          <ButtonLink href={ROUTES.frameSelection}>Open the Portal!</ButtonLink>
        </div>
      </div>
    </div>
  );
}
