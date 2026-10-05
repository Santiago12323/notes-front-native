import { type Drawing } from '../models/drawing';
import { drawingOperationType, type DrawingOperation } from '../models/drawing-operation';
import { type Stroke } from '../models/stroke';

export function applyDrawingOperation(drawing: Drawing, operation: DrawingOperation): Drawing {
  if (operation.type === drawingOperationType.addStroke) {
    return {
      ...drawing,
      strokes: [...drawing.strokes, operation.stroke],
    };
  }

  return drawing;
}

export function revertDrawingOperation(drawing: Drawing, operation: DrawingOperation): Drawing {
  if (operation.type === drawingOperationType.addStroke) {
    return {
      ...drawing,
      strokes: drawing.strokes.filter((stroke) => stroke.id !== operation.stroke.id),
    };
  }

  return drawing;
}

export function createAddStrokeOperation(stroke: Stroke): DrawingOperation {
  return {
    type: drawingOperationType.addStroke,
    stroke,
  };
}
