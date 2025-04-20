import Link from "next/link";
import { Button } from "../atoms/Button";

interface HeroProps {
  url?: string;
}

export const Hero = ({ url }: HeroProps) => {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <p className="text-xl max-w-md min-w-[447px]">
        Snap, smile, repeat — anytime, anywhere let <b>Ber-sama</b> Photo Booth
        turn fleeting moments into lasting memories!
      </p>
      <Link href={url || "#"} passHref>
        <Button>Snap It Now!</Button>
      </Link>
    </div>
  );
};
