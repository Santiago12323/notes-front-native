import { type Stroke } from './stroke';

export const drawingOperationType = {
  addStroke: 'addStroke',
} as const;

export type DrawingOperation = {
  type: typeof drawingOperationType.addStroke;
  stroke: Stroke;
};
