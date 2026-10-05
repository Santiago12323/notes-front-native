import { describe, expect, it } from '@jest/globals';

import { drawingTools } from '../models/drawing-tool';
import { BRUSH_OPACITY, PEN_OPACITY } from '../constants/style';
import { getStrokePaint } from './stroke-paint';

describe('getStrokePaint', () => {
  it('marks eraser strokes as erasing', () => {
    expect(getStrokePaint(drawingTools.eraser, '#000000', 12)).toEqual({
      color: '#000000',
      width: 12,
      opacity: PEN_OPACITY,
      erases: true,
    });
  });

  it('applies brush opacity', () => {
    expect(getStrokePaint(drawingTools.brush, '#1F1A16', 5).opacity).toBe(BRUSH_OPACITY);
  });

  it('keeps pen strokes fully opaque', () => {
    expect(getStrokePaint(drawingTools.pen, '#1F1A16', 5).erases).toBe(false);
    expect(getStrokePaint(drawingTools.pen, '#1F1A16', 5).opacity).toBe(PEN_OPACITY);
  });
});
