import { Canvas, Group } from '@shopify/react-native-skia';
import { StyleSheet } from 'react-native';
import { type SharedValue } from 'react-native-reanimated';

import { useTheme } from '@/theme/theme-provider';
import { type Drawing } from '../models/drawing';
import { type DrawingTool } from '../models/drawing-tool';
import { type PaperBackground } from '../models/paper-background';
import { pointsToPathData } from '../utils/points-to-path-data';
import { PaperLayer } from './paper-layer';
import { StrokePath } from './stroke-path';

interface SkiaDrawingRendererProps {
  drawing: Drawing;
  paper: PaperBackground;
  width: number;
  height: number;
  activePathData: SharedValue<string>;
  activeColor: string;
  activeWidth: number;
  activeTool: DrawingTool;
  scale: number;
  x: number;
  y: number;
}

export function SkiaDrawingRenderer({
  drawing,
  paper,
  width,
  height,
  activePathData,
  activeColor,
  activeWidth,
  activeTool,
  scale,
  x,
  y,
}: SkiaDrawingRendererProps) {
  const { colors } = useTheme();

  return (
    <Canvas pointerEvents="none" style={styles.canvas}>
      <Group transform={[{ scale }, { translateX: x }, { translateY: y }]}>
        <PaperLayer
          paper={paper}
          width={width}
          height={height}
          x={x}
          y={y}
          scale={scale}
          surfaceColor={colors.surface}
          patternColor={colors.paperPattern}
        />
        <Group layer>
          {drawing.strokes.map((stroke) => (
            <StrokePath
              key={stroke.id}
              path={pointsToPathData(stroke.points)}
              color={stroke.color}
              width={stroke.width}
              tool={stroke.tool}
            />
          ))}
          <StrokePath
            path={activePathData}
            color={activeColor}
            width={activeWidth}
            tool={activeTool}
          />
        </Group>
      </Group>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});