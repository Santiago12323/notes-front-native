import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Modal } from '@/components/modal';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n/i18n-provider';
import { spacing } from '@/theme/spacing';

interface DeletePageModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function DeletePageModal({ onClose, onConfirm }: DeletePageModalProps) {
  const { t } = useTranslation();

  return (
    <Modal visible onClose={onClose}>
      <View style={styles.content}>
        <Text variant="subtitle">{t('notes.deleteTitle')}</Text>
        <Text variant="body">{t('notes.deleteMessage')}</Text>
        <View style={styles.actions}>
          <Button label={t('common.cancel')} variant="secondary" onPress={onClose} />
          <Button label={t('common.delete')} variant="danger" onPress={onConfirm} />
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
