// components/atoms/FrameSelector.tsx
interface HeadlineProps {
  caption: string;
  subcaption?: string;
}

export const Headline = ({ caption, subcaption }: HeadlineProps) => {
  return (
    <div className="flex flex-col items-center justify-evenly gap-4 text-center">
      <span className="text-xl font-bold">{caption}</span>
      <span className="text-base font-regular w-2/3">{subcaption}</span>
    </div>
  );
};
