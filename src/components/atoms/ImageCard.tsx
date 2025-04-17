import Image from "next/image";
import React from "react";

interface ImageCardProps {
  src: string;
  alt: string;
}

export const ImageCard = ({ src, alt }: ImageCardProps) => {
  return (
    <div className="w-full max-w-xs p-4 bg-white shadow-md rounded-lg">
      <Image
        src={src}
        fill={true}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};
