import { type Drawing } from '../models/drawing';

export function createEmptyDrawing(id: string): Drawing {
  return {
    id,
    strokes: [],
  };
}
