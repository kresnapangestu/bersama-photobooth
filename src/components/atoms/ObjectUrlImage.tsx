import type { ImgHTMLAttributes } from "react";

type ObjectUrlImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

/**
 * Renders client-generated `blob:` URLs. next/image can't optimize these and
 * would only add a wrapper, so a plain <img> is the right tool here.
 */
export const ObjectUrlImage = (props: ObjectUrlImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  <img {...props} />
);
