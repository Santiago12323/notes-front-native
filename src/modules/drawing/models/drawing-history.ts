import { type DrawingOperation } from './drawing-operation';

export interface DrawingHistory {
  undoStack: readonly DrawingOperation[];
  redoStack: readonly DrawingOperation[];
}
