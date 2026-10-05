import { type Point } from '../models/point';

export function distanceSquared(from: Point, to: Point): number {
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  return deltaX * deltaX + deltaY * deltaY;
}

export function shouldKeepPoint(
  previous: Point | undefined,
  next: Point,
  minDistance: number,
): boolean {
  if (previous === undefined) {
    return true;
  }

  return distanceSquared(previous, next) >= minDistance * minDistance;
}
