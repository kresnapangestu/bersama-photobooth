import Image from "next/image";

export interface DecorativeImageProps {
  src: string;
  width: number;
  height: number;
  className?: string;
}

/** Background ornament: hidden from screen readers and image search. */
export const DecorativeImage = (props: DecorativeImageProps) => (
  <Image alt="" aria-hidden="true" {...props} />
);
