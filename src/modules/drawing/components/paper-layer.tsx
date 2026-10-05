import { Group, Path, Points, Rect, vec } from '@shopify/react-native-skia';

import { borders } from '@/theme/borders';
import { paperSpacings } from '../constants/style';
import { paperBackgrounds, type PaperBackground } from '../models/paper-background';
import { createGridMarks, createPaperMarks, visiblePaperBounds } from '../utils/paper-marks';

interface PaperLayerProps {
  paper: PaperBackground;
  width: number;
  height: number;
  x: number;
  y: number;
  scale: number;
  surfaceColor: string;
  patternColor: string;
}

export function PaperLayer({
  paper,
  width,
  height,
  x,
  y,
  scale,
  surfaceColor,
  patternColor,
}: PaperLayerProps) {
  const isGrid = paper === paperBackgrounds.grid;
  const bounds = visiblePaperBounds(width, height, x, y, scale);
  const marks = isGrid
    ? createGridMarks(bounds, paperSpacings.grid)
    : createPaperMarks(paper, width, height);
  const surfaceX = isGrid ? bounds.minX : 0;
  const surfaceY = isGrid ? bounds.minY : 0;
  const surfaceWidth = isGrid ? Math.max(0, bounds.maxX - bounds.minX) : width;
  const surfaceHeight = isGrid ? Math.max(0, bounds.maxY - bounds.minY) : height;

  return (
    <Group>
      <Rect
        x={surfaceX}
        y={surfaceY}
        width={surfaceWidth}
        height={surfaceHeight}
        color={surfaceColor}
      />
      {marks.type === 'path' ? (
        <Path
          path={marks.data}
          color={patternColor}
          style="stroke"
          strokeWidth={borders.width.thin}
        />
      ) : null}
      {marks.type === 'dots' ? (
        <Points
          points={marks.points.map((point) => vec(point.x, point.y))}
          mode="points"
          color={patternColor}
          strokeWidth={borders.width.thick}
        />
      ) : null}
    </Group>
  );
}
