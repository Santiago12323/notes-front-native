import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Modal } from '@/components/modal';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n/i18n-provider';
import { spacing } from '@/theme/spacing';

interface RenameNotebookModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export function RenameNotebookModal({
  visible,
  title,
  onClose,
  onSubmit,
}: RenameNotebookModalProps) {
  const [nextTitle, setNextTitle] = useState(title);
  const { t } = useTranslation();
  const canSubmit = nextTitle.trim().length > 0;

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.content}>
        <Text variant="subtitle">{t('notebooks.renameTitle')}</Text>
        <Input
          label={t('notebooks.titleLabel')}
          placeholder={t('notebooks.titlePlaceholder')}
          value={nextTitle}
          onChangeText={setNextTitle}
        />
        <View style={styles.actions}>
          <Button label={t('common.cancel')} variant="secondary" onPress={onClose} />
          <Button
            label={t('common.save')}
            disabled={!canSubmit}
            onPress={() => onSubmit(nextTitle)}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
});
