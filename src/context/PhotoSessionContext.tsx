"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getFrame, getShotCount, type FrameLayout } from "@/constants/frames";
import {
  DEFAULT_FILTER,
  getFilter,
  type PhotoFilter,
} from "@/constants/filters";

export interface Shot {
  id: number;
  blob: Blob;
  /** Object URL for previews; revoked when the shot is removed or the session ends. */
  url: string;
}

/** One entry per shot position; `null` means not taken yet (or being retaken). */
type ShotSlots = (Shot | null)[];

interface PhotoSessionValue {
  frame: FrameLayout | null;
  shots: ShotSlots;
  filter: PhotoFilter;
  shotCount: number;
  /** Index the next capture fills, or -1 when every shot is taken. */
  nextShotIndex: number;
  isComplete: boolean;
  /** Selects a frame. Switching to a different frame discards existing shots. */
  startSession: (frameId: string) => void;
  addShot: (blob: Blob) => void;
  /** Clears a shot so the next capture retakes it in the same position. */
  removeShot: (id: number) => void;
  setFilter: (filterId: string) => void;
  reset: () => void;
}

const PhotoSessionContext = createContext<PhotoSessionValue | null>(null);

const revokeAll = (shots: ShotSlots) =>
  shots.forEach((shot) => shot && URL.revokeObjectURL(shot.url));

const emptySlots = (frameId: string): ShotSlots => {
  const frame = getFrame(frameId);
  return Array.from({ length: frame ? getShotCount(frame) : 0 }, () => null);
};

/**
 * Holds the in-progress booth session across the capture → adjust → result steps.
 * Lives in memory only: a hard refresh starts over, which keeps photos off disk.
 */
export function PhotoSessionProvider({ children }: { children: ReactNode }) {
  const [frameId, setFrameId] = useState<string | null>(null);
  const [shots, setShots] = useState<ShotSlots>([]);
  const [filterId, setFilterId] = useState(DEFAULT_FILTER.id);
  const nextId = useRef(0);

  // Mirror so callbacks and unmount cleanup can revoke URLs without stale state.
  const shotsRef = useRef(shots);
  shotsRef.current = shots;
  useEffect(() => () => revokeAll(shotsRef.current), []);

  const frame = frameId ? getFrame(frameId) ?? null : null;

  const reset = useCallback(() => {
    revokeAll(shotsRef.current);
    setShots([]);
    setFrameId(null);
    setFilterId(DEFAULT_FILTER.id);
  }, []);

  const startSession = useCallback(
    (id: string) => {
      if (id === frameId) return;
      revokeAll(shotsRef.current);
      setShots(emptySlots(id));
      setFilterId(DEFAULT_FILTER.id);
      setFrameId(id);
    },
    [frameId]
  );

  const addShot = useCallback((blob: Blob) => {
    setShots((prev) => {
      const index = prev.indexOf(null);
      if (index === -1) return prev;
      const next = [...prev];
      next[index] = { id: nextId.current++, blob, url: URL.createObjectURL(blob) };
      return next;
    });
  }, []);

  const removeShot = useCallback((id: number) => {
    const shot = shotsRef.current.find((s) => s?.id === id);
    if (shot) URL.revokeObjectURL(shot.url);
    setShots((prev) => prev.map((s) => (s?.id === id ? null : s)));
  }, []);

  const value = useMemo<PhotoSessionValue>(() => {
    const nextShotIndex = shots.indexOf(null);
    return {
      frame,
      shots,
      filter: getFilter(filterId),
      shotCount: shots.length,
      nextShotIndex,
      isComplete: shots.length > 0 && nextShotIndex === -1,
      startSession,
      addShot,
      removeShot,
      setFilter: setFilterId,
      reset,
    };
  }, [frame, shots, filterId, startSession, addShot, removeShot, reset]);

  return (
    <PhotoSessionContext.Provider value={value}>
      {children}
    </PhotoSessionContext.Provider>
  );
}

export function usePhotoSession() {
  const context = useContext(PhotoSessionContext);
  if (!context) {
    throw new Error("usePhotoSession must be used inside <PhotoSessionProvider>");
  }
  return context;
}

/** Narrows a completed session's slots to plain shots. */
export const takenShots = (shots: ShotSlots) =>
  shots.filter((shot): shot is Shot => shot !== null);
