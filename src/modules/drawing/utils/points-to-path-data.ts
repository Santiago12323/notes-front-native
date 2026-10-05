import { type Point } from '../models/point';

export function pointsToPathData(points: readonly Point[]): string {
  const first = points[0];

  if (first === undefined) {
    return '';
  }

  let data = `M${first.x} ${first.y}`;

  if (points.length === 1) {
    return `${data} L${first.x} ${first.y}`;
  }

  for (let index = 1; index < points.length; index += 1) {
    const point = points[index];

    if (point !== undefined) {
      data += ` L${point.x} ${point.y}`;
    }
  }

  return data;
}
