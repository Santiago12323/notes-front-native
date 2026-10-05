import { drawingTools, type DrawingTool } from '../models/drawing-tool';
import { BRUSH_OPACITY, PEN_OPACITY } from '../constants/style';

export interface StrokePaint {
  color: string;
  width: number;
  opacity: number;
  erases: boolean;
}

export function getStrokePaint(tool: DrawingTool, color: string, width: number): StrokePaint {
  if (tool === drawingTools.eraser) {
    return {
      color,
      width,
      opacity: PEN_OPACITY,
      erases: true,
    };
  }

  if (tool === drawingTools.brush) {
    return {
      color,
      width,
      opacity: BRUSH_OPACITY,
      erases: false,
    };
  }

  return {
    color,
    width,
    opacity: PEN_OPACITY,
    erases: false,
  };
}
