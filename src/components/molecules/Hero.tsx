import { ButtonLink } from "../atoms/Button";

interface HeroProps {
  href: string;
}

export const Hero = ({ href }: HeroProps) => (
  <div className="flex flex-1 flex-col items-start gap-6">
    <p className="max-w-md min-w-[447px] text-xl">
      Snap, smile, repeat — anytime, anywhere let <b>Ber-sama</b> Photo Booth
      turn fleeting moments into lasting memories!
    </p>
    <ButtonLink href={href}>Snap It Now!</ButtonLink>
  </div>
);
