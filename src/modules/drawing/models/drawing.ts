import { type Stroke } from './stroke';

export interface Drawing {
  id: string;
  strokes: readonly Stroke[];
}
