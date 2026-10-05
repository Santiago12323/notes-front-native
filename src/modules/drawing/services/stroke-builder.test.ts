import { describe, expect, it } from '@jest/globals';

import { drawingTools } from '../models/drawing-tool';
import { appendStrokePoint, createStroke } from './stroke-builder';

const draft = {
  id: 'stroke-1',
  color: '#1F1A16',
  width: 5,
  tool: drawingTools.pen,
};

describe('createStroke', () => {
  it('starts a stroke with the first point', () => {
    expect(createStroke(draft, { x: 1, y: 2 })).toEqual({
      id: 'stroke-1',
      color: '#1F1A16',
      width: 5,
      tool: drawingTools.pen,
      points: [{ x: 1, y: 2 }],
    });
  });
});

describe('appendStrokePoint', () => {
  it('appends a point beyond the minimum distance', () => {
    const stroke = createStroke(draft, { x: 0, y: 0 });
    const next = appendStrokePoint(stroke, { x: 4, y: 0 }, 2);

    expect(next.points).toEqual([
      { x: 0, y: 0 },
      { x: 4, y: 0 },
    ]);
  });

  it('does not append a point that is too close', () => {
    const stroke = createStroke(draft, { x: 0, y: 0 });
    const next = appendStrokePoint(stroke, { x: 1, y: 0 }, 2);

    expect(next).toBe(stroke);
  });
});
