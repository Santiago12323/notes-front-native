import { Path } from '@shopify/react-native-skia';
import { type SharedValue } from 'react-native-reanimated';

import { type DrawingTool } from '../models/drawing-tool';
import { getStrokePaint } from '../utils/stroke-paint';

interface StrokePathProps {
  path: string | SharedValue<string>;
  color: string;
  width: number;
  tool: DrawingTool;
}

export function StrokePath({ path, color, width, tool }: StrokePathProps) {
  const paint = getStrokePaint(tool, color, width);

  return (
    <Path
      path={path}
      color={paint.color}
      style="stroke"
      strokeWidth={paint.width}
      strokeCap="round"
      strokeJoin="round"
      opacity={paint.opacity}
      blendMode={paint.erases ? 'clear' : 'srcOver'}
    />
  );
}
