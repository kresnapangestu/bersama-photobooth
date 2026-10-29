import Image from "next/image";
import Link from "next/link";
import { Headline } from "../molecules/Headline";
import { Input } from "../atoms/Input";
import { ButtonLink } from "../atoms/Button";
import { AspectFit } from "../atoms/AspectFit";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

const MAGIC_KEY_LENGTH = 6;
const QR_RATIO = 560 / 578;

export default function PaymentTemplate() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center gap-flow">
      <Headline
        caption="Make It Officially Magical"
        subcaption="Scan the QR code & sprinkle Rp 10.000 to complete the magic ritual and enter the realm of glittering memories — a world of frames, fun, and flair awaits 🌟"
      />
      {/* Stacked: QRIS brand, QR, instructions. wide: QR | brand + instructions;
          the side column is `contents` when stacked so the QR can sit in between. */}
      <div className="flex min-h-0 w-full max-w-4xl flex-1 flex-col items-center gap-flow wide:grid wide:grid-cols-2 wide:grid-rows-[minmax(0,1fr)] wide:gap-x-12">
        <AspectFit
          ratio={QR_RATIO}
          mobileHeight="45svh"
          maxWidth="22rem"
          className="order-2 wide:order-first wide:h-full wide:justify-end"
        >
          <Image
            src="/images/QRCODE.webp"
            fill
            sizes="22rem"
            alt={`QRIS payment code for ${SITE.owner}`}
            className="object-contain"
          />
        </AspectFit>
        <div className="contents wide:flex wide:flex-col wide:justify-center wide:gap-6 short:gap-3">
          <div className="order-1 flex shrink-0 flex-col items-center gap-2 wide:items-start">
            <Image
              src="/images/qris_logo.webp"
              width={400}
              height={64}
              alt="QRIS — QR Code Standar Pembayaran Nasional"
              className="h-auto w-[clamp(8rem,14vw,12rem)] short:w-28"
            />
            <p className="text-lg font-bold uppercase short:text-base">{SITE.owner}</p>
          </div>
          <div className="order-3 flex max-w-sm shrink-0 flex-col gap-4 text-center wide:text-left short:gap-2 short:text-sm">
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
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="magic-key"
                name="magicKey"
                maxInput={MAGIC_KEY_LENGTH}
                autoComplete="off"
                className="flex-1"
              />
              <ButtonLink href={ROUTES.frameSelection} className="shrink-0 text-center">
                Open the Portal!
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
