"use client";

import { useEffect, useRef, useState } from "react";

const TICK_MS = 1000;

/** Counts down once per second and calls `onComplete` when it reaches zero. */
export function useCountdown(onComplete: () => void) {
  const [remaining, setRemaining] = useState<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (remaining === null) return;
    if (remaining === 0) {
      setRemaining(null);
      onCompleteRef.current();
      return;
    }
    const timer = setTimeout(() => setRemaining(remaining - 1), TICK_MS);
    return () => clearTimeout(timer);
  }, [remaining]);

  return {
    remaining,
    isRunning: remaining !== null,
    start: (seconds: number) => setRemaining(seconds),
  };
}
