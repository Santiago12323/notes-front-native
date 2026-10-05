import { useCallback, useEffect, useRef, useState } from 'react';
import { useSharedValue, type SharedValue } from 'react-native-reanimated';

import { createId } from '@/utils/create-id';
import { DEFAULT_INK_COLOR, DEFAULT_STROKE_WIDTH, MIN_POINT_DISTANCE } from '../constants/style';
import { DEFAULT_ZOOM, type Viewport } from '@/hooks/use-viewport';
import { type Drawing } from '../models/drawing';
import { type DrawingHistory } from '../models/drawing-history';
import { drawingTools, type DrawingTool } from '../models/drawing-tool';
import { type Stroke } from '../models/stroke';
import {
  canRedo,
  canUndo,
  commitDrawingOperation,
  createDrawingHistory,
  redoDrawing,
  undoDrawing,
} from '../services/drawing-history';
import { createAddStrokeOperation } from '../services/drawing-operations';
import { appendStrokePoint, createStroke } from '../services/stroke-builder';
import { pointsToPathData } from '../utils/points-to-path-data';

interface DrawingStyle {
  tool: DrawingTool;
  color: string;
  width: number;
}

interface UseDrawingSessionResult {
  drawing: Drawing;
  activePathData: SharedValue<string>;
  tool: DrawingTool;
  color: string;
  width: number;
  canUndo: boolean;
  canRedo: boolean;
  setTool: (tool: DrawingTool) => void;
  setColor: (color: string) => void;
  setWidth: (width: number) => void;
  beginStroke: (x: number, y: number, scale: number) => void;
  appendPoint: (x: number, y: number, scale: number) => void;
  endStroke: () => void;
  undo: () => void;
  redo: () => void;
}

export function useDrawingSession(
  initialDrawing: Drawing,
  onDrawingChange: (drawing: Drawing) => void,
): UseDrawingSessionResult {
  const [drawing, setDrawing] = useState(initialDrawing);
  const [history, setHistory] = useState<DrawingHistory>(createDrawingHistory);
  const [style, setStyle] = useState<DrawingStyle>({
    tool: drawingTools.pen,
    color: DEFAULT_INK_COLOR,
    width: DEFAULT_STROKE_WIDTH,
  });
  const activeStrokeRef = useRef<Stroke | null>(null);
  const drawingRef = useRef(initialDrawing);
  const historyRef = useRef(createDrawingHistory());
  const styleRef = useRef(style);
  const onDrawingChangeRef = useRef(onDrawingChange);
  const activePathData = useSharedValue('');

  useEffect(() => {
    onDrawingChangeRef.current = onDrawingChange;
  }, [onDrawingChange]);

  const publish = useCallback((nextDrawing: Drawing, nextHistory: DrawingHistory) => {
    drawingRef.current = nextDrawing;
    historyRef.current = nextHistory;
    setDrawing(nextDrawing);
    setHistory(nextHistory);
    onDrawingChangeRef.current(nextDrawing);
  }, []);

  const setTool = useCallback((tool: DrawingTool) => {
    const nextStyle = { ...styleRef.current, tool };
    styleRef.current = nextStyle;
    setStyle(nextStyle);
  }, []);

  const setColor = useCallback((color: string) => {
    const nextStyle = { ...styleRef.current, color };
    styleRef.current = nextStyle;
    setStyle(nextStyle);
  }, []);

  const setWidth = useCallback((width: number) => {
    const nextStyle = { ...styleRef.current, width };
    styleRef.current = nextStyle;
    setStyle(nextStyle);
  }, []);

  function beginStroke(x: number, y: number, scale: number) {
    if (activeStrokeRef.current !== null) {
      return;
    }

    const currentStyle = styleRef.current;
    const stroke = createStroke(
      {
        id: createId(),
        color: currentStyle.color,
        width: currentStyle.width / scale,
        tool: currentStyle.tool,
      },
      { x, y },
    );

    activeStrokeRef.current = stroke;
    // eslint-disable-next-line react-hooks/immutability
    activePathData.value = pointsToPathData(stroke.points);
  }

  function appendPoint(x: number, y: number, scale: number) {
    const current = activeStrokeRef.current;

    if (current === null) {
      return;
    }

    const next = appendStrokePoint(current, { x, y }, MIN_POINT_DISTANCE / scale);

    if (next === current) {
      return;
    }

    activeStrokeRef.current = next;
    // eslint-disable-next-line react-hooks/immutability
    activePathData.value = pointsToPathData(next.points);
  }

  function endStroke() {
    const current = activeStrokeRef.current;
    activeStrokeRef.current = null;
    // eslint-disable-next-line react-hooks/immutability
    activePathData.value = '';

    if (current === null || current.points.length === 0) {
      return;
    }

    const result = commitDrawingOperation(
      drawingRef.current,
      historyRef.current,
      createAddStrokeOperation(current),
    );

    publish(result.drawing, result.history);
  }

  const undo = useCallback(() => {
    const result = undoDrawing(drawingRef.current, historyRef.current);
    publish(result.drawing, result.history);
  }, [publish]);

  const redo = useCallback(() => {
    const result = redoDrawing(drawingRef.current, historyRef.current);
    publish(result.drawing, result.history);
  }, [publish]);

  return {
    drawing,
    activePathData,
    tool: style.tool,
    color: style.color,
    width: style.width,
    canUndo: canUndo(history),
    canRedo: canRedo(history),
    setTool,
    setColor,
    setWidth,
    beginStroke,
    appendPoint,
    endStroke,
    undo,
    redo,
  };
}
