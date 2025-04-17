import React from "react";

interface ImageCardProps {
  src: string;
  alt: string;
}

export const ImageCard = ({ src, alt }: ImageCardProps) => {
  return (
    <div className="w-full max-w-xs p-4 bg-white shadow-md rounded-lg">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};
