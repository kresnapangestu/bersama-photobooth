interface PhotoPreviewProps {
  src: string;
  alt: string;
}

export const PhotoPreview = ({ src, alt }: PhotoPreviewProps) => {
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
