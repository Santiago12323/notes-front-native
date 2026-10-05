import { type DrawingTool } from '../models/drawing-tool';
import { type Point } from '../models/point';
import { type Stroke } from '../models/stroke';
import { shouldKeepPoint } from '../utils/point-distance';

export interface StrokeDraft {
  id: string;
  color: string;
  width: number;
  tool: DrawingTool;
}

export function createStroke(draft: StrokeDraft, start: Point): Stroke {
  return {
    id: draft.id,
    color: draft.color,
    width: draft.width,
    tool: draft.tool,
    points: [start],
  };
}

export function appendStrokePoint(stroke: Stroke, point: Point, minDistance: number): Stroke {
  const previous = stroke.points[stroke.points.length - 1];

  if (!shouldKeepPoint(previous, point, minDistance)) {
    return stroke;
  }

  return {
    ...stroke,
    points: [...stroke.points, point],
  };
}
