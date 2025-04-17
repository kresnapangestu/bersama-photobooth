import Link from "next/link";
import { Button } from "../atoms/Button";

export const Hero = () => {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <p className="text-xl max-w-md min-w-[447px]">
        Snap, smile, repeat — anytime, anywhere let <b>Ber-sama</b> Photo Booth
        turn fleeting moments into lasting memories!
      </p>
      <Link href="/frame-selection" passHref>
        <Button>Snap It Now!</Button>
      </Link>
    </div>
  );
};
