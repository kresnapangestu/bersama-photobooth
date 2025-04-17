// components/atoms/FrameSelector.tsx
interface FrameSelectorProps {
  frames: string[];
  onSelect: (frame: string) => void;
}

export const FrameSelector = ({ frames, onSelect }: FrameSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {frames.map((frame, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => onSelect(frame)}
        >
          <img
            src={`/frames/${frame}`}
            alt={`Frame${index + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}
    </div>
  );
};
