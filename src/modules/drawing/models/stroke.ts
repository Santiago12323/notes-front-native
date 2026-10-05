import { type DrawingTool } from './drawing-tool';
import { type Point } from './point';

export interface Stroke {
  id: string;
  points: readonly Point[];
  color: string;
  width: number;
  tool: DrawingTool;
}
