import { paperSpacings } from '../constants/style';
import { paperBackgrounds, type PaperBackground } from '../models/paper-background';
import { type Point } from '../models/point';

export type PaperMarks =
  { type: 'blank' } | { type: 'path'; data: string } | { type: 'dots'; points: readonly Point[] };

export interface PaperBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const ALIGNMENT_TOLERANCE = 1e-6;

export function visiblePaperBounds(
  width: number,
  height: number,
  x: number,
  y: number,
  scale: number,
): PaperBounds {
  if (width <= 0 || height <= 0 || scale <= 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }

  const minX = -x / scale;
  const minY = -y / scale;

  return {
    minX: minX === 0 ? 0 : minX,
    minY: minY === 0 ? 0 : minY,
    maxX: width / scale - x,
    maxY: height / scale - y,
  };
}

export function createAlignedStops(min: number, max: number, spacing: number): number[] {
  if (spacing <= 0 || max < min) {
    return [];
  }

  const tolerance = spacing * ALIGNMENT_TOLERANCE;
  const startIndex = Math.ceil((min - tolerance) / spacing);
  const endIndex = Math.floor((max + tolerance) / spacing);
  const stops: number[] = [];

  for (let index = startIndex; index <= endIndex; index += 1) {
    stops.push(index * spacing);
  }

  return stops;
}

export function createPaperStops(length: number, spacing: number): number[] {
  if (spacing <= 0 || length <= 0) {
    return [];
  }

  const stops: number[] = [];

  for (let value = spacing; value < length; value += spacing) {
    stops.push(value);
  }

  return stops;
}

function createAxisPath(
  stops: readonly number[],
  start: number,
  end: number,
  orientation: 'horizontal' | 'vertical',
): string {
  return stops
    .map((stop) =>
      orientation === 'horizontal'
        ? `M${start} ${stop} L${end} ${stop}`
        : `M${stop} ${start} L${stop} ${end}`,
    )
    .join(' ');
}

export function createGridMarks(bounds: PaperBounds, spacing: number): PaperMarks {
  const width = bounds.maxX - bounds.minX;
  const height = bounds.maxY - bounds.minY;

  if (spacing <= 0 || width <= 0 || height <= 0) {
    return { type: 'blank' };
  }

  const horizontal = createAxisPath(
    createAlignedStops(bounds.minY, bounds.maxY, spacing),
    bounds.minX,
    bounds.maxX,
    'horizontal',
  );
  const vertical = createAxisPath(
    createAlignedStops(bounds.minX, bounds.maxX, spacing),
    bounds.minY,
    bounds.maxY,
    'vertical',
  );
  const data = [horizontal, vertical].filter((segment) => segment.length > 0).join(' ');

  if (data.length === 0) {
    return { type: 'blank' };
  }

  return { type: 'path', data };
}

export function createPaperMarks(
  paper: PaperBackground,
  width: number,
  height: number,
): PaperMarks {
  if (paper === paperBackgrounds.blank || width <= 0 || height <= 0) {
    return { type: 'blank' };
  }

  const spacing = paperSpacings[paper];
  const xStops = createPaperStops(width, spacing);
  const yStops = createPaperStops(height, spacing);

  if (paper === paperBackgrounds.dotted) {
    const points: Point[] = [];

    for (const y of yStops) {
      for (const x of xStops) {
        points.push({ x, y });
      }
    }

    return { type: 'dots', points };
  }

  const horizontal = createAxisPath(yStops, 0, width, 'horizontal');

  if (paper === paperBackgrounds.lined) {
    return { type: 'path', data: horizontal };
  }

  const vertical = createAxisPath(xStops, 0, height, 'vertical');
  const data = [horizontal, vertical].filter((segment) => segment.length > 0).join(' ');

  return { type: 'path', data };
}
