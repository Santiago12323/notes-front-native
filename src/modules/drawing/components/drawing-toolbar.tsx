import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '@/i18n/i18n-provider';

import { Icon } from '@/components/icon';
import { layoutDensities, type LayoutDensity } from '@/constants/layout';
import { borders } from '@/theme/borders';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';
import {
  TOOLBAR_GAP_COMPACT,
  TOOLBAR_GAP_REGULAR,
  TOOLBAR_INSET,
  TOOLBAR_PADDING_COMPACT,
  TOOLBAR_PADDING_REGULAR,
} from '../constants/layout';
import { type DrawingTool } from '../models/drawing-tool';
import { type PaperBackground } from '../models/paper-background';
import { toolbarPanels, type ToolbarPanel } from '../models/toolbar-panel';
import { ColorPalette, ColorPicker } from './color-picker';
import { HistoryControls } from './history-controls';
import { PaperPalette, PaperPicker } from './paper-picker';
import { StrokeWidthPalette, StrokeWidthPicker } from './stroke-width-picker';
import { ToolPicker } from './tool-picker';
import { ToolbarButton } from './toolbar-button';
import { ToolbarSeparator } from './toolbar-separator';

interface DrawingToolbarProps {
  density: LayoutDensity;
  tool: DrawingTool;
  color: string;
  width: number;
  paper: PaperBackground;
  canUndo: boolean;
  canRedo: boolean;
  onToolChange: (tool: DrawingTool) => void;
  onColorChange: (color: string) => void;
  onWidthChange: (width: number) => void;
  onPaperChange: (paper: PaperBackground) => void;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

export function DrawingToolbar({
  density,
  tool,
  color,
  width,
  paper,
  canUndo,
  canRedo,
  onToolChange,
  onColorChange,
  onWidthChange,
  onPaperChange,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onZoomReset,
}: DrawingToolbarProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const isCompact = density === layoutDensities.compact;
  const [openPanel, setOpenPanel] = useState<ToolbarPanel | null>(null);

  function togglePanel(panel: ToolbarPanel) {
    setOpenPanel((current) => (current === panel ? null : panel));
  }

  function closePanel() {
    setOpenPanel(null);
  }

  const buttons = (
    <>
      <ToolPicker tool={tool} onToolChange={onToolChange} onTogglePanel={togglePanel} />
      <ColorPicker color={color} onColorChange={onColorChange} onTogglePanel={togglePanel} />
      <StrokeWidthPicker
        width={width}
        onWidthChange={onWidthChange}
        onTogglePanel={togglePanel}
      />
      <PaperPicker paper={paper} onPaperChange={onPaperChange} onTogglePanel={togglePanel} />
      <ToolbarSeparator />
      <HistoryControls canUndo={canUndo} canRedo={canRedo} onUndo={onUndo} onRedo={onRedo} />
      <ToolbarSeparator />
      <ToolbarButton accessibilityLabel={t('drawing.zoomOut')} onPress={onZoomOut}>
        <Icon name="zoomOut" color={colors.textPrimary} />
      </ToolbarButton>
      <ToolbarButton accessibilityLabel={t('drawing.zoomReset')} onPress={onZoomReset}>
        <Icon name="zoomReset" color={colors.textPrimary} />
      </ToolbarButton>
      <ToolbarButton accessibilityLabel={t('drawing.zoomIn')} onPress={onZoomIn}>
        <Icon name="zoomIn" color={colors.textPrimary} />
      </ToolbarButton>
    </>
  );

  return (
    <View pointerEvents="box-none" style={styles.layer}>
      {openPanel === null ? null : (
        <Pressable
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          onPress={closePanel}
          style={styles.dismiss}
        />
      )}
      <View
        pointerEvents="box-none"
        style={[
          styles.dock,
          {
            paddingBottom: insets.bottom + (isCompact ? spacing.sm : spacing.md),
            paddingHorizontal: TOOLBAR_INSET,
          },
        ]}
      >
        <View
          style={[
            styles.bar,
            { backgroundColor: colors.toolbarBackground },
            shadows.md,
            isCompact
              ? { paddingVertical: TOOLBAR_PADDING_COMPACT, gap: TOOLBAR_GAP_COMPACT }
              : { paddingVertical: TOOLBAR_PADDING_REGULAR, gap: TOOLBAR_GAP_REGULAR },
          ]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {buttons}
          </ScrollView>
        </View>
      </View>
      {openPanel === 'color' ? (
        <ColorPalette selected={color} onSelect={onColorChange} />
      ) : null}
      {openPanel === 'width' ? (
        <StrokeWidthPalette selected={width} onSelect={onWidthChange} />
      ) : null}
      {openPanel === 'paper' ? (
        <PaperPalette selected={paper} onSelect={onPaperChange} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFill,
    zIndex: 2,
  },
  dismiss: {
    ...StyleSheet.absoluteFill,
  },
  dock: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    borderRadius: borders.radius.xl,
    borderWidth: borders.width.thin,
  },
  barContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
