import { type Drawing } from '../models/drawing';
import { type DrawingHistory } from '../models/drawing-history';
import { type DrawingOperation } from '../models/drawing-operation';
import { applyDrawingOperation, revertDrawingOperation } from './drawing-operations';

export function createDrawingHistory(): DrawingHistory {
  return {
    undoStack: [],
    redoStack: [],
  };
}

export function commitDrawingOperation(
  drawing: Drawing,
  history: DrawingHistory,
  operation: DrawingOperation,
): { drawing: Drawing; history: DrawingHistory } {
  return {
    drawing: applyDrawingOperation(drawing, operation),
    history: {
      undoStack: [...history.undoStack, operation],
      redoStack: [],
    },
  };
}

export function undoDrawing(
  drawing: Drawing,
  history: DrawingHistory,
): { drawing: Drawing; history: DrawingHistory } {
  const operation = history.undoStack[history.undoStack.length - 1];

  if (operation === undefined) {
    return { drawing, history };
  }

  return {
    drawing: revertDrawingOperation(drawing, operation),
    history: {
      undoStack: history.undoStack.slice(0, -1),
      redoStack: [...history.redoStack, operation],
    },
  };
}

export function redoDrawing(
  drawing: Drawing,
  history: DrawingHistory,
): { drawing: Drawing; history: DrawingHistory } {
  const operation = history.redoStack[history.redoStack.length - 1];

  if (operation === undefined) {
    return { drawing, history };
  }

  return {
    drawing: applyDrawingOperation(drawing, operation),
    history: {
      undoStack: [...history.undoStack, operation],
      redoStack: history.redoStack.slice(0, -1),
    },
  };
}

export function canUndo(history: DrawingHistory): boolean {
  return history.undoStack.length > 0;
}

export function canRedo(history: DrawingHistory): boolean {
  return history.redoStack.length > 0;
}
