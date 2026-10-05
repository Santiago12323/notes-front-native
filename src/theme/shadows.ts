import { Platform, type ViewStyle } from 'react-native';

const shadowColor = '#1A1612';

export const shadows = {
  none: {} satisfies ViewStyle,
  sm:
    Platform.select<ViewStyle>({
      ios: {
        shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      default: {
        boxShadow: '0 2px 10px rgba(26, 22, 18, 0.08)',
      },
    }) ?? {},
  md:
    Platform.select<ViewStyle>({
      ios: {
        shadowColor,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
      },
      android: {
        elevation: 6,
      },
      default: {
        boxShadow: '0 8px 24px rgba(26, 22, 18, 0.12)',
      },
    }) ?? {},
} as const;
