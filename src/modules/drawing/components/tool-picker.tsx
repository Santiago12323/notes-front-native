import { StyleSheet, View } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { useTranslation } from '@/i18n/i18n-provider';
import { type MessageKey } from '@/i18n/types';
import { useTheme } from '@/theme/theme-provider';
import { drawingTools, type DrawingTool } from '../models/drawing-tool';
import { ToolbarButton } from './toolbar-button';
import { type ToolbarPanel } from '../models/toolbar-panel';

const toolMessageKeys = {
  pen: 'drawing.pen',
  brush: 'drawing.brush',
  eraser: 'drawing.eraser',
} as const satisfies Record<DrawingTool, MessageKey>;

const toolIcons = {
  pen: 'pen',
  brush: 'brush',
  eraser: 'eraser',
} as const satisfies Record<DrawingTool, IconName>;

const tools: DrawingTool[] = [drawingTools.pen, drawingTools.brush, drawingTools.eraser];

interface ToolPickerProps {
  tool: DrawingTool;
  onToolChange: (tool: DrawingTool) => void;
  onTogglePanel: (panel: ToolbarPanel) => void;
}

export function ToolPicker({ tool, onToolChange }: ToolPickerProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      {tools.map((currentTool) => {
        const isSelected = currentTool === tool;

        return (
          <ToolbarButton
            key={currentTool}
            accessibilityLabel={t(toolMessageKeys[currentTool])}
            selected={isSelected}
            onPress={() => onToolChange(currentTool)}
          >
            <Icon
              name={toolIcons[currentTool]}
              color={isSelected ? colors.onAccent : colors.textPrimary}
            />
          </ToolbarButton>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
