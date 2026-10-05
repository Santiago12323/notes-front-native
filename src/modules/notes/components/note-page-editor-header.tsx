import { StyleSheet, View } from 'react-native';

import { Header } from '@/components/header';
import { IconButton } from '@/components/icon-button';
import { type LayoutDensity } from '@/constants/layout';
import { useTranslation } from '@/i18n/i18n-provider';
import { useTheme } from '@/theme/theme-provider';

interface NotePageEditorHeaderProps {
  title: string;
  density: LayoutDensity;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onBack: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function NotePageEditorHeader({
  title,
  density,
  canGoPrevious,
  canGoNext,
  onBack,
  onPrevious,
  onNext,
  onEdit,
  onDelete,
}: NotePageEditorHeaderProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Header
      title={title}
      density={density}
      left={<IconButton name="back" accessibilityLabel={t('common.back')} onPress={onBack} />}
      right={
        <View style={styles.actions}>
          <IconButton
            name="previous"
            accessibilityLabel={t('notes.previousPage')}
            disabled={!canGoPrevious}
            onPress={onPrevious}
          />
          <IconButton
            name="next"
            accessibilityLabel={t('notes.nextPage')}
            disabled={!canGoNext}
            onPress={onNext}
          />
          <IconButton name="edit" accessibilityLabel={t('common.edit')} onPress={onEdit} />
          <IconButton
            name="delete"
            accessibilityLabel={t('common.delete')}
            color={colors.danger}
            onPress={onDelete}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
