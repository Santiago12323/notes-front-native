export const drawingTools = {
  pen: 'pen',
  brush: 'brush',
  eraser: 'eraser',
} as const;

export type DrawingTool = (typeof drawingTools)[keyof typeof drawingTools];
