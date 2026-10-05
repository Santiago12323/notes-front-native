import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { useLayoutDensity } from '@/hooks/use-layout-density';
import { usePanAndPinchGestures } from '@/hooks/use-pan-and-pinch-gestures';
import { useViewport } from '@/hooks/use-viewport';
import { colors } from '@/theme/colors';
import { useDrawGesture } from '../hooks/use-draw-gesture';
import { useDrawingSession } from '../hooks/use-drawing-session';
import { type Drawing } from '../models/drawing';
import { type PaperBackground } from '../models/paper-background';
import { DrawingToolbar } from './drawing-toolbar';
import { SkiaDrawingRenderer } from './skia-drawing-renderer';
import { useState } from 'react';

interface DrawingCanvasProps {
  drawing: Drawing;
  paper: PaperBackground;
  onDrawingChange: (drawing: Drawing) => void;
  onPaperChange: (paper: PaperBackground) => void;
}

const initialCanvasSize = {
  width: 0,
  height: 0,
};

export function DrawingCanvas({
  drawing,
  paper,
  onDrawingChange,
  onPaperChange,
}: DrawingCanvasProps) {
  const { density } = useLayoutDensity();
  const { viewport, setPan, setScale, resetViewport } = useViewport();
  const session = useDrawingSession(drawing, onDrawingChange);
  const drawGesture = useDrawGesture({
    onBegin: (x, y) => session.beginStroke(x, y, viewport.scale),
    onChange: (x, y) => session.appendPoint(x, y, viewport.scale),
    onEnd: session.endStroke,
  });
  const panAndPinchGesture = usePanAndPinchGestures({
    onPan: setPan,
    onScale: setScale,
    onBegin: session.endStroke,
    onEnd: session.endStroke,
  });
  const [canvasSize, setCanvasSize] = useState(initialCanvasSize);

  function handleCanvasLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;

    setCanvasSize((current) =>
      current.width === width && current.height === height ? current : { width, height },
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.workspace}>
        <GestureDetector gesture={Gesture.Exclusive(drawGesture, panAndPinchGesture())}>
          <View style={styles.canvasHost} collapsable={false} onLayout={handleCanvasLayout}>
            <SkiaDrawingRenderer
              drawing={session.drawing}
              paper={paper}
              width={canvasSize.width}
              height={canvasSize.height}
              activePathData={session.activePathData}
              activeColor={session.color}
              activeWidth={session.width}
              activeTool={session.tool}
              scale={viewport.scale}
              x={viewport.x}
              y={viewport.y}
            />
          </View>
        </GestureDetector>
      </View>
      <DrawingToolbar
        density={density}
        tool={session.tool}
        color={session.color}
        width={session.width}
        paper={paper}
        canUndo={session.canUndo}
        canRedo={session.canRedo}
        onToolChange={session.setTool}
        onColorChange={session.setColor}
        onWidthChange={session.setWidth}
        onPaperChange={onPaperChange}
        onUndo={session.undo}
        onRedo={session.redo}
        onZoomIn={() => setScale(viewport.scale + 0.2)}
        onZoomOut={() => setScale(viewport.scale - 0.2)}
        onZoomReset={resetViewport}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
    backgroundColor: colors.surface,
  },
  workspace: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
  },
  canvasHost: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    backgroundColor: colors.surface,
  },
});
