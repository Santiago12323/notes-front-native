import { useCallback } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

import { type Point } from '@/types/point';

export interface PanAndPinchHandlers {
  onPan: (x: number, y: number) => void;
  onScale: (scale: number) => void;
  onBegin: () => void;
  onEnd: () => void;
}

export function usePanAndPinchGestures({
  onPan,
  onScale,
  onBegin,
  onEnd,
}: PanAndPinchHandlers) {
  const panOffset = useSharedValue<Point>({ x: 0, y: 0 });
  const scaleOffset = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .onStart(() => {
      runOnJS(onBegin)();
    })
    .onUpdate((event) => {
      // These values are relative to the start of the gesture
      const newX = panOffset.value.x + event.translationX;
      const newY = panOffset.value.y + event.translationY;
      runOnJS(onPan)(newX, newY);
    })
    .onEnd((event) => {
      // Update the base offset for future gestures
      panOffset.value = {
        x: panOffset.value.x + event.translationX,
        y: panOffset.value.y + event.translationY,
      };
      runOnJS(onEnd)();
    });

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      runOnJS(onBegin)();
    })
    .onUpdate((event) => {
      // These values are relative to the start of the gesture
      const newScale = scaleOffset.value * event.scale;
      runOnJS(onScale)(newScale);
    })
    .onEnd((event) => {
      // Update the base offset for future gestures
      scaleOffset.value = scaleOffset.value * event.scale;
      runOnJS(onEnd)();
    });

  return useCallback(() => Gesture.Simultaneous(panGesture, pinchGesture), [
    panGesture,
    pinchGesture,
  ]);
}
