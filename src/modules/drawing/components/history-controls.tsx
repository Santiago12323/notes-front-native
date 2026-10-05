import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { useTranslation } from '@/i18n/i18n-provider';
import { useTheme } from '@/theme/theme-provider';
import { ToolbarButton } from './toolbar-button';

interface HistoryControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export function HistoryControls({ canUndo, canRedo, onUndo, onRedo }: HistoryControlsProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <ToolbarButton accessibilityLabel={t('drawing.undo')} disabled={!canUndo} onPress={onUndo}>
        <Icon name="undo" color={colors.textPrimary} />
      </ToolbarButton>
      <ToolbarButton accessibilityLabel={t('drawing.redo')} disabled={!canRedo} onPress={onRedo}>
        <Icon name="redo" color={colors.textPrimary} />
      </ToolbarButton>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
