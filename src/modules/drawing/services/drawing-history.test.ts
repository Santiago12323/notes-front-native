import { describe, expect, it } from '@jest/globals';

import { drawingTools } from '../models/drawing-tool';
import { type Stroke } from '../models/stroke';
import { createEmptyDrawing } from './create-empty-drawing';
import { createAddStrokeOperation } from './drawing-operations';
import {
  canRedo,
  canUndo,
  commitDrawingOperation,
  createDrawingHistory,
  redoDrawing,
  undoDrawing,
} from './drawing-history';

function stroke(id: string): Stroke {
  return {
    id,
    color: '#1F1A16',
    width: 5,
    tool: drawingTools.pen,
    points: [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
    ],
  };
}

describe('drawing history', () => {
  it('commits a stroke and supports undo and redo', () => {
    const first = commitDrawingOperation(
      createEmptyDrawing('drawing-1'),
      createDrawingHistory(),
      createAddStrokeOperation(stroke('stroke-1')),
    );

    expect(first.drawing.strokes).toHaveLength(1);
    expect(canUndo(first.history)).toBe(true);
    expect(canRedo(first.history)).toBe(false);

    const undone = undoDrawing(first.drawing, first.history);

    expect(undone.drawing.strokes).toHaveLength(0);
    expect(canUndo(undone.history)).toBe(false);
    expect(canRedo(undone.history)).toBe(true);

    const redone = redoDrawing(undone.drawing, undone.history);

    expect(redone.drawing.strokes[0]?.id).toBe('stroke-1');
    expect(canRedo(redone.history)).toBe(false);
  });

  it('clears redo when a new stroke is committed', () => {
    const first = commitDrawingOperation(
      createEmptyDrawing('drawing-1'),
      createDrawingHistory(),
      createAddStrokeOperation(stroke('stroke-1')),
    );
    const undone = undoDrawing(first.drawing, first.history);
    const second = commitDrawingOperation(
      undone.drawing,
      undone.history,
      createAddStrokeOperation(stroke('stroke-2')),
    );

    expect(second.drawing.strokes.map((item) => item.id)).toEqual(['stroke-2']);
    expect(canRedo(second.history)).toBe(false);
  });

  it('does nothing when undo and redo stacks are empty', () => {
    const drawing = createEmptyDrawing('drawing-1');
    const history = createDrawingHistory();

    expect(undoDrawing(drawing, history)).toEqual({ drawing, history });
    expect(redoDrawing(drawing, history)).toEqual({ drawing, history });
  });
});
