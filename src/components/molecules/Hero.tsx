import { ButtonLink } from "../atoms/Button";

interface HeroProps {
  href: string;
}

export const Hero = ({ href }: HeroProps) => (
  <div className="flex flex-col items-start gap-[clamp(1rem,3dvh,1.5rem)]">
    <p className="max-w-md text-lg text-pretty sm:text-xl short:text-base">
      Snap, smile, repeat — anytime, anywhere let <b>Ber-sama</b> Photo Booth
      turn fleeting moments into lasting memories!
    </p>
    <ButtonLink href={href}>Snap It Now!</ButtonLink>
  </div>
);
