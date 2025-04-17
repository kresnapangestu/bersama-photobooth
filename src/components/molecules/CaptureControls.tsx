interface CaptureControlsProps {
  onStart: () => void;
  onStop: () => void;
  disabled: boolean;
}

export const CaptureControls = ({
  onStart,
  onStop,
  disabled,
}: CaptureControlsProps) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={onStart}
        disabled={disabled}
        className={`px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition ${
          disabled ? "cursor-not-allowed bg-gray-400" : ""
        }`}
      >
        Start Capture
      </button>
      <button
        onClick={onStop}
        disabled={disabled}
        className={`px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition ${
          disabled ? "cursor-not-allowed bg-gray-400" : ""
        }`}
      >
        Stop Capture
      </button>
    </div>
  );
};
