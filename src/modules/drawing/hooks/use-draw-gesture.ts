import { useMemo } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { SINGLE_POINTER_COUNT } from '../constants/style';

interface DrawGestureHandlers {
  onBegin: (x: number, y: number) => void;
  onChange: (x: number, y: number) => void;
  onEnd: () => void;
}

export function useDrawGesture({ onBegin, onChange, onEnd }: DrawGestureHandlers) {
  return useMemo(
    () =>
      Gesture.Pan()
        .minPointers(SINGLE_POINTER_COUNT)
        .maxPointers(SINGLE_POINTER_COUNT)
        .minDistance(0)
        .shouldCancelWhenOutside(false)
        .onBegin((event) => {
          runOnJS(onBegin)(event.x, event.y);
        })
        .onChange((event) => {
          runOnJS(onChange)(event.x, event.y);
        })
        .onFinalize(() => {
          runOnJS(onEnd)();
        }),
    [onBegin, onChange, onEnd],
  );
}
