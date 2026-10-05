import { useCallback, useState } from 'react';

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 3;
export const DEFAULT_ZOOM = 1;

export interface Viewport {
  x: number;
  y: number;
  scale: number;
}

export const DEFAULT_VIEWPORT: Viewport = {
  x: 0,
  y: 0,
  scale: DEFAULT_ZOOM,
};

interface UseViewportResult {
  viewport: Viewport;
  setViewport: (viewport: Viewport) => void;
  setPan: (x: number, y: number) => void;
  setScale: (scale: number) => void;
  resetViewport: () => void;
}

export function useViewport(): UseViewportResult {
  const [viewport, setViewport] = useState<Viewport>(DEFAULT_VIEWPORT);

  const setPan = useCallback((x: number, y: number) => {
    setViewport((current) => ({
      ...current,
      x,
      y,
    }));
  }, []);

  const setScale = useCallback((scale: number) => {
    setViewport((current) => ({
      ...current,
      scale: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale)),
    }));
  }, []);

  const resetViewport = useCallback(() => {
    setViewport(DEFAULT_VIEWPORT);
  }, []);

  return {
    viewport,
    setViewport,
    setPan,
    setScale,
    resetViewport,
  };
}