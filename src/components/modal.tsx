import { type ReactNode } from 'react';
import { Modal as RNModal, Pressable, StyleSheet } from 'react-native';

import { borders } from '@/theme/borders';
import { shadows } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ visible, onClose, children }: ModalProps) {
  const { colors } = useTheme();

  return (
    <RNModal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <Pressable
        accessibilityRole="button"
        onPress={onClose}
        style={[styles.overlay, { backgroundColor: colors.overlay }]}
      >
        <Pressable
          onPress={(event) => event.stopPropagation()}
          style={[
            styles.content,
            shadows.md,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  content: {
    borderRadius: borders.radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.xl,
  },
});
