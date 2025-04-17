// components/atoms/Timer.tsx

import React from "react";

interface TimerProps {
  countdown: number | null;
}

export const Timer = ({ countdown }: TimerProps) => {
  return (
    <div className="text-4xl font-bold text-red-500">
      {countdown !== null ? countdown : "Ready!"}
    </div>
  );
};
